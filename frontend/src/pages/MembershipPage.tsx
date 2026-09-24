import { HeroVideo } from '../components/Media'
import { memberships } from '../data/content'

const comparison = [
  { label: 'Coached classes each month', values: ['4 sessions', '8 sessions', 'Unlimited'] },
  { label: 'Strength, conditioning & mobility', values: ['Included', 'Included', 'Included'] },
  { label: 'Monthly progress check-in', values: ['Not included', 'Included', 'Included'] },
]
const questions = [
  { question: 'How do I choose a plan?', answer: 'Start with how often you want to train. Foundation includes four coached classes a month, Rhythm includes eight, and Everyday gives you unlimited coached classes. Explore the timetable to see which sessions fit your week.' },
  { question: 'Which classes are included?', answer: 'All three sample plans cover strength, conditioning, and mobility classes. Open a class in the schedule to see its duration, training space, coach, and what to expect.' },
  { question: 'Can I start if I am new to training?', answer: 'The sample timetable includes Strength foundations, plus sessions marked for all levels. Read the class details and the coach’s approach to find a starting point that feels right for you.' },
  { question: 'Is personal training included?', answer: 'These plans describe coached group classes. Dedicated one-to-one personal training is not included in the listed sample memberships.' },
  { question: 'Can I join or pay online now?', answer: 'Not yet. FORM is a portfolio concept and these memberships are illustrative. You can explore the classes and coaches, but memberships, payments, and class bookings are not available.' },
  { question: 'What are the cancellation and renewal terms?', answer: 'Commercial membership terms have not been set for this concept. Cancellation, renewal, and unused-session policies will need to be defined before any real membership service launches.' },
]

export function MembershipPage() {
  return <>
    <section className="membership-hero film-banner">
      <HeroVideo name="membership" />
      <div className="page-width"><p>Membership at FORM</p><h1 tabIndex={-1}>MAKE TRAINING<br />PART OF YOUR LIFE.</h1><p>A few focused sessions or a full weekly routine.<br />Find the commitment that works for you.</p><a className="button button-white" href="#/membership" onClick={event => { event.preventDefault(); document.getElementById('membership-plans')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); document.getElementById('membership-plans')?.focus({ preventScroll: true }) }}>Explore the plans</a></div>
    </section>
    <section id="membership-plans" tabIndex={-1} className="membership-detail-plans page-width section-space" aria-labelledby="plans-title">
      <div className="section-intro"><h2 id="plans-title">YOUR ROUTINE.<br />YOUR MEMBERSHIP.</h2><p>Monthly plans in Nigerian naira.<br /><span className="sample-note">Illustrative pricing. Memberships are not currently for sale.</span></p></div>
      <div className="membership-grid">{memberships.map((plan, index) => <article className={`membership-plan ${plan.featured ? 'membership-featured' : ''}`} key={plan.name}><div className="plan-heading"><h3>{plan.name}</h3>{plan.featured && <span>A consistent weekly routine</span>}</div><p className="plan-price">₦{plan.price}<span> / month</span></p><p className="membership-fit">{['Make space for a weekly session.', 'Build a rhythm with more coached sessions.', 'Make the most of the full timetable.'][index]}</p><ul>{plan.features.map(feature => <li key={feature}>{feature}</li>)}</ul><a className="button" href="#/classes">Explore classes</a></article>)}</div>
    </section>
    <section className="membership-comparison" aria-labelledby="compare-title"><div className="page-width"><div className="section-intro"><h2 id="compare-title">THE DETAILS,<br />SIDE BY SIDE.</h2><p>Every plan gives you access to all three training disciplines. The difference is how often you train and the check-in support included.</p></div><p className="comparison-hint" id="comparison-help">On smaller screens, scroll across to compare all plans.</p><div className="comparison-scroll" role="region" aria-label="Compare membership inclusions" aria-describedby="comparison-help" tabIndex={0}><table><caption className="sr-only">FORM sample monthly membership comparison</caption><thead><tr><th scope="col">What is included</th>{memberships.map(plan => <th scope="col" key={plan.name}>{plan.name}<span>₦{plan.price} / month</span></th>)}</tr></thead><tbody>{comparison.map(row => <tr key={row.label}><th scope="row">{row.label}</th>{row.values.map((value, index) => <td key={memberships[index].name}>{value}</td>)}</tr>)}</tbody></table></div><p className="comparison-note">Sample group-class memberships. One-to-one personal training is separate.</p></div></section>
    <section className="membership-faq page-width section-space" aria-labelledby="faq-title"><div><p className="section-caption">Before you begin</p><h2 id="faq-title">A LITTLE<br />MORE CLARITY.</h2><p>Get familiar with the plans, then explore the people and sessions behind them.</p><a className="text-link" href="#/coaches">Meet the coaches <span aria-hidden="true">↗</span></a></div><div className="faq-list">{questions.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div></section>
    <section className="membership-next"><div className="page-width"><h2>FIND YOUR NEXT SESSION.</h2><p>Start with a class that fits your week.</p><a className="button button-white" href="#/classes">Explore the schedule</a></div></section>
  </>
}
