import React, { Fragment, useRef, useEffect } from 'react'
import AnimationPath from './animation-path'
import { FullBleedGraphic } from 'components'
import { forEach, map, range, any, isNil, complement, all, pluck } from 'ramda'
import anime from 'animejs'
import useCachedBoundingClientRect from 'lib/hooks/get-cached-bounding-client-rect'
import styles from './animation.module.scss'

const Animation = ({
  xAxisBoundingElement,
  yAxisBoundingElement,
  numberOfAnimatedLeaves,
}) => {
  if (any(isNil, [xAxisBoundingElement, yAxisBoundingElement])) return null

  const leafPathRefs = map(
    () => ({
      leaf: useRef(null),
      path: useRef(null),
    }),
    range(0, numberOfAnimatedLeaves)
  )

  useEffect(() => {
    if (all(complement(isNil), [xAxisBoundingElement, yAxisBoundingElement])) {
      forEach(index => {
        const path = anime.path(leafPathRefs[index].path.current)

        setTimeout(() => {
          anime({
            targets: leafPathRefs[index].leaf.current,
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
  }, [xAxisBoundingElement, yAxisBoundingElement])

  const { top, bottom } = useCachedBoundingClientRect(yAxisBoundingElement)
  const { left, right } = useCachedBoundingClientRect(xAxisBoundingElement)

  const animations = map(
    index => ({
      path: (
        <AnimationPath
          ref={leafPathRefs[index].path}
          topBound={top}
          bottomBound={bottom}
          leftBound={left}
          rightBound={right}
          invertDirection={index % 2 === 0}
        />
      ),
      leaf: (
        <div ref={leafPathRefs[index].leaf} className={styles.animatedLeaf}>
          <svg style={{ width: '50px', height: '50px' }} viewBox="12 12 18 18">
            <use y={0} x={0} xlinkHref={`#leaf-motif-sprite_single-leaf`} />
          </svg>
        </div>
      ),
    }),
    range(0, numberOfAnimatedLeaves)
  )

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
