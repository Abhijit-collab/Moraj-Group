'use client'

import styles from './page.module.css'

interface Props {
  heading: string
}

export default function ProjectEnquireForm({ heading }: Props) {
  return (
    <form
      className={styles.enquireCard}
      id="enquire"
      onSubmit={(event) => {
        event.preventDefault()
      }}
    >
      <h3>{heading}</h3>
      <input placeholder="Full Name" required />
      <input
        type="email"
        placeholder="Email Address"
        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
        title="Please enter a valid email address, for example name@example.com"
        required
      />
      <input placeholder="Phone Number" required />
      <button type="submit">Request Callback</button>
    </form>
  )
}
