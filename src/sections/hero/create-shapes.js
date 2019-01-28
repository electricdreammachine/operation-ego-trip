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

export const createShapes = ( svgContainerNode, cutOutTemplateNode, lineOffset, rootElement ) => {
  if (any(isNil, [svgContainerNode, cutOutTemplateNode])) {
    return {
      trianglePath: null,
      cutOutPath: null,
    }
  }

  const { height: windowHeight } = svgContainerNode.getBoundingClientRect()
  const intersectsInCutOutNodeBounds = intersectsWithinBounds(cutOutTemplateNode.getBoundingClientRect())
  const offsetTop = propOr(
    0,
    'pageYOffset',
    rootElement
  )

  const trianglePath = (nodeHeight => [
      `M 0 0`,
      `L ${nodeHeight} 0`,
      `L 0 ${nodeHeight}`,
      'Z'
  ].join(' '))(windowHeight)

  const cutOutPath = (({ top, right, bottom, left, width, height }) => {
    const triangleHypotenuse = { start: { x: 0, y: windowHeight }, end: { x: windowHeight, y: 0 } }
    const anchors = {
      start: { x: right, y: (top + offsetTop) + height / 2 },
      top: { x: (left + width / 2), y: top + offsetTop },
      left: { x: left, y: (top + offsetTop) + height / 2 },
      bottom: { x: (left + width / 2), y: bottom + offsetTop },
    }
    const intersects = {
      start: describe({ start: anchors.start, end: anchors.top }, triangleHypotenuse),
      top: describe({ start: anchors.top, end: anchors.left }, triangleHypotenuse),
      left: describe({ start: anchors.left, end: anchors.top }, triangleHypotenuse),
      bottom: describe({ start: anchors.bottom, end: anchors.left }, triangleHypotenuse),
    }

    const points = mergeAll(map(
      (anchorName) => {
        const intersectForAnchor = prop([anchorName], intersects)

        if (intersectsInCutOutNodeBounds(intersectForAnchor.intersection)) {
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