import { Fragment, useEffect, useRef, useState } from 'react'

const CORREO_MUSEO = 'museo@arquidiocesisdepopayan.com'
const CORREO_MUSEO_MAILTO = `mailto:${CORREO_MUSEO}`

const FILE_TARIFAS_VIDEO = '/api/solicitud/files/tarifas-video.pdf'
const FILE_TARIFAS_FOTOS = '/api/solicitud/files/tarifas-fotografias.pdf'
const FILE_FORMATO = '/api/solicitud/files/formato-solicitud.docx'

type TarifaRow = string[]

const COLLUMNAS_VIDEO = [
  'Tipo de Solicitante',
  'Tipo de Grabación',
  'Tiempo de Grabación',
  'Costo por hora (COP)',
  'Costo por medio día (4 horas) (COP)',
  'Costo por Día Completo (8 horas) (COP)',
]

const TARIFAS_VIDEO: TarifaRow[] = [
  ['Canales Nacionales', 'Estándar', '1-4 horas', '$300.000', '$1.000.000', '$1.800.000'],
  ['Canales Nacionales', 'Estándar', '4-8 horas', '$250.000', '$1.000.000', '$1.800.000'],
  ['Canales Nacionales', 'Alta tecnología', '1-4 horas', '$400.000', '$1.300.000', '$2.300.000'],
  ['Canales Nacionales', 'Alta tecnología', '4-8 horas', '$350.000', '$1.300.000', '$2.300.000'],
  ['Documentales', 'Estándar', '1-3 horas', '$300.000', '$1.000.000', '$1.800.000'],
  ['Documentales', 'Estándar', '4-8 horas', '$250.000', '$1.000.000', '$1.800.000'],
  ['Documentales', 'Alta tecnología', '1-4 horas', '$400.000', '$1.300.000', '$2.300.000'],
  ['Documentales', 'Alta tecnología', '4-8 horas', '$350.000', '$1.300.000', '$2.300.000'],
  ['Medios de comunicación locales', 'Estándar', '1-4 horas', '$200.000', '$700.000', '$1.300.000'],
  ['Medios de comunicación locales', 'Estándar', '4-8 horas', '$175.000', '$700.000', '$1.300.000'],
  ['Medios de comunicación locales', 'Alta tecnología', '1-4 horas', '$300.000', '$1.000.000', '$1.800.000'],
  ['Medios de comunicación locales', 'Alta tecnología', '4-8 horas', '$250.000', '$1.000.000', '$1.800.000'],
  ['Entidades sin ánimo de lucro (oficiales, educativas, museos, colegios y universidades)', 'Estándar', '1-4 horas', '$150.000', '$500.000', '$900.000'],
  ['Entidades sin ánimo de lucro (oficiales, educativas, museos, colegios y universidades)', 'Estándar', '4-8 horas', '$125.000', '$500.000', '$900.000'],
  ['Entidades sin ánimo de lucro (oficiales, educativas, museos, colegios y universidades)', 'Alta tecnología', '1-4 horas', '$250.000', '$800.000', '$1.500.000'],
  ['Entidades sin ánimo de lucro (oficiales, educativas, museos, colegios y universidades)', 'Alta tecnología', '4-8 horas', '$200.000', '$800.000', '$1.500.000'],
  ['Productoras Independientes', 'Estándar', '1-4 horas', '$250.000', '$850.000', '$1.600.000'],
  ['Productoras Independientes', 'Estándar', '4-8 horas', '$200.000', '$850.000', '$1.600.000'],
  ['Productoras Independientes', 'Alta tecnología', '1-4 horas', '$350.000', '$1.100.000', '$2.000.000'],
  ['Productoras Independientes', 'Alta tecnología', '4-8 horas', '$300.000', '$1.100.000', '$2.000.000'],
  ['Particulares (Eventos Privados)', 'Estándar', '1-4 horas', '$200.000', '$700.000', '$1.300.000'],
  ['Particulares (Eventos Privados)', 'Estándar', '4-8 horas', '$175.000', '$700.000', '$1.300.000'],
  ['Particulares (Eventos Privados)', 'Alta tecnología', '1-4 horas', '$300.000', '$1.000.000', '$1.800.000'],
  ['Particulares (Eventos Privados)', 'Alta tecnología', '4-8 horas', '$250.000', '$1.000.000', '$1.800.000'],
]

