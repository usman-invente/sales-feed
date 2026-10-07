import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from './AuthLayout'
import PasswordInput from './PasswordInput'
import { loginUser } from '../services/authService'


export default function Login() {
  const [notice, setNotice] = useState('')

  const INITIAL_FORM_STATE = {
    email: '',
    password: '',
  }

  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  // 2. Universal change handler for inputs

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }



  async function handleSubmit(event) {
    event.preventDefault()
    
    const payload = {
      email: formData.email,
      password: formData.password,
    }

    setNotice('Logging in...')

    // 3. API Call
    await loginUser(payload);

    // 4. State Reset & Success Message
    setFormData(INITIAL_FORM_STATE);
    setNotice('Login successful! Redirecting...');

    
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
              onChange={handleChange}
              value={formData.email}
            />
          </label>
          <PasswordInput
            autoComplete="current-password"
            label="Password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            value={formData.password}
          />
         
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
