import { useMemo, useState } from 'react'
import { CLIPS, TRIBES } from '../data/content.js'

export default function TribesPage() {
  const [query, setQuery] = useState('')
  const [sport, setSport] = useState('All')
  const sports = useMemo(() => ['All', ...new Set(TRIBES.map((t) => t.sport))], [])
  const shown = TRIBES.filter((t) => {
    const q = query.trim().toLowerCase()
    const matchesQuery = !q || t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)
    return matchesQuery && (sport === 'All' || t.sport === sport)
  })

  return (
    <main className="page">
      <section className="page-intro">
        <p className="eyebrow">Tribes</p>
        <h1>Find your people.</h1>
        <p className="lede">
          Discover Tribes in your neighborhood and around the world. Every Tribe
          is a community built around something people love — a sport, a game,
          a hobby, a shared experience.
        </p>
      </section>

      <section className="tribe-finder">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Tribes…"
          aria-label="Search Tribes"
        />
        <div className="chip-row">
          {sports.map((s) => (
            <button
              key={s}
              type="button"
              className={`chip ${sport === s ? 'active' : ''}`}
              onClick={() => setSport(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      <section className="tribe-grid">
        {shown.map((t) => {
          const clip = CLIPS[t.clip]
          return (
            <article key={t.name} className="tribe-card">
              <video src={clip.src} poster={clip.poster} muted loop playsInline preload="metadata" />
              <div className="tribe-body">
                <span className="tribe-sport">{t.sport}</span>
                <h2>{t.name}</h2>
                <p>{t.desc}</p>
                <button type="button" className="btn btn-ghost">+JoinTribe</button>
              </div>
            </article>
          )
        })}
        {shown.length === 0 && <p>No Tribes match that search yet — try another sport.</p>}
      </section>
    </main>
  )
}
