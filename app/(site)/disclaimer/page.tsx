import type { Metadata } from 'next'
import LegalPageShell from '../legal/LegalPageShell'
import styles from '../legal/legal.module.css'
import { siteSettingsQuery } from '@/lib/queries'
import { getSanityClient, isSanityConfigured } from '@/lib/sanity'
import { devHomepageContent } from '@/lib/sanity-dev-data'
import type { SiteSettings } from '@/lib/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Disclaimer',
  description:
    'Important disclaimers regarding project information, imagery and content on the Moraj Group website.',
}

export default async function DisclaimerPage() {
  const settings = isSanityConfigured
    ? await getSanityClient().fetch<SiteSettings>(siteSettingsQuery)
    : devHomepageContent.settings

  const email = settings?.email ?? 'sales@morajinfratech.com'
  const phone = settings?.phone ?? '+91 98205 77144'

  return (
    <LegalPageShell
      overline="Legal"
      title="Disclaimer"
      updated="9 September 2026"
      settings={settings}
    >
      <section className={styles.section}>
        <h2>1. General</h2>
        <p>
          The information on this website is published by Moraj Infratech Pvt. Ltd. / Moraj Group
          (&quot;Moraj Group&quot;) in good faith for general awareness. It is not intended as an
          offer, invitation or solicitation to purchase, book or invest in any property, nor as
          legal, financial or investment advice.
        </p>
      </section>

      <section className={styles.section}>
        <h2>2. Project information</h2>
        <p>
          Specifications, unit sizes, floor plans, prices, payment plans, possession timelines,
          amenities, views, finishes and other project particulars shown on this website are
          indicative and subject to change without prior notice. Final details are those stated in
          the applicable agreement for sale, allotment documentation and approvals granted by
          competent authorities, including disclosures under the Real Estate (Regulation and
          Development) Act, 2016 (RERA) and rules thereunder.
        </p>
        <p>
          Prospective buyers should independently verify project status, RERA registration,
          sanctioned plans, title, and other material facts with authorised representatives of
          Moraj Group and relevant public records before making any commitment.
        </p>
      </section>

      <section className={styles.section}>
        <h2>3. Imagery, renders &amp; virtual tours</h2>
        <p>
          Photographs, artist impressions, CGI renders, videos, drone footage and virtual walkthroughs
          are for illustration only. Actual construction, landscaping, finishes, views and
          neighbourhood development may differ due to technical, regulatory or design requirements.
          Furniture, décor and lifestyle objects shown in visuals are typically not part of the
          standard offering unless expressly stated in the agreement.
        </p>
      </section>

      <section className={styles.section}>
        <h2>4. Pricing &amp; availability</h2>
        <p>
          Any price mentions (including starting prices or ranges) are approximate, may exclude
          taxes, premiums, parking, club membership, stamp duty, registration and other charges,
          and may vary by inventory, floor and configuration. Availability of units cannot be
          guaranteed from website content alone.
        </p>
      </section>

      <section className={styles.section}>
        <h2>5. No warranty</h2>
        <p>
          While we endeavour to keep information current, Moraj Group does not warrant that the
          website is complete, accurate, up to date or free of errors or interruptions. Use of the
          website is at your own risk.
        </p>
      </section>

      <section className={styles.section}>
        <h2>6. Third-party content</h2>
        <p>
          Maps, press mentions, external articles, partner logos or linked websites are provided for
          convenience. Moraj Group does not endorse or take responsibility for third-party content,
          opinions or services.
        </p>
      </section>

      <section className={styles.section}>
        <h2>7. Limitation</h2>
        <p>
          To the maximum extent permitted by law, Moraj Group shall not be liable for any loss or
          damage arising from reliance on website content or from decisions made based on such
          content. Binding rights and obligations arise only from executed agreements and statutory
          documents.
        </p>
      </section>

      <section className={styles.section}>
        <h2>8. Contact for clarifications</h2>
        <p>
          For official project information, please contact our sales team at{' '}
          <a href={`mailto:${email}`}>{email}</a> or{' '}
          <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>, or visit the project site
          office as advised by our representatives.
        </p>
      </section>

      <p className={styles.note}>
        This Disclaimer should be read with our Terms of Use and Privacy Policy. For transaction
        decisions, always rely on executed documents and advice from qualified professionals.
      </p>
    </LegalPageShell>
  )
}
