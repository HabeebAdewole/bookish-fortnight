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
    if (save(clean)) { setDraft(clean); setMessage('Profile updated.') }
  }
  return <>
    {warning && <p role="alert" className="member-warning">{warning}</p>}
    <div className="member-feedback" role="status">{message}</div>
    <div className="profile-layout">
      <form ref={form} className="profile-form" noValidate onSubmit={submit}>
        <h2>Your details</h2><p>Update your details and training preferences.</p>
        <label htmlFor="profile-name">Display name</label><input id="profile-name" autoComplete="off" maxLength={60} value={draft.name} onChange={event => { setDraft({ ...draft, name: event.target.value }); setMessage(''); setErrors({ ...errors, name: '' }) }} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'profile-name-error' : undefined} />
        {errors.name && <p id="profile-name-error" role="alert" className="profile-error">{errors.name}</p>}
        <label htmlFor="profile-email">Email address</label><input id="profile-email" type="email" autoComplete="off" maxLength={120} value={draft.email} onChange={event => { setDraft({ ...draft, email: event.target.value }); setMessage(''); setErrors({ ...errors, email: '' }) }} aria-invalid={!!errors.email} aria-describedby={`profile-email-help${errors.email ? ' profile-email-error' : ''}`} />
        <p id="profile-email-help" className="profile-help">Enter the email address for your profile.</p>
        {errors.email && <p id="profile-email-error" role="alert" className="profile-error">{errors.email}</p>}
        <label htmlFor="profile-focus">Training focus</label><select id="profile-focus" value={draft.focus} onChange={event => { setDraft({ ...draft, focus: event.target.value as Profile['focus'] }); setMessage('') }}>{trainingFocuses.map(focus => <option key={focus}>{focus}</option>)}</select>
        <fieldset><legend>Email preferences</legend><p>Choose your communication preferences.</p>
          <label className="profile-check"><input type="checkbox" checked={draft.reminders} onChange={event => { setDraft({ ...draft, reminders: event.target.checked }); setMessage('') }} /><span>Class reminders</span></label>
          <label className="profile-check"><input type="checkbox" checked={draft.clubNews} onChange={event => { setDraft({ ...draft, clubNews: event.target.checked }); setMessage('') }} /><span>Club news and updates</span></label>
        </fieldset>
        <p className="profile-help">{dirty ? 'You have unsaved changes. Leaving this page discards them.' : 'Your form matches the saved profile.'}</p>
        <div className="profile-actions"><button className="button button-dark" type="submit" disabled={!dirty}>Save profile</button><button className="text-link" type="button" disabled={!dirty} onClick={() => { setDraft({ ...profile }); setErrors({ name: '', email: '' }); setMessage('Unsaved changes discarded.') }}>Discard changes</button></div>
      </form>
      <aside className="profile-summary" aria-labelledby="saved-profile-title"><p>Saved profile</p><div className="profile-avatar" aria-hidden="true">{initials}</div><h2 id="saved-profile-title">{profile.name}</h2><p>{profile.email}</p><dl><dt>Training focus</dt><dd>{profile.focus}</dd><dt>Class reminders</dt><dd>{profile.reminders ? 'On' : 'Off'}</dd><dt>Club news</dt><dd>{profile.clubNews ? 'On' : 'Off'}</dd></dl></aside>
    </div>
    <section className="profile-reset"><h2>Start with a clean profile.</h2><p>Restore the default name, email and preferences. Your membership and bookings stay saved.</p><button ref={resetButton} className="text-link" onClick={() => dialog.current?.showModal()}>Reset profile</button></section>
    <dialog ref={dialog} className="class-dialog cancel-booking-dialog" aria-labelledby="profile-reset-title" aria-describedby="profile-reset-description"><h2 id="profile-reset-title">Reset profile?</h2><p id="profile-reset-description">This replaces the saved profile and any unsaved edits with defaults. It does not delete an account or change your membership or bookings.</p><div className="cancel-actions"><button className="button button-dark" autoFocus onClick={() => dialog.current?.close()}>Keep profile</button><button className="button" onClick={() => { save({ ...defaultProfile }); setDraft({ ...defaultProfile }); setErrors({ name: '', email: '' }); setMessage('Profile reset to defaults.'); dialog.current?.close(); resetButton.current?.focus() }}>Confirm reset</button></div></dialog>
  </>
}
