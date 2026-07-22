import { createFileRoute, Link } from "@tanstack/react-router";
import { Harmonium } from "@/components/Harmonium";
import { Tanpura } from "@/components/Tanpura";
import { Metronome } from "@/components/Metronome";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/play")({
  head: () => ({
    meta: [
      { title: "Play — Virtual Harmonium · Riyaz" },
      { name: "description", content: "Play a realistic online harmonium with tanpura drone and metronome. Sargam and western note labels, three or five octaves, and computer keyboard support." },
      { property: "og:title", content: "Play the Virtual Harmonium" },
      { property: "og:description", content: "Realistic sampled harmonium with tanpura and metronome. Play in the browser, free." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/play" },
      { name: "twitter:card", content: "summary_large_image" },
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
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg btn-gold grid place-items-center font-display font-bold text-sm">R</div>
          <span className="font-display font-semibold tracking-tight">Riyaz</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <Harmonium />
          <aside className="flex flex-col gap-4">
            <Tanpura />
            <Metronome />
          </aside>
        </div>
      </main>
    </div>
  );
}
