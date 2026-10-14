import { useState } from 'react'
import AuthForm from './components/AuthForm.jsx'
import { clearSession, persistSession, readSession } from './lib/auth.js'
import './App.css'

export default function App() {
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

  if (user) {
    return (
      <div className="shell">
        <div className="atmosphere" aria-hidden="true" />
        <main className="welcome panel-enter">
          <p className="brand-mark">Sapius</p>
          <h1>Welcome back, {user.name}</h1>
          <p className="lede">You are signed in as {user.email}</p>
          <button type="button" className="btn btn-ghost" onClick={handleSignOut}>
            Sign out
          </button>
        </main>
      </div>
    )
  }

  return (
    <div className="shell">
      <div className="atmosphere" aria-hidden="true" />
      <div className="layout">
        <section className="brand-pane">
          <p className="brand-mark brand-enter">Sapius</p>
          <h1 className="headline brand-enter delay-1">
            Think clearly.
            <span>Decide wisely.</span>
          </h1>
          <p className="lede brand-enter delay-2">
            A calm space to sign in and pick up where your ideas left off.
          </p>
        </section>

        <AuthForm mode={mode} onModeChange={setMode} onSubmit={handleAuth} />
      </div>
    </div>
  )
}
