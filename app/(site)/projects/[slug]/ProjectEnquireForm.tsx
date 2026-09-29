'use client'

import { useState } from 'react'
import PhoneInput from '@/components/ui/PhoneInput'
import { DEFAULT_COUNTRY_CODE, EMAIL_PATTERN, withCountryCode } from '@/lib/enquiry-validation'
import styles from './page.module.css'

interface Props {
  heading: string
  project: string
}

export default function ProjectEnquireForm({ heading, project }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, mobile: withCountryCode(countryCode, phone), project }),
      })
      const data: { ok?: boolean } | null = await res.json().catch(() => null)
      setStatus(data?.ok === true ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className={styles.enquireCard} id="enquire">
        <h3>{heading}</h3>
        <p className={styles.enquireSuccess}>Thank you. We&apos;ll call you back shortly.</p>
      </div>
    )
  }

  return (
    <form className={styles.enquireCard} id="enquire" onSubmit={onSubmit}>
      <h3>{heading}</h3>
      <input
        name="name"
        placeholder="Full Name"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email Address"
        autoComplete="email"
        pattern={EMAIL_PATTERN}
        title="Please enter a valid email address, for example name@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <PhoneInput
        countryCode={countryCode}
        onCountryCodeChange={setCountryCode}
        value={phone}
        onChange={setPhone}
        placeholder="Phone Number"
        className={styles.enquirePhone}
        pickerClassName={styles.enquirePhonePicker}
      />
      <button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Request Callback'}
      </button>
      {status === 'error' && (
        <p className={styles.enquireError}>Something went wrong. Please try again or call us directly.</p>
      )}
    </form>
  )
}
