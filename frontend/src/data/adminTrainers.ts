import { useState } from 'react'
import { trainers as coaches } from './content'
export type AdminTrainer = { id: string; name: string; specialty: string; bio: string; active: boolean }
const key = 'form.admin-trainers.v1'
const seed = (): AdminTrainer[] => coaches.map(item => ({ id: item.id, name: item.name, specialty: item.specialty, bio: item.description, active: true }))
export function trainerError(item: AdminTrainer) {
  if (item.name.trim().length < 2 || item.name.trim().length > 60) return 'Name must contain 2–60 characters.'
  if (item.specialty.trim().length < 2 || item.specialty.trim().length > 80) return 'Specialty must contain 2–80 characters.'
  if (item.bio.trim().length < 10 || item.bio.trim().length > 300) return 'Bio must contain 10–300 characters.'
  return ''
}
export function readAdminTrainers(): AdminTrainer[] {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(key) ?? 'null')
    if (!Array.isArray(raw) || raw.length !== coaches.length) return seed()
    const valid = raw.every(item => item && typeof item.name === 'string' && typeof item.specialty === 'string' && typeof item.bio === 'string' && typeof item.active === 'boolean' && coaches.some(coach => coach.id === item.id) && !trainerError(item))
    if (valid && new Set(raw.map(item => item.id)).size === coaches.length) return raw
  } catch { /* Use fictional defaults if storage cannot be read. */ }
  return seed()
}
export function useAdminTrainers() {
  const [trainers, setTrainers] = useState(readAdminTrainers)
  const [warning, setWarning] = useState('')
  function save(item: AdminTrainer, assigned: number) {
    const error = trainerError(item)
    if (error) return error
    if (!item.active && assigned > 0) return 'Reassign or cancel this trainer’s scheduled sessions before marking them inactive.'
    const next = trainers.map(value => value.id === item.id ? { ...item, name: item.name.trim(), specialty: item.specialty.trim(), bio: item.bio.trim() } : value)
    setTrainers(next)
    try { localStorage.setItem(key, JSON.stringify(next)); setWarning('') }
    catch { setWarning('Browser storage is unavailable. Trainer changes may be lost when you leave or refresh.') }
    return ''
  }
  return { trainers, save, warning }
}
