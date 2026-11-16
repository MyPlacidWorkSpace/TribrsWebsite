#!/usr/bin/env python3
"""Fourth pass: replace AFN-bugged basketball, hiker-less hiking, distant cricket, Red Bull rowing."""
import json, os, subprocess, urllib.parse, urllib.request

API = "https://commons.wikimedia.org/w/api.php"
OUT = os.path.join(os.path.dirname(__file__), "..", "public")
VID = os.path.join(OUT, "videos")
POS = os.path.join(OUT, "posters")
UA = {"User-Agent": "TribrsWebsiteBuilder/1.0 (contact: admin@tribrs.com)"}
BLACKLIST = ["afn", "army", "diego", "garcia", "reporting", "navy", "air force",
             "red bull", "redbull", "elephant", "space", "neffex", "1950",
             "wikipedia", "freemake", "srf", "billboard", "sponsor"]

TERMS = [
    ("basketball", "basketball game indoor court", ["basketball"]),
    ("hiking", "hiking trail mountain walkers", ["hik"]),
    ("cricket", "cricket batting bowler", ["cricket"]),
    ("rowing", "rowing regatta race", ["row"]),
]

def api(params):
    q = urllib.parse.urlencode(params)
    req = urllib.request.Request(API + "?" + q, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)

def candidates(term):
    data = api({"action": "query", "format": "json", "list": "search",
                "srsearch": f"{term} filetype:video", "srnamespace": 6, "srlimit": 20})
    return [s["title"] for s in data["query"]["search"]]

def info(title):
    data = api({"action": "query", "format": "json", "titles": title,
                "prop": "imageinfo", "iiprop": "url|size|mime|extmetadata"})
    for p in data["query"]["pages"].values():
        ii = p.get("imageinfo")
        if ii:
            return ii[0]
    return None

def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True, timeout=300).returncode == 0

def main():
    manifest_path = os.path.join(OUT, "video-manifest.json")
    manifest = json.load(open(manifest_path)) if os.path.exists(manifest_path) else {}
    for slug, term, required in TERMS:
        out_mp4 = os.path.join(VID, f"{slug}.mp4")
        out_jpg = os.path.join(POS, f"{slug}.jpg")
        done = False
        for title in candidates(term):
            low = title.lower()
            if any(b in low for b in BLACKLIST):
                print(f"{slug}: skip blacklisted {title}"); continue
            if not any(k in low for k in required):
                print(f"{slug}: skip (no keyword) {title}"); continue
            try:
                ii = info(title)
            except Exception as e:
                print(f"{slug}: info error {e}"); continue
            if not ii:
                continue
            mime, size, url = ii.get("mime", ""), ii.get("size", 0), ii.get("url", "")
            if mime not in ("video/webm", "video/mp4", "video/ogg") or size > 120_000_000 or not url:
                continue
            lic = (ii.get("extmetadata", {}).get("LicenseShortName", {}) or {}).get("value", "unknown")
            print(f"{slug}: trying {title} ({mime}, {size/1e6:.1f} MB, {lic})")
            tmp = os.path.join("/tmp", f"tribrs4-{slug}.bin")
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
                print(f"{slug}: transcode failed"); continue
            ok = run(["ffmpeg", "-y", "-v", "error", "-ss", "3", "-i", out_mp4,
                      "-frames:v", "1", "-q:v", "4", out_jpg])
            if not ok:
                print(f"{slug}: poster failed"); continue
            manifest[slug] = {"title": title, "source": url, "license": lic, "term": term}
            print(f"{slug}: OK")
            done = True
            try:
                os.remove(tmp)
            except OSError:
                pass
            break
        if not done:
            print(f"{slug}: NO usable clip found")
    json.dump(manifest, open(manifest_path, "w"), indent=2)
    print(f"Done: {len(manifest)} clips in manifest")

if __name__ == "__main__":
    main()
