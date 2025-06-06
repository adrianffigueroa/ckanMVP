import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { getAllDatasets } from '@/services/ckanService'
import getColorByFormat from '@/utils/getColorsByFormat'
import { toTitleCase } from '@/utils/toTitleCase'
import { useQuery } from '@tanstack/react-query'
import {
  Atom,
  Banknote,
  Briefcase,
  Building2,
  Bus,
  Download,
  Dumbbell,
  Eye,
  Globe,
  GraduationCap,
  HeartPulse,
  Palette,
  Shield,
  UserCheck,
  Users,
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import { useState } from 'react'
const getGroupIcon = (groupName) => {
  const icons = {
    ciencia: Atom,
    educación: GraduationCap,
    empleo: Briefcase,
    geografía: Globe,
    salud: HeartPulse,
    ciudadanía: Users,
    seguridad: Shield,
    economía: Banknote,
    infraestructura: Bus,
    cultura: Palette,
    deporte: Dumbbell,
    demografía: UserCheck,
    urbanismo: Building2,
  }

  const Icon = icons[groupName?.toLowerCase()] || Globe
  return (
    <div className="bg-violet-100 p-2 rounded-md flex items-center justify-center">
      <Icon className="w-5 h-5 text-primary" />
    </div>
  )
}

const DatasetsDetails = () => {
  const [showViewer, setShowViewer] = useState(false)
  const [currentDoc, setCurrentDoc] = useState(null)
  const { id } = useParams()

  const {
    data: allDatasets,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['datasets'],
    queryFn: getAllDatasets,
  })
  const dataset = Array.isArray(allDatasets)
    ? allDatasets.find((d) => d.id === id)
    : null

  const navigate = useNavigate()
  const handleVerRecurso = (res) => {
    console.log(res)

    const format = res.format?.toLowerCase()

    if (['csv', 'xls', 'xlsx'].includes(format)) {
      navigate(`/resourceView/${res.id}`)
    } else if (['doc', 'docx'].includes(format)) {
      setCurrentDoc([{ uri: res.url }]) // Ya no necesitás `fileType`
      setShowViewer(true)
    } else {
      window.open(res.url, '_blank')
    }
  }

  const handleDownload = (res) => {
    window.open(res.url, '_blank')
  }
  console.log(dataset)
  console.log(allDatasets)

  return (
    <>
      <div className="px-20 mb-8">
        <section>
          <div className="flex flex-col mt-30">
            <div className="flex flex-col md:flex-row items-start justify-between ">
              <Breadcrumb className="mb-4">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/" className="customColor2">
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="customColor2" />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/datasets" className="customColor2">
                      Datasets
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <h2 className="text-3xl font-semibold text-primary mb-4">
              {'Datasets'}
            </h2>
            <p className="customColor1 font-semibold text-base mt-1">
              {dataset?.title || 'Sin titulo'}
            </p>
            <p className="customColor2 text-base mt-1">
              {dataset?.notes || 'Sin descripción'}
            </p>
          </div>

          <section className="mt-10 flex flex-col md:flex-row gap-10">
            {/* Columna izquierda */}
            <div className="w-full lg:w-3/5 flex flex-col gap-4 bg-white rounded-xl p-5 shadow border border-gray-200">
              <p className="customColor2">{dataset?.description}</p>

              <div className="flex flex-col gap-2 h-1/4">
                {dataset?.resources.map((res, index) => (
                  <div
                    key={res.id || index}
                    className="flex flex-col sm:flex-row gap-4 border-b pb-4"
                  >
                    {/* Izquierda: formato + info */}
                    <div className="flex gap-3 flex-grow">
                      <Badge
                        className={`${getColorByFormat(res.format)} text-white text-xs px-3 py-1 mt-1`}
                      >
                        {res.format?.toUpperCase()}
                      </Badge>
                      <div className="flex flex-col">
                        <a
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary font-medium text-sm hover:underline break-all"
                        >
                          {res.name}
                        </a>
                        <p className="text-sm customColor2 break-words">
                          {res.description || res.notes || 'Sin descripción'}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        onClick={() => handleDownload(res)}
                        className="w-full sm:w-24 h-9 rounded-xl bg-primary text-white text-sm flex items-center justify-center gap-1 button-custom hover:cursor-pointer"
                      >
                        Descargar <Download size={14} />
                      </Button>
                      <Button
                        onClick={() => handleVerRecurso(res)}
                        className="w-full sm:w-28 h-9 rounded-xl bg-primary text-white text-sm flex items-center justify-center gap-1 button-custom hover:cursor-pointer"
                      >
                        Ver Recurso <Eye size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Columna derecha */}
            <div className="w-full lg:w-1/3 bg-white rounded-xl p-5 shadow border border-gray-200">
              <div className="flex flex-col items-center lg:items-start gap-4 border-b-2">
                <div className="flex gap-4">
                  <div className="flex items-center">
                    {getGroupIcon(dataset?.groups[0].name)}
                  </div>
                  <div className="w-full">
                    <p className="customColor2 text-sm">Desarrollado por</p>
                    <p className="font-semibold customColor1">
                      {toTitleCase(dataset?.organization?.title) ||
                        'Organización desconocida'}
                    </p>
                  </div>
                </div>
                <p className="customColor2 text-base mb-4">
                  {dataset?.organization?.description || 'Sin descripción'}
                </p>
              </div>
              <ul className="text-sm space-y-8 mt-4">
                <li className="grid grid-cols-2 items-start">
                  <div className="customColor1 font-semibold">Estado</div>
                  <div
                    className={`${dataset?.state === 'active' ? 'text-green-600' : 'text-red-600'} font-semibold`}
                  >
                    {dataset?.state === 'active' ? 'Activo' : 'Inactivo'}
                  </div>
                </li>
                <li className="grid grid-cols-2 items-start">
                  <div className="customColor1 font-semibold">
                    Última actualización
                  </div>
                  <div className="customColor2">
                    {dataset?.resources?.[0]?.last_modified
                      ? new Date(
                          dataset.resources[0].last_modified
                        ).toLocaleDateString('es-AR')
                      : 'No disponible'}
                  </div>
                </li>
                <li className="grid grid-cols-2 items-start">
                  <div className="customColor1 font-semibold">
                    Fecha de creación
                  </div>
                  <div className="customColor2">
                    {dataset?.metadata_created
                      ? new Date(dataset.metadata_created).toLocaleDateString(
                          'es-AR'
                        )
                      : 'No disponible'}
                  </div>
                </li>
                <li className="grid grid-cols-2 items-start">
                  <div className="customColor1 font-semibold mt-1">
                    Etiquetas
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {dataset?.tags?.map((tag) => (
                      <Badge
                        key={tag.name}
                        variant="outline"
                        className="bg-white customColor2"
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </section>
      </div>
      {showViewer && currentDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-4xl h-[90vh] p-4 relative flex flex-col">
            <button
              onClick={() => setShowViewer(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-sm border px-2 py-1 rounded"
            >
              Cerrar ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">
              Previsualizador de Word
            </h2>
            <div className="flex-1 overflow-hidden">
              {currentDoc?.[0]?.uri ? (
                <iframe
                  src={`https://docs.google.com/viewer?url=${encodeURIComponent(
                    currentDoc[0].uri
                  )}&embedded=true`}
                  title="Doc Viewer"
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                />
              ) : (
                <p className="text-red-500">No se pudo cargar el documento.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DatasetsDetails
