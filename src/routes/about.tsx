import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Riyaz | Free Online Harmonium" },
      {
        name: "description",
        content:
          "Learn about Riyaz, a free virtual harmonium built with realistic sampled reeds, sargam labels, MIDI support, and interactive lessons for Indian classical music.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "About Riyaz | Free Online Harmonium" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://onlineharmonium.vercel.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://onlineharmonium.vercel.app/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
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
        <h1 className="text-4xl md:text-5xl font-display mb-6">About Riyaz</h1>

        <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
          <p>
            Riyaz is a free, browser-based harmonium built for anyone who wants to play, practice,
            or learn Indian classical music without needing a physical instrument. "Riyaz" is the
            Hindi/Urdu word for disciplined musical practice — and that's exactly what this tool is
            for.
          </p>
          <p>
            The instrument uses realistic sampled reed sounds instead of synthetic tones, a 27-key
            scale-changer layout matching a traditional harmonium, and sargam (Sa Re Ga Ma) labels
            alongside western note names so both trained musicians and complete beginners can find
            their way around. You can play with your computer keyboard, mouse, touchscreen, or a
            connected MIDI controller.
          </p>
          <p>
            Beyond the instrument itself, the site includes a guided{" "}
            <Link to="/learn" className="text-gold-soft hover:underline">
              learning path
            </Link>
            , interactive{" "}
            <Link to="/practice" className="text-gold-soft hover:underline">
              practice exercises
            </Link>
            , a{" "}
            <Link to="/harmonium-notes" className="text-gold-soft hover:underline">
              reference guide to harmonium notes
            </Link>
            , and{" "}
            <Link to="/harmonium-songs" className="text-gold-soft hover:underline">
              simple songs
            </Link>{" "}
            you can learn to play, so it works whether you're picking up the instrument for the
            first time or keeping up a daily riyaz routine.
          </p>
          <p>
            Riyaz is an independent, ad-supported project — it's free to use, and a small amount of
            advertising helps cover hosting costs so it can stay free. We don't require an account
            or collect personal information to use the harmonium; see our{" "}
            <Link to="/privacy-policy" className="text-gold-soft hover:underline">
              Privacy Policy
            </Link>{" "}
            for details.
          </p>
          <p>
            Have feedback, found a bug, or want to suggest a feature? We'd love to hear from you on
            the{" "}
            <Link to="/contact" className="text-gold-soft hover:underline">
              Contact page
            </Link>
            .
          </p>
        </div>
      </main>

      <footer className="border-t border-white/5 py-8 mt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>© {new Date().getFullYear()} Online Harmonium - Riyaz</div>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <Link to="/privacy-policy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link to="/contact" className="hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
