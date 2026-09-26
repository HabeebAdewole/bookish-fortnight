import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { HeroVideo, PhotoCarousel } from '../components/Media'
import { galleries } from '../data/media'

export function AboutPage() {
  return <>
    <section className="about-hero film-banner story-hero"><HeroVideo name="about" />
      <div className="page-width"><p>About FORM</p><h1 tabIndex={-1}>PROGRESS IS<br />A PRACTICE.</h1><p>A stronger lift. A little more confidence.<br />A reason to come back tomorrow.</p></div>
    </section>
    <section className="page-width section-space about-story">
      <div><p className="section-caption">The way we train</p><h2>START WHERE<br />YOU ARE.</h2></div>
      <div><p className="story-lead">You don’t have to arrive strong. You just need a place to begin.</p><p>FORM is built around a simple idea: purposeful sessions, clear coaching, and room to learn. Lift with control, find your pace, and make recovery part of your routine.</p><p>Strength, conditioning, and mobility belong together. Our concept club brings them into one training week, so you can find a rhythm that fits your life.</p><a className="text-link" href="#/classes">Find your starting point <span aria-hidden="true">↗</span></a></div>
    </section>
    <section className="training-principles"><div className="page-width"><h2>MORE THAN<br />THE NEXT REP.</h2><div className="principle-grid">
      <article><h3>Technique comes first.</h3><p>Understand the movement before you add the weight. Build a foundation you can return to.</p></article>
      <article><h3>Consistency over intensity.</h3><p>Choose a routine you can repeat. The sessions you come back for are the ones that count.</p></article>
      <article><h3>Support, without pressure.</h3><p>Ask questions. Take your time. Training should leave room for different starting points.</p></article>
    </div></div></section>
    <section className="page-width section-space"><div className="section-intro"><h2>ROOM TO<br />FIND YOUR FORM.</h2><p>Space to lift, move, and reset. A look at the training environments behind our concept club.</p></div><PhotoCarousel slides={galleries.about} label="Spaces that inspire FORM" /><p className="sample-note media-note">Stock photography illustrates the concept. FORM is not an operating gym.</p></section>
    <section className="about-coaching page-width"><img src="/images/media/4804024.jpg" alt="An athlete wrapping his hands before training" loading="lazy" width="1000" height="1000" /><div><p className="section-caption">Guidance for every session</p><h2>YOUR EFFORT.<br />SHARED PURPOSE.</h2><p>Get to know the coaching approaches behind our sample classes, from your first lift to a more focused training week.</p><a className="button button-dark" href="#/coaches">Meet the coaches</a></div></section>
    <section className="closing-section page-width"><h2>LET’S FIND<br />YOUR START.</h2><a className="button button-dark" href="#/contact">Talk to FORM</a></section>
  </>
}

