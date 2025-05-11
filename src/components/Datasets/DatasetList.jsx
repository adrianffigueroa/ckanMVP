import DatasetCard from './DatasetCard'

const DatasetList = ({ mockGroups, searchTerm }) => {
  return (
    <>
      {mockGroups.length === 0 && (
        <p className="text-gray-600 mb-4 ">
          No se encontraron datasets para la búsqueda "{searchTerm}"
        </p>
      )}
      {mockGroups.map((group) => (
        <DatasetCard key={group.id} group={group} />
      ))}
    </>
  )
}

export default DatasetList
