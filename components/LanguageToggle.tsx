'use client';

import { useLanguage } from '@/app/context/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'kn' : 'en')}
      className="fixed top-4 right-4 z-[100] bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-1.5 rounded-md shadow-lg transition-all duration-200 hover:scale-105 text-xs"
      aria-label="Toggle Language"
    >
      {language === 'en' ? 'ಕನ್ನಡ' : 'English'}
    </button>
  );
}
