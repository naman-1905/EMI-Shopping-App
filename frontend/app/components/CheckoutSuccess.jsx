import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccess() {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm animate-fadeIn">
        <div className="text-center animate-scaleIn">
          <div className="relative mb-6">
            <div className="w-32 h-32 mx-auto bg-green-500 rounded-full flex items-center justify-center animate-checkmark">
              <CheckCircle size={64} className="text-white" strokeWidth={2.5} />
            </div>
            <div className="absolute inset-0 w-32 h-32 mx-auto bg-green-500 rounded-full animate-ripple opacity-30"></div>
            <div className="absolute inset-0 w-32 h-32 mx-auto bg-green-500 rounded-full animate-ripple-delay opacity-20"></div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-3 animate-slideUp">
            Order Placed!
          </h2>
          <p className="text-xl text-gray-300 animate-slideUp animation-delay-200">
            Thank you for your purchase
          </p>
          <div className="mt-6 flex gap-2 justify-center animate-slideUp animation-delay-400">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce animation-delay-200"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce animation-delay-400"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes checkmark {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out;
        }

        .animate-checkmark {
          animation: checkmark 0.6s ease-out;
        }

        .animate-ripple {
          animation: ripple 1.5s ease-out infinite;
        }

        .animate-ripple-delay {
          animation: ripple 1.5s ease-out infinite 0.5s;
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: backwards;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          animation-fill-mode: backwards;
        }
      `}</style>
    </>
  );
}