import { formatDate } from '@/utils/date'
import { toTitleCase } from '@/utils/toTitleCase'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'

const DatasetCard = ({ dataset }) => {
  return (
    <Link to={`/datasetsDetails/`}>
      <Card className="p-2 rounded-md shadow-[0_20px_80px_rgba(74,58,255,0.15)] bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {toTitleCase(dataset.name)}
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            {dataset.notes}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-around">
          <div className="flex">
            {dataset && (
              <p className="text-xs text-gray-500">
                Última Actualización:{' '}
                {formatDate(dataset.resources?.[0]?.last_modified)}
              </p>
            )}
          </div>
          <div className="flex ms-auto">
            <Button className="bg-primary text-white text-xs rounded-2xl w-20 h-8 hover:cursor-pointer hover:bg-primary-hover">
              Ver Dataset
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default DatasetCard
