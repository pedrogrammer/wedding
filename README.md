# مراسم پدرام و عسل — mobile invitation

An independent React and TypeScript implementation of the mobile design at https://webgencyinvitations.com/thesacredgarden.

## Run

```sh
npm install
npm run dev
npm run build
npm run preview
```

## Implementation

The application renders semantic React components directly into the page. It has no iframe, HTML injection, copied page document, or Tilda runtime dependency.

- `src/App.tsx`: hero, schedule, location, guest details, attendance, and footer sections.
- `src/components/InvitationIntro.tsx`: envelope state, original opening video, audio playback, and fallback handling.
- `src/components/Countdown.tsx`: timer, animated digits, and viewport reveal.
- `src/components/Artwork.tsx`: decorative layers and scroll reveal observers.
- `src/components/VenueMap.tsx`: native map artwork, pointer panning, zoom controls, and directions link.
- `src/components/RsvpDialog.tsx`: native dialog, keyboard/focus behavior, form validation, and local response storage.
- `src/App.css` and `src/index.css`: authored mobile layout, typography, and animations.
- `public/assets/`: original images, original video/audio, and a captured map view. The map artwork is static; directions open the live Google map. Zooming and panning are implemented locally.

The invitation fonts are stored in `src/assets/fonts/` and loaded locally through `src/index.css`. The Persian welcome section uses Shekasteh for «به نام آفریننده عشق» and Noto Naskh Arabic for the translated invitation text. `Shekasteh-source.md` records the calligraphy font's source and version; the Noto font's Open Font License is included beside its font file. Vite includes the active fonts in the production bundle with hashed filenames. Images, video, audio, and map artwork also load locally; rendering the invitation requires no external asset providers. `.reference/download-fonts.mjs` records the original six font URLs and can re-download and validate those files when needed. Visual layer coordinates, text, and spacing follow the reference's mobile layout, with the Persian welcome section flowing naturally to fit its text. Screens wider than 479 px display the same centered mobile invitation.

## RSVP and sample data

RSVP responses are saved only in the current browser's local storage (`sacred-garden-rsvp`). The confirmation explicitly states that responses are not sent to the hosts. Connect a receiving endpoint before real guest use.

The countdown targets 7 Aban 1405 (October 29, 2026) at 16:00 Iran time, using an explicit UTC+03:30 offset so every visitor counts down to the same instant. Other sample names, dates, and text still match the reference, including the displayed wedding date of September 27, 2026.

## Reference files

`.reference/` stores measurements, asset provenance, and the superseded implementation for comparison. These files are not served or included in the production bundle.
