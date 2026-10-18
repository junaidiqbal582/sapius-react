import { useState } from 'react'
import SiteNav from './components/SiteNav.jsx'
import HomePage from './pages/HomePage.jsx'
import PricingPage from './pages/PricingPage.jsx'
import WorkspacePage from './pages/WorkspacePage.jsx'
import { clearSession, persistSession, readSession } from './lib/auth.js'
import { usePage } from './lib/router.js'
import './App.css'

export default function App() {
  const page = usePage()
  const [mode, setMode] = useState('signin')
  const [user, setUser] = useState(() => readSession())

  function handleAuth(data) {
    persistSession({
      name: data.name || data.email.split('@')[0],
      email: data.email,
    })
    // Full reload so index.html boots the widget in onboarding mode with this email.
    window.location.reload()
  }

  function handleSignOut() {
    const sapius = window.Sapius
    if (sapius && typeof sapius.signOut === 'function') {
      sapius.signOut()
    }
    clearSession()
    setUser(null)
    setMode('signin')
    // Full reload so the embed script switches back to anonymous demo mode.
    window.location.reload()
  }

  return (
    <div className="shell">
      <div className="atmosphere" aria-hidden="true" />
      <div className="shell-content">
        <SiteNav page={page} user={user} onSignOut={handleSignOut} />
        {page === 'pricing' && <PricingPage user={user} />}
        {page === 'workspace' && <WorkspacePage user={user} />}
        {page === 'home' && (
          <HomePage
            user={user}
            mode={mode}
            onModeChange={setMode}
            onAuth={handleAuth}
          />
        )}
      </div>
    </div>
  )
}
