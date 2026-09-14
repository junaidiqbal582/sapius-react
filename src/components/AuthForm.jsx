import { useState } from 'react'

export default function AuthForm({ mode, onModeChange, onSubmit }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const isSignUp = mode === 'signup'

  function resetFields() {
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setError('')
    setShowPassword(false)
  }

  function switchMode(next) {
    resetFields()
    onModeChange(next)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter a valid email address.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (isSignUp) {
      if (!name.trim()) {
        setError('Please enter your name.')
        return
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.')
        return
      }
    }

    onSubmit({
      name: name.trim(),
      email: email.trim(),
      password,
    })
  }

  return (
    <section className={`auth-pane form-enter ${isSignUp ? 'is-signup' : ''}`} aria-labelledby="auth-title">
      <div className="auth-tabs" role="tablist" aria-label="Authentication mode">
        <button
          type="button"
          role="tab"
          aria-selected={!isSignUp}
          className={!isSignUp ? 'tab active' : 'tab'}
          onClick={() => switchMode('signin')}
        >
          Sign in
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={isSignUp}
          className={isSignUp ? 'tab active' : 'tab'}
          onClick={() => switchMode('signup')}
        >
          Sign up
        </button>
      </div>

      <h2 id="auth-title">{isSignUp ? 'Create your account' : 'Welcome back'}</h2>
      <p className="auth-sub">
        {isSignUp
          ? 'Join Sapius and start organizing your thinking.'
          : 'Sign in to continue to your workspace.'}
      </p>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {isSignUp && (
          <label className="field">
            <span>Full name</span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Alex Morgan"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        )}

        <label className="field">
          <span>Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="field">
          <span>Password</span>
          <div className="password-row">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-visibility"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </label>

        {isSignUp && (
          <label className="field">
            <span>Confirm password</span>
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              autoComplete="new-password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
        )}

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="btn btn-primary">
          {isSignUp ? 'Create account' : 'Sign in'}
        </button>
      </form>

      <p className="switch-line">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          type="button"
          className="text-link"
          onClick={() => switchMode(isSignUp ? 'signin' : 'signup')}
        >
          {isSignUp ? 'Sign in' : 'Sign up'}
        </button>
      </p>
    </section>
  )
}
