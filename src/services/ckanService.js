const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getDatasetCount = async () => {
  const res = await fetch(`${BASE_URL}/package_search?rows=1000`)
  const data = await res.json()
  return data.result.count
}

export const getOrganizations = async () => {
  const res = await fetch(`${BASE_URL}/organization_list?all_fields=true`)
  const data = await res.json()
  return data.result.length
}

export const getGroupsWithCounts = async () => {
  const res = await fetch(`${BASE_URL}/group_list?all_fields=true`)
  const data = await res.json()

  const groups = await Promise.all(
    data.result.map(async (group) => {
      const res = await fetch(
        `${BASE_URL}/group_show?id=${group.name}&include_dataset_count=true`
      )
      const groupData = await res.json()
      return {
        name: groupData.result.name,
        description: groupData.result.description,
        display_name: groupData.result.display_name,
        package_count: groupData.result.package_count,
      }
    })
  )

  return groups
}

export const getAllDatasets = async () => {
  try {
    const response = await fetch(`${BASE_URL}/package_search?q=&rows=1000`)
    const data = await response.json()
    console.log(data)

    return Array.isArray(data.result?.results) ? data.result.results : []
  } catch (error) {
    console.error('Error fetching datasets:', error)
    return []
  }
}

export const getOrganizationsWithInfo = async () => {
  const res = await fetch(`${BASE_URL}/organization_list?all_fields=true`)
  const data = await res.json()
  return data.result // contiene name, title, description, package_count, etc.
}

export const getAllGroups = async () => {
  const res = await fetch(`${BASE_URL}/group_list?all_fields=true`)

  const json = await res.json()
  return json.result
}

export const getResourceById = async (id) => {
  const res = await fetch(`${BASE_URL}/resource_show?id=${id}`)
  const data = await res.json()
  if (!data.success) throw new Error('No se pudo cargar el recurso.')
  return data.result
}

// const BASE_URL = import.meta.env.VITE_API_BASE_URL
// const PUBLIC_CKAN_URL =
//   'https://powerseller-motion-protecting-reality.trycloudflare.com'

// const fixResourceUrls = (datasets) => {
//   return datasets.map((dataset) => {
//     const fixedResources = dataset.resources.map((res) => ({
//       ...res,
//       url: res.url?.replace('http://localhost:5080', PUBLIC_CKAN_URL),
//     }))
//     return { ...dataset, resources: fixedResources }
//   })
// }

// export const getDatasetCount = async () => {
//   const res = await fetch(`${BASE_URL}/package_search?rows=1000`)
//   const data = await res.json()
//   return data.result.count
// }

// export const getOrganizations = async () => {
//   const res = await fetch(`${BASE_URL}/organization_list?all_fields=true`)
//   const data = await res.json()
//   return data.result.length
// }

// export const getGroupsWithCounts = async () => {
//   const res = await fetch(`${BASE_URL}/group_list?all_fields=true`)
//   const data = await res.json()

//   const groups = await Promise.all(
//     data.result.map(async (group) => {
//       const res = await fetch(
//         `${BASE_URL}/group_show?id=${group.name}&include_dataset_count=true`
//       )
//       const groupData = await res.json()
//       return {
//         name: groupData.result.name,
//         description: groupData.result.description,
//         display_name: groupData.result.display_name,
//         package_count: groupData.result.package_count,
//       }
//     })
//   )

//   return groups
// }

// export const getAllDatasets = async () => {
//   try {
//     const response = await fetch(`${BASE_URL}/package_search?q=&rows=1000`)
//     const data = await response.json()

//     if (Array.isArray(data.result?.results)) {
//       return fixResourceUrls(data.result.results)
//     }

//     return []
//   } catch (error) {
//     console.error('Error fetching datasets:', error)
//     return []
//   }
// }

// export const getOrganizationsWithInfo = async () => {
//   const res = await fetch(`${BASE_URL}/organization_list?all_fields=true`)
//   const data = await res.json()
//   return data.result // contiene name, title, description, package_count, etc.
// }

// export const getAllGroups = async () => {
//   const res = await fetch(`${BASE_URL}/group_list?all_fields=true`)
//   const json = await res.json()
//   return json.result
// }

// export const getResourceById = async (id) => {
//   const res = await fetch(`${BASE_URL}/resource_show?id=${id}`)
//   const data = await res.json()
//   if (!data.success) throw new Error('No se pudo cargar el recurso.')

//   // También corregimos la URL del recurso individual
//   return {
//     ...data.result,
//     url: data.result.url?.replace('http://localhost:5080', PUBLIC_CKAN_URL),
//   }
// }
