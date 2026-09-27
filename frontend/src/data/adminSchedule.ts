import { readAdminTrainers } from './adminTrainers'
import { useState } from 'react'
import { days, trainers, weeklyClasses } from './content'
export const rooms = ['Strength floor', 'Training studio', 'Movement studio'] as const
export type AdminSession = { id: string; name: string; day: string; time: string; duration: number; coachId: string; room: string; capacity: number; booked: number; cancelled: boolean }
const key = 'form.admin-schedule.v1'
const seed = (): AdminSession[] => weeklyClasses.map((item, index) => ({ id: item.id, name: item.name, day: item.day, time: item.time, duration: item.duration, coachId: item.coachId, room: item.location, capacity: 16, booked: index % 5 + 2, cancelled: false }))
export const minutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3))
export function sessionError(session: AdminSession, all: AdminSession[]) {
  if (!session.name.trim() || session.name.trim().length > 70) return 'Use a class name between 1 and 70 characters.'
  if (!(days as readonly string[]).includes(session.day) || !trainers.some(item => item.id === session.coachId) || !(rooms as readonly string[]).includes(session.room)) return 'Choose a valid day, trainer and room.'
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(session.time)) return 'Enter a valid start time.'
  if (!Number.isInteger(session.duration) || session.duration < 15 || session.duration > 180) return 'Duration must be a whole number from 15 to 180 minutes.'
  if (minutes(session.time) + session.duration > 1440) return 'The session must finish by midnight.'
  if (!Number.isInteger(session.capacity) || session.capacity < 1 || session.capacity > 60 || session.capacity < session.booked) return `Capacity must be a whole number from ${Math.max(1, session.booked)} to 60; existing sample bookings must fit.`
  if (!session.cancelled) {
    const collision = all.find(item => item.id !== session.id && !item.cancelled && item.day === session.day && minutes(item.time) < minutes(session.time) + session.duration && minutes(item.time) + item.duration > minutes(session.time) && (item.coachId === session.coachId || item.room === session.room))
    if (collision) return `Schedule conflict with ${collision.name} at ${collision.time}: the trainer or room is already in use.`
  }
  return ''
}
function read(): AdminSession[] {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(key) ?? 'null')
    if (!Array.isArray(raw) || raw.length > 200) return seed()
    const entries = raw.filter((value): value is AdminSession => value && typeof value === 'object' && typeof value.id === 'string' && typeof value.name === 'string' && typeof value.day === 'string' && typeof value.time === 'string' && typeof value.coachId === 'string' && typeof value.room === 'string' && typeof value.cancelled === 'boolean' && Number.isInteger(value.booked) && value.booked >= 0 && !sessionError(value, []))
    if (entries.length !== raw.length || new Set(entries.map(item => item.id)).size !== entries.length || entries.some(item => sessionError(item, entries))) return seed()
    return entries
  } catch { return seed() }
}
export function useAdminSchedule() {
  const [sessions, setSessions] = useState(read)
  const [warning, setWarning] = useState('')
  function persist(next: AdminSession[]) {
    setSessions(next)
    try { localStorage.setItem(key, JSON.stringify(next)); setWarning('') }
    catch { setWarning('Browser storage is unavailable. Schedule changes will be lost when this workspace is closed or refreshed.') }
  }
  function save(session: AdminSession) {
    if (!session.cancelled && !readAdminTrainers().some(item => item.id === session.coachId && item.active)) return 'Choose an active trainer before scheduling or restoring this session.'
    const error = sessionError(session, sessions)
    if (error) return error
    if (!sessions.some(item => item.id === session.id) && sessions.length >= 200) return 'This demo supports up to 200 sessions.'
    const clean = { ...session, name: session.name.trim() }
    persist(sessions.some(item => item.id === session.id) ? sessions.map(item => item.id === session.id ? clean : item) : [...sessions, clean])
    return ''
  }
  function cancel(id: string) { persist(sessions.map(item => item.id === id ? { ...item, cancelled: true } : item)) }
  return { sessions, save, cancel, warning }
}
