import React from 'react'
import PropTypes from 'prop-types'

import SectionHeader from './section-header'

import styles from './section.module.scss'

const Section = () => {
    return (
        <section className={styles.section}>
            <SectionHeader />
        </section>
    )
}

Section.propTypes = {
    template: PropTypes.string,
}

Section.defaultProps = {
    template: '',
}

export default Section