import React, { useRef } from 'react'
import { pipe, prop, isNil, ifElse, always } from 'ramda'
import 'common/assets/images/leaf-motif-sprite.svg'
import { FullBleedGraphic } from 'components'
import ContactInformation from './contact-information'
import Leaves from './leaves'
import styles from './contact.module.scss'

const Contact = ({
  contactInfo,
  boundingWidth,
  outerAccentBoundaries: {
    leftOuterBoundary,
    rightOuterBoundary,
  },
}) => {
  const localBoundingElement = useRef(null)

  const { height, width } = pipe(
    prop(['current']),
    ifElse(
      isNil,
      always({
        height: 0,
        width: 0,
      }),
      (node) => node.getBoundingClientRect()
    )
  )(localBoundingElement)

  return (
    <div className={styles.pillarsTemplate} ref={localBoundingElement}>
      <FullBleedGraphic>
        <rect x={0} y="0" width={leftOuterBoundary} height="100%" style={{ 'fill': 'url(#star)', 'strokeWidth': '0' }} />
        <rect x={rightOuterBoundary} y="0" width={boundingWidth - rightOuterBoundary} height="100%" style={{ 'fill': 'url(#star)', 'strokeWidth': '0' }} />
        <Leaves elementWidth={width} height={height} />
      </FullBleedGraphic>
      <ContactInformation contactInfo={contactInfo} />
    </div>
  )
}

export default Contact