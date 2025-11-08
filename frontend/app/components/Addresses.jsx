import { useState, useEffect } from 'react';
import { MapPin, Plus, Edit2, Trash2, X, Loader2, AlertCircle } from 'lucide-react';
import { useTheme } from '../providers/ThemeProviders';

const API_URL = process.env.NEXT_PUBLIC_SHOP_BACKEND_URL + '/api/address';

export default function Addresses() {
  const { isDark } = useTheme();
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    receivers_name: '',
    flat_house: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    phone_number: '',
    special_address: '',
  });

  // Theme colors
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subtextColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardBg = isDark ? 'bg-gray-900' : 'bg-gray-50';
  const borderColor = isDark ? 'border-gray-800' : 'border-gray-200';
  const inputBg = isDark ? 'bg-gray-800' : 'bg-white';
  const inputBorder = isDark ? 'border-gray-700' : 'border-gray-300';

  // Get token from localStorage
  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  };

  // Fetch addresses on mount
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      if (!token) {
        setError('Please login to view addresses');
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
        throw new Error('Failed to fetch addresses');
      }

      const data = await response.json();
      if (data.success && Array.isArray(data.addresses)) {
        setAddresses(data.addresses);
      } else {
        setAddresses([]);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching addresses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = async () => {
    if (!formData.receivers_name || !formData.flat_house || !formData.city) {
      setError('Please fill in Receiver Name, Address, and City');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      if (!token) {
        setError('Please login to add address');
        setLoading(false);
        return;
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add address');
      }

      const data = await response.json();
      if (data.success) {
        await fetchAddresses();
        setFormData({
          receivers_name: '',
          flat_house: '',
          landmark: '',
          city: '',
          state: '',
          pincode: '',
          phone_number: '',
          special_address: '',
        });
        setIsAddingAddress(false);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error adding address:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAddress = async () => {
    if (!formData.receivers_name || !formData.flat_house || !formData.city) {
      setError('Please fill in Receiver Name, Address, and City');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      if (!token) {
        setError('Please login to update address');
        setLoading(false);
        return;
      }

      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ad_id: editingAddressId,
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update address');
      }

      await fetchAddresses();
      setFormData({
        receivers_name: '',
        flat_house: '',
        landmark: '',
        city: '',
        state: '',
        pincode: '',
        phone_number: '',
        special_address: '',
      });
      setEditingAddressId(null);
    } catch (err) {
      setError(err.message);
      console.error('Error updating address:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (ad_id) => {
    if (!window.confirm('Are you sure you want to delete this address?')) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      if (!token) {
        setError('Please login to delete address');
        setLoading(false);
        return;
      }

      const response = await fetch(API_URL, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ad_id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete address');
      }

      const data = await response.json();
      if (data.success) {
        await fetchAddresses();
      }
    } catch (err) {
      setError(err.message);
      console.error('Error deleting address:', err);
    } finally {
      setLoading(false);
    }
  };

  const startEditingAddress = (address) => {
    setFormData({
      receivers_name: address.receivers_name || '',
      flat_house: address.flat_house || '',
      landmark: address.landmark || '',
      city: address.city || '',
      state: address.state || '',
      pincode: address.pincode || '',
      phone_number: address.phone_number || '',
      special_address: address.special_address || '',
    });
    setEditingAddressId(address.ad_id);
  };

  const cancelForm = () => {
    setIsAddingAddress(false);
    setEditingAddressId(null);
    setError(null);
    setFormData({
      receivers_name: '',
      flat_house: '',
      landmark: '',
      city: '',
      state: '',
      pincode: '',
      phone_number: '',
      special_address: '',
    });
  };

  return (
    <div className={`${cardBg} rounded-2xl p-6 relative z-10`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-bold ${textColor}`}>Addresses</h2>
        {!isAddingAddress && !editingAddressId && (
          <button
            onClick={() => setIsAddingAddress(true)}
            disabled={loading}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
            Add Address
          </button>
        )}
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

      {/* Add/Edit Address Form */}
      {(isAddingAddress || editingAddressId) && (
        <div className={`${inputBg} border ${borderColor} rounded-xl p-4 mb-4`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-semibold ${textColor}`}>
              {editingAddressId ? 'Edit Address' : 'New Address'}
            </h3>
            <button
              onClick={cancelForm}
              className={subtextColor}
              disabled={loading}
            >
              <X size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Receiver Name *"
              value={formData.receivers_name}
              onChange={(e) => setFormData({ ...formData, receivers_name: e.target.value })}
              className={`px-4 py-2 rounded-lg ${inputBg} ${textColor} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-gray-500`}
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              className={`px-4 py-2 rounded-lg ${inputBg} ${textColor} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-gray-500`}
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Flat/House No., Building *"
              value={formData.flat_house}
              onChange={(e) => setFormData({ ...formData, flat_house: e.target.value })}
              className={`px-4 py-2 rounded-lg ${inputBg} ${textColor} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-gray-500 md:col-span-2`}
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Landmark"
              value={formData.landmark}
              onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
              className={`px-4 py-2 rounded-lg ${inputBg} ${textColor} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-gray-500 md:col-span-2`}
              disabled={loading}
            />
            <input
              type="text"
              placeholder="City *"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className={`px-4 py-2 rounded-lg ${inputBg} ${textColor} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-gray-500`}
              disabled={loading}
            />
            <input
              type="text"
              placeholder="State"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className={`px-4 py-2 rounded-lg ${inputBg} ${textColor} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-gray-500`}
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              className={`px-4 py-2 rounded-lg ${inputBg} ${textColor} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-gray-500`}
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Address Type (home, work, etc.)"
              value={formData.special_address}
              onChange={(e) => setFormData({ ...formData, special_address: e.target.value })}
              className={`px-4 py-2 rounded-lg ${inputBg} ${textColor} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-gray-500`}
              disabled={loading}
            />
          </div>
          <button
            onClick={editingAddressId ? handleUpdateAddress : handleAddAddress}
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {editingAddressId ? 'Update Address' : 'Add Address'}
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && !isAddingAddress && !editingAddressId && (
        <div className="flex items-center justify-center py-8">
          <Loader2 size={32} className={`animate-spin ${subtextColor}`} />
        </div>
      )}

      {/* Address List */}
      {!loading && addresses.length === 0 && !isAddingAddress && (
        <div className="text-center py-8">
          <MapPin size={48} className={`${subtextColor} mx-auto mb-3`} />
          <p className={`${subtextColor} text-lg`}>No addresses found</p>
          <p className={`${subtextColor} text-sm mt-1`}>Add your first address to get started</p>
        </div>
      )}

      {!loading && addresses.length > 0 && (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.ad_id}
              className={`${inputBg} border ${borderColor} rounded-xl p-4`}
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <MapPin size={20} className={subtextColor} />
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className={`font-semibold ${textColor}`}>{address.receivers_name}</p>
                      {address.special_address && (
                        <span className="bg-black text-white text-xs px-2 py-1 rounded capitalize">
                          {address.special_address}
                        </span>
                      )}
                    </div>
                    <p className={`text-sm ${textColor}`}>{address.flat_house}</p>
                    {address.landmark && (
                      <p className={`text-sm ${subtextColor}`}>{address.landmark}</p>
                    )}
                    <p className={`text-sm ${subtextColor}`}>
                      {address.city}{address.state && `, ${address.state}`}{address.pincode && ` - ${address.pincode}`}
                    </p>
                    {address.phone_number && (
                      <p className={`text-sm ${subtextColor} mt-1`}>📞 {address.phone_number}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditingAddress(address)}
                    disabled={loading}
                    className={`${subtextColor} hover:${textColor} transition-colors disabled:opacity-50`}
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address.ad_id)}
                    disabled={loading}
                    className={`${subtextColor} hover:text-red-500 transition-colors disabled:opacity-50`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}