import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'
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
          <Link to="/" className="text-xl font-bold text-blue-600">
            CKAN Cliente
          </Link>
        </div>
        {/* Links centrados */}
        <div className="hidden custom-md:flex flex-1 justify-center">
          <Link
            to="/datasets"
            className={`text-base mx-6 hover:text-primary ${
              location.pathname.startsWith('/datasets')
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
        <div className="hidden custom-md:flex">
          <Button className="rounded-3xl bg-primary text-white hover:bg-primary-hover transition duration-300 ease-in-out">
            <Link to="/login" className="text-sm font-medium">
              Iniciar Sesión
            </Link>
          </Button>
        </div>
      </div>
      {/* Menú mobile con Sheet */}
      <div className="flex justify-between custom-md:hidden px-4">
        <div className="flex custom-md:hidden">
          <Link to="/" className="text-xl font-bold text-blue-600">
            CKAN Cliente
          </Link>
        </div>
        <Sheet>
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
                className="mt-12 text-sm text-gray-500 font-semibold hover:text-primary"
              >
                Datasets
              </Link>
              <Link
                to="/organizaciones"
                className="text-sm text-gray-500 font-semibold hover:text-primary"
              >
                Organizaciones
              </Link>
              <Link
                to="/grupos"
                className="text-sm text-gray-500 font-semibold hover:text-primary"
              >
                Grupos
              </Link>
              <Link
                to="/"
                className="text-sm text-gray-500 font-semibold hover:text-primary"
              >
                Acerca de
              </Link>
              <Button className="rounded-3xl bg-primary text-white hover:bg-primary-hover transition duration-300 ease-in-out">
                <Link to="/login" className="text-sm font-medium">
                  Iniciar Sesión
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default Navbar
