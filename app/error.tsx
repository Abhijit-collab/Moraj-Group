'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--sans)', background: 'var(--white)',
      textAlign: 'center', padding: '52px',
    }}>
      <div style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 300, color: 'var(--ink)', marginBottom: '12px' }}>
        Something went wrong
      </div>
      <p style={{ fontSize: '13px', color: 'var(--mid)', fontWeight: 300, marginBottom: '32px' }}>
        We couldn&apos;t load this page. Please try again.
      </p>
      <button
        onClick={reset}
        style={{
          fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase',
          color: 'var(--rose)', border: '1px solid var(--rose)',
          padding: '12px 32px', background: 'none', cursor: 'pointer',
          fontFamily: 'var(--sans)',
        }}
      >
        Try again
      </button>
    </div>
  )
}
