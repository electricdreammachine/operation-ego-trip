import React, { forwardRef } from 'react'
import { map } from 'ramda'
import { Heading } from 'components'

import styles from './navigation.module.scss'

const scrollToNode = node => window.scroll({
  top: node.offsetTop,
  behavior: 'smooth'
})

const Navigation = forwardRef(({ sections }, ref) => (
  <nav className={styles.navigation} ref={ref}>
    {
      map(
        ({ name, node }) => (
          <button onClick={() => scrollToNode(node)} className={styles.navItem}>
            <Heading className={styles.navItemText}>
              {name}
            </Heading>
          </button>
        ),
        sections
      )
    }
  </nav>  
))

Navigation.defaultProps = {
  sections: [],
}

export default Navigation
