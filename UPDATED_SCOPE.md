# BAREYIRI - Updated Scope & Business Model

## Key Changes from Original Requirements

### 1. **Competition Model: Quarterly vs Annual**
- **OLD**: One annual national competition
- **NEW**: Four quarterly competitions per year (Q1, Q2, Q3, Q4)
- Each quarter is an independent competition with separate registration and prizes

### 2. **Geographic Scope: Bangalore vs National**
- **OLD**: Pan-India competition
- **NEW**: Bangalore-only, organized by locality/sub-areas
- Specific localities announced per quarter

### 3. **Category Selection: Dynamic vs Pre-selected**
- **OLD**: Students choose category during registration (Essay, Short Story, Poetry, Creative Non-fiction)
- **NEW**: Category is announced before each quarter's registration opens
- All participants in that quarter write in the same category
- Category rotates quarterly

### 4. **Languages: Two vs Three**
- **OLD**: English, Hindi, Kannada
- **NEW**: English, Kannada only

### 5. **Prize Structure (Adjusted for Quarterly)**
- **First Place**: ₹5,000 (down from ₹10,000)
- **Second Place**: ₹3,000 (down from ₹5,000)
- **Third Place**: ₹1,500 (down from ₹2,500)
- **Rationale**: Lower per-quarter prizes, but 4x opportunities per year

---

## Updated Data Model Changes

### Competition/Season Collection Needed

**NEW Collection**: `competitions`
```typescript
{
  competitionId: string;           // "Q1-2025", "Q2-2025", etc.
  quarter: string;                 // "Q1", "Q2", "Q3", "Q4"
  year: number;                    // 2025
  status: string;                  // 'upcoming' | 'registration_open' | 'active' | 'evaluation' | 'completed'

  category: string;                // 'essay' | 'short_story' | 'poetry' | 'creative_non_fiction'
  categoryAnnouncedAt: timestamp;

  dates: {
    categoryAnnouncement: timestamp;
    registrationOpen: timestamp;
    registrationClose: timestamp;
    submissionDeadline: timestamp;
    resultsDate: timestamp;
  },

  eligibility: {
    localities: string[];          // ["Koramangala", "Indiranagar", "Jayanagar"]
    grades: number[];              // [9, 10, 11, 12]
  },

  prizes: {
    first: number;                 // 5000
    second: number;                // 3000
    third: number;                 // 1500
  },

  statistics: {
    totalRegistrations: number;
    totalSubmissions: number;
    totalRevenue: number;
  }
}
```

### Updated Registrations Collection

```typescript
{
  registrationId: string;           // BAR-Q1-2025-0001
  competitionId: string;            // "Q1-2025" (reference to competition)
  createdAt: timestamp;
  updatedAt: timestamp;
  status: string;                   // 'pending_payment' | 'registered' | 'submitted' | 'evaluated'

  // Student Info
  student: {
    fullName: string;
    dateOfBirth: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    grade: number;
    schoolName: string;
    locality: string;               // CHANGED: specific to Bangalore area
    pincode: string;                // NEW: for better locality tracking
  },

  // Parent Info (same as before)
  parent: {
    name: string;
    email: string;
    phone: string;
    relationship: string;
  },

  // Competition Info
  language: string;                 // CHANGED: 'english' | 'kannada' only
  // category removed - now at competition level

  // Payment (same as before)
  payment: {
    amount: number;
    currency: string;
    status: string;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
    paidAt: timestamp;
  },

  // Submission (same as before)
  submission: {
    fileUrl: string;
    fileName: string;
    fileSize: number;
    wordCount: number;
    submittedAt: timestamp;
  },

  // Evaluation (same as before)
  evaluation: {
    evaluatorId: string;
    score: number;
    feedback: string;
    evaluatedAt: timestamp;
    rank: number;
    prize: string;
  },

  // Metadata
  registrantRole: string;
  ipAddress: string;
  userAgent: string;
}
```

### Settings Collection Update

```typescript
{
  currentCompetition: {
    competitionId: string;          // "Q1-2025"
    isActive: boolean;
  },

  registrationFee: number;          // 500
  languages: string[];              // ['english', 'kannada']
  grades: number[];                 // [9, 10, 11, 12]

  bangalore: {
    localities: string[];           // List of all Bangalore areas
  },

  wordLimits: {
    essay: { min: 1000, max: 1500 },
    short_story: { min: 1500, max: 2500 },
    poetry: { lines: 50 },
    creative_non_fiction: { min: 1000, max: 1500 }
  },

  // ... rest same as before
}
```

