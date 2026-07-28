# Riyaz — Virtual Harmonium Online

A premium virtual harmonium in the browser, with realistic sound, tanpura, and metronome — built for practice and riyaz anywhere.

## Built with

- [TanStack Start](https://tanstack.com/start)
- TypeScript
- React
- Tailwind CSS
- [Tone.js](https://tonejs.github.io/) for audio synthesis

## Development

You'll need Node.js (or Bun) installed.

```sh
git clone https://github.com/shreeyash-thakur/harmonic-soul.git
cd harmonic-soul
npm install
npm run dev
```

The dev server runs at `http://localhost:8080`.

### Other scripts

```sh
npm run build       # production build
npm run build:dev   # development-mode build
npm run preview     # preview a production build locally
npm run lint         # lint the codebase
npm run format       # format with prettier
```

## Deployment

The production build targets Cloudflare Workers via [Nitro](https://nitro.build/)'s `cloudflare-module` preset, configured in `vite.config.ts`. Any other Nitro-supported target can be used instead by adjusting the preset there.
