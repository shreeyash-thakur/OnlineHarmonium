import { useEffect, useRef } from "react";

// Fixed-size ad space for the /play sidebar. Deliberately uses a FIXED
// pixel size (not AdSense's "auto" responsive format) and is wrapped in a
// sticky, height-capped, overflow-hidden container — so however tall the
// filled ad creative ends up, it can never push the page taller or extend
// the document's scrollbar. It just sits in place on the right.
//
// The AdSense loader script (adsbygoogle.js) is already included site-wide
// in src/routes/__root.tsx, using this same client ID. To go fully live:
//   1. Create a "Display ad" unit in the AdSense dashboard (Ads > By ad
//      unit) sized 300x600 (or 300x250) for this site.
//   2. Replace AD_SLOT below with the slot ID it gives you.
const AD_CLIENT = "ca-pub-5691989206254780";
const AD_SLOT = "0000000000";

// Fixed dimensions — matches a standard 300x600 "half page" unit, capped to
// never exceed the harmonium's own height on desktop.
const AD_WIDTH = 300;
const AD_HEIGHT = 600;

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

function AdUnit() {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense script blocked (ad blocker) or not yet loaded — fail silently,
      // the placeholder label stays visible in place of an ad.
    }
  }, []);

  return (
    <div
      className="relative mx-auto flex items-center justify-center overflow-hidden"
      style={{ width: "100%", maxWidth: AD_WIDTH, height: AD_HEIGHT, maxHeight: AD_HEIGHT }}
    >
      {/* Fixed width/height — no data-full-width-responsive, so AdSense
          fills exactly this box instead of choosing its own (potentially
          taller) size. */}
      <ins
        className="adsbygoogle"
        style={{ display: "inline-block", width: AD_WIDTH, height: AD_HEIGHT }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT}
      />
      {/* Placeholder label — visible only until a real ad fills the slot */}
      <span className="absolute text-[11px] uppercase tracking-widest text-muted-foreground/60 pointer-events-none">
        Advertisement
      </span>
    </div>
  );
}

export function AdSlot() {
  return (
    <div
      className="glass rounded-2xl p-2 overflow-hidden lg:sticky lg:top-6"
      style={{ maxHeight: AD_HEIGHT + 16 }}
    >
      <AdUnit />
    </div>
  );
}
