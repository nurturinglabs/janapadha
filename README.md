# JANAPADA - Nurturing Young Readers & Writers

> A noble educational initiative promoting writing skills, encouraging reading, and cultivating love for literature in English & Kannada.

## 🎯 Mission

JANAPADA is more than a competition - it's a movement to build a generation of readers and writers through quarterly essay writing competitions for high school students in Bangalore.

### Core Values
- 📚 **Reading Feeds Writing** - Wide reading builds vocabulary and creativity
- 🌐 **Bilingual Excellence** - Equal celebration of English and Kannada
- ✍️ **Essential Life Skills** - Writing is fundamental for every child
- 🌱 **Holistic Development** - Reading and writing develop critical thinking, empathy, and communication
- 🎭 **Cultural Preservation** - Supporting Kannada literature alongside English

## 🎓 Project Overview

**Type**: Quarterly Essay Writing Competition Platform
**Target**: High school students (grades 9-12) in Bangalore
**Languages**: English & Kannada
**Frequency**: 4 competitions per year (Q1, Q2, Q3, Q4)
**Model**: Category announced before each quarter's registration

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **UI Components**: Custom components with shadcn/ui patterns

### Backend (Planned)
- **Database**: Firebase Firestore
- **Authentication**: Firebase Authentication (Phone + Email/Password)
- **Storage**: Firebase Storage
- **Payments**: Razorpay
- **Hosting**: Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Navigate to the project directory
```bash
cd Janapada
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎉 What's New (Latest Update)

### Email Notification System ✅
- Automated confirmation emails upon registration
- Bilingual HTML email templates (English & Kannada)
- Integrated with Resend email service
- Development mode for testing without API key
- Sends to both student and parent email addresses
- See [EMAIL_SETUP.md](EMAIL_SETUP.md) for setup guide

### Admin Dashboard ✅
- Complete admin panel at `/admin`
- Real-time registration statistics
- Search and filter registrations
- Export to CSV functionality
- Detailed registration view modal
- Demo login credentials: `admin@janapada.com` / `admin123`
- See [ADMIN_DASHBOARD_GUIDE.md](ADMIN_DASHBOARD_GUIDE.md) for full guide

### Registration System ✅
- Complete 5-step registration flow at `/register`
- Phone verification with OTP (test code: 123456)
- Comprehensive student and parent information collection
- Mock payment processing
- Bilingual throughout (Kannada default)
- Registration ID generation (format: JAN2026-XXXX)

## 📁 Project Structure

```
Janapada/
├── app/                           # Next.js app directory
│   ├── page.tsx                   # Landing page
│   ├── layout.tsx                 # Root layout
│   ├── globals.css                # Global styles
│   ├── register/                  # Registration flow ✅
│   │   ├── page.tsx              # Main registration wizard
│   │   └── components/           # Step components
│   ├── admin/                     # Admin panel ✅
│   │   ├── page.tsx              # Admin login
│   │   └── dashboard/            # Dashboard pages
│   ├── api/                       # API routes ✅
│   │   └── send-email/           # Email sending endpoint
│   └── context/                   # React contexts
│       └── LanguageContext.tsx   # i18n context
├── components/                    # Reusable components
│   └── LanguageToggle.tsx        # Language switcher
├── lib/                           # Utilities ✅
│   ├── translations.ts           # Bilingual content
│   ├── email-templates.tsx       # Email HTML templates
│   └── mock-registrations.ts     # Demo data
├── types/                         # TypeScript types ✅
│   └── registration.ts           # Shared interfaces
├── public/                        # Static assets
├── .env.local                     # Environment variables ✅
├── EMAIL_SETUP.md                 # Email configuration guide ✅
├── ADMIN_DASHBOARD_GUIDE.md       # Admin panel guide ✅
├── REQUIREMENTS.md                # Technical requirements
├── UPDATED_SCOPE.md               # Business model
├── MISSION.md                     # Mission & philosophy
└── README.md                      # This file
```

## 📋 Current Status

### ✅ Phase 1 - Landing Page (COMPLETED)
- [x] Hero section with competition info
- [x] Mission & philosophy section
- [x] Reading-writing connection emphasis
- [x] Bilingual focus (English & Kannada)
- [x] How it works (quarterly model)
- [x] Important dates & prizes
- [x] Competition rules
- [x] FAQ section
- [x] Contact information
- [x] Responsive design
- [x] SEO optimization

### ✅ Phase 2 - Registration System (COMPLETED)
- [x] Complete 5-step registration flow UI
- [x] Phone number verification with mock OTP (123456)
- [x] Comprehensive registration form
- [x] Mock payment processing
- [x] Success page with registration ID
- [x] Email confirmation system (Resend integration)
- [x] Bilingual support throughout
- [x] Validation and error handling
- [x] Progress indicator
- [ ] Firebase integration (pending)
- [ ] Razorpay integration (pending)

### ✅ Phase 3 - Admin Dashboard (COMPLETED)
- [x] Admin authentication (demo mode)
- [x] Dashboard with statistics
- [x] View all registrations
- [x] Search and filter functionality
- [x] Export to CSV
- [x] Detailed registration view
- [x] Category and language breakdown
- [x] Responsive admin panel
- [ ] Firebase Admin integration (pending)
- [ ] Real-time data updates (pending)

### 📅 Phase 4 - Advanced Features (PLANNED)
- [ ] Essay submission system
- [ ] File upload to Firebase Storage
- [ ] Admin evaluation tools
- [ ] Results publication
- [ ] Certificate generation
- [ ] Historical data & analytics
- [ ] Multi-quarter leaderboards
- [ ] Automated email reminders

## 🎨 Design Philosophy

- **Mobile-first**: Designed for smartphones and tablets
- **Clean & Modern**: Professional yet engaging for teenagers
- **Fast Loading**: Optimized for performance (<3 seconds)
- **Accessibility**: WCAG 2.1 Level AA compliant
- **Cultural Sensitivity**: Respectful of bilingual education

## 🔑 Key Features (Planned)

### For Students
- Phone-based registration
- Choose language (English or Kannada)
- Upload essays (PDF/DOCX)
- Track submission status
- View results and certificates
- Participate in multiple quarters

### For Admins
- Create quarterly competitions
- Announce categories
- Manage eligible localities
- View registrations by competition
- Evaluate submissions
- Publish results
- Generate reports

## 📖 Documentation

- **[MISSION.md](MISSION.md)** - Detailed mission, philosophy, and vision
- **[REQUIREMENTS.md](REQUIREMENTS.md)** - Original technical requirements
- **[UPDATED_SCOPE.md](UPDATED_SCOPE.md)** - Updated business model and data structures

## 🌟 Competition Model

### Quarterly Schedule
- **Q1**: January - March
- **Q2**: April - June
- **Q3**: July - September
- **Q4**: October - December

### Categories (Rotating)
One category per quarter, announced before registration:
- Essay Writing (1000-1500 words)
- Short Story (1500-2500 words)
- Poetry (up to 50 lines)
- Creative Non-fiction (1000-1500 words)

### Prizes (Per Quarter)
- 🥇 First Place: ₹5,000 + Certificate + Trophy
- 🥈 Second Place: ₹3,000 + Certificate + Trophy
- 🥉 Third Place: ₹1,500 + Certificate + Trophy
- 📜 Participation certificates for all qualified submissions

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔐 Environment Variables (Coming Soon)

Create a `.env.local` file with:
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

## 🤝 Contributing

This is a private educational initiative. For collaboration inquiries, please contact the project maintainers.

## 📧 Contact

- **Email**: support@janapada.com
- **Phone**: +91 98765 43210
- **Location**: Bangalore, Karnataka

## 📄 License

All rights reserved © 2025 JANAPADA

## 🙏 Acknowledgments

This initiative is built with love for:
- Young minds eager to express themselves
- Parents supporting their children's literary journey
- Educators fostering creativity in classrooms
- Communities valuing both English and Kannada literature
- Everyone who believes in the power of reading and writing

---

**Building a Generation of Readers and Writers, One Quarter at a Time**

*"A reader lives a thousand lives before he dies. The man who never reads lives only one."* - George R.R. Martin
