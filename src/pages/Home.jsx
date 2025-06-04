import SkeletonCard from '@/components/Home/SkeletonCard'
import SmallCards from '@/components/Home/SmallCards'
import CustomCarousel from '@/components/ui/customCarousel'
import GroupCard from '@/components/ui/groupCard'
import SearchBox from '@/components/ui/searchbox'
import {
  getDatasetCount,
  getGroupsWithCounts,
  getOrganizations,
} from '@/services/ckanService'
import { useQuery } from '@tanstack/react-query'
import { ClipboardList, Layers, Loader2, Users } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Home = () => {
  const {
    data: datasetCount,
    isLoading: loadingDatasets,
    isError: errorDatasets,
  } = useQuery({
    queryKey: ['datasets'],
    queryFn: getDatasetCount,
  })

  const {
    data: organizations,
    isLoading: loadingOrgs,
    isError: errorOrgs,
  } = useQuery({
    queryKey: ['organizations'],
    queryFn: getOrganizations,
  })

  const {
    data: groups,
    isLoading: loadingGroups,
    isError: errorGroups,
  } = useQuery({
    queryKey: ['groups'],
    queryFn: getGroupsWithCounts,
  })

  const [searchTerm, setSearchTerm] = useState('')
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <div
      className="flex flex-col items-center pt-16"
      style={{
        background:
          'linear-gradient(180deg, rgba(74, 58, 255, 0.08) 0%, rgba(164, 156, 255, 0) 40%)',
      }}
    >
      <section className="flex flex-col items-center w-full py-14">
        <h3 className="flex flex-col text-base items-center text-primary tracking-widest">
          PROVINCIA DE BUENOS AIRES
        </h3>
        <h1 className="flex flex-col items-center text-4xl customColor1 font-semibold text-center mt-4 mb-2 tracking-wide">
          <span>Portal de datos abiertos</span>
          <span className="text-primary">Municipio de Quilmes</span>
        </h1>
        <span className="text-sm text-center customColor2 font-normal my-4 w-3/4">
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

      <section className="mt-16 md:mt-44 flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-center">
          <span className="customColor1">Nuestros datos en</span>{' '}
          <span className="text-primary">cifras</span>
        </h2>
        <span className="text-sm text-center customColor2 font-normal my-4 w-3/4">
          Cumpliendo con estándares internacionales, ofrecemos información útil
          para organizaciones, ciudadanía y la comunidad investigadora.
        </span>
        <div className="flex items-start justify-center mt-8">
          <div className="flex mb-8 md:flex-row flex-col items-center gap-6 md:gap-14">
            <Link to="/grupos">
              <SmallCards
                icon={Layers}
                value={
                  loadingGroups ? (
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  ) : errorGroups ? (
                    'Error'
                  ) : (
                    groups?.length || 0
                  )
                }
                label={'Grupos'}
              />
            </Link>
            <Link to="/organizaciones">
              <SmallCards
                icon={Users}
                value={
                  loadingOrgs ? (
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  ) : errorOrgs ? (
                    'Error'
                  ) : Array.isArray(organizations) ? (
                    organizations.length
                  ) : (
                    organizations || 0
                  )
                }
                label={'Organizaciones'}
              />
            </Link>
            <Link to="/datasets">
              <SmallCards
                icon={ClipboardList}
                value={
                  loadingDatasets ? (
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  ) : (
                    datasetCount || 0
                  )
                }
                label={'Datasets'}
              />
            </Link>
          </div>
        </div>
      </section>
      <section className="mb-22 flex text-center items-center justify-center mt-16 w-full relative overflow-visible">
        <div className="absolute inset-0">
          <div className="w-[135%] lg:translate-x-[8%] decorator rounded-t-[150px] min-h-[600px]"></div>
        </div>
        <div className="relative z-10 w-full max-w-5xl text-center mx-auto">
          <h2 className="mt-20 md:mt-12 text-xl sm:text-2xl md:text-3xl font-semibold leading-relaxed mb-6">
            <span className="customColor1">Descubre los</span>{' '}
            <span className="text-primary">últimos conjuntos</span> <br />{' '}
            <span className="customColor1">de datos publicados</span>
          </h2>
          <p className="customColor2 mx-auto text-center max-w-[85%] sm:max-w-xl md:max-w-2xl mb-10">
            Explorá los conjuntos de datos más recientes que el Municipio pone a
            disposición para promover la transparencia, el conocimiento y la
            colaboración ciudadana.
          </p>
          <CustomCarousel
            className="mb-10 pb-10"
            items={
              loadingGroups
                ? Array(5)
                    .fill(0)
                    .map((_, i) => <SkeletonCard key={i} />)
                : (groups || []).map((group) => (
                    <GroupCard
                      key={group.name}
                      title={group.display_name}
                      datasets={group.package_count ?? 0}
                    />
                  ))
            }
          />
        </div>
      </section>
    </div>
  )
}

export default Home
