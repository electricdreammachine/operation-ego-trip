
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'common/styles/index.css'
import PortfolioState, { Consumer } from '../store'
import Hero from '../components/hero'
import Section from '../components/section'
import PillarsTemplate from '../components/section/templates/pillars'
import styles from './portfolio.module.scss'
import GridTemplate from '../components/section/templates/grid'
import Experience from '../components/experience'
import Skills from '../components/skills'

class Art extends Component {
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

Art.propTypes = {
  boundingElement: PropTypes.node,
}

export default Art
