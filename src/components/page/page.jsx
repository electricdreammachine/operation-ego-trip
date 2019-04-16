import React, { useContext, Fragment } from 'react'
import { CSSTransition } from 'react-transition-group'
import { isNil, propOr } from 'ramda'
import { StoreContext } from 'store'
import styles from './page.module.scss'

const Page = ({ children }) => {
  const { state: { patternRef } } = useContext(StoreContext)

  return (
    <div className={styles.page}>
      <CSSTransition
        in={!isNil(propOr(null, 'current', patternRef))}
        classNames={{
          enter: styles.enter,
          enterActive: styles.enterActive,
        }}
        timeout={1000}
      >
        <Fragment>
          {children}
        </Fragment>
      </CSSTransition>
    </div>
  )
}

export default Page