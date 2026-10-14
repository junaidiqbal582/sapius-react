const DEFAULT_MAX_AGE = 60 * 60 * 24 * 7

export function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length !== 2) return undefined
  const raw = parts.pop().split(';').shift()
  if (!raw) return undefined
  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}

export function setCookie(name, value, maxAge = DEFAULT_MAX_AGE) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}`
}

export function removeCookie(name) {
  document.cookie = `${name}=; path=/; max-age=0`
}
