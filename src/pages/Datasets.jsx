import DatasetList from '@/components/Datasets/DatasetList'
import FiltersContent from '@/components/Datasets/FiltersContent'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Button } from '@/components/ui/button'
import SearchBox from '@/components/ui/searchbox'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { mockGroups } from '@/data/mockGroups'
import { useWindowWidth } from '@/hooks/useWindowWidth'
import { FilterIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function Datasets() {
  const width = useWindowWidth()
  const location = useLocation()

  // Estados principales
  const [selectedFormats, setSelectedFormats] = useState([])
  const [selectedOrganizations, setSelectedOrganizations] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  // Estados temporales
  const [tempFormats, setTempFormats] = useState([])
  const [tempOrganizations, setTempOrganizations] = useState([])
  const [tempCategories, setTempCategories] = useState([])

  const [isOpen, setIsOpen] = useState(false)

  // Valores únicos
  const uniqueFormats = Array.from(
    new Set(mockGroups.flatMap((g) => g.formatos))
  )
  const uniqueOrganizations = Array.from(
    new Set(mockGroups.map((g) => g.organizacion))
  )
  const uniqueCategories = Array.from(
    new Set(mockGroups.map((g) => g.categorias))
  )

  // Lógica para aplicar los filtros
  const filteredGroups = mockGroups.filter((group) => {
    const matchesFormat =
      selectedFormats.length === 0 ||
      group.formatos.some((format) => selectedFormats.includes(format))

    const matchesOrganization =
      selectedOrganizations.length === 0 ||
      selectedOrganizations.includes(group.organizacion)

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(group.categorias)

    const matchesSearch =
      searchTerm.trim() === '' ||
      group.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.etiquetas.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )

    return (
      matchesFormat && matchesOrganization && matchesCategory && matchesSearch
    )
  })

  // Función para manejar cambios en los checkboxes
  const handleCheckboxChange = (value, tempSelected, setTempSelected) => {
    setTempSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  // Aplicar filtros definitivos
  const handleApplyFilters = () => {
    setSelectedFormats(tempFormats)
    setSelectedOrganizations(tempOrganizations)
    setSelectedCategories(tempCategories)
    setIsOpen(false)
  }

  // Limpiar filtros
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
    if (search) {
      setSearchTerm(decodeURIComponent(search))
    } else {
      setSearchTerm('')
    }
  }, [location.search])
  useEffect(() => {
    if (searchTerm) {
      setTempFormats([])
      setTempOrganizations([])
      setTempCategories([])
    }
  }, [searchTerm])

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
                <BreadcrumbLink href="/datasets">
                  {searchTerm ? searchTerm : 'Datasets'}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <h2 className="text-3xl font-semibold text-primary">
          Buscador de conjuntos de Datos
        </h2>
        <p className="text-gray-600 mb-4">
          Utiliza este buscador para localizar fácilmente los conjuntos de datos
          que necesites.
        </p>
        <div className="flex flex-col md:flex-row items-start justify-between">
          <div className="flex">
            <p className="text-sm  mt-2">
              {filteredGroups.length} conjunto
              {filteredGroups.length !== 1 && 's'} encontrados
              {searchTerm ? ` para "${searchTerm}"` : ''}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-sm">Ordenar por</p>
            <Select defaultValue={'relevant'}>
              <SelectTrigger
                className="w-[170px] pe-2 border-none"
                iconClassName="text-primary"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevant">Más Relevante</SelectItem>
                <SelectItem value="new">Más Reciente</SelectItem>
                <SelectItem value="old">Más Antiguo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="mt-4 mb-22 flex flex-col md:flex-row gap-4">
        {/* BOTÓN para abrir el Sheet solo en mobile */}

        {/* FILTROS DESKTOP */}
        {width >= 768 && (
          <aside className="w-[280px]">
            <FiltersContent
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

        {/* CONTENIDO PRINCIPAL */}
        <div className="flex flex-col w-full gap-4">
          {/* Barra de búsqueda */}
          <div className="flex items-center justify-end ">
            <div className="flex w-full ">
              <SearchBox
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                wrapperClassName="w-full"
              />
            </div>
            {width < 768 && (
              <div className="flex">
                <Button
                  onClick={() => setIsOpen(true)}
                  variant=""
                  className="ms-1 bg-white text-primary h-14 w-14 hover:bg-primary-hover hover:text-white cursor-pointer"
                >
                  <FilterIcon className="mr-2" />
                </Button>
              </div>
            )}
          </div>
          {/* Sheet Mobile */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent side="right" className="w-[280px] py-16 px-4">
              <FiltersContent
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

          {/* Lista de datasets */}
          <DatasetList mockGroups={filteredGroups} searchTerm={searchTerm} />
        </div>
      </div>
    </div>
  )
}

export default Datasets
