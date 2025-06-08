const BASE_URL = 'https://ckan-data-project.duckdns.org/api/3/action'
const CKAN_ADMIN_USERNAME = 'admin'

export const getThemeFromUserAbout = async () => {
  try {
    const res = await fetch(`${BASE_URL}/user_show?id=${CKAN_ADMIN_USERNAME}`)
    const data = await res.json()

    const about = JSON.parse(data.result.about)

    // Si está en formato con colors y themeVersion, usarlo
    const colores = about.colors ?? about
    const version = about.themeVersion ?? '1'

    // Validamos que todos los campos existan
    const defaultColors = {
      primary: 'rgb(74, 58, 255)',
      decorator: 'rgb(243, 243, 255)',
      customColor1: 'rgb(0, 0, 0)',
      customColor1Hover: 'rgb(255, 255, 255)',
      customColor2: 'rgb(75, 85, 99)',
      'primary-hover': 'rgb(78, 65, 150)',
      body: 'rgb(250, 250, 252)',
      navBarHome: 'rgb(237, 235, 252)',
      third: 'rgba(164, 156, 255, 1)',
      bgIcon: 'rgba(57, 42, 230, 0.15)',
      secondary: 'rgba(240, 240, 255, 1)',
    }

    // Merge: si faltan keys, usar defaults
    const mergedColors = { ...defaultColors, ...colores }

    return { colores: mergedColors, version }
  } catch (err) {
    console.warn('❌ No se pudo obtener o parsear el JSON de colores:', err)

    // Valores por defecto si falla
    return {
      colores: {
        primary: 'rgb(74, 58, 255)',
        decorator: 'rgb(243, 243, 255)',
        customColor1: 'rgb(0, 0, 0)',
        customColor1Hover: 'rgb(255, 255, 255)',
        customColor2: 'rgb(75, 85, 99)',
        'primary-hover': 'rgb(78, 65, 150)',
        body: 'rgb(250, 250, 252)',
        navBarHome: 'rgb(237, 235, 252)',
        third: 'rgba(164, 156, 255, 1)',
        bgIcon: 'rgba(57, 42, 230, 0.15)',
        secondary: 'rgba(240, 240, 255, 1)',
      },
      version: '1',
    }
  }
}
