# JANAPADA - Requirements Document

## 1. PROJECT OVERVIEW

**Project Name**: JANAPADA
**Type**: Essay Writing Competition Registration & Management Platform
**Target Users**: High school students (grades 9-12) in India
**Geography**: India

### Purpose
Online platform for students to register for an essay writing competition with phone verification, payment processing, and admin management.

---

## 2. TECHNOLOGY STACK

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (utility classes only)
- **UI Components**: shadcn/ui (optional)
- **Icons**: Lucide React

### Backend
- **Database**: Firebase Firestore
- **Authentication**: Firebase Authentication (Phone + Email/Password for admin)
- **File Storage**: Firebase Storage (for Phase 2)
- **Hosting**: Vercel

### Third-Party Services
- **Payment Gateway**: Razorpay
- **SMS**: Firebase Phone Authentication (OTP)
- **Email**: Resend or SendGrid (optional)

### Development Tools
- **Build Tool**: Vercel/Next.js
- **Package Manager**: npm or yarn
- **Version Control**: Git

---

## 3. FUNCTIONAL REQUIREMENTS

### 3.1 Public Landing Page (`/`)

**URL**: `/`
**Access**: Public

**Required Sections**:
1. Hero Section
   - Competition name: "BAREYIRI"
   - Tagline/description
   - Prominent "Register Now" CTA button

2. About Competition
   - What is JANAPADA
   - Who can participate (grades 9-12)
   - Why participate

3. Key Information
   - Essay categories (Essay, Short Story, Poetry, Creative Non-fiction)
   - Important dates:
     - Registration deadline
     - Essay submission deadline
     - Results announcement
   - Prizes/recognition
   - Registration fee: ₹500

4. Competition Rules
   - Eligibility criteria
   - Submission guidelines
   - Word limits
   - Plagiarism policy
   - Judging criteria

5. FAQ Section
   - Common questions and answers

6. Contact Information
   - Email
   - Phone
   - Social media links

**Design Requirements**:
- Mobile-responsive
- Clean, modern design
- Professional yet engaging for teenagers
- Fast loading (<3 seconds)

---

### 3.2 Registration Flow (`/register`)

#### Step 1: Phone Verification

**Fields**:
- Phone number input (10 digits)
- Auto-add +91 prefix
- Radio: "I am a:" (Student / Parent)
- Checkbox: "I agree to Terms & Conditions"

**Validations**:
- Phone must be exactly 10 digits
- Must select role (Student/Parent)
- Must accept terms
- Check for duplicate registrations

**Actions**:
- "Send OTP" button
- Triggers Firebase Phone Auth
- Sends 6-digit OTP via SMS

**Business Rules**:
- One registration per phone number
- OTP valid for 60 seconds
- Show countdown timer
- Allow resend after 60 seconds

---

#### Step 2: OTP Verification

**Fields**:
- 6-digit OTP input
- Auto-focus on page load

**Actions**:
- "Verify OTP" button
- "Resend OTP" link (after timer expires)
- "Change Phone Number" link

**Validations**:
- Must be exactly 6 digits
- Max 3 attempts
- Clear error messages

**Business Rules**:
- On success: Store phone in session, proceed to Step 3
- On failure: Show error, decrement attempts
- After 3 failures: Request new OTP

---

#### Step 3: Registration Form

**Student Information**:
- Full Name (required, min 3 chars)
- Date of Birth (required, date picker)
- Gender (required, dropdown: Male/Female/Other/Prefer not to say)
- Email (required, valid email format)
- Grade/Class (required, dropdown: 9, 10, 11, 12)
- School Name (required, min 5 chars)
- School City (required, min 3 chars)
- School State (required, dropdown with all Indian states)

**Parent/Guardian Information**:
- Parent Name (required, min 3 chars)
- Parent Email (required, valid email format)
- Parent Phone (pre-filled if registering as parent, otherwise required)
- Relationship (required, dropdown: Father/Mother/Guardian)

**Essay Category Selection**:
- Category (required, radio buttons):
  - Essay
  - Short Story
  - Poetry
  - Creative Non-fiction
- Preferred Language (required, radio: English/Hindi/Kannada)

