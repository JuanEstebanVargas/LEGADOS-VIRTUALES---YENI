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

export type LegalMilestone = {
  title: string
  description: string
}

export type CustodianEntry = {
  period: string
  name: string
  role: string
  description: string
  tag: string
}

export type HighlightCard = {
  icon?: string
  title: string
  description: string
}

export type VisitInfoRow = {
  label: string
  value: string
}

export type VisitInfoSection = {
  title: string
  preview: string
  rows: VisitInfoRow[]
  mapUrl?: string
  mapEmbedUrl?: string
}

export type AccessibilityPoint = {
  icon: string
  title: string
  description: string
}

export type ChannelEntry = {
  title: string
  detail: string
}

export type ProgramAxis = {
  id: string
  title: string
  items: string[]
}

export const siteHighlights = [
  'Colecciones destacadas',
  'Programación educativa',
  'Visitas guiadas',
  'WhatsApp y correo institucional',
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
    description: 'Redes, WhatsApp y correo institucional.',
    href: '#contacto',
  },
]

export const storyBlocks: StoryBlock[] = [
  {
    title: 'Misión',
    description:
      'Preservar, conservar, restaurar, difundir y exhibir las obras de Arte Religioso procedentes de ambientes eclesiásticos de esta Arquidiócesis, permitiendo que el Patrimonio histórico, artístico y cultural del suroccidente colombiano aquí conservado sea instrumento de formación para el fomento de la identidad cultural y la historia regional.',
  },
  {
    title: 'Visión',
    description:
      'El Museo Arquidiocesano de Arte Religioso de Popayán será una institución líder en la promoción, defensa y conservación del patrimonio artístico de la región; así como en el fomento de la cultura a través de la formación de valores estéticos, críticos y de apropiación del arte colonial latinoamericano, en beneficio de las presentes y futuras generaciones.',
  },
]

export const institutionalValues: ValueBlock[] = [
  {
    number: '01',
    title: 'Preservación',
    description: 'Cuidamos el patrimonio como documento vivo de nuestra historia colectiva.',
  },
  {
    number: '02',
    title: 'Identidad',
    description: 'Reconocemos las múltiples voces que dieron forma a la colección y al inmueble.',
  },
  {
    number: '03',
    title: 'Apertura',
    description: 'El patrimonio conservado aquí pertenece a toda la ciudad y a sus visitantes.',
  },
  {
    number: '04',
    title: 'Rigor',
    description: 'Aplicamos criterios de conservación, investigación y mediación con consistencia.',
  },
  {
    number: '05',
    title: 'Educación',
    description: 'Formamos sensibilidades y puentes entre la memoria material y la experiencia actual.',
  },
  {
    number: '06',
    title: 'Memoria y diálogo',
    description: 'Entendemos el museo como una conversación activa entre épocas y comunidades.',
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
    role: 'Primera directora · Fundadora',
    name: 'Silvia Ayerbe de Caicedo',
    period: '1972 – 1989',
    description:
      'Asumió la dirección del Museo desde su nacimiento institucional en 1972, siendo parte del grupo fundacional que transformó la visión del Arzobispo Arce Vivas en una realidad museística. Acompañó la adquisición de la sede, la restauración del inmueble entre 1976 y 1979, y la inauguración oficial en septiembre de 1979. Vivió también el momento más crítico de la institución: el terremoto del 31 de marzo de 1983, que dejó la sede gravemente averiada. Bajo su dirección, las obras fueron rescatadas y depositadas en el Banco de la República para garantizar su salvaguarda.',
    tag: 'Directora fundadora · 17 años al frente',
  },
  {
    role: 'Segunda directora',
    name: 'María Eugenia Valencia de Redondo',
    period: '1989 – 2003',
    description:
      'Ingresó al Museo como secretaria de Silvia Ayerbe de Caicedo y asumió la dirección en 1989, en pleno proceso de recuperación postsísmica. Lideró la etapa más exigente de la institución: la restauración de la colección, el retorno de las obras desde el Banco de la República y la reapertura del Museo al público. Bajo su conducción, el Museo volvió a ser un espacio vivo para la comunidad payanesa, consolidando su papel cultural y patrimonial en el suroccidente colombiano. Su labor es el puente entre el Museo que fue y el Museo que es hoy.',
    tag: 'Etapa de renacimiento · 14 años al frente',
  },
  {
    role: 'Tercera directora',
    name: 'Carmen Elisa Hernández',
    period: '2004 – 2022',
    description:
      'Ingresó al Museo en 1992 como secretaria, cargo desde el cual conoció a fondo cada aspecto de la institución. Nombrada Subdirectora por el Arzobispo Iván Antonio Marín en 2002, y Directora en 2004. Condujo el Museo durante 18 años, el período más extenso de dirección en su historia. Su gestión abarcó la declaratoria como Bien de Interés Cultural de la Nación (Resolución 0395 de 2006), la actualización de los estatutos institucionales (Decreto 1.306 de 2017) y el fortalecimiento de la colección. Ejerció el cargo hasta marzo de 2022.',
    tag: 'Etapa de consolidación · 18 años al frente',
  },
  {
    role: 'Directora actual',
    name: 'Yenifer Andrea Castaño Vargas',
    period: '2022 — Presente',
    description:
      'Licenciada en Educación Artística y Cultural y magíster en Educación de la Universidad del Cauca. Asumió la dirección en marzo de 2022, inaugurando una nueva etapa marcada por la educación patrimonial crítica, la apertura comunitaria y la proyección digital del Museo. Impulsora del Plan Educativo institucional, el Laboratorio de Guías, el Seminario de Arte y Cultura Colonial y el proyecto VOCES DEL PATRIMONIO. Autora del libro Museos como espacios de transformación cultural: estrategias para la Educación Patrimonial (2025), publicación que recoge su investigación de maestría y posiciona al Museo como referente educativo nacional.',
    tag: 'Educación patrimonial · Proyección digital',
  },
]

