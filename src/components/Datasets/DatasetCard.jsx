import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'

const DatasetCard = ({ group }) => {
  return (
    <Card className="p-2 rounded-md shadow-[0_20px_80px_rgba(74,58,255,0.15)] bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {group.title} {/* Displaying the name of the dataset */}
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          {group.descripcion} {/* Displaying the description of the dataset */}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-around">
        <div className="flex">
          {group && group.metadatos.ultimaActualizacion && (
            <p className="text-xs text-gray-500">
              Última Actualización: {group.metadatos.ultimaActualizacion}
            </p>
          )}
        </div>
        <div className="flex ms-auto">
          <Button className="bg-primary text-white text-xs rounded-2xl w-20 h-8 hover:cursor-pointer hover:bg-primary-hover">
            <Link to={`/datasetsDetails/${group.id}`}>Ver Dataset</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default DatasetCard
