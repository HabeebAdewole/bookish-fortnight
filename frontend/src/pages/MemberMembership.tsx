import { useRef, useState } from 'react'
import { memberships } from '../data/content'
import { planLimits } from '../data/memberMembership'
import type { Membership, PlanName } from '../data/memberMembership'

type Props = {
  membership: Membership
  bookingCount: number
  update: (next: Membership, count: number) => string
}

export function MemberMembership({ membership, bookingCount, update }: Props) {
  const [pending, setPending] = useState<{ next: Membership; title: string; detail: string } | null>(null)
  const [message, setMessage] = useState('')
  const dialog = useRef<HTMLDialogElement>(null)
  const summary = useRef<HTMLHeadingElement>(null)
  const current = memberships.find(plan => plan.name === membership.plan)!
  function request(next: Membership, title: string, detail: string) {
    setPending({ next, title, detail })
    dialog.current?.showModal()
  }
  return <>
    <div role="status" className="member-feedback">{message}</div>
    <section className="membership-current" aria-labelledby="current-plan-title">
      <div><p>Your membership</p><h2 id="current-plan-title" ref={summary} tabIndex={-1}>{membership.plan}</h2><span className="membership-status">{membership.status}</span></div>
      <div><p className="membership-price">₦{current.price}<span> / month</span></p><p>{current.features[0]}.</p><p>{bookingCount} upcoming bookings. Existing selections stay saved when you pause or cancel.</p></div>
    </section>
    <section aria-labelledby="plan-options-title">
      <div className="member-section-heading"><h2 id="plan-options-title">Find your training rhythm</h2></div>
      <p className="membership-explainer">Changes take effect immediately. Class limits apply to upcoming bookings.</p>
      <div className="membership-options">{memberships.map(plan => {
        const name = plan.name as PlanName
        const selected = name === membership.plan
        const overLimit = bookingCount > planLimits[name]
        return <article key={name} className={selected ? 'selected-plan' : ''}>
          <h3>{name}</h3><p className="membership-price">₦{plan.price}<span> / month</span></p><p>{plan.description}</p>
          <ul>{plan.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
          <button className="button button-dark" disabled={selected || overLimit || membership.status !== 'active'} onClick={() => request({ ...membership, plan: name }, `Change to ${name}?`, `Your price changes from ₦${current.price} to ₦${plan.price} per month. ${planLimits[name] === Infinity ? 'Unlimited' : planLimits[name]} upcoming bookings allowed. Your existing selections stay saved.`)}>{selected ? 'Current plan' : `Choose ${name}`}</button>
          <a className="text-link" href={`#/member/checkout?plan=${name}`}>Continue with {name}</a>
          {overLimit && !selected && <p className="plan-restriction">Cancel bookings until you have {planLimits[name]} or fewer to select this plan.</p>}
        </article>
      })}</div>
    </section>
    <section className="membership-controls" aria-labelledby="membership-controls-title"><h2 id="membership-controls-title">Room to take a break.</h2>
      {membership.status === 'active' ? <><p>Pause when you need time away, or cancel your membership. Both stop new bookings and keep your existing selections. You can still cancel individual bookings.</p><div><button className="button" onClick={() => request({ ...membership, status: 'paused' }, 'Pause membership?', 'New bookings will stop until you resume. Existing selections stay saved.')}>Pause membership</button><button className="text-link" onClick={() => request({ ...membership, status: 'cancelled' }, 'Cancel membership?', 'New bookings will stop immediately. Existing selections stay saved and can be cancelled individually. You can reactivate your membership later.')}>Cancel membership</button></div></> : <><p>Your membership is {membership.status}. {membership.status === 'paused' ? 'Resume' : 'Reactivate'} your current plan to book again or choose another plan.</p><button className="button button-dark" onClick={() => request({ ...membership, status: 'active' }, membership.status === 'paused' ? 'Resume membership?' : 'Reactivate membership?', `Your ${membership.plan} plan becomes active immediately. Existing selections count toward its allowance.`)}>{membership.status === 'paused' ? 'Resume membership' : 'Reactivate membership'}</button></>}
    </section>
    <dialog ref={dialog} className="class-dialog cancel-booking-dialog" aria-labelledby="membership-confirm-title" aria-describedby="membership-confirm-detail" onClose={() => setPending(null)}>
      <h2 id="membership-confirm-title">{pending?.title}</h2><p id="membership-confirm-detail">{pending?.detail}</p>
      <div className="cancel-actions"><button autoFocus className="button" onClick={() => dialog.current?.close()}>Go back</button><button className="button button-dark" onClick={() => { if (pending) setMessage(update(pending.next, bookingCount)); dialog.current?.close(); requestAnimationFrame(() => summary.current?.focus()) }}>Confirm change</button></div>
    </dialog>
  </>
}
