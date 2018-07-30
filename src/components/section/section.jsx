import React from 'react'
import PropTypes from 'prop-types'
import { findOuterAccentBoundaries } from '../pattern'

import SectionHeader from './section-header'

import styles from './section.scss'

const Section = ({ lineBoundary }) => {
    const { left, right } = findOuterAccentBoundaries(lineBoundary)
    
    return (
    <section className={styles.section}>
        <SectionHeader />
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