import OrganizacionesCard from '@/components/Organizaciones/OrganizacionesCard'
import OrganizacionesSkeletonCard from '@/components/Organizaciones/OrganizacionesSkeletonCard'
import SearchBox from '@/components/ui/searchbox'
import { getOrganizationsWithInfo } from '@/services/ckanService'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const Organizaciones = () => {
  const {
    data: organizations = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['organizations'],
    queryFn: getOrganizationsWithInfo,
  })

  const [searchTerm, setSearchTerm] = useState('')

  const filteredorganizations = Array.isArray(organizations)
    ? organizations.filter((org) => {
        const matchesSearch =
          searchTerm.trim() === '' ||
          org.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          org.description?.toLowerCase().includes(searchTerm.toLowerCase())

        return matchesSearch
      })
    : []
  console.log(filteredorganizations)

  return (
    <div className="mt-40 px-20 flex flex-col mb-22">
      <div className="flex flex-col max-w-screen-xl gap-1">
        <h2 className="text-3xl font-semibold text-primary">
          Buscador de Organizaciones
        </h2>
        <p className="customColor2 mb-4">
          Explora el directorio de instituciones públicas que participan en la
          entrega de datos abiertos.
        </p>

        {/* Error */}
        {isError && (
          <p className="text-red-500 mt-4 mb-2">
            ❌ Ocurrió un error al cargar las organizaciones.
          </p>
        )}

        {/* Result count */}
        {!isLoading && !isError && (
          <p className="text-sm mt-2 customColor2">
            {filteredorganizations.length} organizacion
            {filteredorganizations.length !== 1 && 'es'} encontradas
            {searchTerm ? ` para "${searchTerm}"` : ''}
          </p>
        )}

        {/* Buscador */}
        <div className="w-full max-w-[500px] mb-4">
          <SearchBox
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            wrapperClassName="w-full"
          />
        </div>

        {/* Grid de resultados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <OrganizacionesSkeletonCard key={i} />
            ))
          ) : filteredorganizations.length === 0 ? (
            <p className="text-gray-600 mb-4 md:col-span-4">
              No se encontraron organizaciones para la búsqueda "{searchTerm}"
            </p>
          ) : (
            filteredorganizations.map((group) => (
              <OrganizacionesCard key={group.id} group={group} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Organizaciones
