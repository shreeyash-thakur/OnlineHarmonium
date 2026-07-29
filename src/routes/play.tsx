import { createFileRoute, Link } from "@tanstack/react-router";
import { Harmonium } from "@/components/Harmonium";
import { AdSlot } from "@/components/AdSlot";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/play")({
  head: () => ({
    meta: [
      { title: "Play Virtual Harmonium Online — Free, Realistic Sampled Reeds | Riyaz" },
      { name: "description", content: "Play a realistic online harmonium free in your browser. 27-key scale-changer layout, sargam and western labels, and computer keyboard support." },
      { name: "keywords", content: "play harmonium online, virtual harmonium, online harmonium keyboard, harmonium sargam" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: "Play the Virtual Harmonium — Free Online" },
      { property: "og:description", content: "Realistic sampled harmonium, playable in the browser, free." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://onlineharmonium.vercel.app/play" },
      { property: "og:image", content: "https://onlineharmonium.vercel.app/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Play the Virtual Harmonium Online" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Play Virtual Harmonium Online" },
      { name: "twitter:description", content: "Realistic sampled harmonium. Play free in your browser." },
      { name: "twitter:image", content: "https://onlineharmonium.vercel.app/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://onlineharmonium.vercel.app/play" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://onlineharmonium.vercel.app/" },
            { "@type": "ListItem", position: 2, name: "Play", item: "https://onlineharmonium.vercel.app/play" },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Riyaz Virtual Harmonium",
          applicationCategory: "MusicApplication",
          operatingSystem: "Any (Web Browser)",
          url: "https://onlineharmonium.vercel.app/play",
          description: "Play a realistic online harmonium free in your browser. 27-key scale-changer layout, sargam and western labels, and computer keyboard support.",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          browserRequirements: "Requires JavaScript. Requires HTML5.",
        }),
      },
    ],
  }),
  component: PlayPage,
});

function PlayPage() {
  return (
    <div className="min-h-screen">
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
          <ArrowLeft className="h-4 w-4" /> Back
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <h1 className="sr-only">Play the Virtual Harmonium Online</h1>
        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          <Harmonium />
          <aside className="flex flex-col gap-4 lg:self-start">
            <AdSlot />
          </aside>
        </div>
      </main>
    </div>
  );
}
