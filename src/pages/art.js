import React from 'react'
import 'common/styles/index.scss'
import PortfolioState, { Consumer } from 'store'
import { Page } from 'components'
import { Hero, Art as ArtSection, Contact } from 'sections'

const Art = () => (
  <PortfolioState>
    <Consumer>
      {({ domain: {
          intro: { edges: [{ node: introduction }] },
          art: { pieces },
          contact: { edges: [{node: contactInfo}] },
        }
      }) => (
        <Page>
          <Hero elementType="header" introduction={introduction} />
          <ArtSection art={pieces}/>
          <Contact name="Contact" contactInfo={contactInfo} />
        </Page>
      )}
    </Consumer>
  </PortfolioState>
)

export default Art
