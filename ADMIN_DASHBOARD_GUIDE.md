# Admin Dashboard Guide - JANAPADA

## Overview

The JANAPADA Admin Dashboard is a comprehensive management system that allows administrators to view, manage, and analyze competition registrations. Built with Next.js 14+ and TypeScript, it provides a clean, modern interface for managing the essay writing competition.

## 🎯 Features

### ✅ Complete Authentication System
- Secure admin login page
- Session management with localStorage (demo mode)
- Auto-redirect to login if not authenticated
- Clean logout functionality

### ✅ Dashboard Analytics
- **Total Registrations** - Real-time count of all registrations
- **Language Distribution** - English vs Kannada breakdown
- **Category Breakdown** - Statistics by essay type (Essay Writing, Short Story, Poetry, Creative Non-fiction)
- **Grade Distribution** - Registration counts by grade level

### ✅ Registrations Management
- **View All Registrations** - Comprehensive table with all registration details
- **Search Functionality** - Search by Registration ID, name, email, phone, or school
- **Language Filter** - Filter by English or Kannada entries
- **Detailed View** - Click on any registration to see complete details
- **Export to CSV** - Download filtered registrations as CSV file

### ✅ User Experience
- Responsive design (works on mobile, tablet, desktop)
- Clean, modern UI with Tailwind CSS
- Interactive data tables
- Modal popups for detailed views
- Real-time filtering and search

## 🚀 Quick Start

### Access the Admin Panel

1. **Navigate to Admin Login**
   ```
   http://localhost:3000/admin
   ```

2. **Demo Credentials**
   ```
   Email: admin@janapada.com
   Password: admin123
   ```

3. **Access Dashboard**
   - After successful login, you'll be redirected to `/admin/dashboard`
   - Dashboard loads automatically with all statistics and registrations

## 📊 Dashboard Sections

### 1. Statistics Cards (Top Row)

**Total Registrations**
- Shows total number of registered students
- Includes trending indicator

**English Language**
- Number of students who chose English
- Real-time count

**Kannada Language**
- Number of students who chose Kannada
- Real-time count

**Essay Writing Category**
- Number of essay writing category registrations
- Can be extended to show other categories

### 2. Category Breakdown

Visual breakdown of all competition categories:
- **Essay Writing** (1000-1500 words)
- **Short Story** (1500-2500 words)
- **Poetry** (up to 50 lines)
- **Creative Non-fiction** (1000-1500 words)

Each category shows count with color-coded indicators.

### 3. Registrations Table

**Columns:**
- Registration ID (clickable)
- Student Name
- Grade
- School
- Category (with badge)
- Language (with colored badge)
- Actions (View button)

**Features:**
- Sortable columns
- Responsive design
- Hover effects for better UX
- Color-coded language badges

## 🔍 Search & Filter

### Search Bar
Search across multiple fields:
- Registration ID (e.g., "JAN2026-1001")
- Student Name (e.g., "Rajesh Kumar")
- Email (e.g., "rajesh@example.com")
- Phone number
- School name

### Language Filter
Three filter options:
- **All** - Show all registrations
- **English** - Show only English language registrations
- **Kannada** - Show only Kannada language registrations

### Export CSV
- Click "Export CSV" button to download filtered results
- Includes all relevant student information
- Filename format: `janapada-registrations-YYYY-MM-DD.csv`
- Works with current search/filter state

## 📋 Registration Details Modal

Click the "View" button on any registration to see complete details:

### Student Information
- Full Name
- Date of Birth
- Gender
- Grade
- Email
- Phone

### School Information
- School Name
- City
- State

### Parent/Guardian Information
- Name
- Relationship (Father/Mother/Guardian)
- Email
- Phone

### Competition Details
- Category chosen
- Language preference
- Referral source (how they heard about the competition)

## 🔐 Authentication System

### Current Implementation (Demo Mode)

The current system uses **localStorage** for demo purposes:

```typescript
// Mock credentials
Email: admin@janapada.com
Password: admin123
```

**How it works:**
1. User enters credentials on `/admin` page
2. System validates against mock credentials
3. On success, stores auth token in localStorage
4. Redirects to `/admin/dashboard`
5. Dashboard checks localStorage for valid auth
6. Logout clears localStorage and redirects back

### Security Notes

⚠️ **This is a DEMO implementation** - Not secure for production!

**For Production, implement:**
1. Firebase Authentication
2. JWT tokens with httpOnly cookies
3. Server-side session validation
4. Role-based access control (RBAC)
5. Two-factor authentication (2FA) optional

## 📊 Mock Data

The dashboard currently uses **10 sample registrations** for demonstration:

- 5 English language entries
- 5 Kannada language entries
- Mix of all grade levels (9-12)
- Various categories
- Realistic student and parent information

**File:** `lib/mock-registrations.ts`

### Adding More Mock Data

To add more sample registrations, edit `lib/mock-registrations.ts`:

```typescript
export const mockRegistrations: RegistrationData[] = [
  {
    registrationId: 'JAN2026-1011',
    studentName: 'New Student',
    email: 'student@example.com',
    // ... other fields
  },
  // Add more entries here
];
```

## 🛠️ Technical Architecture

### Files Structure

```
app/
├── admin/
│   ├── page.tsx                    # Login page
│   └── dashboard/
│       └── page.tsx                # Dashboard page
lib/
├── mock-registrations.ts           # Sample data + helper functions
types/
└── registration.ts                 # TypeScript interfaces
```

### Key Components

**Admin Login Page** (`app/admin/page.tsx`)
- Email/password form
- Mock authentication logic
- LocalStorage session management
- Responsive design

