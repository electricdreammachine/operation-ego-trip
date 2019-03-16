import React, { useContext } from 'react'
import { StoreContext } from 'store'
import RasterisingPatternFill from '../../rasterising-pattern-fill'
import Heading from '../../heading'
import styles from './section-header.module.scss'

const SectionHeader = ({
  children
}) => {
  const {
    state: {
      boundingWidth,
      outerAccentBoundaries: {
        leftOuterBoundary,
        rightOuterBoundary,
      },
    }
  } = useContext(StoreContext)

  return (
    <header className={styles.sectionHeader}>
      <RasterisingPatternFill className={styles.sectionHeaderGraphic}>
        <rect
          x="0"
          y="0"
          width={leftOuterBoundary}
          height="100%"
          style={{ 'fill': 'url(#star)', 'strokeWidth': '0' }}
        />
        <rect
          x={rightOuterBoundary}
          y="0"
          width={boundingWidth - rightOuterBoundary}
          height="100%"
          style={{ 'fill': 'url(#star)', 'strokeWidth': '0' }}
        />
      </RasterisingPatternFill>
      <Heading headingLevel="h2" className={styles.sectionHeaderTitle}>
        {children}
      </Heading>
    </header>
  )
}

export default SectionHeader