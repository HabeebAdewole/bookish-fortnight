export const categories = ['All classes', 'Strength', 'Conditioning', 'Mobility'] as const
export type Category = (typeof categories)[number]
export type Discipline = Exclude<Category, 'All classes'>
export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const
export type Day = (typeof days)[number]

export const trainers = [
  {
    id: 'amara-okafor', name: 'Amara Okafor', specialty: 'Strength & technique', initials: 'AO', category: 'Strength', image: 'strength.jpg', imageAlt: 'An athlete preparing a barbell lift',
    description: 'Clear cues. Consistent practice. Strength built one session at a time.',
    approach: 'Amara’s sample programme begins with the foundations: learning the movement, choosing a manageable load, and making each repetition count. Sessions pair focused practice with time for individual feedback.',
    focus: ['Lifting fundamentals', 'Controlled repetitions', 'Steady progression'],
    session: 'A coached warm-up, a focused strength block, and time to review your technique. Expect clear demonstrations and room to ask questions.',
  },
  {
    id: 'daniel-cole', name: 'Daniel Cole', specialty: 'Conditioning & endurance', initials: 'DC', category: 'Conditioning', image: 'group.jpg', imageAlt: 'Athletes training with dumbbells in a group class',
    description: 'Structured circuits and a pace you can make your own.',
    approach: 'Daniel’s sample sessions combine straightforward movements with timed work and recovery. The emphasis is on finding a repeatable pace, understanding the session, and keeping your training consistent.',
    focus: ['Full-body circuits', 'Pacing and consistency', 'Group training'],
    session: 'Start with a movement briefing, work through a series of coached stations, and finish with a slower recovery block. Each session includes options for different experience levels.',
  },
  {
    id: 'tomi-adeyemi', name: 'Tomi Adeyemi', specialty: 'Mobility & recovery', initials: 'TA', category: 'Mobility', image: 'mobility.jpg', imageAlt: 'A group practising floor-based mobility on mats',
    description: 'Make time for movement beyond the weight room.',
    approach: 'Tomi’s sample sessions make space for slower, more deliberate practice. Simple guided sequences bring attention to how you move, with time to settle into each part of the session.',
    focus: ['Guided mobility', 'Floor-based movement', 'Recovery sessions'],
    session: 'A quiet start, guided movement sequences, and an unhurried finish. Bring comfortable clothing and a willingness to work at your own pace.',
  },
] as const
export type Trainer = (typeof trainers)[number]
export type CoachId = Trainer['id']

export type ClassPreview = {
  id: string
  name: string
  category: Discipline
  day: Day
  time: string
  duration: number
  trainer: string
  coachId: CoachId
  description: string
  level: string
  location: string
  equipment: string
}

export const classes: ClassPreview[] = [
  { id: 'strength-foundations', name: 'Strength foundations', category: 'Strength', day: 'Monday', time: '07:00', duration: 50, trainer: 'Amara', coachId: 'amara-okafor', description: 'Learn the lifts. Build a stronger foundation.', level: 'Foundations', location: 'Strength floor', equipment: 'Barbells and free weights' },
  { id: 'full-body-energy', name: 'Full-body conditioning', category: 'Conditioning', day: 'Tuesday', time: '18:00', duration: 45, trainer: 'Daniel', coachId: 'daniel-cole', description: 'Coached stations, timed intervals, and a pace you can own.', level: 'All levels', location: 'Training studio', equipment: 'Dumbbells and bodyweight' },
  { id: 'move-and-reset', name: 'Move & reset', category: 'Mobility', day: 'Wednesday', time: '08:00', duration: 40, trainer: 'Tomi', coachId: 'tomi-adeyemi', description: 'A slower session of guided mobility and floor-based movement.', level: 'All levels', location: 'Movement studio', equipment: 'Mats and blocks' },
  { id: 'strength-together', name: 'Strength together', category: 'Strength', day: 'Thursday', time: '18:00', duration: 50, trainer: 'Amara', coachId: 'amara-okafor', description: 'Small-group lifting with time for technique and feedback.', level: 'All levels', location: 'Strength floor', equipment: 'Barbells and free weights' },
]

export const weeklyClasses: ClassPreview[] = ([
  ...classes,
  { ...classes[2], id: 'monday-mobility', day: 'Monday', time: '18:30' },
  { ...classes[0], id: 'tuesday-strength', day: 'Tuesday', time: '07:00' },
  { ...classes[1], id: 'wednesday-conditioning', day: 'Wednesday', time: '18:00' },
  { ...classes[2], id: 'thursday-mobility', day: 'Thursday', time: '07:30' },
  { ...classes[0], id: 'friday-strength', day: 'Friday', time: '07:00' },
  { ...classes[1], id: 'friday-conditioning', day: 'Friday', time: '17:30' },
  { ...classes[3], id: 'saturday-strength', day: 'Saturday', time: '09:00' },
  { ...classes[2], id: 'saturday-mobility', day: 'Saturday', time: '10:30' },
] satisfies ClassPreview[]).sort((a, b) => days.indexOf(a.day) - days.indexOf(b.day) || a.time.localeCompare(b.time))

export const memberships = [
  { name: 'Foundation', price: '25,000', description: 'Start a routine that feels like you.', features: ['4 coached classes each month', 'All class styles', 'A welcoming first session'], featured: false },
  { name: 'Rhythm', price: '40,000', description: 'Make movement part of your week.', features: ['8 coached classes each month', 'All class styles', 'A monthly progress check-in'], featured: true },
  { name: 'Everyday', price: '60,000', description: 'More room to move, on your terms.', features: ['Unlimited coached classes', 'All class styles', 'A monthly progress check-in'], featured: false },
]
