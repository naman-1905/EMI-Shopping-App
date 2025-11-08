import { useState } from 'react';
import { User, Mail, Edit2 } from 'lucide-react';
import { useTheme } from '../providers/ThemeProviders';

export default function UserInfo() {
  const { isDark } = useTheme();
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [userInfo, setUserInfo] = useState({
    username: 'John Doe',
    email: 'john.doe@example.com',
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

  const handleUpdateProfile = () => {
    setUserInfo(profileFormData);
    setIsEditingProfile(false);
  };

  return (
    <div className={`${cardBg} rounded-2xl p-6 relative z-10`}>
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
  );
}