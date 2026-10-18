import { useEffect, useState } from 'react'

const ROUTES = {
  '/': 'home',
  '/pricing': 'pricing',
  '/workspace': 'workspace',
}

export function pathToPage(pathname) {
  return ROUTES[pathname] || 'home'
}

export function pageToPath(page) {
  if (page === 'pricing') return '/pricing'
  if (page === 'workspace') return '/workspace'
  return '/'
}

export function navigate(page) {
  const path = pageToPath(page)
  if (window.location.pathname !== path) {
    window.history.pushState({}, '', path)
  }
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function usePage() {
  const [page, setPage] = useState(() => pathToPage(window.location.pathname))

  useEffect(() => {
    function onPop() {
      setPage(pathToPage(window.location.pathname))
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return page
}
