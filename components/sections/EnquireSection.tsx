'use client'

import { useEffect, useRef, useState } from 'react'
import type { SiteSettings, IconicProjectCard } from '@/lib/types'
import {
  COUNTRY_CODES,
  DEFAULT_COUNTRY_CODE,
  EMAIL_PATTERN,
  phoneError,
  withCountryCode,
} from '@/lib/enquiry-validation'
import styles from './EnquireSection.module.css'

interface Props {
  settings: SiteSettings | null
  projects: IconicProjectCard[]
}

export default function EnquireSection({ settings, projects }: Props) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', residence: '', date: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [minDate, setMinDate] = useState<string>()
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE)
  const phoneRef = useRef<HTMLInputElement>(null)
  const fullPhone = withCountryCode(countryCode, form.phone)

  // Leave an empty field to the `required` message; otherwise show the specific problem on submit.
  useEffect(() => {
    phoneRef.current?.setCustomValidity(fullPhone ? phoneError(fullPhone) : '')
  }, [fullPhone])

  // Computed on the client so "today" uses the visitor's timezone, not the server's.
  useEffect(() => {
    const now = new Date()
    const pad = (n: number) => String(n).padStart(2, '0')
    setMinDate(`${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`)
  }, [])

  const heading = (settings as any)?.enquireHeading ?? 'Your dream home is waiting for you.'
  const sub = (settings as any)?.enquireSub ?? 'Schedule a complimentary site visit. Our team will guide you through every detail — no pressure, just possibilities.'

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    // Track GA4 lead event
    const { trackEnquiry } = await import('@/lib/analytics')
    trackEnquiry(form.residence || 'general')

    // Submit to API route
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, phone: fullPhone }),
      })
      const data: { ok?: boolean } | null = await res.json().catch(() => null)
      setStatus(data?.ok === true ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className={styles.section} id="enquire" data-reveal data-reveal-stagger="true">
      <div className={styles.left}>
        <div className={styles.label}>
          <div className={styles.labelRule} />
          Get In Touch
        </div>
        <h2 className={styles.h2}>
          {heading.split('.')[0]}.<br />
          <em>{heading.split('.').slice(1).join('.').trim()}</em>
        </h2>
        <p className={styles.sub}>{sub}</p>

        {status === 'sent' ? (
          <div className={styles.success}>
            Thank you. We&apos;ll be in touch within 24 hours.
          </div>
        ) : (
          <form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.row}>
              <input className={styles.field} name="name" placeholder="Full name" value={form.name} onChange={onChange} required />
              <div className={styles.phoneGroup}>
                <label className={styles.countryCode}>
                  <span aria-hidden="true">{countryCode}</span>
                  <select
                    name="countryCode"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    aria-label="Country code"
                    autoComplete="tel-country-code"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.country} ({c.code})
                      </option>
                    ))}
                  </select>
                </label>
                <input
                  ref={phoneRef}
                  className={styles.field}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  maxLength={20}
                  placeholder="Mobile number"
                  value={form.phone}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
            <input
              className={styles.field}
              name="email"
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={onChange}
              pattern={EMAIL_PATTERN}
              title="Please enter a valid email address, for example name@example.com"
              required
            />
            <select className={styles.field} name="residence" value={form.residence} onChange={onChange} required>
              <option value="">Select a residence</option>
              {projects.map((p, i) => (
                <option key={p._key ?? `${p.title}-${i}`} value={p.title}>{p.title}</option>
              ))}
            </select>
            <label className={styles.datePicker}>
              <input
                className={`${styles.field} ${form.date ? '' : styles.dateEmpty}`}
                name="date"
                type="date"
                min={minDate}
                value={form.date}
                onChange={onChange}
                onClick={(e) => {
                  try {
                    e.currentTarget.showPicker()
                  } catch {
                    // Older browsers without showPicker still open the picker from the calendar icon.
                  }
                }}
                aria-label="Preferred visit date"
                required
              />
              {!form.date && (
                <span className={styles.datePlaceholder} aria-hidden="true">
                  Preferred visit date
                </span>
              )}
            </label>
            <button type="submit" className={styles.submit} disabled={status === 'sending'}>
              <span>{status === 'sending' ? 'Sending…' : 'Request a site visit'}</span>
            </button>
            <p className={styles.note}>Your details are kept private. We do not share your information.</p>
            {status === 'error' && (
              <p style={{ fontSize: '11px', color: '#c0392b', marginTop: '8px', fontWeight: 300 }}>
                Something went wrong. Please call us directly at {settings?.phone ?? '+91 98205 77144'}
              </p>
            )}
          </form>
        )}
      </div>

      <div className={styles.right}>
        <div className={styles.contact}>
          <div className={styles.contactLabel}>Call us directly</div>
          <a href={`tel:${settings?.phone ?? '+919820577144'}`} className={styles.contactSm}>
            {settings?.phone ?? '+91 98205 77144'}
          </a>
        </div>
        <div className={styles.sep} />
        <div className={styles.contact}>
          <div className={styles.contactLabel}>Write to us</div>
          <a href={`mailto:${settings?.email ?? 'sales@morajinfratech.com'}`} className={styles.contactSm}>
            {settings?.email ?? 'sales@morajinfratech.com'}
          </a>
        </div>
        <div className={styles.sep} />
        <div className={styles.contact}>
          <div className={styles.contactLabel}>Visit our office</div>
          <div className={styles.contactSm}>{settings?.address ?? '18th Floor, The Affaires,\nSanpada, Navi Mumbai 400705'}</div>
        </div>
        <div className={styles.sep} />
        <div className={styles.contact}>
          <div className={styles.contactLabel}>Office hours</div>
          <div className={styles.contactSm}>{settings?.officeHours ?? 'Monday – Saturday · 9am – 7pm'}</div>
        </div>
      </div>
    </section>
  )
}
