import React, { useContext, Fragment } from 'react'
import 'common/styles/index.scss'
import { isNil } from 'ramda'
import { withStore, StoreContext } from 'store'
import { Page } from 'components'
import { Hero, Art as ArtSection, Contact } from 'sections'

const Art = () => {
  const availableData = useContext(StoreContext)

  let PopulatedSections = null

  if (!isNil(availableData)) {
    const {
      domain: {
        intro: { edges: [{ node: introduction }] },
        art: { pieces },
        contact: { edges: [{node: contactInfo}] },
      }
    } = useContext(StoreContext)

    PopulatedSections = (
      <Fragment>
        <Hero elementType="header" introduction={introduction} />
        <ArtSection art={pieces}/>
        <Contact name="Contact" contactInfo={contactInfo} />
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
