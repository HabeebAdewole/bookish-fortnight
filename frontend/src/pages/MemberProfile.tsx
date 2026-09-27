import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { defaultProfile, profileErrors, trainingFocuses } from '../data/memberProfile'
import type { MemberProfile as Profile } from '../data/memberProfile'
import './profile.css'

export function MemberProfile({ profile, save, warning }: { profile: Profile; save: (next: Profile) => boolean; warning: string }) {
  const [draft, setDraft] = useState({ ...profile })
  const [errors, setErrors] = useState({ name: '', email: '' })
  const [message, setMessage] = useState('')
  const form = useRef<HTMLFormElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const resetButton = useRef<HTMLButtonElement>(null)
  const dirty = JSON.stringify(draft) !== JSON.stringify(profile)
  const initials = profile.name.trim().split(/\s+/).slice(0, 2).map(part => Array.from(part)[0]).join('').toUpperCase()
  function submit(event: FormEvent) {
    event.preventDefault()
    const nextErrors = profileErrors(draft)
    setErrors(nextErrors)
    if (nextErrors.name || nextErrors.email) {
      setMessage('')
      form.current?.querySelector<HTMLInputElement>(nextErrors.name ? '#profile-name' : '#profile-email')?.focus()
      return
    }
    const clean = { ...draft, name: draft.name.trim(), email: draft.email.trim() }
    if (save(clean)) { setDraft(clean); setMessage('Demo profile updated. No account details were changed and no emails were sent.') }
  }
  return <>
    {warning && <p role="alert" className="member-warning">{warning}</p>}
    <div className="member-feedback" role="status">{message}</div>
    <div className="profile-layout">
      <form ref={form} className="profile-form" noValidate onSubmit={submit}>
        <h2>Your details</h2><p>Use sample details. Saved changes stay in this browser and appear in your demo member space.</p>
        <label htmlFor="profile-name">Display name</label><input id="profile-name" autoComplete="off" maxLength={60} value={draft.name} onChange={event => { setDraft({ ...draft, name: event.target.value }); setMessage(''); setErrors({ ...errors, name: '' }) }} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'profile-name-error' : undefined} />
        {errors.name && <p id="profile-name-error" role="alert" className="profile-error">{errors.name}</p>}
        <label htmlFor="profile-email">Demo email address</label><input id="profile-email" type="email" autoComplete="off" maxLength={120} value={draft.email} onChange={event => { setDraft({ ...draft, email: event.target.value }); setMessage(''); setErrors({ ...errors, email: '' }) }} aria-invalid={!!errors.email} aria-describedby={`profile-email-help${errors.email ? ' profile-email-error' : ''}`} />
        <p id="profile-email-help" className="profile-help">This does not change a login or verify an email address.</p>
        {errors.email && <p id="profile-email-error" role="alert" className="profile-error">{errors.email}</p>}
        <label htmlFor="profile-focus">Training focus</label><select id="profile-focus" value={draft.focus} onChange={event => { setDraft({ ...draft, focus: event.target.value as Profile['focus'] }); setMessage('') }}>{trainingFocuses.map(focus => <option key={focus}>{focus}</option>)}</select>
        <fieldset><legend>Email preferences · preview</legend><p>These choices are saved for the demo only. No notifications or marketing emails are sent.</p>
          <label className="profile-check"><input type="checkbox" checked={draft.reminders} onChange={event => { setDraft({ ...draft, reminders: event.target.checked }); setMessage('') }} /><span>Class reminders</span></label>
          <label className="profile-check"><input type="checkbox" checked={draft.clubNews} onChange={event => { setDraft({ ...draft, clubNews: event.target.checked }); setMessage('') }} /><span>Club news and updates</span></label>
        </fieldset>
        <p className="profile-help">{dirty ? 'You have unsaved changes. Leaving this page discards them.' : 'Your form matches the saved demo profile.'}</p>
        <div className="profile-actions"><button className="button button-dark" type="submit" disabled={!dirty}>Save demo profile</button><button className="text-link" type="button" disabled={!dirty} onClick={() => { setDraft({ ...profile }); setErrors({ name: '', email: '' }); setMessage('Unsaved changes discarded.') }}>Discard changes</button></div>
      </form>
      <aside className="profile-summary" aria-labelledby="saved-profile-title"><p>Saved demo profile</p><div className="profile-avatar" aria-hidden="true">{initials}</div><h2 id="saved-profile-title">{profile.name}</h2><p>{profile.email}</p><dl><dt>Training focus</dt><dd>{profile.focus}</dd><dt>Class reminders</dt><dd>{profile.reminders ? 'On · preview only' : 'Off'}</dd><dt>Club news</dt><dd>{profile.clubNews ? 'On · preview only' : 'Off'}</dd></dl><p>No real account is connected. Password changes and account deletion will need authentication.</p></aside>
    </div>
    <section className="profile-reset"><h2>Start with a clean profile.</h2><p>Restore the fictional name, sample email and default preferences. Your demo membership and bookings stay saved.</p><button ref={resetButton} className="text-link" onClick={() => dialog.current?.showModal()}>Reset demo profile</button></section>
    <dialog ref={dialog} className="class-dialog cancel-booking-dialog" aria-labelledby="profile-reset-title" aria-describedby="profile-reset-description"><h2 id="profile-reset-title">Reset demo profile?</h2><p id="profile-reset-description">This replaces the saved profile and any unsaved edits with sample defaults. It does not delete an account or change your membership or bookings.</p><div className="cancel-actions"><button className="button button-dark" autoFocus onClick={() => dialog.current?.close()}>Keep profile</button><button className="button" onClick={() => { save({ ...defaultProfile }); setDraft({ ...defaultProfile }); setErrors({ name: '', email: '' }); setMessage('Demo profile reset to sample defaults.'); dialog.current?.close(); resetButton.current?.focus() }}>Confirm reset</button></div></dialog>
  </>
}
