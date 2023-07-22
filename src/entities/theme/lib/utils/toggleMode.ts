import { MODE } from '../constants/MODE'

import getMode from './getMode'

export default () => {
  document.documentElement.setAttribute(
    'data-theme',
    getMode() === MODE.DARK ? MODE.LIGHT : MODE.DARK,
  )
}
