import { findOuterAccentBoundaries } from './pattern-utils'

describe('findOuterAccentBoundaries', () => {
    it('finds the correct outer boundaries', () => {
        const lineBoundary = 385
        const width = 1680

        expect(findOuterAccentBoundaries(lineBoundary, width)).toEqual({
            left: 393,
            right: 1279,
        })
    })

    it('finds the correct outer boundaries', () => {
        const lineBoundary = 363
        const width = 1637

        expect(findOuterAccentBoundaries(lineBoundary, width)).toEqual({
            left: 373,
            right: 1259,
        })
    })

    it('finds the correct outer boundaries', () => {
        const lineBoundary = 260
        const width = 1430

        expect(findOuterAccentBoundaries(lineBoundary, width)).toEqual({
            left: 273,
            right: 1159,
        })
    })

    it('finds the correct outer boundaries', () => {
        const lineBoundary = 267
        const width = 1444

        expect(findOuterAccentBoundaries(lineBoundary, width)).toEqual({
            left: 283,
            right: 1169,
        })
    })
})
