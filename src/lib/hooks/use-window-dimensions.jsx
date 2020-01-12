import { useState, useEffect } from 'react'
import root from 'window-or-global'

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = root
  return {
    width,
    height,
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions())
    }

    root.addEventListener('resize', handleResize)
    return () => root.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}
