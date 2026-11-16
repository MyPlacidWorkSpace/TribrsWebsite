import { CLIPS, CONTACT_EMAIL, PRIVACY_URL } from '../data/content.js'

export default function CompanyPage() {
  return (
    <main className="page">
      <section className="page-intro">
        <p className="eyebrow">Company</p>
        <h1>Built for us, Owned by us.</h1>
        <p className="lede">
          Tribrs brings people together through the things they love — sports,
          dance, games, hobbies, and shared experiences. Discover Tribes in your
          neighborhood and around the world, connect with people who share your
          passions, and turn everyday interests into real-life adventures.
        </p>
        <p><strong>Find Your People. Join Your Tribe. Live Your World.</strong></p>
      </section>

      <section className="company-panels">
        <article className="panel">
          <h2>About</h2>
          <p>
            Tribrs is a social platform built for people who move. Share workouts,
            join communities, book live classes, and earn from your fitness
            journey — all in one free app.
          </p>
          <video src={CLIPS.running.src} poster={CLIPS.running.poster} muted loop playsInline preload="metadata" />
        </article>
        <article className="panel">
          <h2>Mission</h2>
          <p>
            To bring people together through the things they love, and to turn
            everyday interests into real-life adventures — with your people,
            your Tribe, your world.
          </p>
          <video src={CLIPS.hiking.src} poster={CLIPS.hiking.poster} muted loop playsInline preload="metadata" />
        </article>
        <article className="panel">
          <h2>Contact</h2>
          <p>
            Questions, press, or support? Write to us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
          <p>Support (as published in Google Play): <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
        </article>
        <article className="panel">
          <h2>Careers</h2>
          <p>No open roles right now. If you love sports, community, and building things people use every day, check back soon.</p>
        </article>
        <article className="panel">
          <h2>Press</h2>
          <p>No press kit yet. For press enquiries, write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
        </article>
        <article className="panel">
          <h2>Legal</h2>
          <p>
            Privacy policy: <a href={PRIVACY_URL} target="_blank" rel="noreferrer">Read the privacy policy</a>.
          </p>
          <p>Terms of Service: in review — the full Terms page will be published here once review is complete.</p>
          <p>Data Safety: the app collects name, email address, fitness info, user-generated content, and device IDs; data is encrypted in transit. Deletion is available on request.</p>
        </article>
      </section>
    </main>
  )
}
