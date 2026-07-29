



import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";

export const Route = createFileRoute("/how-to-play-harmonium")({
  head: () => ({
    meta: [
      { title: "How to Play Harmonium Online - Complete Guide for Beginners" },
      { name: "description", content: "Learn how to play harmonium online with our step-by-step guide. Discover keyboard controls, mobile touch tips, and beginner-friendly techniques to master the virtual harmonium." },
      { name: "keywords", content: "how to play harmonium online, learn harmonium online, harmonium tutorial, harmonium for beginners, play harmonium, harmonium guide, virtual harmonium tutorial, harmonium learning tips" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:title", content: "How to Play Harmonium Online - Complete Guide for Beginners" },
      { property: "og:description", content: "Step-by-step tutorial on how to play harmonium online. Learn keyboard controls, mobile touch techniques, and beginner tips for the virtual harmonium." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://onlineharmonium.vercel.app/how-to-play-harmonium" },
      { property: "og:image", content: "https://onlineharmonium.vercel.app/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "How to Play Harmonium Online - Tutorial Guide" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "How to Play Harmonium Online - Complete Guide for Beginners" },
      { name: "twitter:description", content: "Step-by-step tutorial on how to play harmonium online. Learn keyboard controls, mobile touch techniques, and beginner tips." },
      { name: "twitter:image", content: "https://onlineharmonium.vercel.app/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://onlineharmonium.vercel.app/how-to-play-harmonium" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://onlineharmonium.vercel.app/" },
            { "@type": "ListItem", position: 2, name: "How to Play Harmonium", item: "https://onlineharmonium.vercel.app/how-to-play-harmonium" },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to Play Harmonium Online",
          description: "Learn to play the online virtual harmonium with this comprehensive beginner's guide.",
          step: [
            { "@type": "HowToStep", name: "Open the Harmonium", text: "Go to the play page and wait for the harmonium to load." },
            { "@type": "HowToStep", name: "Choose Your Input", text: "Select computer keyboard or touch screen input method." },
            { "@type": "HowToStep", name: "Learn the Keys", text: "Familiarize yourself with the Sa Re Ga Ma layout on the keys." },
            { "@type": "HowToStep", name: "Practice Basic Notes", text: "Start with individual notes, then progress to scales and songs." },
          ],
        }),
      },
    ],
  }),
  component: HowToPlayPage,
});

function HowToPlayPage() {
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
        <h1 className="text-4xl md:text-5xl font-display mb-6">How to Play Harmonium Online</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Complete beginner's guide to playing harmonium online. Learn everything from basic controls to advanced techniques
          on our virtual harmonium.
        </p>

        <section className="mb-12">
          <h2 className="text-3xl font-display mb-4">Getting Started with Online Harmonium</h2>
          <p className="text-muted-foreground mb-6">
            Playing the <strong>harmonium online</strong> is easy and intuitive. Whether you're using a computer or mobile device,
            our virtual harmonium provides a realistic and responsive experience.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-xl mb-3">🎹 Computer Keyboard Controls</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Use your computer keyboard to play notes. Each key on the keyboard is mapped to a harmonium note.
                For example, <kbd className="px-2 py-1 rounded bg-white/10 font-mono text-sm">E</kbd> plays Sa.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• White keys: A, S, D, F, G, H, J, K, L, ;</li>
                <li>• Black keys: W, E, T, Y, U, O, P</li>
                <li>• Lower octave: Z, X, C, V, B, N, M</li>
              </ul>
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-xl mb-3">📱 Mobile Touch Controls</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Simply tap or touch the on-screen keys to play. The interface is fully responsive and optimized
                for phones and tablets.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Multi-touch support for chords</li>
                <li>• Glide between notes smoothly</li>
                <li>• No special app needed - works in browser</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-display mb-4">Step-by-Step Tutorial</h2>
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full btn-gold grid place-items-center font-display font-bold text-sm shrink-0">1</div>
                <div>
                  <h3 className="font-display text-lg mb-2">Open the Virtual Harmonium</h3>
                  <p className="text-sm text-muted-foreground">
                    Navigate to the <Link to="/play" className="text-gold-soft hover:underline">play harmonium</Link> page.
                    The audio engine will initialize automatically. No download or installation is required.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full btn-gold grid place-items-center font-display font-bold text-sm shrink-0">2</div>
                <div>
                  <h3 className="font-display text-lg mb-2">Choose Your Preset and Labels</h3>
                  <p className="text-sm text-muted-foreground">
                    Select a harmonium preset (Old Delhi, Scale Changer, Concert, Vintage) that suits your style.
                    Toggle between Sargam (Sa Re Ga Ma) and Western note labels to help with learning.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full btn-gold grid place-items-center font-display font-bold text-sm shrink-0">3</div>
                <div>
                  <h3 className="font-display text-lg mb-2">Start Playing Notes</h3>
                  <p className="text-sm text-muted-foreground">
                    Begin by playing individual notes. Focus on Sa (C) first - it's the foundation of all ragas.
                    Practice holding each note and listening to its pitch. Use the on-screen keyboard or your computer keys.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full btn-gold grid place-items-center font-display font-bold text-sm shrink-0">4</div>
                <div>
                  <h3 className="font-display text-lg mb-2">Practice Scales and Songs</h3>
                  <p className="text-sm text-muted-foreground">
                    Once comfortable with individual notes, practice scales (Aaroh and Avroh).
                    Then move on to simple ragas and bhajans. Our <Link to="/harmonium-songs" className="text-gold-soft hover:underline">harmonium songs</Link> page
                    has great beginner pieces to try.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-display mb-4">Essential Tips for Beginners</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass rounded-2xl p-5">
              <h3 className="font-display text-lg mb-2">🎯 Focus on Accuracy</h3>
              <p className="text-sm text-muted-foreground">
                It's better to play slowly and correctly than fast and wrong. Develop muscle memory and pitch recognition.
              </p>
            </div>
            <div className="glass rounded-2xl p-5">
              <h3 className="font-display text-lg mb-2">⏰ Daily Practice</h3>
              <p className="text-sm text-muted-foreground">
                Even 15-20 minutes daily yields better results than irregular long sessions. Consistency is key in <strong>harmonium practice online</strong>.
              </p>
            </div>
            <div className="glass rounded-2xl p-5">
              <h3 className="font-display text-lg mb-2">🎵 Listen Actively</h3>
              <p className="text-sm text-muted-foreground">
                Listen to professional harmonium players. Pay attention to timing, expression, and note transitions.
              </p>
            </div>
            <div className="glass rounded-2xl p-5">
              <h3 className="font-display text-lg mb-2">📝 Record Yourself</h3>
              <p className="text-sm text-muted-foreground">
                Record your practice sessions to track progress. Our virtual harmonium makes it easy to identify areas for improvement.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-display mb-4">Common Mistakes to Avoid</h2>
          <div className="glass rounded-2xl p-6">
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><strong>Skipping basics:</strong> Don't rush into complex songs before mastering Sa Re Ga Ma.</li>
              <li><strong>Ignoring rhythm:</strong> Practice with a metronome or tap your foot to develop timing.</li>
              <li><strong>Not using labels:</strong> Keep Sargam/Western labels on until you've memorized the keys.</li>
              <li><strong>Bad posture:</strong> Sit comfortably with arms at proper height to avoid strain.</li>
              <li><strong>Playing too fast:</strong> Start slow, increase speed only when comfortable.</li>
            </ul>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-display mb-4">Ready to Start Learning?</h2>
          <p className="text-muted-foreground mb-6">
            Now that you know <strong>how to play harmonium online</strong>, it's time to practice.
            Our free virtual harmonium is the perfect tool for beginners.
          </p>
          <Link to="/play" className="btn-gold btn-gold-hover px-6 py-3 rounded-full font-medium inline-flex items-center gap-2">
            <BookOpen className="h-4 w-4" /> Start Practicing
          </Link>
        </section>
      </main>
    </div>
  );
}