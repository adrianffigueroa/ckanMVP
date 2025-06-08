const BASE_URL = 'https://ckan-data-project.duckdns.org/api/3/action'
const CKAN_ADMIN_USERNAME = 'admin'

export const getThemeFromUserAbout = async () => {
  try {
    const res = await fetch(`${BASE_URL}/user_show?id=${CKAN_ADMIN_USERNAME}`)
    const data = await res.json()

    const about = JSON.parse(data.result.about)
    const colores = about.colors || about // por si tenés el JSON con o sin campo colors
    const version = about.themeVersion || '1' // o '20240604' o timestamp, depende lo que guardes

    return { colores, version }
  } catch (err) {
    console.warn('❌ No se pudo obtener o parsear el JSON de colores:', err)
    // Valores por defecto si falla
    return {
      colores: {
        primary: 'rgb(74, 58, 255)',
        secondary: '#1c6b08',
        body: '#ffffff',
      },
      version: '1.0.0',
    }
  }
}
