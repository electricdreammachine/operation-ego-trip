import React from 'react'
import PropTypes from 'prop-types'
import { findOuterAccentBoundaries } from '../pattern'

import styles from './section.scss'

const Section = ({ lineBoundary }) => {
    const { left, right } = findOuterAccentBoundaries(lineBoundary)

    const leftPath = [
        `M 0 0`,
        `L ${left} 0`,
        `L ${left} 75`,
        `L 0 75`,
        'Z'
    ]

    const rightPath = [
        `m 100 0`,
        `L ${right} 0`,
        `L ${right} 75`,
        `l 100 100`,
        'Z'
    ]
    
    return (
    <section className={styles.section}>
        <svg className={styles.sectionGraphic}>
            <rect x="0" y="0" width={left} height="100%" style={{'fill':'url(#star)', 'strokeWidth':'0'}} />
            {/* <path d={leftPath} fill-rule="evenodd" style={{'fill':'url(#star)', 'strokeWidth':'0'}} /> */}
            <rect x={right} y="0" width="100%" height="100%" style={{'fill':'url(#star)', 'strokeWidth':'0'}} />
            {/* <path d={rightPath} fill-rule="evenodd" style={{'fill':'url(#star)', 'strokeWidth':'0'}} /> */}
            {/* <rect x="0" y="0" width="100%" height="100%" style={{'fill':'url(#star)', 'strokeWidth':'0'}} /> */}
        </svg>
        <span className={styles.sectionTitle}>Section Title</span>
    </section>
    )
}

Section.propTypes = {
    lineBoundary: PropTypes.number,
    template: PropTypes.string,
}

Section.defaultProps = {
    lineBoundary: 0,
    template: '',
}

export default Section