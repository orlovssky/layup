import { LOCALE } from 'entities/locale'
import { nanoid } from 'nanoid'

import stretchingLetters from '../static/stretchingLetters'

export default () => ({
  map: new Map(),
  [LOCALE.ENGLISH]: stretchingLetters[LOCALE.ENGLISH].paths.map(
    (letter, letterIndex) => ({
      id: `${nanoid()}-${letterIndex}`,
      tween: null,
      ...letter,
    }),
  ),
  [LOCALE.RUSSIAN]: stretchingLetters[LOCALE.RUSSIAN].paths.map(
    (letter, letterIndex) => ({
      id: `${nanoid()}-${letterIndex}`,
      tween: null,
      ...letter,
    }),
  ),
})
