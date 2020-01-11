import { all, any, propOr, map, prop, mergeAll, allPass, equals } from 'ramda'
import { describe } from 'intersection'

const intersectsWithinBounds = ({ left, height, width, top }) => intersect => {
  const xAxisWithinBounds = allPass([
    xCoord => xCoord > left,
    xCoord => xCoord < left + width,
  ])(intersect.x)

  const yAxisWithinBounds = allPass([
    yCoord => yCoord > top,
    yCoord => yCoord < top + height,
  ])(intersect.y)

  return xAxisWithinBounds && yAxisWithinBounds
}

export const createShapes = (
  svgContainerNodeRect,
  cutOutTemplateNodeRect,
  lineBoundary,
  boundingWidth,
  anchorToLineOffset,
  rootElement
) => {
  console.log(anchorToLineOffset)
  if (
    any(
      rect => {
        const rectValues = map(prop => rect[prop], [
          'x',
          'y',
          'left',
          'top',
          'right',
          'bottom',
          'width',
          'height',
        ])

        return all(equals(0), rectValues)
      },
      [svgContainerNodeRect, cutOutTemplateNodeRect]
    )
  ) {
    return {
      trianglePath: null,
      cutOutPath: null,
    }
  }

  const percentageXAxisCutOut = (100 * lineBoundary) / boundingWidth
  const { height: windowHeight } = svgContainerNodeRect
  const intersectsInCutOutNodeBounds = intersectsWithinBounds(
    cutOutTemplateNodeRect
  )
  const offsetTop = propOr(0, 'pageYOffset', rootElement)

  const trianglePath = [
    (nodeHeight =>
      [`M 0 0`, `L ${nodeHeight} 0`, `L 0 ${nodeHeight}`, 'Z'].join(' '))(
      windowHeight
    ),
    ((fullWidth, { top, height }) =>
      [
        `M 0 0`,
        `L ${fullWidth} 0`,
        `L ${fullWidth} ${top + height}`,
        `L 0 ${top + height}`,
        'Z',
      ].join(' '))(boundingWidth, cutOutTemplateNodeRect),
  ][percentageXAxisCutOut >= 45 && percentageXAxisCutOut <= 55 ? 1 : 0]

  const cutOutPath = (({ top, right, bottom, left, width, height }) => {
    const intersectLine =
      percentageXAxisCutOut >= 45 && percentageXAxisCutOut <= 55
        ? {
            start: { x: 0, y: windowHeight },
            end: { x: windowHeight, y: windowHeight },
          }
        : { start: { x: 0, y: windowHeight }, end: { x: windowHeight, y: 0 } }

    const anchors = {
      start: { x: right - anchorToLineOffset, y: top + offsetTop + height / 2 },
      top: { x: left + anchorToLineOffset + width / 2, y: top + offsetTop },
      left: { x: left + anchorToLineOffset, y: top + offsetTop + height / 2 },
      bottom: {
        x: left + anchorToLineOffset + width / 2,
        y: bottom + offsetTop,
      },
    }
    const intersects = {
      start: describe(
        { start: anchors.start, end: anchors.top },
        intersectLine
      ),
      top: describe({ start: anchors.top, end: anchors.left }, intersectLine),
      left: describe({ start: anchors.left, end: anchors.top }, intersectLine),
      bottom: describe(
        { start: anchors.bottom, end: anchors.left },
        intersectLine
      ),
    }

    const points = mergeAll(
      map(anchorName => {
        const intersectForAnchor = prop([anchorName], intersects)

        if (intersectsInCutOutNodeBounds(intersectForAnchor.intersection)) {
          return {
            [anchorName]: intersectForAnchor.intersection,
          }
        }

        return {
          [anchorName]: anchors[anchorName],
        }
      }, Object.keys(anchors))
    )

    return [
      `M ${points.start.x} ${points.start.y}`,
      `L ${points.top.x} ${points.top.y}`,
      `L ${points.left.x} ${points.left.y}`,
      `L ${points.bottom.x} ${points.bottom.y}`,
      'Z',
    ].join(' ')
  })(cutOutTemplateNodeRect)

  return {
    trianglePath,
    cutOutPath,
  }
}
