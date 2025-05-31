const express = require('express')
const path = require('path')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()
const PORT = 3001

// 👇 Este es el backend CKAN real, corriendo en WSL o Docker
const CKAN_URL = 'http://localhost:5000'

// Sirve los archivos de React
app.use(express.static(path.join(__dirname, 'dist')))

// Proxy: cualquier request a /api/* se redirige a CKAN
app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:5000', // ⚠️ esto debe ser el backend real
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/api', // <- esta es la clave
    },
  })
)

// Fallback a index.html para React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`✅ Frontend + proxy corriendo en http://localhost:${PORT}`)
})
