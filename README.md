# مراسم پدرام و عسل — mobile invitation

An independent React and TypeScript implementation of the mobile design at https://webgencyinvitations.com/thesacredgarden.

## Run

```sh
npm install
npm run dev
npm run build
npm run preview
```

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and publishes the invitation on pushes to `master`, or when run manually from the Actions tab.

1. In the GitHub repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
2. Commit and push the workflow to `master`.
3. Wait for **Deploy invitation to GitHub Pages** to finish in **Actions**.

The expected address is https://pedrogrammer.github.io/wedding/. The workflow reads the site's base path from GitHub Pages so assets load under `/wedding/`, and supports a custom domain without changing Vite's local development configuration.

To build and preview this repository path locally:

```sh
npm run build -- --base /wedding/
npm run preview -- --base /wedding/
```

Open http://localhost:4173/wedding/ for this preview. GitHub Free supports Pages for public repositories; publishing from a private repository requires a plan that supports private-repository Pages.

## Implementation

The application renders semantic React components directly into the page. The venue map uses Neshan's official map iframe; the invitation has no HTML injection, copied page document, or Tilda runtime dependency.

- `src/App.tsx`: hero, schedule, location, map, and footer sections. The closing message preserves the upper floral decoration from the former Dress Code section.
- `src/components/InvitationIntro.tsx`: envelope state, original opening video, audio playback, and fallback handling.
- `src/components/Countdown.tsx`: timer, animated digits, and viewport reveal.
- `src/components/Artwork.tsx`: decorative layers and scroll reveal observers.
- `src/components/VenueMap.tsx`: live Neshan map of باغ تالار تهران, with Neshan's built-in button to open the map.
- `src/App.css` and `src/index.css`: authored mobile layout, typography, and animations.
- `public/assets/`: original images and original video/audio. The venue map is embedded from Neshan, with interactive map controls and its built-in button to view the location in Neshan.

The invitation fonts are stored in `src/assets/fonts/` and loaded locally through `src/index.css`. The Persian welcome section uses Shekasteh for «به نام آفریننده عشق» and Noto Naskh Arabic for the translated invitation text. `Shekasteh-source.md` records the calligraphy font's source and version; the Noto font's Open Font License is included beside its font file. Vite includes the active fonts in the production bundle with hashed filenames. Images, video, and audio load locally; the live venue map requires access to Neshan. `.reference/download-fonts.mjs` records the original six font URLs and can re-download and validate those files when needed. Visual layer coordinates, text, and spacing follow the reference's mobile layout, with the Persian welcome section flowing naturally to fit its text. Screens wider than 479 px display the same centered mobile invitation.

## Sample data

The countdown targets 7 Aban 1405 (October 29, 2026) at 16:00 Iran time, using an explicit UTC+03:30 offset so every visitor counts down to the same instant. Other sample names, dates, and text still match the reference, including the displayed wedding date of September 27, 2026.

## Reference files

`.reference/` stores measurements, asset provenance, and the superseded implementation for comparison. These files are not served or included in the production bundle.
