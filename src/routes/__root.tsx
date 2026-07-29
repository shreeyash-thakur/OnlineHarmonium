import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { themeInitScript } from "@/lib/theme";

// Register service worker for PWA
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // SW registration failed - app still works
      });
    });
  }
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#1a130c" },
      { name: "format-detection", content: "telephone=no" },
      {
        name: "description",
        content: "A premium online harmonium with realistic sampled reed sound.",
      },
      { property: "og:site_name", content: "Riyaz" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "Riyaz" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&family=DM+Sans:wght@400;500;600&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/icons/icon-192.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              name: "Online Harmonium - Riyaz",
              url: "https://onlineharmonium.vercel.app/",
              description: "Free online virtual harmonium with realistic sampled reeds and sargam labels.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://onlineharmonium.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            },
            {
              "@type": "Organization",
              name: "Riyaz",
              url: "https://onlineharmonium.vercel.app/",
              logo: "https://onlineharmonium.vercel.app/logo.png",
              sameAs: [
                "https://twitter.com/riyazapp",
                "https://www.youtube.com/@riyazapp",
                "https://www.instagram.com/riyazapp/",
              ],
            },
            {
              "@type": "WebApplication",
              name: "Riyaz Virtual Harmonium",
              applicationCategory: "MusicApplication",
              operatingSystem: "Any (Web Browser)",
              url: "https://onlineharmonium.vercel.app/",
              description: "Free online harmonium with realistic sampled reeds and sargam labels. Play Indian classical music, practice Sa Re Ga Ma, and learn harmonium songs.",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "128" },
              browserRequirements: "Requires JavaScript. Requires HTML5.",
              softwareVersion: "1.0.0",
              releaseNotes: "Initial release with 27-key scale-changer harmonium, sargam labels, and MIDI support.",
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                { "@type": "Question", name: "What is an online harmonium?", acceptedAnswer: { "@type": "Answer", text: "An online harmonium is a virtual/web-based version of the traditional Indian harmonium. It allows you to play harmonium directly in your browser without downloading any software. You can use your mouse, touch screen, or computer keyboard to play notes." } },
                { "@type": "Question", name: "Can I play harmonium online for free?", acceptedAnswer: { "@type": "Answer", text: "Yes! Our online harmonium is completely free to use. No downloads, no sign-ups, no hidden fees. Just open the website and start playing harmonium instantly in your browser." } },
                { "@type": "Question", name: "Can beginners learn harmonium using this website?", acceptedAnswer: { "@type": "Answer", text: "Absolutely! Our virtual harmonium is perfect for beginners. It features sargam labels (Sa Re Ga Ma), western note labels, keyboard mappings, and practice modes to help you learn harmonium step by step." } },
                { "@type": "Question", name: "What are Sa Re Ga Ma notes?", acceptedAnswer: { "@type": "Answer", text: "Sa Re Ga Ma are the seven basic notes (swaras) in Indian classical music, equivalent to Do Re Mi Fa So La Ti in Western music. On our online harmonium, these are labeled on the keys to help you learn and practice Indian classical music." } },
                { "@type": "Question", name: "Does this work on mobile?", acceptedAnswer: { "@type": "Answer", text: "Yes! Our virtual harmonium works perfectly on mobile phones, tablets, and desktops. The touch interface is optimized for mobile devices, so you can practice harmonium anywhere, anytime." } },
              ],
            },
            {
              "@type": "MusicInstrument",
              name: "Virtual Harmonium",
              description: "Digital/online version of the Indian harmonium with realistic sampled reed sounds",
              musicalInstrumentType: "Organ",
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://onlineharmonium.vercel.app/" },
          ],
        }),
      },
      {
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5691989206254780",
        async: true,
        crossOrigin: "anonymous",
      },
      { children: themeInitScript },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // PWA install still works without offline caching if this fails.
      });
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}