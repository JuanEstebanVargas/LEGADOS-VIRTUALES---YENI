export type Artwork = {
  title: string
  artist: string
  year: string
  period: string
  medium: string
  variant: 'artwork-media-alt' | 'artwork-media-night' | ''
}

export type SiteMapEntry = {
  code: string
  title: string
  description: string
  href: string
}

export type StoryBlock = {
  title: string
  description: string
}

export type ValueBlock = {
  number: string
  title: string
  description: string
}

export type TimelineEntry = {
  year: string
  title: string
  description: string
}

export type LeadershipEntry = {
  role: string
  name: string
  period: string
  description: string
  tag: string
}

export type HighlightCard = {
  title: string
  description: string
}

export type ChannelEntry = {
  title: string
  detail: string
}

export const siteHighlights = [
  'Colecciones destacadas',
  'Exposiciones temporales',
  'Noticias y eventos',
  'Formulario de contacto',
]

export const siteMapEntries: SiteMapEntry[] = [
  {
    code: 'B.',
    title: 'Inicio',
    description: 'Presentacion visual, identidad, manifiesto y accesos rapidos.',
    href: '#inicio',
  },
  {
    code: 'C.',
    title: 'El Museo',
    description: 'Historia, arquitectura, valores, equipo y marco institucional.',
    href: '#identidad',
  },
  {
    code: 'D.',
    title: 'Multimedia',
    description: 'Salas, coleccion, recorridos 360° y fichas de obras.',
    href: '#coleccion',
  },
  {
    code: 'E.',
    title: 'Visitas',
    description: 'Horarios, ubicacion, accesibilidad y canales de atencion.',
    href: '#visita',
  },
  {
    code: 'F.',
    title: 'Programacion',
    description: 'Eventos, talleres, actividades culturales y calendario.',
    href: '#programacion',
  },
  {
    code: 'G.',
    title: 'Patrimonio Vivo',
    description: 'Maleta pedagogica, proyectos y mediacion comunitaria.',
    href: '#patrimonio',
  },
  {
    code: 'H.',
    title: 'Investigacion',
    description: 'Publicaciones, libros, articulos y documentos de consulta.',
    href: '#investigacion',
  },
  {
    code: 'I.',
    title: 'Contacto',
    description: 'Redes, correo institucional y formulario de contacto.',
    href: '#contacto',
  },
]

export const storyBlocks: StoryBlock[] = [
  {
    title: 'Mision',
    description:
      'Preservar, conservar, restaurar, difundir y exhibir las obras de Arte Religioso procedentes de ambientes eclesiásticos de esta Arquidiócesis, permitiendo que el Patrimonio histórico, artístico y cultural del suroccidente colombiano aquí conservado sea instrumento de formación para el fomento de la identidad cultural y la historia regional.',
  },
  {
    title: 'Vision',
    description:
      'El Museo Arquidiocesano de Arte Religioso de Popayán será una institución líder en la promoción, defensa y conservación del patrimonio artístico de la región; así como en el fomento de la cultura a través de la formación de valores estéticos, críticos y de apropiación del arte colonial latinoamericano, en beneficio de las presentes y futuras generaciones.',
  },
]

export const institutionalValues: ValueBlock[] = [
  {
    number: '01',
    title: 'Preservacion',
    description: 'Cuidamos el patrimonio como documento vivo de nuestra historia colectiva.',
  },
  {
    number: '02',
    title: 'Identidad',
    description: 'Reconocemos las multiples voces que dieron forma a la coleccion y al inmueble.',
  },
  {
    number: '03',
    title: 'Apertura',
    description: 'El patrimonio conservado aqui pertenece a toda la ciudad y a sus visitantes.',
  },
  {
    number: '04',
    title: 'Rigor',
    description: 'Aplicamos criterios de conservacion, investigacion y mediacion con consistencia.',
  },
  {
    number: '05',
    title: 'Educacion',
    description: 'Formamos sensibilidades y puentes entre la memoria material y la experiencia actual.',
  },
  {
    number: '06',
    title: 'Memoria y dialogo',
    description: 'Entendemos el museo como una conversacion activa entre epocas y comunidades.',
  },
]

export const historyTimeline: TimelineEntry[] = [
  {
    year: '1546',
    title: 'El origen mas remoto',
    description:
      'Se crea la Diocesis de Popayan y se inicia un proceso historico que mas adelante dara contexto a la coleccion religiosa.',
  },
  {
    year: '17 de abril de 1972',
    title: 'Nace la Junta Pro Museo',
    description:
      'El Decreto No. 365 impulsa la organizacion institucional que dara forma al futuro museo.',
  },
  {
    year: '10 de octubre de 1972',
    title: 'Creacion oficial del Museo',
    description:
      'El Decreto Arzobispal No. 386 formaliza la entidad con proposito cultural y social.',
  },
  {
    year: '1972 - 1979',
    title: 'La casona y la primera etapa',
    description:
      'La sede se consolida y se ordenan los primeros recorridos para recibir al publico con una coleccion inicial.',
  },
  {
    year: '1996 / 2006',
    title: 'Proteccion patrimonial',
    description:
      'El inmueble y la coleccion alcanzan reconocimiento juridico como Monumento Nacional y Bien de Interes Cultural.',
  },
  {
    year: '2022 - Presente',
    title: 'Nueva etapa digital',
    description:
      'El museo refuerza su proyeccion educativa y su presencia publica mediante herramientas digitales.',
  },
]

