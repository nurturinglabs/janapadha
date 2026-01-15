'use client';

import { useState } from 'react';
import { User, ArrowLeft, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

interface RegistrationFormProps {
  initialData: any;
  onSubmit: (formData: any) => void;
  onBack: () => void;
}

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal', 'Delhi'
];

export default function RegistrationForm({ initialData, onSubmit, onBack }: RegistrationFormProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    studentName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    grade: '',
    schoolName: '',
    schoolCity: '',
    schoolState: '',
    parentName: '',
    parentEmail: '',
    parentPhone: initialData.role === 'parent' ? initialData.phone : '',
    relationship: '',
    category: '',
    language: language,
    referralSource: '',
    ...initialData
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Student validations
    if (!formData.studentName.trim() || formData.studentName.length < 3) {
      newErrors.studentName = language === 'en' ? 'Full name must be at least 3 characters' : 'ಪೂರ್ಣ ಹೆಸರು ಕನಿಷ್ಠ 3 ಅಕ್ಷರಗಳಾಗಿರಬೇಕು';
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = language === 'en' ? 'Date of birth is required' : 'ಹುಟ್ಟಿದ ದಿನಾಂಕ ಅಗತ್ಯವಿದೆ';
    }
    if (!formData.gender) {
      newErrors.gender = language === 'en' ? 'Please select gender' : 'ದಯವಿಟ್ಟು ಲಿಂಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ';
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = language === 'en' ? 'Valid email is required' : 'ಮಾನ್ಯ ಇಮೇಲ್ ಅಗತ್ಯವಿದೆ';
    }
    if (!formData.grade) {
      newErrors.grade = language === 'en' ? 'Please select grade' : 'ದಯವಿಟ್ಟು ತರಗತಿ ಆಯ್ಕೆಮಾಡಿ';
    }
    if (!formData.schoolName.trim() || formData.schoolName.length < 5) {
      newErrors.schoolName = language === 'en' ? 'School name must be at least 5 characters' : 'ಶಾಲೆಯ ಹೆಸರು ಕನಿಷ್ಠ 5 ಅಕ್ಷರಗಳಾಗಿರಬೇಕು';
    }
    if (!formData.schoolCity.trim()) {
      newErrors.schoolCity = language === 'en' ? 'School city is required' : 'ಶಾಲೆಯ ನಗರ ಅಗತ್ಯವಿದೆ';
    }
    if (!formData.schoolState) {
      newErrors.schoolState = language === 'en' ? 'Please select state' : 'ದಯವಿಟ್ಟು ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ';
    }

    // Parent validations
    if (!formData.parentName.trim() || formData.parentName.length < 3) {
      newErrors.parentName = language === 'en' ? 'Parent name must be at least 3 characters' : 'ಪೋಷಕರ ಹೆಸರು ಕನಿಷ್ಠ 3 ಅಕ್ಷರಗಳಾಗಿರಬೇಕು';
    }
    if (!formData.parentEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentEmail)) {
      newErrors.parentEmail = language === 'en' ? 'Valid parent email is required' : 'ಮಾನ್ಯ ಪೋಷಕರ ಇಮೇಲ್ ಅಗತ್ಯವಿದೆ';
    }
    if (formData.parentPhone.length !== 10) {
      newErrors.parentPhone = language === 'en' ? 'Valid 10-digit phone number required' : 'ಮಾನ್ಯ 10-ಅಂಕಿಯ ಫೋನ್ ಸಂಖ್ಯೆ ಅಗತ್ಯವಿದೆ';
    }
    if (!formData.relationship) {
      newErrors.relationship = language === 'en' ? 'Please select relationship' : 'ದಯವಿಟ್ಟು ಸಂಬಂಧವನ್ನು ಆಯ್ಕೆಮಾಡಿ';
    }

    // Competition details
    if (!formData.category) {
      newErrors.category = language === 'en' ? 'Please select category' : 'ದಯವಿಟ್ಟು ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    } else {
      // Scroll to first error
      const firstError = document.querySelector('.border-red-500');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for this field
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
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

      <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mx-auto mb-6">
        <User className="w-8 h-8 text-purple-600" />
      </div>

      <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">
        {language === 'en' ? 'Registration Details' : 'ನೋಂದಣಿ ವಿವರಗಳು'}
      </h2>
      <p className="text-center text-gray-600 mb-8">
        {language === 'en' ? 'Fill in all the required information' : 'ಎಲ್ಲಾ ಅಗತ್ಯ ಮಾಹಿತಿಯನ್ನು ಭರ್ತಿ ಮಾಡಿ'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Student Information Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
            {language === 'en' ? 'Student Information' : 'ವಿದ್ಯಾರ್ಥಿ ಮಾಹಿತಿ'}
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Full Name' : 'ಪೂರ್ಣ ಹೆಸರು'} *
              </label>
              <input
                type="text"
                value={formData.studentName}
                onChange={(e) => handleChange('studentName', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.studentName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={language === 'en' ? 'Enter full name' : 'ಪೂರ್ಣ ಹೆಸರು ನಮೂದಿಸಿ'}
              />
              {errors.studentName && (
                <p className="text-xs text-red-600 mt-1">{errors.studentName}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Date of Birth' : 'ಹುಟ್ಟಿದ ದಿನಾಂಕ'} *
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                max={new Date(new Date().setFullYear(new Date().getFullYear() - 13)).toISOString().split('T')[0]}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.dateOfBirth && (
                <p className="text-xs text-red-600 mt-1">{errors.dateOfBirth}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Gender' : 'ಲಿಂಗ'} *
              </label>
              <select
                value={formData.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.gender ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">{language === 'en' ? 'Select' : 'ಆಯ್ಕೆಮಾಡಿ'}</option>
                <option value="male">{language === 'en' ? 'Male' : 'ಪುರುಷ'}</option>
                <option value="female">{language === 'en' ? 'Female' : 'ಮಹಿಳೆ'}</option>
                <option value="other">{language === 'en' ? 'Other' : 'ಇತರೆ'}</option>
              </select>
              {errors.gender && (
                <p className="text-xs text-red-600 mt-1">{errors.gender}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Email' : 'ಇಮೇಲ್'} *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="student@example.com"
              />
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Grade */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Grade/Class' : 'ತರಗತಿ'} *
              </label>
              <select
                value={formData.grade}
                onChange={(e) => handleChange('grade', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.grade ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">{language === 'en' ? 'Select' : 'ಆಯ್ಕೆಮಾಡಿ'}</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              {errors.grade && (
                <p className="text-xs text-red-600 mt-1">{errors.grade}</p>
              )}
            </div>

            {/* School Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'School Name' : 'ಶಾಲೆಯ ಹೆಸರು'} *
              </label>
              <input
                type="text"
                value={formData.schoolName}
                onChange={(e) => handleChange('schoolName', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.schoolName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={language === 'en' ? 'Enter school name' : 'ಶಾಲೆಯ ಹೆಸರು ನಮೂದಿಸಿ'}
              />
              {errors.schoolName && (
                <p className="text-xs text-red-600 mt-1">{errors.schoolName}</p>
              )}
            </div>

            {/* School City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'School City' : 'ಶಾಲೆಯ ನಗರ'} *
              </label>
              <input
                type="text"
                value={formData.schoolCity}
                onChange={(e) => handleChange('schoolCity', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.schoolCity ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={language === 'en' ? 'Enter city' : 'ನಗರ ನಮೂದಿಸಿ'}
              />
              {errors.schoolCity && (
                <p className="text-xs text-red-600 mt-1">{errors.schoolCity}</p>
              )}
            </div>

            {/* School State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'School State' : 'ಶಾಲೆಯ ರಾಜ್ಯ'} *
              </label>
              <select
                value={formData.schoolState}
                onChange={(e) => handleChange('schoolState', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.schoolState ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">{language === 'en' ? 'Select State' : 'ರಾಜ್ಯ ಆಯ್ಕೆಮಾಡಿ'}</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {errors.schoolState && (
                <p className="text-xs text-red-600 mt-1">{errors.schoolState}</p>
              )}
            </div>
          </div>
        </div>

        {/* Parent/Guardian Information Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
            {language === 'en' ? 'Parent/Guardian Information' : 'ಪೋಷಕರು/ಪಾಲಕರ ಮಾಹಿತಿ'}
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Parent Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Parent/Guardian Name' : 'ಪೋಷಕರು/ಪಾಲಕರ ಹೆಸರು'} *
              </label>
              <input
                type="text"
                value={formData.parentName}
                onChange={(e) => handleChange('parentName', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.parentName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={language === 'en' ? 'Enter name' : 'ಹೆಸರು ನಮೂದಿಸಿ'}
              />
              {errors.parentName && (
                <p className="text-xs text-red-600 mt-1">{errors.parentName}</p>
              )}
            </div>

            {/* Relationship */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Relationship' : 'ಸಂಬಂಧ'} *
              </label>
              <select
                value={formData.relationship}
                onChange={(e) => handleChange('relationship', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.relationship ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">{language === 'en' ? 'Select' : 'ಆಯ್ಕೆಮಾಡಿ'}</option>
                <option value="father">{language === 'en' ? 'Father' : 'ತಂದೆ'}</option>
                <option value="mother">{language === 'en' ? 'Mother' : 'ತಾಯಿ'}</option>
                <option value="guardian">{language === 'en' ? 'Guardian' : 'ಪಾಲಕ'}</option>
              </select>
              {errors.relationship && (
                <p className="text-xs text-red-600 mt-1">{errors.relationship}</p>
              )}
            </div>

            {/* Parent Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Parent Email' : 'ಪೋಷಕರ ಇಮೇಲ್'} *
              </label>
              <input
                type="email"
                value={formData.parentEmail}
                onChange={(e) => handleChange('parentEmail', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.parentEmail ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="parent@example.com"
              />
              {errors.parentEmail && (
                <p className="text-xs text-red-600 mt-1">{errors.parentEmail}</p>
              )}
            </div>

            {/* Parent Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Parent Phone' : 'ಪೋಷಕರ ಫೋನ್'} *
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-4 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-600">
                  +91
                </span>
                <input
                  type="tel"
                  value={formData.parentPhone}
                  onChange={(e) => handleChange('parentPhone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className={`flex-1 px-4 py-3 border rounded-r-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                    errors.parentPhone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="9876543210"
                  disabled={initialData.role === 'parent'}
                />
              </div>
              {errors.parentPhone && (
                <p className="text-xs text-red-600 mt-1">{errors.parentPhone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Competition Details Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
            {language === 'en' ? 'Competition Details' : 'ಸ್ಪರ್ಧೆಯ ವಿವರಗಳು'}
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Essay Category' : 'ಪ್ರಬಂಧ ವರ್ಗ'} *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">{language === 'en' ? 'Select Category' : 'ವರ್ಗ ಆಯ್ಕೆಮಾಡಿ'}</option>
                <option value="essay">{language === 'en' ? 'Essay' : 'ಪ್ರಬಂಧ'}</option>
                <option value="short_story">{language === 'en' ? 'Short Story' : 'ಕಿರುಕಥೆ'}</option>
                <option value="poetry">{language === 'en' ? 'Poetry' : 'ಕವಿತೆ'}</option>
                <option value="creative_non_fiction">{language === 'en' ? 'Creative Non-fiction' : 'ಸೃಜನಾತ್ಮಕ ಪ್ರಬಂಧ'}</option>
              </select>
              {errors.category && (
                <p className="text-xs text-red-600 mt-1">{errors.category}</p>
              )}
            </div>

            {/* Preferred Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Writing Language' : 'ಬರವಣಿಗೆ ಭಾಷೆ'} *
              </label>
              <select
                value={formData.language}
                onChange={(e) => handleChange('language', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="en">{language === 'en' ? 'English' : 'ಇಂಗ್ಲಿಷ್'}</option>
                <option value="kn">{language === 'en' ? 'Kannada' : 'ಕನ್ನಡ'}</option>
              </select>
            </div>

            {/* Referral Source (Optional) */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'How did you hear about JANAPADA? (Optional)' : 'ನೀವು ಜನಪದದ ಬಗ್ಗೆ ಹೇಗೆ ತಿಳಿದುಕೊಂಡಿರಿ? (ಐಚ್ಛಿಕ)'}
              </label>
              <select
                value={formData.referralSource}
                onChange={(e) => handleChange('referralSource', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">{language === 'en' ? 'Select' : 'ಆಯ್ಕೆಮಾಡಿ'}</option>
                <option value="school">{language === 'en' ? 'School' : 'ಶಾಲೆ'}</option>
                <option value="social_media">{language === 'en' ? 'Social Media' : 'ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ'}</option>
                <option value="friends">{language === 'en' ? 'Friends/Family' : 'ಸ್ನೇಹಿತರು/ಕುಟುಂಬ'}</option>
                <option value="website">{language === 'en' ? 'Website' : 'ವೆಬ್‌ಸೈಟ್'}</option>
                <option value="other">{language === 'en' ? 'Other' : 'ಇತರೆ'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error Summary */}
        {Object.keys(errors).length > 0 && (
          <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">
                {language === 'en' ? 'Please fix the following errors:' : 'ದಯವಿಟ್ಟು ಈ ದೋಷಗಳನ್ನು ಸರಿಪಡಿಸಿ:'}
              </p>
              <ul className="list-disc list-inside space-y-1">
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
        >
          {language === 'en' ? 'Continue to Payment' : 'ಪಾವತಿಗೆ ಮುಂದುವರಿಸಿ'}
        </button>
      </form>
    </div>
  );
}
