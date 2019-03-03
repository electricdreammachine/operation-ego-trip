import React from 'react'
import { Consumer } from 'store'
import Heading from '../../heading'
import styles from './section-header.module.scss'

const SectionHeader = ({
  children
}) => (
  <Consumer>
    {({ state: {
      boundingWidth,
      outerAccentBoundaries: {
        leftOuterBoundary,
        rightOuterBoundary,
      },
    } }) => (
        <header className={styles.sectionHeader}>
          <svg className={styles.sectionHeaderGraphic}>
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
          </svg>
          <Heading headingLevel="h2" className={styles.sectionHeaderTitle}>
            {children}
          </Heading>
        </header>
      )
    }
  </Consumer>
)

export default SectionHeader