export const leadershipEntries: LeadershipEntry[] = [
  {
    role: 'Primera directora',
    name: 'Silvia Ayerbe de Caicedo',
    period: '1972 - 1989',
    description:
      'Asumio la direccion del Museo desde su nacimiento institucional y organizo la etapa fundacional.',
    tag: 'Directora fundadora',
  },
  {
    role: 'Segunda directora',
    name: 'Maria Eugenia Valencia de Redondo',
    period: '1989 - 2003',
    description:
      'Dio continuidad al proyecto museal y fortalecio la gestion administrativa y cultural.',
    tag: 'Etapa de continuidad',
  },
  {
    role: 'Tercera directora',
    name: 'Carmen Elisa Hernandez',
    period: '2004 - 2022',
    description:
      'Impulso procesos de conservacion, mediacion educativa y consolidacion institucional.',
    tag: 'Etapa de consolidacion',
  },
  {
    role: 'Directora actual',
    name: 'Yenifer Andrea Castano Vargas',
    period: 'Marzo 2022 - Presente',
    description:
      'Lidera la proyeccion digital del museo y su relacion con nuevas audiencias y comunidades.',
    tag: 'Educacion patrimonial',
  },
]

export const collectionTechniques: HighlightCard[] = [
  {
    title: 'Pintura colonial',
    description: 'Obras devocionales y catequeticas asociadas a tradiciones quiteñas y payanesas.',
  },
  {
    title: 'Escultura policromada',
    description: 'Piezas de alto valor simbolico con dialogo entre volumen, color y liturgia.',
  },
  {
    title: 'Orfebreria',
    description: 'Piezas rituales y objetos de culto trabajados en metales nobles.',
  },
  {
    title: 'Textiles y ornamentos',
    description: 'Elementos ceremoniales que completan la experiencia material de la coleccion.',
  },
]

export const visitDetails: HighlightCard[] = [
  {
    title: 'Horarios',
    description: 'Lunes a viernes: 9:00 - 18:00. Sabados y domingos: 10:00 - 16:00.',
  },
  {
    title: 'Ubicacion',
    description: 'Calle Principal 123, centro historico. Acceso peatonal y transporte cercano.',
  },
  {
    title: 'Accesibilidad',
    description: 'Rutas claras, apoyo de mediacion y orientacion para grupos escolares y turistas.',
  },
]

export const programmingCards: HighlightCard[] = [
  {
    title: 'Exposicion actual',
    description: 'Luz y devocion propone una lectura sobre iconografia, espacio y experiencia.',
  },
  {
    title: 'Talleres',
    description: 'Actividades familiares y educativas para conectar obra, tecnica y contexto.',
  },
  {
    title: 'Recorridos guiados',
    description: 'Acompanamiento presencial o virtual para explorar salas y relatos curatoriales.',
  },
]

export const heritageCards: HighlightCard[] = [
  {
    title: 'Maleta pedagogica',
    description: 'Material para mediacion escolar y trabajo con docentes, familias y comunidad.',
  },
  {
    title: 'Voces del patrimonio',
    description: 'Historias, testimonios y relatos que amplian la lectura de las piezas y el espacio.',
  },
  {
    title: 'Proyectos de conservacion',
    description: 'Procesos de documentacion, restauracion y registro para cuidar la coleccion.',
  },
]

export const researchCards: HighlightCard[] = [
  {
    title: 'Publicaciones',
    description: 'Libros, catalogos y materiales de referencia para consulta academica y publica.',
  },
  {
    title: 'Documentos',
    description: 'Actas, decretos y soportes historicos que estructuran la memoria institucional.',
  },
  {
    title: 'Consulta digital',
    description: 'Repositorio y fichas que pueden expandirse con archivos, imagenes y transcripciones.',
  },
]

export const contactChannels: ChannelEntry[] = [
  { title: 'Correo institucional', detail: 'hola@museo-virtual.com' },
  { title: 'Telefono', detail: '+52 123 456 7890' },
  { title: 'Redes', detail: 'Instagram, Facebook y YouTube' },
  { title: 'Atencion', detail: 'Formulario web y visitas guiadas con previa coordinacion' },
]

export const featuredArtworks: Artwork[] = [
  {
    title: 'La Gloria Celestial',
    artist: 'Maestro anónimo barroco',
    year: '1680-1690',
    period: 'Barroco',
    medium: 'Fresco',
    variant: 'artwork-media-night',
  },
  {
    title: 'Madonna con el Niño',
    artist: 'Escuela renacentista',
    year: '1520',
    period: 'Renacentista',
    medium: 'Óleo sobre tabla',
    variant: '',
  },
  {
    title: 'Cartografía de la memoria',
    artist: 'Colectivo contemporáneo',
    year: '2026',
    period: 'Contemporáneo',
    medium: 'Instalación mixta',
    variant: 'artwork-media-alt',
  },
]

export const exhibitionHighlights = [
  {
    status: 'Actual',
    title: 'Luz y devoción',
    description:
      'Una lectura curatorial sobre la relación entre iconografía, espacio y luz en la pintura sacra.',
  },
  {
    status: 'Próxima',
    title: 'Talleres de mediación',
    description:
      'Actividades familiares y educativas enfocadas en crear vínculos entre obra, técnica y contexto.',
  },
  {
    status: 'Pasada',
    title: 'Patrimonio vivo',
    description:
      'Selección retrospectiva de piezas restauradas y material documental sobre procesos de conservación.',
  },
]