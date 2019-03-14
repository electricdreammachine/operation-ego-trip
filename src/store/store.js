import React, { createContext, useState, useEffect, useLayoutEffect } from 'react'
import { unstable_batchedUpdates as batch } from 'react-dom'
import root from 'window-or-global'
import { StaticQuery, graphql } from 'gatsby'
import { mergeDeepRight, uniqBy, prop, reject, isNil, pipe } from 'ramda'

import { registerSection } from './register-section'
import { findNearestLineToBoundary, findOuterAccentBoundaries } from '../components/pattern'

const StoreContext = createContext()

const PortfolioState = ({ children }) => {
  const [state, setState] = useState({
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
  })

  const updateStore = (newStoreProps) => batch(() => setState(prevState => mergeDeepRight(prevState, newStoreProps)))
  const updateSections = newSection => batch(() => setState(prevState => mergeDeepRight(prevState, {
    sections: pipe(
      uniqBy(prop('name')),
      reject(isNil)
    )([...prevState.sections, newSection])
  })))

  useLayoutEffect(() => {
    updateStore({
      boundingHeight: root.innerHeight,
      boundingElement: document.documentElement,
    })
  }, [])

  useEffect(() => {
    if (state.boundingElement !== null) {
      const { lineBoundary } = state
      const nearestLineToBoundary = findNearestLineToBoundary(lineBoundary)
      const lineOffset = Math.abs(nearestLineToBoundary) - Math.abs(lineBoundary)
      const boundingWidth = state.boundingElement.clientWidth
      const {
        left: leftOuterBoundary,
        right: rightOuterBoundary
      } = findOuterAccentBoundaries(nearestLineToBoundary, boundingWidth)
      const lineDistance = leftOuterBoundary - nearestLineToBoundary
      const leftInnerBoundary = nearestLineToBoundary - lineDistance - 2
      const rightInnerBoundary = rightOuterBoundary + (lineDistance * 2) + 2

      updateStore({
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
  }, [state.boundingElement, state.lineBoundary]
  )

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
              state,
              domain: data,
              actions: {
                setLineBoundary: (lineBoundary) => {
                  updateStore({ lineBoundary })
                }
                ,
                registerSection: (sectionName, sectionNode) => {
                  updateSections(registerSection(sectionName, sectionNode))
                }
              }
            }}
          >
            {children}
          </StoreContext.Provider>
      }
    >
    </StaticQuery>
  )
}

export {
  PortfolioState as default,
  StoreContext,
}