import { LOCALE } from '../constants/LOCALE'

const KEY = 'layup-locale'

export const getLocal = () => {
  const locale = localStorage.getItem(KEY) as LOCALE

  if (Object.values(LOCALE).includes(locale)) {
    return locale
  }
}

export const setLocal = (value: LOCALE) => {
  localStorage.setItem(KEY, value)
}
