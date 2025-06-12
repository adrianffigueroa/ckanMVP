function formatResourceName(rawName) {
  return rawName
    .replace(/\.[^/.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/^\w|\s\w/g, (m) => m.toUpperCase())
}

export default formatResourceName
