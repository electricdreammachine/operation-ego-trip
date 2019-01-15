import React, { createElement, Fragment } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isEmpty } from 'ramda'

import SectionHeader from './section-header'

import styles from './section.module.scss'

const Section = ({ children, elementType, className, name }) => {
    let header = null

    if (!isEmpty(name)) {
        header = (
            <SectionHeader>
                {name}
            </SectionHeader>
        )
    }

    return createElement(
        elementType,
        { className: classnames(styles.section, className) },
        (
        <Fragment>
            {header}
            {children}
        </Fragment>
        )
    )
}

Section.propTypes = {
    template: PropTypes.string,
    elementType: PropTypes.oneOf(['section', 'header']),
    className: PropTypes.string,
    name: PropTypes.string,
}

Section.defaultProps = {
    template: '',
    elementType: 'section',
    name: '',
}

export default Section