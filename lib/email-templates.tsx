import { RegistrationData } from '@/types/registration';

interface EmailTemplateProps {
  registrationData: RegistrationData;
  language: 'en' | 'kn';
}

export function RegistrationConfirmationEmail({ registrationData, language }: EmailTemplateProps) {
  const isEnglish = language === 'en';

  return `
<!DOCTYPE html>
<html lang="${isEnglish ? 'en' : 'kn'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${isEnglish ? 'Registration Confirmation' : 'ನೋಂದಣಿ ದೃಢೀಕರಣ'} - JANAPADA</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding-bottom: 30px;
      border-bottom: 3px solid #2563eb;
      margin-bottom: 30px;
    }
    .logo {
      font-size: 32px;
      font-weight: 800;
      color: #2563eb;
      margin-bottom: 10px;
    }
    .subtitle {
      color: #6b7280;
      font-size: 14px;
    }
    .success-badge {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      padding: 15px 30px;
      border-radius: 50px;
      display: inline-block;
      font-weight: 600;
      margin: 20px 0;
      font-size: 18px;
    }
    .registration-id {
      background: linear-gradient(135deg, #dbeafe 0%, #ede9fe 100%);
      border: 2px solid #2563eb;
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      margin: 30px 0;
    }
    .registration-id-label {
      font-size: 12px;
      color: #6b7280;
      margin-bottom: 5px;
    }
    .registration-id-value {
      font-size: 28px;
      font-weight: 900;
      color: #2563eb;
      letter-spacing: 2px;
    }
    .details-section {
      margin: 30px 0;
      background-color: #f9fafb;
      border-radius: 8px;
      padding: 20px;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .detail-row:last-child {
      border-bottom: none;
    }
    .detail-label {
      font-weight: 600;
      color: #4b5563;
      flex: 1;
    }
    .detail-value {
      color: #1f2937;
      flex: 2;
      text-align: right;
    }
    .section-title {
      font-size: 20px;
      font-weight: 700;
      color: #1f2937;
      margin: 30px 0 15px 0;
      padding-bottom: 10px;
      border-bottom: 2px solid #e5e7eb;
    }
    .next-steps {
      background-color: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 20px;
      margin: 30px 0;
      border-radius: 4px;
    }
    .next-steps ul {
      margin: 15px 0;
      padding-left: 20px;
    }
    .next-steps li {
      margin: 10px 0;
      color: #92400e;
    }
    .footer {
      margin-top: 40px;
      padding-top: 30px;
      border-top: 2px solid #e5e7eb;
      text-align: center;
      color: #6b7280;
      font-size: 14px;
    }
    .contact-info {
      margin: 20px 0;
      padding: 20px;
      background-color: #f0f9ff;
      border-radius: 8px;
    }
    .contact-info p {
      margin: 5px 0;
      color: #1e40af;
    }
    .important-note {
      background-color: #fee2e2;
      border-left: 4px solid #dc2626;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .important-note p {
      color: #991b1b;
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="logo">JANAPADA</div>
      <div class="logo">${isEnglish ? '' : 'ಜನಪದ'}</div>
      <div class="subtitle">
        ${isEnglish ? 'Nurturing Young Readers & Writers' : 'ಯುವ ಓದುಗರು ಮತ್ತು ಬರಹಗಾರರನ್ನು ಪೋಷಿಸುವುದು'}
      </div>
    </div>

    <!-- Success Message -->
    <div style="text-align: center;">
      <div class="success-badge">
        ✓ ${isEnglish ? 'Registration Successful!' : 'ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿದೆ!'}
      </div>
    </div>

    <!-- Registration ID -->
    <div class="registration-id">
      <div class="registration-id-label">
        ${isEnglish ? 'Your Registration ID' : 'ನಿಮ್ಮ ನೋಂದಣಿ ID'}
      </div>
      <div class="registration-id-value">${registrationData.registrationId}</div>
    </div>

    <!-- Greeting -->
    <p>
      ${isEnglish ? 'Dear' : 'ಆತ್ಮೀಯ'} <strong>${registrationData.studentName}</strong>,
    </p>
    <p>
      ${isEnglish
        ? 'Congratulations! Your registration for the JANAPADA Essay Writing Competition has been successfully confirmed.'
        : 'ಅಭಿನಂದನೆಗಳು! ಜನಪದ ಪ್ರಬಂಧ ಬರವಣಿಗೆ ಸ್ಪರ್ಧೆಗೆ ನಿಮ್ಮ ನೋಂದಣಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ದೃಢೀಕರಿಸಲಾಗಿದೆ.'}
    </p>

    <!-- Student Details -->
    <div class="section-title">
      ${isEnglish ? 'Student Details' : 'ವಿದ್ಯಾರ್ಥಿ ವಿವರಗಳು'}
    </div>
    <div class="details-section">
      <div class="detail-row">
        <span class="detail-label">${isEnglish ? 'Full Name' : 'ಪೂರ್ಣ ಹೆಸರು'}:</span>
        <span class="detail-value">${registrationData.studentName}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">${isEnglish ? 'Email' : 'ಇಮೇಲ್'}:</span>
        <span class="detail-value">${registrationData.email}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">${isEnglish ? 'Phone' : 'ಫೋನ್'}:</span>
        <span class="detail-value">+91 ${registrationData.phone}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">${isEnglish ? 'Grade' : 'ತರಗತಿ'}:</span>
        <span class="detail-value">${registrationData.grade}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">${isEnglish ? 'School' : 'ಶಾಲೆ'}:</span>
        <span class="detail-value">${registrationData.schoolName}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">${isEnglish ? 'Language' : 'ಭಾಷೆ'}:</span>
        <span class="detail-value">${registrationData.language === 'en' ? 'English' : 'Kannada (ಕನ್ನಡ)'}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">${isEnglish ? 'Category' : 'ವರ್ಗ'}:</span>
        <span class="detail-value">${registrationData.category}</span>
      </div>
    </div>

    <!-- Parent/Guardian Details -->
    <div class="section-title">
      ${isEnglish ? 'Parent/Guardian Details' : 'ಪೋಷಕರ ವಿವರಗಳು'}
    </div>
    <div class="details-section">
      <div class="detail-row">
        <span class="detail-label">${isEnglish ? 'Name' : 'ಹೆಸರು'}:</span>
        <span class="detail-value">${registrationData.parentName}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">${isEnglish ? 'Email' : 'ಇಮೇಲ್'}:</span>
        <span class="detail-value">${registrationData.parentEmail}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">${isEnglish ? 'Phone' : 'ಫೋನ್'}:</span>
        <span class="detail-value">+91 ${registrationData.parentPhone}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">${isEnglish ? 'Relationship' : 'ಸಂಬಂಧ'}:</span>
        <span class="detail-value">${registrationData.relationship}</span>
      </div>
    </div>

    <!-- Important Note -->
    <div class="important-note">
      <p style="font-weight: 700; margin-bottom: 10px;">
        ${isEnglish ? '⚠️ Important: Save Your Registration ID' : '⚠️ ಮುಖ್ಯ: ನಿಮ್ಮ ನೋಂದಣಿ ID ಅನ್ನು ಉಳಿಸಿ'}
      </p>
      <p>
        ${isEnglish
          ? 'Please save this registration ID. You will need it for essay submission and to check your results.'
          : 'ದಯವಿಟ್ಟು ಈ ನೋಂದಣಿ ID ಅನ್ನು ಉಳಿಸಿ. ಪ್ರಬಂಧ ಸಲ್ಲಿಕೆ ಮತ್ತು ನಿಮ್ಮ ಫಲಿತಾಂಶಗಳನ್ನು ಪರಿಶೀಲಿಸಲು ನಿಮಗೆ ಇದು ಅಗತ್ಯವಿರುತ್ತದೆ.'}
      </p>
    </div>

    <!-- Next Steps -->
    <div class="next-steps">
      <p style="font-weight: 700; font-size: 16px; margin-bottom: 10px;">
        ${isEnglish ? '📋 Next Steps' : '📋 ಮುಂದಿನ ಹಂತಗಳು'}
      </p>
      <ul>
        <li>
          ${isEnglish
            ? '<strong>Write your essay:</strong> Start working on your essay following the competition guidelines'
            : '<strong>ನಿಮ್ಮ ಪ್ರಬಂಧವನ್ನು ಬರೆಯಿರಿ:</strong> ಸ್ಪರ್ಧೆಯ ಮಾರ್ಗಸೂಚಿಗಳನ್ನು ಅನುಸರಿಸಿ ನಿಮ್ಮ ಪ್ರಬಂಧದಲ್ಲಿ ಕೆಲಸ ಮಾಡಲು ಪ್ರಾರಂಭಿಸಿ'}
        </li>
        <li>
          ${isEnglish
            ? '<strong>Submission deadline:</strong> Submit your essay by January 15, 2026'
            : '<strong>ಸಲ್ಲಿಕೆ ಕೊನೆಯ ದಿನಾಂಕ:</strong> ಜನವರಿ 15, 2026 ರೊಳಗೆ ನಿಮ್ಮ ಪ್ರಬಂಧವನ್ನು ಸಲ್ಲಿಸಿ'}
        </li>
        <li>
          ${isEnglish
            ? '<strong>Evaluation:</strong> Submissions will be evaluated by our expert panel'
            : '<strong>ಮೌಲ್ಯಮಾಪನ:</strong> ನಮ್ಮ ತಜ್ಞ ಸಮಿತಿಯಿಂದ ಸಲ್ಲಿಕೆಗಳನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡಲಾಗುವುದು'}
        </li>
        <li>
          ${isEnglish
            ? '<strong>Results:</strong> Winners will be announced on January 31, 2026'
            : '<strong>ಫಲಿತಾಂಶಗಳು:</strong> ಜನವರಿ 31, 2026 ರಂದು ವಿಜೇತರನ್ನು ಘೋಷಿಸಲಾಗುವುದು'}
        </li>
      </ul>
    </div>

    <!-- Contact Info -->
    <div class="contact-info">
      <p style="font-weight: 700; margin-bottom: 10px;">
        ${isEnglish ? '📞 Need Help?' : '📞 ಸಹಾಯ ಬೇಕೇ?'}
      </p>
      <p><strong>${isEnglish ? 'Email' : 'ಇಮೇಲ್'}:</strong> support@janapada.com</p>
      <p><strong>${isEnglish ? 'Phone' : 'ಫೋನ್'}:</strong> +91 98765 43210</p>
      <p><strong>${isEnglish ? 'Website' : 'ವೆಬ್‌ಸೈಟ್'}:</strong> www.janapada.com</p>
    </div>

    <!-- Closing -->
    <p style="margin-top: 30px;">
      ${isEnglish
        ? 'We look forward to reading your essay and wish you the very best in the competition!'
        : 'ನಿಮ್ಮ ಪ್ರಬಂಧವನ್ನು ಓದಲು ನಾವು ಎದುರು ನೋಡುತ್ತಿದ್ದೇವೆ ಮತ್ತು ಸ್ಪರ್ಧೆಯಲ್ಲಿ ನಿಮಗೆ ಶುಭವಾಗಲಿ!'}
    </p>
    <p>
      ${isEnglish ? 'Best regards,' : 'ಶುಭಾಶಯಗಳು,'}<br>
      <strong>${isEnglish ? 'Team JANAPADA' : 'ತಂಡ ಜನಪದ'}</strong>
    </p>

    <!-- Footer -->
    <div class="footer">
      <p>${isEnglish ? 'Building a Generation of Readers and Writers' : 'ಓದುಗರು ಮತ್ತು ಬರಹಗಾರರ ಪೀಳಿಗೆಯನ್ನು ನಿರ್ಮಿಸುವುದು'}</p>
      <p style="margin-top: 10px; font-size: 12px;">
        © 2026 JANAPADA. ${isEnglish ? 'All rights reserved.' : 'ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.'}
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// Plain text version for email clients that don't support HTML
export function RegistrationConfirmationTextEmail({ registrationData, language }: EmailTemplateProps) {
  const isEnglish = language === 'en';

  return `
JANAPADA ${isEnglish ? '' : '- ಜನಪದ'}
${isEnglish ? 'Nurturing Young Readers & Writers' : 'ಯುವ ಓದುಗರು ಮತ್ತು ಬರಹಗಾರರನ್ನು ಪೋಷಿಸುವುದು'}

${isEnglish ? 'REGISTRATION SUCCESSFUL!' : 'ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿದೆ!'}

${isEnglish ? 'Your Registration ID' : 'ನಿಮ್ಮ ನೋಂದಣಿ ID'}: ${registrationData.registrationId}

${isEnglish ? 'Dear' : 'ಆತ್ಮೀಯ'} ${registrationData.studentName},

${isEnglish
  ? 'Congratulations! Your registration for the JANAPADA Essay Writing Competition has been successfully confirmed.'
  : 'ಅಭಿನಂದನೆಗಳು! ಜನಪದ ಪ್ರಬಂಧ ಬರವಣಿಗೆ ಸ್ಪರ್ಧೆಗೆ ನಿಮ್ಮ ನೋಂದಣಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ದೃಢೀಕರಿಸಲಾಗಿದೆ.'}

${isEnglish ? 'STUDENT DETAILS' : 'ವಿದ್ಯಾರ್ಥಿ ವಿವರಗಳು'}
${isEnglish ? 'Full Name' : 'ಪೂರ್ಣ ಹೆಸರು'}: ${registrationData.studentName}
${isEnglish ? 'Email' : 'ಇಮೇಲ್'}: ${registrationData.email}
${isEnglish ? 'Phone' : 'ಫೋನ್'}: +91 ${registrationData.phone}
${isEnglish ? 'Grade' : 'ತರಗತಿ'}: ${registrationData.grade}
${isEnglish ? 'School' : 'ಶಾಲೆ'}: ${registrationData.schoolName}
${isEnglish ? 'Language' : 'ಭಾಷೆ'}: ${registrationData.language === 'en' ? 'English' : 'Kannada (ಕನ್ನಡ)'}
${isEnglish ? 'Category' : 'ವರ್ಗ'}: ${registrationData.category}

${isEnglish ? 'PARENT/GUARDIAN DETAILS' : 'ಪೋಷಕರ ವಿವರಗಳು'}
${isEnglish ? 'Name' : 'ಹೆಸರು'}: ${registrationData.parentName}
${isEnglish ? 'Email' : 'ಇಮೇಲ್'}: ${registrationData.parentEmail}
${isEnglish ? 'Phone' : 'ಫೋನ್'}: +91 ${registrationData.parentPhone}
${isEnglish ? 'Relationship' : 'ಸಂಬಂಧ'}: ${registrationData.relationship}

⚠️ ${isEnglish ? 'IMPORTANT: SAVE YOUR REGISTRATION ID' : 'ಮುಖ್ಯ: ನಿಮ್ಮ ನೋಂದಣಿ ID ಅನ್ನು ಉಳಿಸಿ'}
${isEnglish
  ? 'Please save this registration ID. You will need it for essay submission and to check your results.'
  : 'ದಯವಿಟ್ಟು ಈ ನೋಂದಣಿ ID ಅನ್ನು ಉಳಿಸಿ. ಪ್ರಬಂಧ ಸಲ್ಲಿಕೆ ಮತ್ತು ನಿಮ್ಮ ಫಲಿತಾಂಶಗಳನ್ನು ಪರಿಶೀಲಿಸಲು ನಿಮಗೆ ಇದು ಅಗತ್ಯವಿರುತ್ತದೆ.'}

📋 ${isEnglish ? 'NEXT STEPS' : 'ಮುಂದಿನ ಹಂತಗಳು'}

1. ${isEnglish
    ? 'Write your essay: Start working on your essay following the competition guidelines'
    : 'ನಿಮ್ಮ ಪ್ರಬಂಧವನ್ನು ಬರೆಯಿರಿ: ಸ್ಪರ್ಧೆಯ ಮಾರ್ಗಸೂಚಿಗಳನ್ನು ಅನುಸರಿಸಿ ನಿಮ್ಮ ಪ್ರಬಂಧದಲ್ಲಿ ಕೆಲಸ ಮಾಡಲು ಪ್ರಾರಂಭಿಸಿ'}

2. ${isEnglish
    ? 'Submission deadline: Submit your essay by January 15, 2026'
    : 'ಸಲ್ಲಿಕೆ ಕೊನೆಯ ದಿನಾಂಕ: ಜನವರಿ 15, 2026 ರೊಳಗೆ ನಿಮ್ಮ ಪ್ರಬಂಧವನ್ನು ಸಲ್ಲಿಸಿ'}

3. ${isEnglish
    ? 'Evaluation: Submissions will be evaluated by our expert panel'
    : 'ಮೌಲ್ಯಮಾಪನ: ನಮ್ಮ ತಜ್ಞ ಸಮಿತಿಯಿಂದ ಸಲ್ಲಿಕೆಗಳನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡಲಾಗುವುದು'}

4. ${isEnglish
    ? 'Results: Winners will be announced on January 31, 2026'
    : 'ಫಲಿತಾಂಶಗಳು: ಜನವರಿ 31, 2026 ರಂದು ವಿಜೇತರನ್ನು ಘೋಷಿಸಲಾಗುವುದು'}

📞 ${isEnglish ? 'NEED HELP?' : 'ಸಹಾಯ ಬೇಕೇ?'}
${isEnglish ? 'Email' : 'ಇಮೇಲ್'}: support@janapada.com
${isEnglish ? 'Phone' : 'ಫೋನ್'}: +91 98765 43210
${isEnglish ? 'Website' : 'ವೆಬ್‌ಸೈಟ್'}: www.janapada.com

${isEnglish
  ? 'We look forward to reading your essay and wish you the very best in the competition!'
  : 'ನಿಮ್ಮ ಪ್ರಬಂಧವನ್ನು ಓದಲು ನಾವು ಎದುರು ನೋಡುತ್ತಿದ್ದೇವೆ ಮತ್ತು ಸ್ಪರ್ಧೆಯಲ್ಲಿ ನಿಮಗೆ ಶುಭವಾಗಲಿ!'}

${isEnglish ? 'Best regards,' : 'ಶುಭಾಶಯಗಳು,'}
${isEnglish ? 'Team JANAPADA' : 'ತಂಡ ಜನಪದ'}

---
${isEnglish ? 'Building a Generation of Readers and Writers' : 'ಓದುಗರು ಮತ್ತು ಬರಹಗಾರರ ಪೀಳಿಗೆಯನ್ನು ನಿರ್ಮಿಸುವುದು'}
© 2026 JANAPADA. ${isEnglish ? 'All rights reserved.' : 'ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.'}
  `.trim();
}
