'use client'

import { useState } from 'react'
import type { SiteSettings, IconicProjectCard } from '@/lib/types'
import styles from './EnquireSection.module.css'

interface Props {
  settings: SiteSettings | null
  projects: IconicProjectCard[]
}

export default function EnquireSection({ settings, projects }: Props) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', residence: '', date: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

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
    const res = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      setStatus('sent')
    } else {
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
              <input className={styles.field} name="phone" placeholder="Mobile number" value={form.phone} onChange={onChange} required />
            </div>
            <input
              className={styles.field}
              name="email"
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={onChange}
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              title="Please enter a valid email address, for example name@example.com"
              required
            />
            <select className={styles.field} name="residence" value={form.residence} onChange={onChange} required>
              <option value="">Select a residence</option>
              {projects.map((p, i) => (
                <option key={p._key ?? `${p.title}-${i}`} value={p.title}>{p.title}</option>
              ))}
            </select>
            <input className={styles.field} name="date" type="text" placeholder="Preferred visit date" value={form.date} onChange={onChange} required />
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
