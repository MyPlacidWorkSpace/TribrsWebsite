import { CLIPS, PLAY_URL } from '../data/content.js'

export default function DownloadPage() {
  return (
    <main className="page">
      <section className="page-intro">
        <p className="eyebrow">Download App</p>
        <h1>Get Tribrs. Free.</h1>
        <p className="lede">
          Tribrs is free on Google Play. Download the app, find your Tribe, and
          start moving with your people.
        </p>
        <a className="btn btn-accent btn-large" href={PLAY_URL} target="_blank" rel="noreferrer">
          Download on Google Play
        </a>
      </section>
      <section className="download-info">
        <div>
          <h2>What is free</h2>
          <p>The Tribrs app is free to download and free to use — feed, Tribes, challenges, and live classes in one place.</p>
        </div>
        <div>
          <h2>Device requirements</h2>
          <p>Android 8.0 and up. The app is available on Google Play.</p>
        </div>
        <div>
          <h2>What you get</h2>
          <p>Your feed, your Tribes, live challenges, live classes, messages, and TribrsCoins — all in the app.</p>
        </div>
      </section>
      <section className="download-gallery">
        {[CLIPS.soccer, CLIPS.running, CLIPS.dance, CLIPS.yoga].map((c) => (
          <video key={c.src} src={c.src} poster={c.poster} muted loop playsInline preload="metadata" />
        ))}
      </section>
    </main>
  )
}