const COLUMNAS_FOTOS = [
  'Solicitante',
  'Cantidad de fotos',
  'Precio por Foto (COP)',
  'Derechos de Reproducción por Foto (COP)',
]

const TARIFAS_FOTOS: TarifaRow[] = [
  ['Editoriales Nacionales e Instituciones con Ánimo de Lucro', '1-10', '$50.000', '$100.000'],
  ['Editoriales Nacionales e Instituciones con Ánimo de Lucro', '11-50', '$45.000', '$100.000'],
  ['Editoriales Nacionales e Instituciones con Ánimo de Lucro', 'Más de 50', '$40.000', '$100.000'],
  ['Medios de comunicación', '1-10', '$40.000', '$80.000'],
  ['Medios de comunicación', '11-50', '$35.000', '$80.000'],
  ['Medios de comunicación', 'Más de 50', '$30.000', '$80.000'],
  ['Entidades sin ánimo de lucro (oficiales, educativas, museos, colegios y universidades, Investigadores)', '1-10', '$30.000', '$50.000'],
  ['Entidades sin ánimo de lucro (oficiales, educativas, museos, colegios y universidades, Investigadores)', '11-50', '$25.000', '$50.000'],
  ['Entidades sin ánimo de lucro (oficiales, educativas, museos, colegios y universidades, Investigadores)', 'Más de 50', '$20.000', '$50.000'],
]

type CondicionItem = {
  encabezado?: string
  texto?: string
  puntos?: string[]
  puntosFinales?: string[]
}

const CONDICIONES_VIDEO: CondicionItem[] = [
  {
    encabezado: 'Propósito de la Grabación:',
    puntos: [
      'Las grabaciones en las instalaciones del museo deben tener fines educativos, culturales, investigativos o promocionales relacionados con el patrimonio artístico y cultural del museo.',
    ],
  },
  {
    encabezado: 'Solicitud y Autorización:',
    puntos: [
      'Las solicitudes de grabación deben presentarse con al menos 15 días de anticipación a la fecha prevista.',
      'La autorización está sujeta a la disponibilidad del espacio y no debe interferir con las actividades diarias del museo.',
      'La solicitud debe incluir un plan detallado de la grabación, indicando fechas, horarios, áreas específicas del museo y el equipo que se utilizará.',
    ],
  },
  {
    encabezado: 'Costos y pagos:',
    puntos: [
      'Los costos se establecerán según la tabla de tarifas aplicable. Los precios varían según el tipo de solicitante y la duración de la grabación.',
      'El pago debe realizarse por adelantado una vez que la solicitud haya sido aprobada.',
      'En caso de cancelación por parte del solicitante, no se reembolsará el costo abonado.',
    ],
  },
  {
    encabezado: 'Equipos y Tecnología:',
    puntos: [
      'Las grabaciones estándar tienen tarifas base. Para producciones que requieran equipos especiales o tecnología avanzada, se aplicarán tarifas incrementales.',
      'Se deben especificar todos los equipos que se utilizarán y cualquier equipo adicional debe ser autorizado por el museo.',
    ],
  },
  {
    encabezado: 'Responsabilidad y daños:',
    puntos: [
      'Los solicitantes son responsables de cualquier daño a las instalaciones o a las obras de arte que pueda ocurrir durante la grabación.',
      'Se debe presentar un certificado de seguro de responsabilidad civil que cubra cualquier posible daño o accidente.',
    ],
  },
  {
    encabezado: 'Uso y Derechos de Reproducción:',
    puntos: [
      'Las grabaciones realizadas en el museo no podrán ser utilizadas con fines comerciales sin la autorización expresa del museo.',
      'Se deben citar adecuadamente los créditos del Museo Arquidiocesano de Arte Religioso de Popayán en todas las publicaciones o producciones que incluyan las grabaciones.',
    ],
  },
  {
    encabezado: 'Condiciones específicas para documentales:',
    puntos: [
      'Los documentales deben tener un propósito educativo, cultural o investigativo claramente definido.',
      'Se deben presentar copias finales del material grabado al museo, y se deberá otorgar permiso al museo para usar dicho material con fines promocionales y educativos.',
    ],
  },
  {
    encabezado: 'Supervisión y Normativas:',
    puntos: [
      'Un representante del museo debe estar presente durante la grabación para asegurar que se cumplan todas las normativas y que las actividades se desarrollen según lo autorizado.',
      'No se permitirá el acceso a áreas restringidas ni la manipulación de obras de arte sin la supervisión adecuada.',
    ],
  },
  {
    encabezado: 'Cancelaciones y Modificaciones:',
    puntos: [
      'Cualquier cambio en el plan de grabación deberá ser notificado al museo con al menos 7 días de anticipación.',
      'El museo se reserva el derecho de cancelar o reprogramar la grabación en caso de eventos imprevistos o de fuerza mayor.',
    ],
  },
  {
    encabezado: 'Confidencialidad y Derechos de Autor:',
    puntos: [
      'Todo el material grabado dentro del museo es confidencial y solo debe ser utilizado para los fines aprobados.',
      'El solicitante debe respetar los derechos de autor y de propiedad intelectual de las obras y materiales del museo.',
    ],
  },
]

