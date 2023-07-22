import { MODE } from '../constants/MODE'

const KEY = 'layup-theme-mode'

export const getLocalMode = () => {
  const mode = localStorage.getItem(KEY) as MODE

  if (Object.values(MODE).includes(mode)) {
    return mode
  }
}

export const setLocalMode = (value: MODE) => {
  if (Object.values(MODE).includes(value)) {
    localStorage.setItem(KEY, value)
  }
}
