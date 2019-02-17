import { isNil, any, propOr, map, prop, mergeAll, allPass } from "ramda"
import { describe } from 'intersection'

const intersectsWithinBounds = ({ left, height, width, top }) => intersect => {
  const xAxisWithinBounds = allPass(
    [
      xCoord => xCoord > left,
      xCoord => xCoord < left + width, 
    ]
  )(intersect.x)

  const yAxisWithinBounds = allPass(
    [
      yCoord => yCoord > top,
      yCoord => yCoord < top + height,
    ]
  )(intersect.y)

  return xAxisWithinBounds && yAxisWithinBounds
}

export const createShapes = ( svgContainerNode, cutOutTemplateNode, lineBoundary, boundingWidth, rootElement ) => {
  if (any(isNil, [svgContainerNode, cutOutTemplateNode])) {
    return {
      trianglePath: null,
      cutOutPath: null,
    }
  }

  const percentageXAxisCutOut = 100 * lineBoundary / boundingWidth
  const { height: windowHeight } = svgContainerNode.getBoundingClientRect()
  const intersectsInCutOutNodeBounds = intersectsWithinBounds(cutOutTemplateNode.getBoundingClientRect())
  const offsetTop = propOr(
    0,
    'pageYOffset',
    rootElement
  )

  const trianglePath = [
    (nodeHeight => [
      `M 0 0`,
      `L ${nodeHeight} 0`,
      `L 0 ${nodeHeight}`,
      'Z'
    ].join(' '))(windowHeight),
    ((fullWidth, { top, height }) => [
      `M 0 0`,
      `L ${fullWidth} 0`,
      `L ${fullWidth} ${top + height}`,
      `L 0 ${top + height}`,
      'Z'
    ].join(' '))(boundingWidth, cutOutTemplateNode.getBoundingClientRect())
  ][percentageXAxisCutOut >= 45 && percentageXAxisCutOut <=55 ? 1 : 0]

  console.log(100*lineBoundary/boundingWidth)

  const cutOutPath = (({ top, right, bottom, left, width, height }) => {
    const intersectLine = percentageXAxisCutOut >= 45 && percentageXAxisCutOut <=55
      ? { start: { x: 0, y: windowHeight }, end: { x: windowHeight, y: windowHeight } }
      : { start: { x: 0, y: windowHeight }, end: { x: windowHeight, y: 0 } }

    const anchors = {
      start: { x: right, y: (top + offsetTop) + height / 2 },
      top: { x: (left + width / 2), y: top + offsetTop },
      left: { x: left, y: (top + offsetTop) + height / 2 },
      bottom: { x: (left + width / 2), y: bottom + offsetTop },
    }
    const intersects = {
      start: describe({ start: anchors.start, end: anchors.top }, intersectLine),
      top: describe({ start: anchors.top, end: anchors.left }, intersectLine),
      left: describe({ start: anchors.left, end: anchors.top }, intersectLine),
      bottom: describe({ start: anchors.bottom, end: anchors.left }, intersectLine),
    }

    const points = mergeAll(map(
      (anchorName) => {
        const intersectForAnchor = prop([anchorName], intersects)

        console.log(intersectForAnchor)

        if (intersectsInCutOutNodeBounds(intersectForAnchor.intersection)) {
          console.log('detecting intersect')
          return {
            [anchorName]: intersectForAnchor.intersection,
          }
        }

        return {
          [anchorName]: anchors[anchorName]
        }
      },
      Object.keys(anchors)
    ))

    return [
      `M ${points.start.x} ${points.start.y}`,
      `L ${points.top.x} ${points.top.y}`,
      `L ${points.left.x} ${points.left.y}`,
      `L ${points.bottom.x} ${points.bottom.y}`,
      'Z'
    ].join(' ')
  })(cutOutTemplateNode.getBoundingClientRect())

  return {
    trianglePath,
    cutOutPath,
  }
}