import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Zap } from "lucide-react";

export const Route = createFileRoute("/virtual-harmonium")({
  head: () => ({
    meta: [
      { title: "Virtual Harmonium - Best Online Indian Keyboard Instrument | Riyaz" },
      { name: "description", content: "Experience the best virtual harmonium online. Realistic Indian keyboard instrument with sampled reeds, sargam labels, and MIDI support. Free to play in your browser." },
      { name: "keywords", content: "virtual harmonium, best online harmonium, Indian keyboard instrument, online Indian instrument, virtual Indian harmonium, digital harmonium" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:title", content: "Virtual Harmonium - Best Online Indian Keyboard Instrument" },
      { property: "og:description", content: "Discover the best virtual harmonium online. Realistic Indian keyboard with sampled reeds, sargam labels, and MIDI support." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://onlineharmonium.vercel.app/virtual-harmonium" },
      { property: "og:image", content: "https://onlineharmonium.vercel.app/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Virtual Harmonium - Online Indian Keyboard Instrument" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Virtual Harmonium - Best Online Indian Keyboard Instrument" },
      { name: "twitter:description", content: "Discover the best virtual harmonium online. Realistic Indian keyboard with sampled reeds and sargam labels." },
      { name: "twitter:image", content: "https://onlineharmonium.vercel.app/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://onlineharmonium.vercel.app/virtual-harmonium" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://onlineharmonium.vercel.app/" },
            { "@type": "ListItem", position: 2, name: "Virtual Harmonium", item: "https://onlineharmonium.vercel.app/virtual-harmonium" },
          ],
        }),
      },
    ],
  }),
  component: VirtualHarmoniumPage,
});

function VirtualHarmoniumPage() {
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
        <h1 className="text-4xl md:text-5xl font-display mb-6">Virtual Harmonium - The Best Online Indian Keyboard Instrument</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Discover the most realistic <strong>virtual harmonium</strong> available online.
          Experience authentic Indian classical music with our premium <strong>online Indian keyboard instrument</strong>.
          Free, instant, and perfect for learning.
        </p>

        <section className="mb-12">
          <h2 className="text-3xl font-display mb-6">What Makes Our Virtual Harmonium Special?</h2>
          <div className="space-y-4 text-muted-foreground mb-6">
            <p>
              A <strong>virtual harmonium</strong> is a digital recreation of the traditional Indian harmonium (reed organ).
              Our version stands out as the <strong>best online harmonium</strong> due to its realistic sampled sounds,
              authentic bellows animation, and professional-grade features.
            </p>
            <p>
              Unlike basic online instruments, our <strong>virtual Indian harmonium</strong> captures the nuances
              of a real harmonium - from the breathing bellows to the rich reed tones. It's a true
              <strong> Indian keyboard instrument</strong> that responds naturally to your playing style.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-xl mb-3">🎹 Authentic Sound Engine</h3>
              <p className="text-sm text-muted-foreground">
                High-quality sampled reeds from premium instruments. Each note has been carefully recorded
                to capture the warm, organic tone of a real harmonium bellows.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-xl mb-3">🎨 Multiple Presets</h3>
              <p className="text-sm text-muted-foreground">
                Choose from Old Delhi, Scale Changer, Concert, and Vintage presets. Each offers a unique
                tonal character suitable for different musical styles.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-xl mb-3">📱 Responsive Design</h3>
              <p className="text-sm text-muted-foreground">
                Works flawlessly on desktop, tablet, and mobile. The interface adapts to your screen size
                while maintaining playability and visual clarity.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-xl mb-3">⚡ Low Latency</h3>
              <p className="text-sm text-muted-foreground">
                Optimized audio engine ensures zero-delay response. Every keystroke produces sound instantly,
                just like a real instrument.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-display mb-6">Comparing Virtual vs Real Harmonium</h2>
          <div className="glass rounded-2xl p-6 sm:p-8">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 font-display">Feature</th>
                    <th className="text-center py-3 px-4 font-display">Real Harmonium</th>
                    <th className="text-center py-3 px-4 font-display">Virtual Harmonium</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4">Cost</td>
                    <td className="text-center py-3 px-4">$200-$2000+</td>
                    <td className="text-center py-3 px-4 text-gold-soft">Free</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4">Maintenance</td>
                    <td className="text-center py-3 px-4">Requires tuning, bellows repair</td>
                    <td className="text-center py-3 px-4 text-gold-soft">None needed</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4">Portability</td>
                    <td className="text-center py-3 px-4">Heavy, bulky</td>
                    <td className="text-center py-3 px-4 text-gold-soft">Play anywhere</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4">Sound Quality</td>
                    <td className="text-center py-3 px-4">Authentic acoustic</td>
                    <td className="text-center py-3 px-4 text-gold-soft">Sampled realism</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4">Learning Tools</td>
                    <td className="text-center py-3 px-4">Limited</td>
                    <td className="text-center py-3 px-4 text-gold-soft">Sargam labels, MIDI</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Practice Anytime</td>
                    <td className="text-center py-3 px-4">Depends on instrument</td>
                    <td className="text-center py-3 px-4 text-gold-soft">24/7 access</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-display mb-6">Who Should Use a Virtual Harmonium?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-lg mb-2">🎓 Beginners</h3>
              <p className="text-sm text-muted-foreground">
                Start learning Indian classical music without investing in an expensive instrument.
                Practice <strong>Sa Re Ga Ma</strong> and basic ragas with visual guidance.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-lg mb-2">🎵 Intermediate Players</h3>
              <p className="text-sm text-muted-foreground">
                Refine your technique and learn new <strong>harmonium songs</strong>.
                Use the MIDI support to connect with other music software.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-lg mb-2">🏆 Advanced Musicians</h3>
              <p className="text-sm text-muted-foreground">
                Practice complex ragas and compositions anywhere. The realistic sound engine
                is suitable for professional <strong>harmonium practice online</strong>.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-lg mb-2">✈️ Traveling Musicians</h3>
              <p className="text-sm text-muted-foreground">
                Can't take your harmonium on vacation? Our <strong>virtual harmonium</strong> goes where you go.
                Practice on any device with internet access.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-display mb-6">Getting the Best Experience</h2>
          <div className="glass rounded-2xl p-6 sm:p-8">
            <div className="space-y-4 text-sm text-muted-foreground">
              <p><strong className="text-foreground">💻 Use a good device:</strong> For the best experience, use a computer or tablet with a decent speaker or headphones.</p>
              <p><strong className="text-foreground">🎧 Use headphones:</strong> Connect headphones for immersive practice and to avoid disturbing others.</p>
              <p><strong className="text-foreground">🎹 Connect a MIDI keyboard:</strong> If you have a MIDI controller, connect it for expressive playing with velocity sensitivity.</p>
              <p><strong className="text-foreground">📶 Stable internet:</strong> While it works offline after first load, a stable connection ensures smooth initial experience.</p>
              <p><strong className="text-foreground">🎯 Regular practice:</strong> Even 15-20 minutes daily on this <strong>digital harmonium</strong> yields great results.</p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-display mb-4">Try the Best Virtual Harmonium Today</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of musicians who use our <strong>virtual harmonium</strong> for practice and learning.
            It's free, instant, and requires no downloads.
          </p>
          <Link to="/play" className="btn-gold btn-gold-hover px-8 py-4 rounded-full font-medium inline-flex items-center gap-2 text-lg">
            <Zap className="h-5 w-5" /> Start Playing Now
          </Link>
        </section>
      </main>
    </div>
  );
}