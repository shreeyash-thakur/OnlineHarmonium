import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Music } from "lucide-react";

export const Route = createFileRoute("/harmonium-notes")({
  head: () => ({
    meta: [
      { title: "Harmonium Notes - Sa Re Ga Ma | Learn Indian Classical Music Online" },
      { name: "description", content: "Learn harmonium notes (Sa Re Ga Ma) and Indian classical music scales. Complete guide to sargam, ragas, and practicing harmonium notes online for beginners and advanced players." },
      { name: "keywords", content: "harmonium notes, Sa Re Ga Ma, sargam, Indian classical music notes, harmonium sargam, learn Sa Re Ga Ma, harmonium raga, musical notes harmonium, Indian music scale" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:title", content: "Harmonium Notes - Sa Re Ga Ma | Learn Indian Classical Music Online" },
      { property: "og:description", content: "Master harmonium notes (Sa Re Ga Ma) with our comprehensive guide. Learn sargam, practice ragas, and improve your Indian classical music skills online." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://onlineharmonium.vercel.app/harmonium-notes" },
      { property: "og:image", content: "https://onlineharmonium.vercel.app/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Harmonium Notes - Sa Re Ga Ma Learning Guide" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Harmonium Notes - Sa Re Ga Ma | Learn Indian Classical Music Online" },
      { name: "twitter:description", content: "Master harmonium notes (Sa Re Ga Ma) with our comprehensive guide. Learn sargam, practice ragas, and improve your Indian classical music skills online." },
      { name: "twitter:image", content: "https://onlineharmonium.vercel.app/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://onlineharmonium.vercel.app/harmonium-notes" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://onlineharmonium.vercel.app/" },
            { "@type": "ListItem", position: 2, name: "Harmonium Notes", item: "https://onlineharmonium.vercel.app/harmonium-notes" },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to Learn Harmonium Notes",
          description: "Learn to play harmonium notes (Sa Re Ga Ma) step by step with our online virtual harmonium.",
          step: [
            { "@type": "HowToStep", name: "Open the Harmonium", text: "Visit our play page and wait for the audio engine to initialize." },
            { "@type": "HowToStep", name: "Identify the Notes", text: "Look for Sa Re Ga Ma labels on the harmonium keys." },
            { "@type": "HowToStep", name: "Practice with Keyboard", text: "Use your computer keyboard or touch screen to play each note." },
            { "@type": "HowToStep", name: "Learn Scales", text: "Practice ascending and descending scales to build muscle memory." },
          ],
        }),
      },
    ],
  }),
  component: HarmoniumNotesPage,
});

function HarmoniumNotesPage() {
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
        <h1 className="text-4xl md:text-5xl font-display mb-6">Harmonium Notes (Sa Re Ga Ma)</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Master the fundamentals of Indian classical music with our comprehensive guide to harmonium notes.
          Learn Sa Re Ga Ma, sargam, and practice techniques on our online harmonium.
        </p>

        <section className="mb-12">
          <h2 className="text-3xl font-display mb-4">Understanding Harmonium Notes</h2>
          <p className="text-muted-foreground mb-4">
            The <strong>harmonium</strong> is a staple instrument in Indian classical music. Learning the notes,
            known as <strong>Sa Re Ga Ma</strong> (Sargam), is essential for any aspiring musician.
            Our virtual harmonium makes it easy to practice these notes online.
          </p>

          <div className="glass rounded-2xl p-6 sm:p-8 mb-6">
            <h3 className="font-display text-2xl mb-4">The Seven Notes (Saptak)</h3>
            <p className="text-sm text-muted-foreground mb-4">
              In Indian classical music, <strong>Sa</strong> is the <em>tonic</em> — the reference pitch
              everything else is built from. Sa is not fixed to any particular Western note. If you set
              Sa = C, the mapping below applies. But if you choose a different tonic (using the scale
              changer on the harmonium), every Western note shifts accordingly.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { sargam: "Sa (S)", western: "C (Do) — when Sa = C", desc: "The tonic note. The starting point of all ragas. Sa is always shuddha (natural)." },
                { sargam: "Re (R)", western: "D (Re) — when Sa = C", desc: "The second note. Can be shuddha (natural) or komal (flat) depending on the raga." },
                { sargam: "Ga (G)", western: "E (Mi) — when Sa = C", desc: "The third note. Can be shuddha (natural) or komal (flat) depending on the raga." },
                { sargam: "Ma (M)", western: "F (Fa) — when Sa = C", desc: "The fourth note. Can be shuddha (natural) or tivra (sharp) depending on the raga." },
                { sargam: "Pa (P)", western: "G (Sol) — when Sa = C", desc: "The fifth note. Pa is always shuddha (natural), like Sa." },
                { sargam: "Dha (D)", western: "A (La) — when Sa = C", desc: "The sixth note. Can be shuddha (natural) or komal (flat) depending on the raga." },
                { sargam: "Ni (N)", western: "B (Ti) — when Sa = C", desc: "The seventh note. Can be shuddha (natural) or komal (flat) depending on the raga." },
              ].map((note) => (
                <div key={note.sargam} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="font-display text-lg text-gold-soft">{note.sargam}</div>
                  <div className="text-xs text-muted-foreground mb-1">{note.western}</div>
                  <p className="text-xs text-muted-foreground">{note.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-6 mb-8">
            <h3 className="font-display text-xl mb-3">Shuddha, Komal, and Tivra Notes</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Each swara (except Sa and Pa) has two forms:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><strong className="text-gold-soft">Shuddha</strong> — the natural position of the note.</li>
              <li><strong className="text-gold-soft">Komal</strong> — the note is flattened (lowered a semitone). Applies to Re, Ga, Dha, and Ni.</li>
              <li><strong className="text-gold-soft">Tivra</strong> — the note is sharpened (raised a semitone). Applies only to Ma.</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-3">
              Sa and Pa are <em>achal</em> (immovable) — they are always shuddha and never komal or tivra.
              This gives 12 total pitch positions across the seven swaras, matching the 12 semitones in a Western octave.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-display mb-4">Practice Tips for Harmonium Notes</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              <strong>Start with Sa:</strong> Begin your practice by focusing on Sa (the tonic). Play it repeatedly
              to develop pitch recognition. Our online harmonium keyboard is perfect for this.
            </p>
            <p>
              <strong>Practice Scales:</strong> Learn the ascending (Aaroh) and descending (Avroh) patterns of basic ragas.
              This will help you understand the relationship between notes.
            </p>
            <p>
              <strong>Use Sargam Labels:</strong> Toggle on Sargam labels on our virtual harmonium to see
              Sa Re Ga Ma on each key. This visual aid accelerates learning.
            </p>
            <p>
              <strong>Slow and Steady:</strong> Practice slowly at first. Speed comes with consistency.
              Use the keyboard mapping (Sa on E) for faster practice sessions.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-display mb-4">Harmonium in Different Octaves</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-xl mb-3">Mandhra Saptak (Lower Octave)</h3>
              <p className="text-sm text-muted-foreground">
                The lower octave adds depth to your playing. These notes are marked with a dot below.
                Practice these to control the bass register of the harmonium.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-xl mb-3">Madhya Saptak (Middle Octave)</h3>
              <p className="text-sm text-muted-foreground">
                The middle octave is where most melodies reside. This is the primary range for
                beginners to master before moving to higher or lower octaves.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-xl mb-3">Tara Saptak (Upper Octave)</h3>
              <p className="text-sm text-muted-foreground">
                The upper octave notes are indicated with a dot above. These are crucial for
                playing complex ragas and adding expression to your performance.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-display mb-4">Common Raga Patterns</h2>
          <p className="text-muted-foreground mb-4">
            Ragas are melodic frameworks in Indian classical music. Each raga has a specific set of notes
            and rules. Here are some basic patterns to practice on your virtual harmonium:
          </p>
          <div className="glass rounded-2xl p-6">
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><strong>Bilaval:</strong> Sa Re Ga Ma Pa Dha Ni Sa — all seven natural (shuddha) notes. The equivalent of a Western major scale.</li>
              <li><strong>Bhairav:</strong> Sa <em>komal Re</em> Ga Ma Pa <em>komal Dha</em> Ni Sa — komal Re and komal Dha give it its grave, devotional character.</li>
              <li><strong>Yaman:</strong> Sa Re Ga <em>tivra Ma</em> Pa Dha Ni Sa — uses a sharpened (tivra) Ma. An evening raga and a common first step into intermediate playing.</li>
              <li><strong>Bhairavi:</strong> Sa <em>komal Re</em> <em>komal Ga</em> Ma Pa <em>komal Dha</em> <em>komal Ni</em> Sa — all four variable notes are komal (Sa and Pa stay shuddha).</li>
              <li><strong>Bhoopali (Bhoop):</strong> Sa Re Ga Pa Dha Sa — a five-note (audav) raga; omits Ma and Ni.</li>
            </ul>
            <p className="mt-4 text-sm">
              Practice these patterns on our <Link to="/play" className="text-gold-soft hover:underline">online harmonium keyboard</Link>,
              or explore the full <Link to="/learn" className="text-gold-soft hover:underline">harmonium lessons</Link> for thaats and alankars.
            </p>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-display mb-4">Start Practicing Now</h2>
          <p className="text-muted-foreground mb-6">
            The best way to learn harmonium notes is by playing. Use our free virtual harmonium to practice
            Sa Re Ga Ma, learn ragas, and develop your skills.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/play" className="btn-gold btn-gold-hover px-6 py-3 rounded-full font-medium inline-flex items-center gap-2">
              <Music className="h-4 w-4" /> Open Harmonium
            </Link>
            <Link to="/learn" className="btn-ghost-gold px-6 py-3 rounded-full font-medium inline-flex items-center gap-2">
              Harmonium Lessons
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-8 mt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>© {new Date().getFullYear()} Online Harmonium - Riyaz</div>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <Link to="/play" className="hover:text-foreground">Play</Link>
            <Link to="/learn" className="hover:text-foreground">Learn</Link>
            <Link to="/harmonium-songs" className="hover:text-foreground">Songs</Link>
            <Link to="/how-to-play-harmonium" className="hover:text-foreground">How to Play</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
