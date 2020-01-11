import React from 'react'
import 'common/styles/index.scss'
import { withStore } from 'store'
import { Page } from 'components'
import { graphql } from 'gatsby'
import { Hero, Art as ArtSection } from 'sections'

const Art = ({ data }) => {
  const {
    intro: {
      edges: [{ node: introduction }],
    },
    art: { pieces },
  } = data

  return (
    <Page>
      <Hero
        elementType="header"
        title="Hobby artist"
        introduction={introduction}
      />
      <ArtSection name="Gallery" art={pieces} />
    </Page>
  )
}

export default withStore(Art)

export const query = graphql`
  query($pageName: String) {
    intro: allContentfulIntroduction(filter: { forPage: { eq: $pageName } }) {
      ...intro
    }
    ...contentQuery
  }
`
