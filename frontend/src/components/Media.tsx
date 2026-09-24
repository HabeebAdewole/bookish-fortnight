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

export function HeroVideo({ name, source, poster }: { name: string; source?: string; poster?: string }) {
  const container = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const { active, automatic } = useMediaActivity(container)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    const element = video.current
    if (!element) return
    if (active && automatic && !failed) void element.play().catch(() => { /* Keep the poster if autoplay is blocked. */ })
    else element.pause()
  }, [active, automatic, failed])

  return <div className="hero-video" ref={container}>
    <img className="video-poster" src={poster ?? `/images/media/${name}-poster.jpg`} alt="" fetchPriority={name === 'club' ? 'auto' : 'high'} loading={name === 'club' ? 'lazy' : 'eager'} />
    <video ref={video} src={automatic ? source ?? `/images/media/${name}.mp4` : undefined} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} className={ready && !failed ? 'video-ready' : ''} onPlaying={() => setReady(true)} onError={() => setFailed(true)} />
  </div>
}

export type Slide = { src: string; alt: string }

export function PhotoCarousel({ slides, label, className = '' }: { slides: readonly Slide[]; label: string; className?: string }) {
  const container = useRef<HTMLDivElement>(null)
  const { active, automatic } = useMediaActivity(container)
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (!automatic || !active) return
    const timer = window.setInterval(() => setIndex(value => (value + 1) % slides.length), 6000)
    return () => window.clearInterval(timer)
  }, [active, automatic, slides.length])
  return <div ref={container} className={`photo-carousel ${className}`} role="region" aria-roledescription="carousel" aria-label={label}>
    <div className="carousel-window">
      <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>{slides.map((slide, position) => <div className="carousel-slide" key={slide.src} aria-hidden={position !== index}><img src={slide.src} alt={slide.alt} loading={active ? 'eager' : 'lazy'} width="1400" height="950" /></div>)}</div>
    </div>
  </div>
}
