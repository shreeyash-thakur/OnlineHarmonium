import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Music, Piano, Sparkles, WifiOff, Zap, Radio, Mic2, BookOpen, Cable, Gauge,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Riyaz — Virtual Harmonium, Tanpura & Shruti Box Online" },
      { name: "description", content: "A premium browser harmonium with realistic sampled sound, sargam labels, tanpura drone, metronome, and MIDI-ready learning tools. No installs — play instantly." },
      { property: "og:title", content: "Riyaz — Virtual Harmonium" },
      { property: "og:description", content: "Play a beautifully crafted online harmonium with tanpura, shruti box and sargam learning tools. Free, in your browser." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <Features />
      <Modes />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg btn-gold grid place-items-center font-display font-bold text-sm">R</div>
          <span className="font-display font-semibold tracking-tight">Riyaz</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#modes" className="hover:text-foreground transition">Modes</a>
          <a href="#learn" className="hover:text-foreground transition">Learn</a>
        </nav>
        <Link to="/play" className="px-4 py-2 rounded-full text-sm btn-gold btn-gold-hover">
          Play Now
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-gold-soft mb-6"
        >
          <Sparkles className="h-3 w-3" /> A premium online harmonium
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-display font-semibold leading-[1.02]"
        >
          <span className="block">The world's most</span>
          <span className="gold-text">expressive harmonium,</span>
          <span className="block">in your browser.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Realistic reeds, breathing bellows, a built-in tanpura and shruti box —
          crafted for riyaz, bhajans, film songs and classical practice.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link to="/play" className="btn-gold btn-gold-hover px-6 py-3 rounded-full font-medium inline-flex items-center gap-2">
            <Piano className="h-4 w-4" /> Play Now
          </Link>
          <a href="#learn" className="btn-ghost-gold px-6 py-3 rounded-full font-medium inline-flex items-center gap-2">
            <BookOpen className="h-4 w-4" /> Learn Harmonium
          </a>
        </motion.div>

        {/* Hero instrument mock */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: -8 }} animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-16 relative mx-auto max-w-4xl"
          style={{ perspective: 1200 }}
        >
          <div className="wood-panel rounded-3xl p-6 relative">
            <div className="flex items-center justify-between mb-4 text-xs text-gold-soft">
              <span className="uppercase tracking-widest">Old Delhi · 3 Octave</span>
              <span className="uppercase tracking-widest">Sargam</span>
            </div>

            {/* Simplified keyboard visual */}
            <div className="relative h-40 rounded-xl overflow-hidden"
              style={{ background: "linear-gradient(180deg, oklch(0.16 0.02 40), oklch(0.10 0.015 30))" }}>
              <div className="absolute inset-0 flex">
                {Array.from({ length: 22 }).map((_, i) => (
                  <div key={i} className="flex-1 border-r border-black/40"
                    style={{ background: "linear-gradient(180deg, oklch(0.97 0.01 85), oklch(0.88 0.015 80))" }} />
                ))}
              </div>
              <div className="absolute inset-0 flex pointer-events-none">
                {[1,3,-1,6,8,10,-1,13,15,-1,18,20].map((pos, i) => pos < 0 ? <div key={i} className="flex-1" /> : (
                  <div key={i} className="absolute top-0 h-[62%] rounded-b-md"
                    style={{
                      left: `${(pos / 22) * 100}%`, width: `${(1 / 22) * 100 * 0.7}%`,
                      background: "linear-gradient(180deg, oklch(0.14 0.02 55), oklch(0.06 0.015 50))",
                      boxShadow: "0 3px 0 oklch(0 0 0 / 0.6)",
                    }} />
                ))}
              </div>
              {/* Glow reflection */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                style={{
                  background: "linear-gradient(105deg, transparent 40%, oklch(0.9 0.15 85 / 0.15) 50%, transparent 60%)",
                  backgroundSize: "200% 100%",
                }}
              />
            </div>

            {/* Floating particles */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-[color:var(--gold)]"
                initial={{
                  x: `${20 + i * 60}%`, y: 50, opacity: 0,
                }}
                animate={{ y: -80, opacity: [0, 1, 0] }}
                transition={{
                  duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.6, ease: "easeOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const features = [
  { icon: WifiOff, title: "No installation", desc: "Runs entirely in your browser. Zero setup." },
  { icon: Music, title: "Real sampled reeds", desc: "Warm harmonium tone with authentic bellows breath." },
  { icon: Cable, title: "MIDI-ready", desc: "Plug in a MIDI controller for expressive play." },
  { icon: Mic2, title: "Tanpura & Shruti", desc: "Studio-quality drone companions built-in." },
  { icon: BookOpen, title: "Learn ragas", desc: "Sargam labels, scales and practice modes." },
  { icon: Radio, title: "Metronome", desc: "Beautiful visual pulse with accented beats." },
  { icon: WifiOff, title: "Works offline", desc: "Install as an app and practice anywhere." },
  { icon: Zap, title: "Lightning fast", desc: "Optimised audio graph, sub-frame response." },
  { icon: Gauge, title: "Precision tuned", desc: "Equal-tempered and Indian temperament ready." },
];

function Features() {
  return (
    <section id="features" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-xs uppercase tracking-widest text-gold-soft">Features</div>
          <h2 className="mt-2 text-4xl md:text-5xl font-display">Crafted for serious riyaz.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }} transition={{ delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6 group cursor-default"
            >
              <div className="h-11 w-11 rounded-xl grid place-items-center mb-4 btn-ghost-gold">
                <f.icon className="h-5 w-5" />
              </div>
              <div className="font-display text-lg">{f.title}</div>
              <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Modes() {
  const items = [
    { title: "Harmonium", desc: "Play a full 3–5 octave harmonium with four premium presets.", to: "/play" },
    { title: "Tanpura", desc: "Warm plucked drone in Sa–Pa or Sa–Ma at any pitch." },
    { title: "Metronome", desc: "Visual, accented, tempo up to 220 bpm." },
    { title: "Learn", desc: "Sargam and western note labels on every key.", to: "/play" },
  ];
  return (
    <section id="modes" className="pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((m, i) => {
            const inner = (
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-6 h-full"
              >
                <div className="font-display text-xl gold-text">{m.title}</div>
                <p className="text-sm text-muted-foreground mt-2">{m.desc}</p>
              </motion.div>
            );
            return m.to ? <Link key={m.title} to={m.to}>{inner}</Link> : <div key={m.title}>{inner}</div>;
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div>© {new Date().getFullYear()} Riyaz. Crafted for musicians.</div>
        <div className="flex gap-6">
          <Link to="/play" className="hover:text-foreground">Play</Link>
          <a href="#features" className="hover:text-foreground">Features</a>
        </div>
      </div>
    </footer>
  );
}
