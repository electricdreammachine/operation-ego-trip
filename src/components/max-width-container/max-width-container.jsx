import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './max-width-container.module.scss'

const MaxWidthContainer = ({ maxHeight, children }) => (
    <div className={
        classNames(
            styles.maxWidthContainer,
            { [styles.maxHeight]: maxHeight }
        )
    }>
        {children}
    </div>
)

MaxWidthContainer.propTypes = {
    maxHeight: PropTypes.bool,
}

MaxWidthContainer.defaultProps = {
    maxHeight: false,
}

export default MaxWidthContainer