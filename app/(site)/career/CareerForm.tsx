'use client'

import { useState } from 'react'
import PhoneInput from '@/components/ui/PhoneInput'
import {
  DEFAULT_COUNTRY_CODE,
  EMAIL_PATTERN,
  RESUME_ACCEPT,
  resumeError,
  withCountryCode,
} from '@/lib/enquiry-validation'
import styles from './page.module.css'

export default function CareerForm() {
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')
    const body = new FormData(event.currentTarget)
    body.set('phone', withCountryCode(countryCode, phone))
    try {
      const res = await fetch('/api/career', { method: 'POST', body })
      const data: { ok?: boolean } | null = await res.json().catch(() => null)
      setStatus(data?.ok === true ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className={styles.form}>
        <p className={styles.formSuccess}>Thank you for applying. Our team will review your resume and get in touch.</p>
      </div>
    )
  }

  return (
    <form className={styles.form} data-reveal onSubmit={onSubmit}>
      <div className={styles.row}>
        <input className={styles.field} type="text" name="firstName" placeholder="First name" autoComplete="given-name" required />
        <input className={styles.field} type="text" name="lastName" placeholder="Last name" autoComplete="family-name" required />
      </div>
      <input
        className={styles.field}
        type="email"
        name="email"
        placeholder="Email address"
        autoComplete="email"
        pattern={EMAIL_PATTERN}
        title="Please enter a valid email address, for example name@example.com"
        required
      />
      <PhoneInput
        countryCode={countryCode}
        onCountryCodeChange={setCountryCode}
        value={phone}
        onChange={setPhone}
        placeholder="Contact number"
        inputClassName={styles.field}
        pickerClassName={styles.phonePicker}
      />
      <label className={styles.fileField}>
        <span>Attach resume</span>
        <input
          type="file"
          name="resume"
          accept={RESUME_ACCEPT}
          onChange={(e) => {
            const file = e.currentTarget.files?.[0]
            // No file selected is left to the `required` message.
            e.currentTarget.setCustomValidity(file ? resumeError(file) : '')
          }}
          required
        />
      </label>
      <button type="submit" className={styles.submitBtn} disabled={status === 'sending'}>
        <span>{status === 'sending' ? 'Sending…' : 'Submit Application'}</span>
      </button>
      {status === 'error' && (
        <p className={styles.formError}>Something went wrong. Please try again, or email your resume to us directly.</p>
      )}
    </form>
  )
}
