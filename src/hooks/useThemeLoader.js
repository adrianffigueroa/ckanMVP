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
          // Usamos el theme cacheado si la version es igual
          applyColors(JSON.parse(cachedTheme))
          console.log('🎨 Usando theme cacheado, versión:', version)
        } else {
          // Aplicamos el nuevo y actualizamos el cache
          applyColors(colores)
          localStorage.setItem('themeConfig', JSON.stringify(colores))
          localStorage.setItem('themeVersion', version)
          console.log('🎨 Aplicando theme nuevo, versión:', version)
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
