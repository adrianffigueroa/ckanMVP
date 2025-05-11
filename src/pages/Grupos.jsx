import GruposCards from '@/components/Grupos/GruposCards'
import SearchBox from '@/components/ui/searchbox'
import { mockGroups } from '@/data/mockGroups'
import { useState } from 'react'

const Grupos = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Primero filtramos por búsqueda
  const filteredGroups = mockGroups.filter((group) => {
    const matchesSearch =
      searchTerm.trim() === '' ||
      group.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.organizacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.grupo.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  })

  // Luego eliminamos duplicados por nombre de grupo
  const seen = new Set()
  const uniqueGroups = filteredGroups.filter((group) => {
    if (seen.has(group.grupo)) return false
    seen.add(group.grupo)
    return true
  })

  return (
    <div className="mt-40 mx-20 flex flex-col mb-22">
      <div className="flex flex-col max-w-screen-xl gap-1">
        <h2 className="text-3xl font-semibold text-primary">
          Buscador de Grupos
        </h2>
        <p className="text-gray-600 mb-4">
          Descubre los diferentes temas en los que se agrupan los conjuntos de
          datos abiertos.
        </p>
        <p className="text-sm mt-2">
          {uniqueGroups.length} grupo{uniqueGroups.length !== 1 && 's'}{' '}
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
          {uniqueGroups.length === 0 && (
            <p className="text-gray-600 mb-4 md:col-span-4">
              No se encontraron grupos para la búsqueda "{searchTerm}"
            </p>
          )}
          {uniqueGroups.map((group) => (
            <GruposCards key={group.grupo} group={group} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Grupos
