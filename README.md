# Tuto Manga (iPhone web app)

664 manga & comics drawing tutorials (English, French, Japanese, Spanish) with filters, a Most viewed sort, favorites and watched marks. It's an installable web app (PWA) hosted on GitHub Pages.

## Put it on GitHub Pages
1. Create a GitHub repo (for example `tuto-manga`) and upload every file in this folder, including `.nojekyll`.
2. Repo **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, folder `/ (root)`. Save.
3. After a minute the site is at `https://<your-username>.github.io/tuto-manga/`.

## Install on iPhone
1. Open that link in **Safari** (it has to be Safari).
2. Tap the **Share** button (square with an up arrow).
3. Scroll down and tap **Add to Home Screen**, then **Add**.
4. Open **Tuto Manga** from the Home Screen. It runs full screen like an app.

Favorites and watched marks are saved on the phone. The library opens offline after the first visit, but the videos themselves need internet (they open in YouTube, TikTok or Instagram).

**Japanese videos in English:** on YouTube tap ⚙ → Subtitles/CC → Auto-translate → English, and ⚙ → Audio track → English when the card says EN audio.

## Updating
Replace `index.html`, then change `CACHE` in `sw.js` (for example `tuto-manga-v1.4.1`) so phones pick up the new version.
