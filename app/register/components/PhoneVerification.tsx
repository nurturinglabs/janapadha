'use client';

import { useState } from 'react';
import { Phone, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

interface PhoneVerificationProps {
  onSubmit: (phone: string, role: 'student' | 'parent') => void;
}

export default function PhoneVerification({ onSubmit }: PhoneVerificationProps) {
  const { language } = useLanguage();
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'student' | 'parent'>('student');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (phone.length !== 10) {
      setError(language === 'en' ? 'Please enter a valid 10-digit phone number' : 'ದಯವಿಟ್ಟು ಮಾನ್ಯ 10-ಅಂಕಿಯ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ');
      return;
    }

    if (!acceptedTerms) {
      setError(language === 'en' ? 'Please accept the terms and conditions' : 'ದಯವಿಟ್ಟು ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳನ್ನು ಒಪ್ಪಿಕೊಳ್ಳಿ');
      return;
    }

    onSubmit(phone, role);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(value);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
      <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-6">
        <Phone className="w-8 h-8 text-blue-600" />
      </div>

      <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">
        {language === 'en' ? 'Phone Verification' : 'ಫೋನ್ ಪರಿಶೀಲನೆ'}
      </h2>
      <p className="text-center text-gray-600 mb-8">
        {language === 'en'
          ? 'Enter your phone number to receive a verification code'
          : 'ಪರಿಶೀಲನೆ ಕೋಡ್ ಪಡೆಯಲು ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Phone Number Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'en' ? 'Phone Number' : 'ಫೋನ್ ಸಂಖ್ಯೆ'} *
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-4 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-600 font-medium">
              +91
            </span>
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="9876543210"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {language === 'en' ? '10-digit mobile number' : '10-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ'}
          </p>
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {language === 'en' ? 'I am a:' : 'ನಾನು:'} *
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`p-4 border-2 rounded-lg text-center transition-all ${
                role === 'student'
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold">
                {language === 'en' ? 'Student' : 'ವಿದ್ಯಾರ್ಥಿ'}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {language === 'en' ? 'Grades 9-12' : 'ತರಗತಿ 9-12'}
              </div>
            </button>
            <button
              type="button"
              onClick={() => setRole('parent')}
              className={`p-4 border-2 rounded-lg text-center transition-all ${
                role === 'parent'
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold">
                {language === 'en' ? 'Parent/Guardian' : 'ಪೋಷಕರು/ಪಾಲಕರು'}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {language === 'en' ? 'On behalf of child' : 'ಮಗುವಿನ ಪರವಾಗಿ'}
              </div>
            </button>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            required
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            {language === 'en' ? (
              <>
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms & Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </>
            ) : (
              <>
                ನಾನು{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳನ್ನು
                </a>{' '}
                ಮತ್ತು{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  ಗೌಪ್ಯತಾ ನೀತಿಯನ್ನು
                </a>{' '}
                ಒಪ್ಪುತ್ತೇನೆ
              </>
            )}
          </label>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
        >
          {language === 'en' ? 'Send OTP' : 'OTP ಕಳುಹಿಸಿ'}
        </button>

        {/* Info */}
        <p className="text-center text-xs text-gray-500">
          {language === 'en'
            ? 'You will receive a 6-digit verification code via SMS'
            : 'ನೀವು SMS ಮೂಲಕ 6-ಅಂಕಿಯ ಪರಿಶೀಲನೆ ಕೋಡ್ ಅನ್ನು ಪಡೆಯುತ್ತೀರಿ'}
        </p>
      </form>
    </div>
  );
}
