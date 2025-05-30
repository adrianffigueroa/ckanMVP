// const BASE_URL = 'localhost:5000/api/3/action'
const BASE_URL = '/api/3/action'
//const BASE_URL = 'public/api/3/action'
export const getDatasetCount = async () => {
  // const res = await fetch(`${BASE_URL}/package_search?q=&rows=0`)
  const res = await fetch(`${BASE_URL}/package_search.json`)
  const data = await res.json()
  return data.result.count
}

export const getOrganizations = async () => {
  const res = await fetch(`${BASE_URL}/organization_list.json`)
  const data = await res.json()
  return data.result.length
}

export const getGroupsWithCounts = async () => {
  const res = await fetch(`${BASE_URL}/group_list.json`)
  const data = await res.json()

  const groups = await Promise.all(
    data.result.map(async (groupName) => {
      const res = await fetch(
        // `${BASE_URL}/group_show?id=${groupName}&include_dataset_count=true`
        `${BASE_URL}/group_show?id=${groupName}.json`
      )
      const groupData = await res.json()
      return {
        name: groupData.result.name,
        display_name: groupData.result.display_name,
        package_count: groupData.result.package_count,
      }
    })
  )

  return groups
}

export const getAllDatasets = async () => {
  try {
    const response = await fetch(`${BASE_URL}/package_search.json`)
    const data = await response.json()
    console.log('📦 DATA COMPLETA:', data)
    console.log('✅ data.success:', data.success)
    console.log('✅ data.result:', data.result)
    console.log('✅ data.result.results:', data.result?.results)

    return Array.isArray(data.result?.results) ? data.result.results : []
  } catch (error) {
    console.error('Error fetching datasets:', error)
    return []
  }
}

export const getOrganizationsWithInfo = async () => {
  // const res = await fetch(`${BASE_URL}/organization_list?all_fields=true`)
  const res = await fetch(`${BASE_URL}/organization_list_all_fields.json`)
  const data = await res.json()
  return data.result // contiene name, title, description, package_count, etc.
}

export const getAllGroups = async () => {
  // const res = await fetch(`${BASE_URL}/group_list?all_fields=true`)
  const res = await fetch(`${BASE_URL}/group_list.json`)
  const json = await res.json()
  return json.result
}
