"use client"
import { LogIn } from 'lucide-react';
import { useTheme } from '../providers/ThemeProviders';
import Link from 'next/link';

export default function LoginPromptBox() {
  const { isDark } = useTheme();

  // Theme colors
  const bgColor = isDark ? 'bg-gray-900' : 'bg-gray-50';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subtextColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const borderColor = isDark ? 'border-gray-800' : 'border-gray-200';

  return (
    <div className={`${bgColor} border ${borderColor} rounded-2xl p-8 text-center max-w-md mx-auto`}>
      <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'} flex items-center justify-center`}>
        <LogIn size={32} className={subtextColor} />
      </div>
      
      <h2 className={`text-xl font-bold ${textColor} mb-2`}>
        You are not logged in
      </h2>
      
      <p className={`${subtextColor} mb-6`}>
        Kindly log in to perform the desired action
      </p>
      
      <Link href="/login">
        <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
          <LogIn size={20} />
          Login Now
        </button>
      </Link>
    </div>
  );
}