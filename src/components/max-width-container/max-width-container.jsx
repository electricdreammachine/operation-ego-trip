import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './max-width-container.module.scss'

const MaxWidthContainer = ({ maxHeight, className, children }) => (
  <div className={
    classNames(
      styles.maxWidthContainer,
      { [styles.maxHeight]: maxHeight },
      className
    )
  }>
    {children}
  </div>
)

MaxWidthContainer.propTypes = {
  maxHeight: PropTypes.bool,
  className: PropTypes.string,
}

MaxWidthContainer.defaultProps = {
  maxHeight: false,
  className: null,
}

export default MaxWidthContainer