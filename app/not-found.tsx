import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--sans)', background: 'var(--white)', textAlign: 'center', padding: '52px',
    }}>
      <div style={{ fontFamily: 'var(--serif)', fontSize: '80px', fontWeight: 300, color: 'var(--light)', lineHeight: 1 }}>404</div>
      <div style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 300, color: 'var(--ink)', marginTop: '16px', marginBottom: '12px' }}>
        Page not found
      </div>
      <p style={{ fontSize: '13px', color: 'var(--mid)', fontWeight: 300, marginBottom: '36px' }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" style={{
        display: 'inline-block', fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase',
        color: 'var(--rose)', border: '1px solid var(--rose)', padding: '12px 32px',
        textDecoration: 'none', fontWeight: 300,
      }}>
        Back to home
      </Link>
    </div>
  )
}
