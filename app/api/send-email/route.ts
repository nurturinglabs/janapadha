import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { RegistrationConfirmationEmail, RegistrationConfirmationTextEmail } from '@/lib/email-templates';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { registrationData, language } = body;

    // Validate required fields
    if (!registrationData || !language) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In development mode without API key, mock the email sending
    const isDevelopment = !process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'your_resend_api_key_here';

    if (isDevelopment) {
      // Mock email sending in development
      console.log('📧 [DEV MODE] Email would be sent to:', registrationData.email);
      console.log('📧 [DEV MODE] Parent email would be sent to:', registrationData.parentEmail);
      console.log('📧 [DEV MODE] Registration ID:', registrationData.registrationId);
      console.log('📧 [DEV MODE] Language:', language);

      // Simulate a slight delay
      await new Promise(resolve => setTimeout(resolve, 500));

      return NextResponse.json({
        success: true,
        message: 'Email sent successfully (development mode)',
        developmentMode: true,
        emailDetails: {
          studentEmail: registrationData.email,
          parentEmail: registrationData.parentEmail,
          registrationId: registrationData.registrationId,
          language: language
        }
      });
    }

    // Production mode - actually send emails via Resend
    const fromEmail = process.env.FROM_EMAIL || 'hello@janapada.com';
    const isEnglish = language === 'en';
    const subject = isEnglish
      ? `Registration Confirmed - ${registrationData.registrationId} - JANAPADA`
      : `ನೋಂದಣಿ ದೃಢೀಕರಿಸಲಾಗಿದೆ - ${registrationData.registrationId} - ಜನಪದ`;

    // Send email to student
    const studentEmailResult = await resend.emails.send({
      from: `JANAPADA <${fromEmail}>`,
      to: registrationData.email,
      subject: subject,
      html: RegistrationConfirmationEmail({ registrationData, language }),
      text: RegistrationConfirmationTextEmail({ registrationData, language }),
    });

    // Send email to parent (if different from student email)
    let parentEmailResult = null;
    if (registrationData.parentEmail && registrationData.parentEmail !== registrationData.email) {
      parentEmailResult = await resend.emails.send({
        from: `JANAPADA <${fromEmail}>`,
        to: registrationData.parentEmail,
        subject: subject,
        html: RegistrationConfirmationEmail({ registrationData, language }),
        text: RegistrationConfirmationTextEmail({ registrationData, language }),
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Emails sent successfully',
      studentEmailId: studentEmailResult.data?.id,
      parentEmailId: parentEmailResult?.data?.id,
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      {
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
