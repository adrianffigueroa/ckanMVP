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
  console.log(dataset)

  return (
    <Link to={`/datasetsDetails/${dataset.id}`}>
      <Card className="p-2 rounded-md shadow-[0_20px_80px_rgba(74,58,255,0.15)] bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {toTitleCase(dataset.title)}
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            {dataset.notes}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-around">
          <div className="flex">
            {dataset && (
              <div>
                <>
                  {[
                    ...new Set(
                      dataset?.resources?.map((r) => r.format.toUpperCase())
                    ),
                  ].map((format, idx) => (
                    <Badge
                      key={idx}
                      className={`${getColorByFormat(format)} text-white text-xs px-3 py-1 mt-1 mr-1`}
                    >
                      {format}
                    </Badge>
                  ))}
                </>
                <p className="text-xs text-gray-500 mt-1">
                  Última Actualización:{' '}
                  {formatDate(dataset.resources?.[0]?.last_modified)}
                </p>
              </div>
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
