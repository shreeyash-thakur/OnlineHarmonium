import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen } from "lucide-react";
import { PracticeMode } from "@/components/PracticeMode";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "Harmonium Practice Exercises — Interactive Sa Re Ga Ma Trainer | Riyaz" },
      {
        name: "description",
        content:
          "Practice harmonium online with interactive exercises. Play Sa Re Ga Ma, scales, and ascending-descending patterns with real-time feedback on the virtual harmonium.",
      },
      {
        name: "keywords",
        content:
          "harmonium practice, harmonium exercises, Sa Re Ga Ma practice, harmonium practice online, harmonium alankars, sargam practice, learn harmonium for beginners",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      {
        property: "og:title",
        content: "Harmonium Practice Exercises — Interactive Sa Re Ga Ma Trainer",
      },
      {
        property: "og:description",
        content:
          "Practice harmonium online with interactive exercises. Play Sa Re Ga Ma and scales with real-time feedback on the virtual harmonium.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://onlineharmonium.vercel.app/practice" },
      { property: "og:image", content: "https://onlineharmonium.vercel.app/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Interactive Harmonium Practice Exercises" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Harmonium Practice Exercises — Interactive Sa Re Ga Ma Trainer",
      },
      {
        name: "twitter:description",
        content:
          "Practice harmonium online with interactive exercises. Play Sa Re Ga Ma and scales with real-time feedback.",
      },
      { name: "twitter:image", content: "https://onlineharmonium.vercel.app/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://onlineharmonium.vercel.app/practice" }],
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
              name: "Practice",
              item: "https://onlineharmonium.vercel.app/practice",
            },
          ],
        }),
      },
    ],
  }),
  component: PracticePage,
});

function PracticePage() {
  return (
    <div className="min-h-screen">
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg btn-gold grid place-items-center font-display font-bold text-sm">
              R
            </div>
            <span className="font-display font-semibold tracking-tight">Riyaz</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        <h1 className="text-4xl md:text-5xl font-display mb-4">Harmonium Practice Exercises</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Interactive practice mode for beginners. Each exercise shows you the next note to play,
          listens to your keyboard input, and gives you instant feedback. Use the same computer keys
          as the harmonium (Sa is on{" "}
          <kbd className="px-2 py-1 rounded bg-white/10 font-mono">E</kbd>).
        </p>

        <PracticeMode />

        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <Link to="/play" className="glass rounded-2xl p-5 hover:border-gold/30 transition-colors">
            <h2 className="font-display text-lg mb-1">Play the Harmonium</h2>
            <p className="text-sm text-muted-foreground">
              Open the full 27-key virtual harmonium and play freely.
            </p>
          </Link>
          <Link
            to="/learn"
            className="glass rounded-2xl p-5 hover:border-gold/30 transition-colors"
          >
            <h2 className="font-display text-lg mb-1">Learn Harmonium</h2>
            <p className="text-sm text-muted-foreground">
              Full course: sargam, alankars, thaats, taal, and a riyaz routine.
            </p>
          </Link>
        </div>
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
            <Link to="/harmonium-songs" className="hover:text-foreground">
              Songs
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
