import React, { createContext, useReducer, useEffect } from 'react'
import useWindowDimensions from 'lib/hooks/use-window-dimensions'
import getPattern from './pattern-utils'

export const PatternContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LEFT_ANCHOR_POINT':
      return {
        ...state,
        leftAnchorPoint: action.payload,
      }
    case 'SET_BOUNDS':
      return {
        ...state,
        boundingWidth: action.payload.boundingWidth,
        boundingHeight: action.payload.boundingHeight,
      }
    case 'GENERATE_PATTERN':
      return {
        ...state,
        pattern: getPattern(
          state.leftAnchorPoint,
          state.boundingWidth,
          state.gutter,
          state.width
        ),
      }
    default:
      return state
  }
}

const initialState = {
  leftAnchorPoint: 0,
  boundingWidth: 0,
  boundingHeight: 0,
  pattern: {
    anchorToLineOffset: 0,
    boundaries: {
      outer: {
        left: 0,
        right: 0,
      },
      inner: {
        left: 0,
        right: 0,
      },
    },
    xAxisConstrained: false,
  },
  gutter: 10,
  width: 2,
}

const PatternContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const windowDimensions = useWindowDimensions()

  useEffect(() => {
    dispatch({
      type: 'SET_BOUNDS',
      payload: {
        boundingWidth: windowDimensions.width,
        boundingHeight: windowDimensions.height,
      },
    })
  }, [windowDimensions])

  useEffect(() => {
    dispatch({ type: 'GENERATE_PATTERN' })
  }, [state.leftAnchorPoint, state.boundingWidth, state.boundingHeight])

  return (
    <PatternContext.Provider value={[state, dispatch]}>
      {children}
    </PatternContext.Provider>
  )
}

export default PatternContextProvider
