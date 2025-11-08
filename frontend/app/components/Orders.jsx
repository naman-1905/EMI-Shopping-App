import { useState } from 'react';
import { Package, ChevronDown, ChevronUp, Calendar, MapPin, DollarSign } from 'lucide-react';
import { useTheme } from '../providers/ThemeProviders';

export default function Orders() {
  const { isDark } = useTheme();
  const [expandedOrder, setExpandedOrder] = useState(null);

  const [orders] = useState([
    {
      id: 'ORD-2024-001',
      date: '2024-03-15',
      status: 'Delivered',
      total: 156.99,
      items: [
        { name: 'Wireless Headphones', quantity: 1, price: 79.99 },
        { name: 'Phone Case', quantity: 2, price: 15.00 },
        { name: 'USB-C Cable', quantity: 3, price: 15.00 },
      ],
      shippingAddress: {
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
      },
      trackingNumber: 'TRK123456789',
    },
    {
      id: 'ORD-2024-002',
      date: '2024-03-10',
      status: 'In Transit',
      total: 89.99,
      items: [
        { name: 'Bluetooth Speaker', quantity: 1, price: 89.99 },
      ],
      shippingAddress: {
        street: '456 Business Ave',
        city: 'Brooklyn',
        state: 'NY',
        zipCode: '11201',
      },
      trackingNumber: 'TRK987654321',
    },
    {
      id: 'ORD-2024-003',
      date: '2024-03-05',
      status: 'Processing',
      total: 234.50,
      items: [
        { name: 'Laptop Stand', quantity: 1, price: 49.99 },
        { name: 'Wireless Mouse', quantity: 1, price: 34.99 },
        { name: 'Keyboard', quantity: 1, price: 149.52 },
      ],
      shippingAddress: {
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
      },
      trackingNumber: 'TRK456789123',
    },
    {
      id: 'ORD-2024-004',
      date: '2024-02-28',
      status: 'Delivered',
      total: 45.00,
      items: [
        { name: 'Screen Protector', quantity: 3, price: 15.00 },
      ],
      shippingAddress: {
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
      },
      trackingNumber: 'TRK789123456',
    },
  ]);

  // Theme colors
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subtextColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardBg = isDark ? 'bg-gray-900' : 'bg-gray-50';
  const borderColor = isDark ? 'border-gray-800' : 'border-gray-200';
  const inputBg = isDark ? 'bg-gray-800' : 'bg-white';

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-500';
      case 'In Transit':
        return 'bg-blue-500';
      case 'Processing':
        return 'bg-yellow-500';
      case 'Cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className={`${cardBg} rounded-2xl p-6 relative z-10`}>
      <div className="mb-6">
        <h2 className={`text-xl font-bold ${textColor}`}>Order History</h2>
        <p className={`text-sm ${subtextColor} mt-1`}>View and track your orders</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`${inputBg} border ${borderColor} rounded-xl overflow-hidden`}
          >
            {/* Order Header */}
            <div
              className="p-4 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => toggleOrderExpansion(order.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Package size={20} className={subtextColor} />
                  <div>
                    <p className={`font-semibold ${textColor}`}>{order.id}</p>
                    <p className={`text-sm ${subtextColor}`}>
                      {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`${getStatusColor(order.status)} text-white text-xs px-3 py-1 rounded-full font-medium`}>
                    {order.status}
                  </span>
                  {expandedOrder === order.id ? (
                    <ChevronUp size={20} className={subtextColor} />
                  ) : (
                    <ChevronDown size={20} className={subtextColor} />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className={`text-sm ${subtextColor}`}>
                  {order.items.length} item{order.items.length > 1 ? 's' : ''}
                </p>
                <p className={`font-semibold ${textColor}`}>${order.total.toFixed(2)}</p>
              </div>
            </div>

            {/* Expanded Order Details */}
            {expandedOrder === order.id && (
              <div className={`border-t ${borderColor} p-4`}>
                {/* Items List */}
                <div className="mb-4">
                  <h4 className={`font-semibold ${textColor} mb-3`}>Items</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2"
                      >
                        <div>
                          <p className={`${textColor}`}>{item.name}</p>
                          <p className={`text-sm ${subtextColor}`}>Qty: {item.quantity}</p>
                        </div>
                        <p className={`font-medium ${textColor}`}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={16} className={subtextColor} />
                    <h4 className={`font-semibold ${textColor}`}>Shipping Address</h4>
                  </div>
                  <p className={`text-sm ${textColor} ml-6`}>
                    {order.shippingAddress.street}
                  </p>
                  <p className={`text-sm ${subtextColor} ml-6`}>
                    {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                    {order.shippingAddress.zipCode}
                  </p>
                </div>

                {/* Tracking Number */}
                <div className="mb-4">
                  <p className={`text-sm ${subtextColor}`}>Tracking Number</p>
                  <p className={`font-mono text-sm ${textColor}`}>{order.trackingNumber}</p>
                </div>

                {/* Order Total */}
                <div className={`border-t ${borderColor} pt-3 mt-3`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className={subtextColor} />
                      <p className={`font-semibold ${textColor}`}>Total</p>
                    </div>
                    <p className={`font-bold text-lg ${textColor}`}>
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  <button className="flex-1 bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                    Track Order
                  </button>
                  <button className={`flex-1 ${cardBg} ${textColor} py-2 rounded-lg font-medium border ${borderColor} hover:opacity-80 transition-opacity`}>
                    View Details
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12">
          <Package size={48} className={`${subtextColor} mx-auto mb-4`} />
          <p className={`${textColor} font-medium mb-2`}>No orders yet</p>
          <p className={`text-sm ${subtextColor}`}>Your order history will appear here</p>
        </div>
      )}
    </div>
  );
}