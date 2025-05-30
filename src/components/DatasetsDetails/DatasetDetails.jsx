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
const getColorByFormat = (format) => {
  switch (format?.toUpperCase()) {
    case 'HTML':
      return 'bg-blue-600'
    case 'PDF':
      return 'bg-red-600'
    case 'CSV':
    case 'XLS':
    case 'XLSX':
      return 'bg-green-600'
    case 'JSON':
      return 'bg-orange-600'
    default:
      return 'bg-gray-600'
  }
}

const DatasetsDetails = () => {
  const { id } = useParams()

  const {
    data: allDatasets,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['datasets'],
    queryFn: getAllDatasets,
  })
  console.log(allDatasets)

  // const dataset = Array.isArray(allDatasets)
  //   ? allDatasets.find((d) => d.id === id)
  //   : null

  const dataset = Array.isArray(allDatasets)
    ? allDatasets[0] // fuerza a mostrar algo
    : null

  const navigate = useNavigate()
  const handleVerRecurso = (res) => {
    const format = res.format?.toLowerCase()

    if (['csv', 'xls', 'xlsx'].includes(format)) {
      // Redirige a visualización con Rosen Charts
      navigate(`/resourceView/${res.id}`)
    } else {
      // Abre visor externo para PDF, Word, etc.
      window.open(res.url, '_blank')
    }
  }
  console.log(dataset)

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
                  <BreadcrumbLink href="/datasets">Datasets</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <h2 className="text-3xl font-semibold text-primary mb-4">
            {'Datasets'}
          </h2>
          <p className="text-black font-semibold text-base mt-1">
            {dataset?.title || 'Sin titulo'}
          </p>
          <p className="text-gray-600 text-base mt-1">
            {dataset?.notes || 'Sin descripción'}
          </p>
        </div>

        <section className="mt-10 flex flex-col md:flex-row gap-10">
          {/* Columna izquierda */}
          <div className="w-full lg:w-3/5 flex flex-col gap-4 bg-white rounded-xl p-5 shadow border border-gray-200">
            <p className="text-gray-600">{dataset?.description}</p>

            <div className="flex flex-col gap-2 h-1/4">
              {dataset?.resources.map((res, index) => (
                <div
                  key={res.id || index}
                  className="flex justify-end items-start gap-4 border-b pb-4"
                >
                  {/* Izquierda: formato + info */}
                  <div className="flex items-start me-auto gap-3">
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
                        className="text-primary font-medium text-sm hover:underline"
                      >
                        {res.name}
                      </a>
                      <p className="text-sm text-gray-600">
                        {res.description || res.notes || 'Sin descripción'}
                      </p>
                    </div>
                  </div>

                  {/* Derecha: botón descarga */}
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex ms-auto items-center gap-1 w-24 h-8 rounded-xl bg-primary text-sm text-white hover:cursor-pointer hover:bg-primary-hover"
                    >
                      Descargar <Download size={14} className="text-white" />
                    </Button>
                    <Button
                      className={
                        'bg-primary text-white text-sm rounded-xl w-28 h-8 hover:cursor-pointer hover:bg-primary-hover'
                      }
                      onClick={() => handleVerRecurso(res)}
                    >
                      Ver Recurso <Eye size={14} className="text-white" />
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
                  <p className="text-gray-600 text-sm">Desarrollado por</p>
                  <p className="font-semibold">
                    {toTitleCase(dataset?.organization?.title) ||
                      'Organización desconocida'}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-base mb-4">
                {dataset?.organization?.description || 'Sin descripción'}
              </p>
            </div>
            <ul className="text-sm space-y-8 mt-4">
              <li className="grid grid-cols-2 items-start">
                <div className="text-black font-semibold">Estado</div>
                <div
                  className={`${dataset?.state === 'active' ? 'text-green-600' : 'text-red-600'} font-semibold`}
                >
                  {dataset?.state === 'active' ? 'Activo' : 'Inactivo'}
                </div>
              </li>
              <li className="grid grid-cols-2 items-start">
                <div className="text-black font-semibold">
                  Última actualización
                </div>
                <div className="text-gray-600">
                  {dataset?.resources?.[0]?.last_modified
                    ? new Date(
                        dataset.resources[0].last_modified
                      ).toLocaleDateString('es-AR')
                    : 'No disponible'}
                </div>
              </li>
              <li className="grid grid-cols-2 items-start">
                <div className="text-black font-semibold">
                  Fecha de creación
                </div>
                <div className="text-gray-600">
                  {dataset?.metadata_created
                    ? new Date(dataset.metadata_created).toLocaleDateString(
                        'es-AR'
                      )
                    : 'No disponible'}
                </div>
              </li>
              <li className="grid grid-cols-2 items-start">
                <div className="text-black font-semibold mt-1">Etiquetas</div>
                <div className="flex flex-wrap gap-2">
                  {dataset?.tags?.map((tag) => (
                    <Badge
                      key={tag.name}
                      variant="outline"
                      className="bg-white text-gray-600"
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
  )
}

export default DatasetsDetails
