export const applyColors = (colors) => {
  const root = document.documentElement

  Object.entries(colors).forEach(([key, value]) => {
    if (value) root.style.setProperty(`--${key}`, value)
  })

  // Sombras si el primary es RGB
  const primary = colors.primary
  const match = primary?.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
  if (match) {
    const [_, r, g, b] = match
    root.style.setProperty(
      '--shadow-color-light',
      `rgba(${r}, ${g}, ${b}, 0.15)`
    )
    root.style.setProperty(
      '--shadow-color-medium',
      `rgba(${r}, ${g}, ${b}, 0.25)`
    )
    root.style.setProperty('--shadow-color-dark', `rgba(${r}, ${g}, ${b}, 0.5)`)
  }
}
