
import React from 'react'
import 'common/styles/index.scss'
import PortfolioState, { Consumer } from 'store'
import { Page } from 'components'
import { Hero, Experience, Skills, Contact } from 'sections'

const Index = () => (
  <PortfolioState>
    <Consumer>
      {({ domain: {
          intro: { edges: [{ node: introduction }] },
          jobs: { edges: jobs },
          skillGroups: { edges: skillGroups },
          contact: { edges: [{node: contactInfo}] },
        }
      }) => (
        <Page>
          <Hero elementType="header" introduction={introduction} />
          <Experience name="Experience" jobs={jobs} />
          <Skills name="Skills" skillGroups={skillGroups} />
          <Contact name="Contact" contactInfo={contactInfo} />
        </Page>
      )}
    </Consumer>
  </PortfolioState>
)

export default Index
