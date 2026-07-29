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

          <div className="glass rounded-2xl p-6 sm:p-8 mb-8">
            <h3 className="font-display text-2xl mb-4">The Seven Notes (Saptak)</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { sargam: "Sa (S)", western: "C (Do)", desc: "The tonic note. The starting point of all ragas." },
                { sargam: "Re (R)", western: "D (Re)", desc: "The second note, whole step above Sa." },
                { sargam: "Ga (G)", western: "E (Mi)", desc: "The third note, another whole step up." },
                { sargam: "Ma (M)", western: "F (Fa)", desc: "The fourth note, half step above Ga." },
                { sargam: "Pa (P)", western: "G (Sol)", desc: "The fifth note, whole step above Ma." },
                { sargam: "Dha (D)", western: "A (La)", desc: "The sixth note, whole step above Pa." },
                { sargam: "Ni (N)", western: "B (Ti)", desc: "The seventh note, whole step above Dha." },
              ].map((note) => (
                <div key={note.sargam} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="font-display text-lg text-gold-soft">{note.sargam}</div>
                  <div className="text-xs text-muted-foreground mb-1">{note.western}</div>
                  <p className="text-xs text-muted-foreground">{note.desc}</p>
                </div>
              ))}
            </div>
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
              <li><strong>Bhairav:</strong> Sa Re Ga Ma Pa Dha Ni Sa (with komal Ga and Dha)</li>
              <li><strong>Yaman:</strong> Sa Re Ga Ma# Pa Dha Ni Sa (with tivra Ma)</li>
              <li><strong>Bhairavi:</strong> Sa Re komal Ga Ma Pa Dha komal Ni Sa</li>
              <li><strong>Bhoop:</strong> Sa Re Ga Pa Dha Sa (pentatonic)</li>
            </ul>
            <p className="mt-4 text-sm">
              Practice these patterns on our <Link to="/play" className="text-gold-soft hover:underline">online harmonium keyboard</Link>.
            </p>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-display mb-4">Start Practicing Now</h2>
          <p className="text-muted-foreground mb-6">
            The best way to learn harmonium notes is by playing. Use our free virtual harmonium to practice
            Sa Re Ga Ma, learn ragas, and develop your skills.
          </p>
          <Link to="/play" className="btn-gold btn-gold-hover px-6 py-3 rounded-full font-medium inline-flex items-center gap-2">
            <Music className="h-4 w-4" /> Open Harmonium
          </Link>
        </section>
      </main>
    </div>
  );
}