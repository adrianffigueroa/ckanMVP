import { formatDate } from '@/utils/date'
import getColorByFormat from '@/utils/getColorsByFormat'
import { toTitleCase } from '@/utils/toTitleCase'
import { Link } from 'react-router-dom'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'

const DatasetCard = ({ dataset }) => {
  if (!dataset || typeof dataset !== 'object') return null

  const title = dataset.title ? toTitleCase(dataset.title) : 'Sin título'
  const description = dataset.notes ?? 'Sin descripción'
  const resources = Array.isArray(dataset.resources) ? dataset.resources : []

  const formatsUnicos = [
    ...new Set(
      resources.filter((r) => r.format).map((r) => r.format.toUpperCase())
    ),
  ]

  const ultimaActualizacion = resources.length
    ? formatDate(
        new Date(
          Math.max(
            ...resources
              .filter((r) => r.last_modified)
              .map((r) => new Date(r.last_modified).getTime())
          )
        )
      )
    : 'No disponible'

  return (
    <Link to={`/datasetsDetails/${dataset.id}`}>
      <Card className="p-2 rounded-md shadow-[0_20px_80px_rgba(74,58,255,0.15)] bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold customColor1">
            {title}
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            {description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-around">
          <div className="flex flex-col">
            <div className="flex flex-wrap">
              {formatsUnicos.map((format, idx) => (
                <Badge
                  key={idx}
                  className={`${getColorByFormat(format)} text-white text-xs px-3 py-1 mt-1 mr-1`}
                >
                  {format}
                </Badge>
              ))}
            </div>
            <p className="text-xs customColor2 mt-1">
              Última Actualización: {ultimaActualizacion}
            </p>
          </div>
          <div className="flex ms-auto items-center">
            <Button className="bg-primary text-white text-xs rounded-2xl w-20 h-8 button-custom hover:cursor-pointer">
              Ver Dataset
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default DatasetCard
