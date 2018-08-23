import React from 'react'
// import PropTypes from 'prop-types'

import styles from './full-bleed-graphic.module.scss'

const FullBleedGraphic = React.forwardRef(
    ({ children }, ref) => (
        <svg className={styles.fullBleedGraphic} ref={ref}>
            {children}
        </svg>
    )
)

export default FullBleedGraphic