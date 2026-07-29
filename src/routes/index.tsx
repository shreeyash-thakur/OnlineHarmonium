import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Music, Piano, Sparkles, WifiOff, Zap, BookOpen, Cable, Gauge } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Online Harmonium - Play Free Virtual Harmonium Keyboard Online" },
      { name: "description", content: "Play harmonium online for free using our virtual harmonium keyboard. Practice Sa Re Ga Ma notes, learn harmonium songs, and play Indian classical music on mobile and computer." },
      { name: "keywords", content: "online harmonium, play harmonium online, virtual harmonium, online harmonium keyboard, free harmonium online, harmonium notes, Sa Re Ga Ma harmonium, harmonium practice online, learn harmonium online, harmonium songs for beginners, Indian musical instrument online, virtual Indian keyboard" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:title", content: "Online Harmonium - Play Free Virtual Harmonium Keyboard Online" },
      { property: "og:description", content: "Play harmonium online for free using our virtual harmonium keyboard. Practice Sa Re Ga Ma notes, learn harmonium songs, and play Indian classical music on mobile and computer." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://onlineharmonium.vercel.app/" },
      { property: "og:image", content: "https://onlineharmonium.vercel.app/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Virtual Harmonium Keyboard - Play Online for Free" },
      { property: "og:site_name", content: "Online Harmonium - Riyaz" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@riyazapp" },
      { name: "twitter:creator", content: "@riyazapp" },
      { name: "twitter:title", content: "Online Harmonium - Play Free Virtual Harmonium Keyboard Online" },
      { name: "twitter:description", content: "Play harmonium online for free using our virtual harmonium keyboard. Practice Sa Re Ga Ma notes, learn harmonium songs, and play Indian classical music on mobile and computer." },
      { name: "twitter:image", content: "https://onlineharmonium.vercel.app/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://onlineharmonium.vercel.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              name: "Online Harmonium - Riyaz",
              url: "https://onlineharmonium.vercel.app/",
              description: "Free online virtual harmonium with realistic sampled reeds and sargam labels.",
            },
            {
              "@type": "WebApplication",
              name: "Riyaz Virtual Harmonium",
              applicationCategory: "MusicApplication",
              operatingSystem: "Any (Web Browser)",
              url: "https://onlineharmonium.vercel.app/",
              description: "Free online harmonium with realistic sampled reeds and sargam labels. Play Indian classical music, practice Sa Re Ga Ma, and learn harmonium songs.",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              browserRequirements: "Requires JavaScript. Requires HTML5.",
              softwareVersion: "1.0.0",
              releaseNotes: "27-key scale-changer harmonium, sargam labels, and MIDI support.",
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                { "@type": "Question", name: "What is an online harmonium?", acceptedAnswer: { "@type": "Answer", text: "An online harmonium is a virtual/web-based version of the traditional Indian harmonium. It allows you to play harmonium directly in your browser without downloading any software. You can use your mouse, touch screen, or computer keyboard to play notes." } },
                { "@type": "Question", name: "Can I play harmonium online for free?", acceptedAnswer: { "@type": "Answer", text: "Yes! Our online harmonium is completely free to use. No downloads, no sign-ups, no hidden fees. Just open the website and start playing harmonium instantly in your browser." } },
                { "@type": "Question", name: "Can beginners learn harmonium using this website?", acceptedAnswer: { "@type": "Answer", text: "Absolutely! Our virtual harmonium is perfect for beginners. It features sargam labels (Sa Re Ga Ma), western note labels, keyboard mappings, and practice modes to help you learn harmonium step by step." } },
                { "@type": "Question", name: "What are Sa Re Ga Ma notes?", acceptedAnswer: { "@type": "Answer", text: "Sa Re Ga Ma are the seven basic notes (swaras) in Indian classical music. Sa is the tonic — the reference pitch everything else is measured from — so its Western letter depends on the key you choose. When Sa = C, the notes map to C, D, E, F, G, A, B. On our online harmonium, these are labeled on the keys to help you learn and practice Indian classical music." } },
                { "@type": "Question", name: "Does this work on mobile?", acceptedAnswer: { "@type": "Answer", text: "Yes! Our virtual harmonium works perfectly on mobile phones, tablets, and desktops. The touch interface is optimized for mobile devices, so you can practice harmonium anywhere, anytime." } },
                { "@type": "Question", name: "Is there a way to practice harmonium songs?", acceptedAnswer: { "@type": "Answer", text: "Yes. Our harmonium songs page lists beginner-friendly ragas, bhajans, and aartis with difficulty levels and note guidance, and you can play each one directly on the virtual harmonium. Start with simple pieces like Om Jai Jagdish Hare or Raga Bhupali, then progress to more complex ragas as your technique grows." } },
              ],
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://onlineharmonium.vercel.app/" },
          ],
        }),
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <WhatIsOnlineHarmonium />
      <HowToPlay />
      <HarmoniumNotes />
      <Songs />
      <FAQ />
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
          <Link to="/learn" className="hover:text-foreground transition">
            Learn
          </Link>
          <a href="#features" className="hover:text-foreground transition">
            Features
          </a>
          <a href="#modes" className="hover:text-foreground transition">
            Modes
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link to="/play" className="px-4 py-2 rounded-full text-sm btn-gold btn-gold-hover">
            Play Now
          </Link>
        </div>
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
          className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold leading-[1.1]"
        >
          <span className="block">Play Online Harmonium -</span>
          <span className="gold-text">Free Virtual Harmonium Keyboard</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto"
        >
          Experience the best <strong>online harmonium</strong> with realistic sampled reeds and breathing bellows.
          Practice <strong>Sa Re Ga Ma</strong> notes, learn harmonium songs, and play Indian classical music.
          Our <strong>virtual harmonium keyboard</strong> works instantly in your browser - no downloads required.
          Perfect for beginners and professionals alike.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link to="/play" className="btn-gold btn-gold-hover px-6 py-3 rounded-full font-medium inline-flex items-center gap-2">
            <Piano className="h-4 w-4" /> Start Playing Harmonium
          </Link>
          <Link to="/learn" className="btn-ghost-gold px-6 py-3 rounded-full font-medium inline-flex items-center gap-2">
            <BookOpen className="h-4 w-4" /> Learn Harmonium
          </Link>
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

