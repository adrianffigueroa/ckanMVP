import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const CKAN_ADMIN_USERNAME = import.meta.env.VITE_CKAN_ADMIN_USERNAME
const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [logoURL, setLogoURL] = useState(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchLogo = async () => {
        try {
          const res = await fetch(
            `${BASE_URL}/user_show?id=${CKAN_ADMIN_USERNAME}`
          )
          const data = await res.json()

          let image = data.result?.image_url
          if (image) {
            // Si la imagen no incluye URL absoluta, construimos una
            if (!image.startsWith('http')) {
              image = `${BASE_URL.replace('/api/3/action', '')}/uploads/user/${image}`
            }
            setLogoURL(image)
          }
        } catch (err) {
          console.warn('⚠️ No se pudo obtener el logo del admin:', err)
        }
      }

      fetchLogo()
    }, 300) // ⏱️ Espera 300 ms

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 py-4 transition-colors duration-300 ${
        isHome ? '' : 'bg-body'
      }`}
      style={isHome ? { backgroundColor: 'var(--navBarHome)' } : {}}
    >
      <div className="flex items-center w-full px-20 justify-between">
        {/* Logo */}
        <div className="hidden custom-md:flex">
          <Link to="/" className="flex items-center gap-2">
            {logoURL ? (
              <img
                src={logoURL}
                alt="Logo"
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <span className="text-xl font-bold text-primary">Logo</span>
            )}
          </Link>
        </div>
        {/* Links centrados */}
        <div className="hidden custom-md:flex flex-1 justify-center">
          <Link
            to="/datasets"
            className={`text-base mx-6 hover:text-primary ${
              location.pathname.startsWith('/datasets') ||
              location.pathname.startsWith('/resourceView')
                ? 'text-primary font-bold text-shadow custom-md'
                : 'font-normal'
            }`}
          >
            Datasets
          </Link>
          <Link
            to="/organizaciones"
            className={`text-base mx-6 hover:text-primary ${
              location.pathname.startsWith('/organizaciones')
                ? 'text-primary font-bold text-shadow custom-md'
                : 'font-normal'
            }`}
          >
            Organizaciones
          </Link>
          <Link
            to="/grupos"
            className={`text-base mx-6 hover:text-primary ${
              location.pathname.startsWith('/grupos')
                ? 'text-primary font-bold text-shadow custom-md'
                : 'font-normal'
            }`}
          >
            Grupos
          </Link>
          <Link
            to="/about"
            className={`text-base mx-6 hover:text-primary ${
              location.pathname.startsWith('/about')
                ? 'text-primary font-bold text-shadow custom-md'
                : 'font-normal'
            }`}
          >
            Acerca de
          </Link>
        </div>

        {/* Botón derecho */}
        <div className="hidden custom-md:flex"></div>
      </div>
      {/* Menú mobile con Sheet */}
      <div className="flex justify-between custom-md:hidden px-4">
        <div className="flex custom-md:hidden">
          <Link to="/" className="flex items-center gap-2">
            {logoURL ? (
              <img
                src={logoURL}
                alt="Logo"
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <span className="text-xl font-bold text-primary">Logo</span>
            )}
          </Link>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary w-12 h-12"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-6">
            <nav className="flex flex-col gap-8">
              <Link
                to="/datasets"
                onClick={() => setOpen(false)}
                className="mt-12 text-sm text-gray-500 font-semibold hover:text-primary"
              >
                Datasets
              </Link>
              <Link
                to="/organizaciones"
                onClick={() => setOpen(false)}
                className="text-sm text-gray-500 font-semibold hover:text-primary"
              >
                Organizaciones
              </Link>
              <Link
                to="/grupos"
                onClick={() => setOpen(false)}
                className="text-sm text-gray-500 font-semibold hover:text-primary"
              >
                Grupos
              </Link>
              <Link
                to="/about"
                onClick={() => setOpen(false)}
                className="text-sm text-gray-500 font-semibold hover:text-primary"
              >
                Acerca de
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default Navbar
