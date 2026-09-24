import { useState } from 'react'

const links = [
  { href: '#classes', label: 'Classes' },
  { href: '#trainers', label: 'Coaching' },
  { href: '#club', label: 'The club' },
  { href: '#membership', label: 'Membership' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="header-inner page-width">
      <a href="#home" aria-label="FORM home" onClick={() => setMenuOpen(false)}>
        <img className="header-logo" src="/brand/form-wordmark-light.svg" alt="FORM" width="464" height="132" />
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
      </nav>
      <a className="button button-orange header-action" href="#classes">Explore classes <span aria-hidden="true">↗</span></a>
      <button
        className="menu-toggle"
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen(!menuOpen)}
        onKeyDown={(event) => { if (event.key === 'Escape') setMenuOpen(false) }}
      >
        {menuOpen ? 'Close menu' : 'Menu'}
        <span aria-hidden="true">{menuOpen ? '−' : '+'}</span>
      </button>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Mobile navigation"
        hidden={!menuOpen}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setMenuOpen(false)
            document.querySelector<HTMLButtonElement>('.menu-toggle')?.focus()
          }
        }}
      >
        {links.map((link) => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>)}
      </nav>
      </div>
    </header>
  )
}