**Additional Information**:
- How did you hear about BAREYIRI? (optional, dropdown):
  - School
  - Social Media
  - Friends/Family
  - Website
  - Other

**Validations**:
- All required fields must be filled
- Email format validation
- Age validation (must be between 13-19 years based on DOB)
- Grade must match age appropriately (soft warning, not blocking)
- Duplicate email check
- Parent phone different from student phone (if registering as student)

**Actions**:
- "Previous" button (go back to OTP step)
- "Proceed to Payment" button

**Business Rules**:
- Form data saved to Firestore with status: "pending_payment"
- Generate unique registration ID
- Session maintained across steps

---

#### Step 4: Payment

**Display Information**:
- Registration summary:
  - Student name
  - Grade
  - Category
  - Registration fee: ₹500

**Payment Method**:
- Razorpay integration
- Supports: UPI, Cards, Net Banking, Wallets

**Razorpay Configuration**:
- Amount: ₹500 (50000 paise)
- Currency: INR
- Prefill:
  - Name: Student name
  - Email: Student email
  - Contact: Student phone

**Actions**:
- "Pay ₹500" button
- Triggers Razorpay checkout modal

**Business Rules**:
- On payment success:
  - Update Firestore record: status = "registered"
  - Store payment details (order_id, payment_id, signature)
  - Send confirmation email to student and parent
  - Redirect to success page
- On payment failure:
  - Keep registration as "pending_payment"
  - Show error message
  - Allow retry
- Payment verification:
  - Verify signature using Razorpay webhook/API
  - Store transaction timestamp

---

#### Step 5: Success/Confirmation Page

**URL**: `/register/success`
**Access**: Only accessible after successful payment

**Display**:
- Success message with confetti/celebration animation
- Registration details:
  - Registration ID
  - Student name
  - Category
  - Payment status: Paid
- Next steps:
  - Essay submission opens on: [date]
  - Submission deadline: [date]
  - Dashboard link

**Actions**:
- "Download Receipt" button (generates PDF)
- "Go to Dashboard" button (redirects to `/dashboard`)
- "Back to Home" button

**Email Notifications**:
- Send to student email:
  - Subject: "Registration Confirmed - JANAPADA"
  - Registration details
  - Payment receipt
  - Next steps
  - Dashboard login link
- Send to parent email:
  - Subject: "Your child registered for JANAPADA"
  - Same information as student email

---

### 3.3 Student Dashboard (`/dashboard`)

**URL**: `/dashboard`
**Access**: Protected (requires phone authentication)

**Authentication**:
- Phone number + OTP login
- Session management using Firebase Auth
- Auto-logout after 24 hours of inactivity

#### Dashboard Sections:

**1. Profile Card**:
- Student name
- Registration ID
- Grade, School
- Category selected
- Registration status badge

**2. Competition Status**:
- Current phase indicator:
  - Registration Open
  - Essay Submission Open
  - Submission Closed
  - Under Evaluation
  - Results Announced
- Days remaining till deadline

**3. Essay Submission (Phase 2)**:
- Upload essay file (PDF/DOCX, max 5MB)
- Word count display
- Submit button
- Submission confirmation
- View submitted essay
- Edit/replace before deadline
- Download submitted essay

**4. Important Dates**:
- Registration deadline
- Submission deadline
- Results date

**5. Quick Actions**:
- Download registration receipt
- Download submission receipt (after submission)
- Update contact information (limited fields)
- Logout

**Business Rules**:
- Can only access own registration data
- Essay submission only available during submission window
- Cannot edit registration after payment
- Can update email/parent phone only

---

### 3.4 Admin Panel (`/admin`)

**URL**: `/admin`
**Access**: Protected (email/password authentication)

**Admin Credentials**:
- Stored in Firebase Auth
- Email/password login
- Role-based access control

#### Admin Dashboard Sections:

**1. Overview Dashboard**:
- Total registrations count
- Total revenue (₹500 × registrations)
- Registrations by grade (pie chart)
- Registrations by category (bar chart)
- Registrations by state (table)
- Registrations over time (line graph)
- Payment status breakdown:
  - Completed
  - Pending
  - Failed

**2. Registrations Management**:
- Table view with columns:
  - Registration ID
  - Student Name
  - Grade
  - School
  - Category
  - Phone
  - Email
  - Payment Status
  - Registration Date
  - Actions

