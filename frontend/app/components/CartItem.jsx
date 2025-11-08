import { useState } from 'react';
import { Plus, Minus, Trash2, CreditCard } from 'lucide-react';
import { useTheme } from '../providers/ThemeProviders';

export default function CartItem({ item, onUpdateQuantity, onRemoveItem, onSetEMI }) {
  const { isDark } = useTheme();
  const [expandedEMI, setExpandedEMI] = useState(false);

  // Theme colors
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subtextColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardBg = isDark ? 'bg-neutral-900' : 'bg-gray-50';
  const borderColor = isDark ? 'border-neutral-800' : 'border-gray-200';
  const emiSelectedBorder = isDark ? 'border-white bg-white bg-opacity-5' : 'border-black bg-black bg-opacity-5';
  const emiHoverBorder = isDark ? 'hover:border-neutral-600' : 'hover:border-gray-300';
  const emiDefaultBorder = isDark ? 'border-neutral-700' : 'border-gray-200';

  // EMI calculation function
  const getEMIOptions = (price) => [
    { months: 3, monthlyPayment: Math.ceil(price / 3), interestRate: 0 },
    { months: 6, monthlyPayment: Math.ceil((price * 1.05) / 6), interestRate: 5 },
    { months: 9, monthlyPayment: Math.ceil((price * 1.08) / 9), interestRate: 8 },
    { months: 12, monthlyPayment: Math.ceil((price * 1.12) / 12), interestRate: 12 },
  ];

  const calculateItemTotal = () => {
    const basePrice = item.price * item.quantity;
    if (!item.selectedEMI) return basePrice;
    
    const emiOptions = getEMIOptions(basePrice);
    const selectedPlan = emiOptions.find(o => o.months === item.selectedEMI);
    return selectedPlan ? selectedPlan.monthlyPayment * selectedPlan.months : basePrice;
  };

  const itemTotal = item.price * item.quantity;
  const emiOptions = getEMIOptions(itemTotal);

  return (
    <div className={`${cardBg} rounded-2xl p-4`}>
      <div className="flex gap-4 mb-4">
        <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className={`text-base md:text-lg font-medium ${textColor} mb-1`}>
              {item.name}
            </h3>
            <p className={`text-sm ${subtextColor}`}>{item.category}</p>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className={`flex items-center gap-3 ${cardBg} border ${borderColor} rounded-lg px-3 py-2`}>
              <button
                onClick={() => onUpdateQuantity(item.id, -1)}
                className={`${textColor} hover:opacity-70 transition-opacity`}
              >
                <Minus size={16} />
              </button>
              <span className={`${textColor} font-medium w-8 text-center`}>
                {item.quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(item.id, 1)}
                className={`${textColor} hover:opacity-70 transition-opacity`}
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className={`text-lg font-bold ${textColor}`}>
                  ${calculateItemTotal().toFixed(2)}
                </div>
              </div>
              <button
                onClick={() => onRemoveItem(item.id)}
                className={`${subtextColor} hover:text-red-500 transition-colors`}
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* EMI Section */}
      <div className={`border-t ${borderColor} pt-4`}>
        <button
          onClick={() => setExpandedEMI(!expandedEMI)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <CreditCard size={18} className={textColor} />
            <span className={`text-sm font-medium ${textColor}`}>
              {item.selectedEMI 
                ? `EMI: ${item.selectedEMI} months` 
                : 'Add EMI Plan'}
            </span>
          </div>
          <span className={`text-sm ${subtextColor}`}>
            {expandedEMI ? '▲' : '▼'}
          </span>
        </button>

        {expandedEMI && (
          <div className="mt-3 space-y-2">
            {emiOptions.map((option) => (
              <label
                key={option.months}
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                  item.selectedEMI === option.months
                    ? emiSelectedBorder
                    : `${emiDefaultBorder} ${emiHoverBorder}`
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`emi-${item.id}`}
                    checked={item.selectedEMI === option.months}
                    onChange={() => onSetEMI(item.id, option.months)}
                    className="w-4 h-4"
                  />
                  <div>
                    <div className={`text-sm font-medium ${textColor}`}>
                      {option.months} Months
                    </div>
                    <div className={`text-xs ${subtextColor}`}>
                      {option.interestRate === 0 
                        ? 'No cost EMI' 
                        : `${option.interestRate}% interest`}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-bold ${textColor}`}>
                    ${option.monthlyPayment}/mo
                  </div>
                  <div className={`text-xs ${subtextColor}`}>
                    ${option.monthlyPayment * option.months}
                  </div>
                </div>
              </label>
            ))}
            {item.selectedEMI && (
              <button
                onClick={() => onSetEMI(item.id, null)}
                className={`w-full text-sm ${subtextColor} hover:${textColor} transition-colors py-2`}
              >
                Pay full amount
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}