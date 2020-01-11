import React, { forwardRef, useContext, cloneElement } from 'react'
import { map, addIndex, times } from 'ramda'
import { Link } from 'gatsby'
import { Heading } from 'components'
import { StoreContext } from 'store'
import constructNavigationWithInPageSections from './construct-navigation-with-in-page-sections'

import styles from './navigation.module.scss'

const scrollToNode = node =>
  window.scroll({
    top: node.offsetTop,
    behavior: 'smooth',
  })

const Navigation = forwardRef(({ sectionsOnPage }, ref) => {
  const {
    domain: {
      site: {
        siteMetadata: { menuLinks },
      },
    },
  } = useContext(StoreContext)
  const navigationItems = constructNavigationWithInPageSections(
    menuLinks,
    sectionsOnPage
  )

  return (
    <nav className={styles.navigation} ref={ref}>
      {addIndex(map)(
        ({ name, sections, link }, index) => (
          <div className={styles.navSection}>
            <Link className={styles.navItem} to={link}>
              <Heading className={styles.navSectionHeader} textSized>
                {name}
              </Heading>
            </Link>
            {map(({ name, isFoundInPage, node = null, link = '' }) => {
              const linkComponent = isFoundInPage ? (
                <button
                  onClick={() => scrollToNode(node)}
                  className={styles.navItem}
                />
              ) : (
                <Link
                  className={styles.navItem}
                  to={sections.length > 1 ? `${link}/#${name}` : link}
                />
              )

              return cloneElement(
                linkComponent,
                null,
                <Heading className={styles.navItemText} textSized isLink>
                  {name}
                </Heading>
              )
            }, sections)}
            {index === 1
              ? times(
                  () => (
                    <svg className={styles.leaf} viewBox="3 12 18 18">
                      <use
                        y={0}
                        x={0}
                        xlinkHref={`#leaf-motif-sprite_single-leaf`}
                      />
                    </svg>
                  ),
                  3
                )
              : null}
          </div>
        ),
        navigationItems
      )}
    </nav>
  )
})

Navigation.defaultProps = {
  sections: [],
}

export default Navigation
