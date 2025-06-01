//const BASE_URL = 'http://localhost:5000/api/3/action'
const BASE_URL =
  'https://facilities-western-throughout-cement.trycloudflare.com/api/3/action'

const ADMIN_USERNAME = 'ckan_admin'

export const getThemeFromUserAbout = async () => {
  try {
    const res = await fetch(`${BASE_URL}/user_show?id=${ADMIN_USERNAME}`)
    const data = await res.json()
    const colores = JSON.parse(data.result.about)
    return colores
  } catch (err) {
    console.warn('❌ No se pudo obtener o parsear el JSON de colores:', err)
    return null
  }
}
