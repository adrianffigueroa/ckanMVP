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
      <Card className="h-60 w-full flex flex-col justify-between p-4 rounded-md shadow-[0_20px_80px_rgba(74,58,255,0.15)] bg-white">
        <CardHeader className="p-0">
          <CardTitle className="text-base font-semibold leading-tight">
            {group.organizacion}
          </CardTitle>
          <CardDescription className="text-sm text-gray-500 mt-2 line-clamp-5">
            {group.descripcion}
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex justify-center p-0">
          <Button
            variant="outline"
            className="w-full text-primary border-primary text-xs rounded-2xl h-6 hover:cursor-pointer hover:bg-primary-hover hover:text-white"
          >
            Ver Datasets
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default OrganizacionesCard
