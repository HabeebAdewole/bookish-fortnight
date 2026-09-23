import { categories, classes } from '../data/content'
import type { Category } from '../data/content'

export function ClassSchedule({ category, onSelectCategory }: { category: Category; onSelectCategory: (category: Category) => void }) {
  const visibleClasses = classes.filter((item) => category === 'All classes' || item.category === category)

  return (
    <section id="schedule" className="page-width schedule-section" aria-labelledby="classes-title">
      <div className="section-intro">
        <h2 id="classes-title">A WEEK IN MOTION.</h2>
        <p>A little preview of your next routine.</p>
      </div>
      <div className="schedule-toolbar">
        <div className="class-filters" role="group" aria-label="Filter classes by category">
          {categories.map((item) => (
            <button key={item} onClick={() => onSelectCategory(item)} aria-pressed={category === item} className="filter-button">{item}</button>
          ))}
        </div>
        <span className="schedule-note">A sample week at FORM</span>
      </div>
      <p className="sr-only" role="status">{visibleClasses.length} {visibleClasses.length === 1 ? 'class' : 'classes'} shown</p>
      <ul className="class-list">
        {visibleClasses.map((item) => (
          <li className="class-row" key={item.id}>
            <div className="class-time"><span>{item.day}</span><strong>{item.time}</strong></div>
            <div className="class-description"><h3>{item.name}</h3><p>{item.description}</p></div>
            <span className="class-category">{item.category}</span>
            <div className="class-meta"><span>With {item.trainer}</span><span>{item.duration} minutes</span></div>
          </li>
        ))}
      </ul>
    </section>
  )
}
