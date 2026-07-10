export function Footer() {
  return (
    <footer className="c-footer" aria-labelledby="footer-title">
      <div className="o-container c-footer__content">
        <h2 className="sr-only" id="footer-title">
          Información institucional del museo
        </h2>

        <div className="c-footer__grid">
          <section>
            <h3>Museo Arquidiocesano de Popayán</h3>
            <p>Calle 4A No. 4-56 · Centro Histórico, Popayán, Cauca</p>
            <p>Administrado por la Arquidiócesis de Popayán</p>
            <p>Popayán, Cauca – Colombia</p>
          </section>

          <section>
            <h3>Canales digitales</h3>
            <ul>
              <li>
                <a href="https://www.facebook.com/arquimuseo.popayan/" target="_blank" rel="noreferrer">Facebook</a>
              </li>
              <li>
                <a href="https://www.instagram.com/arquimuseo.popayan/" target="_blank" rel="noreferrer">Instagram</a>
              </li>
              <li>
                <a href="https://maps.app.goo.gl/ZgefXEr5kK6JcuGE8" target="_blank" rel="noreferrer">Google Maps</a>
              </li>
            </ul>
          </section>

          <section>
            <h3>Contacto</h3>
            <ul>
              <li>
                <a href="tel:+573127887309">Teléfono: +57 312 788 7309</a>
              </li>
              <li>
                <a href="mailto:museo@arquidiocesisdepopayan.org">museo@arquidiocesisdepopayan.org</a>
              </li>
              <li>
                <a href="https://www.arquidiocesisdepopayan.org" target="_blank" rel="noreferrer">www.arquidiocesisdepopayan.org</a>
              </li>
            </ul>
          </section>
        </div>

        <div className="c-footer__bottom">
          <p>Copyright © 2026 Museo Arquidiocesano de Popayán</p>
          <p>Arquidiócesis de Popayán</p>
        </div>
      </div>
    </footer>
  )
}