import { Outlet, NavLink } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <NavLink className="brand" to="/" aria-label="Goodkind home">
          <span className="brand-mark">g<span>.</span></span>
          <span>goodkind</span>
        </NavLink>
        <nav className="site-nav" aria-label="Main navigation">
          <NavLink to="/" end>Discover</NavLink>
          <NavLink to="/about">Our story</NavLink>
        </nav>
        <div className="header-actions">
          <a className="saved-link" href="/#the-feed">Saved</a>
          <a className="sell-button" href="mailto:hello@goodkind.market">
            <span aria-hidden="true">＋</span> Sell a good thing
          </a>
        </div>
      </header>
      <main className="site-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <NavLink className="footer-brand" to="/">goodkind<span>.</span></NavLink>
        <p>A little more good in the everyday.</p>
        <span>Made for second chances <span aria-hidden="true">♡</span></span>
      </footer>
    </div>
  );
}