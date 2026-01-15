'use client';

import { useState } from 'react';
import { CreditCard, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

interface PaymentStepProps {
  registrationData: any;
  onPaymentComplete: () => void;
  onBack: () => void;
}

export default function PaymentStep({ registrationData, onPaymentComplete, onBack }: PaymentStepProps) {
  const { language } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMockPayment = () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete();
    }, 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">
          {language === 'en' ? 'Back' : 'ಹಿಂದಕ್ಕೆ'}
        </span>
      </button>

      <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-6">
        <CreditCard className="w-8 h-8 text-green-600" />
      </div>

      <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">
        {language === 'en' ? 'Payment' : 'ಪಾವತಿ'}
      </h2>
      <p className="text-center text-gray-600 mb-8">
        {language === 'en' ? 'Complete your registration payment' : 'ನಿಮ್ಮ ನೋಂದಣಿ ಪಾವತಿಯನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ'}
      </p>

      {/* Registration Summary */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">
          {language === 'en' ? 'Registration Summary' : 'ನೋಂದಣಿ ಸಾರಾಂಶ'}
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">{language === 'en' ? 'Student Name' : 'ವಿದ್ಯಾರ್ಥಿ ಹೆಸರು'}:</span>
            <span className="font-semibold text-gray-900">{registrationData.studentName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{language === 'en' ? 'Grade' : 'ತರಗತಿ'}:</span>
            <span className="font-semibold text-gray-900">{registrationData.grade}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{language === 'en' ? 'Category' : 'ವರ್ಗ'}:</span>
            <span className="font-semibold text-gray-900 capitalize">
              {registrationData.category?.replace('_', ' ')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{language === 'en' ? 'Language' : 'ಭಾಷೆ'}:</span>
            <span className="font-semibold text-gray-900">
              {registrationData.language === 'en' ? 'English' : 'Kannada'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{language === 'en' ? 'School' : 'ಶಾಲೆ'}:</span>
            <span className="font-semibold text-gray-900">{registrationData.schoolName}</span>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="border-t border-b border-gray-200 py-6 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700">{language === 'en' ? 'Registration Fee' : 'ನೋಂದಣಿ ಶುಲ್ಕ'}</span>
          <span className="text-2xl font-bold text-gray-900">₹500</span>
        </div>
        <p className="text-xs text-gray-500">
          {language === 'en' ? '* Non-refundable entry fee' : '* ಮರುಪಾವತಿ ಮಾಡಲಾಗದ ನಮೂದು ಶುಲ್ಕ'}
        </p>
      </div>

      {/* Mock Payment Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-yellow-900 mb-1">
              {language === 'en' ? 'Demo Mode' : 'ಡೆಮೊ ಮೋಡ್'}
            </p>
            <p className="text-yellow-800">
              {language === 'en'
                ? 'This is a demo registration flow. No actual payment will be processed. Click the button below to simulate a successful payment.'
                : 'ಇದು ಡೆಮೊ ನೋಂದಣಿ ಪ್ರಕ್ರಿಯೆ. ನಿಜವಾದ ಪಾವತಿ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುವುದಿಲ್ಲ. ಯಶಸ್ವಿ ಪಾವತಿಯನ್ನು ಅನುಕರಿಸಲು ಕೆಳಗಿನ ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ.'}
            </p>
          </div>
        </div>
      </div>

      {/* Payment Methods Info */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-3">
          {language === 'en' ? 'When integrated, you will be able to pay using:' : 'ಸಂಯೋಜನೆಯಾದಾಗ, ನೀವು ಇವುಗಳನ್ನು ಬಳಸಿ ಪಾವತಿಸಬಹುದು:'}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-center">
            <div className="text-2xl mb-1">💳</div>
            <div className="text-xs font-medium text-gray-700">
              {language === 'en' ? 'Cards' : 'ಕಾರ್ಡ್‌ಗಳು'}
            </div>
          </div>
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-center">
            <div className="text-2xl mb-1">📱</div>
            <div className="text-xs font-medium text-gray-700">UPI</div>
          </div>
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-center">
            <div className="text-2xl mb-1">🏦</div>
            <div className="text-xs font-medium text-gray-700">
              {language === 'en' ? 'Net Banking' : 'ನೆಟ್ ಬ್ಯಾಂಕಿಂಗ್'}
            </div>
          </div>
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-center">
            <div className="text-2xl mb-1">👛</div>
            <div className="text-xs font-medium text-gray-700">
              {language === 'en' ? 'Wallets' : 'ವಾಲೆಟ್‌ಗಳು'}
            </div>
          </div>
        </div>
      </div>

      {/* Mock Payment Button */}
      <button
        onClick={handleMockPayment}
        disabled={isProcessing}
        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            {language === 'en' ? 'Processing...' : 'ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ...'}
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5" />
            {language === 'en' ? 'Simulate Payment Success' : 'ಪಾವತಿ ಯಶಸ್ಸನ್ನು ಅನುಕರಿಸಿ'}
          </>
        )}
      </button>

      {/* Security Note */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          🔒 {language === 'en'
            ? 'Payments will be securely processed via Razorpay when integrated'
            : 'ಸಂಯೋಜನೆಯಾದಾಗ Razorpay ಮೂಲಕ ಪಾವತಿಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುವುದು'}
        </p>
      </div>
    </div>
  );
}
