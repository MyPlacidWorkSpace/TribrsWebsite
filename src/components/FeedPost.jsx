import { useEffect, useRef, useState } from 'react'

/**
 * One full-screen feed post. Works for live API posts (video or image)
 * and for labelled preview fallback posts.
 */
export default function FeedPost({ post, muted, onToggleMute, onRequestFullscreen }) {
  const mediaRef = useRef(null)
  const [paused, setPaused] = useState(false)
  const [liked, setLiked] = useState(Boolean(post.hasLiked))
  const [saved, setSaved] = useState(Boolean(post.hasSaved))
  const [coins, setCoins] = useState(Number(post.coins ?? post.totalCoinsReceived ?? 0))

  // Autoplay when the post scrolls into view; pause when it leaves.
  useEffect(() => {
    const el = mediaRef.current
    if (!el || post.isImage) return undefined
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold: 0.5 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [post.isImage, post.id])

  const togglePlay = () => {
    const el = mediaRef.current
    if (!el || post.isImage) return
    if (el.paused) {
      el.play().catch(() => {})
      setPaused(false)
    } else {
      el.pause()
      setPaused(true)
    }
  }

  const sendCoin = () => {
    setCoins((c) => c + 1)
    setLiked(true)
  }

  return (
    <article className="feed-post" data-post-id={post.id}>
      <div className="feed-media" onClick={togglePlay}>
        {post.isImage ? (
          <img src={post.mediaUrl} alt={post.caption || 'Tribrs post'} loading="lazy" />
        ) : (
          <video
            ref={mediaRef}
            src={post.mediaUrl}
            poster={post.thumbnailUrl}
            muted={muted}
            loop
            playsInline
            preload="metadata"
          />
        )}
        {paused && !post.isImage && <div className="play-badge">▶</div>}
        {post.isPreview && <span className="preview-chip">Preview clip</span>}
      </div>

      <div className="feed-rail">
        <button
          type="button"
          className={`rail-btn coin ${liked ? 'active' : ''}`}
          onClick={sendCoin}
          aria-label="Send a TribrsCoin"
        >
          <span className="coin-icon">◉</span>
          <span className="rail-count">{coins}</span>
        </button>
        <button type="button" className="rail-btn" aria-label="Comments">
          <span className="rail-icon">💬</span>
          <span className="rail-count">{post.commentCount ?? 0}</span>
        </button>
        <button
          type="button"
          className={`rail-btn ${saved ? 'active' : ''}`}
          onClick={() => setSaved((s) => !s)}
          aria-label="Save post"
        >
          <span className="rail-icon">🔖</span>
        </button>
        <button type="button" className="rail-btn" onClick={onToggleMute} aria-label="Mute or unmute">
          <span className="rail-icon">{muted ? '🔇' : '🔊'}</span>
        </button>
        <button
          type="button"
          className="rail-btn"
          onClick={() => onRequestFullscreen(mediaRef.current)}
          aria-label="Open fullscreen"
        >
          <span className="rail-icon">⛶</span>
        </button>
      </div>

      <div className="feed-caption">
        <div className="feed-user">
          {post.profileImageUrl && (
            <img className="avatar" src={post.profileImageUrl} alt="" loading="lazy" />
          )}
          <span className="feed-name">{post.displayName || post.userName || 'Tribrs'}</span>
          {post.userName && <span className="feed-handle">@{post.userName}</span>}
        </div>
        {post.caption && <p>{post.caption}</p>}
        <span className="feed-views">{post.viewCount ?? 0} views</span>
      </div>
    </article>
  )
}
