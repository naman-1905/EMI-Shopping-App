import { MapPin, Edit2 } from 'lucide-react';
import { useTheme } from '../providers/ThemeProviders';

export default function DeliveryAddress({ address }) {
  const { isDark } = useTheme();

  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subtextColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardBg = isDark ? 'bg-neutral-900' : 'bg-gray-50';

  return (
    <div className={`${cardBg} rounded-2xl p-6`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin size={20} className={textColor} />
          <h2 className={`text-lg font-bold ${textColor}`}>
            Delivery Address
          </h2>
        </div>
        <button className={`${subtextColor} hover:${textColor} transition-colors`}>
          <Edit2 size={16} />
        </button>
      </div>
      <div className={`${subtextColor} space-y-1 text-sm`}>
        <p className={`${textColor} font-medium`}>{address.name}</p>
        <p>{address.street}</p>
        <p>{address.city}, {address.state} {address.zipCode}</p>
        <p>{address.country}</p>
        <p className="pt-2">{address.phone}</p>
      </div>
    </div>
  );
}