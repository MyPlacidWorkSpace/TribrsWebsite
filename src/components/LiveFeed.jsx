import { useCallback, useEffect, useRef, useState } from 'react'
import { API_BASE, CLIPS, FALLBACK_POSTS } from '../data/content.js'
import FeedPost from './FeedPost.jsx'

const PAGE_SIZE = 10

function normalise(item) {
  const mediaUrl = item.videoUrl || item.mediaUrl || item.attachments?.[0]?.url || ''
  const isImage =
    item.mediaType === 1 ||
    (item.mediaContentType || '').startsWith('image') ||
    /\.(jpg|jpeg|png|webp)(\?|$)/i.test(mediaUrl)
  return {
    id: String(item.postId ?? item.id),
    displayName: item.displayName || item.userName || 'Tribrs',
    userName: item.userName || '',
    profileImageUrl: item.profileImageUrl || '',
    caption: item.caption || '',
    mediaUrl,
    thumbnailUrl: item.thumbnailUrl || item.attachments?.[0]?.thumbnailUrl || '',
    isImage,
    coins: item.totalCoinsReceived ?? item.earnedCoins ?? 0,
    commentCount: item.commentCount ?? 0,
    viewCount: item.viewCount ?? 0,
    hasLiked: Boolean(item.hasLiked),
    hasSaved: Boolean(item.hasSaved),
    isPreview: false,
  }
}

function fallbackPosts() {
  return FALLBACK_POSTS.map((p) => {
    const clip = CLIPS[p.clip]
    return {
      id: p.id,
      displayName: 'Tribrs',
      userName: 'tribrs',
      profileImageUrl: '',
      caption: p.caption,
      mediaUrl: clip.src,
      thumbnailUrl: clip.poster,
      isImage: false,
      coins: 0,
      commentCount: 0,
      viewCount: 0,
      hasLiked: false,
      hasSaved: false,
      isPreview: true,
    }
  })
}

/**
 * Live For You feed from GET /Feed/for-you (no auth, CORS *).
 * Paginates as the user scrolls. Falls back to labelled preview clips
 * when the API fails, times out, or returns no posts.
 */
export default function LiveFeed({ className = '' }) {
  const [posts, setPosts] = useState([])
  const [live, setLive] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [muted, setMuted] = useState(true)
  const pageRef = useRef(1)
  const loadingRef = useRef(false)
  const hasMoreRef = useRef(true)
  const seenRef = useRef(new Set())
  const sentinelRef = useRef(null)

  const loadPage = useCallback(async (page) => {
    if (loadingRef.current || !hasMoreRef.current) return
    loadingRef.current = true
    try {
      const ctrl = new AbortController()
      const timer = setTimeout(() => ctrl.abort(), 9000)
      const res = await fetch(`${API_BASE}/Feed/for-you?page=${page}&pageSize=${PAGE_SIZE}`, {
        signal: ctrl.signal,
      })
      clearTimeout(timer)
      if (!res.ok) throw new Error(`Feed request failed (${res.status})`)
      const data = await res.json()
      const items = Array.isArray(data) ? data : data.items ?? []
      const fresh = items.map(normalise).filter((p) => p.mediaUrl && !seenRef.current.has(p.id))
      fresh.forEach((p) => seenRef.current.add(p.id))
      if (fresh.length === 0) {
        hasMoreRef.current = false
      } else {
        setPosts((prev) => [...prev, ...fresh])
        setLive(true)
      }
      if (items.length < PAGE_SIZE) hasMoreRef.current = false
    } catch (err) {
      hasMoreRef.current = false
      if (page === 1) setError(err.message || 'Feed unavailable')
    } finally {
      loadingRef.current = false
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadPage(1)
  }, [loadPage])

  // Paginate when the sentinel at the end of the feed scrolls into view.
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return undefined
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && live) {
          pageRef.current += 1
          loadPage(pageRef.current)
        }
      },
      { rootMargin: '600px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [live, loadPage, posts.length])

  const requestFullscreen = (el) => {
    if (!el) return
    const target = el.closest('.feed-post') || el
    if (target.requestFullscreen) target.requestFullscreen().catch(() => {})
  }

  const shown = posts.length > 0 ? posts : fallbackPosts()

  return (
    <div className={`live-feed ${className}`}>
      {live && <span className="live-badge">Live from the app</span>}
      {loading && posts.length === 0 && !error && <p className="feed-status">Loading the For You feed…</p>}
      {error && posts.length === 0 && (
        <p className="feed-status">
          The live feed could not be reached, so you are seeing preview clips below.
          App preview clips — illustrative previews, not member posts.
        </p>
      )}
      <div className="feed-scroll">
        {shown.map((post) => (
          <FeedPost
            key={post.id}
            post={post}
            muted={muted}
            onToggleMute={() => setMuted((m) => !m)}
            onRequestFullscreen={requestFullscreen}
          />
        ))}
        <div ref={sentinelRef} className="feed-sentinel" aria-hidden="true" />
      </div>
    </div>
  )
}
