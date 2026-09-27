import { useState } from 'react'

export const trainingFocuses = ['Build strength', 'Improve conditioning', 'Move more freely', 'Find a routine'] as const
export type MemberProfile = {
  name: string
  email: string
  focus: typeof trainingFocuses[number]
  reminders: boolean
  clubNews: boolean
}
export const defaultProfile: MemberProfile = { name: 'FORM member', email: 'member@example.com', focus: 'Find a routine', reminders: false, clubNews: false }
const key = 'form.demo-profile.v1'

export function profileErrors(value: MemberProfile) {
  return {
    name: value.name.trim().length < 2 || value.name.trim().length > 60 ? 'Use a display name between 2 and 60 characters.' : '',
    email: value.email.trim().length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email.trim()) ? 'Enter a valid sample email address, such as member@example.com.' : '',
  }
}

function readProfile(): MemberProfile {
  try {
    const value = JSON.parse(localStorage.getItem(key) ?? 'null') as Partial<MemberProfile> | null
    if (value && typeof value.name === 'string' && typeof value.email === 'string' &&
      trainingFocuses.includes(value.focus as MemberProfile['focus']) && typeof value.reminders === 'boolean' && typeof value.clubNews === 'boolean') {
      const candidate: MemberProfile = { name: value.name, email: value.email, focus: value.focus!, reminders: value.reminders, clubNews: value.clubNews }
      const errors = profileErrors(candidate)
      if (!errors.name && !errors.email) return candidate
    }
  } catch { /* Invalid or unavailable storage uses fictional defaults. */ }
  return { ...defaultProfile }
}

export function useDemoProfile() {
  const [profile, setProfile] = useState(readProfile)
  const [warning, setWarning] = useState('')
  function save(next: MemberProfile) {
    const clean = { ...next, name: next.name.trim(), email: next.email.trim() }
    const errors = profileErrors(clean)
    if (errors.name || errors.email || !trainingFocuses.includes(clean.focus)) return false
    setProfile(clean)
    try { localStorage.setItem(key, JSON.stringify(clean)); setWarning('') }
    catch { setWarning('Browser storage is unavailable. Profile changes will last only until you leave or refresh this visit.') }
    return true
  }
  return { profile, save, warning }
}
