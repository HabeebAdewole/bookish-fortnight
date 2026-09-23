import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

export function HeroMotion({ children }: { children: ReactNode }) {
  const element = useRef<HTMLElement>(null)
  useEffect(() => {
    const target = element.current
    if (!target) return
    const allowed = window.matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)')
    let frame = 0
    const update = () => {
      frame = 0
      const progress = allowed.matches ? Math.min(1, Math.max(0, -target.getBoundingClientRect().top / 700)) : 0
      target.style.setProperty('--hero-progress', String(progress))
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    allowed.addEventListener('change', schedule)
    schedule()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      allowed.removeEventListener('change', schedule)
    }
  }, [])
  return <section ref={element} className="hero" aria-labelledby="hero-title">{children}</section>
}

export function SessionGuide() {
  const section = useRef<HTMLElement>(null)
  useEffect(() => {
    const target = section.current
    if (!target) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        target.classList.add('is-visible')
        observer.disconnect()
      }
    }, { threshold: 0.2 })
    observer.observe(target)
    return () => observer.disconnect()
  }, [])
  return (
    <section className="session-section" ref={section} id="first-session" aria-labelledby="session-title">
      <div className="page-width section-space">
        <div className="section-intro"><h2 id="session-title">FIRST TIME?<br />YOU’RE OUR KIND.</h2><p>No perfect starting point needed.<br />Here’s what a session at FORM looks like.</p></div>
        <ol className="session-steps">
          <li><span className="step-number">01</span><h3>Find your thing.</h3><p>Strength, a sweaty circuit, or a slower stretch. Start with what feels right.</p><a className="text-link" href="#classes">Explore the classes</a></li>
          <li><span className="step-number">02</span><h3>Meet your people.</h3><p>Your coach walks you through the session. Ask questions. We all started somewhere.</p><a className="text-link" href="#trainers">Meet the coaches</a></li>
          <li><span className="step-number">03</span><h3>Make it your own.</h3><p>Move at your pace, take the breaks you need, and leave with a little more energy.</p><span className="step-signoff">Progress looks different on everyone.</span></li>
        </ol>
      </div>
    </section>
  )
}
