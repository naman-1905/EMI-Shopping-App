import { useTheme } from '../providers/ThemeProviders';

export default function OrderSummary({ cartItems, subtotal, shipping, total, onCheckout }) {
  const { isDark } = useTheme();

  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subtextColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardBg = isDark ? 'bg-neutral-900' : 'bg-gray-50';
  const borderColor = isDark ? 'border-neutral-800' : 'border-gray-200';
  const buttonBg = isDark ? 'bg-white' : 'bg-black';
  const buttonText = isDark ? 'text-black' : 'text-white';
  const buttonHover = isDark ? 'hover:bg-gray-200' : 'hover:bg-gray-800';

  // EMI calculation function
  const getEMIOptions = (price) => [
    { months: 3, monthlyPayment: Math.ceil(price / 3), interestRate: 0 },
    { months: 6, monthlyPayment: Math.ceil((price * 1.05) / 6), interestRate: 5 },
    { months: 9, monthlyPayment: Math.ceil((price * 1.08) / 9), interestRate: 8 },
    { months: 12, monthlyPayment: Math.ceil((price * 1.12) / 12), interestRate: 12 },
  ];

  return (
    <div className={`${cardBg} rounded-2xl p-6 sticky top-24`}>
      <h2 className={`text-xl font-bold ${textColor} mb-6`}>
        Order Summary
      </h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className={`${subtextColor}`}>Subtotal</span>
          <span className={`${textColor} font-medium`}>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className={`${subtextColor}`}>Shipping</span>
          <span className={`${textColor} font-medium`}>${shipping.toFixed(2)}</span>
        </div>
        
        {cartItems.some(item => item.selectedEMI) && (
          <div className={`${cardBg} border ${borderColor} rounded-lg p-3 space-y-2`}>
            <div className={`text-xs font-medium ${textColor} mb-2`}>EMI Plans:</div>
            {cartItems.filter(item => item.selectedEMI).map(item => {
              const itemTotal = item.price * item.quantity;
              const emiOptions = getEMIOptions(itemTotal);
              const selectedPlan = emiOptions.find(o => o.months === item.selectedEMI);
              return (
                <div key={item.id} className={`text-xs ${subtextColor}`}>
                  {item.name}: ${selectedPlan?.monthlyPayment}/mo × {item.selectedEMI} months
                </div>
              );
            })}
          </div>
        )}
        
        <div className={`border-t ${borderColor} pt-4`}>
          <div className="flex justify-between">
            <span className={`text-lg font-bold ${textColor}`}>Total</span>
            <span className={`text-lg font-bold ${textColor}`}>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button 
        onClick={onCheckout}
        className={`w-full ${buttonBg} ${buttonText} py-3 rounded-lg font-medium ${buttonHover} transition-colors mb-3`}
      >
        Proceed to Checkout
      </button>

      <p className={`text-xs ${subtextColor} text-center`}>
        Taxes calculated at checkout
      </p>
    </div>
  );
}