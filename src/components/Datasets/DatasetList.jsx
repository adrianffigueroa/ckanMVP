import DatasetCard from './DatasetCard'

const DatasetList = ({ filteredDatasets, searchTerm }) => {
  return (
    <>
      {filteredDatasets.length === 0 && (
        <p className="text-gray-600 mb-4 ">
          No se encontraron datasets para la búsqueda "{searchTerm}"
        </p>
      )}
      {filteredDatasets.map((dataset) => (
        <DatasetCard key={dataset.id} dataset={dataset} />
      ))}
    </>
  )
}

export default DatasetList