**Filters**:
- By grade
- By category
- By state
- By payment status
- By date range
- Search by name/phone/email/registration ID

**Actions per row**:
- View full details (modal)
- Download receipt
- Send reminder email
- Mark payment manually (with reason)
- Export data (Excel/CSV)

**Bulk Actions**:
- Select multiple registrations
- Send bulk emails
- Export selected
- Generate reports

**3. Essay Submissions (Phase 2)**:
- Table of all submissions
- Filter by category
- Download all essays (ZIP)
- View individual essay
- Plagiarism check status
- Evaluation status
- Assign to evaluators

**4. Settings**:
- Update competition dates
- Toggle registration open/closed
- Toggle submission open/closed
- Update fee amount
- Update categories
- Update email templates
- Manage admin users

**5. Reports**:
- Generate custom reports
- Export data in various formats
- Financial reports
- Registration analytics

**Business Rules**:
- Only authenticated admins can access
- All admin actions logged
- Cannot delete registrations (only archive)
- Cannot edit payment details without audit trail

---

## 4. DATA MODEL

### 4.1 Firestore Collections

#### Collection: `registrations`

Document ID: Auto-generated
**Fields**:
```typescript
{
  registrationId: string;           // Unique, e.g., JAN2025-0001
  createdAt: timestamp;
  updatedAt: timestamp;
  status: string;                   // 'pending_payment' | 'registered' | 'submitted' | 'evaluated'

  // Student Info
  student: {
    fullName: string;
    dateOfBirth: string;            // YYYY-MM-DD
    age: number;
    gender: string;
    email: string;
    phone: string;                  // +91XXXXXXXXXX
    grade: number;                  // 9, 10, 11, 12
    schoolName: string;
    schoolCity: string;
    schoolState: string;
  },

  // Parent Info
  parent: {
    name: string;
    email: string;
    phone: string;
    relationship: string;
  },

  // Competition
  category: string;                 // 'essay' | 'short_story' | 'poetry' | 'creative_non_fiction'
  language: string;                 // 'english' | 'hindi' | 'kannada'
  referralSource: string;           // Optional

  // Payment
  payment: {
    amount: number;                 // 500
    currency: string;               // INR
    status: string;                 // 'pending' | 'success' | 'failed'
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
    paidAt: timestamp;
    failureReason: string;          // If failed
  },

  // Submission (Phase 2)
  submission: {
    fileUrl: string;
    fileName: string;
    fileSize: number;
    wordCount: number;
    submittedAt: timestamp;
    plagiarismScore: number;
    plagiarismCheckedAt: timestamp;
  },

  // Evaluation (Phase 2)
  evaluation: {
    evaluatorId: string;
    score: number;
    feedback: string;
    evaluatedAt: timestamp;
    rank: number;
    prize: string;
  },

  // Metadata
  registrantRole: string;           // 'student' | 'parent'
  ipAddress: string;
  userAgent: string;
}
```

**Indexes**:
- `status`
- `student.email`
- `student.phone`
- `student.grade`
- `category`
- `payment.status`
- `createdAt` (descending)
- Composite: `status` + `createdAt`
- Composite: `student.grade` + `category`

---

#### Collection: `admin_users`

Document ID: Firebase Auth UID
**Fields**:
```typescript
{
  uid: string;
  email: string;
  displayName: string;
  role: string;                     // 'super_admin' | 'admin' | 'evaluator'
  permissions: string[];            // ['view_registrations', 'export_data', 'manage_settings']
  createdAt: timestamp;
  lastLogin: timestamp;
  isActive: boolean;
}
```

---

#### Collection: `admin_logs`

Document ID: Auto-generated
**Fields**:
```typescript
{
  adminUid: string;
  adminEmail: string;
  action: string;                   // 'viewed_registration', 'exported_data', 'sent_email', etc.
  resourceType: string;             // 'registration', 'settings', etc.
  resourceId: string;
  details: object;                  // Additional context
  ipAddress: string;
  timestamp: timestamp;
}
```

---

#### Collection: `settings`

