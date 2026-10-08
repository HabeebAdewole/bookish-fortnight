import { useEffect, useState } from 'react'

export const planLimits = { Foundation: 4, Rhythm: 8, Everyday: Infinity }
export type PlanName = keyof typeof planLimits
export type Membership = { plan: PlanName; status: 'active' | 'paused' | 'cancelled' }
const key = 'form.demo-membership.v1'
const initial: Membership = { plan: 'Rhythm', status: 'active' }

function read(): Membership {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(key) ?? 'null')
    if (value && typeof value === 'object' && 'plan' in value && 'status' in value &&
      (value.plan === 'Foundation' || value.plan === 'Rhythm' || value.plan === 'Everyday') &&
      (value.status === 'active' || value.status === 'paused' || value.status === 'cancelled')) {
      return { plan: value.plan, status: value.status }
    }
  } catch { /* Unavailable or malformed storage uses the default. */ }
  return initial
}

export function useDemoMembership() {
  const [membership, setMembership] = useState(read)
  const [warning, setWarning] = useState('')
  useEffect(() => {
    const sync = (event: StorageEvent) => { if (event.key === key || event.key === null) setMembership(read()) }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])
  function update(next: Membership, bookingCount: number) {
    if (next.plan !== membership.plan && bookingCount > planLimits[next.plan]) return 'Cancel some upcoming bookings before choosing this plan.'
    setMembership(next)
    try { localStorage.setItem(key, JSON.stringify(next)); setWarning('') }
    catch { setWarning('Browser storage is unavailable. Membership changes may be lost when you leave or refresh.') }
    return `Membership updated: ${next.plan}, ${next.status}.`
  }
  return { membership, update, warning, allowance: planLimits[membership.plan] }
}
