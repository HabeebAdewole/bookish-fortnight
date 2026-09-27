import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { memberships } from '../data/content'
import { planLimits } from '../data/memberMembership'
import type { Membership, PlanName } from '../data/memberMembership'
import './checkout.css'

type Props = {
  selectedPlan: string | null
  membership: Membership
  bookingCount: number
  update: (next: Membership, count: number) => string
}
type Scenario = 'approved' | 'declined' | 'unavailable'
type Result = 'idle' | 'processing' | 'success' | 'declined' | 'unavailable'

export function MemberCheckout({ selectedPlan, membership, bookingCount, update }: Props) {
  const plan = memberships.find(item => item.name === selectedPlan)
  const [scenario, setScenario] = useState<Scenario>('approved')
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<Result>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const consent = useRef<HTMLInputElement>(null)
  const feedback = useRef<HTMLDivElement>(null)
  // Use the latest membership and booking state if another tab changes it mid-simulation.
  const latest = useRef({ membership, bookingCount, update })
  useEffect(() => { latest.current = { membership, bookingCount, update } }, [membership, bookingCount, update])
  useEffect(() => () => { if (timer.current !== null) clearTimeout(timer.current) }, [])
  useEffect(() => {
    if (result !== 'idle' && result !== 'processing') feedback.current?.focus()
  }, [result])

  if (!plan) return <section className="member-empty"><h2>Choose a plan first.</h2><p>This checkout link does not include a valid FORM plan.</p><a className="button button-dark" href="#/member/membership">View demo plans</a></section>
  const name = plan.name as PlanName
  const blocked = membership.status !== 'active' || bookingCount > planLimits[name]

  function submit(event: FormEvent) {
    event.preventDefault()
    if (timer.current !== null || result === 'success' || blocked) return
    if (!agreed) { setError('Confirm that you understand this is a demo before continuing.'); consent.current?.focus(); return }
    setError('')
    setResult('processing')
    timer.current = setTimeout(() => {
      timer.current = null
      const current = latest.current
      if (current.membership.status !== 'active' || current.bookingCount > planLimits[name]) {
        setError('Your membership or bookings changed. Review them before trying again.')
        setResult('unavailable')
        return
      }
      if (scenario === 'approved') {
        current.update({ plan: name, status: 'active' }, current.bookingCount)
        setResult('success')
      } else setResult(scenario)
    }, 700)
  }

  if (result === 'success') return <section className="checkout-success" ref={feedback} tabIndex={-1} aria-labelledby="checkout-success-title">
    <p>Simulation complete</p><h2 id="checkout-success-title">YOU’RE SET TO MOVE.</h2><p>Your demo plan is now {name}. Your existing bookings stay saved.</p>
    <dl><div><dt>Sample plan price</dt><dd>₦{plan.price} / month</dd></div><div><dt>Amount charged</dt><dd>₦0</dd></div><div><dt>Payment status</dt><dd>Simulated approval</dd></div></dl>
    <p>No payment was processed, no subscription was purchased, and no receipt or invoice was issued.</p>
    <div className="checkout-links"><a className="button button-dark" href="#/member/classes">Book a demo class</a><a className="text-link" href="#/member/membership">View membership</a></div>
  </section>

  return <div className="checkout-layout">
    <form className="checkout-form" onSubmit={submit} noValidate aria-busy={result === 'processing'}>
      <h2>Try the payment flow</h2><p>Use a sample payment method to explore each outcome. No card details are needed or collected.</p>
      {blocked && <p className="member-warning" role="alert">{membership.status !== 'active' ? 'Resume or reactivate your demo membership before checking out.' : `This plan allows ${planLimits[name]} upcoming selections. Cancel some bookings or choose a larger plan.`} <a className="text-link" href="#/member/membership">Manage membership</a></p>}
      <fieldset disabled={result === 'processing'}><legend>Sample payment method</legend>
        {([
          ['approved', 'Demo card · approved', 'Completes the simulation and applies this plan.'],
          ['declined', 'Demo card · declined', 'Shows a decline so you can try again.'],
          ['unavailable', 'Service unavailable', 'Shows a temporary failure without changing your plan.'],
        ] as const).map(([value, label, description]) => <label className="checkout-method" key={value}><input type="radio" name="demo-payment" value={value} checked={scenario === value} onChange={() => { setScenario(value); setResult('idle'); setError('') }} /><span><strong>{label}</strong><small>{description}</small></span></label>)}
        <label className="checkout-consent"><input ref={consent} type="checkbox" checked={agreed} onChange={event => { setAgreed(event.target.checked); setError('') }} aria-invalid={!!error} aria-describedby={error ? 'checkout-error' : undefined} /><span>I understand this is a simulation. No money will be charged; approval applies the selected demo plan immediately.</span></label>
      </fieldset>
      {error && <p id="checkout-error" role="alert">{error}</p>}
      {(result === 'declined' || result === 'unavailable') && <div className="checkout-result" role="status" ref={feedback} tabIndex={-1}><h3>{result === 'declined' ? 'Demo payment declined' : 'Demo service unavailable'}</h3><p>Your plan has not changed and nothing was charged. {result === 'declined' ? 'Select the approved demo card to complete the flow.' : 'Try again, or choose the approved demo card to test success.'}</p></div>}
      <p className="sr-only" role="status">{result === 'processing' ? 'Processing demo payment.' : ''}</p>
      <button className="button button-dark" disabled={blocked || result === 'processing'} type="submit">{result === 'processing' ? 'Processing demo…' : 'Simulate payment · ₦0 charged'}</button>
      <a className="text-link" href="#/member/membership">Back to membership</a>
    </form>
    <aside className="checkout-summary" aria-labelledby="order-summary-title"><p>Order summary · demo</p><h2 id="order-summary-title">{name}</h2><p>{plan.description}</p><ul>{plan.features.map(feature => <li key={feature}>{feature}</li>)}</ul><dl><div><dt>Sample monthly price</dt><dd>₦{plan.price}</dd></div><div><dt>Amount charged today</dt><dd>₦0</dd></div></dl><p>This preview has no renewal date, taxes, proration or billing agreement. Demo class limits apply to upcoming bookings, not monthly attendance.</p><a className="text-link" href="#/member/membership">Choose another plan</a></aside>
  </div>
}
