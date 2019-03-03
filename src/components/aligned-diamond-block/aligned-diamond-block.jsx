import React from 'react'
import classnames from 'classnames'
import { Consumer } from 'store'
import styles from './aligned-diamond-block.module.scss'

const AlignedDiamondBlock = ({ children, className }) => (
  <Consumer>
    {
      ({ state: { lineOffset } }) => (
        <div className={
            classnames(
              styles.alignedDiamondBlock,
              className
            )
          }
          style={{ 'left': lineOffset + 'px' }}
        >
          {children}
        </div>
      )
    }
  </Consumer>
)

export default AlignedDiamondBlock