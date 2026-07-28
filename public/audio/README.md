# Audio samples needed here

This app needs two `.wav` files in this folder to make sound:

- `harmonium-kannan-orig.wav` — the harmonium reed sustain sample
- `reverb.wav` — a convolution reverb impulse response

They were previously stored on Lovable's private asset storage
(served at `/__l5e/assets-v1/...`), which only resolves inside
Lovable's own editor/preview — not in a normal local dev server or a
production deploy. That's why the keyboard/touch keys didn't make
any sound when you ran this outside Lovable.

## How to get the files

1. Open the project in the Lovable editor and load the `/play` route.
2. Open your browser's DevTools → Network tab, filter by "Media" (or
   search for "wav").
3. Reload the page — you should see two requests for
   `harmonium-kannan-orig.wav` and `reverb.wav`.
4. Right-click each request → "Open in new tab" (or "Save As") and
   save them here as `public/audio/harmonium-kannan-orig.wav` and
   `public/audio/reverb.wav`.

Once both files are in this folder, `npm run dev` / `bun run dev`
will load and play them normally — no Lovable account or proxy
needed. You can delete this README once the files are in place.
