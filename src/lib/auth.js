import { getCookie, removeCookie, setCookie } from './cookies.js'

/** Same cookie names as demo_site so the embed script can read the signed-in email. */
export const ACCESS_TOKEN_COOKIE = 'thisisjustarandomstring'
export const USER_COOKIE = 'sapius_demo_user'

const HOST_LOCAL_KEYS = [
  'sapius_widget_view',
  'sapius_walkthrough',
  'sapius_embed_auto_open_onboarding',
]

const HOST_SESSION_KEYS = [
  'sapius_pending_link_email',
  'sapius_pending_auto_open_onboarding',
  'sapius_auto_open_after_link_reload',
]

export function readSession() {
  const tokenRaw = getCookie(ACCESS_TOKEN_COOKIE)
  if (!tokenRaw) return null
  try {
    if (!JSON.parse(tokenRaw)) return null
  } catch {
    return null
  }

  const userRaw = getCookie(USER_COOKIE)
  if (!userRaw) return null
  try {
    const user = JSON.parse(userRaw)
    if (!user || typeof user.email !== 'string' || !user.email) return null
    return {
      email: user.email.trim().toLowerCase(),
      name: user.name || user.email.split('@')[0],
    }
  } catch {
    return null
  }
}

export function persistSession({ name, email }) {
  const normalizedEmail = email.trim().toLowerCase()
  const user = {
    email: normalizedEmail,
    name: (name || normalizedEmail.split('@')[0]).trim(),
  }
  setCookie(USER_COOKIE, JSON.stringify(user))
  setCookie(ACCESS_TOKEN_COOKIE, JSON.stringify('mock-access-token'))
  try {
    sessionStorage.removeItem('sapius_pending_link_email')
  } catch {
    // ignore
  }
}

function clearHostWidgetState() {
  for (const key of HOST_LOCAL_KEYS) {
    try {
      localStorage.removeItem(key)
    } catch {
      // ignore
    }
  }
  for (const key of HOST_SESSION_KEYS) {
    try {
      sessionStorage.removeItem(key)
    } catch {
      // ignore
    }
  }
}

export function clearSession() {
  removeCookie(ACCESS_TOKEN_COOKIE)
  removeCookie(USER_COOKIE)
  clearHostWidgetState()
}
