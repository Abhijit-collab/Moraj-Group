'use client'

import { useEffect, useState } from 'react'

export default function PageLoader() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setHidden(true), 1500)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <div className={`pageLoader ${hidden ? 'pageLoaderHidden' : ''}`} aria-hidden={hidden}>
      <div className="pageLoaderWord">Moraj</div>
    </div>
  )
}
