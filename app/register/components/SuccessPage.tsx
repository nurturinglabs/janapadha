'use client';

import { CheckCircle, Download, Home, FileText, Mail, Phone, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';
import { useEffect, useState } from 'react';

interface SuccessPageProps {
  registrationData: {
    registrationId?: string;
    studentName: string;
    email: string;
    grade: string;
    category: string;
    language: string;
    phone: string;
  };
}

export default function SuccessPage({ registrationData }: SuccessPageProps) {
  const { language } = useLanguage();
  const [emailStatus, setEmailStatus] = useState<'sending' | 'sent' | 'error'>('sending');
  const [emailMessage, setEmailMessage] = useState('');

  // Send confirmation email on mount
  useEffect(() => {
    const sendConfirmationEmail = async () => {
      try {
        console.log('📧 Sending confirmation email...', registrationData);

        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            registrationData,
            language: registrationData.language,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          setEmailStatus('sent');
          setEmailMessage(
            language === 'en'
              ? 'Confirmation email sent successfully!'
              : 'ದೃಢೀಕರಣ ಇಮೇಲ್ ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ!'
          );
          console.log('✅ Email sent:', result);
        } else {
          throw new Error(result.error || 'Failed to send email');
        }
      } catch (error) {
        console.error('❌ Error sending email:', error);
        setEmailStatus('error');
        setEmailMessage(
          language === 'en'
            ? 'Failed to send confirmation email. Please contact support.'
            : 'ದೃಢೀಕರಣ ಇಮೇಲ್ ಕಳುಹಿಸಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಬೆಂಬಲವನ್ನು ಸಂಪರ್ಕಿಸಿ.'
        );
      }
    };

    sendConfirmationEmail();
  }, [registrationData, language]);

  const handleDownloadReceipt = () => {
    // In production, this would generate and download a PDF receipt
    alert(
      language === 'en'
        ? 'Receipt download will be available when integrated with backend'
        : 'ಬ್ಯಾಕೆಂಡ್‌ನೊಂದಿಗೆ ಸಂಯೋಜಿಸಿದಾಗ ರಸೀದಿ ಡೌನ್‌ಲೋಡ್ ಲಭ್ಯವಿರುತ್ತದೆ'
    );
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Email Status Notification */}
      {emailStatus === 'sending' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
          <p className="text-blue-800 text-sm">
            {language === 'en'
              ? 'Sending confirmation email...'
              : 'ದೃಢೀಕರಣ ಇಮೇಲ್ ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...'}
          </p>
        </div>
      )}

      {emailStatus === 'sent' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-green-800 text-sm">{emailMessage}</p>
        </div>
      )}

      {emailStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
          <Mail className="w-5 h-5 text-red-600" />
          <p className="text-red-800 text-sm">{emailMessage}</p>
        </div>
      )}

      {/* Success Animation */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 animate-bounce">
          <CheckCircle className="w-16 h-16 text-green-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {language === 'en' ? '🎉 Registration Successful!' : '🎉 ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿದೆ!'}
        </h1>
        <p className="text-lg text-gray-600">
          {language === 'en'
            ? 'Welcome to JANAPADA! Your registration has been confirmed.'
            : 'ಜನಪದಕ್ಕೆ ಸ್ವಾಗತ! ನಿಮ್ಮ ನೋಂದಣಿಯನ್ನು ದೃಢೀಕರಿಸಲಾಗಿದೆ.'}
        </p>
      </div>

      {/* Registration Details Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            {language === 'en' ? 'Registration Details' : 'ನೋಂದಣಿ ವಿವರಗಳು'}
          </h2>
          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
            {language === 'en' ? 'Confirmed' : 'ದೃಢೀಕರಿಸಲಾಗಿದೆ'}
          </div>
        </div>

        {/* Registration ID - Prominent */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6 text-center border-2 border-blue-200">
          <p className="text-sm text-gray-600 mb-1">
            {language === 'en' ? 'Your Registration ID' : 'ನಿಮ್ಮ ನೋಂದಣಿ ID'}
          </p>
          <p className="text-3xl font-black text-blue-600 tracking-wider">
            {registrationData.registrationId}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {language === 'en' ? 'Save this ID for future reference' : 'ಭವಿಷ್ಯದ ಉಲ್ಲೇಖಕ್ಕಾಗಿ ಈ ID ಅನ್ನು ಉಳಿಸಿ'}
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-1">{language === 'en' ? 'Student Name' : 'ವಿದ್ಯಾರ್ಥಿ ಹೆಸರು'}</p>
            <p className="font-semibold text-gray-900">{registrationData.studentName}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-1">{language === 'en' ? 'Grade' : 'ತರಗತಿ'}</p>
            <p className="font-semibold text-gray-900">{registrationData.grade}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-1">{language === 'en' ? 'Category' : 'ವರ್ಗ'}</p>
            <p className="font-semibold text-gray-900 capitalize">
              {registrationData.category?.replace('_', ' ')}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-1">{language === 'en' ? 'Language' : 'ಭಾಷೆ'}</p>
            <p className="font-semibold text-gray-900">
              {registrationData.language === 'en' ? 'English' : 'Kannada'}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-1">{language === 'en' ? 'Email' : 'ಇಮೇಲ್'}</p>
            <p className="font-semibold text-gray-900 text-xs">{registrationData.email}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-1">{language === 'en' ? 'Phone' : 'ಫೋನ್'}</p>
            <p className="font-semibold text-gray-900">+91 {registrationData.phone}</p>
          </div>
        </div>
      </div>

      {/* Next Steps Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          {language === 'en' ? 'Next Steps' : 'ಮುಂದಿನ ಹಂತಗಳು'}
        </h3>
        <ul className="space-y-3 text-sm text-gray-700">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
              1
            </span>
            <div>
              <p className="font-semibold text-gray-900">
                {language === 'en' ? 'Check Your Email' : 'ನಿಮ್ಮ ಇಮೇಲ್ ಪರಿಶೀಲಿಸಿ'}
              </p>
              <p>
                {language === 'en'
                  ? 'A confirmation email with all details has been sent to your registered email address.'
                  : 'ಎಲ್ಲಾ ವಿವರಗಳೊಂದಿಗೆ ದೃಢೀಕರಣ ಇಮೇಲ್ ಅನ್ನು ನಿಮ್ಮ ನೋಂದಾಯಿತ ಇಮೇಲ್ ವಿಳಾಸಕ್ಕೆ ಕಳುಹಿಸಲಾಗಿದೆ.'}
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
              2
            </span>
            <div>
              <p className="font-semibold text-gray-900">
                {language === 'en' ? 'Prepare for the Competition' : 'ಸ್ಪರ್ಧೆಗಾಗಿ ತಯಾರಿ ಮಾಡಿ'}
              </p>
              <p>
                {language === 'en'
                  ? 'Competition date: March 22, 2026. Submission deadline: March 15, 2026.'
                  : 'ಸ್ಪರ್ಧೆಯ ದಿನಾಂಕ: ಮಾರ್ಚ್ 22, 2026. ಸಲ್ಲಿಕೆ ಕೊನೆಯ ದಿನಾಂಕ: ಮಾರ್ಚ್ 15, 2026.'}
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
              3
            </span>
            <div>
              <p className="font-semibold text-gray-900">
                {language === 'en' ? 'Access Dashboard' : 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಪ್ರವೇಶಿಸಿ'}
              </p>
              <p>
                {language === 'en'
                  ? 'Track your submission status and view important updates in your dashboard.'
                  : 'ನಿಮ್ಮ ಸಲ್ಲಿಕೆ ಸ್ಥಿತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ ಮತ್ತು ನಿಮ್ಮ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ನಲ್ಲಿ ಪ್ರಮುಖ ನವೀಕರಣಗಳನ್ನು ವೀಕ್ಷಿಸಿ.'}
              </p>
            </div>
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <button
          onClick={handleDownloadReceipt}
          className="flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-lg font-semibold hover:bg-gray-50 hover:border-blue-600 hover:text-blue-600 transition-all"
        >
          <Download className="w-5 h-5" />
          {language === 'en' ? 'Download Receipt' : 'ರಸೀದಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ'}
        </button>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
        >
          <Home className="w-5 h-5" />
          {language === 'en' ? 'Back to Home' : 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ'}
        </Link>
      </div>

      {/* Contact Support */}
      <div className="text-center bg-gray-50 rounded-xl p-6">
        <p className="text-sm text-gray-600 mb-3">
          {language === 'en' ? 'Need help? Contact us' : 'ಸಹಾಯ ಬೇಕೇ? ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ'}
        </p>
        <div className="flex items-center justify-center gap-6 text-sm">
          <a
            href="mailto:hello@janapada.com"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <Mail className="w-4 h-4" />
            hello@janapada.com
          </a>
          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <Phone className="w-4 h-4" />
            +91 98765 43210
          </a>
        </div>
      </div>
    </div>
  );
}
