import { useState } from 'react'
import { navigate } from '../lib/router.js'

const PROJECTS = [
  { id: 'website-redesign', name: 'Website Redesign', status: 'Active', tasks: 24 },
  { id: 'mobile-app', name: 'Mobile App v2', status: 'Active', tasks: 18 },
  { id: 'api-integration', name: 'API Integration', status: 'Review', tasks: 9 },
]

export default function WorkspacePage({ user }) {
  const [projects, setProjects] = useState(PROJECTS)
  const [showForm, setShowForm] = useState(false)
  const [projectName, setProjectName] = useState('')

  if (!user) {
    return (
      <main className="page-main panel-enter">
        <p className="eyebrow">Workspace</p>
        <h1 className="page-title" data-demo-id="workspace-gate-title">
          Sign in to open your workspace
        </h1>
        <p className="lede">
          The assistant switches to onboarding mode once you are authenticated.
        </p>
        <div className="cta-row">
          <button
            type="button"
            className="btn btn-primary"
            data-demo-id="btn-workspace-sign-in"
            onClick={() => navigate('home')}
          >
            Go to sign in
          </button>
        </div>
      </main>
    )
  }

  function addProject() {
    const name = projectName.trim()
    if (!name) return
    const id = name.toLowerCase().replace(/\s+/g, '-')
    setProjects((prev) => [{ id, name, status: 'Active', tasks: 0 }, ...prev])
    setProjectName('')
    setShowForm(false)
  }

  return (
    <main className="page-main panel-enter">
      <div className="page-header">
        <div>
          <p className="eyebrow">Workspace</p>
          <h1 className="page-title" data-demo-id="welcome-header">
            Welcome back, {user.name}
          </h1>
          <p className="lede tight">Here is what is moving across your projects.</p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          data-demo-id="create-project"
          onClick={() => setShowForm((v) => !v)}
        >
          Create project
        </button>
      </div>

      {showForm && (
        <div className="inline-form" data-demo-id="add-project-form">
          <label className="field">
            <span>Project name</span>
            <input
              type="text"
              data-demo-id="input-project-name"
              placeholder="Q2 launch plan"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </label>
          <button
            type="button"
            className="btn btn-primary"
            data-demo-id="btn-save-project"
            onClick={addProject}
          >
            Save
          </button>
        </div>
      )}

      <div className="stat-row">
        <article className="stat-card" data-demo-id="stat-active-projects">
          <p className="stat-label">Active projects</p>
          <p className="stat-value">{projects.filter((p) => p.status === 'Active').length}</p>
        </article>
        <article className="stat-card" data-demo-id="stat-open-tasks">
          <p className="stat-label">Open tasks</p>
          <p className="stat-value">{projects.reduce((sum, p) => sum + p.tasks, 0)}</p>
        </article>
        <article className="stat-card" data-demo-id="stat-team">
          <p className="stat-label">Team</p>
          <p className="stat-value">8</p>
        </article>
      </div>

      <section className="list-panel" data-demo-id="recent-projects">
        <h2>Recent projects</h2>
        <ul className="project-list">
          {projects.map((project) => (
            <li key={project.id}>
              <button
                type="button"
                className="project-row"
                data-demo-id={`project-row-${project.id}`}
                onClick={() => setShowForm(false)}
              >
                <span className="project-name">{project.name}</span>
                <span className="project-meta">{project.status}</span>
                <span className="project-meta">{project.tasks} tasks</span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
