# BAREYIRI - Bilingual Website Implementation Plan

## Overview

The BAREYIRI website needs to be fully bilingual, supporting both English and Kannada with a language toggle feature. This document outlines the implementation approach.

---

## Implementation Approach

### 1. **Language Toggle UI**
- Floating language switcher in top-right corner
- Toggle between "EN" and "ಕನ್" (Kannada)
- Persists selection in localStorage
- Smooth transition when switching

### 2. **Translation Architecture**
```
lib/
  └── translations.ts         # All translations
app/
  └── context/
      └── LanguageContext.tsx # Language state management
components/
  └── LanguageToggle.tsx      # Toggle component
```

### 3. **Technical Stack**
- **React Context** for language state
- **TypeScript** for type-safe translations
- **localStorage** for persistence
- **No external i18n library** (lightweight custom solution)

---

## File Structure

### translations.ts
```typescript
export const translations = {
  en: {
    // All English content
  },
  kn: {
    // All Kannada content
  }
};
```

### LanguageContext.tsx
```typescript
'use client';
import { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'kn';

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}>({
  language: 'en',
  setLanguage: () => {},
  t: {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved) setLanguage(saved);
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage: changeLanguage,
      t: translations[language],
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
```

### LanguageToggle.tsx
```typescript
'use client';
import { useLanguage } from '../app/context/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'kn' : 'en')}
      className="fixed top-20 right-4 z-50 bg-white shadow-lg rounded-full px-4 py-2 border-2 border-primary hover:bg-primary hover:text-white transition-colors"
    >
      {language === 'en' ? 'ಕನ್' : 'EN'}
    </button>
  );
}
```

---

## Kannada Translations Required

### Navigation & Hero (Sample)
```typescript
kn: {
  nav: {
    about: "ನಮ್ಮ ಬಗ್ಗೆ",
    howItWorks: "ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
    rules: "ನಿಯಮಗಳು",
    faq: "ಪ್ರಶ್ನೆಗಳು",
    contact: "ಸಂಪರ್ಕ",
    registerNow: "ಈಗ ನೋಂದಾಯಿಸಿ",
  },
  hero: {
    title: "ಬರೆಯಿರಿ",
    subtitle: "ಯುವ ಓದುಗರು ಮತ್ತು ಬರಹಗಾರರನ್ನು ಪೋಷಿಸುವುದು - ಬೆಂಗಳೂರು",
    // ... more translations
  }
}
```

---

## Translation Guidelines

### 1. **Cultural Adaptation**
- Not just literal translation
- Adapt idioms and expressions
- Maintain cultural context
- Use appropriate formal/informal tone

### 2. **Font Considerations**
- Kannada requires Unicode font support
- Use system fonts that support Kannada:
  - Noto Sans Kannada
  - Tunga
  - Kedage

### 3. **Text Direction**
- Both English and Kannada are LTR (Left-to-Right)
- No RTL concerns

### 4. **Character Length**
- Kannada text may be longer/shorter than English
- Design must accommodate varying lengths
- Test all UI elements with both languages

---

## Implementation Steps

### Step 1: Setup (Week 1)
- [ ] Create translation files
- [ ] Implement LanguageContext
- [ ] Create LanguageToggle component
- [ ] Wrap app with LanguageProvider

### Step 2: Translation (Week 2-3)
- [ ] Translate all landing page content
- [ ] Translate navigation and footer
- [ ] Translate FAQ section
- [ ] Translate rules and guidelines
- [ ] Professional Kannada translation review

### Step 3: Testing (Week 4)
- [ ] Test toggle functionality
- [ ] Test localStorage persistence
- [ ] Test responsive design with Kannada text
- [ ] Browser compatibility testing
- [ ] Mobile device testing

### Step 4: Content Review (Ongoing)
- [ ] Native Kannada speaker review
- [ ] Educational terminology accuracy
- [ ] Cultural appropriateness
- [ ] Grammar and spelling check

---

## Sections Requiring Translation

### Landing Page
1. ✅ Navigation
2. ✅ Hero Section
3. ✅ Mission & Philosophy
4. ✅ How It Works
5. ✅ Important Dates
6. ✅ Prizes
7. ✅ Competition Rules
8. ✅ FAQ
9. ✅ Call-to-Action
10. ✅ Contact
11. ✅ Footer

### Registration Flow (Phase 2)
1. Phone verification screen
2. Registration form labels
3. Error messages
4. Success messages
5. Payment screen
6. Confirmation emails (bilingual)

### Student Dashboard (Phase 3)
1. Dashboard sections
2. Profile information
3. Competition status
4. Important notices

### Admin Panel
- Admin panel remains English-only
- Student-facing notifications in both languages

---

## SEO Considerations

### Meta Tags
```typescript
// For English
<html lang="en">
<title>BAREYIRI - Nurturing Young Readers & Writers | Bangalore</title>
<meta name="description" content="..." />

// For Kannada
<html lang="kn">
<title>ಬರೆಯಿರಿ - ಯುವ ಓದುಗರು ಮತ್ತು ಬರಹಗಾರರನ್ನು ಪೋಷಿಸುವುದು | ಬೆಂಗಳೂರು</title>
<meta name="description" content="..." />
```

### URL Structure Options

**Option 1: Query Parameter (Recommended for now)**
- `/` - Default (English)
- `/?lang=kn` - Kannada

