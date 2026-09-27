import type { ReactNode } from 'react'
import { Header } from './Header'

export function PageShell({ children, active }: { children: ReactNode; active?: 'classes' | 'coaches' | 'membership' | 'about' | 'contact' | 'login' }) {
  return <>
    <a className="skip-link" href="#page-content" onClick={event => { event.preventDefault(); document.getElementById('page-content')?.focus() }}>Skip to content</a>
    <Header active={active} />
    <main id="page-content" tabIndex={-1}>{children}</main>
    <footer className="page-footer"><div className="page-width"><a href="#home" aria-label="FORM home"><img src="/brand/form-wordmark-light.svg" alt="FORM" width="112" height="32" /></a><p>Portfolio concept. Coaches and sessions are illustrative.<br />Bookings are not open.</p><nav aria-label="Footer navigation"><a href="#/about">The club</a><a href="#/contact">Contact</a><a href="#/membership">Membership</a><a href="#/login">Log in</a></nav></div></footer>
  </>
}
