import { useAdminTrainers } from '../data/adminTrainers'
import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { days } from '../data/content'
import { rooms, useAdminSchedule } from '../data/adminSchedule'
import type { AdminSession } from '../data/adminSchedule'
import './adminSchedule.css'

export function AdminSchedule() {
  const { trainers } = useAdminTrainers()
  const { sessions, save, cancel, warning } = useAdminSchedule()
  const [day, setDay] = useState('')
  const [coach, setCoach] = useState('')
  const [status, setStatus] = useState('active')
  const [draft, setDraft] = useState<AdminSession | null>(null)
  const [pending, setPending] = useState<AdminSession | null>(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const editor = useRef<HTMLDialogElement>(null)
  const confirmation = useRef<HTMLDialogElement>(null)
  const feedback = useRef<HTMLParagraphElement>(null)
  const errorRef = useRef<HTMLParagraphElement>(null)
  const visible = sessions.filter(item => (!day || item.day === day) && (!coach || item.coachId === coach) && (status === 'all' || item.cancelled === (status === 'cancelled'))).sort((a, b) => days.indexOf(a.day as typeof days[number]) - days.indexOf(b.day as typeof days[number]) || a.time.localeCompare(b.time))
  function edit(session?: AdminSession) {
    setDraft(session ? { ...session } : { id: crypto.randomUUID(), name: '', day: day || 'Monday', time: '09:00', duration: 50, coachId: coach || trainers.find(item => item.active)?.id || '', room: rooms[0], capacity: 16, booked: 0, cancelled: false })
    setError('')
    editor.current?.showModal()
    requestAnimationFrame(() => editor.current?.querySelector<HTMLInputElement>('input')?.focus())
  }
  function submit(event: FormEvent) {
    event.preventDefault()
    if (!draft) return
    const issue = save(draft)
    if (issue) { setError(issue); requestAnimationFrame(() => errorRef.current?.focus()); return }
    setMessage(`${draft.name.trim()} saved.`)
    editor.current?.close()
    requestAnimationFrame(() => feedback.current?.focus())
  }
  return <>
    <div className="schedule-manager-intro"><p>Recurring weekly template · all times WAT (UTC+1). </p><button className="button button-dark" onClick={() => edit()}>Add session</button></div>
    {warning && <p className="member-warning" role="alert">{warning}</p>}<p ref={feedback} tabIndex={-1} className="member-feedback" role="status">{message}</p>
    <div className="admin-filters"><label>Day<select value={day} onChange={event => setDay(event.target.value)}><option value="">All days</option>{days.map(value => <option key={value}>{value}</option>)}</select></label><label>Trainer<select value={coach} onChange={event => setCoach(event.target.value)}><option value="">All trainers</option>{trainers.map(value => <option key={value.id} value={value.id}>{value.name}{value.active ? '' : ' (inactive)'}</option>)}</select></label><label>Session status<select value={status} onChange={event => setStatus(event.target.value)}><option value="active">Scheduled</option><option value="cancelled">Cancelled</option><option value="all">All sessions</option></select></label><button className="text-link" onClick={() => { setDay(''); setCoach(''); setStatus('active') }}>Reset filters</button></div>
    <p className="admin-result-count" role="status">{visible.length} matching sessions</p>
    {visible.length ? days.map(value => {
      const matching = visible.filter(item => item.day === value)
      return matching.length > 0 && <section className="schedule-manager-day" key={value}><h2>{value}</h2><ul>{matching.map(item => <li key={item.id}><div><p>{item.time} · {item.duration} min · {item.cancelled ? 'Cancelled' : 'Scheduled'}</p><h3>{item.name}</h3><p>{trainers.find(trainer => trainer.id === item.coachId)?.name} · {item.room}</p><p>{item.booked} bookings / {item.capacity} places{item.cancelled ? ' · retained for review' : ''}</p></div><div className="schedule-manager-actions"><button className="text-link" aria-label={`Edit ${item.name} on ${item.day} at ${item.time}`} onClick={() => edit(item)}>{item.cancelled ? 'Edit / restore' : 'Edit session'}</button>{!item.cancelled && <button className="text-link" aria-label={`Cancel ${item.name} on ${item.day} at ${item.time}`} onClick={() => { setPending(item); confirmation.current?.showModal() }}>Cancel session</button>}</div></li>)}</ul></section>
    }) : <div className="member-empty"><h2>No matching sessions.</h2><p>Change the filters or add a session to this weekly template.</p></div>}
    <dialog ref={editor} className="class-dialog schedule-editor" aria-labelledby="session-editor-title" onClose={() => setDraft(null)}><h2 id="session-editor-title">{draft && sessions.some(item => item.id === draft.id) ? 'Edit session' : 'Add session'}</h2>{draft && <form onSubmit={submit} noValidate><label>Class name<input value={draft.name} maxLength={70} onChange={event => setDraft({ ...draft, name: event.target.value })} /></label><div className="schedule-editor-grid"><label>Day<select value={draft.day} onChange={event => setDraft({ ...draft, day: event.target.value })}>{days.map(value => <option key={value}>{value}</option>)}</select></label><label>Start time · WAT<input type="time" value={draft.time} onChange={event => setDraft({ ...draft, time: event.target.value })} /></label><label>Duration (minutes)<input type="number" min={15} max={180} step={1} value={draft.duration || ''} onChange={event => setDraft({ ...draft, duration: Number(event.target.value) })} /></label><label>Capacity<input type="number" min={Math.max(1, draft.booked)} max={60} step={1} value={draft.capacity || ''} onChange={event => setDraft({ ...draft, capacity: Number(event.target.value) })} /></label><label>Trainer<select value={draft.coachId} onChange={event => setDraft({ ...draft, coachId: event.target.value })}>{trainers.map(value => <option key={value.id} value={value.id}>{value.name}{value.active ? '' : ' (inactive)'}</option>)}</select></label><label>Room<select value={draft.room} onChange={event => setDraft({ ...draft, room: event.target.value })}>{rooms.map(value => <option key={value}>{value}</option>)}</select></label></div><label>Status<select value={draft.cancelled ? 'cancelled' : 'active'} onChange={event => setDraft({ ...draft, cancelled: event.target.value === 'cancelled' })}><option value="active">Scheduled</option>{draft.cancelled && <option value="cancelled">Cancelled</option>}</select></label><p>{draft.booked} existing bookings. Restoring checks trainer and room availability again.</p>{error && <p ref={errorRef} tabIndex={-1} className="member-warning" role="alert">{error}</p>}<div className="cancel-actions"><button type="button" className="button" onClick={() => editor.current?.close()}>Discard edits</button><button type="submit" className="button button-dark">Save session</button></div></form>}</dialog>
    <dialog ref={confirmation} className="class-dialog cancel-booking-dialog" aria-labelledby="cancel-session-title" onClose={() => setPending(null)}><h2 id="cancel-session-title">Cancel this session?</h2><p>{pending?.name} · {pending?.day} {pending?.time}</p><p>{pending?.booked} bookings remain on this record for review. Cancellation releases the trainer and room.</p><div className="cancel-actions"><button className="button button-dark" autoFocus onClick={() => confirmation.current?.close()}>Keep session</button><button className="button" onClick={() => { if (pending) { cancel(pending.id); setMessage(`${pending.name} cancelled. Use the Cancelled filter to review or restore it.`) } confirmation.current?.close(); requestAnimationFrame(() => feedback.current?.focus()) }}>Confirm cancellation</button></div></dialog>
  </>
}
