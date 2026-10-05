import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from './AuthLayout'
import PasswordInput from './PasswordInput'

export default function Login() {
  const [notice, setNotice] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setNotice(
      'Your form is ready, but sign-in isn’t connected yet. Please check back soon.',
    )
  }

  return (
    <AuthLayout>
      <div className="auth-form-wrap">
        <span className="auth-kicker auth-panel-kicker">WELCOME BACK</span>
        <h1>Good to<br /><em>see you.</em></h1>
        <p className="auth-intro">
          Your next good find is right where you left it.
        </p>
        <form className="auth-form" onSubmit={handleSubmit}>
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
          <PasswordInput
            autoComplete="current-password"
            label="Password"
            name="password"
            placeholder="Enter your password"
          />
          <div className="auth-form-options">
            <label className="auth-remember">
              <input name="remember" type="checkbox" />
              <span>Keep me signed in</span>
            </label>
            <span className="auth-help-text">Forgot your password?</span>
          </div>
          <button className="auth-submit" type="submit">
            Log in <span aria-hidden="true">↗</span>
          </button>
          {notice && (
            <p className="auth-notice" role="status">
              <span aria-hidden="true">✳</span> {notice}
            </p>
          )}
        </form>
        <p className="auth-switch">
          New around here? <Link to="/register">Create an account</Link>
        </p>
        <Link className="auth-back-link" to="/">← Back to the good finds</Link>
      </div>
    </AuthLayout>
  )
}