function WhatIsOnlineHarmonium() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-display mb-6">What is an Online Harmonium?</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              An <strong>online harmonium</strong> is a digital, web-based version of the traditional Indian harmonium (also known as a reed organ or pump organ).
              It allows musicians, students, and enthusiasts to play the harmonium directly in their web browser without needing to download any software or purchase expensive equipment.
            </p>
            <p>
              The <strong>virtual harmonium</strong> replicates the sound and feel of a real harmonium using high-quality audio samples and realistic interaction design.
              You can use your mouse, touch screen, or computer keyboard to play notes, making it accessible for everyone.
            </p>
            <p>
              Learning <strong>harmonium online</strong> has become increasingly popular because it offers convenience and accessibility.
              Whether you want to practice <strong>Sa Re Ga Ma</strong> (the seven basic notes of Indian classical music), learn new <strong>harmonium songs for beginners</strong>,
              or practice <strong>harmonium notes</strong> for riyaz (daily practice), an <strong>online harmonium keyboard</strong> provides a flexible and effective tool.
            </p>
            <p>
              Our <strong>free harmonium online</strong> features a 27-key scale-changer layout, sargam labels, western note labels, and MIDI support,
              making it one of the most comprehensive <strong>Indian musical instruments online</strong> available.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowToPlay() {
  const steps = [
    {
      title: "Open the Harmonium",
      desc: "Navigate to the play page and wait for the audio engine to initialize. No download or installation needed.",
      icon: "1",
    },
    {
      title: "Use Your Keyboard or Touch",
      desc: "Play notes using your computer keyboard (Sa is mapped to E) or by clicking/touching the on-screen keys on mobile and desktop.",
      icon: "2",
    },
    {
      title: "Learn the Notes",
      desc: "Toggle between Sargam (Sa Re Ga Ma) and Western note labels to understand the musical layout. Practice scales and melodies.",
      icon: "3",
    },
    {
      title: "Experiment with Sounds",
      desc: "Choose from multiple presets like Old Delhi, Scale Changer, Concert, and Vintage. Adjust volume and explore different timbres.",
      icon: "4",
    },
  ];

  return (
    <section className="py-24 border-t border-white/5 bg-gradient-to-b from-transparent to-white/[0.02]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-display mb-6">How to Play Harmonium Online?</h2>
        <p className="text-muted-foreground max-w-2xl mb-12">
          Getting started with our <strong>virtual harmonium</strong> is easy. Follow these simple steps to begin your
          <strong> harmonium practice online</strong>.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full btn-gold grid place-items-center font-display font-bold text-sm shrink-0">
                  {step.icon}
                </div>
                <div>
                  <h3 className="font-display text-lg mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 glass rounded-2xl p-6 sm:p-8">
          <h3 className="font-display text-xl mb-4">Keyboard Controls & Mobile Touch</h3>
          <div className="grid sm:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2 text-foreground">💻 Computer Keyboard</h4>
              <p className="text-muted-foreground mb-2">
                Play the <strong>online harmonium keyboard</strong> using your computer keys. Each note is mapped to a convenient key.
                For example, <kbd className="px-2 py-1 rounded bg-white/10 font-mono">E</kbd> is Sa.
                This makes <strong>harmonium practice online</strong> fast and intuitive.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-foreground">📱 Mobile Touch</h4>
              <p className="text-muted-foreground mb-2">
                Touch any key on the screen to play. The interface is fully responsive and optimized for phones and tablets.
                Start <strong>learning harmonium online</strong> anywhere, anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HarmoniumNotes() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-display mb-6">Harmonium Notes (Sa Re Ga Ma)</h2>
        <p className="text-muted-foreground max-w-3xl mb-8">
          Understanding <strong>harmonium notes</strong> is essential for playing Indian classical music.
          The seven basic notes, known as <strong>Sa Re Ga Ma</strong> (Sargam), form the foundation of melody.
        </p>

        <div className="glass rounded-2xl p-6 sm:p-8 mb-6">
          <h3 className="font-display text-2xl mb-4">The Seven Notes (Saptak)</h3>
          <p className="text-sm text-muted-foreground mb-4">
            In Indian classical music, <strong>Sa</strong> is the <em>tonic</em> — the reference pitch
            everything else is measured from. Sa is not fixed to any particular Western note. The mapping
            below shows the notes when Sa = C; if you choose a different tonic, every Western note shifts
            accordingly. Sa and Pa are always natural (achal); the other five can be komal (flat) or, for
            Ma, tivra (sharp) depending on the raga.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { sargam: "Sa (S)", western: "C (Do) — when Sa = C", desc: "The tonic note. The starting point of all ragas. Always shuddha (natural)." },
              { sargam: "Re (R)", western: "D (Re) — when Sa = C", desc: "The second note. Shuddha or komal (flat) depending on the raga." },
              { sargam: "Ga (G)", western: "E (Mi) — when Sa = C", desc: "The third note. Shuddha or komal (flat) depending on the raga." },
              { sargam: "Ma (M)", western: "F (Fa) — when Sa = C", desc: "The fourth note. Shuddha or tivra (sharp) depending on the raga." },
              { sargam: "Pa (P)", western: "G (Sol) — when Sa = C", desc: "The fifth note. Always shuddha (natural), like Sa." },
              { sargam: "Dha (D)", western: "A (La) — when Sa = C", desc: "The sixth note. Shuddha or komal (flat) depending on the raga." },
              { sargam: "Ni (N)", western: "B (Ti) — when Sa = C", desc: "The seventh note. Shuddha or komal (flat) depending on the raga." },
            ].map((note) => (
              <div key={note.sargam} className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="font-display text-lg text-gold-soft">{note.sargam}</div>
                <div className="text-xs text-muted-foreground mb-1">{note.western}</div>
                <p className="text-xs text-muted-foreground">{note.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-display text-xl mb-3">Mandhra Saptak (Lower Octave)</h3>
            <p className="text-sm text-muted-foreground">
              The lower octave notes are indicated with a dot below the note (e.g., ऋ). On our harmonium,
              these appear as the leftmost keys. Practice these to develop control over the lower register.
            </p>
          </div>
          <div className="glass rounded-2xl p-6">
            <h3 className="font-display text-xl mb-3">Tara Saptak (Upper Octave)</h3>
            <p className="text-sm text-muted-foreground">
              The upper octave notes are shown with a dot above (e.g., त). These are the rightmost keys on the keyboard.
              Mastering the upper octave is crucial for playing complex ragas and melodies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Songs() {
  const songs = [
    { title: "Raga Bhupali", difficulty: "Beginner", type: "Raga" },
    { title: "Raga Yaman", difficulty: "Beginner", type: "Raga" },
    { title: "Raga Brindavani Sarang", difficulty: "Intermediate", type: "Raga" },
    { title: "Raga Bhairavi", difficulty: "Advanced", type: "Raga" },
    { title: "Hanuman Chalisa", difficulty: "Beginner", type: "Bhajan" },
    { title: "Om Jai Jagdish Hare", difficulty: "Beginner", type: "Aarti" },
  ];

  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-display mb-4">Learn Popular Harmonium Songs</h2>
        <p className="text-muted-foreground max-w-2xl mb-8">
          Explore our collection of <strong>harmonium songs for beginners</strong> and intermediate players.
          Practice traditional ragas, bhajans, and aartis on your <strong>virtual harmonium</strong>.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {songs.map((song, i) => (
            <motion.div
              key={song.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-5 hover:border-gold/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-display text-lg">{song.title}</h3>
                <Music className="h-5 w-5 text-gold-soft shrink-0" />
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="px-2 py-1 rounded-full bg-white/5">{song.type}</span>
                <span className="px-2 py-1 rounded-full bg-white/5">{song.difficulty}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/play" className="btn-gold btn-gold-hover px-6 py-3 rounded-full font-medium inline-flex items-center gap-2">
            <Piano className="h-4 w-4" /> Practice Now on Harmonium
          </Link>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "What is an online harmonium?",
      a: "An online harmonium is a virtual version of the traditional Indian harmonium that you can play directly in your browser. It features realistic sampled reed sounds, sargam labels, and supports both mouse/touch and computer keyboard input. It's perfect for learning and practicing Indian classical music without needing a physical instrument."
    },
    {
      q: "Can I play harmonium online for free?",
      a: "Yes! Our online harmonium is completely free to use. There are no downloads, no sign-ups, and no hidden fees. Just visit our website and start playing instantly. We offer a full-featured virtual harmonium with multiple presets, sargam labels, and MIDI support at no cost."
    },
    {
      q: "Can beginners learn harmonium using this website?",
      a: "Absolutely! Our virtual harmonium is perfect for beginners. It includes sargam labels (Sa Re Ga Ma), western note labels, keyboard mappings, and practice modes. You can start with basic scales and gradually move to complex ragas and songs. The interface is intuitive and works on all devices."
    },
    {
      q: "What are Sa Re Ga Ma notes?",
      a: "Sa Re Ga Ma are the seven basic notes (swaras) in Indian classical music. Sa is the tonic — the reference pitch everything else is measured from — so its Western letter depends on the key you choose. When Sa = C, the notes map to C, D, E, F, G, A, B. Sa and Pa are always natural (achal); Re, Ga, Dha, and Ni can be komal (flat), and Ma can be tivra (sharp), depending on the raga. On our harmonium, all swaras are clearly labeled to help you learn and practice."
    },
    {
      q: "Does this work on mobile?",
      a: "Yes! Our virtual harmonium is fully optimized for mobile phones and tablets. The touch interface is responsive and intuitive, allowing you to play notes by simply tapping the screen. You can practice harmonium anywhere - at home, while traveling, or during breaks."
    },
    {
      q: "Is there a way to practice harmonium songs?",
      a: "Yes. Our harmonium songs page lists beginner-friendly ragas, bhajans, and aartis with difficulty levels and note guidance, and you can play each one directly on the virtual harmonium. Start with simple pieces like Om Jai Jagdish Hare or Raga Bhupali, then progress to more complex ragas as your technique grows."
    },
  ];

  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-display mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass rounded-2xl p-6">
              <h3 className="font-display text-lg mb-2">{faq.q}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  { icon: WifiOff, title: "No installation", desc: "Runs entirely in your browser. Zero setup." },
  { icon: Music, title: "Real sampled reeds", desc: "Warm harmonium tone with authentic bellows breath." },
  { icon: Cable, title: "MIDI-ready", desc: "Plug in a MIDI controller for expressive play." },
  { icon: BookOpen, title: "Learn ragas", desc: "Sargam labels, scales and practice modes." },
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
    { title: "Harmonium", desc: "Play a full 27-key scale-changer harmonium with authentic reed presets.", to: "/play" },
    { title: "MIDI Play", desc: "Plug in a MIDI keyboard for expressive, low-latency practice.", to: "/play" },
    { title: "Learn", desc: "Sargam and western note labels on every key.", to: "/learn" },
  ];
  return (
    <section id="modes" className="pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <div>© {new Date().getFullYear()} Online Harmonium - Riyaz. Crafted for musicians.</div>
        <div className="flex gap-6 flex-wrap justify-center">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <Link to="/play" className="hover:text-foreground">Play Harmonium</Link>
          <Link to="/learn" className="hover:text-foreground">Learn</Link>
          <Link to="/harmonium-notes" className="hover:text-foreground">Harmonium Notes</Link>
          <Link to="/how-to-play-harmonium" className="hover:text-foreground">How to Play</Link>
          <Link to="/harmonium-songs" className="hover:text-foreground">Harmonium Songs</Link>
        </div>
      </div>
    </footer>
  );
}