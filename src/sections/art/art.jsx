import React, { useState, useRef, useEffect } from 'react'
import classnames from 'classnames'
import { wrapGrid } from 'animate-css-grid'
import { map, includes, addIndex, mergeDeepRight, without, ifElse, append, isNil } from 'ramda'
import { MaxWidthContainer, Text, Heading, Badge } from 'components/'

import 'common/assets/images/expand.svg'

import styles from './art.module.scss'

const GridTemplate = ({ art }) => {
  const [state, setState] = useState({
    expandedItemIndices: [],
  })
  const gridEl = useRef(null)

  useEffect(() => {
    if (!isNil(gridEl.current)) {
      wrapGrid(gridEl.current)
    }
  }, [gridEl])

  const toggleContainerExpanded = containerIndex => {
    const updatedIndices = ifElse(
        indices => includes(containerIndex, indices),
        without([containerIndex]),
        append(containerIndex)
      )(state.expandedItemIndices)

    return setState(mergeDeepRight(state, {
        expandedItemIndices: updatedIndices,
      })
    )
  }

  return (
    <MaxWidthContainer>
      <div className={styles.gridWrapper} ref={gridEl}>
        {addIndex(map)(
          ({ piece }, index) => {
            const isExpanded = includes(index, state.expandedItemIndices)

            return (
              <div className={
                classnames(
                  styles.container,
                  { [styles.expanded]: isExpanded }
                )
              }>
                <div className={styles.artItem}>
                  <button className={styles.buttonImageWrapper} onClick={() => toggleContainerExpanded(index)}>
                    <img src={piece.fullImage.file.url} alt={piece.title} />
                  </button>
                  { isExpanded &&
                    <div className={styles.details}>
                      <Heading>
                        {piece.title}
                        <a href={piece.fullImage.file.url} target="_blank" rel="noopener noreferrer">
                          <svg className={styles.openIcon}>
                            <use xlinkHref="#expand" />
                          </svg>
                        </a>
                      </Heading>
                      <Text>
                        {piece.description.childMarkdownRemark.rawMarkdownBody}
                      </Text>
                      <div className={styles.tools}>
                        {map(
                          tool => (<Badge className={styles.tool}>{tool}</Badge>),
                          piece.tools
                        )}
                      </div>
                    </div>
                  }
                </div>
              </div>
            )
          },
          art
        )}
      </div>
    </MaxWidthContainer>
  )
}

export default GridTemplate