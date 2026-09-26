import type { Slide } from '../components/Media'
const photo = (id: number, alt: string): Slide => ({ src: `/images/media/${id}.jpg`, alt })
export const galleries = {
  about: [photo(4716816, 'Equipment arranged across a gym floor'), photo(17227607, 'An open training space with natural light'), photo(9958665, 'Barbells and space for strength training')],
  club: [
    { src: '/images/stock/club.jpg', alt: 'Strength equipment under an industrial gym roof' },
    photo(29526372, 'Weight machines and training space inside a gym'),
    photo(17211446, 'An open gym floor with exercise equipment'),
  ],
  schedule: [
    photo(34043569, 'Athletes training together in a gym'),
    photo(4720822, 'An athlete flipping a tyre during strength training'),
    photo(29149073, 'Benches and equipment ready for a training session'),
  ],
  coaches: [
    photo(13951271, 'An athlete focusing between gym sets'),
    photo(19025674, 'A rack of dumbbells on a gym floor'),
    photo(7031705, 'Cardio equipment in a bright training space'),
  ],
  'amara-okafor': [
    photo(6388516, 'An athlete training in a gym'),
    photo(6455904, 'An athlete lifting a dumbbell'),
    photo(4720794, 'An athlete practising a barbell lift'),
  ],
  'daniel-cole': [
    photo(6455963, 'An athlete working with dumbbells'),
    photo(4720518, 'An athlete preparing chalk before lifting'),
  ],
  'tomi-adeyemi': [
    photo(6303449, 'An athlete practising a seated side stretch'),
    photo(6303444, 'An athlete stretching on a mat'),
  ],
} satisfies Record<string, Slide[]>
export const coachPhotos = {
  'amara-okafor': photo(6455922, 'A coach guiding an athlete through a dumbbell exercise'),
  'daniel-cole': photo(5878697, 'An athlete standing on the gym floor'),
  'tomi-adeyemi': photo(6303446, 'An athlete stretching on a studio mat'),
}
