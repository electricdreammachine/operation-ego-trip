import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './text.module.scss'

const Text = ({ children, className, isLink, classLess }) => (
  <div
    className={classnames(
      { [styles.text]: !classLess },
      { [styles.isLink]: isLink },
      className
    )}
  >
    {children}
  </div>
)

Text.propTypes = {
  isLink: PropTypes.bool,
  classLess: PropTypes.bool,
}

Text.defaultProps = {
  isLink: false,
  classLess: false,
}

export default Text
