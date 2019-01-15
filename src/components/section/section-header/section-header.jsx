import React from 'react'
import { Consumer } from '../../../store'
import styles from './section-header.module.scss'

const SectionHeader = ({
    children
}) => {    
    return (
        <Consumer>
            {({ state: {
                boundingWidth,
                outerAccentBoundaries: {
                    leftOuterBoundary,
                    rightOuterBoundary,
                },
            }}) => (
                    <header className={styles.sectionHeader}>
                        <svg className={styles.sectionHeaderGraphic}>
                            <rect x="0" y="0" width={leftOuterBoundary} height="100%" style={{'fill':'url(#star)', 'strokeWidth':'0'}} />
                            <rect x={rightOuterBoundary} y="0" width={boundingWidth - rightOuterBoundary} height="100%" style={{'fill':'url(#star)', 'strokeWidth':'0'}} />
                        </svg>
                        <span className={styles.sectionHeaderTitle}>{children}</span>
                    </header>
                )
            }
        </Consumer>
    )
}

export default SectionHeader