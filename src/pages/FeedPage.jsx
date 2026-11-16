import LiveFeed from '../components/LiveFeed.jsx'

export default function FeedPage() {
  return (
    <main className="page feed-page">
      <section className="page-intro">
        <p className="eyebrow">Don&rsquo;t just scroll.</p>
        <h1>Join your Tribe.</h1>
        <p className="lede">
          Discover communities that share your passions. Find activities near you,
          meet people who love what you love, and turn every scroll into an
          opportunity to belong.
        </p>
        <p className="feed-tab-single">For You</p>
      </section>

      <LiveFeed />

      <section className="page-note">
        <p className="eyebrow">Explore the feed · Discover Tribes · Join your people</p>
        <h2>Every Scroll. A New Tribe.<br />A New Connection.</h2>
        <p>
          Discover communities that share your passions. Explore their stories,
          find activities near you, and tap +JoinTribe to become part of
          something bigger.
        </p>
        <p><strong>Don&rsquo;t just watch. Join the experience.</strong></p>
      </section>
    </main>
  )
}