Document ID: `competition_settings`
**Fields**:
```typescript
{
  registrationOpenDate: timestamp;
  registrationCloseDate: timestamp;
  submissionOpenDate: timestamp;
  submissionCloseDate: timestamp;
  resultsDate: timestamp;

  registrationFee: number;

  categories: string[];
  languages: string[];
  grades: number[];

  isRegistrationOpen: boolean;
  isSubmissionOpen: boolean;
  isResultsPublished: boolean;

  maxWordCount: {
    essay: number;
    short_story: number;
    poetry: number;
    creative_non_fiction: number;
  },

  emailTemplates: {
    registrationConfirmation: string;
    submissionConfirmation: string;
    paymentReminder: string;
    resultsAnnouncement: string;
  },

  contactInfo: {
    email: string;
    phone: string;
    socialMedia: object;
  },

  updatedAt: timestamp;
  updatedBy: string;
}
```

---

### 4.2 Firebase Storage Structure

```
/submissions/
  /{registrationId}/
    /essay.pdf (or .docx)
    /receipt.pdf

/receipts/
  /{registrationId}/
    /payment_receipt.pdf
```

---

## 5. API ENDPOINTS / SERVER ACTIONS

### 5.1 Public Endpoints

**POST `/api/register/send-otp`**
- Body: `{ phone: string, role: string }`
- Returns: `{ success: boolean, verificationId: string }`
- Triggers Firebase Phone Auth

**POST `/api/register/verify-otp`**
- Body: `{ verificationId: string, otp: string }`
- Returns: `{ success: boolean, token: string }`
- Verifies OTP, returns session token

**POST `/api/register/check-duplicate`**
- Body: `{ phone?: string, email?: string }`
- Returns: `{ exists: boolean, field: string }`
- Checks for duplicate registrations

**POST `/api/register/create`**
- Body: `{ registrationData: object }`
- Returns: `{ success: boolean, registrationId: string }`
- Creates registration with status: pending_payment

**POST `/api/payment/create-order`**
- Body: `{ registrationId: string, amount: number }`
- Returns: `{ orderId: string, amount: number, currency: string }`
- Creates Razorpay order

**POST `/api/payment/verify`**
- Body: `{ orderId: string, paymentId: string, signature: string }`
- Returns: `{ success: boolean }`
- Verifies payment, updates registration status

**POST `/api/payment/webhook`**
- Body: Razorpay webhook payload
- Handles payment notifications from Razorpay
- Updates registration status

---

### 5.2 Student Dashboard Endpoints

**GET `/api/student/dashboard`**
- Headers: `Authorization: Bearer {token}`
- Returns: `{ registration: object, competitionStatus: object }`

**PUT `/api/student/update-contact`**
- Headers: `Authorization: Bearer {token}`
- Body: `{ email?: string, parentEmail?: string, parentPhone?: string }`
- Returns: `{ success: boolean }`

**POST `/api/student/upload-essay`** (Phase 2)
- Headers: `Authorization: Bearer {token}`
- Body: FormData with file
- Returns: `{ success: boolean, fileUrl: string }`

**GET `/api/student/download-receipt`**
- Headers: `Authorization: Bearer {token}`
- Returns: PDF file

---

### 5.3 Admin Endpoints

**POST `/api/admin/login`**
- Body: `{ email: string, password: string }`
- Returns: `{ success: boolean, token: string, user: object }`

**GET `/api/admin/dashboard/stats`**
- Headers: `Authorization: Bearer {adminToken}`
- Returns: `{ totalRegistrations, totalRevenue, breakdown: object }`

**GET `/api/admin/registrations`**
- Headers: `Authorization: Bearer {adminToken}`
- Query: `?page=1&limit=50&grade=10&category=essay&status=registered`
- Returns: `{ registrations: array, totalCount: number, page: number }`

**GET `/api/admin/registrations/:id`**
- Headers: `Authorization: Bearer {adminToken}`
- Returns: `{ registration: object }`

**PUT `/api/admin/registrations/:id`**
- Headers: `Authorization: Bearer {adminToken}`
- Body: `{ updates: object, reason: string }`
- Returns: `{ success: boolean }`

**POST `/api/admin/export`**
- Headers: `Authorization: Bearer {adminToken}`
- Body: `{ filters: object, format: 'csv' | 'excel' }`
- Returns: File download

