export const categories = ['All classes', 'Strength', 'Conditioning', 'Mobility'] as const
export type Category = (typeof categories)[number]

type ClassPreview = {
  id: string
  name: string
  category: Exclude<Category, 'All classes'>
  day: string
  time: string
  duration: number
  trainer: string
  description: string
}

export const classes: ClassPreview[] = [
  { id: 'strength-foundations', name: 'Strength foundations', category: 'Strength', day: 'Monday', time: '07:00', duration: 50, trainer: 'Amara', description: 'Learn the lifts. Build a stronger foundation.' },
  { id: 'full-body-energy', name: 'Full-body energy', category: 'Conditioning', day: 'Tuesday', time: '18:00', duration: 45, trainer: 'Daniel', description: 'A good playlist. A full-body session. Your pace.' },
  { id: 'move-and-reset', name: 'Move & reset', category: 'Mobility', day: 'Wednesday', time: '08:00', duration: 40, trainer: 'Tomi', description: 'Make space to stretch, breathe, and move freely.' },
  { id: 'strength-together', name: 'Strength together', category: 'Strength', day: 'Thursday', time: '18:00', duration: 50, trainer: 'Amara', description: 'Small-group coaching for your next step forward.' },
]

export const trainers = [
  { name: 'Amara Okafor', specialty: 'Strength & technique', initials: 'AO', description: 'Simple cues, steady progress, and a little encouragement when you need it.' },
  { name: 'Daniel Cole', specialty: 'Conditioning & endurance', initials: 'DC', description: 'Feel-good sessions that challenge you at a pace you can make your own.' },
  { name: 'Tomi Adeyemi', specialty: 'Mobility & recovery', initials: 'TA', description: 'Thoughtful movement to help you find more ease, in and out of the gym.' },
]

export const memberships = [
  { name: 'Foundation', price: '25,000', description: 'Start a routine that feels like you.', features: ['4 coached classes each month', 'All class styles', 'A welcoming first session'], featured: false },
  { name: 'Rhythm', price: '40,000', description: 'Make movement part of your week.', features: ['8 coached classes each month', 'All class styles', 'A monthly progress check-in'], featured: true },
  { name: 'Everyday', price: '60,000', description: 'More room to move, on your terms.', features: ['Unlimited coached classes', 'All class styles', 'A monthly progress check-in'], featured: false },
]
