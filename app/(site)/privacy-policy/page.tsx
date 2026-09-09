import type { Metadata } from 'next'
import LegalPageShell from '../legal/LegalPageShell'
import styles from '../legal/legal.module.css'
import { siteSettingsQuery } from '@/lib/queries'
import { getSanityClient, isSanityConfigured } from '@/lib/sanity'
import { devHomepageContent } from '@/lib/sanity-dev-data'
import type { SiteSettings } from '@/lib/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Moraj Group collects, uses and protects personal information on morajgroup.com.',
}

export default async function PrivacyPolicyPage() {
  const settings = isSanityConfigured
    ? await getSanityClient().fetch<SiteSettings>(siteSettingsQuery)
    : devHomepageContent.settings

  const phone = settings?.phone ?? '+91 98205 77144'
  const email = settings?.email ?? 'sales@morajinfratech.com'
  const address =
    settings?.address ?? '18th Floor, The Affaires, Sanpada, Navi Mumbai 400705'

  return (
    <LegalPageShell
      overline="Legal"
      title="Privacy Policy"
      updated="9 September 2026"
      settings={settings}
    >
      <section className={styles.section}>
        <h2>1. Introduction</h2>
        <p>
          Moraj Infratech Pvt. Ltd. and its group entities (collectively, &quot;Moraj Group&quot;,
          &quot;we&quot;, &quot;us&quot; or &quot;our&quot;) respect your privacy. This Privacy Policy
          explains how we collect, use, store and share personal information when you visit{' '}
          <a href="https://morajgroup.com">morajgroup.com</a> or related project pages, submit
          enquiry or career forms, or otherwise interact with our digital channels.
        </p>
        <p>
          By using this website, you agree to the practices described in this Policy. If you do not
          agree, please discontinue use of the website.
        </p>
      </section>

      <section className={styles.section}>
        <h2>2. Information we collect</h2>
        <p>We may collect the following categories of information:</p>
        <ul>
          <li>
            <strong>Identity &amp; contact details</strong> — name, phone number, email address, and
            any message you include in forms (site visit requests, enquiries, career applications).
          </li>
          <li>
            <strong>Project preferences</strong> — residence or project of interest, preferred visit
            date, and similar selections you submit.
          </li>
          <li>
            <strong>Technical data</strong> — IP address, browser type, device information, pages
            viewed, referral source, and approximate location derived from analytics tools.
          </li>
          <li>
            <strong>Communication records</strong> — emails, call notes or follow-ups related to your
            enquiry, where retained for customer service.
          </li>
        </ul>
        <p>
          We do not knowingly collect sensitive personal data (such as passwords, financial account
          passwords, or biometric data) through this website unless you voluntarily provide it.
        </p>
      </section>

      <section className={styles.section}>
        <h2>3. How we use your information</h2>
        <p>We use personal information to:</p>
        <ul>
          <li>Respond to enquiries and schedule site visits or consultations</li>
          <li>Share project information, brochures and updates you have requested</li>
          <li>Process career applications and communicate with applicants</li>
          <li>Improve website performance, content and user experience</li>
          <li>Comply with legal, regulatory or audit requirements applicable to us</li>
          <li>Prevent fraud, abuse or misuse of our digital platforms</li>
        </ul>
        <p>
          We may send marketing or project updates only where permitted, and you may opt out of
          promotional messages at any time by contacting us using the details below.
        </p>
      </section>

      <section className={styles.section}>
        <h2>4. Cookies and analytics</h2>
        <p>
          Our website may use cookies, pixels or similar technologies, including Google Analytics or
          comparable tools, to understand traffic and improve the site. These tools may collect
          aggregated or pseudonymised usage data. You can control cookies through your browser
          settings; disabling cookies may affect some site features.
        </p>
      </section>

      <section className={styles.section}>
        <h2>5. Sharing of information</h2>
        <p>
          We do not sell your personal information. We may share it with:
        </p>
        <ul>
          <li>Internal teams within Moraj Group who need it to serve your request</li>
          <li>
            Trusted service providers (hosting, CRM, email, analytics, form processing) under
            appropriate confidentiality obligations
          </li>
          <li>Professional advisers or authorities when required by law or legal process</li>
          <li>
            Business partners involved in a specific project enquiry, only as needed to fulfil your
            request
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>6. Data retention &amp; security</h2>
        <p>
          We retain personal information only as long as needed for the purposes above, or as
          required by applicable law. We use reasonable administrative and technical safeguards to
          protect information; however, no internet transmission or storage system is fully secure.
        </p>
      </section>

      <section className={styles.section}>
        <h2>7. Your choices</h2>
        <p>
          Subject to applicable law, you may request access to, correction of, or deletion of
          personal information we hold about you, or ask us to stop using it for marketing. To make
          a request, contact us using the details in Section 9. We may need to verify your identity
          before responding.
        </p>
      </section>

      <section className={styles.section}>
        <h2>8. Third-party links</h2>
        <p>
          This website may link to project microsites, map services, social platforms or other
          third-party websites. Their privacy practices are governed by their own policies. We are
          not responsible for content or data handling on those sites.
        </p>
      </section>

      <section className={styles.section}>
        <h2>9. Contact us</h2>
        <p>
          For privacy-related questions or requests, please contact:
        </p>
        <p>
          Moraj Infratech Pvt. Ltd.<br />
          {address}<br />
          Phone: <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
          <br />
          Email: <a href={`mailto:${email}`}>{email}</a>
        </p>
      </section>

      <section className={styles.section}>
        <h2>10. Updates to this Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at
          the top of this page will change when we do. Continued use of the website after updates
          constitutes acceptance of the revised Policy.
        </p>
      </section>

      <p className={styles.note}>
        This page is provided for general information about how Moraj Group handles website-related
        personal data. It is not legal advice. For formal legal review of your compliance
        obligations, please consult your counsel.
      </p>
    </LegalPageShell>
  )
}
