export interface RegistrationData {
  phone: string;
  role: 'student' | 'parent';
  studentName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  grade: string;
  schoolName: string;
  schoolCity: string;
  schoolState: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  relationship: string;
  category: string;
  language: string;
  referralSource?: string;
  registrationId?: string;
}

export type Step = 'phone' | 'otp' | 'form' | 'payment' | 'success';
