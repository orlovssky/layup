export { default as ThemeToggle } from './ui/Toggle'

import { default as MODE } from './lib/constants/MODE'
import { getLocal } from './lib/utils/localStorage'

const localMode = getLocal()

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