**POST `/api/admin/send-email`**
- Headers: `Authorization: Bearer {adminToken}`
- Body: `{ registrationIds: string[], template: string, customMessage?: string }`
- Returns: `{ success: boolean, sentCount: number }`

**GET `/api/admin/settings`**
- Headers: `Authorization: Bearer {adminToken}`
- Returns: `{ settings: object }`

**PUT `/api/admin/settings`**
- Headers: `Authorization: Bearer {adminToken}`
- Body: `{ settings: object }`
- Returns: `{ success: boolean }`

---

## 6. SECURITY REQUIREMENTS

### 6.1 Authentication
- Firebase Phone Authentication for students/parents
- Firebase Email/Password Authentication for admins
- JWT tokens for session management
- Token expiry: 24 hours for students, 8 hours for admins
- Implement refresh token mechanism

### 6.2 Authorization
- Role-based access control (RBAC)
- Student can only access their own data
- Admin can access all data based on permissions
- API endpoints protected with middleware

### 6.3 Data Protection
- All API calls over HTTPS
- Firestore security rules:
  - Students: read/write only own documents
  - Admins: read/write based on role
- Input sanitization and validation
- XSS protection
- CSRF protection
- Rate limiting on OTP sending (max 3 per hour per phone)

### 6.4 Payment Security
- Razorpay signature verification
- Webhook authentication
- Store minimal payment data
- PCI compliance through Razorpay
- No credit card data stored locally

### 6.5 File Upload Security (Phase 2)
- File type validation (PDF/DOCX only)
- File size limit: 5MB
- Virus scanning
- Sanitize file names
- Private storage URLs with expiry

---

## 7. NON-FUNCTIONAL REQUIREMENTS

### 7.1 Performance
- Page load time: <3 seconds
- API response time: <500ms
- Support 1000 concurrent users
- Database query optimization
- Image optimization
- Code splitting
- Lazy loading

### 7.2 Scalability
- Horizontal scaling via Vercel
- Firebase auto-scaling
- CDN for static assets
- Optimize Firestore reads/writes

### 7.3 Availability
- 99.9% uptime
- Error monitoring (Sentry/LogRocket)
- Automated backups
- Disaster recovery plan

### 7.4 Usability
- Mobile-first design
- Responsive across devices
- Intuitive navigation
- Clear error messages
- Loading states
- Accessibility (WCAG 2.1 Level AA)

### 7.5 Browser Support
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

### 7.6 SEO
- Server-side rendering with Next.js
- Meta tags optimization
- Sitemap
- Robots.txt
- Structured data (Schema.org)

---

## 8. UI/UX REQUIREMENTS

### 8.1 Design System

**Colors**:
- Primary: #2563eb (Blue)
- Secondary: #7c3aed (Purple)
- Success: #10b981 (Green)
- Warning: #f59e0b (Amber)
- Error: #ef4444 (Red)
- Neutral: Gray scale

**Typography**:
- Font family: Inter or system font stack
- Headings: Bold, larger sizes
- Body: Regular, readable size (16px base)

**Spacing**:
- Consistent spacing scale (4px, 8px, 16px, 24px, 32px, etc.)
- Adequate white space

**Components**:
- Buttons: Primary, Secondary, Outline, Ghost
- Inputs: Text, Number, Select, Radio, Checkbox, Date picker
- Cards: Shadow, rounded corners
- Modals: Centered, overlay
- Toasts: Top-right, auto-dismiss
- Loading: Spinner, skeleton screens

### 8.2 User Flows

**Registration Flow**:
1. Land on homepage → Click "Register Now"
2. Enter phone → Send OTP
3. Verify OTP
4. Fill registration form
5. Review and proceed to payment
6. Complete payment
7. View success page
8. Receive confirmation email

**Dashboard Access Flow**:
1. Navigate to /dashboard
2. Enter phone number
3. Verify OTP
4. View dashboard

**Admin Flow**:
1. Navigate to /admin
2. Email/password login
3. View dashboard
4. Navigate to registrations
5. Filter/search
6. View details/export data

### 8.3 Responsive Breakpoints
- Mobile: <640px
- Tablet: 640px - 1024px
- Desktop: >1024px

