"use client"
import { useState } from 'react';
import { User, Mail, MapPin, Plus, Edit2, Trash2, LogOut, X } from 'lucide-react';
import { useTheme } from '../providers/ThemeProviders';

export default function Profile() {
  const { isDark } = useTheme();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

  const [userInfo, setUserInfo] = useState({
    username: 'John Doe',
    email: 'john.doe@example.com',
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: 'Home',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      isDefault: true,
    },
    {
      id: 2,
      label: 'Work',
      street: '456 Business Ave',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11201',
      country: 'USA',
      isDefault: false,
    },
  ]);

  const [formData, setFormData] = useState({
    label: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const [profileFormData, setProfileFormData] = useState({
    username: userInfo.username,
    email: userInfo.email,
  });

  // Theme colors
  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subtextColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardBg = isDark ? 'bg-gray-900' : 'bg-gray-50';
  const borderColor = isDark ? 'border-gray-800' : 'border-gray-200';
  const inputBg = isDark ? 'bg-gray-800' : 'bg-white';
  const inputBorder = isDark ? 'border-gray-700' : 'border-gray-300';

  const handleAddAddress = () => {
    if (formData.label && formData.street && formData.city) {
      const newAddress = {
        id: Date.now(),
        ...formData,
        isDefault: addresses.length === 0,
      };
      setAddresses([...addresses, newAddress]);
      setFormData({ label: '', street: '', city: '', state: '', zipCode: '', country: '' });
      setIsAddingAddress(false);
    }
  };

  const handleUpdateAddress = () => {
    setAddresses(addresses.map(addr => 
      addr.id === editingAddressId ? { ...addr, ...formData } : addr
    ));
    setFormData({ label: '', street: '', city: '', state: '', zipCode: '', country: '' });
    setEditingAddressId(null);
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const startEditingAddress = (address) => {
    setFormData({
      label: address.label,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
    });
    setEditingAddressId(address.id);
  };

  const handleUpdateProfile = () => {
    setUserInfo(profileFormData);
    setIsEditingProfile(false);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // Add logout logic here
  };

  return (
    <div className={`min-h-screen ${bgColor}`}>
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
        {/* Title */}
        <h1 className={`text-3xl md:text-4xl font-bold ${textColor} mb-8`}>
          Profile
        </h1>

        {/* User Info Section */}
        <div className={`${cardBg} rounded-2xl p-6 mb-6`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${textColor}`}>Personal Information</h2>
            {!isEditingProfile && (
              <button
                onClick={() => {
                  setProfileFormData({ username: userInfo.username, email: userInfo.email });
                  setIsEditingProfile(true);
                }}
                className={`${subtextColor} hover:${textColor} transition-colors`}
              >
                <Edit2 size={20} />
              </button>
            )}
          </div>

          {!isEditingProfile ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User size={20} className={subtextColor} />
                <div>
                  <p className={`text-sm ${subtextColor}`}>Username</p>
                  <p className={`${textColor} font-medium`}>{userInfo.username}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} className={subtextColor} />
                <div>
                  <p className={`text-sm ${subtextColor}`}>Email</p>
                  <p className={`${textColor} font-medium`}>{userInfo.email}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className={`block text-sm ${subtextColor} mb-2`}>Username</label>
                <input
                  type="text"
                  value={profileFormData.username}
                  onChange={(e) => setProfileFormData({ ...profileFormData, username: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg ${inputBg} ${textColor} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-gray-500`}
                />
              </div>
              <div>
                <label className={`block text-sm ${subtextColor} mb-2`}>Email</label>
                <input
                  type="email"
                  value={profileFormData.email}
                  onChange={(e) => setProfileFormData({ ...profileFormData, email: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg ${inputBg} ${textColor} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-gray-500`}
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleUpdateProfile}
                  className="flex-1 bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditingProfile(false)}
                  className={`flex-1 ${cardBg} ${textColor} py-2 rounded-lg font-medium border ${borderColor} hover:opacity-80 transition-opacity`}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Addresses Section */}
        <div className={`${cardBg} rounded-2xl p-6 mb-6`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${textColor}`}>Addresses</h2>
            {!isAddingAddress && !editingAddressId && (
              <button
                onClick={() => setIsAddingAddress(true)}
                className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                <Plus size={18} />
                Add Address
              </button>
            )}
          </div>

          {/* Add/Edit Address Form */}
          {(isAddingAddress || editingAddressId) && (
            <div className={`${inputBg} border ${borderColor} rounded-xl p-4 mb-4`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-semibold ${textColor}`}>
                  {editingAddressId ? 'Edit Address' : 'New Address'}
                </h3>
                <button
                  onClick={() => {
                    setIsAddingAddress(false);
                    setEditingAddressId(null);
                    setFormData({ label: '', street: '', city: '', state: '', zipCode: '', country: '' });
                  }}
                  className={subtextColor}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Label (e.g., Home, Work)"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  className={`px-4 py-2 rounded-lg ${inputBg} ${textColor} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-gray-500`}
                />
                <input
                  type="text"
                  placeholder="Street Address"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className={`px-4 py-2 rounded-lg ${inputBg} ${textColor} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-gray-500`}
                />
                <input
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className={`px-4 py-2 rounded-lg ${inputBg} ${textColor} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-gray-500`}
                />
                <input
                  type="text"
                  placeholder="State"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className={`px-4 py-2 rounded-lg ${inputBg} ${textColor} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-gray-500`}
                />
                <input
                  type="text"
                  placeholder="ZIP Code"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  className={`px-4 py-2 rounded-lg ${inputBg} ${textColor} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-gray-500`}
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className={`px-4 py-2 rounded-lg ${inputBg} ${textColor} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-gray-500`}
                />
              </div>
              <button
                onClick={editingAddressId ? handleUpdateAddress : handleAddAddress}
                className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors mt-4"
              >
                {editingAddressId ? 'Update Address' : 'Add Address'}
              </button>
            </div>
          )}

          {/* Address List */}
          <div className="space-y-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className={`${inputBg} border ${borderColor} rounded-xl p-4`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <MapPin size={20} className={subtextColor} />
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className={`font-semibold ${textColor}`}>{address.label}</p>
                        {address.isDefault && (
                          <span className="bg-black text-white text-xs px-2 py-1 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className={`text-sm ${textColor}`}>{address.street}</p>
                      <p className={`text-sm ${subtextColor}`}>
                        {address.city}, {address.state} {address.zipCode}
                      </p>
                      <p className={`text-sm ${subtextColor}`}>{address.country}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditingAddress(address)}
                      className={`${subtextColor} hover:${textColor} transition-colors`}
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(address.id)}
                      className={`${subtextColor} hover:text-red-500 transition-colors`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-xl font-medium hover:bg-red-600 transition-colors"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}