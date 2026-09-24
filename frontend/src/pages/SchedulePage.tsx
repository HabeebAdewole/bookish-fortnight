import { useEffect, useRef, useState } from 'react'
import { HeroVideo, PhotoCarousel } from '../components/Media'
import { galleries } from '../data/media'
import { categories, days, trainers, weeklyClasses } from '../data/content'
import type { ClassPreview } from '../data/content'

function ClassDetails({ session, onClose }: { session: ClassPreview | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (session) dialog.current?.showModal()
    else dialog.current?.close()
  }, [session])
  const coach = trainers.find(item => item.id === session?.coachId)
  return <dialog ref={dialog} className="class-dialog" aria-labelledby="detail-title" onClose={onClose} onClick={event => {
    if (event.target === event.currentTarget) {
      const box = event.currentTarget.getBoundingClientRect()
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) event.currentTarget.close()
    }
  }}>
    {session && coach && <>
      <div className="dialog-top"><span>{session.category} / {session.level}</span><button autoFocus className="dialog-close" onClick={() => dialog.current?.close()} aria-label="Close class details">×</button></div>
      <h2 id="detail-title">{session.name}</h2>
      <p className="detail-summary">{session.description}</p>
      <dl className="class-facts"><div><dt>When</dt><dd>{session.day}, {session.time}</dd></div><div><dt>Duration</dt><dd>{session.duration} minutes</dd></div><div><dt>Space</dt><dd>{session.location}</dd></div><div><dt>Equipment</dt><dd>{session.equipment}</dd></div></dl>
      <h3>What to expect</h3><p>{coach.session}</p>
      <a className="detail-coach" href={`#/coaches/${coach.id}`}><span>Your coach<strong>{coach.name}</strong></span><span aria-hidden="true">↗</span></a>
      <p className="detail-note">This is a sample session. Online booking is not available yet.</p>
    </>}
  </dialog>
}

export function SchedulePage({ query }: { query: string }) {
  const params = new URLSearchParams(query)
  const day = days.find(value => value === params.get('day')) ?? 'All week'
  const category = categories.find(value => value === params.get('category')) ?? 'All classes'
  const coachId = trainers.find(value => value.id === params.get('coach'))?.id ?? ''
  const [selected, setSelected] = useState<ClassPreview | null>(null)
  const matches = weeklyClasses.filter(item => (category === 'All classes' || item.category === category) && (!coachId || item.coachId === coachId))
  const visible = matches.filter(item => day === 'All week' || item.day === day)
  const filtered = day !== 'All week' || category !== 'All classes' || !!coachId

  function updateFilter(key: string, value: string) {
    const next = new URLSearchParams()
    if (day !== 'All week') next.set('day', day)
    if (category !== 'All classes') next.set('category', category)
    if (coachId) next.set('coach', coachId)
    if (value && value !== 'All week' && value !== 'All classes') next.set(key, value)
    else next.delete(key)
    window.location.assign(`#/classes${next.size ? `?${next}` : ''}`)
  }

  return <>
    <section className="schedule-banner film-banner"><HeroVideo name="schedule" />
      <div className="page-width"><p>Classes at FORM</p><h1 tabIndex={-1}>MAKE TIME<br />TO TRAIN.</h1><p>Find your session. Build your week around it.</p></div>
      
    </section>
    <section className="weekly-schedule page-width" aria-labelledby="schedule-heading">
      <div className="weekly-heading"><div><h2 id="schedule-heading">Your training week</h2><p>A sample recurring timetable · All times WAT (UTC+1)</p></div><span className="sample-badge">Explore only · Booking coming later</span></div>
      <div className="schedule-controls"><div className="class-filters" role="group" aria-label="Discipline">{categories.map(item => <button key={item} className="filter-button" aria-pressed={item === category} onClick={() => updateFilter('category', item)}>{item}</button>)}</div><label className="coach-select">Coach<select aria-label="Coach" value={coachId} onChange={event => updateFilter('coach', event.target.value)}><option value="">All coaches</option>{trainers.map(coach => <option value={coach.id} key={coach.id}>{coach.name}</option>)}</select></label></div>
      <div className="day-selector" role="group" aria-label="Day of the week">{['All week', ...days].map(item => <button key={item} aria-pressed={day === item} onClick={() => updateFilter('day', item)}><span>{item === 'All week' ? 'All week' : item.slice(0, 3)}</span><small>{item === 'All week' ? matches.length : matches.filter(session => session.day === item).length} sessions</small></button>)}</div>
      <div className="results-toolbar"><p role="status">{visible.length} {visible.length === 1 ? 'session' : 'sessions'}{day === 'All week' ? ' this week' : ` on ${day}`}</p>{filtered && <a href="#/classes">Reset filters</a>}</div>
      {visible.length ? <div className="day-groups">{days.filter(value => visible.some(item => item.day === value)).map(value => <section className="day-group" key={value} aria-label={`${value} sessions`}><h3>{value}</h3><ul>{visible.filter(item => item.day === value).map(item => <li className="session-row" key={item.id}><div className="session-time"><strong>{item.time}</strong><span>{item.duration} min</span></div><div className="session-name"><span>{item.category} / {item.level}</span><h4>{item.name}</h4><p>{item.location}</p></div><a className="session-coach" href={`#/coaches/${item.coachId}`}>{item.trainer}<span>View coach</span></a><button className="session-details" onClick={() => setSelected(item)} aria-label={`View ${item.name}, ${item.day} at ${item.time}`}>View class <span aria-hidden="true">↗</span></button></li>)}</ul></section>)}</div> : <div className="empty-schedule"><span aria-hidden="true">—</span><h3>No sessions in this selection.</h3><p>Try another day, discipline, or coach to see more of the sample week.</p><a className="button button-dark" href="#/classes">Show all sessions</a></div>}
      <div className="schedule-help"><h3>New to the floor?</h3><p>Start with Strength foundations or explore the class details to find a session that suits your experience.</p><a className="text-link" href="#/coaches">Meet the coaches <span aria-hidden="true">↗</span></a></div>
    </section>
    <section className="page-width moving-gallery"><div className="section-intro"><h2>EVERY WAY TO MOVE.</h2><p>From focused lifting to shared sessions. Find the setting for your next workout.</p></div><PhotoCarousel slides={galleries.schedule} label="Training in session" /></section>
    <ClassDetails session={selected} onClose={() => setSelected(null)} />
  </>
}
