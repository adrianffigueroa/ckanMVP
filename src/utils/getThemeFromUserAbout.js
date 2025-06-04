const BASE_URL = import.meta.env.VITE_API_BASE_URL
const CKAN_ADMIN_USERNAME = import.meta.env.VITE_CKAN_ADMIN_USERNAME

export const getThemeFromUserAbout = async () => {
  try {
    const res = await fetch(`${BASE_URL}/user_show?id=${CKAN_ADMIN_USERNAME}`)
    const data = await res.json()

    const colores = JSON.parse(data.result.about)
    return colores
  } catch (err) {
    console.warn('❌ No se pudo obtener o parsear el JSON de colores:', err)
    // Valores por defecto si falla
    return {
      primary: 'rgb(74, 58, 255)',
      secondary: '#1c6b08',
      body: '#ffffff',
    }
  }
}
