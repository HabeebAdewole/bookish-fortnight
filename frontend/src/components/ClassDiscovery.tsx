import { useEffect, useRef, useState } from 'react'
import type { Category } from '../data/content'

const tracks = [
  { name: 'Strength', title: 'BUILD YOUR\nKIND OF STRONG.', description: 'Good technique. Real progress. Get comfortable with the weights, one rep at a time.', detail: 'Small groups · 50 minutes', tone: 'orange', type: 'strength' },
  { name: 'Conditioning', title: 'GOOD SWEAT.\nGREAT ENERGY.', description: 'Find your second wind with full-body circuits, a good playlist, and your people.', detail: 'All levels · 45 minutes', tone: 'blue', type: 'conditioning' },
  { name: 'Mobility', title: 'LESS TENSION.\nMORE YOU.', description: 'Stretch out the week. Make room to move a little easier and breathe a little deeper.', detail: 'Easy pace · 40 minutes', tone: 'yellow', type: 'mobility' },
] as const

function MovementGraphic({ type }: { type: string }) {
  return (
    <svg viewBox="0 0 320 160" fill="none" className="movement-graphic" aria-hidden="true">
      {type === 'strength' ? <g stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" transform="rotate(-14 160 80)"><path d="M100 80H220" /><rect x="68" y="34" width="33" height="92" rx="8" /><rect x="219" y="34" width="33" height="92" rx="8" /><path d="M48 61V99M272 61V99" /><path d="M129 23L135 10M185 143L191 130" strokeWidth="5" /></g> : type === 'conditioning' ? <g stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"><path d="M175 14L116 83H163L144 146L211 68H166Z" fill="currentColor" /><path d="M77 40H119M55 74H93M72 110H111M228 43H255M224 113H271" strokeWidth="5" /></g> : <g stroke="currentColor" strokeWidth="8" strokeLinecap="round"><path d="M76 126C54 88 83 31 129 36C170 40 176 126 218 126C254 126 270 68 241 43C210 14 179 46 160 80C141 116 110 152 76 126Z" /><path d="M72 22L65 9M256 135L263 148M43 77H25M280 77H299" strokeWidth="5" /></g>}
    </svg>
  )
}

export function ClassDiscovery({ onSelectCategory }: { onSelectCategory: (category: Category) => void }) {
  const rail = useRef<HTMLDivElement>(null)
  const [edges, setEdges] = useState({ start: true, end: false })
  const updateEdges = () => {
    const node = rail.current
    if (node) setEdges({ start: node.scrollLeft <= 5, end: node.scrollLeft + node.clientWidth >= node.scrollWidth - 5 })
  }
  useEffect(() => {
    const node = rail.current
    if (!node) return
    const observer = new ResizeObserver(updateEdges)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  const move = (direction: number) => {
    const node = rail.current
    if (!node) return
    const card = node.firstElementChild as HTMLElement | null
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    node.scrollBy({ left: direction * ((card?.offsetWidth ?? node.clientWidth) + 24), behavior: reduced ? 'instant' : 'smooth' })
  }
  return (
    <section id="classes" className="discovery-section section-space" aria-labelledby="discovery-title">
      <div className="page-width">
        <div className="section-intro"><div><span className="section-kicker">Find what moves you</span><h2 id="discovery-title">MORE THAN<br />ONE WAY TO MOVE.</h2></div><div className="discovery-side"><p>Lift a little. Sweat a lot. Slow it down.<br />There’s a class for your kind of day.</p><div className="rail-controls"><button aria-label="Previous class category" aria-controls="class-category-rail" disabled={edges.start} onClick={() => move(-1)}>←</button><button aria-label="Next class category" aria-controls="class-category-rail" disabled={edges.end} onClick={() => move(1)}>→</button></div></div></div>
        <div className="class-rail" id="class-category-rail" ref={rail} onScroll={updateEdges} role="region" aria-label="Class categories" tabIndex={0} onKeyDown={(event) => { if (event.target === event.currentTarget && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1) } }}>
          {tracks.map((track) => <article className={`discovery-card card-${track.tone}`} key={track.name}><div className="card-top"><span>{track.name}</span><span className="card-dot" aria-hidden="true" /></div><MovementGraphic type={track.type} /><h3>{track.title.split('\n').map(line => <span key={line}>{line}</span>)}</h3><p>{track.description}</p><div className="card-bottom"><span>{track.detail}</span><a href="#schedule" onClick={() => onSelectCategory(track.name)} aria-label={`See the sample schedule for ${track.name}`}>View schedule <span aria-hidden="true">↗</span></a></div></article>)}
        </div>
      </div>
    </section>
  )
}
