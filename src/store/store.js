import React, { createContext, Component } from 'react'
import root from 'window-or-global'
import { StaticQuery, graphql } from 'gatsby'

import { registerSection } from './register-section'
import { findNearestLineToBoundary, findOuterAccentBoundaries } from '../components/pattern'

const StoreContext = createContext()

class PortfolioState extends Component {
  constructor() {
    super()

    this.state = {
      boundingElement: null,
      boundingWidth: 0,
      boundingHeight: 0,
      lineBoundary: 0,
      nearestLineToBoundary: 0,
      outerAccentBoundaries: {
        leftOuterBoundary: 0,
        rightOuterBoundary: 0,
      },
      innerAccentBoundaries: {
        leftInnerBoundary: 0,
        rightInnerBoundary: 0,
      },
      sections: [],
    }
  }

  componentDidMount() {
    this.setState({
      boundingHeight: root.innerHeight,
      boundingElement: document.documentElement,
    })
  }

  componentDidUpdate(_, prevState) {
    if ((this.state.boundingElement !== null && prevState.boundingElement !== this.state.boundingElement) ||
      (prevState.lineBoundary !== this.state.lineBoundary)
    ) {
      const { lineBoundary } = this.state
      const nearestLineToBoundary = findNearestLineToBoundary(lineBoundary)
      const lineOffset = Math.abs(nearestLineToBoundary) - Math.abs(lineBoundary)
      const boundingWidth = this.state.boundingElement.clientWidth
      const {
        left: leftOuterBoundary,
        right: rightOuterBoundary
      } = findOuterAccentBoundaries(nearestLineToBoundary, boundingWidth)
      const lineDistance = leftOuterBoundary - nearestLineToBoundary
      const leftInnerBoundary = nearestLineToBoundary - lineDistance - 2
      const rightInnerBoundary = rightOuterBoundary + (lineDistance * 2) + 2

      this.setState({
        boundingWidth,
        nearestLineToBoundary,
        lineOffset,
        outerAccentBoundaries: {
          leftOuterBoundary,
          rightOuterBoundary,
        },
        innerAccentBoundaries: {
          leftInnerBoundary,
          rightInnerBoundary,
        }
      })
    }
  }

  render() {
    return (
      <StaticQuery
        query={
          graphql`
            query { ...contentQuery }
          `
        }
        render={
          (data) =>
            <StoreContext.Provider
              value={{
                state: this.state,
                domain: data,
                actions: {
                  setLineBoundary: (lineBoundary) =>
                    this.setState({ lineBoundary })
                  ,
                  registerSection: (sectionName, sectionNode) =>
                    this.setState(registerSection(sectionName, sectionNode))
                }
              }}
            >
              {this.props.children}
            </StoreContext.Provider>
        }
      >
      </StaticQuery>
    )
  }
}

export {
  PortfolioState as default,
  StoreContext,
}