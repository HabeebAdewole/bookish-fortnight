import { useState } from 'react'
import { HeroVideo, PhotoCarousel } from '../components/Media'
import { galleries } from '../data/media'
import { Header } from '../components/Header'
import { ClassSchedule } from '../components/ClassSchedule'
import { memberships, trainers } from '../data/content'
import type { Category } from '../data/content'

const formats: { name: Exclude<Category, 'All classes'>; image: string; alt: string; description: string; detail: string }[] = [
  { name: 'Strength', image: 'strength.jpg', alt: 'Athlete preparing to lift a loaded barbell', description: 'Build strength. Own the fundamentals.', detail: 'Technique-led lifting · 50 min' },
  { name: 'Conditioning', image: 'group.jpg', alt: 'Group training with dumbbells in a studio', description: 'Train your engine. Find your pace.', detail: 'Full-body training · 45 min' },
  { name: 'Mobility', image: 'mobility.jpg', alt: 'A group stretching together on studio mats', description: 'Move freely. Recover with purpose.', detail: 'Mobility and recovery · 40 min' },
]

function Home() {
  const [category, setCategory] = useState<Category>('All classes')
  const [showFilm, setShowFilm] = useState(false)
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div id="home">
        <Header />
        <main id="main">
          <section className="training-hero" aria-labelledby="hero-title">
            <HeroVideo name="home" />
            <div className="hero-shade" />
            <div className="hero-content page-width">
              <p className="hero-intro">Strength. Conditioning. A place to progress.</p>
              <h1 id="hero-title">BUILT THROUGH<br />EVERY REP.</h1>
              <p className="hero-description">Purposeful training. Hands-on coaching.<br />Make your next session count.</p>
              <div className="hero-actions"><a className="button button-white" href="#/classes">Explore the schedule</a><a className="text-link" href="#membership">View memberships <span aria-hidden="true">↗</span></a></div>
            </div>
            <div className="hero-bottom page-width"><span>Find your form. Build from here.</span><a href="#classes">Explore FORM <span aria-hidden="true">↓</span></a></div>
          </section>

          <section id="classes" className="section-space page-width" aria-labelledby="formats-title">
            <div className="section-intro"><h2 id="formats-title">TRAIN WITH<br />INTENTION.</h2><p>Three ways to move forward. Build your strength, challenge your endurance, and make time to recover.</p></div>
            <div className="format-grid">{formats.map(format => <a className="format-card" key={format.name} href="#schedule" onClick={() => setCategory(format.name)}><div className="format-image"><img src={`/images/stock/${format.image}`} alt={format.alt} width="800" height="1000" loading="lazy" /><span className="format-action" aria-hidden="true">↗</span></div><div className="format-heading"><h3>{format.name}</h3><span>{format.detail}</span></div><p>{format.description}</p></a>)}</div>
          </section>

          <div className="schedule-wrap"><ClassSchedule category={category} onSelectCategory={setCategory} /></div>

          <section id="trainers" className="coaching-section" aria-labelledby="coaching-title">
            <div className="coaching-image"><img src="/images/stock/coaching.jpg" alt="A personal trainer guiding an athlete through an exercise" width="1400" height="1400" loading="lazy" /><span>Coaching in focus</span></div>
            <div className="coaching-copy"><p className="section-caption">Personal training</p><h2 id="coaching-title">YOUR GOALS.<br />A CLEAR PLAN.</h2><p>Learn how to lift with control, train with consistency, and progress at a pace that works for you. Start with technique. Build from there.</p><div className="coach-list">{trainers.map(trainer => <div className="coach-row" key={trainer.name}><h3><a href={`#/coaches/${trainer.id}`}>{trainer.name}</a></h3><span>{trainer.specialty}</span></div>)}</div><p className="sample-note">Illustrative coaching team. Photography shows stock models.</p><a className="text-link" href="#/coaches">Meet the coaching team <span aria-hidden="true">↗</span></a></div>
          </section>

          <section id="club" className="club-section section-space page-width" aria-labelledby="club-title"><div className="section-intro"><div><p className="section-caption">The training floor</p><h2 id="club-title">SPACE TO<br />PUT IN THE WORK.</h2></div><p>Free weights. Room to move. Space to reset. A considered environment for every part of your session.</p></div><PhotoCarousel slides={galleries.club} label="The club" className="club-gallery" /><div className="club-bottom"><p>A look at the spaces that inspire FORM.<br /><span>Stock imagery for our concept club.</span></p><button className="text-link" aria-expanded={showFilm} aria-controls="club-film" onClick={() => setShowFilm(!showFilm)}>{showFilm ? 'Close gym film' : 'Watch gym film'} <span aria-hidden="true">{showFilm ? '−' : '▷'}</span></button></div><div id="club-film" hidden={!showFilm}>{showFilm && <div className="film-panel"><video controls playsInline preload="metadata" poster="/images/stock/club-film.jpg" aria-label="Film showing gym equipment and the training floor"><source src="/images/stock/club-film.mp4" type="video/mp4" />Your browser does not support this video.</video><p>Gym-space inspiration. Stock film by Анатолий / Pexels.</p></div>}</div></section>

          <section id="membership" className="membership-section section-space" aria-labelledby="membership-title"><div className="page-width"><div className="section-intro"><h2 id="membership-title">COMMIT TO<br />YOUR TRAINING.</h2><p>Choose the number of coached sessions that fits your week.<br /><span className="sample-note">Sample monthly plans. Bookings are not open.</span></p></div><div className="membership-grid">{memberships.map(plan => <article className={`membership-plan ${plan.featured ? 'membership-featured' : ''}`} key={plan.name}><div className="plan-heading"><h3>{plan.name}</h3>{plan.featured && <span>Train twice a week</span>}</div><p className="plan-price">₦{plan.price}<span> / month</span></p><ul>{plan.features.map(feature => <li key={feature}>{feature}</li>)}</ul><a className="button" href="#/classes">Explore classes</a></article>)}</div></div></section>

          <section className="closing-section page-width"><h2>YOUR NEXT REP<br />STARTS HERE.</h2><a className="button button-dark" href="#/classes">Find your session</a></section>
        </main>
        <footer className="site-footer"><div className="page-width"><div className="footer-main"><a href="#home" aria-label="FORM home"><img src="/brand/form-wordmark-light.svg" alt="FORM" width="464" height="132" /></a><p>Training with purpose.<br />Progress through practice.</p><nav aria-label="Footer navigation"><a href="#/classes">Classes</a><a href="#/coaches">Coaching</a><a href="#club">The club</a><a href="#membership">Membership</a></nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} FORM</span><p>Portfolio concept. Classes, coaches, facilities, and prices are illustrative.</p><a href="#home">Back to top ↑</a></div></div></footer>
      </div>
    </>
  )
}
export default Home
