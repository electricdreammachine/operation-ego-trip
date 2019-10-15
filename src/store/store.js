import React, { createContext, useState, useEffect, useLayoutEffect } from 'react'
import { unstable_batchedUpdates as batch } from 'react-dom'
import root from 'window-or-global'
import { mergeDeepRight, uniqBy, prop, reject, isNil, pipe } from 'ramda'

import { registerSection } from './register-section'
import { findNearestLineToBoundary, findOuterAccentBoundaries } from '../components/pattern'

const StoreContext = createContext()

const PortfolioState = ({ children, data }) => {
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
    sectionsOnPage: [],
  })

  const updateStore = (newStoreProps) => batch(() => setState(prevState => mergeDeepRight(prevState, newStoreProps)))
  const updateSections = newSection => batch(() => setState(prevState => mergeDeepRight(prevState, {
    sectionsOnPage: pipe(
      uniqBy(prop('name')),
      reject(isNil)
    )([...prevState.sectionsOnPage, newSection])
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
      } = findOuterAccentBoundaries(lineBoundary, boundingWidth)
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
    <StoreContext.Provider
      value={{
        state,
        domain: data,
        actions: {
          setInStore: newState => {
            updateStore(newState)
          },
          registerSection: (sectionName, sectionNode) => {
            updateSections(registerSection(sectionName, sectionNode))
          }
        }
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export {
  PortfolioState as default,
  StoreContext,
}