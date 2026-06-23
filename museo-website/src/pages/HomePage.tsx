import { Link } from 'react-router-dom'
import { SectionPreviewCard } from '../components/home/SectionPreviewCard'
import { siteHighlights } from '../data/content'
import { usePageTitle } from './usePageTitle'

type HomeSection = {
	title: string
	summary: string
	to: string
	backgroundImage: string
	icon: 'museo' | 'historia' | 'coleccion' | 'visitas' | 'programacion' | 'patrimonio' | 'investigacion' | 'contacto'
}

const homeSections: HomeSection[] = [
	{
		title: 'El Museo',
		summary: 'Conoce el propósito cultural, la sede patrimonial y los valores que orientan la labor institucional del Museo.',
		to: '/museo',
		backgroundImage: '/home-sections/museo.jpg',
		icon: 'museo',
	},
	{
		title: 'Historia',
		summary: 'Recorre los hitos históricos, las directoras, los custodios y el marco legal que dio forma a esta institución.',
		to: '/historia',
		backgroundImage: '/home-sections/historia.jpg',
		icon: 'historia',
	},
	{
		title: 'Colección',
		summary: 'Explora técnicas y obras destacadas del arte religioso colonial entre los siglos XVI y XIX.',
		to: '/coleccion',
		backgroundImage: '/home-sections/coleccion.jpg',
		icon: 'coleccion',
	},
	{
		title: 'Visitas',
		summary: 'Consulta horarios, tarifas, ubicación, reglamento y condiciones de accesibilidad para planear tu recorrido.',
		to: '/visitas',
		backgroundImage: '/home-sections/visitas.jpg',
		icon: 'visitas',
	},
	{
		title: 'Programación',
		summary: 'Descubre ejes formativos, actividades culturales y condiciones para participar en talleres y recorridos.',
		to: '/programacion',
		backgroundImage: '/home-sections/programacion.jpg',
		icon: 'programacion',
	},
	{
		title: 'Patrimonio',
		summary: 'Conoce proyectos de mediación, recursos pedagógicos y creación colectiva vinculados al patrimonio vivo.',
		to: '/patrimonio',
		backgroundImage: '/home-sections/patrimonio.jpg',
		icon: 'patrimonio',
	},
	{
		title: 'Investigación',
		summary: 'Accede a publicaciones institucionales y referencias académicas en actualización sobre colección e inmueble.',
		to: '/investigacion',
		backgroundImage: '/home-sections/investigacion.jpg',
		icon: 'investigacion',
	},
	{
		title: 'Contacto',
		summary: 'Encuentra canales de atención, redes sociales, correo institucional y ubicación para comunicarte con el Museo.',
		to: '/contacto',
		backgroundImage: '/home-sections/contacto.jpg',
		icon: 'contacto',
	},
]

export function HomePage() {
	usePageTitle('Inicio')

	return (
		<main id="main-content">
			<header className="portada" id="inicio">
				<div className="portada-ornamento" />
				<div className="portada-sello" aria-hidden="true">
					<svg viewBox="0 0 48 48" role="presentation" focusable="false">
						<circle cx="24" cy="24" r="18" fill="none" stroke="currentColor" strokeWidth="1.2" />
						<path d="M24 12l4.2 8.5 9.4 1.4-6.8 6.6 1.6 9.3-8.4-4.4-8.4 4.4 1.6-9.3-6.8-6.6 9.4-1.4z" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
					</svg>
				</div>

				<p className="portada-tipo">Arquidiócesis de Popayán</p>
				<h1>Museo Arquidiocesano de</h1>
				<p className="portada-title-emphasis">
					<em>Arte Religioso</em> de Popayán
				</p>

				<div className="portada-badges" aria-label="Resumen rápido">
					{siteHighlights.map((highlight) => (
						<span className="badge" key={highlight}>
							{highlight}
						</span>
					))}
				</div>

				<div className="hero-actions">
					<Link className="button button-primary" to="/visitas">
						Planear visita
					</Link>
					<Link className="button button-secondary" to="/museo">
						Explorar el museo
					</Link>
				</div>

				<div className="portada-scroll">Explorar</div>
			</header>

			<section className="content-section home-compact-section" aria-labelledby="explorar-secciones-title">
				<div className="section-heading section-heading-compact">
					<h2 id="explorar-secciones-title">Explorar por secciones</h2>
					<p className="section-intro">Selecciona una sección para ver su contenido completo.</p>
				</div>

				<div className="home-preview-grid">
					{homeSections.map((section) => (
						<SectionPreviewCard
							key={section.to}
							title={section.title}
							summary={section.summary}
							to={section.to}
							ctaLabel="Ver sección completa"
							backgroundImage={section.backgroundImage}
							icon={section.icon}
						/>
					))}
				</div>
			</section>
		</main>
	)
}
