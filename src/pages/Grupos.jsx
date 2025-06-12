import GruposCards from '@/components/Grupos/GruposCards'
import GruposSkeletonCard from '@/components/Grupos/GruposSkeletonCard'
import SearchBox from '@/components/ui/searchbox'
import { getAllGroups } from '@/services/ckanService'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const Grupos = () => {
  const {
    data: groups = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['groups'],
    queryFn: getAllGroups,
  })

  const [searchTerm, setSearchTerm] = useState('')

  const filteredGroups = groups.filter((group) => {
    const matchesSearch =
      searchTerm.trim() === '' ||
      group.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.display_name?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 mb-22 mt-40 flex flex-col">
      <div className="flex flex-col max-w-screen-xl gap-1">
        <h2 className="text-3xl font-semibold text-primary">
          Buscador de Grupos
        </h2>
        <p className="customColor2 mb-4">
          Descubre los diferentes temas en los que se agrupan los conjuntos de
          datos abiertos.
        </p>
        <p className="text-sm mt-2 customColor2">
          {filteredGroups.length} grupo{filteredGroups.length !== 1 && 's'}{' '}
          encontrados
          {searchTerm ? ` para "${searchTerm}"` : ''}
        </p>
        <div className="w-full max-w-[500px] mb-4">
          <SearchBox
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            wrapperClassName="w-full"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <GruposSkeletonCard key={i} />
            ))
          ) : filteredGroups.length === 0 ? (
            <p className="text-gray-600 mb-4 md:col-span-4">
              No se encontraron grupos para la búsqueda "{searchTerm}"
            </p>
          ) : (
            filteredGroups.map((group) => (
              <GruposCards key={group.id} group={group} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Grupos
