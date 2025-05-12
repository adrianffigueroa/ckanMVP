import SmallCards from '@/components/Home/SmallCards'
import CustomCarousel from '@/components/ui/customCarousel'
import GroupCard from '@/components/ui/groupCard'
import SearchBox from '@/components/ui/searchbox'
import { mockGroups } from '@/data/mockGroups'
import { ClipboardList, Layers, Users } from 'lucide-react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const datos = [
    { title: 'Tarjeta 1', description: 'Contenido de la tarjeta 1' },
    { title: 'Tarjeta 2', description: 'Contenido de la tarjeta 2' },
    { title: 'Tarjeta 3', description: 'Contenido de la tarjeta 3' },
    // más tarjetas...
  ]
  const [searchTerm, setSearchTerm] = useState('')
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  return (
    <div className="flex flex-col items-center pt-16">
      <section className="flex flex-col items-center w-full bg-secondary py-14">
        <h3 className="flex flex-col text-base items-center text-primary tracking-widest">
          PROVINCIA DE BUENOS AIRES
        </h3>
        <h1 className="flex flex-col items-center text-4xl font-semibold text-center mt-4 mb-2 tracking-wide">
          <span>Portal de datos abiertos</span>
          <span className="text-primary">Municipio de Quilmes</span>
        </h1>
        <span className="text-sm text-center text-gray-600 font-normal my-4 w-3/4">
          Diseñado para acceder, descargar y reutilizar información del sector
          <br />
          público para tus desarrollos e investigaciones.
        </span>
        <SearchBox
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isHomePage={isHomePage}
          placeholder={searchTerm ? searchTerm : 'Buscar...'}
          wrapperClassName="w-3/4 md:w-1/2"
        />
      </section>

      <section className="mt-16 flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-center">
          Nuestros datos en <span className="text-primary">cifras</span>
        </h2>
        <span className="text-sm text-center text-gray-600 font-normal my-4 w-3/4">
          Cumpliendo con estándares internacionales, ofrecemos información útil
          para organizaciones, ciudadanía y la comunidad investigadora.
        </span>
        <div className="flex items-start justify-center mt-8">
          <div className="flex mb-8 md:flex-row flex-col items-center gap-6 md:gap-14">
            <SmallCards
              icon={Layers}
              value={
                [...new Set(mockGroups.map((group) => group.grupo))].length
              }
              label={'Grupos'}
            />
            <SmallCards
              icon={Users}
              value={
                [...new Set(mockGroups.map((group) => group.organizacion))]
                  .length
              }
              label={'Organizaciones'}
            />
            <SmallCards
              icon={ClipboardList}
              value={mockGroups.reduce((acc, group) => acc + group.datasets, 0)}
              label={'Datasets'}
            />
          </div>
        </div>
      </section>
      <section className="mb-22 flex text-center items-center justify-center mt-16 w-full relative overflow-visible">
        <div className="absolute inset-0">
          <div className="w-[135%] lg:translate-x-[18%] bg-[rgba(240,240,255,0.8)] rounded-t-[150px] min-h-[700px]"></div>
        </div>
        <div className="relative z-10 w-full max-w-5xl text-center mx-auto">
          <h2 className="mt-20 md:mt-8 text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide leading-relaxed mb-6">
            Descubre los últimos conjuntos <br /> de datos publicados
          </h2>
          <p className="text-gray-600 mx-auto text-center max-w-[85%] sm:max-w-xl md:max-w-2xl mb-10">
            De acuerdo a los estándares internacionales, proporcionamos datos de
            gran utilidad para organizaciones, ciudadanía e investigadores en el
            ámbito de Datos Abiertos.
          </p>
          <CustomCarousel
            className="mb-10"
            items={mockGroups.map((group) => (
              <GroupCard
                key={group.id}
                title={group.title}
                datasets={group.datasets}
              />
            ))}
          />
        </div>
      </section>
    </div>
  )
}

export default Home