const CONDICIONES_FOTOS: CondicionItem[] = [
  {
    texto:
      'El Museo Arquidiocesano de Arte Religioso de Popayán facilita la obtención de copias fotográficas de sus fondos con fines de investigación, enseñanza o difusión cultural y científica. Queda totalmente prohibida la realización de duplicados del material entregado o la cesión del mismo a terceros sin el conocimiento y la autorización previa del Museo.',
  },
  {
    encabezado:
      'En el ejercicio de los derechos que le confiere la Ley 23 de 1982 y los convenios internacionales sobre derecho de autor ratificados por Colombia, el Museo Arquidiocesano otorga autorización de uso de las reproducciones de sus fondos en las siguientes condiciones:',
    puntos: [
      'La autorización de reproducción no confiere ningún derecho de propiedad intelectual o industrial.',
      'La empresa editora o particular se compromete a citar en lugar destacado la condición del Museo Arquidiocesano de depositario del original reproducido, haciendo constar que los derechos de reproducción le pertenecen con el símbolo de copyright (©) al Museo Arquidiocesano de Arte Religioso de Popayán (Foto: © Museo Arquidiocesano de Arte Religioso de Popayán / Nombre del fotógrafo).',
      'La autorización de reproducción se concede para un solo uso y exclusivamente para la finalidad indicada en la solicitud. Cualquier reedición de la obra deberá contar con un nuevo permiso de reproducción.',
      'La autorización de reproducción se concede para un solo idioma, que ha de ser debidamente especificado en la solicitud. La edición en idioma o idiomas distintos al originalmente señalado deberá ser nuevamente solicitada y autorizada.',
      'De toda publicación en la que aparezcan reproducciones de fondos o bienes del Museo Arquidiocesano, el solicitante se compromete a entregar mínimo un (1) ejemplar que tendrá como destino la biblioteca de esta institución si el Museo lo solicita.',
    ],
  },
  {
    encabezado: 'En todos los casos:',
    puntos: [
      'Las solicitudes para obtener copias de fondos del Museo Arquidiocesano o de autorización de reproducción sobre las mismas, se enviarán por correo electrónico a la dirección del museo: museo@arquidiocesisdepopayan.org',
      'Si transcurriera un mes sin que el solicitante realice las gestiones necesarias para proseguir la tramitación de su solicitud, la misma se considerará caducada y se procederá a su archivo.',
      'El costo de cada copia del material fotográfico solicitado y de cada autorización de reproducción, según el caso, se establecerá de acuerdo al tipo de solicitud.',
      'El pago del material fotográfico solicitado deberá hacerse por adelantado. El solicitante deberá aportar copia del justificante bancario de dicha transferencia. Asimismo, deberá firmar la autorización de uso de las imágenes, paso previo indispensable para la entrega del material solicitado.',
      'Queda expresamente prohibido que el solicitante utilice el nombre o el logotipo del Museo Arquidiocesano para fines publicitarios o comerciales a menos que se hayan solicitado y autorizado. De lo contrario, será necesario llenar un nuevo formulario.',
      'El Museo Arquidiocesano no se responsabiliza del uso que pueda hacerse de las reproducciones en contra de la Ley de Propiedad Intelectual o cualquier otra disposición legal y se reserva el derecho a emprender las acciones legales que considere oportunas contra quienes incumplan las condiciones expresadas en este formato de solicitud.',
      'En los casos que el museo no cuente con los registros fotográficos de las obras solicitadas, se ofrece al solicitante la posibilidad de contratar a un fotógrafo profesional que registre las obras. Estas fotografías deben cumplir con los siguientes requerimientos técnicos y, a la vez, se deben ceder los derechos patrimoniales de estas al Museo. El solicitante deberá asumir el costo de estas y el Museo autorizará por una única vez la reproducción de las obras:',
    ],
    puntosFinales: [
      'Tamaño de imagen mínimo 4500px por el lado más largo.',
      'Iluminación profesional (luces de flash).',
      'Entregar las imágenes en formato TIFF a 300 PPI.',
      'Las fotografías deben incluir guías de color.',
      'Se deben incluir en los metadatos de las imágenes los créditos del autor de la fotografía.',
    ],
  },
]

type SolicitudModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function SolicitudImagenesModal({ isOpen, onClose }: SolicitudModalProps) {
  const [step, setStep] = useState<'terms' | 'form'>('terms')
  const [wasOpen, setWasOpen] = useState(isOpen)

  if (wasOpen !== isOpen) {
    setWasOpen(isOpen)
    if (isOpen) {
      setStep('terms')
    }
  }

  if (!isOpen) {
    return null
  }

  if (step === 'terms') {
    return <TermsModal onClose={onClose} onContinue={() => setStep('form')} />
  }

  return <FormModal onClose={onClose} onBack={() => setStep('terms')} />
}

function useControlledDialog(isOpen: boolean, onClose: () => void) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) {
      return
    }

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal()
        const focusTarget = dialog.querySelector<HTMLElement>('[data-solicitud-focus]')
        focusTarget?.focus({ preventScroll: true })
      }

      const previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.overflow = previousOverflow
        if (dialog.open) {
          dialog.close()
        }
      }
    }
  }, [isOpen])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) {
      return
    }

    const handleCancel = (event: Event) => {
      event.preventDefault()
      onClose()
    }

    dialog.addEventListener('cancel', handleCancel)
    return () => {
      dialog.removeEventListener('cancel', handleCancel)
    }
  }, [onClose])

  return dialogRef
}

function DialogCloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="solicitud-close" aria-label="Cerrar ventana" onClick={onClick}>
      <svg viewBox="0 0 24 24" role="presentation" focusable="false" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  )
}

function StepBadge({
  value,
  label,
  state,
}: {
  value: string
  label: string
  state: 'active' | 'done' | 'inactive'
}) {
  return (
    <li className={state === 'active' ? 'is-active' : state === 'done' ? 'is-done' : undefined}>
      <span className="solicitud-stepnum">{state === 'done' ? '✓' : value}</span>
      {label}
    </li>
  )
}

