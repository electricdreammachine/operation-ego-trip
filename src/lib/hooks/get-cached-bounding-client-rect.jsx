import { useEffect, useState } from 'react'
import root from 'window-or-global'
import isEmptyRect from 'lib/utils/is-empty-rect'

const emptyDomRect = window.DOMRect
  ? new DOMRect()
  : {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    }

const useCachedBoundingClientRect = (element, callback = null) => {
  const [rect, setRect] = useState(emptyDomRect)

  const clearCachedClientRect = () =>
    window.requestIdleCallback(() => setRect(emptyDomRect))

  useEffect(() => {
    if (element && isEmptyRect(rect)) {
      window.requestAnimationFrame(() => {
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
