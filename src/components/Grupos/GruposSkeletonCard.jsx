import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Skeleton } from '../ui/skeleton'

const GruposSkeletonCard = () => {
  return (
    <Card className="p-4 shadow-lg rounded-xl bg-white flex flex-col justify-between">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-3/4 rounded-md" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-full rounded-md mt-2" />
          <Skeleton className="h-4 w-5/6 rounded-md mt-2" />
          <Skeleton className="h-4 w-2/3 rounded-md mt-2" />
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <Skeleton className="h-8 w-24 rounded-xl" />
      </CardFooter>
    </Card>
  )
}

export default GruposSkeletonCard
