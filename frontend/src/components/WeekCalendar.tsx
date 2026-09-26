import { days } from '../data/content'
import type { ClassPreview, Day } from '../data/content'

export function WeekCalendar({ sessions, day, onSelect }: {
  sessions: ClassPreview[]
  day: Day | 'All week'
  onSelect: (session: ClassPreview) => void
}) {
  const visibleDays = day === 'All week' ? days : [day]
  return <>
    {day === 'All week' && <p className="calendar-hint" id="calendar-help">Monday to Sunday. Scroll sideways to explore the week, or choose List view.</p>}
    <div className={`week-calendar ${day !== 'All week' ? 'single-day-calendar' : ''}`} role="region" aria-label="Weekly class calendar" aria-describedby={day === 'All week' ? 'calendar-help' : undefined} tabIndex={0}>
      <div className="calendar-days">
        {visibleDays.map(value => {
          const classes = sessions.filter(session => session.day === value)
          return <section className="calendar-day" key={value} aria-label={`${value} classes`}>
            <header><h3>{value}</h3><span>{classes.length} {classes.length === 1 ? 'class' : 'classes'}</span></header>
            {classes.length ? <ul>{classes.map(session => <li key={session.id}>
              <button className={`calendar-class discipline-${session.category.toLowerCase()}`} onClick={() => onSelect(session)} aria-label={`View ${session.name}, ${session.day} at ${session.time}`}>
                <span className="calendar-time"><time>{session.time}</time><span>{session.duration} min</span></span>
                <span className="calendar-discipline">{session.category}</span>
                <strong>{session.name}</strong>
                <span className="calendar-coach">With {session.trainer}</span>
                <span className="calendar-details">Class details <span aria-hidden="true">↗</span></span>
              </button>
            </li>)}</ul> : <p className="calendar-day-empty">No sessions<br />in this selection.</p>}
          </section>
        })}
      </div>
    </div>
  </>
}
