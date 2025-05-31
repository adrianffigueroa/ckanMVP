import FiltersContent from '@/components/Datasets/FiltersContent'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import DatasetList from '@/components/Datasets/DatasetList'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'
import SearchBox from '@/components/ui/searchbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useWindowWidth } from '@/hooks/useWindowWidth'
import { getAllDatasets } from '@/services/ckanService'
import { toTitleCase } from '@/utils/toTitleCase'
import { useQuery } from '@tanstack/react-query'
import { FilterIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'sonner'
function Datasets() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['datasets'],
    queryFn: getAllDatasets,
  })

  const datasets = Array.isArray(data) ? data : []

  const orgSet = new Map()

  if (Array.isArray(datasets)) {
    datasets.forEach((d) => {
      const org = d.organization
      if (org && org.name && org.title && !orgSet.has(org.name)) {
        orgSet.set(org.name, { name: org.name, title: org.title })
      }
    })
  }

  const uniqueOrganizations = Array.from(orgSet.values())

  const uniqueCategories = Array.isArray(datasets)
    ? Array.from(
        new Set(
          datasets
            .flatMap((d) =>
              Array.isArray(d.groups) ? d.groups.map((g) => g.display_name) : []
            )
            .filter(Boolean)
        )
      )
    : []

  const uniqueFormats = Array.isArray(datasets)
    ? Array.from(
        new Set(
          datasets.flatMap((d) =>
            Array.isArray(d.resources)
              ? d.resources.map((r) => r.format?.toUpperCase()).filter(Boolean)
              : []
          )
        )
      )
    : []

  const width = useWindowWidth()
  const location = useLocation()

  const [selectedFormats, setSelectedFormats] = useState([])
  const [selectedOrganizations, setSelectedOrganizations] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [tempFormats, setTempFormats] = useState([])
  const [tempOrganizations, setTempOrganizations] = useState([])
  const [tempCategories, setTempCategories] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 2
  const [sortOption, setSortOption] = useState('new')
  const params = new URLSearchParams(location.search)
  const orgParam = params.get('org')
  const groupParam = params.get('group')
  const cameFromOrg = !!orgParam
  const cameFromGroup = !!groupParam

  const filteredDatasets = (datasets || [])
    .filter((dataset) => {
      const matchesFormat =
        selectedFormats.length === 0 ||
        dataset.resources?.some((r) =>
          selectedFormats.includes(r.format?.toUpperCase())
        )

      const matchesOrganization =
        selectedOrganizations.length === 0 ||
        selectedOrganizations.includes(dataset.organization?.name)

      const matchesCategory =
        selectedCategories.length === 0 ||
        dataset.groups?.some((g) =>
          selectedCategories.includes(g.display_name.toLowerCase())
        )

      const matchesGroup =
        !groupParam || dataset.groups?.some((g) => g.name === groupParam)

      const matchesSearch =
        searchTerm.trim() === '' ||
        dataset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dataset.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dataset.tags?.some((tag) =>
          tag.name.toLowerCase().includes(searchTerm.toLowerCase())
        )

      return (
        matchesFormat &&
        matchesOrganization &&
        matchesCategory &&
        matchesSearch &&
        matchesGroup
      )
    })
    .sort((a, b) => {
      const dateA = new Date(a.metadata_modified)
      const dateB = new Date(b.metadata_modified)

      if (sortOption === 'new') {
        return dateB - dateA // más reciente primero
      }
      if (sortOption === 'old') {
        return dateA - dateB // más antiguo primero
      }
      if (sortOption === 'relevant' && searchTerm.trim()) {
        const term = searchTerm.toLowerCase()
        const scoreA = a.title.toLowerCase().includes(term) ? 0 : 1
        const scoreB = b.title.toLowerCase().includes(term) ? 0 : 1
        return scoreA - scoreB // los que contienen el término primero
      }

      return 0 // sin cambios si no aplica
    })

  useEffect(() => {
    if (!userChangedSort.current) return

    const labels = {
      new: 'más reciente',
      old: 'más antiguo',
      relevant: 'más relevante',
    }

    toast.success(`Orden aplicado: ${labels[sortOption]}`)
  }, [sortOption])

  const handleCheckboxChange = (value, tempSelected, setTempSelected) => {
    setTempSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  const handleApplyFilters = () => {
    setSelectedFormats(tempFormats)
    setSelectedOrganizations(tempOrganizations)
    setSelectedCategories(tempCategories)
    setIsOpen(false)
  }

  const handleCleanFilters = () => {
    setSelectedFormats([])
    setSelectedOrganizations([])
    setSelectedCategories([])
    setTempFormats([])
    setTempOrganizations([])
    setTempCategories([])
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const search = params.get('search')
    setSearchTerm(search ? decodeURIComponent(search) : '')
  }, [location.search])

  useEffect(() => {
    if (searchTerm) {
      setTempFormats([])
      setTempOrganizations([])
      setTempCategories([])
    }
  }, [searchTerm])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const search = params.get('search')
    const org = params.get('org')
    const group = params.get('group')

    setSearchTerm(search ? decodeURIComponent(search) : '')

    if (org) {
      setSelectedOrganizations([org])
      setTempOrganizations([org])
    } else {
      setSelectedOrganizations([])
      setTempOrganizations([])
    }

    if (group) {
      setSelectedCategories([group])
      setTempCategories([group])
    } else {
      setSelectedCategories([])
      setTempCategories([])
    }
  }, [location.search])

  const selectedOrgObject = uniqueOrganizations.find(
    (org) => org.name === orgParam
  )
  const selectedOrgTitle = selectedOrgObject?.title || ''

  const allGroups = datasets?.flatMap((d) => d.groups || [])
  const uniqueGroupMap = new Map()
  allGroups?.forEach((g) => {
    if (g?.name && g?.display_name && !uniqueGroupMap.has(g.name)) {
      uniqueGroupMap.set(g.name, g.display_name)
    }
  })
  const selectedGroupTitle = groupParam ? uniqueGroupMap.get(groupParam) : ''
  useEffect(() => {
    setCurrentPage(1)
  }, [
    searchTerm,
    selectedFormats,
    selectedOrganizations,
    selectedCategories,
    sortOption,
  ])
  const totalPages = Math.ceil(filteredDatasets.length / itemsPerPage)
  const paginatedDatasets = filteredDatasets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const userChangedSort = useRef(false)
  return (
    <div className="px-20">
      <div className="flex flex-col mt-30 ">
        <div className="flex flex-col md:flex-row items-start justify-between">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/datasets">Datasets</BreadcrumbLink>
              </BreadcrumbItem>
              {(cameFromOrg && selectedOrgTitle && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <span className="text-gray-400">{selectedOrgTitle}</span>
                  </BreadcrumbItem>
                </>
              )) ||
                (cameFromGroup && selectedGroupTitle && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <span className="text-gray-400">
                        {selectedGroupTitle}
                      </span>
                    </BreadcrumbItem>
                  </>
                ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <h2 className="text-3xl font-semibold text-primary">
          Buscador de Datasets
        </h2>
        <p className="text-gray-600 mb-4">
          {cameFromOrg && selectedOrgTitle
            ? `Utiliza este buscador para localizar fácilmente los conjuntos de datos pertenecientes a "${toTitleCase(selectedOrgTitle)}".`
            : cameFromGroup && selectedGroupTitle
              ? `Utiliza este buscador para localizar fácilmente los conjuntos de datos pertenecientes al grupo "${toTitleCase(selectedGroupTitle)}".`
              : 'Utiliza este buscador para localizar fácilmente los conjuntos de datos que necesites.'}
        </p>

        <div className="flex flex-col gap-4 w-full">
          {/* Línea 1: cantidad + ordenar (md:flex) */}
          <div className="hidden md:flex items-center justify-between w-full">
            <p className="text-sm">
              {filteredDatasets.length} conjunto
              {filteredDatasets.length !== 1 && 's'} encontrados
              {searchTerm ? ` para "${searchTerm}"` : ''}
            </p>
            <div className="flex items-center">
              <p className="text-sm me-2">Ordenar por</p>
              <Select
                value={sortOption}
                onValueChange={(value) => {
                  userChangedSort.current = true
                  setSortOption(value)
                }}
              >
                <SelectTrigger
                  className="w-[170px] pe-2 border-none"
                  iconClassName="text-primary"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Más Reciente</SelectItem>
                  <SelectItem value="old">Más Antiguo</SelectItem>
                  <SelectItem value="relevant">Más Relevante</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mobile: cantidad sola */}
          <div className="md:hidden">
            <p className="text-sm">
              {filteredDatasets.length} conjunto
              {filteredDatasets.length !== 1 && 's'} encontrados
              {searchTerm ? ` para "${searchTerm}"` : ''}
            </p>
          </div>

          {/* Búsqueda + botón filtro (ambos) */}
          <div className="flex w-full items-center">
            <SearchBox
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              wrapperClassName="w-full"
            />
            {width < 768 && (
              <Button
                onClick={() => setIsOpen(true)}
                className="ms-1 bg-white text-primary h-14 w-14 hover:bg-primary-hover hover:text-white cursor-pointer"
              >
                <FilterIcon />
              </Button>
            )}
          </div>

          {/* Mobile: Ordenar por */}
          <div className="flex md:hidden items-center mt-2">
            <Select
              value={sortOption}
              onValueChange={(value) => {
                userChangedSort.current = true
                setSortOption(value)
              }}
            >
              <SelectTrigger
                className="w-[170px] pe-2 border-none ms-auto"
                iconClassName="text-primary"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">Más Reciente</SelectItem>
                <SelectItem value="old">Más Antiguo</SelectItem>
                <SelectItem value="relevant">Más Relevante</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="mt-4 mb-22 flex flex-col md:flex-row gap-4">
        {width >= 768 && (
          <aside className="w-[280px]">
            <FiltersContent
              hideCategories={cameFromGroup}
              hideOrganizations={cameFromOrg}
              uniqueOrganizations={uniqueOrganizations}
              uniqueCategories={uniqueCategories}
              uniqueFormats={uniqueFormats}
              tempOrganizations={tempOrganizations}
              tempCategories={tempCategories}
              tempFormats={tempFormats}
              handleCheckboxChange={handleCheckboxChange}
              handleApplyFilters={handleApplyFilters}
              handleCleanFilters={handleCleanFilters}
              setTempFormats={setTempFormats}
              setTempOrganizations={setTempOrganizations}
              setTempCategories={setTempCategories}
            />
          </aside>
        )}

        <div className="flex flex-col w-full gap-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent side="right" className="w-[280px] py-16 px-4">
              <FiltersContent
                hideCategories={cameFromGroup}
                hideOrganizations={cameFromOrg}
                uniqueOrganizations={uniqueOrganizations}
                uniqueCategories={uniqueCategories}
                uniqueFormats={uniqueFormats}
                tempOrganizations={tempOrganizations}
                tempCategories={tempCategories}
                tempFormats={tempFormats}
                handleCheckboxChange={handleCheckboxChange}
                handleApplyFilters={handleApplyFilters}
                handleCleanFilters={handleCleanFilters}
                setTempFormats={setTempFormats}
                setTempOrganizations={setTempOrganizations}
                setTempCategories={setTempCategories}
              />
            </SheetContent>
          </Sheet>

          <DatasetList
            filteredDatasets={paginatedDatasets}
            searchTerm={searchTerm}
          />
          {totalPages > 1 && (
            <Pagination className="mt-6">
              <PaginationContent className="flex justify-center gap-1">
                <PaginationItem className="mx-2">
                  <PaginationLink
                    className="cursor-pointer text-primary w-17 hover:bg-primary-hover hover:text-white "
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    isActive={false}
                    aria-disabled={currentPage === 1}
                  >
                    Anterior
                  </PaginationLink>
                </PaginationItem>

                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      className="cursor-pointer text-primary hover:bg-primary-hover hover:text-white"
                      isActive={currentPage === i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem className="mx-2">
                  <PaginationLink
                    className="cursor-pointer text-primary w-17  hover:bg-primary-hover hover:text-white "
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    isActive={false}
                    aria-disabled={currentPage === totalPages}
                  >
                    Siguiente
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  )
}

export default Datasets
