import type { Slide } from '../components/Media'
const photo = (id: number, alt: string): Slide => ({ src: `/images/media/${id}.jpg`, alt })
export const galleries = {
  club: [
    { src: '/images/stock/club.jpg', alt: 'Strength equipment under an industrial gym roof' },
    photo(29526372, 'Weight machines and training space inside a gym'),
    photo(17211446, 'An open gym floor with exercise equipment'),
  ],
  schedule: [
    photo(35341603, 'A group fitness session led by an instructor'),
    photo(24244666, 'An athlete training with a kettlebell'),
    photo(29149073, 'Benches and equipment ready for a training session'),
  ],
  coaches: [
    photo(38777102, 'A coach overseeing a session on gym equipment'),
    photo(19025674, 'A rack of dumbbells on a gym floor'),
    photo(7031705, 'Cardio equipment in a bright training space'),
  ],
  'amara-okafor': [
    photo(4853296, 'An athlete practising a lift with coaching support'),
    photo(17782876, 'An athlete working with dumbbells'),
    photo(20060599, 'An athlete holding a kettlebell on the gym floor'),
  ],
  'daniel-cole': [
    photo(5327476, 'Dumbbell training on the gym floor'),
    photo(36096460, 'An athlete working with weights in a gym'),
  ],
  'tomi-adeyemi': [
    photo(8436465, 'Floor-based stretching on a studio mat'),
    photo(8538962, 'A yoga session in a green outdoor space'),
  ],
} satisfies Record<string, Slide[]>
export const coachPhotos = {
  'amara-okafor': photo(4854250, 'One-to-one guidance during a weight-training session'),
  'daniel-cole': photo(5327469, 'Dumbbell training in a gym'),
  'tomi-adeyemi': photo(37182823, 'Assisted stretching in a studio'),
}
