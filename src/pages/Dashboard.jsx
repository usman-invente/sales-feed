import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { logoutSession } from '../services/authService'
import './Dashboard.css'

export default function Dashboard() {
  const { user, logoutUser } = useAuth()
  const navigate = useNavigate()
  const [notice, setNotice] = useState('')
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const displayName =
    user?.name || user?.username || user?.email?.split('@')[0] || 'neighbor'

  async function handleLogout() {
    setIsLoggingOut(true)
    setNotice('')

    try {
      await logoutSession()
      logoutUser()
      navigate('/login', { replace: true })
    } catch (error) {
      setNotice(error.message || 'Unable to log out. Please try again.')
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="dashboard-page">
      <section className="dashboard-welcome">
        <span className="eyebrow">
          <span className="eyebrow-sparkle" aria-hidden="true">✳</span>
          YOUR GOODKIND CORNER
        </span>
        <h1>Welcome back,<br /><em>{displayName}.</em></h1>
        <p>
          Good things are waiting to be found. Take a look around your
          neighborhood or share something lovely of your own.
        </p>
        <div className="dashboard-actions">
          <Link className="dashboard-primary-link" to="/">
            Explore the feed <span aria-hidden="true">↗</span>
          </Link>
          <button
            className="dashboard-logout"
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? 'Logging out…' : 'Log out'}
          </button>
        </div>
        {notice && <p className="dashboard-notice" role="alert">{notice}</p>}
      </section>

      <section className="dashboard-content" aria-labelledby="dashboard-title">
        <div className="dashboard-heading">
          <div>
            <span className="eyebrow">A LITTLE MORE GOOD</span>
            <h2 id="dashboard-title">Your next good thing starts here.</h2>
          </div>
          <span className="dashboard-flower" aria-hidden="true">✳</span>
        </div>

        <div className="dashboard-card-grid">
          <article className="dashboard-card">
            <span className="dashboard-card-symbol" aria-hidden="true">⌕</span>
            <h3>Find a new favorite</h3>
            <p>Browse thoughtful finds shared by people nearby.</p>
            <Link to="/">Explore good finds <span aria-hidden="true">↗</span></Link>
          </article>
          <article className="dashboard-card">
            <span className="dashboard-card-symbol" aria-hidden="true">♡</span>
            <h3>Need a hand?</h3>
            <p>Get in touch with us and we’ll be happy to help.</p>
            <Link to="/contact">Contact Goodkind <span aria-hidden="true">↗</span></Link>
          </article>
        </div>

        {user?.email && (
          <p className="dashboard-account">
            Signed in as <strong>{user.email}</strong>
          </p>
        )}
      </section>
    </div>
  )
}
