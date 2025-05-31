export const getRecommendedAxes = (columns, data) => {
  if (!columns || !data || data.length === 0) return { x: '', y: '' }

  // Filtrar columnas numéricas
  const numericCols = columns.filter((col) =>
    data.every((row) => !isNaN(parseFloat(row[col])))
  )

  // Elegir columna numérica con más variabilidad (mejor para eje Y)
  const yAxis =
    numericCols.find((col) => {
      const unique = new Set(data.map((row) => parseFloat(row[col]))).size
      return unique > 1
    }) ||
    numericCols[0] ||
    ''

  // Buscar columna no numérica con menos valores únicos (mejor para eje X)
  const nonNumericCols = columns.filter((col) => !numericCols.includes(col))

  const sortedByUniqueness = nonNumericCols
    .map((col) => ({
      col,
      uniqueCount: new Set(data.map((row) => row[col])).size,
    }))
    .sort((a, b) => a.uniqueCount - b.uniqueCount)

  const xAxis = sortedByUniqueness[0]?.col || ''

  return { x: xAxis, y: yAxis }
}
