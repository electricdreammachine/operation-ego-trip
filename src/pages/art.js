import React, { useContext } from 'react'
import 'common/styles/index.scss'
import { withStore, StoreContext } from 'store'
import { Page } from 'components'
import { Hero, Art as ArtSection, Contact } from 'sections'

const Art = () => {
  const {
    domain: {
      intro: { edges: [{ node: introduction }] },
      art: { pieces },
      contact: { edges: [{node: contactInfo}] },
    }
  } = useContext(StoreContext)

  return (
    <Page>
      <Hero elementType="header" introduction={introduction} />
      <ArtSection art={pieces}/>
      <Contact name="Contact" contactInfo={contactInfo} />
    </Page>
  )
}

export default withStore(Art)