---

## Updated User Flows

### Admin Flow - New Competition Setup
1. Admin creates new competition (e.g., "Q2-2025")
2. Selects category for the quarter
3. Sets dates (announcement, registration, submission, results)
4. Selects eligible localities
5. Announces category publicly
6. Opens registration
7. Competition proceeds

### Student Registration Flow
1. Student sees current competition announcement (including category)
2. Checks if their locality is eligible
3. Registers (no category selection needed - it's pre-set)
4. Pays ₹500
5. Writes and submits in the announced category
6. Waits for results

---

## Updated Features Needed

### Landing Page ✅
- Show current quarter's competition
- Display quarterly schedule
- Explain rotating categories
- Bangalore-focused messaging

### Admin Panel Enhancements
- **Competition Management**:
  - Create new quarterly competition
  - Manage multiple concurrent/past competitions
  - Competition dashboard with per-quarter stats

- **Locality Management**:
  - Manage Bangalore localities list
  - Enable/disable localities per competition

- **Multi-Competition Views**:
  - Switch between quarters in admin panel
  - Compare stats across quarters
  - Annual summary reports

### Student Dashboard
- **My Competitions**: List all competitions student registered for
- **Competition History**: Past participations with results
- **Current Competition**: Active registration/submission

---

## Registration Form Changes

**REMOVE from registration form**:
- Category selection dropdown (category is competition-level)
- State selection (Bangalore only)

**ADD to registration form**:
- Locality/Area dropdown (Bangalore localities)
- Pincode field
- Competition ID display (e.g., "Registering for Q1 2025 - Essay")

**KEEP**:
- Student info, parent info, language selection, payment

---

## API Endpoints Updates

### New Endpoints Needed:
```
GET  /api/competitions/current
GET  /api/competitions/:id
GET  /api/competitions/upcoming
POST /api/admin/competitions/create
PUT  /api/admin/competitions/:id
```

### Modified Endpoints:
```
POST /api/register/create
- Add competitionId parameter
- Remove category parameter
- Add locality validation

GET /api/admin/registrations
- Filter by competitionId
- Multi-competition view

GET /api/student/dashboard
- Show all competitions for student
- Competition history
```

---

## Next Steps for Implementation

### Phase 1 (Current - Landing Page)
✅ Updated landing page with quarterly model
✅ Bangalore-focused content
✅ Two languages only
✅ Rotating category explanation

### Phase 2 (Registration Flow)
- [ ] Competition management system (admin)
- [ ] Updated registration form with locality
- [ ] Competition-aware registration flow
- [ ] Payment integration

### Phase 3 (Competition Management)
- [ ] Admin: Create/manage quarterly competitions
- [ ] Admin: Competition dashboard
- [ ] Admin: Locality management
- [ ] Student: Multi-competition dashboard

### Phase 4 (Advanced Features)
- [ ] Comparison across quarters
- [ ] Student competition history
- [ ] Annual leaderboards
- [ ] Notification system for new quarters

---

## Benefits of This Model

1. **Continuous Engagement**: Students can participate 4x/year
2. **Lower Barrier**: Smaller prize per quarter = more accessible
3. **Flexibility**: Rotate categories to test different skills
4. **Community Focus**: Bangalore localities create local community
5. **Scalability**: Can expand to other cities using same model
6. **Regular Revenue**: Quarterly vs annual = steadier cash flow

---

## Questions to Consider

1. **Locality Eligibility**:
   - Will all Bangalore localities participate in each quarter?
   - Or will you rotate localities too (e.g., Q1: North Bangalore, Q2: South)?

2. **Student Participation Limits**:
   - Can a student participate in multiple quarters?
   - Any discount for students who register for all 4 quarters?

3. **Category Selection**:
   - Will you announce category in advance (e.g., 2 weeks before)?
   - Or surprise on registration day?

4. **Past Participants**:
   - Special recognition for students who participate all 4 quarters?
   - "Annual Champion" based on combined scores?

5. **Pricing Strategy**:
   - Bundle discount (register for all 4 quarters upfront)?
   - Early bird pricing?

---

## Technical Considerations

1. **Competition State Management**: Need robust system to track which competition is "active"
2. **Data Isolation**: Ensure data is properly segmented by competition
3. **Historical Data**: Need to preserve past competitions for student records
4. **Date Management**: Critical to have automated date-based status updates
5. **Multi-tenancy Pattern**: Each competition is like a "mini-event"

---

*This document captures the updated business model. The requirements document will be updated to reflect these changes.*
