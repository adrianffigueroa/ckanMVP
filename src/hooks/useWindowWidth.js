import { useEffect, useState } from 'react'

export function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    // Limpieza del event listener al desmontar
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return width
}
