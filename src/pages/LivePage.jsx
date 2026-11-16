import { Link } from 'react-router-dom'
import LiveFeed from '../components/LiveFeed.jsx'
import { PLAY_URL } from '../data/content.js'

export default function LivePage() {
  return (
    <main className="page live-page">
      <section className="page-intro">
        <p className="eyebrow">Experience Tribrs</p>
        <h1>Discover Your People. Experience Your World.</h1>
        <p className="lede">
          Step inside Tribrs, where every connection can lead to something bigger.
          Discover exciting Dance Tribes, sports communities, games, hobbies, and
          shared experiences happening in your neighborhood and around the world.
        </p>
        <p>
          Explore stories, celebrate achievements, connect with people who share
          your passions, and discover communities you can call your own.
        </p>
        <p>
          On Tribrs, you&rsquo;re not just following people. You&rsquo;re finding
          your people.
        </p>
      </section>

      <section className="phone-section">
        <div className="phone-frame">
          <div className="phone-notch" />
          <div className="phone-screen">
            <div className="phone-header">
              <span className="phone-tab-active">For You</span>
            </div>
            <LiveFeed className="phone-feed" />
            <nav className="phone-nav" aria-label="App navigation preview">
              <span>Feed</span><span>Message</span><span className="phone-home">T</span><span>Profile</span><span>Reels</span>
            </nav>
          </div>
        </div>
        <div className="phone-cta">
          <a className="btn btn-accent" href={PLAY_URL} target="_blank" rel="noreferrer">Download App</a>
          <Link className="btn btn-ghost" to="/features">See all features</Link>
        </div>
      </section>

      <section className="page-note">
        <h2>Every Story Can Lead to a New Connection.</h2>
        <p>
          Step inside the world of Tribrs, where dance crews, sports teams,
          fitness groups, gamers, and neighborhood communities come together.
          Explore inspiring moments, discover people who share your passions, and
          find exciting activities happening near you and around the world.
        </p>
        <p><strong>Don&rsquo;t just watch the moment. Be part of it. Tap +JoinTribe and find where you belong.</strong></p>
      </section>
    </main>
  )
}
