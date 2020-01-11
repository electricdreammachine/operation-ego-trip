import React, { useContext } from 'react'
import { PatternContext } from '../../pattern'
import RasterisingPatternFill from '../../rasterising-pattern-fill'
import Heading from '../../heading'
import styles from './section-header.module.scss'

const SectionHeader = ({ children }) => {
  const [
    {
      boundingWidth,
      pattern: {
        boundaries: { outer: outerBoundaries },
      },
    },
  ] = useContext(PatternContext)
  return (
    <header className={styles.sectionHeader}>
      <RasterisingPatternFill className={styles.sectionHeaderGraphic}>
        <rect
          x="0"
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
      <Heading headingLevel="h2" className={styles.sectionHeaderTitle}>
        {children}
      </Heading>
    </header>
  )
}

export default SectionHeader
