import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PortfolioState, { Consumer } from '../store'
import Hero from './hero'
import Section from './section'
import PillarsTemplate from './section/templates/pillars'
import styles from './portfolio.module.scss'
import GridTemplate from './section/templates/grid'
import Experience from './experience'
import Skills from './skills'

class Portfolio extends Component {
  constructor() {
    super()
    this.state = {
      boundingElement: null,
    }
  }

  componentDidMount() {
    this.setState({ boundingElement: document.documentElement })
  }

  render() {
    const { boundingElement } = this.state
    return (
      <PortfolioState boundingElement={boundingElement}>
        <Consumer>
          {({ state: { lineBoundary, lineOffset, nearestLineToBoundary, boundingWidth, boundingHeight }, actions }) => (
            <div className={styles.app}>
            <header className={styles.appHeader}>
              <Hero
                setLineBoundary={actions.setLineBoundary}
                lineBoundary={lineBoundary}
                nearestLineToBoundary={nearestLineToBoundary}
                boundingWidth={boundingWidth}
                boundingHeight={boundingHeight}
                lineOffset={lineOffset}
              />
            </header>
            <Section />
            <Experience lineOffset={lineOffset} />
            <Section
              template="pillars"
            />
            <Skills />
            <Section />
            <GridTemplate />
            <Section
              template="pillars"
            />
            <PillarsTemplate />
          </div>
          )}
        </Consumer>
      </PortfolioState>
    )
  }
}

Portfolio.propTypes = {
  boundingElement: PropTypes.node,
}

export default Portfolio
