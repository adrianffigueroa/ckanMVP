export const getRecommendedAxes = (columns, data) => {
  if (!columns || !data || data.length === 0) return { x: '', y: '' }

  const numericCols = columns.filter((col) =>
    data.every((row) => !isNaN(parseFloat(row[col])))
  )

  const yAxis =
    numericCols.find((col) => {
      const unique = new Set(data.map((row) => parseFloat(row[col]))).size
      return unique > 1
    }) ||
    numericCols[0] ||
    ''

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
