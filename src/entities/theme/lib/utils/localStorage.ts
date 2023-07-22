import { MODE } from '../constants/MODE'

const KEY = 'layup-theme-mode'

export const getLocal = () => {
  const mode = localStorage.getItem(KEY) as MODE

  if (Object.values(MODE).includes(mode)) {
    return mode
  }
}

export const setLocal = (value: MODE) => {
  localStorage.setItem(KEY, value)
}