type Fields = { name: string; email: string; topic: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>
const initial: Fields = { name: '', email: '', topic: '', message: '' }

export function ContactPage() {
  const [fields, setFields] = useState<Fields>(initial)
  const [errors, setErrors] = useState<Errors>({})
  const [complete, setComplete] = useState(false)
  const form = useRef<HTMLFormElement>(null)
  const confirmation = useRef<HTMLDivElement>(null)
  function update(key: keyof Fields, value: string) {
    setFields(previous => ({ ...previous, [key]: value }))
    setErrors(previous => ({ ...previous, [key]: undefined }))
    setComplete(false)
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next: Errors = {}
    if (!fields.name.trim()) next.name = 'Enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) next.email = 'Enter a valid email address.'
    if (!fields.topic) next.topic = 'Choose what you would like to ask about.'
    if (fields.message.trim().length < 10) next.message = 'Write at least 10 characters so we can understand your question.'
    setErrors(next)
    const first = Object.keys(next)[0]
    if (first) { form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus(); return }
    setComplete(true)
    requestAnimationFrame(() => confirmation.current?.focus())
  }
  return <>
    <section className="contact-hero film-banner story-hero"><HeroVideo name="contact" /><div className="page-width"><p>Contact FORM</p><h1 tabIndex={-1}>YOUR FIRST STEP.<br />A CONVERSATION.</h1><p>Finding a class. Choosing a plan.<br />Getting comfortable with the gym.</p></div></section>
    <section className="page-width section-space contact-layout">
      <div className="contact-intro"><p className="section-caption">Let’s talk training</p><h2>WHAT’S ON<br />YOUR MIND?</h2><p>Whether you’re starting out or finding your way back, there’s room for your questions.</p><div className="contact-shortcuts"><a href="#/classes">Find a class <span aria-hidden="true">↗</span></a><a href="#/membership">Compare memberships <span aria-hidden="true">↗</span></a><a href="#/coaches">Get to know the coaches <span aria-hidden="true">↗</span></a></div><div className="visit-note"><h3>Visiting the club</h3><p>FORM is a portfolio concept. There is no physical location, reception number, or opening schedule yet. Visits and bookings are not available.</p></div></div>
      <form ref={form} className="enquiry-form" noValidate onSubmit={submit} aria-labelledby="enquiry-title">
        <h3 id="enquiry-title">Start a conversation</h3><p id="demo-note" className="form-note">Demo form. Try it with sample details. Nothing is sent or saved.</p>
        <div className="form-pair">{(['name', 'email'] as const).map(key => <div className="form-field" key={key}><label htmlFor={`contact-${key}`}>{key === 'name' ? 'Your name' : 'Email address'}</label><input id={`contact-${key}`} name={key} type={key === 'email' ? 'email' : 'text'} autoComplete={key} value={fields[key]} maxLength={key === 'name' ? 100 : 254} required aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `${key}-error` : undefined} onChange={event => update(key, event.target.value)} />{errors[key] && <p className="field-error" id={`${key}-error`}>{errors[key]}</p>}</div>)}</div>
        <div className="form-field"><label htmlFor="contact-topic">What can we help with?</label><select id="contact-topic" name="topic" required value={fields.topic} aria-invalid={!!errors.topic} aria-describedby={errors.topic ? 'topic-error' : undefined} onChange={event => update('topic', event.target.value)}><option value="">Choose a topic</option><option>Classes and getting started</option><option>Membership plans</option><option>Coaching</option><option>Something else</option></select>{errors.topic && <p className="field-error" id="topic-error">{errors.topic}</p>}</div>
        <div className="form-field"><label htmlFor="contact-message">Your message</label><textarea id="contact-message" name="message" rows={5} maxLength={1500} required value={fields.message} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : 'message-hint'} onChange={event => update('message', event.target.value)} /><p id="message-hint" className="form-note">10–1,500 characters. Please leave out sensitive personal information.</p>{errors.message && <p className="field-error" id="message-error">{errors.message}</p>}</div>
        <button className="button button-dark" type="submit" aria-describedby="demo-note">Try demo enquiry <span aria-hidden="true">↗</span></button>
        {complete && <div ref={confirmation} className="enquiry-confirmation" tabIndex={-1} role="status"><h3>Demo complete.</h3><p>Your enquiry passed the form checks. No message was sent and your details have not been saved.</p><button type="button" className="text-link" onClick={() => { setFields(initial); setErrors({}); setComplete(false); form.current?.querySelector<HTMLInputElement>('input')?.focus() }}>Start again</button></div>}
      </form>
    </section>
    <section className="contact-questions"><div className="page-width"><div><p className="section-caption">Before your first session</p><h2>A LITTLE<br />MORE CLARITY.</h2></div><div className="contact-faq"><details><summary>Which class should I start with?</summary><p>Explore Strength foundations in the sample schedule. Each class detail includes the level, duration, and what to expect.</p><a className="text-link" href="#/classes">Explore classes</a></details><details><summary>Can I visit or book a session?</summary><p>Not yet. FORM is a frontend demonstration, so the classes, coaches, and membership plans are illustrative.</p></details><details><summary>Where can I compare the plans?</summary><p>The membership page compares the sample monthly plans and their included sessions.</p><a className="text-link" href="#/membership">View memberships</a></details></div></div></section>
  </>
}
