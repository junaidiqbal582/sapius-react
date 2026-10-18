import AuthForm from '../components/AuthForm.jsx'
import { navigate } from '../lib/router.js'

export default function HomePage({ user, mode, onModeChange, onAuth }) {
  if (user) {
    return (
      <main className="page-main panel-enter">
        <p className="eyebrow">Workspace ready</p>
        <h1 className="page-title" data-demo-id="welcome-header">
          Welcome back, {user.name}
        </h1>
        <p className="lede">
          You are signed in as {user.email}. Open your workspace to continue, or ask the
          assistant for a walkthrough.
        </p>
        <div className="cta-row">
          <button
            type="button"
            className="btn btn-primary"
            data-demo-id="btn-open-workspace"
            onClick={() => navigate('workspace')}
          >
            Open workspace
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            data-demo-id="btn-view-pricing"
            onClick={() => navigate('pricing')}
          >
            View pricing
          </button>
        </div>
      </main>
    )
  }

  return (
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
        <div className="cta-row brand-enter delay-2">
          <button
            type="button"
            className="btn btn-ghost"
            data-demo-id="btn-view-pricing"
            onClick={() => navigate('pricing')}
          >
            See pricing
          </button>
        </div>
      </section>

      <AuthForm mode={mode} onModeChange={onModeChange} onSubmit={onAuth} />
    </div>
  )
}
