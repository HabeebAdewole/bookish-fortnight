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
    photo(5878697, 'An athlete standing on the training floor'),
    photo(19025674, 'A rack of dumbbells on a gym floor'),
    photo(7031705, 'Cardio equipment in a bright training space'),
  ],
  'amara-okafor': [
    photo(6389084, 'An athlete working out in a gym'),
    photo(6388531, 'An athlete stretching before training'),
    photo(4720794, 'An athlete practising a barbell lift'),
  ],
  'daniel-cole': [
    photo(6388977, 'An athlete warming up beside the gym equipment'),
    photo(4720518, 'An athlete preparing chalk before lifting'),
  ],
  'tomi-adeyemi': [
    photo(6516190, 'An athlete warming up with a standing stretch'),
    photo(8846583, 'An athlete stretching on a mat'),
  ],
} satisfies Record<string, Slide[]>
export const coachPhotos = {
  'amara-okafor': photo(6388516, 'An athlete focused during a gym session'),
  'daniel-cole': photo(13951271, 'Portrait of an athlete on the gym floor'),
  'tomi-adeyemi': photo(6388980, 'An athlete stretching in a gym'),
}