**Admin Dashboard** (`app/admin/dashboard/page.tsx`)
- Statistics cards
- Category breakdown
- Registrations table
- Search and filter functionality
- Export CSV feature
- Registration details modal

**Mock Data Library** (`lib/mock-registrations.ts`)
- Sample registrations array
- `getRegistrationStats()` - Calculate statistics
- `searchRegistrations(query)` - Search helper function

### State Management

Uses React's built-in state management:
- `useState` for local component state
- `useEffect` for side effects (auth check, filtering)
- `useRouter` for navigation

**State Variables:**
- `isAuthenticated` - Auth status
- `searchQuery` - Search input value
- `filteredRegistrations` - Filtered results
- `selectedFilter` - Language filter state
- `selectedRegistration` - Currently viewed registration

## 📈 Statistics Calculation

The `getRegistrationStats()` function calculates:

```typescript
{
  total: number,                    // Total registrations
  byLanguage: {
    english: number,
    kannada: number
  },
  byCategory: {
    essay_writing: number,
    short_story: number,
    poetry: number,
    creative_nonfiction: number
  },
  byGrade: {
    grade9: number,
    grade10: number,
    grade11: number,
    grade12: number
  }
}
```

## 🔄 Integration with Real Backend

To connect with Firebase/real database:

### Step 1: Create API Routes

```typescript
// app/api/admin/registrations/route.ts
export async function GET(request: Request) {
  // Verify admin auth
  // Fetch from Firestore
  // Return registrations
}
```

### Step 2: Replace Mock Data

```typescript
// In dashboard/page.tsx
useEffect(() => {
  async function fetchRegistrations() {
    const response = await fetch('/api/admin/registrations');
    const data = await response.json();
    setFilteredRegistrations(data);
  }
  fetchRegistrations();
}, []);
```

### Step 3: Implement Real Authentication

```typescript
// Use Firebase Admin SDK
import { auth } from '@/lib/firebase-admin';

export async function verifyAdminToken(token: string) {
  try {
    const decodedToken = await auth.verifyIdToken(token);
    const user = await auth.getUser(decodedToken.uid);
    // Check if user has admin role
    return user.customClaims?.admin === true;
  } catch (error) {
    return false;
  }
}
```

## 💡 Future Enhancements

### Phase 1 - Basic Improvements
- [ ] Real-time data updates
- [ ] Pagination for large datasets
- [ ] Advanced sorting options
- [ ] Bulk actions (delete, export selected)

### Phase 2 - Advanced Features
- [ ] Email registrants directly from dashboard
- [ ] Competition management (create, edit, archive)
- [ ] Essay submission tracking
- [ ] Evaluation and scoring system

### Phase 3 - Analytics
- [ ] Registration trends over time
- [ ] Geographic distribution maps
- [ ] Referral source analytics
- [ ] Download reports (PDF)

### Phase 4 - User Management
- [ ] Multiple admin accounts
- [ ] Role-based permissions (Super Admin, Admin, Viewer)
- [ ] Activity logs
- [ ] Admin account management

## 🎨 Customization

### Changing Colors

All colors are defined using Tailwind CSS classes. Key color schemes:

**Primary (Blue):**
- Stats cards: `bg-blue-100`, `text-blue-600`
- Buttons: `bg-blue-600`, `hover:bg-blue-700`

**Success (Green):**
- Language badges: `bg-green-100`, `text-green-600`

**Category badges:**
- Essay Writing: Blue
- Short Story: Green
- Poetry: Purple
- Creative Non-fiction: Orange

### Modifying Table Columns

To add/remove columns, edit the table in `dashboard/page.tsx`:

```typescript
// Add new column header
<th className="px-6 py-3...">New Column</th>

// Add new cell in map function
<td className="px-6 py-4...">{registration.newField}</td>
```

## 🐛 Troubleshooting

### Login not working?
- Check you're using correct credentials: `admin@janapada.com` / `admin123`
- Clear browser localStorage: `localStorage.clear()`
- Refresh the page

### Dashboard showing "No registrations"?
- Check if `lib/mock-registrations.ts` is properly imported
- Verify mock data array has entries
- Check console for JavaScript errors

### CSV export not working?
- Check browser console for errors
- Verify browser allows downloads
- Try with a different browser

### Modal not closing?
- Click outside the modal
- Press ESC key (if implemented)
- Click the X button in top-right

## 🔒 Security Best Practices

When moving to production:

1. **Never store passwords in plain text**
2. **Use environment variables** for sensitive data
3. **Implement rate limiting** on login attempts
4. **Add CSRF protection**
5. **Use HTTPS only**
6. **Implement proper session timeout**
7. **Add audit logging** for admin actions
8. **Regular security audits**

## 📞 Support

For issues or questions:
- **Technical Issues:** Check browser console for errors
- **Feature Requests:** Document in project issues
- **Production Setup:** Consult Firebase/authentication docs

---

## 🎉 Summary

The JANAPADA Admin Dashboard provides a complete solution for managing competition registrations. With its clean interface, powerful search and filter capabilities, and comprehensive statistics, it makes managing hundreds of registrations simple and efficient.

**Key Benefits:**
- ✅ Easy to use interface
- ✅ Comprehensive registration management
- ✅ Real-time statistics
- ✅ Export capabilities
- ✅ Mobile responsive
- ✅ Ready for production integration

**Demo Credentials:**
```
URL: http://localhost:3000/admin
Email: admin@janapada.com
Password: admin123
```

Start managing your competition registrations today!
