# Email Notification Setup Guide

## Overview

The JANAPADA platform now includes an automated email notification system that sends confirmation emails to students and parents upon successful registration.

## Features

✅ **Bilingual Email Templates** - Beautifully designed HTML emails in both English and Kannada
✅ **Automatic Sending** - Emails sent automatically upon registration completion
✅ **Dual Recipients** - Sends to both student and parent email addresses
✅ **Development Mode** - Mock email sending for testing without real API keys
✅ **Production Ready** - Integrated with Resend for reliable email delivery

## Email Service: Resend

We're using [Resend](https://resend.com) as our email service provider. Resend is modern, developer-friendly, and works great with Next.js applications.

### Why Resend?

- ✅ Simple API and excellent documentation
- ✅ Generous free tier (100 emails/day)
- ✅ Built-in email verification
- ✅ Real-time analytics
- ✅ No credit card required for free tier

## Setup Instructions

### 1. Create a Resend Account

1. Visit [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 2. Get Your API Key

1. Log into your Resend dashboard
2. Navigate to **API Keys** section
3. Click **Create API Key**
4. Give it a name (e.g., "JANAPADA Production")
5. Copy the API key (it will only be shown once!)

### 3. Configure Your Domain (Optional but Recommended)

For production use, you should verify your domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `janapada.com`)
4. Add the provided DNS records to your domain provider
5. Wait for verification (usually takes a few minutes)

**Note:** For testing, you can use Resend's default domain, but emails will be sent from `onboarding@resend.dev`

### 4. Update Environment Variables

Update your `.env.local` file with your actual Resend API key:

```bash
# Email Service (Resend)
RESEND_API_KEY=re_123456789abcdefghijklmnop  # Replace with your actual API key

# Email Configuration
FROM_EMAIL=hello@janapada.com  # Your verified sending domain
SUPPORT_EMAIL=support@janapada.com
```

### 5. Restart Your Development Server

```bash
# Stop the current dev server (Ctrl+C)
npm run dev
```

## Development Mode (Current State)

Currently, the system is running in **development mode** because no real API key is configured. In this mode:

- ✅ Emails are "sent" but not actually delivered
- ✅ Console logs show what would have been sent
- ✅ All email logic is tested without using API quota
- ✅ Perfect for testing the registration flow

### Development Mode Console Output

When an email is "sent" in development mode, you'll see:

```
📧 [DEV MODE] Email would be sent to: student@example.com
📧 [DEV MODE] Parent email would be sent to: parent@example.com
📧 [DEV MODE] Registration ID: JAN2026-1234
📧 [DEV MODE] Language: kn
```

## Production Mode

Once you add a real Resend API key, the system automatically switches to production mode:

- ✅ Real emails are sent via Resend
- ✅ Emails delivered to actual inboxes
- ✅ Tracking and analytics available in Resend dashboard
- ✅ Error handling for failed deliveries

## Email Template Features

### HTML Email Template Includes:

1. **Professional Header** with JANAPADA branding
2. **Registration ID** prominently displayed
3. **Student Details** in a clean grid layout
4. **Parent/Guardian Details** section
5. **Important Save ID Notice** with warning styling
6. **Next Steps Guide** with numbered actions
7. **Contact Information** for support
8. **Bilingual Content** (English or Kannada based on registration)
9. **Mobile Responsive** design
10. **Fallback Plain Text** version for email clients without HTML support

### Email Content (Kannada Example):

**Subject:** ನೋಂದಣಿ ದೃಢೀಕರಿಸಲಾಗಿದೆ - JAN2026-1234 - ಜನಪದ

**Content:**
- Success message and registration ID
- All student and parent details
- Important reminder to save registration ID
- Next steps:
  1. Write your essay
  2. Submit by deadline (January 15, 2026)
  3. Evaluation by expert panel
  4. Results on January 31, 2026

## Testing the Email System

### Manual Test (with real API key):

1. Add your Resend API key to `.env.local`
2. Restart dev server
3. Complete a test registration at `/register`
4. Check the email inbox of the address you used
5. Verify both student and parent received emails

### Development Test (without API key):

1. Complete a test registration
2. Check browser console for email details
3. Check terminal/server logs for:
   ```
   📧 [DEV MODE] Email would be sent to: ...
   ```