export const collectionTechniques: HighlightCard[] = [
  {
    icon: '🎨',
    title: 'Pintura al óleo',
    description: 'Sobre tela, madera y otros soportes',
  },
  {
    icon: '🪵',
    title: 'Talla en madera',
    description: 'Policromada y dorada',
  },
  {
    icon: '⚱️',
    title: 'Orfebrería y platería',
    description: 'Piezas litúrgicas y devocionales · Exposición especial Semana Santa',
  },
  {
    icon: '🧵',
    title: 'Textiles bordados',
    description: 'Ornamentos sagrados y vestiduras litúrgicas',
  },
]

export const visitInfoSections: VisitInfoSection[] = [
  {
    title: 'Horarios de atención',
    preview: 'Lunes a viernes en dos jornadas, sábado continuo y horario especial en Semana Santa.',
    rows: [
      {
        label: 'Lunes – Viernes',
        value: '8:00 a.m. – 12:30 p.m.\n2:00 p.m. – 5:00 p.m.',
      },
      {
        label: 'Sábados',
        value: '9:00 a.m. – 2:00 p.m.',
      },
      {
        label: 'Domingos y festivos',
        value: 'Cerrado',
      },
      {
        label: 'Semana Santa',
        value: 'Dom. de Ramos – Dom. de Resurrección\n9:00 a.m. – 5:00 p.m. (jornada continua)',
      },
    ],
  },
  {
    title: 'Tarifas de ingreso',
    preview: 'Tarifa general, modalidades para grupos y jornadas de entrada gratuita.',
    rows: [
      {
        label: 'Público general',
        value: '$8.000 COP',
      },
      {
        label: 'Niños < 8 años',
        value: 'Gratuito acompañados de padres\n(En grupos escolares aplica tarifa)',
      },
      {
        label: 'Grupos escolares · Guiado',
        value: '$8.000 COP por estudiante',
      },
      {
        label: 'Grupos escolares · Taller',
        value: '$15.000 COP por estudiante\n(incluye guía + actividad + materiales)',
      },
      {
        label: 'Días gratuitos',
        value: 'Día Internacional de los Museos\n+ eventos especiales del Museo',
      },
    ],
  },
  {
    title: 'Cómo llegar',
    preview: 'Ubicación en el Centro Histórico, referencias cercanas y opciones de transporte.',
    mapUrl: 'https://maps.app.goo.gl/ZgefXEr5kK6JcuGE8',
    mapEmbedUrl:
      'https://www.google.com/maps?q=2.4418349,-76.6043796&z=17&output=embed',
    rows: [
      {
        label: 'Dirección',
        value: 'Calle 4A No. 4-56, Centro Histórico, Popayán, Cauca – Colombia',
      },
      {
        label: 'Referencias',
        value: 'Frente al Templo de Santo Domingo · A una cuadra del Parque Caldas',
      },
      {
        label: 'Transporte',
        value: 'Taxi · Uber · Transporte público urbano',
      },
      {
        label: 'Estacionamiento',
        value: 'Sin parqueadero propio · Zona disponible en el centro histórico',
      },
    ],
  },
]

