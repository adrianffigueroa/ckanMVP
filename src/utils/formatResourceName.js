function formatResourceName(rawName) {
  return rawName
    .replace(/\.[^/.]+$/, '') // quitar extensión
    .replace(/[_-]+/g, ' ') // reemplazar _ o - por espacio
    .replace(/\s+/g, ' ') // quitar espacios extra
    .trim()
    .toLowerCase()
    .replace(/^\w|\s\w/g, (m) => m.toUpperCase()) // capitalizar
}

export default formatResourceName
