import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

type Connection = EventTarget & { saveData?: boolean }

function useMediaActivity(ref: RefObject<HTMLDivElement | null>) {
  const [inView, setInView] = useState(false)
  const [visible, setVisible] = useState(() => !document.hidden)
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const connection = (navigator as Navigator & { connection?: Connection }).connection
  const [saveData, setSaveData] = useState(() => !!connection?.saveData)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMotion = () => setReduced(motion.matches)
    const onVisibility = () => setVisible(!document.hidden)
    const onConnection = () => setSaveData(!!connection?.saveData)
    motion.addEventListener('change', onMotion)
    document.addEventListener('visibilitychange', onVisibility)
    connection?.addEventListener('change', onConnection)
    return () => { observer.disconnect(); motion.removeEventListener('change', onMotion); document.removeEventListener('visibilitychange', onVisibility); connection?.removeEventListener('change', onConnection) }
  }, [connection, ref])
  return { active: inView && visible, automatic: !reduced && !saveData }
}

export function HeroVideo({ name }: { name: string }) {
  const container = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const { active, automatic } = useMediaActivity(container)
  const [paused, setPaused] = useState(false)
  const [optedIn, setOptedIn] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const enabled = automatic || optedIn
  useEffect(() => {
    const element = video.current
    if (!element) return
    if (active && enabled && !paused && !failed) void element.play().catch(() => { /* Browser may require the visible play control. */ })
    else element.pause()
  }, [active, enabled, paused, failed])

  return <div className="hero-video" ref={container}>
    <img className="video-poster" src={`/images/media/${name}-poster.jpg`} alt="" fetchPriority="high" />
    <video ref={video} src={enabled ? `/images/media/${name}.mp4` : undefined} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} className={ready && !failed ? 'video-ready' : ''} onLoadedData={() => setReady(true)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)} />
    <button className="media-control video-control" disabled={failed} onClick={() => {
      if (playing) { setPaused(true); video.current?.pause() }
      else { setOptedIn(true); setPaused(false); if (enabled) void video.current?.play().catch(() => {}) }
    }} aria-label={failed ? 'Background video unavailable' : playing ? 'Pause background video' : 'Play background video'}>
      <span aria-hidden="true">{playing ? 'Ⅱ' : '▷'}</span> {failed ? 'Video unavailable' : playing ? 'Pause film' : 'Play film'}
    </button>
  </div>
}

export type Slide = { src: string; alt: string }

export function PhotoCarousel({ slides, label, className = '' }: { slides: readonly Slide[]; label: string; className?: string }) {
  const container = useRef<HTMLDivElement>(null)
  const { active, automatic } = useMediaActivity(container)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [optedIn, setOptedIn] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focusPaused, setFocusPaused] = useState(false)
  const start = useRef<{ x: number; y: number } | null>(null)
  const running = (automatic || optedIn) && !paused
  useEffect(() => {
    if (!running || !active || hovered || focusPaused) return
    const timer = window.setInterval(() => setIndex(value => (value + 1) % slides.length), 6000)
    return () => window.clearInterval(timer)
  }, [active, hovered, focusPaused, running, slides.length])
  function step(direction: number) { setPaused(true); setIndex(value => (value + direction + slides.length) % slides.length) }
  return <div ref={container} className={`photo-carousel ${className}`} role="region" aria-roledescription="carousel" aria-label={label} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocusPaused(true) }} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocusPaused(false) }}>
    <div className="carousel-window" onTouchStart={event => { start.current = { x: event.touches[0].clientX, y: event.touches[0].clientY } }} onTouchEnd={event => {
      if (!start.current) return
      const dx = event.changedTouches[0].clientX - start.current.x
      const dy = event.changedTouches[0].clientY - start.current.y
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1)
      start.current = null
    }}>
      <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>{slides.map((slide, position) => <div className="carousel-slide" key={slide.src} aria-hidden={position !== index}><img src={slide.src} alt={slide.alt} loading={active ? "eager" : "lazy"} width="1400" height="950" /></div>)}</div>
    </div>
    <div className="carousel-controls"><span className="carousel-count" aria-live={running ? 'off' : 'polite'}>{String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span><div><button aria-label={`Previous photo in ${label}`} onClick={() => step(-1)}>←</button><button className="rotation-toggle" aria-label={`${running ? 'Pause' : 'Start'} photo rotation in ${label}`} onClick={() => { setOptedIn(true); setPaused(running); setFocusPaused(false); setHovered(false) }}>{running ? 'Pause' : 'Play'}</button><button aria-label={`Next photo in ${label}`} onClick={() => step(1)}>→</button></div></div>
  </div>
}
