const BASE_URL = import.meta.env.VITE_API_BASE_URL
const CKAN_ADMIN_USERNAME = import.meta.env.VITE_CKAN_ADMIN_USERNAME

export const getThemeFromUserAbout = async () => {
  try {
    const res = await fetch(`${BASE_URL}/user_show?id=${CKAN_ADMIN_USERNAME}`)
    const data = await res.json()

    const about = JSON.parse(data.result.about)

    const version = about.version ?? '1'

    const { version: _, ...coloresPlano } = about

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

    const mergedColors = { ...defaultColors, ...coloresPlano }

    return { colores: mergedColors, version }
  } catch (err) {
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
