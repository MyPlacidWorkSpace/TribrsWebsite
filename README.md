# Tribrs Website — React

The Tribrs website rebuilt as a React + Vite app. Multi-page, video-first,
with a live For You feed pulled from the Tribrs API.

## Pages

- **Feed** (`#/feed`) — live For You feed from the Tribrs API, full-screen
  posts, scroll-snap, tap to pause/play, mute/fullscreen, TribrsCoin rail.
  For You only — no Buddies tab anywhere.
- **Live in the app** (`#/live`) — phone-frame mockup of the same live feed.
- **Tribes** (`#/tribes`) — Tribe grid with search and sport filters.
- **The Journey** (`#/journey`) — five stops: check in with your Tribe, plan,
  train, check in and recover, keep the streak alive.
- **People** (`#/people`) — creator profiles.
- **Features** (`#/features`) — 11 video-led features.
- **Company** (`#/company`) — About, Mission, Contact, Careers, Press, Legal
  (Legal is in-review placeholders; privacy links to the Figma policy).
- **Log in** (`#/login`) — routes users to sign in inside the app. No password
  form, no invented web login.
- **Download App** (`#/download`) — Google Play only:
  https://play.google.com/store/apps/details?id=com.fitflare.tribr

Routing is hash-based (`HashRouter`), so the static build works on any plain
static host (including SmarterASP) with no server rewrites.

## Live feed

`GET https://api.tribrs.com/api/Feed/for-you?page=1&pageSize=10` — no auth,
CORS `*`. The app fetches pages of 10 as you scroll, dedupes by post ID,
and renders each real post with its real video/image, thumbnail, display
name, profile image, caption, and coin/comment/view counts. If the API
fails, times out (9 s), or returns no posts, the feed falls back to
labelled preview clips (`Preview clip` chips) — never presented as real
posts, and no names, captions, or counts are invented.

## Run it

```bash
npm install
npm run dev     # local dev server, hot reload
npm run build   # production build -> dist/
npm run preview # serve the production build locally
```

## Deploy it

The production build is a static site: the whole `dist/` folder.

- Copy `dist/` to the host's web root (for the current SmarterASP site,
  the `TribrsWebsite` folder), so `dist/index.html` becomes the site's
  `index.html`.
- No server, database, or environment variables are needed. The live feed
  is fetched in the visitor's browser straight from `api.tribrs.com`.
- The site is a static export — it does not publish, deploy, or change
  anything by itself.

## Videos

Clips in `public/videos/` (posters in `public/posters/`) are free-license
stock from Wikimedia Commons (public domain / CC BY / CC BY-SA). Sources
and licences are recorded in `public/video-manifest.json`. Fetch/refresh
them with:

```bash
python3 scripts/fetch-videos.py
```

That script searches Commons per sport, downloads one usable clip per
term, trims it to 8 s, transcodes to 720p H.264, and extracts a poster.

## Content rules baked in

- Tagline: "Your people. Your Tribe." Company statement:
  "Built for us, Owned by us." Contact: admin@tribrs.com.
- Colours: navy `#050A14`, blue `#2E7CF6`, gold `#E8A33D`, silver `#C9D2DE`.
- No Aria / AI Coach wording, no unverified claims (no 50M+ users, 2B+
  workouts, 4.9/5, #1 Fitness App, no member counts), no "Now in Early
  Access" statements, no `oladepoolatunde@gmail.com` anywhere.
- No App Store link is invented — Google Play only.

## Videos and licences

All 24 clips in `public/videos/` (with posters in `public/posters/`) are
free-license stock, each visually checked frame-by-frame before use:

- **Mixkit Free License** (no attribution required): swimming (3173),
  tennis (876), sprint (32792), gym (44431), football-training (42524),
  basketball (44464), hiking (114).
- **Wikimedia Commons** (public domain, CC BY 3.0, CC BY-SA 3.0/4.0):
  soccer, cricket, yoga, dance, running, cycling, strength, hiit,
  capoeira, skate, volleyball, boxing, rowing, surfing, climbing,
  aerobics, stretching.

Per-clip source URL, title, and licence are recorded in
`public/video-manifest.json` (also copied into `dist/` by the build).
All clips are silent (audio stripped) and used only where the player is
muted or labelled as a preview; the live For You feed plays the real
posts from the Tribrs API, not these clips.

### Re-fetching clips

The fetch scripts in `scripts/` (`fetch-videos.py`, `fetch-videos-2.py`,
`fetch-videos-3.py`, `fetch-videos-4.py`) download and transcode clips
from Wikimedia Commons. Mixkit clips were fetched by direct asset URL
(`https://assets.mixkit.co/videos/<id>/<id>-360.mp4`) after verifying the
clip on mixkit.co. If you replace a clip, visually check its poster
(`public/posters/<slug>.jpg`) before shipping — Commons search results
frequently include archival footage, news packages with burned-in
logos, and off-topic clips with matching keywords.
