import getPattern from './pattern-utils'

describe('get Pattern', () => {
  describe('base functionality', () => {
    it('adds a position every 10 units from x 0 to x boundingWidth', () => {
      const boundingWidth = 500
      const lineBoundary = 100
      const renderedPattern = getPattern(lineBoundary, boundingWidth)

      expect(renderedPattern.linePositions.length).toEqual(
        boundingWidth / 10 + 1
      )
    })

    it('finds the three nearest positions to the boundary and adds them to accentedLinePositions', () => {
      const boundingWidth = 500
      const lineBoundary = 100
      const renderedPattern = getPattern(lineBoundary, boundingWidth)

      expect(renderedPattern.accentedLinePositions).toEqual(
        expect.arrayContaining([90, 100, 110])
      )
    })

    it('finds the three nearest lines to the boundary reflected and adds them to accentedLinePositions', () => {
      const boundingWidth = 500
      const lineBoundary = 100
      const renderedPattern = getPattern(lineBoundary, boundingWidth)

      expect(renderedPattern.accentedLinePositions).toEqual(
        expect.arrayContaining([390, 400, 410])
      )
    })
  })

  describe('potential edge cases', () => {
    describe('odd numbered width', () => {
      it('finds the three nearest lines to the boundary and gives them the accent colour', () => {
        const boundingWidth = 1483
        const lineBoundary = 100
        const renderedPattern = getPattern(lineBoundary, boundingWidth)

        expect(renderedPattern.accentedLinePositions).toEqual(
          expect.arrayContaining([90, 100, 110])
        )
      })

      it('finds the three nearest lines to the boundary reflected and gives them the accent colour', () => {
        const boundingWidth = 1483
        const lineBoundary = 100
        const renderedPattern = getPattern(lineBoundary, boundingWidth)

        expect(renderedPattern.accentedLinePositions).toEqual(
          expect.arrayContaining([390, 400, 410])
        )
      })
    })

    describe('even numbered width, odd numbered boundary', () => {
      it('finds the three nearest lines to the boundary and gives them the accent colour', () => {
        const boundingWidth = 1680
        const lineBoundary = 385
        const renderedPattern = getPattern(lineBoundary, boundingWidth)

        expect(renderedPattern.accentedLinePositions).toEqual(
          expect.arrayContaining([370, 380, 390])
        )
      })

      it('finds the three nearest lines to the boundary reflected and gives them the accent colour', () => {
        const boundingWidth = 1680
        const lineBoundary = 385
        const renderedPattern = getPattern(lineBoundary, boundingWidth)

        expect(renderedPattern.accentedLinePositions).toEqual(
          expect.arrayContaining([1280, 1290, 1300])
        )
      })
    })

    describe('odd numbered width and boundary', () => {
      it('finds the three nearest lines to the boundary and gives them the accent colour', () => {
        const boundingWidth = 1483
        const lineBoundary = 287
        const renderedPattern = getPattern(lineBoundary, boundingWidth)

        expect(renderedPattern.accentedLinePositions).toEqual(
          expect.arrayContaining([280, 290, 300])
        )
      })

      it('finds the three nearest lines to the boundary reflected and gives them the accent colour', () => {
        const boundingWidth = 1483
        const lineBoundary = 287
        const renderedPattern = getPattern(lineBoundary, boundingWidth)

        expect(renderedPattern.accentedLinePositions).toEqual(
          expect.arrayContaining([1190, 1200, 1210])
        )
      })
    })
  })
})
