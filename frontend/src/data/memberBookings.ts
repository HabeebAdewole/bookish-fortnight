import { useEffect, useState } from 'react'
import { days, weeklyClasses } from './content'
import type { ClassPreview } from './content'

export type DatedSession = ClassPreview & { key: string; date: string; startsAt: number; seats: number }
const storageKey = 'form.demo-bookings.v1'

export function upcomingSessions(now = Date.now()): DatedSession[] {
  const watDate = new Date(now + 3600000).toISOString().slice(0, 10)
  const start = new Date(`${watDate}T00:00:00Z`)
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start.getTime() + (index + 1) * 86400000)
    const day = days[(date.getUTCDay() + 6) % 7]
    const iso = date.toISOString().slice(0, 10)
    return weeklyClasses.filter(session => session.day === day).map(session => ({
      ...session, date: iso, key: `${iso}|${session.id}`,
      startsAt: Date.parse(`${iso}T${session.time}:00+01:00`),
      seats: session.id === 'friday-conditioning' ? 0 : 2 + weeklyClasses.indexOf(session) % 7,
    }))
  }).flat()
}

export function sessionDate(session: DatedSession) {
  return new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'Africa/Lagos' }).format(session.startsAt)
}

function readBookings(): string[] {
  const raw: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]')
  if (!Array.isArray(raw)) return []
  return [...new Set(raw.filter((key): key is string => typeof key === 'string' && /^\d{4}-\d{2}-\d{2}\|[a-z-]+$/.test(key)))]
}

export function useDemoBookings(allowance: number, membershipActive: boolean) {
  const [bookings, setBookings] = useState<string[]>(() => { try { return readBookings() } catch { return [] } })
  const [storageWarning, setStorageWarning] = useState('')
  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key !== storageKey && event.key !== null) return
      try { setBookings(readBookings()) } catch { setStorageWarning('Browser storage is unavailable. Changes will last only for this visit.') }
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])
  function save(next: string[]) {
    setBookings(next)
    try { localStorage.setItem(storageKey, JSON.stringify(next)); setStorageWarning('') }
    catch { setStorageWarning('Browser storage is unavailable. Changes will last only for this visit.') }
  }
  function book(session: DatedSession, sessions: DatedSession[]) {
    if (!membershipActive) return 'Resume or reactivate your membership before booking.'
    const active = bookings.filter(key => sessions.some(item => item.key === key))
    if (active.includes(session.key)) return 'You already booked this class.'
    if (session.startsAt <= Date.now()) return 'This session has started. Refresh to see the next training week.'
    if (!session.seats) return 'This class is full. Choose another session.'
    if (active.length >= allowance) return 'Your allowance is used. Cancel a booking to try another class.'
    if (sessions.some(item => active.includes(item.key) && item.startsAt < session.startsAt + session.duration * 60000 && item.startsAt + item.duration * 60000 > session.startsAt)) return 'This overlaps a class you already booked.'
    save([...active, session.key])
    return `${session.name} booked for ${sessionDate(session)} at ${session.time} WAT.`
  }
  function cancel(key: string) { save(bookings.filter(item => item !== key)) }
  return { bookings, book, cancel, storageWarning }
}
