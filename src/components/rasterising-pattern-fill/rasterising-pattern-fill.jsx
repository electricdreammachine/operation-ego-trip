import React, { useLayoutEffect, useRef, Fragment, useContext, useState } from 'react'
import { isNil, all, complement, propOr, pathOr, and, mergeDeepRight } from 'ramda'
import canvg from 'canvg'
import { StoreContext } from 'store'
import classnames from 'classnames'
import FullBleedGraphic from '../full-bleed-graphic'

import styles from './rasterising-pattern-fill.module.scss'

const RasterisingPatternFill = React.forwardRef(
  ({ children, className }, ref) => {
    const [state, setState] = useState({
      hasCompletedFirstMeaningfulRender: false,
      canRasterise: true,
    })
    const canvasRef = useRef(null)
    const svgRef = isNil(ref) ? useRef(null) : ref
    const { state: { boundingWidth, patternRef } } = useContext(StoreContext)

    useLayoutEffect(() => {
      if ( state.canRasterise &&
        and(
            all(complement(isNil), [propOr(null, 'current', canvasRef), propOr(null, 'current', svgRef), propOr(null, 'current', patternRef)]),
            pathOr(0, ['current', 'childNodes', 'length'], patternRef) > 1
          )
        ) {
        if (!state.hasCompletedFirstMeaningfulRender) {
          setState(mergeDeepRight(state, { hasCompletedFirstMeaningfulRender: true }))
        }
        try {
          const s = new XMLSerializer()
          const svgToRasterise = svgRef.current.cloneNode(true)
          const pattern = patternRef.current.cloneNode(true)
          const defs = document.createElement('defs')
          pattern.setAttributeNS(null, 'viewBox', `0 0 ${boundingWidth} ${svgRef.current.clientHeight}`)
          pattern.setAttributeNS(null, 'width', boundingWidth)
          pattern.setAttributeNS(null, 'height', svgRef.current.clientHeight)
          svgToRasterise.setAttributeNS(null, 'viewBox', `0 0 ${boundingWidth} ${svgRef.current.clientHeight}`)
          svgToRasterise.setAttributeNS(null, 'width', boundingWidth)
          svgToRasterise.setAttributeNS(null, 'height', svgRef.current.clientHeight)
          defs.appendChild(pattern)
          svgToRasterise.prepend(defs)
          canvg(canvasRef.current, s.serializeToString(svgToRasterise))
        } catch {
          setState(mergeDeepRight(state, { canRasterise: false, hasCompletedFirstMeaningfulRender: true }))
        }
      }
    })
    
    return (
      <Fragment>
        <FullBleedGraphic className={
          classnames(
            styles.fullBleedGraphic,
            { [styles.hidden]: state.canRasterise,
              [styles.enter]: !state.canRasterise && state.hasCompletedFirstMeaningfulRender,
            },
            className
          )
        } ref={svgRef}
          >
          {children}
        </FullBleedGraphic>
        { state.canRasterise && (<canvas className={
          classnames(
            styles.fullBleedGraphic,
            { [styles.enter]: state.hasCompletedFirstMeaningfulRender },
            className
          )
        } ref={canvasRef}
        />)
        }
      </Fragment>
    )
  }
)

export default RasterisingPatternFill