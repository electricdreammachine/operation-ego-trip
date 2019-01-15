import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { isNil } from 'ramda'

import styles from './heading.module.scss'

const Heading = ({children, headingLevel, className, textSized}) => {
  if (isNil(headingLevel)) {
    return (
      <span
        className={
          classNames(
            styles.heading,
            { [styles.textSized]: textSized },
            className
          )
        }
      >
      {children}
      </span>
    )
  }

  return createElement(
    headingLevel,
    { className: classNames(styles.heading, className) },
    children
  )
}

Heading.propTypes = {
  headingLevel: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  className: PropTypes.string,
  textSized: PropTypes.bool,
}

Heading.defaultProps = {
  textSized: false,
}

export default Heading