type TermsModalProps = {
  onClose: () => void
  onContinue: () => void
}

function TermsModal({ onClose, onContinue }: TermsModalProps) {
  const [accepted, setAccepted] = useState(false)
  const [docIndex, setDocIndex] = useState(0)
  const dialogRef = useControlledDialog(true, onClose)

  return (
    <dialog
      ref={dialogRef}
      className="solicitud-dialog"
      aria-labelledby="solicitud-terms-title"
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          onClose()
        }
      }}
    >
      <div className="solicitud-panel">
        <header className="solicitud-header">
          <p className="solicitud-kicker">Solicitud de imágenes de la colección</p>
          <h2 className="solicitud-title" id="solicitud-terms-title" data-solicitud-focus tabIndex={-1}>
            Tarifas y condiciones de uso
          </h2>
          <ol className="solicitud-stepper" aria-label="Progreso del proceso de solicitud">
            <StepBadge value="1" label="Tarifas y condiciones" state="active" />
            <StepBadge value="2" label="Formato de solicitud" state="inactive" />
          </ol>
          <DialogCloseButton onClick={onClose} />
        </header>

        <div className="solicitud-body">
          <div className="solicitud-tabs" role="tablist" aria-label="Documentos de tarifas y condiciones">
            <button
              type="button"
              role="tab"
              aria-selected={docIndex === 0}
              className={docIndex === 0 ? 'solicitud-tab is-active' : 'solicitud-tab'}
              onClick={() => setDocIndex(0)}
            >
              Tarifas y condiciones de video
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={docIndex === 1}
              className={docIndex === 1 ? 'solicitud-tab is-active' : 'solicitud-tab'}
              onClick={() => setDocIndex(1)}
            >
              Tarifas y condiciones de fotografías
            </button>
          </div>

          <div className="solicitud-scroll" role="tabpanel" id="solicitud-docs-panel">
            {docIndex === 0 ? <VideoTarifasDoc /> : <FotografiasTarifasDoc />}
          </div>
        </div>

        <footer className="solicitud-footer">
          <label className="solicitud-check">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(event) => setAccepted(event.target.checked)}
            />
            <span>
              He leído y acepto las tarifas y condiciones para el uso de imágenes del Museo Arquidiocesano.
            </span>
          </label>
          <div className="solicitud-actions">
            <button type="button" className="button button--secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className="button button--accent" disabled={!accepted} onClick={onContinue}>
              Continuar
            </button>
          </div>
        </footer>
      </div>
    </dialog>
  )
}

type FormModalProps = {
  onClose: () => void
  onBack: () => void
}