## API Endpoint

### POST `/api/send-email`

Sends confirmation emails to registered users.

**Request Body:**
```json
{
  "registrationData": {
    "registrationId": "JAN2026-1234",
    "studentName": "Rajesh Kumar",
    "email": "rajesh@example.com",
    "phone": "9876543210",
    "grade": "Grade 10",
    "category": "essay_writing",
    "language": "kn",
    "parentName": "Suresh Kumar",
    "parentEmail": "suresh@example.com",
    "parentPhone": "9876543211",
    "relationship": "Father"
  },
  "language": "kn"
}
```

**Success Response (Development Mode):**
```json
{
  "success": true,
  "message": "Email sent successfully (development mode)",
  "developmentMode": true,
  "emailDetails": {
    "studentEmail": "rajesh@example.com",
    "parentEmail": "suresh@example.com",
    "registrationId": "JAN2026-1234",
    "language": "kn"
  }
}
```

**Success Response (Production Mode):**
```json
{
  "success": true,
  "message": "Emails sent successfully",
  "studentEmailId": "abc123xyz",
  "parentEmailId": "def456uvw"
}
```

**Error Response:**
```json
{
  "error": "Failed to send email",
  "details": "Error message here"
}
```

## Integration with Registration Flow

The email system is automatically triggered when a user completes the registration:

1. User completes payment step
2. Registration ID is generated
3. User is redirected to success page
4. **Success page automatically calls `/api/send-email`**
5. Email status notification appears on success page:
   - 🔵 **Sending...** - Email is being sent
   - 🟢 **Success!** - Email delivered successfully
   - 🔴 **Error** - Failed to send (with support contact info)

## File Structure

```
Bareyiri/
├── .env.local                          # Email configuration
├── lib/
│   └── email-templates.tsx             # HTML & text email templates
├── app/
│   ├── api/
│   │   └── send-email/
│   │       └── route.ts                # Email API endpoint
│   └── register/
│       └── components/
│           └── SuccessPage.tsx         # Triggers email sending
└── EMAIL_SETUP.md                      # This file
```

## Troubleshooting

### Emails not sending in production?

1. ✅ Check `.env.local` has correct `RESEND_API_KEY`
2. ✅ Restart dev server after changing env variables
3. ✅ Verify domain is configured in Resend dashboard
4. ✅ Check Resend dashboard for delivery logs
5. ✅ Check browser console for error messages

### Emails going to spam?

1. ✅ Verify your sending domain in Resend
2. ✅ Add SPF and DKIM records to your domain
3. ✅ Use your verified domain as `FROM_EMAIL`
4. ✅ Avoid spam trigger words in email content

### Want to test real emails without domain verification?

Use Resend's default domain temporarily:
```bash
FROM_EMAIL=onboarding@resend.dev
```

**Note:** This is fine for testing but should be changed to your domain for production.

## Cost Considerations

### Resend Free Tier:
- ✅ 100 emails/day
- ✅ 1 verified domain
- ✅ Full API access
- ✅ Email analytics

### When to Upgrade:
- If you expect >100 registrations per day
- If you need priority support
- If you want to send from multiple domains

**Current Usage Estimate:**
- Quarterly competition model
- Expected registrations: ~500 per quarter
- Average: ~5-6 registrations per day
- **Free tier is sufficient for current needs**

## Next Steps

Once email is working, consider:

1. ✅ **Email Templates** - Create additional templates for:
   - Essay submission confirmation
   - Competition reminders
   - Result announcements
   - Winner notifications

2. ✅ **Email Scheduling** - Set up automated reminders:
   - 7 days before submission deadline
   - 3 days before submission deadline
   - Day before submission deadline

3. ✅ **Email Preferences** - Allow users to:
   - Opt-in/out of reminder emails
   - Choose preferred language
   - Update email addresses

4. ✅ **Email Analytics** - Track:
   - Open rates
   - Click rates
   - Delivery success rates

## Support

For issues or questions:
- **Resend Documentation:** https://resend.com/docs
- **Project Support:** support@janapada.com

---

✅ **Email system is now ready to use!** Just add your Resend API key to go live.
