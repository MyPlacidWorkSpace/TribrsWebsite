import { CLIPS, PEOPLE } from '../data/content.js'

export default function PeoplePage() {
  return (
    <main className="page">
      <section className="page-intro">
        <p className="eyebrow">People</p>
        <h1>The people who make showing up worth it.</h1>
        <p className="lede">
          Creators and trainers from across the community — sharing
          classes, sessions, and stories with their Tribes.
        </p>
      </section>
      <section className="people-grid">
        {PEOPLE.map((p) => {
          const clip = CLIPS[p.clip]
          return (
            <article key={p.name} className="person-card">
              <video src={clip.src} poster={clip.poster} muted loop playsInline preload="metadata" />
              <div className="person-body">
                <h2>{p.name}</h2>
                <span className="person-role">{p.role}</span>
                <p>{p.text}</p>
              </div>
            </article>
          )
        })}
      </section>
      <section className="page-note">
        <h2>Become a creator — build the Tribe you wish existed.</h2>
        <p>
          Share what you love, teach what you know, and grow a community around
          it. Creators keep their community close, and their work gets seen by
          the people who care most.
        </p>
      </section>
    </main>
  )
}