function FormModal({ onClose, onBack }: FormModalProps) {
  const dialogRef = useControlledDialog(true, onClose)

  return (
    <dialog
      ref={dialogRef}
      className="solicitud-dialog solicitud-dialog--form"
      aria-labelledby="solicitud-form-title"
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          onClose()
        }
      }}
    >
      <div className="solicitud-panel">
        <header className="solicitud-header">
          <p className="solicitud-kicker">Solicitud de imágenes de la colección</p>
          <h2 className="solicitud-title" id="solicitud-form-title" data-solicitud-focus tabIndex={-1}>
            Formato de solicitud
          </h2>
          <ol className="solicitud-stepper" aria-label="Progreso del proceso de solicitud">
            <StepBadge value="1" label="Tarifas y condiciones" state="done" />
            <StepBadge value="2" label="Formato de solicitud" state="active" />
          </ol>
          <DialogCloseButton onClick={onClose} />
        </header>

        <div className="solicitud-body">
          <div className="solicitud-scroll">
            <div className="solicitud-aviso">
              <span className="solicitud-aviso-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M12 3l10 17H2L12 3Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M12 9v5M12 16.6v.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
              <p>
                Para completar tu solicitud debes <strong>descargar el formato oficial de solicitud</strong>,
                diligenciarlo completamente, firmarlo y enviarlo al Museo.
              </p>
            </div>

            <ol className="solicitud-instrucciones">
              <li>
                Descarga el <strong>formato de solicitud</strong> con el botón «Descargar formato de solicitud».
              </li>
              <li>Diligencia completamente la información solicitada.</li>
              <li>Firma el formulario.</li>
              <li>
                Envía el formulario diligenciado y firmado al correo{' '}
                <a className="solicitud-email" href={CORREO_MUSEO_MAILTO}>
                  {CORREO_MUSEO}
                </a>
                .
              </li>
            </ol>

            <div className="solicitud-descarga">
              <span className="solicitud-descarga-nombre">
                Formato de Solicitud de Uso de Fotografía (documento .docx)
              </span>
              <a className="button button--accent solicitud-boton-descarga" href={FILE_FORMATO} download>
                <span className="button-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                Descargar formato de solicitud
              </a>
            </div>

            <p className="solicitud-correo-note">
              También puedes escribirnos directamente a{' '}
              <a className="solicitud-email" href={CORREO_MUSEO_MAILTO}>
                {CORREO_MUSEO}
              </a>
              .
            </p>
          </div>
        </div>

        <footer className="solicitud-footer">
          <div className="solicitud-actions">
            <button type="button" className="button button--secondary" onClick={onBack}>
              Volver a tarifas y condiciones
            </button>
            <button type="button" className="button button--secondary" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </footer>
      </div>
    </dialog>
  )
}

function groupRows(rows: TarifaRow[]) {
  const groups: Array<{ label: string; rows: TarifaRow[] }> = []
  for (const row of rows) {
    const lastGroup = groups[groups.length - 1]
    if (lastGroup && lastGroup.label === row[0]) {
      lastGroup.rows.push(row)
    } else {
      groups.push({ label: row[0], rows: [row] })
    }
  }
  return groups
}

type TarifaTableProps = {
  columns: string[]
  rows: TarifaRow[]
  nota?: string
}

