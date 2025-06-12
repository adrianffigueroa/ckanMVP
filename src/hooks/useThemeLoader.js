import { applyColors } from '@/utils/applyColors'
import { getThemeFromUserAbout } from '@/utils/getThemeFromUserAbout'
import { useEffect, useState } from 'react'

export const useThemeLoader = () => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const cachedTheme = localStorage.getItem('themeConfig')
    const cachedVersion = localStorage.getItem('themeVersion')

    getThemeFromUserAbout()
      .then(({ colores, version }) => {
        const shouldUpdate = cachedVersion !== version

        if (cachedTheme && !shouldUpdate) {
          applyColors(JSON.parse(cachedTheme))
        } else {
          applyColors(colores)
          localStorage.setItem('themeConfig', JSON.stringify(colores))
          localStorage.setItem('themeVersion', version)
        }
      })
      .catch((err) => {
        console.error('❌ Error al obtener el theme del servidor:', err)
        if (cachedTheme) {
          applyColors(JSON.parse(cachedTheme))
          console.log('🎨 Usando theme cacheado por error')
        }
      })
      .finally(() => setIsReady(true))
  }, [])

  return isReady
}
