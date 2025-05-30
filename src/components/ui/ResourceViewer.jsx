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
import formatResourceName from '@/utils/formatResourceName'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveLine } from '@nivo/line'
import { ResponsivePie } from '@nivo/pie'
import { ArrowUpDown } from 'lucide-react'
import Papa from 'papaparse'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as XLSX from 'xlsx'

const ResourceViewer = () => {
  const { id } = useParams()
  const [resource, setResource] = useState(null)
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const [error, setError] = useState(null)
  const [sortCol, setSortCol] = useState(null)
  const [sortAsc, setSortAsc] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const res = await fetch(
          `http://https://1e85-190-221-198-99.ngrok-free.app/api/3/action/resource_show?id=${id}`
        )
        const json = await res.json()
        if (json.success) {
          setResource(json.result)
        } else {
          setError('No se pudo cargar el recurso.')
        }
      } catch (err) {
        setError('Error al obtener el recurso.')
      }
    }
    fetchResource()
  }, [id])

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
        setError('No se pudo analizar el archivo.')
      }
    }
    parseFile()
  }, [resource])

  const filteredData = data.filter((row) =>
    columns.some((col) =>
      row[col]?.toString().toLowerCase().includes(search.toLowerCase())
    )
  )

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
    const numericColumns = columns.filter((col) =>
      data.every((row) => !isNaN(parseFloat(row[col])))
    )
    const chartColumn = numericColumns[0]
    const labelColumn = columns.find((col) => col !== chartColumn)

    const barData = data.map((row) => ({
      [labelColumn]: row[labelColumn],
      [chartColumn]: parseFloat(row[chartColumn]),
    }))

    const lineData = [
      {
        id: chartColumn,
        data: data.map((row, i) => ({
          x: row[labelColumn],
          y: parseFloat(row[chartColumn]),
        })),
      },
    ]

    const pieData = data.map((row, i) => ({
      id: row[labelColumn] || `item-${i}`,
      label: row[labelColumn] || `item-${i}`,
      value: parseFloat(row[chartColumn]),
    }))

    return (
      <div className="flex flex-col gap-12 mt-6">
        <Card className="p-4 h-[500px] overflow-auto">
          <h3 className="text-md font-semibold mb-2">Gráfico de Barras</h3>
          <ResponsiveBar
            data={barData}
            keys={[chartColumn]}
            indexBy={labelColumn}
            margin={{ top: 20, right: 30, bottom: 80, left: 60 }}
            padding={0.3}
            colors={{ scheme: 'nivo' }}
          />
        </Card>
        <Card className="p-4 h-[500px] overflow-auto">
          <h3 className="text-md font-semibold mb-2">Gráfico de Líneas</h3>
          <ResponsiveLine
            data={lineData}
            margin={{ top: 20, right: 30, bottom: 90, left: 90 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
            axisBottom={{ tickRotation: -10 }}
            colors={{ scheme: 'category10' }}
          />
        </Card>
        <Card className="p-4 h-[500px] overflow-auto">
          <h3 className="text-md font-semibold mb-2">Gráfico de Torta</h3>
          <ResponsivePie
            data={pieData}
            margin={{ top: 20, right: 30, bottom: 80, left: 30 }}
            innerRadius={0.5}
            padAngle={1}
            cornerRadius={3}
            colors={{ scheme: 'paired' }}
          />
        </Card>
      </div>
    )
  }

  if (error) return <p className="text-red-600">{error}</p>
  if (!resource) return <p>Cargando recurso...</p>

  return (
    <div className="mt-20 mx-40">
      <h2 className="text-2xl font-bold text-primary mb-8">
        {formatResourceName(resource.name)}
      </h2>
      {renderTable()}
      {renderCharts()}
    </div>
  )
}

export default ResourceViewer
