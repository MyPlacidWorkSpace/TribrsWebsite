#!/usr/bin/env python3
"""Fetch free-license stock videos from Wikimedia Commons, one per sport/activity.

For each term: search Commons File namespace for video files, pick the first
usable webm/mp4 under 120 MB, download, trim to 8 s, transcode to 720p H.264
mp4 (silent, matching the site's ambient clips), and extract a poster frame.
Writes a manifest JSON with source URL + licence for every clip kept.
"""
import json, os, subprocess, sys, urllib.parse, urllib.request

API = "https://commons.wikimedia.org/w/api.php"
OUT = os.path.join(os.path.dirname(__file__), "..", "public")
VID = os.path.join(OUT, "videos")
POS = os.path.join(OUT, "posters")
UA = {"User-Agent": "TribrsWebsiteBuilder/1.0 (contact: admin@tribrs.com)"}

TERMS = [
    ("soccer", "soccer match goal"),
    ("basketball", "basketball game"),
    ("cricket", "cricket match"),
    ("yoga", "yoga class"),
    ("dance", "dance fitness class"),
    ("running", "running marathon"),
    ("cycling", "road cycling race"),
    ("swimming", "swimming pool race"),
    ("strength", "weightlifting gym"),
    ("hiit", "HIIT workout"),
    ("hiking", "hiking trail mountain"),
    ("capoeira", "capoeira"),
    ("skate", "skateboarding park"),
    ("volleyball", "volleyball game"),
    ("tennis", "tennis match"),
    ("boxing", "boxing training"),
    ("rowing", "rowing boat race"),
    ("surfing", "surfing wave"),
    ("climbing", "rock climbing gym"),
    ("aerobics", "aerobics class"),
    ("football-training", "football training soccer"),
    ("gym", "gym workout fitness"),
    ("stretching", "stretching exercise"),
    ("sprint", "sprint running track"),
]

def api(params):
    q = urllib.parse.urlencode(params)
    req = urllib.request.Request(API + "?" + q, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)

def candidates(term):
    data = api({"action": "query", "format": "json", "list": "search",
                "srsearch": f"{term} filetype:video", "srnamespace": 6, "srlimit": 12})
    return [s["title"] for s in data["query"]["search"]]

def info(title):
    data = api({"action": "query", "format": "json", "titles": title,
                "prop": "imageinfo", "iiprop": "url|size|mime|extmetadata",
                "iiurlwidth": 640})
    pages = data["query"]["pages"]
    for p in pages.values():
        ii = p.get("imageinfo")
        if ii:
            return ii[0]
    return None

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=300)
    return r.returncode == 0

def main():
    os.makedirs(VID, exist_ok=True)
    os.makedirs(POS, exist_ok=True)
    manifest = {}
    for slug, term in TERMS:
        out_mp4 = os.path.join(VID, f"{slug}.mp4")
        out_jpg = os.path.join(POS, f"{slug}.jpg")
        if os.path.exists(out_mp4) and os.path.exists(out_jpg):
            print(f"{slug}: already have it"); continue
        done = False
        for title in candidates(term):
            try:
                ii = info(title)
            except Exception as e:
                print(f"{slug}: info error {e}"); continue
            if not ii:
                continue
            mime = ii.get("mime", "")
            size = ii.get("size", 0)
            url = ii.get("url", "")
            if mime not in ("video/webm", "video/mp4", "video/ogg") or size > 120_000_000 or not url:
                continue
            lic = (ii.get("extmetadata", {}).get("LicenseShortName", {}) or {}).get("value", "unknown")
            print(f"{slug}: trying {title} ({mime}, {size/1e6:.1f} MB, {lic})")
            tmp = os.path.join("/tmp", f"tribrs-{slug}" + os.path.splitext(url.split("?")[0])[1][:5])
            try:
                req = urllib.request.Request(url, headers=UA)
                with urllib.request.urlopen(req, timeout=120) as r, open(tmp, "wb") as f:
                    while True:
                        chunk = r.read(1 << 20)
                        if not chunk:
                            break
                        f.write(chunk)
            except Exception as e:
                print(f"{slug}: download error {e}"); continue
            ok = run(["ffmpeg", "-y", "-v", "error", "-ss", "1", "-i", tmp,
                      "-t", "8", "-vf", "scale=720:-2", "-c:v", "libx264",
                      "-preset", "veryfast", "-crf", "28", "-an",
                      "-movflags", "+faststart", out_mp4])
            if not ok:
                print(f"{slug}: ffmpeg transcode failed"); continue
            ok = run(["ffmpeg", "-y", "-v", "error", "-ss", "2", "-i", out_mp4,
                      "-frames:v", "1", "-q:v", "4", out_jpg])
            if not ok:
                print(f"{slug}: poster failed"); continue
            manifest[slug] = {"title": title, "source": url, "license": lic, "term": term}
            print(f"{slug}: OK -> {out_mp4}")
            done = True
            try:
                os.remove(tmp)
            except OSError:
                pass
            break
        if not done:
            print(f"{slug}: NO usable clip found")
    with open(os.path.join(OUT, "video-manifest.json"), "w") as f:
        json.dump(manifest, f, indent=2)
    print(f"Done: {len(manifest)}/{len(TERMS)} clips")

if __name__ == "__main__":
    main()
