import { useEffect, useRef } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ScrollManager } from './components/ScrollManager'
import { pages } from './data/projectData'
import { useMediaReveal } from './lib/useMediaReveal'
import { AssetsPage } from './pages/AssetsPage'
import { AudioPage } from './pages/AudioPage'
import { ConceptPage } from './pages/ConceptPage'
import { FinalPage } from './pages/FinalPage'
import { HomePage } from './pages/HomePage'
import { InquiryPage } from './pages/InquiryPage'
import { LearningPage } from './pages/LearningPage'
import { ModelsPage } from './pages/ModelsPage'
import { MoodboardPage } from './pages/MoodboardPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProcessPage } from './pages/ProcessPage'
import { ReferencesPage } from './pages/ReferencesPage'
import { ReflectionPage } from './pages/ReflectionPage'
import { ResearchPage } from './pages/ResearchPage'
import { SoundscapePage } from './pages/SoundscapePage'
import { TimelinePage } from './pages/TimelinePage'

export default function App() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  useMediaReveal(mainRef, pathname)

  // Day → night: each page sets the site's atmosphere.
  useEffect(() => {
    document.documentElement.dataset.tone = pages.find((p) => p.path === pathname)?.tone ?? 'forest'
  }, [pathname])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <span id="top" />
      <ScrollManager />
      <Header />
      <main id="main" ref={mainRef} key={pathname} tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/concept" element={<ConceptPage />} />
          <Route path="/inquiry" element={<InquiryPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/moodboard" element={<MoodboardPage />} />
          <Route path="/learning" element={<LearningPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/assets" element={<AssetsPage />} />
          <Route path="/audio" element={<AudioPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/final" element={<FinalPage />} />
          <Route path="/models" element={<ModelsPage />} />
          <Route path="/soundscape" element={<SoundscapePage />} />
          <Route path="/reflection" element={<ReflectionPage />} />
          <Route path="/references" element={<ReferencesPage />} />
          {/* Old URLs */}
          <Route path="/project" element={<Navigate to="/concept" replace />} />
          <Route path="/assets/:slug" element={<Navigate to="/models" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
