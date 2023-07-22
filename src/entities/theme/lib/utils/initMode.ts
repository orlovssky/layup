import { MODE } from '../constants/MODE'

import { getLocalMode } from './localStorage'

export default () => {
  const localMode = getLocalMode()

  if (localMode) {
    document.documentElement.setAttribute('data-theme', localMode)
  } else {
    const { matches } = window.matchMedia('(prefers-color-scheme: dark)')

    if (matches) {
      document.documentElement.setAttribute('data-theme', MODE.DARK)
    } else {
      document.documentElement.setAttribute('data-theme', MODE.LIGHT)
    }
  }

  setTimeout(() => {
    document.documentElement.style.setProperty(
      'transition',
      'background-color 0.3s ease-in 0s',
    )
  })
}
