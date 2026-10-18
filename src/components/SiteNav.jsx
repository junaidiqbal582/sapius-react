import { navigate } from '../lib/router.js'

const LINKS = [
  { page: 'home', label: 'Home' },
  { page: 'pricing', label: 'Pricing' },
  { page: 'workspace', label: 'Workspace' },
]

export default function SiteNav({ page, user, onSignOut }) {
  return (
    <header className="site-nav">
      <button
        type="button"
        className="nav-brand"
        data-demo-id="nav-brand"
        onClick={() => navigate('home')}
      >
        Sapius
      </button>

      <nav className="nav-links" aria-label="Primary">
        {LINKS.map((link) => (
          <button
            key={link.page}
            type="button"
            className={page === link.page ? 'nav-link active' : 'nav-link'}
            data-demo-id={`nav-${link.page}`}
            aria-current={page === link.page ? 'page' : undefined}
            onClick={() => navigate(link.page)}
          >
            {link.label}
          </button>
        ))}
      </nav>

      <div className="nav-actions">
        {user ? (
          <>
            <span className="nav-user" title={user.email}>
              {user.name}
            </span>
            <button
              type="button"
              className="btn btn-ghost btn-compact"
              data-demo-id="nav-sign-out"
              onClick={onSignOut}
            >
              Sign out
            </button>
          </>
        ) : (
          <button
            type="button"
            className="btn btn-primary btn-compact"
            data-demo-id="nav-sign-in"
            onClick={() => navigate('home')}
          >
            Sign in
          </button>
        )}
      </div>
    </header>
  )
}
