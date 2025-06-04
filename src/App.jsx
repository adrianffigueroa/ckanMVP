import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { useThemeLoader } from '@/hooks/useThemeLoader'
import { Loader2 } from 'lucide-react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

function App() {
  const isThemeReady = useThemeLoader()

  if (!isThemeReady) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-body text-gray-600 gap-4">
        <Loader2 className="animate-spin w-10 h-10 text-primary" />
        <span className="text-lg">Cargando estilo visual del portal...</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-body">
      <Navbar className="top-0 left-0 right-0" />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  )
}

export default App
