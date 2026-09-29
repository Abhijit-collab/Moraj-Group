export const EMAIL_PATTERN = '^[^\\s@]+@[^\\s@]+\\.[A-Za-z]{2,}$'

export const DEFAULT_COUNTRY_CODE = '+91'

export const COUNTRY_CODES: { code: string; country: string }[] = [
  { code: '+91', country: 'India' },
  { code: '+971', country: 'United Arab Emirates' },
  { code: '+966', country: 'Saudi Arabia' },
  { code: '+974', country: 'Qatar' },
  { code: '+965', country: 'Kuwait' },
  { code: '+968', country: 'Oman' },
  { code: '+973', country: 'Bahrain' },
  { code: '+1', country: 'United States / Canada' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+61', country: 'Australia' },
  { code: '+880', country: 'Bangladesh' },
  { code: '+33', country: 'France' },
  { code: '+49', country: 'Germany' },
  { code: '+852', country: 'Hong Kong' },
  { code: '+353', country: 'Ireland' },
  { code: '+39', country: 'Italy' },
  { code: '+81', country: 'Japan' },
  { code: '+254', country: 'Kenya' },
  { code: '+60', country: 'Malaysia' },
  { code: '+977', country: 'Nepal' },
  { code: '+31', country: 'Netherlands' },
  { code: '+64', country: 'New Zealand' },
  { code: '+65', country: 'Singapore' },
  { code: '+27', country: 'South Africa' },
  { code: '+94', country: 'Sri Lanka' },
  { code: '+41', country: 'Switzerland' },
]

// Vercel rejects request bodies over 4.5 MB before our code runs.
export const RESUME_MAX_BYTES = 4 * 1024 * 1024
export const RESUME_ACCEPT = '.pdf,.doc,.docx'

export function resumeError(file: { name: string; size: number } | null | undefined): string {
  if (!file || !file.size) return 'Please attach your resume.'
  if (!/\.(pdf|docx?)$/i.test(file.name)) return 'Please attach your resume as a PDF or Word file.'
  if (file.size > RESUME_MAX_BYTES) return 'Your resume must be 4 MB or smaller.'
  return ''
}

const INDIAN_MOBILE_MESSAGE = 'Please enter a valid 10-digit mobile number, e.g. 98205 77144.'

export function emailError(value: string): string {
  const email = value.trim()
  if (!email) return 'Please enter your email address.'
  return new RegExp(EMAIL_PATTERN).test(email)
    ? ''
    : 'Please enter a valid email address, for example name@example.com'
}

/**
 * Joins the selected country code with the typed number. A number the visitor already
 * wrote with its own "+" prefix is kept as typed; a local trunk "0" is dropped.
 */
export function withCountryCode(code: string, number: string): string {
  const local = number.trim()
  if (!local || local.startsWith('+')) return local
  return `${code} ${local.replace(/^0+/, '')}`
}

/** Indian mobiles with optional 0 / 91 / +91 prefix, or international numbers written with a leading "+". */
export function phoneError(value: string): string {
  const phone = value.trim()
  if (!phone) return 'Please enter your mobile number.'
  if (!/^\+?[\d\s\-()]+$/.test(phone)) {
    return 'Please use digits only, e.g. 98205 77144.'
  }

  const digits = phone.replace(/\D/g, '')
  if (phone.startsWith('+') && !digits.startsWith('91')) {
    return digits.length >= 8 && digits.length <= 15
      ? ''
      : 'Please enter a valid mobile number for the selected country code.'
  }
  return /^(?:0|91)?[6-9]\d{9}$/.test(digits) ? '' : INDIAN_MOBILE_MESSAGE
}
