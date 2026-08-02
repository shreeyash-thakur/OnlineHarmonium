import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Riyaz — Online Harmonium" },
      {
        name: "description",
        content: "Terms of service for using the Riyaz online harmonium website.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Terms of Service | Riyaz — Online Harmonium" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://onlineharmonium.vercel.app/terms" },
    ],
    links: [{ rel: "canonical", href: "https://onlineharmonium.vercel.app/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  const lastUpdated = "August 2, 2026";
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
        <h1 className="text-4xl md:text-5xl font-display mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: {lastUpdated}</p>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-display text-foreground mb-2">Acceptance of terms</h2>
            <p>
              By using Riyaz ("the site"), a free virtual harmonium available at
              onlineharmonium.vercel.app, you agree to these terms. If you do not agree, please do
              not use the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display text-foreground mb-2">Use of the site</h2>
            <p>
              Riyaz is provided free of charge for personal, educational, and recreational use —
              practicing scales, learning sargam, or simply playing music. You agree not to use the
              site for any unlawful purpose, to attempt to disrupt or reverse-engineer the service
              beyond what open-source licensing permits, or to interfere with other visitors' use of
              the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display text-foreground mb-2">No account required</h2>
            <p>
              Riyaz does not require you to create an account. Any preferences (such as your chosen
              preset or note-label style) are stored locally in your browser and are your
              responsibility to manage; clearing your browser data will reset them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display text-foreground mb-2">Advertising</h2>
            <p>
              The site may display advertising served through Google AdSense to help cover hosting
              costs. See our{" "}
              <Link to="/privacy-policy" className="text-gold-soft hover:underline">
                Privacy Policy
              </Link>{" "}
              for details on how ad providers may use cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display text-foreground mb-2">Intellectual property</h2>
            <p>
              The Riyaz name, design, and original audio samples are the property of the site owner
              unless otherwise noted. You may not redistribute the site's code or samples as your
              own commercial product without permission, subject to the terms of any open-source
              license under which the project's code is published.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display text-foreground mb-2">No warranty</h2>
            <p>
              Riyaz is provided "as is" without warranties of any kind. We do our best to keep the
              instrument accurate and the site available, but we do not guarantee uninterrupted or
              error-free operation, and we are not liable for any loss arising from your use of the
              site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display text-foreground mb-2">Changes to these terms</h2>
            <p>
              We may update these terms from time to time. Continued use of the site after changes
              are posted means you accept the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display text-foreground mb-2">Contact</h2>
            <p>
              Questions about these terms? Visit the{" "}
              <Link to="/contact" className="text-gold-soft hover:underline">
                Contact page
              </Link>
              .
            </p>
          </section>
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
            <Link to="/contact" className="hover:text-foreground">
              Contact
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
