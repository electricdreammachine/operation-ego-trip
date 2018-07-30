import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PortfolioState, { Consumer } from '../store'
import Hero from './hero'
import Section from './section'
import PillarsTemplate from './section/templates/pillars'
import styles from './portfolio.scss'

class Portfolio extends Component {
  render() {
    const { boundingElement } = this.props

    return (
      <PortfolioState boundingElement={boundingElement}>
        <Consumer>
          {({ state: { lineBoundary }, actions }) => (
            <div className={styles.app}>
            <header className={styles.appHeader}>
              <Hero setLineBoundary={actions.setLineBoundary} />
            </header>
            <Section />
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
  boundingElement: PropTypes.element,
}

export default Portfolio
