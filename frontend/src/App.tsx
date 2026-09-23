import { useState } from 'react'
import { Header } from './components/Header'
import { ClassDiscovery } from './components/ClassDiscovery'
import { ClassSchedule } from './components/ClassSchedule'
import { HeroMotion, SessionGuide } from './components/Motion'
import { memberships, trainers } from './data/content'
import type { Category } from './data/content'

function App() {
  const [category, setCategory] = useState<Category>('All classes')
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div id="home">
        <Header />
        <main id="main">
          <HeroMotion>
            <div className="hero-track hero-track-one" aria-hidden="true" /><div className="hero-track hero-track-two" aria-hidden="true" />
            <div className="hero-heading page-width"><p className="hero-eyebrow"><span /> Good movement. Better company.</p><h1 id="hero-title">FIND YOUR FORM.</h1><p className="hero-description">For the first-timers. The one-more-reppers.<br />And everyone finding their own pace.</p><a className="button button-orange" href="#classes">Find your class <span aria-hidden="true">↗</span></a></div>
            <div className="hero-scene page-width"><span className="hero-sticker">ALL PACES.<br />ALL PEOPLE.</span><img className="hero-art" src="/images/form-movement-illustration.png" width="1536" height="1024" fetchPriority="high" alt="Three people lifting, stretching, and taking a break together, illustrated in orange and sky blue" /><span className="hero-side-note">A little stronger.<br />A lot more you.<svg viewBox="0 0 80 70" fill="none" aria-hidden="true"><path d="M8 8C62 4 77 38 29 57M29 57L44 58M29 57L35 42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg></span></div>
            <div className="hero-baseline page-width"><span>Come as you are. Leave a little brighter.</span><a href="#classes">Let’s move <span aria-hidden="true">↓</span></a></div>
          </HeroMotion>
          <section className="intro-strip" aria-label="Our approach"><div className="page-width"><span className="asterisk" aria-hidden="true">✳</span><p>NOT A NEW YOU.<br />JUST MORE YOU.</p><div>A good session isn’t about becoming someone else. It’s finding what makes you feel strong, supported, and ready for the rest of your day.</div></div></section>
          <ClassDiscovery onSelectCategory={setCategory} />
          <ClassSchedule category={category} onSelectCategory={setCategory} />
          <SessionGuide />
          <section id="trainers" className="trainers-section section-space" aria-labelledby="trainers-title">
            <div className="page-width">
              <div className="community-intro"><div><span className="section-kicker">You don’t have to do it alone</span><h2 id="trainers-title">GOOD PEOPLE.<br />GREAT ENERGY.</h2><p>Someone in your corner. Someone who remembers your name. Someone who celebrates that extra rep with you.</p><a href="#coach-list" className="button button-dark">Meet your coaches <span aria-hidden="true">↓</span></a></div><div className="community-photo"><img src="/images/form-training.png" alt="People training together in a bright, welcoming gym" width="2164" height="727" loading="lazy" /><span>YOUR KIND OF PEOPLE.</span></div></div>
              <div id="coach-list" className="trainer-grid grid gap-6 md:grid-cols-3">{trainers.map((trainer, index) => <article className="trainer" key={trainer.name}><div className={`trainer-avatar avatar-${index}`} aria-hidden="true">{trainer.initials}</div><span className="trainer-specialty">{trainer.specialty}</span><h3>{trainer.name}</h3><p>{trainer.description}</p></article>)}</div>
            </div>
          </section>
          <section id="membership" className="membership-section page-width section-space" aria-labelledby="membership-title">
            <div className="section-intro"><div><span className="section-kicker">A little commitment goes a long way</span><h2 id="membership-title">MAKE IT<br />YOUR REGULAR.</h2></div><div><p>A few sessions or a full-on routine.<br />Find the rhythm that fits your life.</p><p className="sample-note">Sample memberships and pricing.</p></div></div>
            <div className="membership-grid grid gap-5 md:grid-cols-3">{memberships.map((membership) => <article className={`membership-plan ${membership.featured ? 'membership-featured' : ''}`} key={membership.name}><div className="plan-heading"><h3>{membership.name}</h3>{membership.featured && <span className="plan-label">A steady rhythm</span>}</div><p className="plan-description">{membership.description}</p><p className="plan-price"><span className="currency">₦</span>{membership.price}<span className="billing-period">/ month</span></p><ul>{membership.features.map(feature => <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>)}</ul><a className="plan-link" href="#schedule">Explore the sample classes <span aria-hidden="true">↗</span></a></article>)}</div>
          </section>
          <section className="closing-section" aria-labelledby="closing-title"><div className="page-width closing-inner"><span className="closing-orbit" aria-hidden="true" /><p>No perfect moment. Just this one.</p><h2 id="closing-title">LESS SCROLL.<br />MORE STRETCH.</h2><a className="button button-dark" href="#classes">Find your first class <span aria-hidden="true">↗</span></a></div></section>
        </main>
        <footer className="site-footer"><div className="page-width"><div className="footer-main"><a href="#home" aria-label="FORM home"><img src="/brand/form-wordmark-light.svg" alt="FORM" width="464" height="132" /></a><p>Find your form.<br />Keep showing up.</p><nav aria-label="Footer navigation"><a href="#classes">Classes</a><a href="#trainers">Trainers</a><a href="#membership">Membership</a></nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} FORM</span><p>Portfolio concept. Classes, trainers, and prices are illustrative. Bookings are not open.</p><a href="#home">Back to top ↑</a></div></div></footer>
      </div>
    </>
  )
}

export default App
