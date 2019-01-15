
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'common/styles/index.scss'
import PortfolioState, { Consumer } from 'store'
import { Hero, Experience, Skills, Contact } from 'sections'

import styles from './portfolio.module.scss'

class Index extends Component {
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
              <Hero
                setLineBoundary={actions.setLineBoundary}
                lineBoundary={lineBoundary}
                nearestLineToBoundary={nearestLineToBoundary}
                boundingWidth={boundingWidth}
                boundingHeight={boundingHeight}
                lineOffset={lineOffset}
                className={styles.appHeader}
                elementType="header"
              />
              <Experience lineOffset={lineOffset} name="Experience" />
              <Skills lineOffset={lineOffset} name="Skills" />
              <Contact name="Contact" />
            </div>
          )}
        </Consumer>
      </PortfolioState>
    )
  }
}

Index.propTypes = {
  boundingElement: PropTypes.node,
}

export default Index
