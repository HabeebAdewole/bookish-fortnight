import { useSyncExternalStore } from 'react'

export const preferenceKey = 'form.preferences.v1'
const eventName = 'form-preferences-changed'
export const formStorageKeys = [preferenceKey, 'form.demo-profile.v1', 'form.demo-membership.v1', 'form.demo-bookings.v1', 'form.admin-schedule.v1', 'form.admin-trainers.v1'] as const

function readPaused() {
  try { return localStorage.getItem(preferenceKey) === 'paused' } catch { return false }
}
function subscribe(callback: () => void) {
  window.addEventListener(eventName, callback)
  window.addEventListener('storage', callback)
  return () => { window.removeEventListener(eventName, callback); window.removeEventListener('storage', callback) }
}
let pausedForVisit: boolean | null = null
export function setMotionPaused(paused: boolean) {
  pausedForVisit = paused
  try { localStorage.setItem(preferenceKey, paused ? 'paused' : 'automatic'); pausedForVisit = null } catch { /* Keep the choice for this visit. */ }
  window.dispatchEvent(new Event(eventName))
}
export function useMotionPaused() {
  return useSyncExternalStore(subscribe, () => pausedForVisit ?? readPaused(), () => false)
}