export const visitRegulationRows: VisitInfoRow[] = [
  {
    label: 'Fotografía',
    value: 'Consultar autorización en taquilla',
  },
  {
    label: 'Alimentos y bebidas',
    value: 'No permitidos en las salas',
  },
  {
    label: 'Grupos',
    value: 'Reserva previa recomendada · Máx. 20 personas por sala',
  },
  {
    label: 'Mascotas',
    value: 'No permitidas',
  },
]

export const visitAccessibilityIntro =
  'El Museo trabaja progresivamente en el fortalecimiento de estrategias de accesibilidad e inclusión. Su condición de Bien de Interés Cultural de la Nación implica restricciones para modificar la infraestructura, pero el equipo organiza con antelación las herramientas necesarias para garantizar experiencias positivas a todas las personas visitantes.'

export const visitAccessibilityPoints: AccessibilityPoint[] = [
  {
    icon: '♿',
    title: 'Movilidad reducida',
    description: 'Sin rampas en algunos sectores del recorrido · Consultar previamente',
  },
  {
    icon: '👁',
    title: 'Discapacidad visual',
    description: 'Señalética braille disponible para visitas guiadas',
  },
  {
    icon: '🦻',
    title: 'Discapacidad auditiva',
    description: 'Sin guías en lengua de señas actualmente · En proceso de implementación',
  },
  {
    icon: '🧒',
    title: 'Familias y colegios',
    description: 'Programas educativos y recorridos pedagógicos adaptados para niños y jóvenes',
  },
  {
    icon: '🏛',
    title: 'Escaleras',
    description: 'Cuentan con pasamanos · Acceso a segundo piso por escalera',
  },
  {
    icon: '🚪',
    title: 'Puertas y pasillos',
    description: 'Puertas de amplia dimensión y pasillos que permiten circulación sin dificultades',
  },
]

export const visitAccessibilityNote =
  'La información sobre accesibilidad puede variar según actividades o condiciones del edificio patrimonial. Se recomienda consultar con el equipo del Museo antes de la visita.'

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

export const programAxes: ProgramAxis[] = [
  {
    id: 'Eje 01',
    title: 'Formación académica de públicos',
    items: [
      'Seminario de Arte y Cultura Colonial — encuentro académico anual (desde 2022) que congrega historiadores, expertos en arte, artistas-investigadores y profesionales del patrimonio.',
      'Charlas y Talleres — eventos presenciales y virtuales sobre historia del arte, patrimonio colonial, museología y conservación.',
      'Laboratorio de Guías — programa anual de formación de mediadores culturales desde el enfoque del aprendizaje situado.',
    ],
  },
  {
    id: 'Eje 02',
    title: 'Escuela y Museo',
    items: [
      'EducArte en el Museo (niños, jóvenes y adulto mayor).',
      'Descubriendo Tesoros (preescolar).',
      'Pre-visitas para docentes.',
      'Visitas guiadas para grupos.',
      'Visita-taller.',
      'El Museo como Cátedra.',
      'Voluntariado.',
      'Espacio de prácticas universitarias.',
    ],
  },
  {
    id: 'Eje 03',
    title: 'El Museo como Centro Cultural',
    items: [
      'Noches de Museo.',
      'Visitas guiadas para turistas.',
      'Conciertos (música barroca y contemporánea).',
      'Cine Club.',
      'Inauguraciones de exposiciones temporales.',
      'Otras muestras artísticas.',
    ],
  },
]

