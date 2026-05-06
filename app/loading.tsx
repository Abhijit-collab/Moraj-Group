export default function Loading() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: 'var(--white)',
    }}>
      <div style={{
        fontFamily: 'var(--serif)', fontSize: '22px', fontWeight: 300,
        color: 'var(--light)', letterSpacing: '.2em', textTransform: 'uppercase',
        animation: 'pulse 1.4s ease-in-out infinite',
      }}>
        Moraj
      </div>
    </div>
  )
}
