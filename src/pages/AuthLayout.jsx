import { Link } from 'react-router-dom'
import './AuthLayout.css'

export default function AuthLayout({ children, variant = 'login' }) {
  return (
    <div className={`auth-page auth-page-${variant}`}>
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
      <section className="auth-panel">{children}</section>
    </div>
  )
}
