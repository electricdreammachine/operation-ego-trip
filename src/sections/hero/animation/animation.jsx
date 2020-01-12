import React, { Fragment, useEffect, useReducer } from 'react'
import AnimationPath from './animation-path'
import { FullBleedGraphic } from 'components'
import { forEach, map, range, any, isNil, pluck, pathOr, keys } from 'ramda'
import anime from 'animejs'
import useCachedBoundingClientRect from 'lib/hooks/get-cached-bounding-client-rect'
import styles from './animation.module.scss'

const initialState = {}

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REF':
      return {
        ...state,
        [action.payload.index]: {
          ...state[action.payload.index],
          [action.payload.type]: action.payload.ref,
        },
      }
    default:
      return state
  }
}

const Animation = ({
  xAxisBoundingElement,
  yAxisBoundingElement,
  numberOfAnimatedLeaves,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addRef = (type, index) => ref => {
    if (ref && !pathOr(false, [index, type], state)) {
      return dispatch({
        type: 'UPDATE_REF',
        payload: {
          index,
          type,
          ref,
        },
      })
    }

    return
  }

  useEffect(() => {
    if (keys(state).length === numberOfAnimatedLeaves) {
      forEach(index => {
        const path = anime.path(state[index].path)

        setTimeout(() => {
          anime({
            targets: state[index].leaf,
            translateX: path('x'),
            translateY: path('y'),
            rotate: path('angle'),
            duration: 15000,
            opacity: {
              value: 0,
              duration: 10000,
            },
            loop: true,
            easing: 'easeInOutQuad',
          })
        }, 3000 * index)
      }, range(0, numberOfAnimatedLeaves))
    }
  }, [
    xAxisBoundingElement,
    yAxisBoundingElement,
    state,
    numberOfAnimatedLeaves,
  ])

  const { top, bottom } = useCachedBoundingClientRect(yAxisBoundingElement)
  const { left, right } = useCachedBoundingClientRect(xAxisBoundingElement)

  const animations = map(
    index => ({
      path: (
        <AnimationPath
          ref={addRef('path', index)}
          topBound={top}
          bottomBound={bottom}
          leftBound={left}
          rightBound={right}
          invertDirection={index % 2 === 0}
        />
      ),
      leaf: (
        <div ref={addRef('leaf', index)} className={styles.animatedLeaf}>
          <svg style={{ width: '50px', height: '50px' }} viewBox="12 12 18 18">
            <use y={0} x={0} xlinkHref={`#leaf-motif-sprite_single-leaf`} />
          </svg>
        </div>
      ),
    }),
    range(0, numberOfAnimatedLeaves)
  )

  if (any(isNil, [xAxisBoundingElement, yAxisBoundingElement])) return null

  return (
    <Fragment>
      <FullBleedGraphic>{pluck('path', animations)}</FullBleedGraphic>
      {pluck('leaf', animations)}
    </Fragment>
  )
}

Animation.defaultProps = {
  numberOfAnimatedLeaves: 5,
}

export default Animation
