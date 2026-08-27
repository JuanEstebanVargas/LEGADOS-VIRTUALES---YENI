import { HeroCarousel } from '../components/layout/HeroCarousel'
import { useGlobalCarouselItems } from '../hooks/useGlobalCarouselItems'
import { usePageTitle } from './usePageTitle'

type ContactoPageProps = {
  whatsappHref: string
}

export function ContactoPage({ whatsappHref }: ContactoPageProps) {
  usePageTitle('Contacto')
  const carouselItems = useGlobalCarouselItems()

  return (
    <main id="main-content" className="section-page-main">
      <HeroCarousel
        items={carouselItems}
        title="Contacto"
        kicker="Museo Arquidiocesano de Popayán"
        description="Canales de atención directa, redes sociales e información institucional."
        contentAlign="left"
        actions={[{ label: 'Escribir por WhatsApp', href: whatsappHref, variant: 'primary' }]}
      />

      <section className="content-section contact-section" id="contacto">
        <div className="contact-grid contact-grid-compact">
          <article className="info-card">
            <h2>Información de contacto</h2>
            <p><strong>Dirección:</strong><br />Calle 4A No. 4-56<br />Centro Histórico, Popayán, Cauca.</p>
            <p>
              <strong>Teléfono:</strong><br />
              <a href="tel:+573127887309">+57 312 788 7309</a>
            </p>
            <p>
              <strong>Email:</strong><br />
              <a href="mailto:museo@arquidiocesisdepopayan.org">museo@arquidiocesisdepopayan.org</a>
            </p>
            <a className="button button-whatsapp contact-whatsapp-cta" href={whatsappHref} target="_blank" rel="noopener noreferrer">
              Escribir por WhatsApp
            </a>
          </article>

          <article className="info-card">
            <h2>Entidad administradora</h2>
            <p><strong>Institución:</strong><br />Arquidiócesis de Popayán</p>
            <p><strong>Web:</strong><br />www.arquidiocesisdepopayan.org</p>
            <p><strong>Dirección Curia:</strong><br />Popayán, Cauca – Colombia</p>
          </article>

          <article className="info-card">
            <h2>Canales digitales</h2>
            <ul className="program-axis-list contact-channel-list-compact">
              <li className="contact-social-item">
                <span className="contact-social-label">📘 <strong>Facebook:</strong></span>{' '}
                <a
                  className="contact-social-link"
                  href="https://www.facebook.com/arquimuseo.popayan/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  facebook.com/arquimuseo.popayan
                </a>
              </li>
              <li className="contact-social-item">
                <span className="contact-social-label">📸 <strong>Instagram:</strong></span>{' '}
                <a
                  className="contact-social-link"
                  href="https://www.instagram.com/arquimuseo.popayan/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @arquimuseo.popayan
                </a>
              </li>
              <li className="contact-social-item">
                <span className="contact-social-label">📍 <strong>Google Maps:</strong></span>{' '}
                <a
                  className="contact-social-link"
                  href="https://maps.app.goo.gl/ZgefXEr5kK6JcuGE8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver ubicación en Google Maps
                </a>
              </li>
            </ul>

            <div className="visit-map-embed-wrap">
              <iframe
                className="visit-map-embed"
                title="Mapa del Museo Arquidiocesano"
                src="https://www.google.com/maps?q=2.4418349,-76.6043796&z=17&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}
