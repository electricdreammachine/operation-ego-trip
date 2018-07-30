import React from 'react'
import PropTypes from 'prop-types'
import { Consumer } from '../../../store'
import { findOuterAccentBoundaries } from '../../pattern'

import styles from './section-header.scss'

const Section = ({ lineBoundary }) => {    
    return (
        <Consumer>
            {({ state: { lineBoundary } }) => {
                const { left, right } = findOuterAccentBoundaries(lineBoundary)
                return (
                    <header className={styles.sectionHeader}>
                        <svg className={styles.sectionHeaderGraphic}>
                            <rect x="0" y="0" width={left} height="100%" style={{'fill':'url(#star)', 'strokeWidth':'0'}} />
                            <rect x={right} y="0" width={document.documentElement.clientWidth - right} height="100%" style={{'fill':'url(#star)', 'strokeWidth':'0'}} />
                        </svg>
                        <span className={styles.sectionHeaderTitle}>Section Title</span>
                    </header>
                )
            }}
        </Consumer>
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