export const programConditions: string[] = [
  'Grupos mínimo 5 personas.',
  'Duración aproximada de 90 minutos.',
  'Acompañamiento docente obligatorio para grupos escolares.',
  'Material didáctico disponible para 8–15 años (costo adicional, solicitar con reserva).',
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

export const legalMilestones: LegalMilestone[] = [
  {
    title: 'Decreto 365 · 1972',
    description: 'Crea la Junta Arquidiocesana Pro Museo.',
  },
  {
    title: 'Decreto 386 · 1972',
    description: 'Creación formal del Museo y primer estatuto.',
  },
  {
    title: 'Decreto 026 · 1977',
    description: 'Primer ajuste de estatutos institucionales.',
  },
  {
    title: 'Decreto 2248 · 1996',
    description: 'Declaratoria como Monumento Nacional.',
  },
  {
    title: 'Resolución 0395 · 2006',
    description: 'Declaratoria como Bien de Interés Cultural de la Nación.',
  },
  {
    title: 'Decreto 1.306 · 2017',
    description: 'Estatutos vigentes y estructura actual del Museo.',
  },
]

export const custodianEntries: CustodianEntry[] = [
  {
    period: '1965 – 1976',
    name: 'Mons. Miguel Ángel Arce Vivas',
    role: '32.° Arzobispo · Fundador del Museo',
    description:
      'Nacido en Popayán el 1 de marzo de 1904, hijo predilecto de la ciudad. Arzobispo de Popayán desde 1965 hasta 1976. Visionario fundador del Museo en 1972 mediante los Decretos Arzobispales 365 y 386, impulsado por su profundo amor al patrimonio artístico de la ciudad. También fue promotor del Instituto Don Bosco, del Instituto Catequístico Arquidiocesano y de la Fundación Juan del Valle. Falleció el 27 de mayo de 1987. Sus pertenencias personales reposan en una vitrina del Museo como homenaje a su legado.',
    tag: 'Fundador del Museo · 1972',
  },
  {
    period: '1976 – 1990',
    name: 'Mons. Samuel Silverio Buitrago Trujillo, C.M.',
    role: '33.° Arzobispo',
    description:
      'Nacido el 21 de junio de 1930, miembro de la Congregación de la Misión. Asumió el arzobispado en el momento del mayor desafío del Museo: el terremoto del 31 de marzo de 1983, que sacudió a Popayán en 18 segundos. Su respuesta fue inmediata: junto a las instituciones nacionales, lideró el rescate de las obras del Museo y su depósito en el Banco de la República. En 1988, presidió el Comité Regional de Restauración que permitió la recuperación de la colección y del inmueble. Falleció el 11 de abril de 1990.',
    tag: 'Restauración del Museo · 1988',
  },
  {
    period: '1990 – 1997',
    name: 'Mons. Alberto Giraldo Jaramillo, P.S.S.',
    role: '34.° Arzobispo',
    description:
      'Natural de Manizales, ordenado obispo en 1974 como auxiliar del Arzobispo Arce Vivas. Designado Arzobispo de Popayán en diciembre de 1990, recibió el palio arzobispal de manos del Papa Juan Pablo II en 1991. Durante su gestión se consolidó la reapertura y normalización del Museo en la posguerra del terremoto. Fue presidente de la Conferencia Episcopal de Colombia (1996–2002). Trasladado a Medellín en 1997. Firmó los documentos de personería del Museo en 1992 y 1996.',
    tag: 'Consolidación patrimonial · 1996',
  },
  {
    period: '1997 – 2018',
    name: 'Mons. Iván Antonio Marín López',
    role: '35.° Arzobispo',
    description:
      'Nacido en Jardín, Antioquia, el 13 de mayo de 1938. Licenciado en Teología por la Pontificia Universidad Javeriana. Ordenado sacerdote en 1964. El más longevo de los Arzobispos en el período del Museo: 21 años de gestión pastoral. En 2006 gestionó la Resolución 0395 que declaró el Museo Bien de Interés Cultural de la Nación. En 2017 expidió el Decreto No. 1.306, estatutos vigentes del Museo. Nombró Subdirectora a Carmen Elisa Hernández en 2002 y Directora en 2004. Arzobispo emérito desde 2018.',
    tag: 'Bien de Interés Cultural · 2006',
  },
  {
    period: '2018 – 2020',
    name: 'Mons. Luis José Rueda Aparicio',
    role: '36.° Arzobispo',
    description:
      'Nacido en San Gil, Santander, el 3 de marzo de 1962. Ordenado sacerdote en 1989. Licenciado en Teología Moral por la Academia Alfonsiana de Roma. Arzobispo de Popayán desde julio de 2018 hasta abril de 2020, cuando el Papa Francisco lo designó Arzobispo de Bogotá y Primado de Colombia. Creado Cardenal por el Papa Francisco en septiembre de 2023. Su breve paso por la Arquidiócesis mantuvo el compromiso institucional con el Museo.',
    tag: 'Hoy Cardenal Arzobispo de Bogotá',
  },
  {
    period: '2020 — Presente',
    name: 'Mons. Omar Alberto Sánchez Cubillos, O.P.',
    role: '37.° Arzobispo · Custodio actual',
    description:
      'Nacido en Cogua, Cundinamarca, el 20 de septiembre de 1963. Miembro de la Orden de Predicadores (dominicos). Ordenado sacerdote en 1990. Doctor en Teología Dogmática por la Pontificia Universidad Santo Tomás de Roma. Nombrado Arzobispo de Popayán por el Papa Francisco el 12 de octubre de 2020; tomó posesión canónica el 12 de diciembre de 2020. Como representante legal del Museo y máximo custodio de su colección, acompaña la nueva etapa de apertura cultural, educación patrimonial y proyección digital de la institución.',
    tag: 'Representante legal · Custodio del Museo',
  },
]