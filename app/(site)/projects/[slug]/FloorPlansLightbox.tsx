'use client'

import { useMemo, useState } from 'react'
import styles from './page.module.css'

interface FloorPlanItem {
  label: string
  imageUrl: string
}

interface Props {
  plans: FloorPlanItem[]
}

export default function FloorPlansLightbox({ plans }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const activePlan = useMemo(
    () => (activeIndex === null ? null : plans[activeIndex] ?? null),
    [activeIndex, plans]
  )

  return (
    <>
      <div className={styles.floorPlans}>
        {plans.map((plan, i) => (
          <button
            key={`${plan.label}-${i}`}
            type="button"
            className={styles.floorPlan}
            style={{ backgroundImage: `url(${plan.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            onClick={() => setActiveIndex(i)}
            aria-label={`Open floor plan ${plan.label}`}
          >
            <span className={styles.floorPlanBadge}>3 BHK</span>
            {plan.label}
          </button>
        ))}
      </div>

      {activePlan && (
        <div
          className={styles.floorPlanModalBackdrop}
          role="dialog"
          aria-modal="true"
          aria-label={activePlan.label}
          onClick={() => setActiveIndex(null)}
        >
          <div className={styles.floorPlanModal} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.floorPlanModalClose}
              onClick={() => setActiveIndex(null)}
              aria-label="Close floor plan popup"
            >
              ×
            </button>
            <img className={styles.floorPlanModalImage} src={activePlan.imageUrl} alt={activePlan.label} />
            <div className={styles.floorPlanModalLabel}>{activePlan.label}</div>
          </div>
        </div>
      )}
    </>
  )
}
