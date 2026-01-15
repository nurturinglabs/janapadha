'use client';

import { useState } from 'react';
import { ArrowLeft, Phone, Shield, User, CreditCard, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import PhoneVerification from './components/PhoneVerification';
import OtpVerification from './components/OtpVerification';
import RegistrationForm from './components/RegistrationForm';
import PaymentStep from './components/PaymentStep';
import SuccessPage from './components/SuccessPage';
import { RegistrationData, Step } from '@/types/registration';

export default function RegisterPage() {
  const { t, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState<Step>('phone');
  const [registrationData, setRegistrationData] = useState<Partial<RegistrationData>>({});

  const steps = [
    { id: 'phone', label: language === 'en' ? 'Phone' : 'ಫೋನ್', icon: Phone },
    { id: 'otp', label: language === 'en' ? 'Verify' : 'ಪರಿಶೀಲಿಸಿ', icon: Shield },
    { id: 'form', label: language === 'en' ? 'Details' : 'ವಿವರಗಳು', icon: User },
    { id: 'payment', label: language === 'en' ? 'Payment' : 'ಪಾವತಿ', icon: CreditCard },
    { id: 'success', label: language === 'en' ? 'Done' : 'ಮುಗಿದಿದೆ', icon: CheckCircle },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  const handlePhoneSubmit = (phone: string, role: 'student' | 'parent') => {
    setRegistrationData({ ...registrationData, phone, role });
    setCurrentStep('otp');
  };

  const handleOtpVerified = () => {
    setCurrentStep('form');
  };

  const handleFormSubmit = (formData: Partial<RegistrationData>) => {
    setRegistrationData({ ...registrationData, ...formData });
    setCurrentStep('payment');
  };

  const handlePaymentComplete = () => {
    // Generate mock registration ID
    const registrationId = `JAN2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setRegistrationData({ ...registrationData, registrationId });
    setCurrentStep('success');
  };

  const handleBack = () => {
    const stepOrder: Step[] = ['phone', 'otp', 'form', 'payment', 'success'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">
            {language === 'en' ? 'Back to Home' : 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ'}
          </span>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {language === 'en' ? 'Competition Registration' : 'ಸ್ಪರ್ಧೆ ನೋಂದಣಿ'}
          </h1>
          <p className="text-gray-600">
            {language === 'en'
              ? 'Complete the steps below to register for JANAPADA'
              : 'ಜನಪದಕ್ಕೆ ನೋಂದಣಿ ಮಾಡಲು ಕೆಳಗಿನ ಹಂತಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ'}
          </p>
        </div>

        {/* Progress Steps */}
        {currentStep !== 'success' && (
          <div className="flex items-center justify-between mb-12">
            {steps.slice(0, -1).map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStepIndex;
              const isCompleted = index < currentStepIndex;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-green-600 text-white'
                          : isActive
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-xs mt-2 font-medium ${
                        isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 2 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 transition-all ${
                        isCompleted ? 'bg-green-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Step Content */}
      <div className="max-w-2xl mx-auto">
        {currentStep === 'phone' && (
          <PhoneVerification onSubmit={handlePhoneSubmit} />
        )}

        {currentStep === 'otp' && (
          <OtpVerification
            phone={registrationData.phone || ''}
            onVerified={handleOtpVerified}
            onBack={handleBack}
          />
        )}

        {currentStep === 'form' && (
          <RegistrationForm
            initialData={registrationData}
            onSubmit={handleFormSubmit}
            onBack={handleBack}
          />
        )}

        {currentStep === 'payment' && (
          <PaymentStep
            registrationData={registrationData}
            onPaymentComplete={handlePaymentComplete}
            onBack={handleBack}
          />
        )}

        {currentStep === 'success' && (
          <SuccessPage registrationData={registrationData as RegistrationData} />
        )}
      </div>
    </div>
  );
}
