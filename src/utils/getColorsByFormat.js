const getColorByFormat = (format) => {
  switch (format?.toUpperCase()) {
    case 'HTML':
      return 'bg-blue-600'
    case 'PDF':
      return 'bg-red-600'
    case 'CSV':
    case 'XLS':
    case 'XLSX':
      return 'bg-green-600'
    case 'JSON':
      return 'bg-orange-600'
    default:
      return 'bg-gray-600'
  }
}

export default getColorByFormat
