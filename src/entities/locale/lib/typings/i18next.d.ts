// noinspection JSUnusedGlobalSymbols

import 'i18next'

import LOCALE from '../constants/LOCALE'

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false
    language: LOCALE
  }
}
