import { CLIPS, JOURNEY_STOPS } from '../data/content.js'

export default function JourneyPage() {
  return (
    <main className="page">
      <section className="page-intro">
        <p className="eyebrow">The Journey</p>
        <h1>Your active life, one day at a time.</h1>
        <p className="lede">
          Five stops, every day. Check in with your Tribe, plan, train, recover,
          and keep the streak alive — together.
        </p>
      </section>
      <section className="journey">
        {JOURNEY_STOPS.map((s) => {
          const clip = CLIPS[s.clip]
          return (
            <article key={s.n} className="journey-stop">
              <video src={clip.src} poster={clip.poster} muted loop playsInline preload="metadata" />
              <div>
                <span className="journey-num">{s.n}</span>
                <h2>{s.title}</h2>
                <p>{s.text}</p>
              </div>
            </article>
          )
        })}
      </section>
    </main>
  )
}
