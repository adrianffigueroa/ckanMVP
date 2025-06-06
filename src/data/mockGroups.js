//

export const mockGroups = [
  {
    id: 1,
    title: 'Atención ciudadana y defensa del consumidor',
    subtitulo:
      'Información clave sobre atención ciudadana y defensa del consumidor.',
    datasets: 3,
    organizacion: 'Defensoría del Pueblo',
    suborganizacion: 'Dirección de Defensa del Consumidor',
    categorias: ['Derechos', 'Consumo'],
    etiquetas: ['reclamos', 'atención', 'servicios'],
    formatos: ['PDF', 'CSV'],
    descripcion:
      'Datos sobre reclamos, atención al consumidor y servicios públicos. Esta información puede ser útil para estudios, investigaciones y toma de decisiones relacionadas con políticas públicas.',
    grupo: 'ciudadanía',
    metadatos: {
      estado: 'activo',
      ultimaActualizacion: '2025-04-15',
      frecuenciaActualizacion: 'mensual',
      fechaCreacion: '2023-06-01',
    },
  },
  {
    id: 2,
    title: 'Salud pública y servicios médicos',
    subtitulo: 'Información clave sobre salud pública y servicios médicos.',
    datasets: 2,
    organizacion: 'Ministerio de Salud',
    suborganizacion: 'Dirección de Salud Pública',
    categorias: ['Salud'],
    etiquetas: ['hospitales', 'vacunación', 'emergencias'],
    formatos: ['CSV', 'XML'],
    descripcion:
      'Información sobre hospitales públicos, campañas de vacunación y emergencias sanitarias. Esta información puede ser útil para estudios, investigaciones y toma de decisiones relacionadas con políticas públicas.',
    grupo: 'salud',
    metadatos: {
      estado: 'activo',
      ultimaActualizacion: '2025-05-01',
      frecuenciaActualizacion: 'mensual',
      fechaCreacion: '2022-12-10',
    },
  },
  {
    id: 3,
    title: 'Educación y formación',
    subtitulo: 'Información clave sobre educación y formación.',
    datasets: 2,
    organizacion: 'Ministerio de Educación',
    suborganizacion: 'Dirección de Educación Superior',
    categorias: ['Educación'],
    etiquetas: ['universidades', 'escuelas', 'matrículas'],
    formatos: ['CSV', 'PDF'],
    descripcion:
      'Bases de datos sobre escuelas, universidades y matrícula educativa. Esta información puede ser útil para estudios, investigaciones y toma de decisiones relacionadas con políticas públicas.',
    grupo: 'educación',
    metadatos: {
      estado: 'activo',
      ultimaActualizacion: '2025-04-20',
      frecuenciaActualizacion: 'trimestral',
      fechaCreacion: '2023-01-25',
    },
  },
  {
    id: 4,
    title: 'Seguridad y justicia',
    subtitulo: 'Información clave sobre seguridad y justicia.',
    datasets: 2,
    organizacion: 'Ministerio de Justicia y Seguridad',
    suborganizacion: 'Dirección de Seguridad Ciudadana',
    categorias: ['Seguridad'],
    etiquetas: ['policía', 'delitos', 'tribunales'],
    formatos: ['PDF', 'JSON'],
    descripcion:
      'Estadísticas de seguridad pública, delitos y gestión judicial. Esta información puede ser útil para estudios, investigaciones y toma de decisiones relacionadas con políticas públicas.',
    grupo: 'seguridad',
    metadatos: {
      estado: 'inactivo',
      ultimaActualizacion: '2024-11-10',
      frecuenciaActualizacion: 'anual',
      fechaCreacion: '2022-09-18',
    },
  },
  {
    id: 5,
    title: 'Economía y finanzas',
    subtitulo: 'Información clave sobre economía y finanzas.',
    datasets: 2,
    organizacion: 'Ministerio de Economía',
    suborganizacion: 'Dirección de Finanzas Públicas',
    categorias: ['Economía'],
    etiquetas: ['impuestos', 'presupuesto', 'gastos públicos'],
    formatos: ['CSV', 'XLSX'],
    descripcion:
      'Datos de ingresos fiscales, presupuesto y gastos del Estado. Esta información puede ser útil para estudios, investigaciones y toma de decisiones relacionadas con políticas públicas.',
    grupo: 'economía',
    metadatos: {
      estado: 'activo',
      ultimaActualizacion: '2025-03-30',
      frecuenciaActualizacion: 'mensual',
      fechaCreacion: '2023-05-12',
    },
  },
  {
    id: 6,
    title: 'Transporte y movilidad',
    subtitulo: 'Información clave sobre transporte y movilidad.',
    datasets: 1,
    organizacion: 'Secretaría de Transporte',
    suborganizacion: 'Dirección de Movilidad Urbana',
    categorias: ['Transporte'],
    etiquetas: ['buses', 'subtes', 'movilidad urbana'],
    formatos: ['CSV', 'PDF'],
    descripcion:
      'Información sobre redes de transporte público y movilidad urbana. Esta información puede ser útil para estudios, investigaciones y toma de decisiones relacionadas con políticas públicas.',
    grupo: 'infraestructura',
    metadatos: {
      estado: 'inactivo',
      ultimaActualizacion: '2024-08-01',
      frecuenciaActualizacion: 'trimestral',
      fechaCreacion: '2022-07-10',
    },
  },
  {
    id: 7,
    title: 'Ambiente y sustentabilidad',
    subtitulo: 'Información clave sobre ambiente y sustentabilidad.',
    datasets: 1,
    organizacion: 'Ministerio de Ambiente',
    suborganizacion: 'Dirección de Sustentabilidad',
    categorias: ['Medio Ambiente'],
    etiquetas: ['bosques', 'contaminación', 'energía'],
    formatos: ['CSV', 'XML'],
    descripcion:
      'Datos de preservación ambiental, calidad del aire y energías renovables. Esta información puede ser útil para estudios, investigaciones y toma de decisiones relacionadas con políticas públicas.',
    grupo: 'geografía',
    metadatos: {
      estado: 'activo',
      ultimaActualizacion: '2025-04-05',
      frecuenciaActualizacion: 'mensual',
      fechaCreacion: '2023-04-22',
    },
  },
  {
    id: 8,
    title: 'Cultura y turismo',
    subtitulo: 'Información clave sobre cultura y turismo.',
    datasets: 2,
    organizacion: 'Secretaría de Cultura y Turismo',
    suborganizacion: 'Subsecretaría de Cultura',
    categorias: ['Cultura', 'Turismo'],
    etiquetas: ['museos', 'festivales', 'patrimonio'],
    formatos: ['PDF', 'HTML'],
    descripcion:
      'Información de actividades culturales, turismo local y patrimonio histórico. Esta información puede ser útil para estudios, investigaciones y toma de decisiones relacionadas con políticas públicas.',
    grupo: 'cultura',
    metadatos: {
      estado: 'activo',
      ultimaActualizacion: '2025-04-25',
      frecuenciaActualizacion: 'mensual',
      fechaCreacion: '2022-10-05',
    },
  },
  {
    id: 9,
    title: 'Deporte y recreación',
    subtitulo: 'Información clave sobre deporte y recreación.',
    datasets: 2,
    organizacion: 'Ministerio de Deportes y Recreación',
    suborganizacion: 'Dirección de Actividades Deportivas',
    categorias: ['Deporte'],
    etiquetas: ['deportes', 'clubes', 'eventos deportivos'],
    formatos: ['CSV', 'PDF'],
    descripcion:
      'Datos sobre clubes deportivos, eventos y actividades recreativas. Esta información puede ser útil para estudios, investigaciones y toma de decisiones relacionadas con políticas públicas.',
    grupo: 'deporte',
    metadatos: {
      estado: 'activo',
      ultimaActualizacion: '2025-03-12',
      frecuenciaActualizacion: 'trimestral',
      fechaCreacion: '2023-02-18',
    },
  },
  {
    id: 10,
    title: 'Datos demográficos y sociales',
    subtitulo: 'Información clave sobre datos demográficos y sociales.',
    datasets: 2,
    organizacion: 'Instituto Nacional de Estadística y Censos (INDEC)',
    suborganizacion: 'Dirección de Estadísticas Sociales',
    categorias: ['Demografía'],
    etiquetas: ['población', 'censos', 'estadísticas'],
    formatos: ['CSV', 'XLSX'],
    descripcion:
      'Estadísticas demográficas, censos y datos sociales de la población. Esta información puede ser útil para estudios, investigaciones y toma de decisiones relacionadas con políticas públicas.',
    grupo: 'demografía',
    metadatos: {
      estado: 'activo',
      ultimaActualizacion: '2025-01-20',
      frecuenciaActualizacion: 'anual',
      fechaCreacion: '2022-01-01',
    },
  },
  {
    id: 11,
    title: 'Datos de infraestructura y obras públicas',
    subtitulo: 'Información clave sobre infraestructura y obras públicas.',
    datasets: 2,
    organizacion: 'Ministerio de Obras Públicas',
    suborganizacion: 'Dirección de Infraestructura',
    categorias: ['Infraestructura'],
    etiquetas: ['obras', 'infraestructura', 'construcción'],
    formatos: ['CSV', 'PDF'],
    descripcion:
      'Información sobre proyectos de infraestructura y obras públicas. Esta información puede ser útil para estudios, investigaciones y toma de decisiones relacionadas con políticas públicas.',
    grupo: 'infraestructura',
    metadatos: {
      estado: 'activo',
      ultimaActualizacion: '2025-04-10',
      frecuenciaActualizacion: 'mensual',
      fechaCreacion: '2023-03-05',
    },
  },
  {
    id: 12,
    title: 'Datos de vivienda y urbanismo',
    subtitulo: 'Información clave sobre vivienda y urbanismo.',
    datasets: 2,
    organizacion: 'Ministerio de Desarrollo Urbano y Vivienda',
    suborganizacion: 'Dirección de Urbanismo',
    categorias: ['Urbanismo'],
    etiquetas: ['vivienda', 'urbanismo', 'planeamiento'],
    formatos: ['CSV', 'XLSX'],
    descripcion:
      'Datos sobre vivienda, urbanismo y desarrollo territorial. Esta información puede ser útil para estudios, investigaciones y toma de decisiones relacionadas con políticas públicas.',
    grupo: 'geografía',
    metadatos: {
      estado: 'inactivo',
      ultimaActualizacion: '2024-09-15',
      frecuenciaActualizacion: 'semestral',
      fechaCreacion: '2022-06-30',
    },
  },
]
