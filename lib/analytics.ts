// GA4 custom event helpers
// Import and call these anywhere in client components

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

function gtag(...args: unknown[]) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args)
  }
}

// ── Page events ──────────────────────────────────

/** Track when user clicks "Explore Residences" CTA on hero */
export function trackHeroCTA(label: string) {
  gtag('event', 'select_content', {
    content_type: 'hero_cta',
    content_id: label,
  })
}

/** Track when user clicks a residence tile */
export function trackResidenceClick(residenceName: string, location: string) {
  gtag('event', 'select_item', {
    item_list_id: 'residences',
    item_list_name: 'Homepage Residences',
    items: [{ item_id: residenceName, item_name: residenceName, item_category: location }],
  })
}

/** Track enquiry form submission */
export function trackEnquiry(residenceName: string) {
  gtag('event', 'generate_lead', {
    event_category: 'enquiry_form',
    event_label: residenceName,
    value: 1,
  })
}

/** Track phone number click */
export function trackPhoneClick() {
  gtag('event', 'contact', {
    event_category: 'engagement',
    event_label: 'phone_click',
  })
}

/** Track when user plays the brand video */
export function trackVideoPlay() {
  gtag('event', 'video_start', {
    event_category: 'engagement',
    event_label: 'hero_brand_video',
  })
}

/** Track scroll depth milestone */
export function trackScrollDepth(depth: number) {
  gtag('event', 'scroll', {
    event_category: 'engagement',
    event_label: `${depth}%`,
    value: depth,
  })
}
