import { Skeleton } from '@/components/ui/skeleton'

const OrganizacionesSkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3 h-[180px]">
      <Skeleton className="h-6 w-3/4 rounded" /> {/* Título */}
      <Skeleton className="h-4 w-full rounded" /> {/* Línea 1 */}
      <Skeleton className="h-4 w-5/6 rounded" /> {/* Línea 2 */}
      <Skeleton className="h-4 w-1/2 rounded" /> {/* Línea 3 */}
      <div className="mt-auto">
        <Skeleton className="h-8 w-28 rounded" /> {/* Botón */}
      </div>
    </div>
  )
}

export default OrganizacionesSkeletonCard
