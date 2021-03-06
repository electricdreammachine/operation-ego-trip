import React from 'react'
import 'common/styles/index.scss'
import { withStore } from 'store'
import { Page } from 'components'
import { graphql } from 'gatsby'
import { Hero, Experience, FeaturedProject, Skills, Contact } from 'sections'

const Index = ({ data }) => {
  const {
    intro: {
      edges: [{ node: introduction }],
    },
    jobs: { edges: jobs },
    skillGroups: { edges: skillGroups },
    featuredProject: {
      edges: [featuredProject],
    },
    contact: {
      edges: [{ node: contactInfo }],
    },
  } = data

  return (
    <Page>
      <Hero elementType="header" introduction={introduction} />
      <Experience name="Experience" jobs={jobs} />
      <FeaturedProject
        name="Featured Project"
        featuredProject={featuredProject}
      />
      <Skills name="Skills" skillGroups={skillGroups} />
      <Contact name="Contact" contactInfo={contactInfo} />
    </Page>
  )
}

export default withStore(Index)

export const query = graphql`
  query($pageName: String) {
    intro: allContentfulIntroduction(filter: { forPage: { eq: $pageName } }) {
      ...intro
    }
    ...contentQuery
  }
`
