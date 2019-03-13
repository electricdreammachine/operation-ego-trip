import React, { useContext } from 'react'
import classnames from 'classnames'
import { StoreContext } from 'store'
import styles from './aligned-diamond-block.module.scss'

const AlignedDiamondBlock = ({ children, className }) => {
  const { state: { lineOffset } } = useContext(StoreContext)

  return (
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

export default AlignedDiamondBlock