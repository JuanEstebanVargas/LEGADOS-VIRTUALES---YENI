import { useEffect, useState } from 'react'
import { AgendaList } from '../components/portal/AgendaList'
import { ContentCard } from '../components/portal/ContentCard'
import { HeroCarousel } from '../components/layout/HeroCarousel'
import { SectionBlock } from '../components/portal/SectionBlock'
import { fetchServerCarouselItems } from '../data/portal/carouselServerApi'
import { fetchServerEventItems } from '../data/portal/eventsServerApi'
import { basePortalEvents } from '../data/portal/events'
import { basePortalNews } from '../data/portal/news'
import type { PortalEventItem, PortalNewsItem } from '../data/portal/types'
import { usePageTitle } from './usePageTitle'

export function HomePage() {
	usePageTitle('Inicio')
	const [newsItems, setNewsItems] = useState<PortalNewsItem[]>(basePortalNews)
	const [eventsItems, setEventsItems] = useState<PortalEventItem[]>(basePortalEvents)

	useEffect(() => {
		let isMounted = true

		const loadServerItems = async () => {
			try {
				const serverItems = await fetchServerCarouselItems()
				if (!isMounted) {
					return
				}

				setNewsItems([...serverItems, ...basePortalNews])
			} catch {
				if (!isMounted) {
					return
				}

				setNewsItems(basePortalNews)
			}

			try {
				const serverEvents = await fetchServerEventItems()
				if (!isMounted) {
					return
				}

				setEventsItems([...serverEvents, ...basePortalEvents])
			} catch {
				if (!isMounted) {
					return
				}

				setEventsItems(basePortalEvents)
			}
		}

		void loadServerItems()

		return () => {
			isMounted = false
		}
	}, [])

	return (
		<main id="main-content" className="portal-main home-page">
			<div className="home-page__inner o-container o-stack o-stack--lg">
				<HeroCarousel
					items={newsItems}
					title="Museo Arquidiocesano de Popayán"
					kicker="Museo de Arte Religioso"
					contentAlign="center"
					actions={[
						{ label: 'Historia', href: '/historia', variant: 'ghost' },
						{ label: 'Visitas', href: '/visitas', variant: 'primary' },
					]}
				/>

				<SectionBlock
					id="noticias"
					title="NOTICIAS"
					className="c-section--highlighted"
					linkTo="/programacion"
					linkLabel="Mayor información"
				>
					<div className="o-grid o-grid--cards">
						{newsItems.map((item) => (
							<ContentCard key={item.id} title={item.title} summary={item.summary} href={item.href} image={item.image} />
						))}
					</div>
				</SectionBlock>

				<SectionBlock
					id="agenda"
					title="EVENTOS Y ACTIVIDADES"
					className="c-section--highlighted"
					summary="Charlas, conciertos, recorridos guiados y programación educativa abierta a la ciudadanía."
					linkTo="/programacion"
					linkLabel="Ver calendario completo"
				>
					<AgendaList items={eventsItems} />
				</SectionBlock>

				
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
