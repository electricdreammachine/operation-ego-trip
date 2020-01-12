import { useEffect, useState } from 'react'
import root from 'window-or-global'
import isEmptyRect from 'lib/utils/is-empty-rect'

const emptyDomRect = new DOMRect()

const useCachedBoundingClientRect = (element, callback = null) => {
  const [rect, setRect] = useState(emptyDomRect)

  const clearCachedClientRect = () =>
    root.requestIdleCallback(() => setRect(emptyDomRect))

  useEffect(() => {
    if (element && isEmptyRect(rect)) {
      root.requestAnimationFrame(() => {
        const elementBoundingRect = element.getBoundingClientRect()
        setRect(elementBoundingRect)

        if (callback) {
          callback(elementBoundingRect)
        }
      })
    }
  }, [element, rect])

  useEffect(() => {
    root.addEventListener('resize', clearCachedClientRect)

    return () => {
      root.removeEventListener('resize', clearCachedClientRect)
    }
  }, [])

  return rect
}

export default useCachedBoundingClientRect
