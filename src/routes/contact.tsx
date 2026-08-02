import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Mail, Github } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Riyaz — Online Harmonium" },
      {
        name: "description",
        content:
          "Get in touch about Riyaz — the free online harmonium. Report bugs, suggest features, or ask a question.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Contact Us | Riyaz — Online Harmonium" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://onlineharmonium.vercel.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://onlineharmonium.vercel.app/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
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
        <h1 className="text-4xl md:text-5xl font-display mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground mb-10">
          Found a bug, have a feature idea, or just want to say hello? We'd love to hear from you.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href="mailto:shreeyashganeshthakur@gmail.com?subject=Riyaz%20Online%20Harmonium"
            className="glass rounded-2xl p-6 hover:border-gold/30 transition-colors flex items-start gap-4"
          >
            <div className="h-11 w-11 rounded-xl grid place-items-center btn-ghost-gold shrink-0">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display text-lg mb-1">Email</div>
              <p className="text-sm text-muted-foreground">shreeyashganeshthakur@gmail.com</p>
            </div>
          </a>

          <a
            href="https://github.com/shreeyash-thakur/OnlineHarmonium/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-2xl p-6 hover:border-gold/30 transition-colors flex items-start gap-4"
          >
            <div className="h-11 w-11 rounded-xl grid place-items-center btn-ghost-gold shrink-0">
              <Github className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display text-lg mb-1">GitHub Issues</div>
              <p className="text-sm text-muted-foreground">
                Report bugs or request features directly on the project repository.
              </p>
            </div>
          </a>
        </div>

        <p className="text-sm text-muted-foreground mt-10">
          We try to respond to every message, though it may take a few days. For questions about how
          your data is handled, see our{" "}
          <Link to="/privacy-policy" className="text-gold-soft hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
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
            <Link to="/about" className="hover:text-foreground">
              About
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
