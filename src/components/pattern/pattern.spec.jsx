import React, { createContext } from 'react'
import { shallow } from 'enzyme'
import store from 'store'
import Pattern from './pattern'
import { accentColor } from './pattern.scss'

jest.mock('store', () => jest.fn())

describe('Pattern component', () => {
  const defaultProps = {
    boundingWidth: 500,
    lineBoundary: 50,
  }

  const createPattern = (props) => {
    const fullProps = {
      ...props,
      ...defaultProps,
    }
    return shallow(<Pattern {...props} />)
  }

  beforeAll(() => {
    store.StoreContext = createContext({
      actions: {
        setInStore: () => {},
      },
    })
  })

  describe('base functionality', () => {
    it('renders a line every 10 pixels from x 0 to x boundingWidth', () => {
      const boundingWidth = 500
      const renderedPattern = createPattern({ boundingWidth })
      
      expect(renderedPattern.find('line').length).toEqual(boundingWidth / 10)
    })

    it('finds the three nearest lines to the boundary and gives them the accent colour', () => {
      const boundingWidth = 500
      const lineBoundary = 100
      const renderedPattern = createPattern({ boundingWidth, lineBoundary })
      const expectedLineIndices = [9, 10, 11]

      expect(expectedLineIndices.map(index =>
          renderedPattern.find('line').at(index).props().style.stroke
        )
      ).toEqual([accentColor, accentColor, accentColor])
    })

    it('finds the three nearest lines to the boundary reflected and gives them the accent colour', () => {
      const boundingWidth = 500
      const lineBoundary = 100
      const renderedPattern = createPattern({ boundingWidth, lineBoundary })
      const expectedLineIndices = [39, 40, 41]

      expect(expectedLineIndices.map(index =>
          renderedPattern.find('line').at(index).props().style.stroke
        )
      ).toEqual([accentColor, accentColor, accentColor])
    }) 
  })

  describe('potential edge cases', () => {
    describe('odd numbered width', () => {
      it('finds the three nearest lines to the boundary and gives them the accent colour', () => {
        const boundingWidth = 1483
        const lineBoundary = 100
        const renderedPattern = createPattern({ boundingWidth, lineBoundary })
        const expectedLineIndices = [9, 10, 11]
  
        expect(expectedLineIndices.map(index =>
            renderedPattern.find('line').at(index).props().style.stroke
          )
        ).toEqual([accentColor, accentColor, accentColor])
      })
  
      it('finds the three nearest lines to the boundary reflected and gives them the accent colour', () => {
        const boundingWidth = 1483
        const lineBoundary = 100
        const renderedPattern = createPattern({ boundingWidth, lineBoundary })
        const expectedLineIndices = [137, 138, 139]
  
        expect(expectedLineIndices.map(index =>
            renderedPattern.find('line').at(index).props().style.stroke
          )
        ).toEqual([accentColor, accentColor, accentColor])
      }) 
    })

    describe('even numbered width, odd numbered boundary', () => {
      it('finds the three nearest lines to the boundary and gives them the accent colour', () => {
        const boundingWidth = 1680
        const lineBoundary = 385
        const renderedPattern = createPattern({ boundingWidth, lineBoundary })
        const expectedLineIndices = [37, 38, 39]
  
        expect(expectedLineIndices.map(index =>
            renderedPattern.find('line').at(index).props().style.stroke
          )
        ).toEqual([accentColor, accentColor, accentColor])
      })
  
      it('finds the three nearest lines to the boundary reflected and gives them the accent colour', () => {
        const boundingWidth = 1680
        const lineBoundary = 385
        const renderedPattern = createPattern({ boundingWidth, lineBoundary })
        const expectedLineIndices = [128, 129, 130]
  
        expect(expectedLineIndices.map(index =>
            renderedPattern.find('line').at(index).props().style.stroke
          )
        ).toEqual([accentColor, accentColor, accentColor])
      }) 
    })

    describe('odd numbered width and boundary', () => {
      it('finds the three nearest lines to the boundary and gives them the accent colour', () => {
        const boundingWidth = 1483
        const lineBoundary = 287
        const renderedPattern = createPattern({ boundingWidth, lineBoundary })
        const expectedLineIndices = [28, 29, 30]
  
        expect(expectedLineIndices.map(index =>
            renderedPattern.find('line').at(index).props().style.stroke
          )
        ).toEqual([accentColor, accentColor, accentColor])
      })
  
      it('finds the three nearest lines to the boundary reflected and gives them the accent colour', () => {
        const boundingWidth = 1483
        const lineBoundary = 287
        const renderedPattern = createPattern({ boundingWidth, lineBoundary })
        const expectedLineIndices = [118, 119, 120]
  
        expect(expectedLineIndices.map(index =>
            renderedPattern.find('line').at(index).props().style.stroke
          )
        ).toEqual([accentColor, accentColor, accentColor])
      }) 
    })
  })
})