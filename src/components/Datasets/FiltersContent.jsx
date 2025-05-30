import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
function FiltersContent({
  hideCategories,
  hideOrganizations,
  uniqueOrganizations,
  uniqueCategories,
  uniqueFormats,
  tempOrganizations,
  tempCategories,
  tempFormats,
  handleCheckboxChange,
  handleApplyFilters,
  handleCleanFilters,
  setTempFormats,
  setTempOrganizations,
  setTempCategories,
}) {
  console.log(uniqueCategories)

  return (
    <div className="max-w-[300px] w-full">
      <Accordion type="multiple" collapsible className="w-full">
        {/* 🔵 Organización */}
        {!hideOrganizations && (
          <AccordionItem
            value="organizaciones"
            className="mb-4 shadow-[0_20px_80px_rgba(74,58,255,0.15)] bg-white"
          >
            <AccordionTrigger>Organizaciones</AccordionTrigger>
            <AccordionContent className="mt-2">
              {uniqueOrganizations.map((org) => (
                <div key={org.name} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`org-${org.name}`}
                    checked={tempOrganizations.includes(org.name)}
                    onChange={() =>
                      handleCheckboxChange(
                        org.name,
                        tempOrganizations,
                        setTempOrganizations
                      )
                    }
                    className="mr-2"
                  />
                  <label
                    htmlFor={`org-${org.name}`}
                    className="text-sm text-gray-700"
                  >
                    {org.title || org.name}
                  </label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        )}

        {/* 🟣 Categorías */}
        {!hideCategories && (
          <AccordionItem
            value="categorias"
            className="mb-4 shadow-[0_20px_80px_rgba(74,58,255,0.15)] bg-white"
          >
            <AccordionTrigger>Categorías</AccordionTrigger>
            <AccordionContent className="mt-2">
              {uniqueCategories.map((cat) => (
                <div key={cat} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`cat-${cat}`}
                    checked={tempCategories.includes(cat)}
                    onChange={() =>
                      handleCheckboxChange(
                        cat,
                        tempCategories,
                        setTempCategories
                      )
                    }
                    className="mr-2"
                  />
                  <label
                    htmlFor={`cat-${cat}`}
                    className="text-sm text-gray-700"
                  >
                    {cat}
                  </label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        )}

        {/* 🟡 Formatos */}
        <AccordionItem
          value="formatos"
          className="mb-4 shadow-[0_20px_80px_rgba(74,58,255,0.15)] bg-white"
        >
          <AccordionTrigger>Formatos</AccordionTrigger>
          <AccordionContent className="mt-2">
            {uniqueFormats.map((format) => (
              <div key={format} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`format-${format}`}
                  checked={tempFormats.includes(format)}
                  onChange={() =>
                    handleCheckboxChange(format, tempFormats, setTempFormats)
                  }
                  className="mr-2"
                />
                <label
                  htmlFor={`format-${format}`}
                  className="text-sm text-gray-700"
                >
                  {format}
                </label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Botones */}
      <div className="flex items-center justify-between mt-4">
        <Button
          onClick={handleApplyFilters}
          className="px-1 text-primary bg-white hover:cursor-pointer hover:bg-[rgba(74,58,255,0.1)]
"
        >
          Aplicar Filtros
        </Button>
        <Button
          onClick={handleCleanFilters}
          variant=""
          className="px-1 text-primary bg-white hover:cursor-pointer hover:bg-[rgba(74,58,255,0.1)]"
        >
          Limpiar Filtros
        </Button>
      </div>
    </div>
  )
}

export default FiltersContent
