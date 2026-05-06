'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', padding: '24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px' }}>Something went wrong</h1>
        <p style={{ color: '#555', fontSize: '14px', marginBottom: '24px', maxWidth: '420px' }}>
          The application hit an unexpected error. If you are developing locally, check the terminal for details.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            padding: '12px 28px',
            border: '1px solid #111',
            background: 'transparent',
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
