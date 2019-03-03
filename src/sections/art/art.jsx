import React from 'react'
import { map } from 'ramda'
import { MaxWidthContainer } from 'components/'

import styles from './art.module.scss'

const GridTemplate = ({ art }) => (
  <MaxWidthContainer>
    <div className={styles.gridWrapper}>
      {map(
        ({ piece }) => (
          <div>
            <img src={piece.fullImage.file.url} alt={piece.title} />
          </div>
        ),
        art
      )}
    </div>
  </MaxWidthContainer>
)

export default GridTemplate