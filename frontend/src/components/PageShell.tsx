import type { ReactNode } from 'react'
import { Header } from './Header'

export function PageShell({ children, active }: { children: ReactNode; active?: 'classes' | 'coaches' }) {
  return <>
    <a className="skip-link" href="#page-content" onClick={event => { event.preventDefault(); document.getElementById('page-content')?.focus() }}>Skip to content</a>
    <Header active={active} />
    <main id="page-content" tabIndex={-1}>{children}</main>
    <footer className="page-footer"><div className="page-width"><a href="#home" aria-label="FORM home"><img src="/brand/form-wordmark-light.svg" alt="FORM" width="112" height="32" /></a><p>Portfolio concept. Coaches and sessions are illustrative.<br />Bookings are not open.</p><a href="#membership">Explore memberships</a></div></footer>
  </>
}
