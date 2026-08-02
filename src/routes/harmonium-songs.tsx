import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Music } from "lucide-react";

export const Route = createFileRoute("/harmonium-songs")({
  head: () => ({
    meta: [
      { title: "Harmonium Songs for Beginners - Learn Popular Bhajans and Ragas" },
      {
        name: "description",
        content:
          "Discover popular harmonium songs for beginners including bhajans, aartis, and classical ragas. Learn to play harmonium songs step by step with notes and guidance.",
      },
      {
        name: "keywords",
        content:
          "harmonium songs, harmonium songs for beginners, learn harmonium songs, bhajan harmonium, harmonium aarti, harmonium raga, Indian classical songs, harmonium tutorial songs",
      },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      {
        property: "og:title",
        content: "Harmonium Songs for Beginners - Learn Popular Bhajans and Ragas",
      },
      {
        property: "og:description",
        content:
          "Learn popular harmonium songs for beginners. Easy bhajans, aartis, and ragas with step-by-step guidance on our virtual harmonium.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://onlineharmonium.vercel.app/harmonium-songs" },
      { property: "og:image", content: "https://onlineharmonium.vercel.app/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Harmonium Songs for Beginners Learning Guide" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Harmonium Songs for Beginners - Learn Popular Bhajans and Ragas",
      },
      {
        name: "twitter:description",
        content:
          "Master popular harmonium songs with our guide. Easy bhajans, aartis, and ragas for beginners on virtual harmonium.",
      },
      { name: "twitter:image", content: "https://onlineharmonium.vercel.app/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://onlineharmonium.vercel.app/harmonium-songs" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://onlineharmonium.vercel.app/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Harmonium Songs",
              item: "https://onlineharmonium.vercel.app/harmonium-songs",
            },
          ],
        }),
      },
    ],
  }),
  component: HarmoniumSongsPage,
});

