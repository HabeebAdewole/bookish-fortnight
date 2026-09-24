import { HeroVideo, PhotoCarousel } from '../components/Media'
import { galleries, coachPhotos } from '../data/media'
import { trainers, weeklyClasses } from '../data/content'
import type { Trainer } from '../data/content'

export function CoachesPage() {
  return <>
    <section className="coaches-film-hero"><HeroVideo name="coaches" /><div className="coaches-intro page-width"><p>Coaching at FORM</p><div><h1 tabIndex={-1}>GOOD TRAINING.<br />STARTS WITH GUIDANCE.</h1><p>Get to know the approaches behind our sample sessions. Strength, conditioning, and mobility, each with a clear purpose.</p></div></div></section>
    <section className="coach-directory page-width" aria-label="Coaching team">{trainers.map(coach => <article className="coach-card" key={coach.id}><a className="coach-card-image" href={`#/coaches/${coach.id}`} tabIndex={-1} aria-hidden="true"><img src={coachPhotos[coach.id].src} alt="" width="800" height="1000" loading="lazy" /><span>{coach.category}</span></a><p className="coach-specialty">{coach.specialty}</p><h2><a href={`#/coaches/${coach.id}`}>{coach.name}</a></h2><p>{coach.description}</p><a className="text-link" href={`#/coaches/${coach.id}`}>Meet {coach.name.split(' ')[0]} <span aria-hidden="true">↗</span></a></article>)}</section>
    <p className="directory-note page-width">Coaches are fictional profiles for this portfolio. Stock photography illustrates each training discipline.</p>
    <section className="moving-gallery page-width"><PhotoCarousel slides={galleries.coaches} label="Coaching spaces" /></section>
    <section className="coaching-principles"><div className="page-width"><h2>THE WORK IS YOURS.<br />THE SUPPORT IS HERE.</h2><div><h3>Clear direction</h3><p>Understand the session, the movements, and what you are working towards.</p><h3>Room to learn</h3><p>Ask questions, practise the fundamentals, and find a rhythm you can repeat.</p><a className="button button-white" href="#/classes">Explore the schedule</a></div></div></section>
  </>
}

export function CoachProfile({ coach }: { coach: Trainer }) {
  const sessions = weeklyClasses.filter(item => item.coachId === coach.id)
  const firstName = coach.name.split(' ')[0]
  return <>
    <section className="profile-hero profile-film-hero"><HeroVideo key={coach.id} name={coach.id.split("-")[0]} /><div className="profile-heading"><a className="profile-back" href="#/coaches">← All coaches</a><p>{coach.specialty}</p><h1 tabIndex={-1}>{coach.name.split(' ').map(name => <span key={name}>{name}</span>)}</h1><p className="profile-statement">{coach.description}</p><a className="button button-dark" href={`#/classes?coach=${coach.id}`}>View {firstName}’s sessions</a><small>Fictional coach profile. Film illustrates the training discipline.</small></div></section>
    <section className="profile-body page-width"><div><p className="section-caption">The approach</p><h2>BUILD WITH<br />PURPOSE.</h2><p>{coach.approach}</p><h3>Inside a session</h3><p>{coach.session}</p></div><aside className="coach-focus" aria-labelledby="focus-heading"><h3 id="focus-heading">Training focus</h3><ul>{coach.focus.map(item => <li key={item}>{item}</li>)}</ul><a href={`#/classes?category=${encodeURIComponent(coach.category)}`} className="text-link">Explore {coach.category.toLowerCase()} <span aria-hidden="true">↗</span></a></aside></section>
    <section className="moving-gallery page-width"><PhotoCarousel key={coach.id} slides={galleries[coach.id]} label={`${firstName} training focus`} /></section>
    <section className="profile-sessions"><div className="page-width"><div className="section-intro"><h2>TRAIN WITH {firstName.toUpperCase()}.</h2><p>Sample sessions across the week.</p></div><div className="related-sessions">{sessions.slice(0, 3).map(session => <a href={`#/classes?coach=${coach.id}&day=${session.day}`} key={session.id}><span>{session.day} · {session.time}</span><h3>{session.name}</h3><p>{session.duration} minutes / {session.level}</p><span className="related-link">View in schedule <span aria-hidden="true">↗</span></span></a>)}</div><a className="text-link" href={`#/classes?coach=${coach.id}`}>All {sessions.length} sessions with {firstName} <span aria-hidden="true">↗</span></a></div></section>
  </>
}
