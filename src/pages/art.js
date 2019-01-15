
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'common/styles/index.scss'
import PortfolioState, { Consumer } from 'store'
import { Hero, Art, Contact } from 'sections'

import styles from './portfolio.module.scss'

class ArtPage extends Component {
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
            <Art />
            <Contact />
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

export default ArtPage
