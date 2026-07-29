import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Piano } from "lucide-react";

export const Route = createFileRoute("/play-harmonium-online")({
  head: () => ({
    meta: [
      { title: "Play Harmonium Online - Free Virtual Harmonium Keyboard | Riyaz" },
      { name: "description", content: "Play harmonium online for free with our realistic virtual harmonium keyboard. 27-key scale-changer layout, sargam labels, MIDI support. Practice Sa Re Ga Ma and learn Indian classical music." },
      { name: "keywords", content: "play harmonium online, free harmonium online, virtual harmonium keyboard, online harmonium playing, harmonium practice, Sa Re Ga Ma practice" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:title", content: "Play Harmonium Online - Free Virtual Harmonium Keyboard" },
      { property: "og:description", content: "Play harmonium online for free. Realistic sampled reeds, sargam labels, and MIDI support. Perfect for learning Indian classical music." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://onlineharmonium.vercel.app/play-harmonium-online" },
      { property: "og:image", content: "https://onlineharmonium.vercel.app/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Play Harmonium Online - Virtual Harmonium Keyboard" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Play Harmonium Online - Free Virtual Harmonium Keyboard" },
      { name: "twitter:description", content: "Play harmonium online for free. Realistic sampled reeds, sargam labels, and MIDI support for learning Indian classical music." },
      { name: "twitter:image", content: "https://onlineharmonium.vercel.app/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://onlineharmonium.vercel.app/play-harmonium-online" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://onlineharmonium.vercel.app/" },
            { "@type": "ListItem", position: 2, name: "Play Harmonium Online", item: "https://onlineharmonium.vercel.app/play-harmonium-online" },
          ],
        }),
      },
    ],
  }),
  component: PlayHarmoniumPage,
});

function PlayHarmoniumPage() {
  return (
    <div className="min-h-screen">
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg btn-gold grid place-items-center font-display font-bold text-sm">R</div>
          <span className="font-display font-semibold tracking-tight">Riyaz</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <h1 className="text-4xl md:text-5xl font-display mb-6">Play Harmonium Online</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Experience the best <strong>online harmonium</strong> with our realistic virtual keyboard.
          Play <strong>harmonium online</strong> for free with no downloads required. Perfect for beginners
          and professionals looking to practice Indian classical music.
        </p>

        <section className="mb-12">
          <h2 className="text-3xl font-display mb-6">Why Play Harmonium Online?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-xl mb-3">🎵 Realistic Sound</h3>
              <p className="text-sm text-muted-foreground">
                Our <strong>virtual harmonium</strong> features high-quality sampled reeds that mimic the
                authentic sound of a traditional Indian harmonium. Experience rich, warm tones with every keystroke.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-xl mb-3">⌨️ Multiple Input Methods</h3>
              <p className="text-sm text-muted-foreground">
                Play using your computer keyboard (Sa on E), mouse clicks, or touch screen on mobile devices.
                The <strong>online harmonium keyboard</strong> supports all popular input methods.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-xl mb-3">🎓 Learning Features</h3>
              <p className="text-sm text-muted-foreground">
                Toggle between Sargam (Sa Re Ga Ma) and Western note labels. Choose from multiple presets
                like Old Delhi, Scale Changer, Concert, and Vintage. Perfect for <strong>harmonium practice online</strong>.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-xl mb-3">📱 Works Everywhere</h3>
              <p className="text-sm text-muted-foreground">
                No downloads, no installation. Our <strong>free harmonium online</strong> works in any modern browser
                on Windows, Mac, iOS, and Android. Practice anytime, anywhere.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-display mb-6">How to Start Playing</h2>
          <div className="glass rounded-2xl p-6 sm:p-8">
            <div className="space-y-6 text-muted-foreground">
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full btn-gold grid place-items-center font-display font-bold text-sm shrink-0">1</div>
                <div>
                  <h3 className="font-display text-lg text-foreground mb-1">Click the Play button</h3>
                  <p>Navigate to our <Link to="/play" className="text-gold-soft hover:underline">harmonium player</Link> and click to start.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full btn-gold grid place-items-center font-display font-bold text-sm shrink-0">2</div>
                <div>
                  <h3 className="font-display text-lg text-foreground mb-1">Choose your settings</h3>
                  <p>Select a preset, enable labels, and adjust volume. Toggle between Sargam and Western notes.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full btn-gold grid place-items-center font-display font-bold text-sm shrink-0">3</div>
                <div>
                  <h3 className="font-display text-lg text-foreground mb-1">Start practicing</h3>
                  <p>Use keyboard, mouse, or touch to play notes. Begin with Sa and practice your scales!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-display mb-6">Features of Our Online Harmonium</h2>
          <div className="glass rounded-2xl p-6 sm:p-8">
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>✓ 27-key scale-changer layout</div>
              <div>✓ Realistic sampled reed sounds</div>
              <div>✓ Sargam and Western note labels</div>
              <div>✓ Computer keyboard support (Sa on E)</div>
              <div>✓ Mobile touch-optimized</div>
              <div>✓ Multiple presets (Old Delhi, Concert, etc.)</div>
              <div>✓ MIDI controller support</div>
              <div>✓ Volume control</div>
              <div>✓ Works offline after first load</div>
              <div>✓ No installation required</div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-display mb-6">Perfect for Learning Indian Classical Music</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Our <strong>online harmonium</strong> is designed specifically for students of Indian classical music.
              Whether you're a beginner learning <strong>Sa Re Ga Ma</strong> for the first time, or an advanced
              player practicing complex ragas, this tool provides the flexibility and realism you need.
            </p>
            <p>
              Use it to practice <strong>harmonium notes</strong>, learn new <strong>harmonium songs for beginners</strong>,
              or develop your <strong>harmonium practice online</strong>. The clear sargam labels make it easy to
              follow along with tutorials and sheet music.
            </p>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-display mb-4">Ready to Play?</h2>
          <p className="text-muted-foreground mb-6">
            Start playing harmonium online now. It's free, instant, and requires no downloads.
          </p>
          <Link to="/play" className="btn-gold btn-gold-hover px-8 py-4 rounded-full font-medium inline-flex items-center gap-2 text-lg">
            <Piano className="h-5 w-5" /> Open Harmonium Player
          </Link>
        </section>
      </main>
    </div>
  );
}