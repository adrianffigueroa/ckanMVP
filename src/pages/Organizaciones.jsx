import OrganizacionesCard from '@/components/Organizaciones/OrganizacionesCard'
import SearchBox from '@/components/ui/searchbox'
import { mockGroups } from '@/data/mockGroups'
import { useState } from 'react'
const Organizaciones = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const filteredGroups = mockGroups.filter((group) => {
    const matchesSearch =
      searchTerm.trim() === '' ||
      group.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.organizacion.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  })
  return (
    <div className="mt-40 px-20 flex flex-col mb-22">
      <div className="flex flex-col max-w-screen-xl gap-1">
        <h2 className="text-3xl font-semibold text-primary">
          Buscador de Organizaciones
        </h2>
        <p className="text-gray-600 mb-4">
          Explora el directorio de instituciones públicas que participan en la
          entrega de datos abiertos.
        </p>
        <p className="text-sm  mt-2">
          {filteredGroups.length} organizacion
          {filteredGroups.length !== 1 && 'es'} encontradas
          {searchTerm ? ` para "${searchTerm}"` : ''}
        </p>
        <div className="w-full max-w-[500px] mb-4">
          <SearchBox
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            wrapperClassName='"w-full"'
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredGroups.length === 0 && (
            <p className="text-gray-600 mb-4 md:col-span-4">
              No se encontraron organizaciones para la búsqueda "{searchTerm}"
            </p>
          )}
          {filteredGroups.map((group) => (
            <OrganizacionesCard key={group.id} group={group} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Organizaciones
