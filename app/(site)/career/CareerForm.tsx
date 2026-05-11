'use client'

import styles from './page.module.css'

export default function CareerForm() {
  return (
    <form
      className={styles.form}
      data-reveal
      onSubmit={(event) => {
        event.preventDefault()
      }}
    >
      <div className={styles.row}>
        <input className={styles.field} type="text" name="firstName" placeholder="First name" autoComplete="given-name" required />
        <input className={styles.field} type="text" name="lastName" placeholder="Last name" autoComplete="family-name" required />
      </div>
      <input
        className={styles.field}
        type="email"
        name="email"
        placeholder="Email address"
        autoComplete="email"
        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
        title="Please enter a valid email address, for example name@example.com"
        required
      />
      <input className={styles.field} type="tel" name="phone" placeholder="Contact number" autoComplete="tel" required />
      <label className={styles.fileField}>
        <span>Attach resume</span>
        <input type="file" name="resume" accept=".pdf,.doc,.docx" required />
      </label>
      <button type="submit" className={styles.submitBtn}>
        <span>Submit Application</span>
      </button>
    </form>
  )
}
