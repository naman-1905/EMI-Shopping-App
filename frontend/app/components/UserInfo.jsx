import { useState, useEffect } from 'react';
import { User, Mail, Edit2, Loader2, AlertCircle, X } from 'lucide-react';
import { useTheme } from '../providers/ThemeProviders';

export default function UserInfo() {
  const { isDark } = useTheme();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [userInfo, setUserInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });

  const [profileFormData, setProfileFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });

  // Theme colors
  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subtextColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardBg = isDark ? 'bg-gray-900' : 'bg-gray-50';
  const borderColor = isDark ? 'border-gray-800' : 'border-gray-200';
  const inputBg = isDark ? 'bg-gray-800' : 'bg-white';
  const inputBorder = isDark ? 'border-gray-700' : 'border-gray-300';

  // Decode JWT token to get user info
  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  // Get user info from token
  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        const decoded = decodeToken(token);
        if (decoded) {
          const userData = {
            first_name: decoded.first_name || '',
            last_name: decoded.last_name || '',
            email: decoded.email || '',
          };
          setUserInfo(userData);
          setProfileFormData(userData);
        }
      } else {
        setError('Please login to view profile');
      }
    }
  };

  const handleUpdateProfile = () => {
    // Since the JWT contains the user info and it's read-only from the token,
    // we would need an API endpoint to update user information
    // For now, we'll just update the local state
    setUserInfo(profileFormData);
    setIsEditingProfile(false);
    
    // Note: You'll need to add an API call here when the backend endpoint is available
    // Example:
    // const token = localStorage.getItem('authToken');
    // await fetch(`${process.env.NEXT_PUBLIC_SHOP_BACKEND_URL}/api/user`, {
    //   method: 'PUT',
    //   headers: {
    //     'Authorization': `Bearer ${token}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(profileFormData),
    // });
  };

  return (
    <div className={`${cardBg} rounded-2xl p-6 relative z-10`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-bold ${textColor}`}>Personal Information</h2>
        {!isEditingProfile && (
          <button
            onClick={() => {
              setProfileFormData({
                first_name: userInfo.first_name,
                last_name: userInfo.last_name,
                email: userInfo.email,
              });
              setIsEditingProfile(true);
              setError(null);
            }}
            disabled={loading}
            className={`${subtextColor} hover:${textColor} transition-colors disabled:opacity-50`}
          >
            <Edit2 size={20} />
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

      {!isEditingProfile ? (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <User size={20} className={subtextColor} />
            <div>
              <p className={`text-sm ${subtextColor}`}>Full Name</p>
              <p className={`${textColor} font-medium`}>
                {userInfo.first_name} {userInfo.last_name}
              </p>
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
            <label className={`block text-sm ${subtextColor} mb-2`}>First Name</label>
            <input
              type="text"
              value={profileFormData.first_name}
              onChange={(e) => setProfileFormData({ ...profileFormData, first_name: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg ${inputBg} ${textColor} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-gray-500`}
              disabled={loading}
            />
          </div>
          <div>
            <label className={`block text-sm ${subtextColor} mb-2`}>Last Name</label>
            <input
              type="text"
              value={profileFormData.last_name}
              onChange={(e) => setProfileFormData({ ...profileFormData, last_name: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg ${inputBg} ${textColor} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-gray-500`}
              disabled={loading}
            />
          </div>
          <div>
            <label className={`block text-sm ${subtextColor} mb-2`}>Email</label>
            <input
              type="email"
              value={profileFormData.email}
              onChange={(e) => setProfileFormData({ ...profileFormData, email: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg ${inputBg} ${textColor} border ${inputBorder} focus:outline-none focus:ring-2 focus:ring-gray-500`}
              disabled={loading}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleUpdateProfile}
              disabled={loading}
              className="flex-1 bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              Save Changes
            </button>
            <button
              onClick={() => {
                setIsEditingProfile(false);
                setError(null);
              }}
              disabled={loading}
              className={`flex-1 ${cardBg} ${textColor} py-2 rounded-lg font-medium border ${borderColor} hover:opacity-80 transition-opacity disabled:opacity-50`}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}