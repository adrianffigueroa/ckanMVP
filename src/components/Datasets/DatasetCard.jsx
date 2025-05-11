import { Badge } from '@/components/ui/badge'
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
          {group.formatos.map((formato) => (
            <Badge
              key={formato}
              className={`${formato === 'CSV' || formato === 'XLSX' ? 'bg-green-600' : formato === 'PDF' ? 'bg-red-600' : 'bg-gray-600'} text-white text-xs rounded-md px-2 py-1 mr-2`}
            >
              {formato}
            </Badge>
          ))}
        </div>
        <div className="flex ms-auto">
          <Button className="bg-primary text-white text-xs rounded-2xl w-12 h-6 hover:cursor-pointer hover:bg-primary-hover">
            <Link to={`/datasetsDetails/${group.id}`}>Ver</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default DatasetCard
