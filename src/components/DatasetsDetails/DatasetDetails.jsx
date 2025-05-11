import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { mockGroups } from '@/data/mockGroups'
import { HardHatIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
const DatasetsDetails = () => {
  const { id } = useParams()
  const [dataToShow, setDataToShow] = useState(null)
  const [etiquetas, setEtiquetas] = useState([])
  useEffect(() => {
    console.log(`Dataset ID: ${id}`)
    // Aquí podrías buscar el dataset por id y mostrar los datos
    const dataset = mockGroups.find((group) => group.id === parseInt(id))
    if (dataset) {
      setDataToShow(dataset)
      setEtiquetas(dataset.etiquetas)
    }
    console.log(dataToShow)
  }, [id])

  return (
    <div className="px-20 mb-8">
      <section>
        <div className="flex flex-col mt-30">
          <div className="flex flex-col md:flex-row items-start justify-between ">
            <Breadcrumb className="mb-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/datasets">{'Datasets'}</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <h2 className="text-3xl font-semibold text-primary mb-4">Datasets</h2>
        </div>
        {dataToShow && (
          <>
            <h3 className="text-xl font-medium">{dataToShow.title}</h3>
            <p className="text-gray-600 text-base mt-1">
              {dataToShow.subtitulo}
            </p>
          </>
        )}
      </section>

      <section className="mt-10 flex flex-col md:flex-row gap-10">
        {dataToShow && (
          <>
            {/* Columna izquierda */}
            <div className="flex-1 flex flex-col gap-4 bg-white rounded-xl p-5 shadow border border-gray-200 h-1/3 min-h-min">
              {/* Encabezado con icono + info de organización */}

              {/* Descripción */}
              <div>
                <p className="text-gray-600">{dataToShow.descripcion}</p>
              </div>

              {/* Formatos disponibles */}
              <div className="flex flex-col items-start md:flex-row md:items-end gap-4 mt-4">
                <p className="font-semibold mb-1">Conjunto disponible en:</p>

                <div className="flex gap-2 mb-1">
                  {dataToShow.formatos.map((formato) => (
                    <Badge
                      key={formato}
                      className={`${
                        formato === 'CSV' || formato === 'XLSX'
                          ? 'bg-green-600'
                          : formato === 'PDF'
                            ? 'bg-red-600'
                            : 'bg-gray-600'
                      } text-white text-xs rounded-md px-3 py-1`}
                    >
                      {formato}
                    </Badge>
                  ))}
                </div>

                <div className="ms-auto">
                  <Button
                    variant="outline"
                    className="text-primary rounded-3xl border-primary px-4 py-1 hover:text-white hover:bg-primary-hover cursor-pointer"
                  >
                    Descargar todo
                  </Button>
                </div>
              </div>
            </div>

            {/* Columna derecha: Información adicional */}
            <div className="w-full md:w-2/5 bg-white rounded-xl p-5 shadow border border-gray-200">
              <div className="flex items-center lg:items-start gap-4 border-b-2">
                <div className="flex-shrink-0">
                  <HardHatIcon
                    size={60}
                    className="text-primary bg-bgIcon rounded-md p-2"
                  />
                </div>
                <div className="w-full">
                  <p className="text-gray-600 text-sm">Desarrollado por</p>
                  <p className="font-semibold">{dataToShow.suborganizacion}</p>
                  <p className="text-gray-600">{dataToShow.organizacion}</p>
                </div>
              </div>
              <ul className="text-sm">
                <li className="py-6 flex justify-between">
                  <span className="text-gray-600">Grupo</span>
                  <span className="flex items-center gap-2 font-medium">
                    <HardHatIcon size={16} />
                    {dataToShow.grupo.toUpperCase()}
                  </span>
                </li>
                <li className="py-6 flex justify-between">
                  <span className="text-gray-600">Estado del conjunto</span>
                  <span
                    className={`flex items-center gap-2 font-medium ${dataToShow?.metadatos.estado.toLowerCase() === 'activo' ? 'text-green-600' : 'text-red-600'}`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${dataToShow?.metadatos.estado.toLowerCase() === 'activo' ? 'bg-green-600' : 'bg-red-600'}`}
                    />
                    {dataToShow.metadatos.estado.charAt(0).toUpperCase() +
                      dataToShow.metadatos.estado.slice(1)}
                  </span>
                </li>
                <li className="py-6 flex justify-between">
                  <span className="text-gray-600">Última actualización</span>
                  <span className="font-semibold">
                    {new Date(
                      dataToShow.metadatos.ultimaActualizacion
                    ).toLocaleDateString()}
                  </span>
                </li>
                <li className="py-6 flex justify-between">
                  <span className="text-gray-600">
                    Frecuencia de actualización
                  </span>
                  <span className="font-medium capitalize">
                    {dataToShow.metadatos.frecuenciaActualizacion}
                  </span>
                </li>
                <li className="py-6 flex justify-between">
                  <span className="text-gray-600">Fecha de creación</span>
                  <span className="font-semibold">
                    {new Date(
                      dataToShow.metadatos.fechaCreacion
                    ).toLocaleDateString()}
                  </span>
                </li>
                <li className="py-6">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-gray-600 mt-1">Etiquetas</span>
                    <div className="flex flex-wrap gap-2 justify-end">
                      {etiquetas.map((etiqueta) => (
                        <Badge
                          key={etiqueta}
                          variant="outline"
                          className="bg-white text-gray-600"
                        >
                          {etiqueta}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default DatasetsDetails
