import { useTranslation } from 'react-i18next'
import { useRef } from 'react'

import toggleClasses from '../assets/styles/toggle.module.css'
import { LOCALE } from '../lib/constants/LOCALE'
import { setLocal } from '../lib/utils/localStorage'

const Toggle = () => {
  const { i18n } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    const locale =
      i18n.language === LOCALE.RUSSIAN ? LOCALE.ENGLISH : LOCALE.RUSSIAN

    i18n.changeLanguage(locale).then(() => {
      setLocal(locale)
    })
  }

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className={toggleClasses.container}
    >
      <svg
        width="46"
        height="48"
        viewBox="0 0 46 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={
          toggleClasses.ru +
          ` ${
            i18n.language === LOCALE.ENGLISH
              ? toggleClasses.show
              : toggleClasses.hide
          }`
        }
      >
        <path d="M25.3799 38.9628V0C27.9233 0 29.168 0 31.7114 0C31.7114 15.6392 31.7114 23.4318 31.7114 39.071C31.7114 41.3439 32.7937 42.6426 34.9583 42.6426H35.4994C37.664 42.6426 38.8005 41.3439 38.8005 39.071V0C41.2898 0 42.5344 0 45.0778 0V38.9628C45.0778 45.0237 41.9391 48 35.9865 48H34.4171C28.5727 48 25.3799 45.0237 25.3799 38.9628Z" />
        <path d="M6.27734 25.0011C6.27734 34.0924 6.27734 38.6381 6.27734 47.7294C3.73393 47.7294 2.48929 47.7294 0 47.7294C0 28.6268 0 19.1026 0 0C4.38331 0 6.54791 0 10.9312 0C16.8839 0 20.0225 2.97633 20.0225 8.71251V16.451C20.0225 18.6156 19.2649 20.9425 16.8839 22.1871C19.2108 23.3777 20.0225 25.6505 20.0225 28.0316C20.0225 35.9324 20.0225 39.8828 20.0225 47.7835C17.4791 47.7835 16.2345 47.7835 13.7452 47.7835C13.7452 40.0451 13.7452 36.1488 13.7452 28.3563C13.7452 26.1917 12.5547 25.0552 10.4442 25.0552C8.82074 25.0552 8.00902 25.0552 6.33145 25.0552L6.27734 25.0011ZM6.27734 19.4273C7.90079 19.4273 8.71251 19.4273 10.3901 19.4273C12.5547 19.4273 13.6911 18.2368 13.6911 16.1263C13.6911 13.3664 13.6911 12.0135 13.6911 9.25366C13.6911 7.19729 12.5006 5.7903 10.3901 5.7903C8.76663 5.7903 7.9549 5.7903 6.27734 5.7903V19.4273Z" />
      </svg>

      <svg
        width="40"
        height="48"
        viewBox="0 0 40 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={
          toggleClasses.en +
          ` ${
            i18n.language === LOCALE.RUSSIAN
              ? toggleClasses.show
              : toggleClasses.hide
          }`
        }
      >
        <path d="M26.2458 5.73619C26.2458 22.6201 26.2458 31.062 26.2458 48C23.7023 48 22.4577 48 19.9684 48C19.9684 29.3844 19.9684 20.0767 19.9684 1.4611C21.7001 0.919955 25.5423 0 29.6009 0C36.2029 0 39.5039 1.89402 39.5039 7.25141V47.9459C36.9605 47.9459 35.7159 47.9459 33.2266 47.9459C33.2266 32.3066 33.2266 24.46 33.2266 8.82074C33.2266 6.33145 31.9819 5.30327 29.4385 5.30327C28.3562 5.30327 27.2198 5.4115 26.1916 5.68207L26.2458 5.73619Z" />
        <path d="M14.9899 47.9459C8.98309 47.9459 6.00676 47.9459 0 47.9459C0 28.8974 0 19.319 0 0.270569C5.84442 0.270569 8.82074 0.270569 14.6652 0.270569V6.22322C11.31 6.22322 9.63247 6.22322 6.27734 6.22322C6.27734 11.5265 6.27734 14.2322 6.27734 19.5355C9.25366 19.5355 10.7689 19.5355 13.7452 19.5355V25.3799C10.7689 25.3799 9.25366 25.3799 6.27734 25.3799C6.27734 32.0361 6.27734 35.3371 6.27734 41.9932C9.7407 41.9932 11.4724 41.9932 14.9899 41.9932V47.9459Z" />
      </svg>
    </div>
  )
}

export default Toggle
