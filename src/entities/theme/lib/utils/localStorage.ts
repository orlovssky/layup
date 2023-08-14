import MODE from '../constants/MODE'

const KEY = 'layup-theme-mode'

export const getLocal = () => {
  return localStorage.getItem(KEY) as MODE
}

export const setLocal = (value: MODE) => {
  if (Object.values(MODE).includes(value)) {
    localStorage.setItem(KEY, value)
  }
}
