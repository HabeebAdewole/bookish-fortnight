import { useEffect } from 'react'

/** Progressive enhancement: never hide page content behind animation classes. */
export function usePageMotion(path: string) {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let observer: IntersectionObserver | undefined
    let animations: Animation[] = []
    function stop() {
      observer?.disconnect()
      animations.forEach(animation => animation.cancel())
      animations = []
    }
    function start() {
      stop()
      if (preference.matches) return
      const hero = document.querySelector('.hero-content, .film-banner > .page-width, .coaches-intro, .profile-heading')
      if (hero) {
        const parts = Array.from(hero.querySelectorAll('h1, p, .hero-actions, .button, small')).filter(element => !element.closest('.hero-actions') || element.classList.contains('hero-actions'))
        parts.forEach((element, index) => {
          animations.push(element.animate([{ opacity: 0, transform: 'translateY(22px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 700, delay: Math.min(index * 90, 360), easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' }))
        })
      }
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          observer?.unobserve(entry.target)
          animations.push(entry.target.animate([{ opacity: 0.45, clipPath: 'inset(6% 0 0 0)' }, { opacity: 1, clipPath: 'inset(0% 0 0 0)' }], { duration: 850, easing: 'cubic-bezier(.2,.7,.2,1)' }))
        })
      }, { threshold: 0.15 })
      document.querySelectorAll('.format-image, .coach-card-image, .photo-carousel, .coaching-image, .club-inline-film').forEach(element => observer?.observe(element))
    }
    start()
    preference.addEventListener('change', start)
    return () => { stop(); preference.removeEventListener('change', start) }
  }, [path])
}
