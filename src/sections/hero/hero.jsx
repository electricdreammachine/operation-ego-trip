import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useRef,
  useContext,
} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import root from 'window-or-global'
import { complement, isNil, all, mergeDeepRight } from 'ramda'
import {
  Pattern,
  FullBleedGraphic,
  MaxWidthContainer,
  RasterisingPatternFill,
  PatternContext,
} from 'components'
import useCachedBoundingClientRect from 'lib/hooks/get-cached-bounding-client-rect'
import { createShapes } from './create-shapes'
import Introduction from './introduction'
import Navigation from './navigation'
import Animation from './animation'

import styles from './hero.module.scss'

const Hero = ({ sectionsOnPage, introduction, title }) => {
  const [state, setState] = useState({
    offsetTop: 0,
    paths: {
      trianglePath: null,
      cutOutPath: null,
    },
  })
  const [
    {
      leftAnchorPoint,
      boundingWidth,
      pattern: { anchorToLineOffset },
    },
    dispatch,
  ] = useContext(PatternContext)
  const SVGNode = useRef(null)
  const cutOutNode = useRef(null)
  const navigationNode = useRef(null)
  const SVGNodeRect = useCachedBoundingClientRect(SVGNode.current)
  const cutOutNodeRect = useCachedBoundingClientRect(cutOutNode.current)

  useEffect(() => {
    root.addEventListener('orientationchange', () => root.location.reload())
  }, [])

  useLayoutEffect(() => {
    const { trianglePath, cutOutPath } = createShapes(
      SVGNodeRect,
      cutOutNodeRect,
      leftAnchorPoint,
      boundingWidth,
      anchorToLineOffset,
      root
    )

    setState(mergeDeepRight(state, { paths: { trianglePath, cutOutPath } }))
  }, [leftAnchorPoint, SVGNodeRect, cutOutNodeRect, anchorToLineOffset])

  useEffect(() => {
    const updatedLeftAnchorPoint =
      cutOutNodeRect.left - anchorToLineOffset + cutOutNodeRect.width / 2

    dispatch({
      type: 'SET_LEFT_ANCHOR_POINT',
      payload: updatedLeftAnchorPoint,
    })
  }, [cutOutNodeRect])

  const {
    paths: { trianglePath, cutOutPath },
  } = state

  let Path = null

  if (all(complement(isNil), [trianglePath, cutOutPath])) {
    Path = (
      <path
        d={trianglePath + '' + cutOutPath}
        style={{ fill: 'url(#star)', strokeWidth: '0' }}
      />
    )
  }

  const inlineStyles = {
    transform: `translateX(${anchorToLineOffset + 'px'}) rotate(44.5deg)`,
  }

  return (
    <div className={styles.hero}>
      <FullBleedGraphic className={styles.heroGraphic} ref={SVGNode}>
        <defs>
          <Pattern patternId="star" />
        </defs>
      </FullBleedGraphic>
      <RasterisingPatternFill ref={SVGNode}>{Path}</RasterisingPatternFill>
      <Animation
        xAxisBoundingElement={navigationNode.current}
        yAxisBoundingElement={SVGNode.current}
      />
      <MaxWidthContainer className={styles.gridInherit}>
        <div className={classnames(styles.navList, styles.gridInherit)}>
          <div
            className={styles.wordMarkWrapper}
            ref={cutOutNode}
            style={inlineStyles}
          >
            <span className={styles.wordMark}>
              Oliver Smith
              <span className={styles.tagline}>{title}</span>
            </span>
          </div>
          <div className={styles.navigationWrapper}>
            <Navigation sectionsOnPage={sectionsOnPage} ref={navigationNode} />
          </div>
        </div>
        <Introduction
          className={styles.introduction}
          introduction={introduction}
        />
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
