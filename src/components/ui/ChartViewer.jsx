import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const mockDatasets = {
  produccionMensual: {
    nombre: 'Producción Mensual',
    tipo: ['line', 'bar'],
    data: [
      { mes: 'Enero', valor: 120 },
      { mes: 'Febrero', valor: 150 },
      { mes: 'Marzo', valor: 90 },
    ],
  },
  ventasPorCategoria: {
    nombre: 'Ventas por Categoría',
    tipo: ['bar', 'pie'],
    data: [
      { categoria: 'Tintas', valor: 300 },
      { categoria: 'Herramientas', valor: 200 },
      { categoria: 'Bolsas', valor: 100 },
    ],
  },
  generoClientes: {
    nombre: 'Clientes por Género',
    tipo: ['pie'],
    data: [
      { categoria: 'Masculino', valor: 60 },
      { categoria: 'Femenino', valor: 40 },
    ],
  },
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00c49f']

export function ChartViewer() {
  const [datasetKey, setDatasetKey] = useState('produccionMensual')
  const [chartType, setChartType] = useState('line')

  const dataset = mockDatasets[datasetKey]
  const data = dataset.data

  const renderChart = () => {
    if (chartType === 'line') {
      return (
        <LineChart data={data}>
          <XAxis dataKey="mes" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="valor" stroke="#8884d8" />
        </LineChart>
      )
    }

    if (chartType === 'bar') {
      return (
        <BarChart data={data}>
          <XAxis dataKey={data[0]?.mes ? 'mes' : 'categoria'} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="valor" fill="#82ca9d" />
        </BarChart>
      )
    }

    if (chartType === 'pie') {
      return (
        <PieChart>
          <Pie
            data={data}
            dataKey="valor"
            nameKey="categoria"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      )
    }

    return <p>No compatible.</p>
  }

  return (
    <div className="flex justify-center px-4 py-10 my-20">
      <Card className="w-full max-w-5xl">
        <CardHeader>
          <CardTitle>Título de Dataset</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Medidas</label>
              <Select
                value={datasetKey}
                onValueChange={(value) => {
                  setDatasetKey(value)
                  setChartType(mockDatasets[value].tipo[0]) // Reset tipo por default
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar dataset" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(mockDatasets).map(([key, val]) => (
                    <SelectItem key={key} value={key}>
                      {val.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Tipo de gráfico
              </label>
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar gráfico" />
                </SelectTrigger>
                <SelectContent>
                  {dataset.tipo.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === 'line'
                        ? 'Líneas'
                        : type === 'bar'
                          ? 'Barras'
                          : 'Torta'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            {renderChart()}
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
