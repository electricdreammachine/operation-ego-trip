import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './text.module.scss'

const Text = ({ children, className, isLink }) => (
  <div
    className={classnames(styles.text, className, { [styles.isLink]: isLink })}
  >
    {children}
  </div>
)

Text.propTypes = {
  isLink: PropTypes.bool,
}

Text.defaultProps = {
  isLink: false,
}

export default Text