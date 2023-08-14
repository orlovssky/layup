import LOCALE from '../constants/LOCALE'

const KEY = 'layup-locale'

export const getLocal = () => {
  return localStorage.getItem(KEY) as LOCALE
}

export const setLocal = (value: LOCALE) => {
  if (Object.values(LOCALE).includes(value)) {
    localStorage.setItem(KEY, value)
  }
}
