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

const OrganizacionesCard = ({ group }) => {
  return (
    <div>
      <Card className="h-60 w-full flex flex-col justify-between p-4 rounded-md shadow-theme-light bg-white">
        <CardHeader className="p-0">
          <CardTitle className="text-base font-semibold leading-tight customColor1">
            {toTitleCase(group.title)}
          </CardTitle>
          <CardDescription className="text-sm customColor2 mt-2 line-clamp-5">
            {group.description}
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex justify-center p-0">
          <Link to={`/datasets?org=${group.name}`}>
            <Button
              variant="outline"
              className="w-full text-primary border-primary text-xs rounded-2xl h-6 button-custom hover:cursor-pointer  hover:text-white"
            >
              Ver Datasets
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default OrganizacionesCard
