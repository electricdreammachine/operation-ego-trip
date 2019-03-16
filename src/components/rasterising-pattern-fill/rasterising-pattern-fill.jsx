import React, { useLayoutEffect, useRef, Fragment, useContext } from 'react'
import { isNil, all, complement, propOr, pathOr, and } from 'ramda'
import canvg from 'canvg'
import { StoreContext } from 'store'
import classnames from 'classnames'
import FullBleedGraphic from '../full-bleed-graphic'

import styles from './rasterising-pattern-fill.module.scss'

const RasterisingPatternFill = React.forwardRef(
  ({ children, className }, ref) => {
    const canvasRef = useRef(null)
    const svgRef = isNil(ref) ? useRef(null) : ref
    const { state: { boundingWidth, patternRef } } = useContext(StoreContext)

    useLayoutEffect(() => {
      if (
        and(
          all(complement(isNil), [propOr(null, 'current', canvasRef), propOr(null, 'current', svgRef), propOr(null, 'current', patternRef)]),
          pathOr(0, ['current', 'childNodes', 'length'], patternRef) > 1
        )
        ) {
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
      }
    })
    
    return (
      <Fragment>
        <FullBleedGraphic className={
          classnames(
            styles.fullBleedGraphic,
            styles.hidden,
            className
          )
        } ref={svgRef}>
          {children}
        </FullBleedGraphic>
        <canvas className={
          classnames(
            styles.fullBleedGraphic,
            className
          )
        } ref={canvasRef} />
      </Fragment>
    )
  }
)

export default RasterisingPatternFill