import React, { useState, useLayoutEffect, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import root from 'window-or-global'
import { complement, isNil, all, mergeDeepRight } from 'ramda'
import { Pattern, FullBleedGraphic, MaxWidthContainer, RasterisingPatternFill } from 'components'
import { createShapes } from './create-shapes'
import Introduction from './introduction'
import Navigation from './navigation'
import Animation from './animation'

import styles from './hero.module.scss'

const Hero = ({ boundingWidth, boundingHeight, lineOffset = 0, lineBoundary, sectionsOnPage, introduction, setInStore, title }) => {
  const [state, setState] = useState({
    offsetTop: 0,
    paths: {
      trianglePath: null,
      cutOutPath: null,
    },
  })
  const SVGNode = useRef(null)
  const cutOutNode = useRef(null)
  const navigationNode = useRef(null)
  const lineProps = useRef({
    lineBoundary,
    lineOffset,
  })

  useEffect(() => {
    getLineBoundary()
    root.requestAnimationFrame(loop)
    root.addEventListener('orientationchange', () => root.location.reload())
  }, [])

  useEffect(() => {
    lineProps.current = {
      lineBoundary,
      lineOffset
    }
  })

  useLayoutEffect(() => {
    const { trianglePath, cutOutPath } = createShapes(
      SVGNode.current,
      cutOutNode.current,
      lineBoundary,
      boundingWidth,
      root
    )

    setState(mergeDeepRight(state, { paths: { trianglePath, cutOutPath } }))
  }, [lineOffset])

  const loop = () => {
    getLineBoundary()
    return root.requestAnimationFrame(loop)
  }

  const getLineBoundary = () => {
    if (cutOutNode.current !== null) {
      const { left, width } = cutOutNode.current.getBoundingClientRect()
      const updatedLineBoundary = (left - lineProps.current.lineOffset) + width / 2

      if (Math.round(lineProps.current.lineBoundary) !== Math.round(updatedLineBoundary)) {
        return setInStore({ lineBoundary: Math.round(updatedLineBoundary) })
      }

      return null
    }
  }

  const { paths: { trianglePath, cutOutPath } } = state

  let Path = null

  if (all(complement(isNil), [trianglePath, cutOutPath])) {
    Path = <path d={trianglePath + '' + cutOutPath} style={{ 'fill': 'url(#star)', 'strokeWidth': '0' }} />
  }

  return (
    <div className={styles.hero}>
      <FullBleedGraphic className={styles.heroGraphic} ref={SVGNode}>
        <defs>
          <Pattern
            lineBoundary={lineBoundary}
            boundingHeight={boundingHeight}
            boundingWidth={boundingWidth}
            patternId="star"
          />
        </defs>
      </FullBleedGraphic>
      <RasterisingPatternFill ref={SVGNode}>
        {Path}
      </RasterisingPatternFill>
      <Animation
        xAxisBoundingElement={navigationNode.current}
        yAxisBoundingElement={SVGNode.current}
      />
      <MaxWidthContainer className={styles.gridInherit}>
        <div className={styles.navList}>
          <div className={styles.wordMarkWrapper} ref={cutOutNode} style={{ 'transform': `translateX(${lineOffset + 'px'}) rotate(44.5deg)` }}>
            <span className={styles.wordMark}>
              Oliver Smith
              <span className={styles.tagline}>
                {title}
              </span>
            </span>
          </div>
          <div className={styles.navigationWrapper}>
            <Navigation sectionsOnPage={sectionsOnPage} ref={navigationNode} />
          </div>
        </div>
        <Introduction className={styles.introduction} introduction={introduction} />
      </MaxWidthContainer>
    </div>
  )
}

Hero.propTypes = {
  setInStore: PropTypes.func,
  boundingWidth: PropTypes.number,
  boundingHeight: PropTypes.number,
  lineBoundary: PropTypes.number,
  title: PropTypes.string,
}

Hero.defaultProps = {
  title: 'Software Engineeer',
}

export default Hero