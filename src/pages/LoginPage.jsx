import { Link } from 'react-router-dom'
import { CLIPS, PLAY_URL } from '../data/content.js'

export default function LoginPage() {
  return (
    <main className="page">
      <section className="page-intro">
        <p className="eyebrow">Log in</p>
        <h1>Welcome back.</h1>
        <p className="lede">
          Sign in inside the Tribrs app — there is no web login here, and no
          password is ever asked for on this website.
        </p>
      </section>
      <section className="login-steps">
        <video src={CLIPS.dance.src} poster={CLIPS.dance.poster} muted loop playsInline preload="metadata" />
        <ol>
          <li><strong>Open the Tribrs app</strong> on your phone.</li>
          <li><strong>Tap “Log in”</strong> in the app.</li>
          <li><strong>Sign in with your Tribrs account</strong> — the same account you use in the app.</li>
        </ol>
        <p>
          New to Tribrs? Get the app from Google Play and create your account
          there — search for Tribrs in the Play Store.
        </p>
        <a className="btn btn-accent" href={PLAY_URL} target="_blank" rel="noreferrer">Download App</a>
        <Link className="btn btn-ghost" to="/feed">Back to the feed</Link>
      </section>
    </main>
  )
}
