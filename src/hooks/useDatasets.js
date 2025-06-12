import { useQuery } from '@tanstack/react-query'
const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useDatasets = () => {
  const query = useQuery({
    queryKey: ['datasets'],

    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/package_search`)
      if (!res.ok) throw new Error('Error al obtener datasets')
      const data = await res.json()
      if (!Array.isArray(data.result?.results))
        throw new Error('Formato inválido')
      localStorage.setItem('datasetsCache', JSON.stringify(data.result.results))
      return data.result.results
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
    onError: () => {},
  })

  const fallback = () => {
    try {
      const cached = localStorage.getItem('datasetsCache')
      return cached ? JSON.parse(cached) : []
    } catch {
      return []
    }
  }

  const datasets = query.isSuccess
    ? query.data
    : query.isError
      ? fallback()
      : []

  const isUsingFallback = query.isError && datasets.length > 0

  return {
    datasets,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    isUsingFallback,
  }
}
