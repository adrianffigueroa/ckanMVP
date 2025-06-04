// components/Datasets/SkeletonDatasetCard.jsx
export default function SkeletonDatasetCard() {
  return (
    <div className="animate-pulse rounded-md bg-white shadow-[0_20px_80px_rgba(74,58,255,0.15)] p-4 space-y-4">
      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="flex justify-between mt-4">
        <div className="h-6 w-20 bg-gray-200 rounded"></div>
        <div className="h-6 w-24 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}
