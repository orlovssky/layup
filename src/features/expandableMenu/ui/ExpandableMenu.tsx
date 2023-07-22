import { nanoid } from 'nanoid'
import { useTranslation } from 'react-i18next'
import {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react'

import expandableMenuClasses from '../assets/styles/expandableMenu.module.css'
import { ContainerRef, Props } from '../lib/typings/expandableMenu'

const ExpandableMenu = forwardRef<ContainerRef, Props>(({ children }, ref) => {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(true)
  const isMouseOverRef = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const circlePathIDRef = useRef(`${nanoid()}-circle-path`)

  useImperativeHandle(ref, () => ({
    current: containerRef.current,
  }))

  let menuText = ''

  for (const letter of [
    ...[...t('common.menu')].map((i) => i + '&#x2007;'),
    '&#9775;',
    '&#x2007;',
    '&#9775;',
    '&#x2007;',
    '&#9775;',
    '&#x2007;',
  ]) {
    menuText += letter
  }

  useEffect(() => {
    setTimeout(() => {
      if (!isMouseOverRef.current) {
        setIsExpanded(false)
      }
    }, 2000)
  }, [])

  return (
    <div
      ref={containerRef}
      className={
        expandableMenuClasses.menu +
        ` ${isExpanded ? expandableMenuClasses.expanded : ''}`
      }
      onMouseOver={() => {
        if (!isMouseOverRef.current) {
          isMouseOverRef.current = true
        }
      }}
      onMouseEnter={() => {
        setIsExpanded(true)
      }}
      onMouseLeave={() => {
        setIsExpanded(false)
      }}
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
            >
              {/*m&#x2007;e&#x2007;n&#x2007;u&#x2007;&#9996;&#x2007;m&#x2007;e&#x2007;n&#x2007;u&#x2007;&#9996;*/}
            </textPath>
          </text>
        </svg>
      )}
    </div>
  )
})

ExpandableMenu.displayName = 'ExpandableMenu'

export default ExpandableMenu
