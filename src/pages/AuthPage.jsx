import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Auth.css'

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

export default function AuthPage({ mode }) {
  const isRegister = mode === 'register'
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmationVisible, setConfirmationVisible] = useState(false)
  const [notice, setNotice] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    if (
      isRegister &&
      formData.get('password') !== formData.get('confirmPassword')
    ) {
      setNotice('Those passwords don’t match yet. Give it another try.')
      return
    }

    setNotice(
      'Your form is ready, but sign-in isn’t connected yet. Please check back soon.',
    )
  }

  return (
    <div className={`auth-page${isRegister ? ' auth-page-register' : ''}`}>
      <section className="auth-visual" aria-label="Goodkind community">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85"
          alt="A relaxed, sunlit living room furnished with thoughtfully chosen pieces"
        />
        <div className="auth-visual-overlay" />
        <Link className="auth-brand" to="/" aria-label="Goodkind home">
          <span className="auth-brand-mark">g<span>.</span></span>
          goodkind
        </Link>
        <div className="auth-visual-copy">
          <span className="auth-kicker"><span>✳</span> A LITTLE MORE GOOD</span>
          <p>Good things<br />find their people.</p>
          <span className="auth-photo-caption">A second life looks good on you.</span>
        </div>
        <div className="auth-visual-foot">
          <span>THOUGHTFUL FINDS, RIGHT AROUND THE CORNER</span>
          <span aria-hidden="true">♡</span>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-form-wrap">
          <span className="auth-kicker auth-panel-kicker">
            {isRegister ? 'COME ON IN' : 'WELCOME BACK'}
          </span>
          <h1>{isRegister ? <>Make yourself<br /><em>at home.</em></> : <>Good to<br /><em>see you.</em></>}</h1>
          <p className="auth-intro">
            {isRegister
              ? 'Create an account and find your next favorite thing.'
              : 'Your next good find is right where you left it.'}
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isRegister && (
              <label className="auth-field">
                <span>Your name</span>
                <input
                  autoComplete="name"
                  name="name"
                  placeholder="What should we call you?"
                  required
                />
              </label>
            )}
            <label className="auth-field">
              <span>Email address</span>
              <input
                autoComplete="email"
                name="email"
                placeholder="you@example.com"
                required
                type="email"
              />
            </label>
            <label className="auth-field">
              <span>Password</span>
              <span className="auth-password-wrap">
                <input
                  autoComplete={isRegister ? 'new-password' : 'current-password'}
                  minLength={8}
                  name="password"
                  placeholder={isRegister ? 'At least 8 characters' : 'Enter your password'}
                  required
                  type={passwordVisible ? 'text' : 'password'}
                />
                <button
                  aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                  className="password-toggle"
                  onClick={() => setPasswordVisible((visible) => !visible)}
                  type="button"
                >
                  <EyeIcon visible={passwordVisible} />
                </button>
              </span>
            </label>
            {isRegister && (
              <>
                <label className="auth-field">
                  <span>Confirm password</span>
                  <span className="auth-password-wrap">
                    <input
                      autoComplete="new-password"
                      minLength={8}
                      name="confirmPassword"
                      placeholder="Type your password again"
                      required
                      type={confirmationVisible ? 'text' : 'password'}
                    />
                    <button
                      aria-label={confirmationVisible ? 'Hide confirmation password' : 'Show confirmation password'}
                      className="password-toggle"
                      onClick={() => setConfirmationVisible((visible) => !visible)}
                      type="button"
                    >
                      <EyeIcon visible={confirmationVisible} />
                    </button>
                  </span>
                </label>
                <label className="auth-terms">
                  <input name="terms" required type="checkbox" />
                  <span>I agree to be kind and keep good things going.</span>
                </label>
              </>
            )}
            {!isRegister && (
              <div className="auth-form-options">
                <label className="auth-remember">
                  <input name="remember" type="checkbox" />
                  <span>Keep me signed in</span>
                </label>
                <span className="auth-help-text">Forgot your password?</span>
              </div>
            )}
            <button className="auth-submit" type="submit">
              {isRegister ? 'Create your account' : 'Log in'} <span aria-hidden="true">↗</span>
            </button>
            {notice && (
              <p className="auth-notice" role="status">
                <span aria-hidden="true">✳</span> {notice}
              </p>
            )}
          </form>

          <p className="auth-switch">
            {isRegister ? 'Already part of the neighborhood?' : 'New around here?'}
            {' '}
            <Link to={isRegister ? '/login' : '/register'}>
              {isRegister ? 'Log in' : 'Create an account'}
            </Link>
          </p>
          <Link className="auth-back-link" to="/">← Back to the good finds</Link>
        </div>
      </section>
    </div>
  )
}
