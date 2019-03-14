
import React, { Fragment, useContext } from 'react'
import { isNil } from 'ramda'
import 'common/styles/index.scss'
import { withStore, StoreContext } from 'store'
import { Page } from 'components'
import { Hero, Experience, Skills, Contact } from 'sections'

const Index = () => {
  const availableData = useContext(StoreContext)

  let PopulatedSections = null

  if (!isNil(availableData)) {
    const {
      domain: {
        intro: { edges: [{ node: introduction }] },
        jobs: { edges: jobs },
        skillGroups: { edges: skillGroups },
        contact: { edges: [{node: contactInfo}] },
      }
    } = availableData

    PopulatedSections = (
      <Fragment>
        <Hero elementType="header" introduction={introduction} />
        <Experience name="Experience" jobs={jobs} />
        <Skills name="Skills" skillGroups={skillGroups} />
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

export default withStore(Index)
