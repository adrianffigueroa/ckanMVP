import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { getDatasetById } from '@/services/ckanService'
import getColorByFormat from '@/utils/getColorsByFormat'
import { toTitleCase } from '@/utils/toTitleCase'
import { useQuery } from '@tanstack/react-query'
import {
  Atom,
  Baby,
  Banknote,
  BarChart,
  Briefcase,
  Building2,
  Bus,
  Cctv,
  DollarSign,
  Download,
  Dumbbell,
  Eye,
  Factory,
  Gavel,
  Globe,
  HeartPulse,
  Home,
  Leaf,
  Map,
  Mountain,
  Palette,
  Plug,
  GraduationCap as School,
  TrafficCone,
  User,
  UserCheck,
  Users,
  Venus,
  Wallet,
} from 'lucide-react'

import { useState } from 'react'
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer'
import { useNavigate, useParams } from 'react-router-dom'

const getGroupIcon = (groupName, type = '') => {
  const icons = {
    salud: HeartPulse,
    educacion: School,
    seguridad: Cctv,
    ambiente: Leaf,
    desarrollo: Briefcase,
    economica: DollarSign,
    transporte: Bus,
    cultura: Palette,
    deporte: Dumbbell,
    turismo: Mountain,
    vivienda: Home,
    'hacienda-y-finanzas': Banknote,
    'trabajo-y-empleo': UserCheck,
    'obras-publicas': Building2,
    'servicios-publicos': Plug,
    'gobierno-abierto': Globe,
    'participacion-ciudadana': Users,
    'genero-y-diversidad': Venus,
    'ninez-y-adolescencia': Baby,
    'adultos-mayores': User,
    'ciencia-y-tecnologia': Atom,
    produccion: Factory,
    justicia: Gavel,
    'datos-demograficos': BarChart,
    'catastro-y-urbanismo': Map,
    'presupuesto-y-gasto-publico': Wallet,
    'movilidad-y-transito': TrafficCone,
  }

  const Icon = icons[groupName?.toLowerCase()] || Globe
  return (
    <div
      className={`p-2 rounded-md flex items-center justify-center ${type ? 'bg-transparent text-gray-600' : 'bg-third text-primary'}`}
    >
      <Icon className="w-5 h-5" />
    </div>
  )
}

const DatasetsDetails = () => {
  const [showViewer, setShowViewer] = useState(false)
  const [currentDoc, setCurrentDoc] = useState(null)
  const { id } = useParams()
  console.log(id)

  const {
    data: dataset,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['dataset', id],
    queryFn: () => {
      console.log('🔥 Ejecutando getDatasetById con id:', id)
      return getDatasetById(id)
    },
    enabled: !!id, // muy importante, para que no se ejecute con id undefined
  })

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

  if (isError) return <p>Hubo un error</p>

  if (isLoading) return <p>Cargando...</p>

  if (!dataset) return <p>No se encontró el dataset</p>
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
            <div className="w-full lg:w-3/5 flex flex-col gap-4 rounded-xl p-5">
              <div className="flex flex-col gap-2">
                {Array.isArray(dataset?.resources) &&
                dataset?.resources?.length > 0 ? (
                  dataset?.resources?.map((res, index) => (
                    <div
                      key={res.id || index}
                      className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-4"
                    >
                      {/* Izquierda: formato + info */}
                      <div className="flex flex-grow items-start gap-3">
                        <Badge
                          className={`${getColorByFormat(res.format)} flex-none w-14 h-8 flex items-center justify-center text-white text-xs font-bold`}
                        >
                          {res.format?.toUpperCase()}
                        </Badge>
                        <div className="flex flex-col overflow-hidden">
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary font-medium text-sm hover:underline truncate"
                          >
                            {res.name}
                          </a>
                          <p className="text-sm customColor2 break-words">
                            {res.description || 'Sin descripción'}
                          </p>
                        </div>
                      </div>

                      {/* Derecha: botones */}
                      <div className="flex flex-row gap-2 flex-shrink-0 max-[450px]:flex-col w-full md:w-auto md:ml-auto max-[450px]:items-stretch">
                        <Button
                          onClick={() => handleDownload(res)}
                          className="w-[120px] h-9  text-gray-600 text-sm flex items-center justify-center gap-1 hover:cursor-pointer"
                          variant="ghost"
                        >
                          Descargar <Download size={14} />
                        </Button>
                        <Button
                          onClick={() => handleVerRecurso(res)}
                          className="w-[120px] h-9  text-gray-600 text-sm flex items-center justify-center gap-1  hover:cursor-pointer"
                          variant="ghost"
                        >
                          Ver Recurso <Eye size={14} />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No hay recursos disponibles
                  </p>
                )}
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
                      {dataset?.organization && dataset.organization.title
                        ? toTitleCase(dataset.organization.title)
                        : 'Organización desconocida'}
                    </p>
                  </div>
                </div>
                <p className="customColor2 text-base mb-4">
                  {dataset?.organization?.description || 'Sin descripción'}
                </p>
              </div>
              <ul className="text-sm space-y-8 mt-4">
                <li className="grid grid-cols-2 items-start">
                  <div className="customColor1 font-semibold">Grupo</div>
                  <div className="customColor2 bg-transparent">
                    {getGroupIcon(dataset?.groups[0].name, 'columna')}
                  </div>
                </li>
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
                    {dataset?.metadata_modified
                      ? new Date(dataset.metadata_modified).toLocaleDateString(
                          'es-AR'
                        )
                      : 'No disponible'}
                  </div>
                </li>
                <li className="grid grid-cols-2 items-start">
                  <div className="customColor1 font-semibold">
                    Frec. de Actualización
                  </div>
                  <div className="customColor2">
                    {dataset?.extras[0].value
                      ? toTitleCase(dataset?.extras[0].value)
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center mb-10">
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
              <DocViewer
                documents={currentDoc}
                pluginRenderers={DocViewerRenderers}
                style={{ width: '100%', height: '100%' }}
                config={{
                  header: {
                    disableHeader: true,
                    disableFileName: true,
                  },
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DatasetsDetails
