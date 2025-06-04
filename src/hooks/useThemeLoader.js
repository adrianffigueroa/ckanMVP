import { applyColors } from '@/utils/applyColors'
import { getThemeFromUserAbout } from '@/utils/getThemeFromUserAbout'
import { useEffect, useState } from 'react'

export const useThemeLoader = () => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const cached = localStorage.getItem('themeConfig')
    if (cached) {
      applyColors(JSON.parse(cached))
      setIsReady(true)
    } else {
      getThemeFromUserAbout()
        .then((theme) => {
          if (theme && typeof theme === 'object') {
            applyColors(theme)
            localStorage.setItem('themeConfig', JSON.stringify(theme))
          } else {
            console.warn('❌ El tema no contiene colores válidos')
          }
        })
        .catch((err) => {
          console.error('❌ Error al obtener el theme del servidor:', err)
        })
        .finally(() => setIsReady(true))
    }
  }, [])

  return isReady
}
