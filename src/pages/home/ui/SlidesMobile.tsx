import { useTranslation } from 'react-i18next'

import slidesMobileClasses from '../assets/styles/slidesMobile.module.css'
import slides from '../lib/static/slides'

const SlidesMobile = () => {
  const { t } = useTranslation()

  return (
    <div className={slidesMobileClasses.container}>
      {slides.map(({ id, translationNode }) => (
        <section
          key={id}
          className={slidesMobileClasses.section}
          dangerouslySetInnerHTML={{
            __html: t(translationNode),
          }}
        />
      ))}
    </div>
  )
}

export default SlidesMobile
