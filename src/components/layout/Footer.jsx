import logoCkan from '@/assets/logockan.png'
import { Separator } from '@/components/ui/separator'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="z-100 px-10 bg-white md:px-30 ">
      <Separator />
      <div className="flex justify-between items-start text-gray-500 py-4 z-100 bg-white">
        <div className="flex flex-col">
          <p className="text-primary mb-2 text-lg">Powered by</p>
          <img src={logoCkan} alt="Logo" className="h-8 w-22 mb-2" />
          <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed mb-6">
            Leading digital agency with solid design and development expertise.
            We build readymade websites, mobile applications, and elaborate
            online business services.
          </p>
          <p className="text-sm text-gray-500">Copyright © 2025</p>
        </div>
        <div className="flex gap-4">
          <div className="hidden md:flex flex-col gap-2">
            <Link to="/datasets" className="text-sm hover:text-primary">
              Datasets
            </Link>
            <Link to="/" className="text-sm hover:text-primary">
              Organizaciones
            </Link>
            <Link to="/" className="text-sm hover:text-primary">
              Grupos
            </Link>
            <Link to="/" className="text-sm hover:text-primary">
              Acerca de
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <Link to="/datasets" className="text-sm hover:text-primary">
              About Ckan
            </Link>
            <Link to="/" className="text-sm hover:text-primary">
              CKAN API
            </Link>
            <Link to="/" className="text-sm hover:text-primary">
              CKAN Association
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
