'use client'

import { useEffect, useRef } from 'react'
import { COUNTRY_CODES, phoneError, withCountryCode } from '@/lib/enquiry-validation'
import styles from './PhoneInput.module.css'

interface Props {
  countryCode: string
  onCountryCodeChange: (code: string) => void
  value: string
  onChange: (value: string) => void
  name?: string
  placeholder?: string
  /** Wrapper (flex row holding the picker and the input). */
  className?: string
  /** Visual styling for the code picker, e.g. borders to match the form's inputs. */
  pickerClassName?: string
  inputClassName?: string
}

export default function PhoneInput({
  countryCode,
  onCountryCodeChange,
  value,
  onChange,
  name = 'phone',
  placeholder = 'Mobile number',
  className,
  pickerClassName,
  inputClassName,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const fullPhone = withCountryCode(countryCode, value)

  // Leave an empty field to the `required` message; otherwise show the specific problem on submit.
  useEffect(() => {
    inputRef.current?.setCustomValidity(fullPhone ? phoneError(fullPhone) : '')
  }, [fullPhone])

  return (
    <div className={`${styles.group} ${className ?? ''}`}>
      <label className={`${styles.picker} ${pickerClassName ?? ''}`}>
        <span aria-hidden="true">{countryCode}</span>
        <select
          value={countryCode}
          onChange={(e) => onCountryCodeChange(e.target.value)}
          aria-label="Country code"
          autoComplete="tel-country-code"
        >
          {COUNTRY_CODES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.country} ({c.code})
            </option>
          ))}
        </select>
      </label>
      <input
        ref={inputRef}
        className={inputClassName}
        name={name}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        maxLength={20}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </div>
  )
}