function TarifaTable({ columns, rows, nota }: TarifaTableProps) {
  const groups = groupRows(rows)

  return (
    <>
      <div className="solicitud-table-wrap">
        <table className="solicitud-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column} scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <Fragment key={group.label}>
                {group.rows.map((row, index) => (
                  <tr key={index}>
                    {index === 0 && <th scope="row" rowSpan={group.rows.length}>{group.label}</th>}
                    {row.slice(1, columns.length).map((cell, cellIndex) => (
                      <td key={cellIndex} className={cell.startsWith('$') ? 'solicitud-num' : undefined}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {nota && <p className="solicitud-nota">{nota}</p>}
    </>
  )
}

function CondicionesList({ items }: { items: CondicionItem[] }) {
  return (
    <ol className="solicitud-lista-condiciones">
      {items.map((item, index) => (
        <li key={index}>
          {item.encabezado && <p className="solicitud-cond-encabezado">{item.encabezado}</p>}
          {item.texto && <p>{item.texto}</p>}
          {item.puntos && (
            <ul className="solicitud-lista-puntos">
              {item.puntos.map((punto, puntoIndex) => (
                <li key={puntoIndex}>{punto}</li>
              ))}
            </ul>
          )}
          {item.puntosFinales && (
            <ul className="solicitud-lista-puntos solicitud-lista-puntos--finales">
              {item.puntosFinales.map((punto, puntoIndex) => (
                <li key={puntoIndex}>{punto}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  )
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M14 5h5v5M19 5l-8 8M14 5l5 5M9 7H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4h-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function VideoTarifasDoc() {
  return (
    <article className="solicitud-doc">
      <h3 className="solicitud-doc-titulo">
        Tarifas y Condiciones de Video dentro de las instalaciones del Museo Arquidiocesano de Arte Religioso de Popayán
      </h3>
      <a className="solicitud-doc-original" href={FILE_TARIFAS_VIDEO} target="_blank" rel="noopener noreferrer">
        <ExternalLinkIcon />
        Ver documento original (PDF)
      </a>

      <p>
        Para solicitar la realización de videos dentro de las instalaciones del Museo Arquidiocesano de Arte
        Religioso de Popayán, por favor sigue los siguientes pasos:
      </p>
      <ol className="solicitud-lista-pasos">
        <li>
          <strong>Formalización de la Solicitud:</strong> Envíe un correo electrónico detallando la intencionalidad
          de la grabación.
        </li>
        <li>
          <strong>Propósito de uso:</strong> Debes indicar claramente el propósito para el cual utilizarás los videos
          producto de la grabación.
        </li>
        <li>
          <strong>Documentación requerida:</strong> Adjunta una carta oficial de la institución que solicita a tu
          solicitud y el uso que tendrán los videos producto de la grabación.
        </li>
        <li>
          <strong>Condiciones de uso:</strong> Una vez recibida la documentación, te enviaremos un formulario con las
          condiciones de uso de los espacios. Deberás firmarlo y devolverlo.
        </li>
      </ol>

      <p>
        El aporte al museo por concepto de uso de espacios para grabación, estructurado como una donación, es el
        siguiente:
      </p>
      <TarifaTable columns={COLLUMNAS_VIDEO} rows={TARIFAS_VIDEO} nota="*No incluye la bóveda" />

      <h4 className="solicitud-doc-subtitulo">
        Condiciones para la Autorización de Grabación en el Museo Arquidiocesano de Arte Religioso de Popayán
      </h4>
      <CondicionesList items={CONDICIONES_VIDEO} />
    </article>
  )
}

function FotografiasTarifasDoc() {
  return (
    <article className="solicitud-doc">
      <h3 className="solicitud-doc-titulo">Tarifas y Condiciones Archivo Fotográfico del Museo Arquidiocesano</h3>
      <a className="solicitud-doc-original" href={FILE_TARIFAS_FOTOS} target="_blank" rel="noopener noreferrer">
        <ExternalLinkIcon />
        Ver documento original (PDF)
      </a>

      <p>
        Para solicitar imágenes de obras de la colección del Museo Arquidiocesano de Arte Religioso de Popayán le
        solicitamos que siga los siguientes pasos:
      </p>
      <ol className="solicitud-lista-pasos">
        <li>
          <strong>Formalización de la Solicitud:</strong> Enviar correo electrónico detallando las imágenes
          específicas que se requieren, incluyendo el título de la obra y el autor si es posible.
        </li>
        <li>
          <strong>Propósito de Uso:</strong> Indique de manera clara el propósito para el cual serán utilizadas estas
          imágenes.
        </li>
        <li>
          <strong>Documentación Requerida:</strong> Adjunte una carta oficial de su universidad o institución de
          investigación que respalde su solicitud y el uso académico de las imágenes.
        </li>
        <li>
          <strong>Condiciones de Uso:</strong> Una vez recibida la documentación, Se envía un formulario con las
          condiciones de uso de las imágenes, que se deberá firmar y devolver.
        </li>
      </ol>

      <p>El aporte al museo por concepto de archivo fotográfico, estructurado como una donación, son los siguientes:</p>
      <TarifaTable columns={COLUMNAS_FOTOS} rows={TARIFAS_FOTOS} nota="*No incluye fotografías de la bóveda" />

      <CondicionesList items={CONDICIONES_FOTOS} />

      <div className="solicitud-firma">
        <p>
          <strong>Aprobó:</strong> Pbro. Jairo Gembuel Victoria · Vicario de Economía · Arquidiócesis de Popayán
        </p>
        <p>
          <strong>Proyectó:</strong> Mg. Yenifer Andrea Cataño Vargas · Directora · Museo Arquidiocesano de Arte
          Religioso
        </p>
      </div>
    </article>
  )
}