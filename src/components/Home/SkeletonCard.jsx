import { Skeleton } from '@/components/ui/skeleton'

const SkeletonCard = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-4 bg-white rounded-xl shadow-md w-48 h-40 gap-3">
      <Skeleton className="h-6 w-28 rounded" />
      <Skeleton className="h-4 w-16 rounded" />
    </div>
  )
}

export default SkeletonCard
