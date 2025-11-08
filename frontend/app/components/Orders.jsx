import { useState, useEffect } from 'react';
import { Package, ChevronDown, ChevronUp, Calendar, MapPin, DollarSign, Loader2, AlertCircle, X, XCircle } from 'lucide-react';
import { useTheme } from '../providers/ThemeProviders';

const API_URL = process.env.NEXT_PUBLIC_SHOP_BACKEND_URL + '/api/orders';

export default function Orders() {
  const { isDark } = useTheme();
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);

  // Theme colors
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subtextColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardBg = isDark ? 'bg-gray-900' : 'bg-gray-50';
  const borderColor = isDark ? 'border-gray-800' : 'border-gray-200';
  const inputBg = isDark ? 'bg-gray-800' : 'bg-white';

  // Get token from localStorage
  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  };

  // Fetch orders on mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      if (!token) {
        setError('Please login to view orders');
        setLoading(false);
        return;
      }

      const response = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        setOrders(result.data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    setCancellingOrderId(orderId);
    setError(null);
    try {
      const token = getToken();
      if (!token) {
        setError('Please login to cancel order');
        setCancellingOrderId(null);
        return;
      }

      const response = await fetch(API_URL, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order_id: orderId }),
      });

      if (!response.ok) {
        throw new Error('Failed to cancel order');
      }

      const result = await response.json();
      if (result.success) {
        // Refresh orders to show updated status
        await fetchOrders();
      }
    } catch (err) {
      setError(err.message);
      console.error('Error cancelling order:', err);
    } finally {
      setCancellingOrderId(null);
    }
  };

  const getStatusColor = (cancel) => {
    if (cancel) {
      return 'bg-red-500';
    }
    return 'bg-green-500';
  };

  const getStatusText = (cancel) => {
    return cancel ? 'Cancelled' : 'Active';
  };

  const getPaymentMethod = (order) => {
    if (order.cash) return 'Cash';
    if (order.emi) return `EMI (${order.planned_month} months)`;
    if (order.mutual_fund_emi) return 'Mutual Fund EMI';
    return 'N/A';
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className={`${cardBg} rounded-2xl p-6 relative z-10`}>
      <div className="mb-6">
        <h2 className={`text-xl font-bold ${textColor}`}>Order History</h2>
        <p className={`text-sm ${subtextColor} mt-1`}>View and track your orders</p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className={`mb-4 p-4 rounded-lg ${isDark ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'} border flex items-start gap-3`}>
          <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className={`text-sm font-medium ${isDark ? 'text-red-400' : 'text-red-800'}`}>
              {error}
            </p>
          </div>
          <button
            onClick={() => setError(null)}
            className={`ml-auto ${isDark ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'}`}
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={32} className={`animate-spin ${subtextColor}`} />
        </div>
      )}

      {/* Orders List */}
      {!loading && orders.length > 0 && (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.order_id}
              className={`${inputBg} border ${borderColor} rounded-xl overflow-hidden`}
            >
              {/* Order Header */}
              <div
                className="p-4 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => toggleOrderExpansion(order.order_id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Package size={20} className={subtextColor} />
                    <div>
                      <p className={`font-semibold ${textColor}`}>
                        {order.sku_info?.sku_name || 'Product'}
                      </p>
                      <p className={`text-sm ${subtextColor}`}>
                        {formatDate(order.ordered_on)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`${getStatusColor(order.cancel)} text-white text-xs px-3 py-1 rounded-full font-medium`}>
                      {getStatusText(order.cancel)}
                    </span>
                    {expandedOrder === order.order_id ? (
                      <ChevronUp size={20} className={subtextColor} />
                    ) : (
                      <ChevronDown size={20} className={subtextColor} />
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className={`text-sm ${subtextColor}`}>
                    Quantity: {order.quantity}
                  </p>
                  <p className={`font-semibold ${textColor}`}>₹{order.final_price.toLocaleString()}</p>
                </div>
              </div>

              {/* Expanded Order Details */}
              {expandedOrder === order.order_id && (
                <div className={`border-t ${borderColor} p-4`}>
                  {/* Product Details */}
                  <div className="mb-4">
                    <h4 className={`font-semibold ${textColor} mb-3`}>Product Details</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className={`${textColor}`}>{order.sku_info?.sku_name || 'Product'}</p>
                          <p className={`text-sm ${subtextColor}`}>Quantity: {order.quantity}</p>
                          <p className={`text-sm ${subtextColor}`}>Price per unit: ₹{order.sku_info?.price?.toLocaleString() || order.final_price.toLocaleString()}</p>
                        </div>
                        <p className={`font-medium ${textColor}`}>
                          ₹{order.final_price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="mb-4">
                    <h4 className={`font-semibold ${textColor} mb-2`}>Payment Details</h4>
                    <div className="space-y-1">
                      <p className={`text-sm ${textColor}`}>
                        Payment Method: <span className={subtextColor}>{getPaymentMethod(order)}</span>
                      </p>
                      {order.emi && order.planned_month > 0 && (
                        <p className={`text-sm ${textColor}`}>
                          Monthly EMI: <span className={subtextColor}>₹{Math.round(order.final_price / order.planned_month).toLocaleString()}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Delivery Details */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={16} className={subtextColor} />
                      <h4 className={`font-semibold ${textColor}`}>Delivery Information</h4>
                    </div>
                    <p className={`text-sm ${textColor} ml-6`}>
                      Expected Delivery: <span className={subtextColor}>{formatDate(order.ex_delivery_date)}</span>
                    </p>
                  </div>

                  {/* Shipping Address */}
                  {order.user_address && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin size={16} className={subtextColor} />
                        <h4 className={`font-semibold ${textColor}`}>Shipping Address</h4>
                      </div>
                      <div className="ml-6">
                        <p className={`text-sm ${subtextColor}`}>
                          {order.user_address.city}, {order.user_address.state}
                        </p>
                        <p className={`text-sm ${subtextColor}`}>
                          PIN: {order.user_address.pincode}
                        </p>
                        {order.user_address.phone_number && (
                          <p className={`text-sm ${subtextColor}`}>
                            Phone: {order.user_address.phone_number}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Cancellation Info */}
                  {order.cancel && order.reason_of_cancellation && (
                    <div className={`mb-4 p-3 rounded-lg ${isDark ? 'bg-red-900/20' : 'bg-red-50'}`}>
                      <div className="flex items-start gap-2">
                        <XCircle size={16} className="text-red-500 mt-0.5" />
                        <div>
                          <p className={`text-sm font-medium ${isDark ? 'text-red-400' : 'text-red-700'}`}>
                            Order Cancelled
                          </p>
                          <p className={`text-sm ${isDark ? 'text-red-300' : 'text-red-600'}`}>
                            Reason: {order.reason_of_cancellation}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Order Total */}
                  <div className={`border-t ${borderColor} pt-3 mt-3`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className={subtextColor} />
                        <p className={`font-semibold ${textColor}`}>Total</p>
                      </div>
                      <p className={`font-bold text-lg ${textColor}`}>
                        ₹{order.final_price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {!order.cancel && (
                    <div className="mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancelOrder(order.order_id);
                        }}
                        disabled={cancellingOrderId === order.order_id}
                        className={`w-full ${isDark ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2`}
                      >
                        {cancellingOrderId === order.order_id ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Cancelling...
                          </>
                        ) : (
                          <>
                            <XCircle size={18} />
                            Cancel Order
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && orders.length === 0 && (
        <div className="text-center py-12">
          <Package size={48} className={`${subtextColor} mx-auto mb-4`} />
          <p className={`${textColor} font-medium mb-2`}>No orders yet</p>
          <p className={`text-sm ${subtextColor}`}>Your order history will appear here</p>
        </div>
      )}
    </div>
  );
}