function HarmoniumSongsPage() {
  const songs = [
    {
      title: "Raga Bhupali",
      difficulty: "Beginner",
      type: "Raga",
      notes:
        "Audav (5-note) raga. Aaroh: S R G P D S. Avroh: S D P G R S. Omits Ma and Ni. Thaat: Kalyan. A great first raga to learn.",
    },
    {
      title: "Raga Yaman",
      difficulty: "Beginner",
      type: "Raga",
      notes:
        "Seven notes with tivra Ma. Aaroh: N R G M' D N S. Avroh: S N D M' G R S. Thaat: Kalyan. An evening raga and a common introduction to tivra Ma.",
    },
    {
      title: "Raga Brindavani Sarang",
      difficulty: "Intermediate",
      type: "Raga",
      notes:
        "Uses komal Ni. Aaroh: S R M P N S. Avroh: S N P M G R S. Thaat: Kafi. Popular for bhajans and short classical pieces.",
    },
    {
      title: "Raga Bhairavi",
      difficulty: "Advanced",
      type: "Raga",
      notes:
        "All four variable notes are komal (Re, Ga, Dha, Ni); Sa and Pa stay shuddha. Thaat: Bhairavi. Traditionally associated with morning, though often performed as a concluding raga.",
    },
    {
      title: "Raga Durga",
      difficulty: "Beginner",
      type: "Raga",
      notes:
        "Audav raga. Aaroh: S R M P D S. Avroh: S D P M R S. Omits Ga and Ni. Thaat: Bilaval. A gentle, approachable pentatonic raga.",
    },
    {
      title: "Raga Asavari",
      difficulty: "Intermediate",
      type: "Raga",
      notes:
        "Komal Ga, Dha, Ni. Aaroh: S R G M P D N S. Avroh: S n D P M g R S. Thaat: Asavari. A morning raga with a plaintive, descending character.",
    },
    {
      title: "Om Jai Jagdish Hare",
      difficulty: "Beginner",
      type: "Aarti",
      notes:
        "A traditional aarti with a simple, repetitive melodic pattern — well suited to beginners learning to accompany group singing.",
    },
    {
      title: "Gayatri Mantra",
      difficulty: "Beginner",
      type: "Mantra",
      notes:
        "A short, repetitive chant pattern. Good for practicing steady tempo and even note duration.",
    },
  ];

  return (
    <div className="min-h-screen">
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg btn-gold grid place-items-center font-display font-bold text-sm">
            R
          </div>
          <span className="font-display font-semibold tracking-tight">Riyaz</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <h1 className="text-4xl md:text-5xl font-display mb-6">Harmonium Songs for Beginners</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Learn to play popular harmonium songs including bhajans, aartis, and classical ragas. Our
          collection is perfect for beginners and intermediate players.
        </p>

        <section className="mb-12">
          <h2 className="text-3xl font-display mb-6">Why Learn Harmonium Songs?</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Learning <strong>harmonium songs</strong> is one of the most rewarding aspects of
              studying Indian classical music. Songs provide context for the notes you're learning
              and make practice sessions more enjoyable.
            </p>
            <p>
              For <strong>beginners</strong>, we recommend starting with simple pieces like{" "}
              <em>Om Jai Jagdish Hare</em> or
              <em> Raga Bhupali</em>. These use repetitive or pentatonic patterns that are easy to
              memorize. Once you're comfortable, the{" "}
              <Link to="/learn" className="text-gold-soft hover:underline">
                harmonium lessons
              </Link>{" "}
              page walks you through sargam, alankars, and thaats that support every song here.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-display mb-6">Popular Harmonium Songs</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {songs.map((song, i) => (
              <motion.div
                key={song.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-2xl p-5 hover:border-gold/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display text-lg">{song.title}</h3>
                  <Music className="h-5 w-5 text-gold-soft shrink-0" />
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <span className="px-2 py-1 rounded-full bg-white/5">{song.type}</span>
                  <span className="px-2 py-1 rounded-full bg-white/5">{song.difficulty}</span>
                </div>
                <p className="text-xs text-muted-foreground">{song.notes}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-display mb-6">Tips for Learning Harmonium Songs</h2>
          <div className="glass rounded-2xl p-6 sm:p-8">
            <div className="grid sm:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">🎧 Listen First</h3>
                <p>Listen to professional renditions of the song before trying to play it.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">🎹 Slow Practice</h3>
                <p>
                  Start at half speed. Focus on hitting the right notes before increasing tempo.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">📝 Break It Down</h3>
                <p>Learn the song in small sections (4-8 notes at a time).</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">🔁 Repeat Daily</h3>
                <p>Practice the same song daily for a week before moving to a new one.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-display mb-4">Start Practicing Songs</h2>
          <p className="text-muted-foreground mb-6">
            The best way to <strong>learn harmonium songs</strong> is by playing. Use our free
            virtual harmonium, and review the{" "}
            <Link to="/harmonium-notes" className="text-gold-soft hover:underline">
              harmonium notes
            </Link>{" "}
            guide if you need a refresher on Sa Re Ga Ma.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/play"
              className="btn-gold btn-gold-hover px-6 py-3 rounded-full font-medium inline-flex items-center gap-2"
            >
              <Music className="h-4 w-4" /> Open Harmonium
            </Link>
            <Link
              to="/learn"
              className="btn-ghost-gold px-6 py-3 rounded-full font-medium inline-flex items-center gap-2"
            >
              Harmonium Lessons
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-8 mt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>© {new Date().getFullYear()} Online Harmonium - Riyaz</div>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <Link to="/play" className="hover:text-foreground">
              Play
            </Link>
            <Link to="/learn" className="hover:text-foreground">
              Learn
            </Link>
            <Link to="/harmonium-notes" className="hover:text-foreground">
              Notes
            </Link>
            <Link to="/how-to-play-harmonium" className="hover:text-foreground">
              How to Play
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
