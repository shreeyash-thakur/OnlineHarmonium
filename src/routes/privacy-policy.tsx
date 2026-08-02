import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Riyaz — Online Harmonium" },
      {
        name: "description",
        content:
          "Privacy policy for Riyaz Online Harmonium: what data we collect, how cookies and advertising work on this site, and your choices.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Privacy Policy | Riyaz — Online Harmonium" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://onlineharmonium.vercel.app/privacy-policy" },
    ],
    links: [{ rel: "canonical", href: "https://onlineharmonium.vercel.app/privacy-policy" }],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
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
        <h1 className="text-4xl md:text-5xl font-display mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: {lastUpdated}</p>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-display text-foreground mb-2">Overview</h2>
            <p>
              Riyaz ("we", "our", "the site") provides a free virtual harmonium at
              onlineharmonium.vercel.app. This page explains what information is collected when you
              use the site, how it is used, and the choices available to you. We built Riyaz to be
              usable without an account, and the site does not require you to submit any personal
              information to play.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display text-foreground mb-2">Information we collect</h2>
            <p className="mb-2">
              We do not require registration and do not knowingly collect names, email addresses, or
              payment details. The following data may still be collected automatically:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Standard server logs (such as IP address, browser type, device type, and pages
                visited), used only for security and to understand aggregate site traffic.
              </li>
              <li>
                Local settings you configure in the app — such as your chosen preset, note labels,
                or theme — which are stored only in your browser and are never sent to us.
              </li>
              <li>
                Cookies or similar identifiers placed by third-party services described below.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display text-foreground mb-2">
              Advertising and Google AdSense
            </h2>
            <p className="mb-2">
              This site may show ads served by Google AdSense. Google, as a third-party vendor, uses
              cookies to serve ads based on your prior visits to this and other websites. You can
              opt out of personalized advertising by visiting{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-soft hover:underline"
              >
                Google Ads Settings
              </a>
              . Third-party vendors, including Google, use cookies to serve ads based on your visits
              to this site and/or other sites on the Internet. You may also visit{" "}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-soft hover:underline"
              >
                www.aboutads.info
              </a>{" "}
              to opt out of the use of cookies by some third-party ad vendors.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display text-foreground mb-2">Analytics</h2>
            <p>
              We may use privacy-respecting analytics tools to understand how visitors use the site
              (for example, which pages are popular) so we can improve it. Any analytics data is
              aggregated and is not used to identify you personally.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display text-foreground mb-2">Cookies</h2>
            <p>
              Cookies are small text files stored on your device. We use them, or allow trusted
              third parties such as Google to use them, for the purposes above. Most browsers let
              you refuse or delete cookies via their settings; doing so may affect ad
              personalization but will not prevent you from using the harmonium itself.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display text-foreground mb-2">Children's privacy</h2>
            <p>
              Riyaz is a general-audience tool and does not knowingly collect personal information
              from children. If you believe a child has provided us with personal information,
              please contact us using the details below and we will remove it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display text-foreground mb-2">Your choices</h2>
            <p>
              You can use most of Riyaz's features without any personal data being collected. You
              can clear your browser's local storage at any time to remove locally saved
              preferences, and you can use browser or Google Ads settings to control ad
              personalization as described above.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display text-foreground mb-2">Changes to this policy</h2>
            <p>
              We may update this policy from time to time to reflect changes to the site or legal
              requirements. Updates will be posted on this page with a revised "last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display text-foreground mb-2">Contact us</h2>
            <p>
              Questions about this policy or how your data is handled? Reach out via the{" "}
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
            <Link to="/terms" className="hover:text-foreground">
              Terms
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