### 8.4 Loading States
- Skeleton screens for data loading
- Spinner for actions (buttons)
- Progress bars for file uploads
- Optimistic UI updates where possible

### 8.5 Error Handling
- Inline validation errors (red text below field)
- Toast notifications for API errors
- Error boundary for React errors
- Friendly error messages
- Retry mechanisms

---

## 9. TESTING REQUIREMENTS

### 9.1 Unit Testing
- Test utility functions
- Test form validations
- Test data transformations
- Coverage target: >80%

### 9.2 Integration Testing
- Test API endpoints
- Test Firebase operations
- Test payment flow (sandbox)
- Test email sending

### 9.3 E2E Testing
- Test complete registration flow
- Test admin workflows
- Test edge cases
- Use Playwright or Cypress

### 9.4 Manual Testing
- Cross-browser testing
- Mobile device testing
- Payment testing (Razorpay test mode)
- Accessibility testing

---

## 10. DEPLOYMENT & DEVOPS

### 10.1 Environments
- **Development**: Local development
- **Staging**: Vercel preview deployments
- **Production**: Vercel production

### 10.2 CI/CD
- GitHub Actions or Vercel Git integration
- Automated tests on PR
- Automated deployment on merge to main
- Environment variables management

### 10.3 Monitoring
- Error tracking: Sentry
- Analytics: Google Analytics / Plausible
- Performance monitoring: Vercel Analytics
- Uptime monitoring: UptimeRobot / Pingdom

### 10.4 Backups
- Firestore automated backups (daily)
- Storage bucket backups
- Configuration backups

---

## 11. THIRD-PARTY INTEGRATIONS

### 11.1 Razorpay Setup
- Create Razorpay account
- Get API keys (test and live)
- Configure webhook URL
- Test payment flow
- Go live checklist

### 11.2 Firebase Setup
- Create Firebase project
- Enable Firestore
- Enable Authentication (Phone, Email/Password)
- Enable Storage
- Configure security rules
- Set up indexes
- Enable billing

### 11.3 Email Service (Optional)
- Set up Resend or SendGrid
- Create email templates
- Configure API keys
- Test email delivery

### 11.4 SMS (Firebase Phone Auth)
- Enable Phone Authentication in Firebase
- Configure quota (100/day on free tier)
- Upgrade plan if needed for production

---

## 12. CONTENT REQUIREMENTS

### 12.1 Landing Page Content
- Competition description (to be provided)
- Rules and guidelines (to be provided)
- FAQ content (to be provided)
- About JANAPADA (to be provided)
- Contact information (to be provided)

### 12.2 Email Templates
- Registration confirmation
- Payment receipt
- Payment reminder
- Submission confirmation
- Results announcement
- General communication

### 12.3 Legal Pages
- Terms & Conditions
- Privacy Policy
- Refund Policy
- Competition Rules (detailed)

---

## 13. PHASE-WISE IMPLEMENTATION

### Phase 1 (MVP - 4-6 weeks)
- Landing page
- Registration flow (Steps 1-5)
- Phone authentication
- Payment integration
- Student dashboard (basic)
- Admin panel (basic: view registrations, export)
- Email notifications

**Deliverables**:
- Functional registration system
- Payment processing
- Basic admin management
- Deployed to production

### Phase 2 (2-3 weeks)
- Essay submission feature
- File upload to Firebase Storage
- View submitted essays in dashboard
- Admin essay management
- Plagiarism check integration (optional)
- Enhanced admin reporting

**Deliverables**:
- Complete submission workflow
- Enhanced admin features

### Phase 3 (Future Enhancements)
- Evaluation module
- Evaluator roles
- Scoring system
- Results publication
- Certificate generation
- Advanced analytics
- Mobile app (React Native)

---

## 14. PROJECT TIMELINE

**Week 1-2**: Setup & Landing Page
- Project setup
- Firebase configuration
- Landing page development
- Content integration

**Week 3-4**: Registration Flow
- Phone authentication
- Registration form
- Payment integration
- Email notifications

**Week 5**: Student Dashboard
- Dashboard UI
- Authentication
- Profile management
- Receipt download

**Week 6**: Admin Panel
- Admin authentication
- Dashboard with stats
- Registrations management
- Export functionality

