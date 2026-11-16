import { Link } from 'react-router-dom'
import { CLIPS, FEATURES, PLAY_URL } from '../data/content.js'

export default function FeaturesPage() {
  return (
    <main className="page">
      <section className="page-intro">
        <p className="eyebrow">Features</p>
        <h1>Everything your active life needs, in one app.</h1>
        <p className="lede">
          Your Tribes, your challenges, your people — share the workout, find
          your Tribe, keep the streak alive.
        </p>
      </section>
      <section className="feature-list">
        {FEATURES.map((f, i) => {
          const clip = CLIPS[f.clip]
          return (
            <article key={f.name} className="feature-row">
              <span className="feature-num">{String(i + 1).padStart(2, '0')}</span>
              <video src={clip.src} poster={clip.poster} muted loop playsInline preload="metadata" />
              <div>
                <h2>{f.name}</h2>
                <p>{f.text}</p>
              </div>
            </article>
          )
        })}
      </section>
      <section className="page-note">
        <Link className="btn btn-accent" to="/download">Download App →</Link>
        <a className="btn btn-ghost" href={PLAY_URL} target="_blank" rel="noreferrer">Google Play</a>
      </section>
    </main>
  )
}
