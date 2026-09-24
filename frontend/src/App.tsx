import { useEffect, useSyncExternalStore } from 'react'
import { usePageMotion } from './hooks/usePageMotion'
import Home from './pages/Home'
import { MembershipPage } from './pages/MembershipPage'
import { SchedulePage } from './pages/SchedulePage'
import { CoachesPage, CoachProfile } from './pages/CoachesPage'
import { PageShell } from './components/PageShell'
import { trainers } from './data/content'

function subscribe(callback: () => void) {
  window.addEventListener('hashchange', callback)
  return () => window.removeEventListener('hashchange', callback)
}

export default function App() {
  const hash = useSyncExternalStore(subscribe, () => window.location.hash, () => '')
  const [path, query = ''] = hash.startsWith('#/') ? hash.slice(1).split('?') : ['/', '']
  usePageMotion(path)
  const coach = trainers.find(item => path === `/coaches/${item.id}`)
  const title = path === '/membership' ? 'Membership' : path === '/classes' ? 'Class schedule' : path === '/coaches' ? 'Coaching team' : coach?.name ?? (path === '/' ? 'Find your form.' : 'Page not found')

  useEffect(() => {
    document.title = `FORM — ${title}`
    if (path !== '/') {
      window.scrollTo({ top: 0, behavior: 'instant' })
      document.querySelector<HTMLElement>('h1')?.focus({ preventScroll: true })
    }
  }, [path, title])

  useEffect(() => {
    if (path !== '/') return
    const target = document.getElementById(hash.slice(1) || 'home')
    target?.scrollIntoView({ behavior: 'instant' })
  }, [hash, path])

  if (path === '/') return <Home />
  if (path === '/membership') return <PageShell active="membership"><MembershipPage /></PageShell>
  if (path === '/classes') return <PageShell active="classes"><SchedulePage query={query} /></PageShell>
  if (path === '/coaches') return <PageShell active="coaches"><CoachesPage /></PageShell>
  if (coach) return <PageShell active="coaches"><CoachProfile coach={coach} /></PageShell>
  return <PageShell><section className="page-width section-space not-found"><p>Page not found</p><h1 tabIndex={-1}>LET’S GET YOU<br />BACK ON TRACK.</h1><a className="button button-dark" href="#/classes">Explore the schedule</a><a className="text-link" href="#home">Return to FORM</a></section></PageShell>
}
