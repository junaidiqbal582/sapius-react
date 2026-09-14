import { useState } from 'react'
import AuthForm from './components/AuthForm.jsx'
import './App.css'

export default function App() {
  const [mode, setMode] = useState('signin')
  const [user, setUser] = useState(null)

  function handleAuth(data) {
    setUser({
      name: data.name || data.email.split('@')[0],
      email: data.email,
    })
  }

  function handleSignOut() {
    setUser(null)
    setMode('signin')
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
