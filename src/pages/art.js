import React, { useContext, Fragment } from 'react'
import 'common/styles/index.scss'
import { isNil } from 'ramda'
import { withStore, StoreContext } from 'store'
import { Page } from 'components'
import { Hero, Art as ArtSection } from 'sections'

const Art = () => {
  const availableData = useContext(StoreContext)

  let PopulatedSections = null

  if (!isNil(availableData)) {
    const {
      domain: {
        intro: { edges: [, { node: introduction }] },
        art: { pieces },
      }
    } = useContext(StoreContext)

    PopulatedSections = (
      <Fragment>
        <Hero elementType="header" title="Hobby artist" introduction={introduction} />
        <ArtSection name="Gallery" art={pieces}/>
      </Fragment>
    )
  }

  return (
    <Page>
      {PopulatedSections}
    </Page>
  )
}

export default withStore(Art)
