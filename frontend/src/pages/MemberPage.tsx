import { useRef, useState } from 'react'
import { categories, trainers } from '../data/content'
import { demoAllowance, sessionDate, upcomingSessions, useDemoBookings } from '../data/memberBookings'
import type { DatedSession } from '../data/memberBookings'
import './member.css'

export function MemberPage({ bookingView }: { bookingView: boolean }) {
  const [sessions] = useState(upcomingSessions)
  const { bookings, book, cancel, storageWarning } = useDemoBookings()
  const [category, setCategory] = useState('All classes')
  const [coach, setCoach] = useState('')
  const [message, setMessage] = useState('')
  const [pending, setPending] = useState<DatedSession | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const booked = sessions.filter(session => bookings.includes(session.key))
  const visible = sessions.filter(session => (category === 'All classes' || category === session.category) && (!coach || coach === session.coachId))
  function requestCancel(session: DatedSession) {
    setPending(session)
    dialog.current?.showModal()
  }
  return <div className="member-area page-width">
    <div className="member-demo"><strong>Demo member space</strong><p>No sign-in required. Try booking and cancelling sample classes. This browser stores session selections only; no real reservations are made.</p></div>
    <nav className="member-nav" aria-label="Member navigation"><a href="#/member" aria-current={!bookingView ? 'page' : undefined}>Overview</a><a href="#/member/classes" aria-current={bookingView ? 'page' : undefined}>Book a class</a><a href="#home">Back to the club</a></nav>
    <header className="member-heading"><div><p className="section-caption">Your training, in one place</p><h1 ref={heading} tabIndex={-1}>{bookingView ? 'MAKE YOUR NEXT MOVE.' : 'BUILD YOUR WEEK.'}</h1><p>Plan ahead with the next seven days of sample sessions, starting tomorrow. All times WAT (UTC+1).</p></div>{!bookingView && <a className="button button-dark" href="#/member/classes">Find a class <span aria-hidden="true">↗</span></a>}</header>
    {storageWarning && <p className="member-warning" role="alert">{storageWarning}</p>}
    <div className="member-feedback" role="status" aria-live="polite">{message}</div>
    {!bookingView && <>
      <section className="member-metrics" aria-label="Demo membership summary"><div><p>Demo plan</p><h2>Rhythm</h2><span>Illustrative membership</span></div><div><p>Upcoming bookings</p><h2>{booked.length}</h2><span>In this training week</span></div><div><p>Available demo credits</p><h2>{Math.max(0, demoAllowance - booked.length)} <small>/ {demoAllowance}</small></h2><span>Each booking uses one credit</span></div></section>
      <section className="member-bookings" aria-labelledby="bookings-title"><div className="member-section-heading"><h2 id="bookings-title">Your upcoming classes</h2><a className="text-link" href="#/member/classes">Explore the timetable</a></div>{booked.length ? <ul className="booked-list">{booked.map(session => <li key={session.key}><div><p>{sessionDate(session)} · {session.time} WAT</p><h3>{session.name}</h3><span>{session.duration} min · {session.trainer} · {session.location}</span></div><button className="text-link" onClick={() => requestCancel(session)} aria-label={`Cancel ${session.name} on ${sessionDate(session)}`}>Cancel booking</button></li>)}</ul> : <div className="member-empty"><h3>A little space for your next session.</h3><p>No classes booked yet. Pick a session to start shaping your week.</p><a className="button button-dark" href="#/member/classes">Book your first demo class</a></div>}</section>
      <section className="member-guidance"><div><h2>A routine you can repeat.</h2><p>Mix strength, conditioning, and mobility throughout your week. Explore each coach’s approach before choosing a session.</p></div><a className="text-link" href="#/coaches">Meet the coaches <span aria-hidden="true">↗</span></a></section>
    </>}
    {bookingView && <section aria-labelledby="booking-list-title"><div className="member-section-heading"><h2 id="booking-list-title">Find your session</h2><p>{booked.length} / {demoAllowance} demo credits used</p></div><div className="member-filters"><label>Class type<select value={category} onChange={event => setCategory(event.target.value)}>{categories.map(value => <option key={value}>{value}</option>)}</select></label><label>Trainer<select value={coach} onChange={event => setCoach(event.target.value)}><option value="">All trainers</option>{trainers.map(value => <option key={value.id} value={value.id}>{value.name}</option>)}</select></label><button className="text-link" onClick={() => { setCategory('All classes'); setCoach('') }}>Reset filters</button></div><p className="member-count">{visible.length} matching sessions · Seats are illustrative</p>
      {visible.length ? <div className="booking-grid">{visible.map(session => {
        const reserved = bookings.includes(session.key)
        const full = session.seats === 0
        return <article className="booking-card" key={session.key}><div className="booking-card-top"><p>{sessionDate(session)}</p><span>{reserved ? 'Booked' : full ? 'Full' : `${session.seats} demo seats`}</span></div><p className="booking-time">{session.time}<span>{session.duration} min</span></p><p className="section-caption">{session.category} · {session.level}</p><h3>{session.name}</h3><p>{session.description}</p><p className="booking-coach">With <a href={`#/coaches/${session.coachId}`}>{session.trainer}</a> · {session.location}</p><button className={`button ${reserved ? '' : 'button-dark'}`} disabled={!reserved && (full || booked.length >= demoAllowance)} onClick={() => { if (reserved) requestCancel(session); else setMessage(book(session, sessions)) }}>{reserved ? 'Cancel booking' : full ? 'Class full' : booked.length >= demoAllowance ? 'No demo credits left' : 'Book demo class'}</button></article>
      })}</div> : <div className="member-empty"><h3>No matching sessions.</h3><p>Try another class type or trainer, or reset the filters.</p></div>}
    </section>}
    <dialog ref={dialog} className="class-dialog cancel-booking-dialog" aria-labelledby="cancel-title" onClose={() => setPending(null)}><h2 id="cancel-title">Cancel this booking?</h2><p>{pending && `${pending.name} · ${sessionDate(pending)} at ${pending.time} WAT`}</p><p>Your demo credit will become available again.</p><div className="cancel-actions"><button autoFocus className="button button-dark" onClick={() => dialog.current?.close()}>Keep booking</button><button className="button" onClick={() => { if (pending) { cancel(pending.key); setMessage(`${pending.name} cancelled. Your demo credit is available again.`) } dialog.current?.close(); requestAnimationFrame(() => heading.current?.focus()) }}>Cancel demo booking</button></div></dialog>
  </div>
}
