import React from 'react'
import classnames from 'classnames'

import styles from './full-bleed-graphic.module.scss'

const FullBleedGraphic = React.forwardRef(
  ({ children, className, ...svgProps }, ref) => (
    <svg
      className={classnames(styles.fullBleedGraphic, className)}
      ref={ref}
      {...svgProps}
    >
      {children}
    </svg>
  )
)

export default FullBleedGraphic
