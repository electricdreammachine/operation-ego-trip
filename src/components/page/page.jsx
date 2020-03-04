import React, { useContext, Fragment } from 'react'
import { CSSTransition } from 'react-transition-group'
import { isNil, propOr } from 'ramda'
import { StoreContext } from 'store'
import Helmet from 'react-helmet'
import { PatternContextProvider } from '../pattern'
import ogImage from 'common/assets/images/share-img.png'
import styles from './page.module.scss'

const Page = ({ children }) => {
  const {
    state: { patternRef },
  } = useContext(StoreContext)

  return (
    <Fragment>
      <Helmet
        meta={[
          {
            property: `og:title`,
            content: 'olliesmith.dev',
          },
          {
            property: `og:image`,
            content: ogImage,
          },
        ]}
      />
      <div className={styles.page}>
        <CSSTransition
          in={!isNil(propOr(null, 'current', patternRef))}
          classNames={{
            enter: styles.enter,
            enterActive: styles.enterActive,
          }}
          timeout={1000}
        >
          <PatternContextProvider>{children}</PatternContextProvider>
        </CSSTransition>
      </div>
    </Fragment>
  )
}

export default Page