**Option 2: Sub-paths (Future)**
- `/en` - English
- `/kn` - Kannada

---

## Font Implementation

### In globals.css
```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@400;500;600;700&display=swap');

body {
  font-family: 'Inter', 'Noto Sans Kannada', sans-serif;
}

/* Specific font for Kannada content */
[lang="kn"], .kannada-text {
  font-family: 'Noto Sans Kannada', sans-serif;
}
```

---

## Benefits of Bilingual Site

### 1. **Accessibility**
- Reaches Kannada-medium students
- Parents comfortable with Kannada
- Inclusive for non-English speakers

### 2. **Cultural Alignment**
- Shows commitment to Kannada literature
- Honors regional language
- Builds trust with local community

### 3. **Competition Advantage**
- Differentiates from English-only platforms
- Appeals to Kannada language preference
- Authentic commitment to bilingual mission

### 4. **Educational Value**
- Students see their language valued
- Encourages Kannada writing participation
- Preserves cultural heritage

---

## Challenges & Solutions

### Challenge 1: Translation Quality
- **Solution**: Hire professional Kannada translator
- Review by native speakers
- Educational terminology expert

### Challenge 2: Maintenance
- **Solution**: Maintain parallel updates
- Translation checklist for new content
- Version control for both languages

### Challenge 3: UI Layout
- **Solution**: Flexible CSS
- Test with longest translations
- Dynamic spacing

### Challenge 4: Email Templates
- **Solution**: Bilingual emails
- Language preference in user profile
- Default to registration language

---

## Translation Resources Needed

### Professional Services
1. **Kannada Translator** - For initial translation
2. **Educational Consultant** - For terminology
3. **Proofreader** - Native Kannada speaker
4. **Testing Team** - Bilingual users

### Tools
1. Google Translate (initial draft only, not final)
2. Kannada Unicode keyboard
3. Translation memory software (optional)

---

## Sample Kannada Translations

### Key Phrases
- "Register Now" → "ಈಗ ನೋಂದಾಯಿಸಿ"
- "Learn More" → "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ"
- "Competition Rules" → "ಸ್ಪರ್ಧೆಯ ನಿಯಮಗಳು"
- "FAQ" → "ಪ್ರಶ್ನೆಗಳು ಮತ್ತು ಉತ್ತರಗಳು"
- "Contact Us" → "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ"
- "Submit" → "ಸಲ್ಲಿಸು"
- "Next" → "ಮುಂದೆ"
- "Previous" → "ಹಿಂದೆ"

### Mission Statement (Sample)
**English:**
"A noble educational initiative promoting writing skills, encouraging reading, and cultivating love for literature."

**Kannada:**
"ಬರವಣಿಗೆ ಕೌಶಲ್ಯಗಳನ್ನು ಉತ್ತೇಜಿಸುವ, ಓದುವಿಕೆಯನ್ನು ಪ್ರೋತ್ಸಾಹಿಸುವ ಮತ್ತು ಸಾಹಿತ್ಯದ ಪ್ರೀತಿಯನ್ನು ಬೆಳೆಸುವ ಶ್ರೇಷ್ಠ ಶೈಕ್ಷಣಿಕ ಉಪಕ್ರಮ."

---

## Testing Checklist

### Functional Testing
- [ ] Language toggle works
- [ ] Preference persists across pages
- [ ] localStorage saves choice
- [ ] All content translates
- [ ] Forms work in both languages
- [ ] Error messages in correct language

### Visual Testing
- [ ] Text doesn't overflow containers
- [ ] Fonts render correctly
- [ ] Layout remains intact
- [ ] Images/icons appropriate
- [ ] Colors and styling consistent

### Device Testing
- [ ] Desktop (Chrome, Firefox, Safari, Edge)
- [ ] Mobile (iOS Safari, Android Chrome)
- [ ] Tablet
- [ ] Different screen sizes

---

## Launch Plan

### Soft Launch
1. Release with English
2. Add Kannada toggle (Beta)
3. Gather feedback
4. Refine translations

### Full Launch
1. Professional translation review
2. Complete testing
3. Marketing in both languages
4. Social media in both languages

---

## Future Enhancements

### Phase 1 (Current)
- Basic language toggle
- Landing page translation
- Static content

### Phase 2
- Dynamic content translation
- Registration form in Kannada
- Email templates bilingual

### Phase 3
- Admin dashboard translation toggles
- Reports in both languages
- Certificates bilingual

### Phase 4
- Voice-over in Kannada (video content)
- WhatsApp support in Kannada
- SMS in preferred language

---

## Cost Estimate

### Translation Services
- Landing page translation: ₹5,000 - ₹10,000
- Registration flow: ₹3,000 - ₹5,000
- Email templates: ₹2,000 - ₹3,000
- Proofreading & QA: ₹2,000 - ₹3,000

**Total Estimate: ₹12,000 - ₹21,000**

### Ongoing Costs
- New content translation: ₹1,000 - ₹2,000 per quarter
- Maintenance: Minimal (in-house)

---

## Success Metrics

- % of users choosing Kannada language
- Registration completion rate (Kannada vs English)
- User feedback on translation quality
- Engagement from Kannada-medium schools
- Participation rate in Kannada category

---

*This bilingual approach truly honors BAREYIRI's mission of cultural preservation and inclusive education, making the platform accessible to all students regardless of their language preference.*
