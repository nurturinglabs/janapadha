'use client';

import { useState, useEffect, useRef } from 'react';
import { Shield, AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

interface OtpVerificationProps {
  phone: string;
  onVerified: () => void;
  onBack: () => void;
}

export default function OtpVerification({ phone, onVerified, onBack }: OtpVerificationProps) {
  const { language } = useLanguage();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Mock OTP for testing: 123456
  const MOCK_OTP = '123456';

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (index === 5 && value) {
      const completeOtp = [...newOtp.slice(0, 5), value].join('');
      if (completeOtp.length === 6) {
        setTimeout(() => verifyOtp(completeOtp), 100);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
    setOtp(newOtp);

    if (pastedData.length === 6) {
      setTimeout(() => verifyOtp(pastedData), 100);
    }
  };

  const verifyOtp = (otpValue: string) => {
    setIsVerifying(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (otpValue === MOCK_OTP) {
        onVerified();
      } else {
        setError(
          language === 'en'
            ? 'Invalid OTP. Please try again. (Hint: Use 123456 for testing)'
            : 'ಅಮಾನ್ಯ OTP. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ. (ಸುಳಿವು: ಪರೀಕ್ಷೆಗಾಗಿ 123456 ಬಳಸಿ)'
        );
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
      setIsVerifying(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');

    if (otpValue.length !== 6) {
      setError(language === 'en' ? 'Please enter complete 6-digit OTP' : 'ದಯವಿಟ್ಟು ಸಂಪೂರ್ಣ 6-ಅಂಕಿಯ OTP ನಮೂದಿಸಿ');
      return;
    }

    verifyOtp(otpValue);
  };

  const handleResend = () => {
    setTimer(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    setError('');
    inputRefs.current[0]?.focus();
    // In production, this would trigger a new OTP request
    console.log('Resending OTP to:', phone);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">
          {language === 'en' ? 'Change Number' : 'ಸಂಖ್ಯೆ ಬದಲಾಯಿಸಿ'}
        </span>
      </button>

      <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-6">
        <Shield className="w-8 h-8 text-green-600" />
      </div>

      <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">
        {language === 'en' ? 'Verify OTP' : 'OTP ಪರಿಶೀಲಿಸಿ'}
      </h2>
      <p className="text-center text-gray-600 mb-2">
        {language === 'en'
          ? 'Enter the 6-digit code sent to'
          : 'ಕಳುಹಿಸಲಾದ 6-ಅಂಕಿಯ ಕೋಡ್ ಅನ್ನು ನಮೂದಿಸಿ'}
      </p>
      <p className="text-center text-blue-600 font-semibold mb-8">+91 {phone}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* OTP Input Boxes */}
        <div className="flex justify-center gap-2 md:gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          ))}
        </div>

        {/* Testing Hint */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
          <p className="text-xs text-blue-700 font-medium">
            {language === 'en' ? '🔐 Test OTP: 123456' : '🔐 ಪರೀಕ್ಷಾ OTP: 123456'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Timer and Resend */}
        <div className="text-center">
          {!canResend ? (
            <p className="text-sm text-gray-600">
              {language === 'en' ? 'Resend OTP in' : 'OTP ಮರುಕಳುಹಿಸಿ'}{' '}
              <span className="font-semibold text-blue-600">{timer}s</span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              {language === 'en' ? 'Resend OTP' : 'OTP ಮರುಕಳುಹಿಸಿ'}
            </button>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isVerifying || otp.join('').length !== 6}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isVerifying
            ? language === 'en'
              ? 'Verifying...'
              : 'ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...'
            : language === 'en'
            ? 'Verify & Continue'
            : 'ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಮುಂದುವರಿಸಿ'}
        </button>
      </form>
    </div>
  );
}
