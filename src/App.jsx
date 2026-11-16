import { HashRouter, Link, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import FeedPage from './pages/FeedPage.jsx'
import LivePage from './pages/LivePage.jsx'
import TribesPage from './pages/TribesPage.jsx'
import JourneyPage from './pages/JourneyPage.jsx'
import PeoplePage from './pages/PeoplePage.jsx'
import FeaturesPage from './pages/FeaturesPage.jsx'
import CompanyPage from './pages/CompanyPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import DownloadPage from './pages/DownloadPage.jsx'
import { CONTACT_EMAIL, PLAY_URL } from './data/content.js'

const NAV = [
  { to: '/feed', label: 'Feed' },
  { to: '/live', label: 'Live in the app' },
  { to: '/tribes', label: 'Tribes' },
  { to: '/journey', label: 'The Journey' },
  { to: '/people', label: 'People' },
  { to: '/features', label: 'Features' },
  { to: '/company', label: 'Company' },
  { to: '/login', label: 'Log in' },
]

function Header() {
  return (
    <header className="site-header">
      <Link to="/feed" className="brand">
        <img src="/tribrs-logo.png" alt="Tribrs logo" className="logo" />
        <span className="brand-text">
          <span className="brand-name">Tribrs</span>
          <span className="brand-tagline">Your people. Your Tribe.</span>
        </span>
      </Link>
      <nav className="site-nav" aria-label="Main navigation">
        {NAV.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            {item.label}
          </NavLink>
        ))}
        <a className="btn btn-accent nav-cta" href={PLAY_URL} target="_blank" rel="noreferrer">
          Download App
        </a>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero">
      <h1>
        Tribrs brings people together through the things they love — sports,
        dance, games, hobbies, and shared experiences.
      </h1>
      <p>
        Discover Tribes in your neighborhood and around the world, connect with
        people who share your passions, and turn everyday interests into
        real-life adventures.
      </p>
      <p className="hero-cta-line">Find Your People. Join Your Tribe. Live Your World.</p>
      <div className="hero-actions">
        <Link className="btn btn-accent" to="/feed">Explore the feed</Link>
        <a className="btn btn-ghost" href={PLAY_URL} target="_blank" rel="noreferrer">Download App</a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <img src="/tribrs-logo.png" alt="Tribrs logo" className="logo logo-small" />
        <p>Tribrs — Your people. Your Tribe.</p>
        <p>Built for us, Owned by us.</p>
        <p>
          Contact: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </div>
      <nav className="footer-nav" aria-label="Footer navigation">
        {[...NAV, { to: '/download', label: 'Download App' }].map((item) => (
          <Link key={item.to} to={item.to}>{item.label}</Link>
        ))}
      </nav>
      <p className="footer-legal">
        The fitness and social-challenge app — Your people. Your Tribe.
      </p>
    </footer>
  )
}

export default function App() {
  return (
    <HashRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/feed" replace />} />
          <Route path="/feed" element={<><Hero /><FeedPage /></>} />
          <Route path="/live" element={<LivePage />} />
          <Route path="/tribes" element={<TribesPage />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="*" element={<Navigate to="/feed" replace />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  )
}
