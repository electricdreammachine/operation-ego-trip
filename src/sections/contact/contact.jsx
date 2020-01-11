import React, { useRef, useContext } from 'react'
import 'common/assets/images/leaf-motif-sprite.svg'
import {
  FullBleedGraphic,
  RasterisingPatternFill,
  PatternContext,
} from 'components'
import ContactInformation from './contact-information'
import Leaves from './leaves'
import styles from './contact.module.scss'
import useCachedBoundingClientRect from 'lib/hooks/get-cached-bounding-client-rect'

const Contact = ({ contactInfo }) => {
  const localBoundingElement = useRef(null)
  const { height, width } = useCachedBoundingClientRect(
    localBoundingElement.current
  )
  const [
    {
      boundingWidth,
      pattern: {
        boundaries: { outer: outerBoundaries },
      },
    },
  ] = useContext(PatternContext)

  return (
    <div className={styles.pillarsTemplate} ref={localBoundingElement}>
      <RasterisingPatternFill className={styles.graphic}>
        <rect
          x={0}
          y="0"
          width={outerBoundaries.left}
          height="100%"
          style={{ fill: 'url(#star)', strokeWidth: '0' }}
        />
        <rect
          x={outerBoundaries.right}
          y="0"
          width={boundingWidth - outerBoundaries.right}
          height="100%"
          style={{ fill: 'url(#star)', strokeWidth: '0' }}
        />
      </RasterisingPatternFill>
      <FullBleedGraphic>
        <Leaves elementWidth={width} height={height} />
      </FullBleedGraphic>
      <ContactInformation contactInfo={contactInfo} />
    </div>
  )
}

export default Contact
