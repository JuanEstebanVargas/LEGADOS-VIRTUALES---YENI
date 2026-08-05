import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import './App.responsive.css'
import './styles/portal.css'
import './styles/museo_nacional/reseter.css'
import './styles/museo_nacional/general.css'
import './styles/museo_nacional/responsive.css'
import './styles/museo_nacional/bridge.css'
import './styles/brand-purple-gold.css'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { InstitutionalBar } from './components/portal/InstitutionalBar'
import { AdminCarouselPage } from './pages/AdminCarouselPage'
import { ColeccionPage } from './pages/ColeccionPage'
import { ContactoPage } from './pages/ContactoPage'
import { HistoriaPage } from './pages/HistoriaPage'
import { HomePage } from './pages/HomePage'
import { InvestigacionPage } from './pages/InvestigacionPage'
import { MuseoPage } from './pages/MuseoPage'
import { PatrimonioPage } from './pages/PatrimonioPage'
import { ProgramacionPage } from './pages/ProgramacionPage'
import { VisitasPage } from './pages/VisitasPage'

const legacyHashRouteMap: Record<string, string> = {
  '#inicio': '/',
  '#identidad': '/museo',
  '#historia': '/historia',
  '#coleccion': '/coleccion',
  '#visita': '/visitas',
  '#programacion': '/programacion',
  '#patrimonio': '/patrimonio',
  '#investigacion': '/investigacion',
  '#contacto': '/contacto',
}

function LegacyHashRedirect() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname !== '/' || !location.hash) {
      return
    }

    const targetRoute = legacyHashRouteMap[location.hash.toLowerCase()]
    if (targetRoute && targetRoute !== location.pathname) {
      navigate(targetRoute, { replace: true })
    }
  }, [location.hash, location.pathname, navigate])

  return null
}

export default function RoutedApp() {
  const [reduceMotionManually, setReduceMotionManually] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.motion = reduceMotionManually ? 'off' : 'on'
  }, [reduceMotionManually])

  const whatsappPhone = '573127887309'
  const whatsappMessage = 'Hola, quiero planear una visita al Museo Arquidiocesano de Arte Religioso de Popayán.'
  const whatsappHref = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="site-shell legacy-museo">
      <a className="skip-link" href="#main-content">
        Saltar al contenido principal
      </a>
      <InstitutionalBar onToggleMotion={() => setReduceMotionManually((current) => !current)} />
      <Header />
      <LegacyHashRedirect />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/museo" element={<MuseoPage />} />
        <Route path="/historia" element={<HistoriaPage />} />
        <Route path="/coleccion" element={<ColeccionPage />} />
        <Route path="/visitas" element={<VisitasPage whatsappHref={whatsappHref} />} />
        <Route path="/programacion" element={<ProgramacionPage />} />
        <Route path="/patrimonio" element={<PatrimonioPage />} />
        <Route path="/investigacion" element={<InvestigacionPage />} />
        <Route path="/contacto" element={<ContactoPage whatsappHref={whatsappHref} />} />
        <Route path="/adicion" element={<AdminCarouselPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <a className="contacto-fab" href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp">
        WhatsApp
      </a>

      <Footer />
    </div>
  )
}
