import React, { Component, Fragment } from 'react'
import AnimationPath from './animation-path'
import { FullBleedGraphic } from 'components'
import { forEach, map, range, any, isNil, and, complement, all, pluck } from 'ramda'
import anime from 'animejs'

import styles from './animation.module.scss'

class Animation extends Component {
  constructor(props) {
    super(props)

    forEach(
      index => {
        this[`animated-leaf-${index}`] = React.createRef()
        this[`animation-path-${index}`] = React.createRef()
      },
      range(0, props.numberOfAnimatedLeaves)
    )
  }

  componentDidUpdate(prevProps) {
    const { xAxisBoundingElement: currentXAxisBoundingElement, yAxisBoundingElement: currentYAxisBoundingElement } = this.props
    const { xAxisBoundingElement: previousXAxisBoundingElement, yAxisBoundingElement: previousYAxisBoundingElement } = prevProps
    if (and(
        any(isNil, [previousXAxisBoundingElement, previousYAxisBoundingElement]),
        all(complement(isNil), [currentXAxisBoundingElement, currentYAxisBoundingElement])
      )) {
        setTimeout(() => {
          forEach(
            index => {
              const path = anime.path(this[`animation-path-${index}`].current)
              anime({
                  targets: this[`animated-leaf-${index}`].current,
                  translateX: path('x'),
                  translateY: path('y'),
                  rotate: path('angle'),
                  duration: 15000,
                  opacity: {
                      value: 0,
                      duration: 10000,
                  },
                  loop: true,
                  delay: 500 * index,
                  easing: 'easeInOutQuad'
                })
            },
            range(0, this.props.numberOfAnimatedLeaves)
          )
          }, 1000)
      }
  }

  render() {
    const { xAxisBoundingElement, yAxisBoundingElement, numberOfAnimatedLeaves } = this.props
    if (any(isNil, [xAxisBoundingElement, yAxisBoundingElement])) return null

    const { top, bottom } = yAxisBoundingElement.getBoundingClientRect()
    const { left, right } = xAxisBoundingElement.getBoundingClientRect()

    const animations = map(
      index => ({
        path:(
          <AnimationPath
            ref={this[`animation-path-${index}`]}
            topBound={top}
            bottomBound={bottom}
            leftBound={left}
            rightBound={right}
            invertDirection={index % 2 === 0}
          />
        ),
        leaf: (
          <div ref={this[`animated-leaf-${index}`]} className={styles.animatedLeaf}>
            <svg style={{ width: '50px', height: '50px' }} viewBox="12 12 18 18">
              <use y={0} x={0} xlinkHref={`#leaf-motif-sprite_single-leaf`} />
            </svg>
          </div>
        )
      }),
      range(0, numberOfAnimatedLeaves)
    )

    return (
      <Fragment>
        <FullBleedGraphic>
          {pluck('path', animations)}
        </FullBleedGraphic>
        {pluck('leaf', animations)}
      </Fragment>
    )
  }
}

Animation.defaultProps = {
  numberOfAnimatedLeaves: 3,
}

export default Animation
