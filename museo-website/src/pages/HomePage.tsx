import { AgendaList } from '../components/portal/AgendaList'
import { ContentCard } from '../components/portal/ContentCard'
import { HeroNewsCarousel } from '../components/portal/HeroNewsCarousel'
import { SectionBlock } from '../components/portal/SectionBlock'
import { portalEvents } from '../data/portal/events'
import { portalNews } from '../data/portal/news'
import { usePageTitle } from './usePageTitle'

export function HomePage() {
	usePageTitle('Inicio')

	return (
		<main id="main-content" className="portal-main home-page">
			<div className="home-page__inner o-container o-stack o-stack--lg">
				<HeroNewsCarousel items={portalNews} />

				<SectionBlock
					id="noticias"
					title="NOTICIAS"
					linkTo="/programacion"
					linkLabel="Mayor información"
				>
					<div className="o-grid o-grid--cards">
						{portalNews.map((item) => (
							<ContentCard key={item.id} title={item.title} summary={item.summary} href={item.href} image={item.image} />
						))}
					</div>
				</SectionBlock>

				<SectionBlock
					id="agenda"
					title="EVENTOS Y ACTIVIDADES"
					summary="Charlas, conciertos, recorridos guiados y programación educativa abierta a la ciudadanía."
					linkTo="/programacion"
					linkLabel="Ver calendario completo"
				>
					<AgendaList items={portalEvents} />
				</SectionBlock>

				<section className="c-section" id="accesos-visuales" aria-label="Secciones con accesos visuales">
					<div className="c-section__header">
						<div className="c-section__headings">
							<h2 className="c-section__title">SECCIONES DESTACADAS</h2>
							<p className="c-section__summary">Imágenes de referencia de los mismos apartados disponibles en los botones superiores.</p>
						</div>
					</div>

					
				</section>

				<section className="c-section" id="ubicacion" aria-label="Ubicación del museo">
					<div className="c-section__header">
						<div className="c-section__headings">
							<h2 className="c-section__title">UBICACIÓN</h2>
						</div>
					</div>

					<div className="visit-map-embed-wrap">
						<iframe
							className="visit-map-embed"
							title="Mapa del Museo Arquidiocesano"
							src="https://www.google.com/maps?q=2.4418349,-76.6043796&z=17&output=embed"
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						/>
					</div>
				</section>
			</div>
		</main>
	)
}
