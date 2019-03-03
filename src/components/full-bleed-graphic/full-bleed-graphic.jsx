import React from 'react'
import classnames from 'classnames'

import styles from './full-bleed-graphic.module.scss'

const FullBleedGraphic = React.forwardRef(
  ({ children, className }, ref) => (
    <svg className={
      classnames(
        styles.fullBleedGraphic,
        className
      )
    } ref={ref}>
      {children}
    </svg>
  )
)

export default FullBleedGraphic