**Week 7-8**: Testing & Deployment
- Testing all flows
- Bug fixes
- Performance optimization
- Production deployment
- Documentation

---

## 15. RISKS & MITIGATION

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Payment gateway issues | High | Medium | Use Razorpay sandbox, thorough testing |
| OTP delivery failures | High | Medium | Firebase Phone Auth is reliable, have fallback support |
| Duplicate registrations | Medium | Low | Implement phone/email uniqueness checks |
| Data loss | High | Low | Automated backups, Firestore reliability |
| Performance issues under load | Medium | Medium | Load testing, Firebase auto-scaling |
| Security vulnerabilities | High | Low | Security audit, follow best practices |
| Scope creep | Medium | High | Clear phased implementation, prioritization |

---

## 16. SUCCESS METRICS

- Successful registrations (target: 500+)
- Payment success rate (target: >95%)
- Registration completion rate (target: >70%)
- Page load time (target: <3s)
- Mobile traffic percentage
- Zero data breaches
- Admin satisfaction with management tools
- Student satisfaction (post-competition survey)

---

## 17. SUPPORT & MAINTENANCE

### Support Channels
- Email support: support@janapada.com
- Phone support during registration period
- FAQ and help documentation

### Maintenance Windows
- Regular updates: Weekly
- Security patches: As needed
- Database maintenance: Off-peak hours

### Post-Launch Support
- Monitor error logs daily
- Respond to support queries within 24 hours
- Weekly performance reviews
- Monthly feature enhancements

---

## 18. GLOSSARY

- **OTP**: One-Time Password
- **Razorpay**: Indian payment gateway
- **Firestore**: NoSQL cloud database by Google
- **Firebase Auth**: Authentication service by Google
- **Next.js**: React framework for production
- **Vercel**: Hosting platform for Next.js
- **RBAC**: Role-Based Access Control
- **API**: Application Programming Interface
- **CI/CD**: Continuous Integration/Continuous Deployment

---

## 19. APPENDIX

### A. Indian States List
Andhra Pradesh, Arunachal Pradesh, Assam, Bihar, Chhattisgarh, Goa, Gujarat, Haryana, Himachal Pradesh, Jharkhand, Karnataka, Kerala, Madhya Pradesh, Maharashtra, Manipur, Meghalaya, Mizoram, Nagaland, Odisha, Punjab, Rajasthan, Sikkim, Tamil Nadu, Telangana, Tripura, Uttar Pradesh, Uttarakhand, West Bengal, Andaman and Nicobar Islands, Chandigarh, Dadra and Nagar Haveli and Daman and Diu, Delhi, Jammu and Kashmir, Ladakh, Lakshadweep, Puducherry

### B. Sample Registration ID Format
`JAN2025-XXXX` where XXXX is a sequential number (0001, 0002, etc.)

### C. Word Count Limits (To be finalized)
- Essay: 1000-1500 words
- Short Story: 1500-2500 words
- Poetry: No limit (up to 50 lines)
- Creative Non-fiction: 1000-1500 words

### D. Firebase Security Rules (Sample)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Registrations
    match /registrations/{registrationId} {
      allow read: if request.auth != null &&
                    (request.auth.token.phone_number == resource.data.student.phone ||
                     request.auth.token.admin == true);
      allow create: if request.auth != null;
      allow update: if request.auth != null &&
                      (request.auth.token.phone_number == resource.data.student.phone ||
                       request.auth.token.admin == true);
      allow delete: if request.auth.token.admin == true;
    }

    // Admin users
    match /admin_users/{userId} {
      allow read, write: if request.auth.token.admin == true;
    }

    // Settings
    match /settings/{doc} {
      allow read: if true;
      allow write: if request.auth.token.admin == true;
    }
  }
}
```

---

## 20. CONTACT & SIGN-OFF

**Project Owner**: [Name]
**Technical Lead**: [Name]
**Start Date**: [Date]
**Expected Completion**: [Date]

**Document Version**: 1.0
**Last Updated**: October 2024
**Status**: Draft / Approved

---

**Approvals**:

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Project Owner | | | |
| Technical Lead | | | |
| Stakeholder | | | |

---

*End of Requirements Document*
