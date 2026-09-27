import { useRef, useState } from 'react'
import { useAdminTrainers } from '../data/adminTrainers'
import type { AdminTrainer } from '../data/adminTrainers'
import { useAdminSchedule } from '../data/adminSchedule'
import './adminSchedule.css'
import './adminTrainers.css'

export function AdminTrainers() {
  const { trainers, save, warning } = useAdminTrainers()
  const { sessions } = useAdminSchedule()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [draft, setDraft] = useState<AdminTrainer | null>(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const dialog = useRef<HTMLDialogElement>(null)
  const errorRef = useRef<HTMLParagraphElement>(null)
  const shown = trainers.filter(item => `${item.name} ${item.specialty}`.toLowerCase().includes(search.trim().toLowerCase()) && (status === 'all' || item.active === (status === 'active')))
  return <>
    <p>Manage existing fictional trainers. Changes stay in this browser and apply to the admin schedule only; public coach profiles stay unchanged.</p>
    {warning && <p role="alert" className="member-warning">{warning}</p>}<p role="status" className="member-feedback">{message}</p>
    <div className="admin-filters"><label>Search trainers<input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Name or specialty" /></label><label>Status<select value={status} onChange={event => setStatus(event.target.value)}><option value="all">All trainers</option><option value="active">Active</option><option value="inactive">Inactive</option></select></label><button className="text-link" onClick={() => { setSearch(''); setStatus('all') }}>Reset filters</button></div>
    <p className="admin-result-count" role="status">{shown.length} matching trainers</p>
    <div className="trainer-admin-grid">{shown.map(item => {
      const assigned = sessions.filter(session => session.coachId === item.id && !session.cancelled)
      return <article className="admin-panel" key={item.id}><div className="admin-avatar" aria-hidden="true">{item.name.split(/\s+/).slice(0, 2).map(part => Array.from(part)[0]).join('')}</div><h2>{item.name}</h2><p><strong>{item.specialty}</strong></p><p>{item.bio}</p><p className="trainer-state">{item.active ? 'Active' : 'Inactive'} · {assigned.length} scheduled sessions</p><button className="button button-dark" onClick={() => { setDraft({ ...item }); setError(''); dialog.current?.showModal(); requestAnimationFrame(() => dialog.current?.querySelector('input')?.focus()) }}>Edit {item.name}</button><details><summary>View assigned sessions</summary>{assigned.length ? <ul>{assigned.map(session => <li key={session.id}><strong>{session.name}</strong><span>{session.day} {session.time} WAT · {session.room}</span></li>)}</ul> : <p>No scheduled sessions.</p>}<a className="text-link" href="#/admin/schedule">Manage schedule</a></details></article>
    })}</div>
    {!shown.length && <div className="member-empty"><h2>No matching trainers.</h2><p>Change your search or reset the filters.</p></div>}
    <dialog ref={dialog} className="class-dialog schedule-editor" aria-labelledby="trainer-editor-title" onClose={() => setDraft(null)}><h2 id="trainer-editor-title">Edit demo trainer</h2>{draft && <form noValidate onSubmit={event => { event.preventDefault(); const issue = save(draft, sessions.filter(item => item.coachId === draft.id && !item.cancelled).length); if (issue) { setError(issue); requestAnimationFrame(() => errorRef.current?.focus()); return } setMessage(`${draft.name.trim()} updated in the admin demo.`); dialog.current?.close() }}><label>Name<input maxLength={60} value={draft.name} onChange={event => setDraft({ ...draft, name: event.target.value })} /></label><label>Specialty<input maxLength={80} value={draft.specialty} onChange={event => setDraft({ ...draft, specialty: event.target.value })} /></label><label>Short bio<textarea maxLength={300} rows={4} value={draft.bio} onChange={event => setDraft({ ...draft, bio: event.target.value })} /></label><label>Trainer status<select value={draft.active ? 'active' : 'inactive'} onChange={event => setDraft({ ...draft, active: event.target.value === 'active' })}><option value="active">Active</option><option value="inactive">Inactive</option></select></label><p>Inactive trainers cannot receive new sessions. Reassign or cancel scheduled classes first. No staff accounts or notifications are connected.</p>{error && <p ref={errorRef} tabIndex={-1} role="alert" className="member-warning">{error}</p>}<div className="cancel-actions"><button type="button" className="button" onClick={() => dialog.current?.close()}>Discard edits</button><button className="button button-dark" type="submit">Save trainer</button></div></form>}</dialog>
  </>
}
