import { Header } from './components/Header'
import { ClassSchedule } from './components/ClassSchedule'
import { memberships, trainers } from './data/content'

function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div id="home">
        <Header />
        <main id="main">
          <section className="hero page-width" aria-labelledby="hero-title">
            <div className="hero-intro">
              <h1 id="hero-title">Find your form.</h1>
              <div className="hero-copy">
                <p>A little stronger. A little more you.<br />Movement for wherever you are today.</p>
                <a className="button button-orange" href="#classes">Explore classes <span className="button-plus" aria-hidden="true">+</span></a>
              </div>
            </div>
            <div className="hero-image-wrap">
              <img className="hero-image" src="/images/form-training.png" alt="A small group training with kettlebells and dumbbells in a sunlit gym" width="2164" height="727" fetchPriority="high" />
              <span className="hero-image-label">Show up as you are.</span>
            </div>
            <div className="hero-caption">
              <p>Strength. Movement. Community.</p>
              <span>A place to make progress, together.</span>
            </div>
          </section>

          <ClassSchedule />

          <section id="trainers" className="trainers-section" aria-labelledby="trainers-title">
            <div className="page-width section-space">
              <div className="section-intro">
                <h2 id="trainers-title">Good people.<br />Better sessions.</h2>
                <p>Someone to guide you, challenge you, and remember your name. Meet your corner of the gym.</p>
              </div>
              <div className="grid gap-10 md:grid-cols-3 md:gap-12">
                {trainers.map((trainer) => (
                  <article className="trainer" key={trainer.name}>
                    <div className="trainer-topline"><span className="trainer-monogram" aria-hidden="true">{trainer.initials}</span><span>{trainer.specialty}</span></div>
                    <h3>{trainer.name}</h3>
                    <p>{trainer.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="membership" className="page-width section-space" aria-labelledby="membership-title">
            <div className="section-intro">
              <h2 id="membership-title">Find your rhythm.<br />Make it a routine.</h2>
              <div><p>Start small or go all in. Choose the space movement takes in your week.</p><p className="sample-note">Sample memberships and pricing.</p></div>
            </div>
            <div className="membership-grid grid md:grid-cols-3">
              {memberships.map((membership) => (
                <article className={`membership-plan ${membership.featured ? 'membership-featured' : ''}`} key={membership.name}>
                  <div className="flex items-center justify-between gap-3"><h3>{membership.name}</h3>{membership.featured && <span className="plan-label">Find your flow</span>}</div>
                  <p className="plan-description">{membership.description}</p>
                  <p className="plan-price"><span className="currency">₦</span>{membership.price}<span className="billing-period"> / month</span></p>
                  <ul>{membership.features.map((feature) => <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>)}</ul>
                </article>
              ))}
            </div>
            <div className="membership-footnote"><span>Not sure where to start?</span><a className="text-link" href="#classes">Find a class that feels like you</a></div>
          </section>

          <section className="closing-section" aria-labelledby="closing-title">
            <div className="page-width closing-inner"><h2 id="closing-title">Your next chapter<br />starts with a little movement.</h2><a className="button button-ivory" href="#classes">Explore classes <span aria-hidden="true">+</span></a></div>
          </section>
        </main>
        <footer className="page-width site-footer">
          <div className="footer-main"><a href="#home" aria-label="FORM home"><img src="/brand/form-wordmark-dark.svg" alt="FORM" width="464" height="132" /></a><p>Find your form.<br />Keep showing up.</p><nav aria-label="Footer navigation"><a href="#classes">Classes</a><a href="#trainers">Trainers</a><a href="#membership">Membership</a></nav></div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} FORM</span><p>Portfolio concept. Classes, trainers, and prices are illustrative. Bookings are not open.</p><a href="#home">Back to top</a></div>
        </footer>
      </div>
    </>
  )
}

export default App
