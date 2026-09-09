import type { Metadata } from 'next'
import LegalPageShell from '../legal/LegalPageShell'
import styles from '../legal/legal.module.css'
import { siteSettingsQuery } from '@/lib/queries'
import { getSanityClient, isSanityConfigured } from '@/lib/sanity'
import { devHomepageContent } from '@/lib/sanity-dev-data'
import type { SiteSettings } from '@/lib/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms governing use of the Moraj Group website and related digital content.',
}

export default async function TermsOfUsePage() {
  const settings = isSanityConfigured
    ? await getSanityClient().fetch<SiteSettings>(siteSettingsQuery)
    : devHomepageContent.settings

  const phone = settings?.phone ?? '+91 98205 77144'
  const email = settings?.email ?? 'sales@morajinfratech.com'

  return (
    <LegalPageShell
      overline="Legal"
      title="Terms of Use"
      updated="9 September 2026"
      settings={settings}
    >
      <section className={styles.section}>
        <h2>1. Acceptance of terms</h2>
        <p>
          These Terms of Use (&quot;Terms&quot;) govern your access to and use of the website
          operated by Moraj Infratech Pvt. Ltd. / Moraj Group (&quot;Moraj Group&quot;,
          &quot;we&quot;, &quot;us&quot;). By browsing or using this website, you agree to these
          Terms and our Privacy Policy. If you do not agree, please do not use the website.
        </p>
      </section>

      <section className={styles.section}>
        <h2>2. About this website</h2>
        <p>
          This website provides general information about Moraj Group, our residential and related
          projects, news, careers and contact channels. Content is for informational purposes and
          does not by itself create a booking, allotment, sale, lease or other binding real-estate
          transaction.
        </p>
      </section>

      <section className={styles.section}>
        <h2>3. Eligibility</h2>
        <p>
          You confirm that you are legally capable of entering into these Terms under applicable
          Indian law. If you use the website on behalf of an organisation, you represent that you
          have authority to bind that organisation.
        </p>
      </section>

      <section className={styles.section}>
        <h2>4. Use of the website</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the site for any unlawful, harmful or fraudulent purpose</li>
          <li>Attempt to gain unauthorised access to servers, accounts or data</li>
          <li>Scrape, harvest or systematically extract content without our written consent</li>
          <li>Upload malware or interfere with the site&apos;s operation or security</li>
          <li>Misrepresent your identity when submitting forms or communications</li>
          <li>
            Use our trademarks, logos, project names or imagery in a misleading way or without
            permission
          </li>
        </ul>
        <p>
          We may suspend or restrict access if we reasonably believe these Terms have been
          violated.
        </p>
      </section>

      <section className={styles.section}>
        <h2>5. Project information &amp; RERA</h2>
        <p>
          Project descriptions, configurations, areas, prices, timelines, amenities, images,
          floor plans and RERA references on this website are indicative and may change. Official
          project details, approvals and disclosures are as registered under applicable RERA
          authorities and in documents provided at the time of booking. Always verify information
          with our sales team and authorised project documentation before making any decision.
        </p>
      </section>

      <section className={styles.section}>
        <h2>6. Intellectual property</h2>
        <p>
          All text, graphics, logos, photographs, videos, layouts and other materials on this
          website are owned by Moraj Group or its licensors and are protected by intellectual
          property laws. You may view and download materials for personal, non-commercial use
          only. Any other reproduction, distribution or modification requires prior written
          consent.
        </p>
      </section>

      <section className={styles.section}>
        <h2>7. User submissions</h2>
        <p>
          If you submit an enquiry, resume or other content, you grant Moraj Group a non-exclusive
          right to use that information to respond to you and operate our business. You confirm
          that submissions are accurate and do not infringe third-party rights. Do not submit
          confidential information you do not wish us to receive through web forms.
        </p>
      </section>

      <section className={styles.section}>
        <h2>8. Third-party services &amp; links</h2>
        <p>
          The website may embed or link to maps, payment or hosting providers, analytics, social
          media, or dedicated project websites. Those services are subject to their own terms. We
          are not responsible for their availability, accuracy or practices.
        </p>
      </section>

      <section className={styles.section}>
        <h2>9. Disclaimer of warranties</h2>
        <p>
          The website and its content are provided on an &quot;as is&quot; and &quot;as
          available&quot; basis. To the fullest extent permitted by law, we disclaim warranties of
          merchantability, fitness for a particular purpose, non-infringement, and uninterrupted
          or error-free operation. Visualisations and renders are artistic representations and may
          differ from the finished project.
        </p>
      </section>

      <section className={styles.section}>
        <h2>10. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by applicable law, Moraj Group and its directors,
          employees and agents shall not be liable for any indirect, incidental, special,
          consequential or punitive damages, or any loss of profits, data or goodwill, arising from
          your use of (or inability to use) this website. Our total liability for any claim related
          to the website shall not exceed INR 5,000, except where liability cannot be limited by
          law.
        </p>
      </section>

      <section className={styles.section}>
        <h2>11. Indemnity</h2>
        <p>
          You agree to indemnify and hold harmless Moraj Group from claims, losses and expenses
          (including reasonable legal fees) arising from your misuse of the website or breach of
          these Terms.
        </p>
      </section>

      <section className={styles.section}>
        <h2>12. Governing law</h2>
        <p>
          These Terms are governed by the laws of India. Courts at Navi Mumbai / Mumbai, Maharashtra
          shall have exclusive jurisdiction, subject to any mandatory consumer protections that
          apply.
        </p>
      </section>

      <section className={styles.section}>
        <h2>13. Changes</h2>
        <p>
          We may revise these Terms at any time by updating this page. The &quot;Last updated&quot;
          date reflects the latest revision. Continued use after changes means you accept the
          updated Terms.
        </p>
      </section>

      <section className={styles.section}>
        <h2>14. Contact</h2>
        <p>
          Questions about these Terms:{' '}
          <a href={`mailto:${email}`}>{email}</a> or{' '}
          <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>.
        </p>
      </section>

      <p className={styles.note}>
        These Terms are a practical baseline for website use. They are not a substitute for
        project-specific agreements, allotment letters or counsel-reviewed contracts.
      </p>
    </LegalPageShell>
  )
}
