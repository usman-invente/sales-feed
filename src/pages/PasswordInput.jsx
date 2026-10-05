import { useState } from 'react'

function EyeIcon({ visible }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {visible ? (
        <>
          <path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" />
          <circle cx="12" cy="12" r="2.7" />
        </>
      ) : (
        <>
          <path d="m3 3 18 18" />
          <path d="M10.6 6.1A10.8 10.8 0 0 1 12 6c6.1 0 9.5 6 9.5 6a15.2 15.2 0 0 1-3.1 3.5M6.2 6.8C3.8 8.3 2.5 12 2.5 12s3.4 6 9.5 6c1 0 2-.2 2.8-.5" />
          <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
        </>
      )}
    </svg>
  )
}

export default function PasswordInput({
  autoComplete,
  label,
  minLength = 8,
  name,
  placeholder,
}) {
  const [visible, setVisible] = useState(false)

  return (
    <label className="auth-field">
      <span>{label}</span>
      <span className="auth-password-wrap">
        <input
          autoComplete={autoComplete}
          minLength={minLength}
          name={name}
          placeholder={placeholder}
          required
          type={visible ? 'text' : 'password'}
        />
        <button
          aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          className="password-toggle"
          onClick={() => setVisible((current) => !current)}
          type="button"
        >
          <EyeIcon visible={visible} />
        </button>
      </span>
    </label>
  )
}
