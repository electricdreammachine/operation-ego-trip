import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { isNil } from 'ramda'
import Text from '../text'

import styles from './heading.module.scss'

const Heading = ({ children, headingLevel, className, textSized, ...textProps }) => {
  if (isNil(headingLevel)) {
    return (
      <Text {...textProps}
        className={
          classNames(
            styles.heading,
            { [styles.textSized]: textSized },
            className
          )
        }
      >
        {children}
      </Text>
    )
  }

  return createElement(
    headingLevel,
    { className: classNames(styles.heading, className) },
    <Text {...textProps} classLess>{children}</Text>,
  )
}

Heading.propTypes = {
  headingLevel: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  textSized: PropTypes.bool,
}

Heading.defaultProps = {
  headingLevel: null,
  textSized: false,
}

export default Heading