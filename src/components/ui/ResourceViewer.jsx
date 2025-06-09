import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getResourceById } from '@/services/ckanService'
import formatResourceName from '@/utils/formatResourceName'
import { getRecommendedAxes } from '@/utils/getRecommendedAxes'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveLine } from '@nivo/line'
import { ResponsivePie } from '@nivo/pie'
import { useQuery } from '@tanstack/react-query'
import { ArrowUpDown } from 'lucide-react'
import Papa from 'papaparse'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as XLSX from 'xlsx'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select'
const ResourceViewer = () => {
  const [data, setData] = useState([])
  const [errorToShow, setErrorToShow] = useState('')
  const [columns, setColumns] = useState([])
  const [sortCol, setSortCol] = useState(null)
  const [sortAsc, setSortAsc] = useState(true)
  const [search, setSearch] = useState('')
  const [chartType, setChartType] = useState('bar')
  const [xAxis, setXAxis] = useState('')
  const [yAxis, setYAxis] = useState('')
  const [aggregation, setAggregation] = useState('') // 'sum' | 'avg' | 'count'

  const { id } = useParams()

  const {
    data: resource,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['resource', id],
    queryFn: () => getResourceById(id),
  })

  useEffect(() => {
    const parseFile = async () => {
      if (!resource || !resource.url) return
      const url = resource.url
      const format = resource.format?.toLowerCase()
      try {
        const res = await fetch(url)
        const blob = await res.blob()

        if (format === 'csv') {
          const text = await blob.text()
          const parsed = Papa.parse(text, { header: true })
          const filtered = parsed.data.filter((row) =>
            Object.values(row).some((cell) => cell)
          )
          setData(filtered)
          setColumns(parsed.meta.fields)
        } else if (['xlsx', 'xls'].includes(format)) {
          const arrayBuffer = await blob.arrayBuffer()
          const workbook = XLSX.read(arrayBuffer, { type: 'array' })
          const sheetName = workbook.SheetNames[0]
          const sheet = workbook.Sheets[sheetName]
          const parsed = XLSX.utils.sheet_to_json(sheet, { header: 1 })
          const [headers, ...rows] = parsed
          const data = rows.map((row) =>
            headers.reduce((acc, header, i) => {
              acc[header] = row[i]
              return acc
            }, {})
          )
          setData(data)
          setColumns(headers)
        }
      } catch (err) {
        setErrorToShow('No se pudo analizar el archivo.')
      }
    }
    parseFile()
  }, [resource])

  const filteredData = data.filter((row) =>
    columns.some((col) =>
      row[col]?.toString().toLowerCase().includes(search.toLowerCase())
    )
  )
  const isNumericColumn = (col) =>
    data.length > 0 && data.every((row) => !isNaN(parseFloat(row[col])))

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortCol) return 0
    const valA = a[sortCol]
    const valB = b[sortCol]
    if (!isNaN(valA) && !isNaN(valB)) {
      return sortAsc ? valA - valB : valB - valA
    } else {
      return sortAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA))
    }
  })

  const handleSort = (col) => {
    if (sortCol === col) {
      setSortAsc(!sortAsc)
    } else {
      setSortCol(col)
      setSortAsc(true)
    }
  }

  useEffect(() => {
    if (columns.length > 0 && data.length > 0) {
      const { x, y } = getRecommendedAxes(columns, data)
      setXAxis(x)
      setYAxis(y)
    }
  }, [columns, data])
  const getAggregationLabel = (agg, field) => {
    const prefixMap = {
      sum: 'Suma de',
      avg: 'Promedio de',
      count: 'Cantidad de',
    }
    return `${prefixMap[agg] || ''} ${field}`
  }

  const aggregateData = (data, xAxis, yAxis, aggregation) => {
    const grouped = {}

    data.forEach((row) => {
      const xValue = row[xAxis]
      const yValue = parseFloat(row[yAxis])

      if (!grouped[xValue]) grouped[xValue] = []
      if (!isNaN(yValue)) grouped[xValue].push(yValue)
    })

    return Object.entries(grouped).map(([key, values]) => {
      let aggValue = 0
      switch (aggregation) {
        case 'sum':
          aggValue = values.reduce((acc, val) => acc + val, 0)
          break
        case 'avg':
          aggValue = values.reduce((acc, val) => acc + val, 0) / values.length
          break
        case 'count':
          aggValue = values.length
          break
        default:
          aggValue = 0
      }
      return {
        [xAxis]: key,
        [yAxis]: aggValue,
      }
    })
  }
  const renderTable = () => (
    <div className="rounded-xl border shadow overflow-auto">
      <div className="flex items-center justify-between p-2">
        <Input
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Table>
        <TableHeader className="cursor-pointer bg-gray-200 hover:bg-gray-300">
          <TableRow>
            {columns.map((col, idx) => (
              <TableHead key={idx} onClick={() => handleSort(col)}>
                <div className="flex items-center gap-1">
                  {col}
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.slice(0, 30).map((row, i) => (
            <TableRow key={i} className="odd:bg-white even:bg-gray-10">
              {columns.map((col, j) => (
                <TableCell key={j}>{row[col]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )

  const renderCharts = () => {
    if (!xAxis || !yAxis) {
      return (
        <p className="text-sm text-muted mt-4">
          Seleccioná las columnas para visualizar el gráfico.
        </p>
      )
    }

    const label = aggregation ? getAggregationLabel(aggregation, yAxis) : yAxis
    const processedData =
      aggregation !== ''
        ? aggregateData(data, xAxis, yAxis, aggregation)
        : data.map((row) => ({
            [xAxis]: row[xAxis],
            [yAxis]: parseFloat(row[yAxis]),
          }))

    const barData = processedData

    const lineData = [
      {
        id: label,
        data: processedData.map((row) => ({
          x: row[xAxis],
          y: row[yAxis],
        })),
      },
    ]

    const pieData = processedData.map((row, i) => ({
      id: row[xAxis] || `item-${i}`,
      label: row[xAxis] || `item-${i}`,
      value: row[yAxis],
    }))

    return (
      <div className="mt-6">
        {chartType === 'bar' && (
          <Card className="p-4 h-[500px] overflow-auto">
            <h3 className="text-md font-semibold mb-2">{label}</h3>
            <ResponsiveBar
              data={barData}
              keys={[yAxis]}
              indexBy={xAxis}
              margin={{ top: 20, right: 30, bottom: 80, left: 60 }}
              padding={0.3}
              colors={{ scheme: 'nivo' }}
              axisLeft={{
                legend: label,
                legendPosition: 'middle',
                legendOffset: -40,
              }}
              axisBottom={{
                legend: xAxis,
                legendPosition: 'middle',
                legendOffset: 40,
                tickRotation: -10,
              }}
            />
          </Card>
        )}

        {chartType === 'line' && (
          <Card className="p-4 h-[500px] overflow-auto">
            <h3 className="text-md font-semibold mb-2">{label}</h3>
            <ResponsiveLine
              data={lineData}
              margin={{ top: 20, right: 30, bottom: 90, left: 90 }}
              xScale={{ type: 'point' }}
              yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
              axisLeft={{
                legend: label,
                legendPosition: 'middle',
                legendOffset: -40,
              }}
              axisBottom={{
                tickRotation: -10,
                legend: xAxis,
                legendPosition: 'middle',
                legendOffset: 40,
              }}
              colors={{ scheme: 'category10' }}
            />
          </Card>
        )}

        {chartType === 'pie' && (
          <Card className="p-4 h-[500px] overflow-auto">
            <h3 className="text-md font-semibold mb-2">{label}</h3>
            <ResponsivePie
              data={pieData}
              margin={{ top: 20, right: 30, bottom: 80, left: 30 }}
              innerRadius={0.5}
              padAngle={1}
              cornerRadius={3}
              colors={{ scheme: 'paired' }}
            />
          </Card>
        )}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="mt-20 mx-40 flex flex-col gap-6">
        <Card className="h-32 animate-pulse bg-gray-200" />
        <Card className="h-32 animate-pulse bg-gray-200" />
      </div>
    )
  }

  if (isError) return <p className="text-red-600">{error.message}</p>

  return (
    <div className="mt-20 mx-auto px-4 sm:px-8 md:px-20 lg:px-40">
      <h2 className="text-2xl font-bold text-primary mb-8">
        {formatResourceName(resource.name)}
      </h2>

      {renderTable()}
      {columns.length > 0 && (
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 mb-4">
          {/* Tipo de gráfico */}
          <div className="flex flex-col w-full sm:w-auto my-4">
            <label className="text-sm font-medium mb-1">Tipo de gráfico:</label>
            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Seleccionar tipo de gráfico" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bar">Barras</SelectItem>
                <SelectItem value="line">Líneas</SelectItem>
                <SelectItem value="pie">Torta</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Columna X / Categoría */}
          <div className="flex flex-col w-full sm:w-auto my-4">
            <label className="text-sm font-medium mb-1">
              Columna X / Categoría:
            </label>
            <Select value={xAxis} onValueChange={setXAxis}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Seleccionar columna" />
              </SelectTrigger>
              <SelectContent>
                {columns.map((col) => (
                  <SelectItem key={col} value={col}>
                    {col}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Columna Y / Valor */}
          <div className="flex flex-col w-full sm:w-auto my-4">
            <label className="text-sm font-medium mb-1">
              Columna Y / Valor:
            </label>
            <Select value={yAxis} onValueChange={setYAxis} disabled={!xAxis}>
              <SelectTrigger className="w-full sm:w-[200px]" disabled={!xAxis}>
                <SelectValue
                  placeholder={
                    !xAxis
                      ? 'Seleccioná primero la columna X'
                      : 'Seleccionar columna numérica'
                  }
                />
              </SelectTrigger>
              {xAxis && (
                <SelectContent>
                  {columns
                    .filter((col) =>
                      data.every((row) => !isNaN(parseFloat(row[col])))
                    )
                    .map((col) => (
                      <SelectItem key={col} value={col}>
                        {col}
                      </SelectItem>
                    ))}
                </SelectContent>
              )}
            </Select>
          </div>
          {/* Función de agregación */}
          <div className="flex flex-col w-full sm:w-auto my-4">
            <label className="text-sm font-medium mb-1">
              Función de agregación:
            </label>
            <Select
              value={aggregation}
              onValueChange={setAggregation}
              disabled={!yAxis || !isNumericColumn(yAxis)}
            >
              <SelectTrigger
                className="w-full sm:w-[200px]"
                disabled={!yAxis || !isNumericColumn(yAxis)}
              >
                <SelectValue
                  placeholder={
                    !yAxis
                      ? 'Seleccioná primero la columna Y'
                      : !isNumericColumn(yAxis)
                        ? 'La columna no es numérica'
                        : 'Seleccionar'
                  }
                />
              </SelectTrigger>
              {yAxis && isNumericColumn(yAxis) && (
                <SelectContent>
                  <SelectItem value=" ">Sin agregación</SelectItem>
                  <SelectItem value="sum">Suma</SelectItem>
                  <SelectItem value="avg">Promedio</SelectItem>
                  <SelectItem value="count">Conteo</SelectItem>
                </SelectContent>
              )}
            </Select>
          </div>
        </div>
      )}
      {/* renderCharts con Card adaptable */}
      <div className="w-full">
        <Card className="p-4 min-h-[400px] sm:h-[600px] overflow-auto">
          {renderCharts()}
        </Card>
      </div>
    </div>
  )
}

export default ResourceViewer
