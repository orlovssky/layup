import { nanoid } from 'nanoid'
import { useTranslation } from 'react-i18next'
import { useClickAway } from 'react-use'
import {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react'
import { deviceType } from 'shared/device'

import expandableMenuClasses from '../assets/styles/expandableMenu.module.css'
import { ContainerRef, Props } from '../lib/typings/expandableMenu'

const ExpandableMenu = forwardRef<ContainerRef, Props>(({ children }, ref) => {
  const { t } = useTranslation()
  const [menuText, setMenuText] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const circlePathIDRef = useRef(`${nanoid()}-circle-path`)

  const expand = () => {
    setIsExpanded(true)
  }

  const collapse = () => {
    setIsExpanded(false)
  }

  useImperativeHandle(ref, () => ({
    current: containerRef.current,
  }))

  useClickAway(containerRef, () => {
    if (deviceType === 'mobile' && isExpanded) {
      collapse()
    }
  })

  useEffect(() => {
    const container = containerRef.current

    if (deviceType === 'mobile') {
      container?.addEventListener('click', expand)
      window.addEventListener('scroll', collapse)

      return () => {
        container?.removeEventListener('click', expand)
        window.removeEventListener('scroll', collapse)
      }
    } else {
      container?.addEventListener('mouseenter', expand)
      container?.addEventListener('mouseleave', collapse)

      return () => {
        container?.removeEventListener('mouseenter', expand)
        container?.removeEventListener('mouseleave', collapse)
      }
    }
  }, [])

  useEffect(() => {
    setMenuText(
      [...t('common.menu'), ...[...Array.from(Array(3)).map(() => '&#9775;')]]
        .map((letter) => `${letter}&#x2007;`)
        .join(''),
    )
  }, [t])

  return (
    <div
      ref={containerRef}
      className={
        expandableMenuClasses.menu +
        ` ${isExpanded ? expandableMenuClasses.expanded : ''}`
      }
    >
      {isExpanded ? (
        children
      ) : (
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className={expandableMenuClasses.circle}
        >
          <path
            id={circlePathIDRef.current}
            fill="none"
            d="
              M 25, 50
              a 25,25 0 1,1 50,0
              a 25,25 0 1,1 -50,0
            "
          />
          <text>
            <textPath
              className={expandableMenuClasses.text}
              textLength={Math.PI * 25 * 2}
              href={`#${circlePathIDRef.current}`}
              dangerouslySetInnerHTML={{
                __html: menuText,
              }}
            />
          </text>
        </svg>
      )}
    </div>
  )
})

ExpandableMenu.displayName = 'ExpandableMenu'

export default ExpandableMenu
