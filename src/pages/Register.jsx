import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from './AuthLayout'
import PasswordInput from './PasswordInput'
import './Register.css'

export default function Register() {
  const [notice, setNotice] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    if (formData.get('password') !== formData.get('confirmPassword')) {
      setNotice('Those passwords don’t match yet. Give it another try.')
      return
    }

    setNotice(
      'Your form is ready, but account creation isn’t connected yet. Please check back soon.',
    )
  }

  return (
    <AuthLayout variant="register">
      <div className="auth-form-wrap">
        <span className="auth-kicker auth-panel-kicker">COME ON IN</span>
        <h1>Make yourself<br /><em>at home.</em></h1>
        <p className="auth-intro">
          Create an account and find your next favorite thing.
        </p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span>Your name</span>
            <input
              autoComplete="name"
              name="name"
              placeholder="What should we call you?"
              required
            />
          </label>
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
            autoComplete="new-password"
            label="Password"
            name="password"
            placeholder="At least 8 characters"
          />
          <PasswordInput
            autoComplete="new-password"
            label="Confirm password"
            name="confirmPassword"
            placeholder="Type your password again"
          />
          <label className="auth-terms">
            <input name="terms" required type="checkbox" />
            <span>I agree to be kind and keep good things going.</span>
          </label>
          <button className="auth-submit" type="submit">
            Create your account <span aria-hidden="true">↗</span>
          </button>
          {notice && (
            <p className="auth-notice" role="status">
              <span aria-hidden="true">✳</span> {notice}
            </p>
          )}
        </form>
        <p className="auth-switch">
          Already part of the neighborhood? <Link to="/login">Log in</Link>
        </p>
        <Link className="auth-back-link" to="/">← Back to the good finds</Link>
      </div>
    </AuthLayout>
  )
}
