import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn Harmonium Online — Levels, Alankars, Sargam & Taal | Riyaz" },
      { name: "description", content: "A complete harmonium course: beginner-to-advanced levels, sargam, alankars (paltas), bellows technique, thaats, taal and laya, ornaments, and a riyaz routine — free, in your browser." },
      { name: "keywords", content: "learn harmonium, harmonium lessons online, sargam notes, alankar, palta, harmonium bellows technique, riyaz practice, learn indian classical music, harmonium for beginners, thaat, raag basics, taal, laya, meend, gamak" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "author", content: "Riyaz" },
      { name: "theme-color", content: "#160f09" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Riyaz" },
      { property: "og:title", content: "Learn Harmonium Online — Levels, Alankars, Sargam & Taal" },
      { property: "og:description", content: "A complete, level-by-level harmonium course: sargam, alankars, bellows control, thaats, taal, ornaments and a daily riyaz routine." },
      { property: "og:url", content: "https://onlineharmonium.vercel.app/learn" },
      { property: "og:image", content: "https://onlineharmonium.vercel.app/og-learn.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Learn Harmonium Online — Levels, Alankars, Sargam & Taal | Riyaz" },
      { name: "twitter:description", content: "A complete, level-by-level harmonium course: sargam, alankars, taal, thaats and ornaments — free, in your browser." },
      { name: "twitter:image", content: "https://onlineharmonium.vercel.app/og-learn.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://onlineharmonium.vercel.app/learn" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Riyaz", item: "https://onlineharmonium.vercel.app/" },
                { "@type": "ListItem", position: 2, name: "Learn", item: "https://onlineharmonium.vercel.app/learn" }
              ]
            },
            {
              "@type": "Course",
              name: "Learn Harmonium Online",
              description: "A free, level-by-level harmonium course covering sargam, alankars, bellows technique, thaats, taal, laya, ornaments and a riyaz practice routine.",
              url: "https://onlineharmonium.vercel.app/learn",
              provider: { "@type": "Organization", name: "Riyaz", url: "https://onlineharmonium.vercel.app/" },
              isAccessibleForFree: true,
              inLanguage: "en",
              hasCourseInstance: {
                "@type": "CourseInstance",
                courseMode: "online",
                courseWorkload: "PT20M"
              },
              coursePrerequisites: "None",
              teaches: ["Sargam notation", "Alankars and paltas", "Harmonium bellows technique", "Thaat and raag basics", "Taal and laya", "Ornamentation: meend, kan, gamak, murki", "Riyaz practice routines"]
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Do I need to read music to learn harmonium?",
                  acceptedAnswer: { "@type": "Answer", text: "No. Indian classical music is taught aurally through sargam — Sa Re Ga Ma Pa Dha Ni — which you learn by listening and repeating, not by reading staff notation." }
                },
                {
                  "@type": "Question",
                  name: "What is an alankar?",
                  acceptedAnswer: { "@type": "Answer", text: "An alankar, also called a palta, is a fixed melodic pattern practised across the full scale to build finger control, ear training and speed. They are the harmonium equivalent of scale exercises." }
                },
                {
                  "@type": "Question",
                  name: "How long does it take to reach an intermediate level on harmonium?",
                  acceptedAnswer: { "@type": "Answer", text: "With daily riyaz of twenty to thirty minutes, most students move from beginner to intermediate — comfortable alankars, two or three thaats and basic taal keeping — in around four to six months." }
                },
                {
                  "@type": "Question",
                  name: "What is the difference between taal and laya?",
                  acceptedAnswer: { "@type": "Answer", text: "Laya is the underlying tempo or speed of a performance. Taal is the fixed rhythmic cycle, made of a set number of beats grouped into sections, that a composition is set to — for example Teentaal has sixteen beats." }
                },
                {
                  "@type": "Question",
                  name: "What is riyaz?",
                  acceptedAnswer: { "@type": "Answer", text: "Riyaz is the daily, disciplined practice routine at the heart of Indian classical training — short, repeated, focused sessions rather than occasional long ones." }
                },
                {
                  "@type": "Question",
                  name: "Can I learn harmonium on a virtual keyboard before buying one?",
                  acceptedAnswer: { "@type": "Answer", text: "Yes. A browser harmonium is enough to learn sargam, alankars, scale positions and bellows-timing habits; many players use it to warm up even after owning a physical instrument." }
                }
              ]
            }
          ]
        }),
      },
    ],
  }),
  component: LearnPage,
});

function LearnPage() {
  return (
    <div dangerouslySetInnerHTML={{ __html: learnHtml }} />
  );
}

const learnHtml = `<style>
  :root{
    --bg: #160f09;
    --bg-panel: #1f160d;
    --bg-panel-2: #251a10;
    --ink: #f3e9d8;
    --ink-dim: #b8a488;
    --ink-faint: #7d6d57;
    --brass: #cc9a52;
    --brass-bright: #e8bd76;
    --line: rgba(204,154,82,0.18);
    --line-strong: rgba(204,154,82,0.35);
    --lvl-beginner: #9fc48a;
    --lvl-intermediate: #e0b45e;
    --lvl-advanced: #d97757;
    --serif: "Fraunces", "Iowan Old Style", Georgia, serif;
    --sans: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
    --mono: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
  }
  *{ box-sizing: border-box; }
  html{ scroll-behavior: smooth; }
  @media (prefers-reduced-motion: reduce){
    html{ scroll-behavior: auto; }
    *{ animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
  }
  body{
    margin:0;
    background: var(--bg);
    background-image:
      radial-gradient(1200px 600px at 15% -10%, rgba(204,154,82,0.10), transparent 60%),
      radial-gradient(900px 500px at 100% 0%, rgba(204,154,82,0.06), transparent 55%);
    color: var(--ink);
    font-family: var(--sans);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }
  .skip-link{
    position:absolute; left:-999px; top:0; background:var(--brass); color:#160f09;
    padding:10px 16px; z-index:100; font-weight:600; text-decoration:none;
  }
  .skip-link:focus{ left:12px; top:12px; }
  a{ color: inherit; }
  :focus-visible{ outline: 2px solid var(--brass-bright); outline-offset: 3px; }
  .wrap{ max-width: 1080px; margin: 0 auto; padding: 0 24px; }
  header.site{
    position: sticky; top:0; z-index: 50;
    background: rgba(22,15,9,0.86);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--line);
  }
  .nav{
    display:flex; align-items:center; justify-content:space-between;
    padding: 16px 24px; max-width:1080px; margin:0 auto;
  }
  .logo{
    display:flex; align-items:center; gap:10px; text-decoration:none;
    font-family: var(--serif); font-size:1.15rem; letter-spacing:.02em; color: var(--ink);
  }
  .logo .mark{
    width:34px; height:34px; border-radius:50%;
    border:1px solid var(--line-strong);
    display:flex; align-items:center; justify-content:center;
    font-family: var(--serif); color: var(--brass-bright); font-size:1rem;
    background: linear-gradient(160deg, var(--bg-panel-2), var(--bg-panel));
  }
  nav.links{ display:flex; align-items:center; gap:28px; }
  nav.links a{
    text-decoration:none; color: var(--ink-dim); font-size:.92rem; letter-spacing:.01em;
    padding: 6px 2px; border-bottom: 1px solid transparent;
  }
  nav.links a:hover{ color: var(--ink); }
  nav.links a[aria-current="page"]{ color: var(--brass-bright); border-color: var(--brass); }
  .cta{
    background: linear-gradient(160deg, var(--brass-bright), var(--brass));
    color:#1a1006; text-decoration:none; font-weight:600; font-size:.9rem;
    padding:10px 18px; border-radius:999px; white-space:nowrap;
  }
  .cta:hover{ filter:brightness(1.06); }
  .crumb{ font-size:.8rem; color: var(--ink-faint); padding: 18px 0 0; }
  .crumb a{ text-decoration:none; color: var(--ink-faint); }
  .crumb a:hover{ color: var(--brass-bright); }
  .hero{ padding: 48px 0 40px; border-bottom: 1px solid var(--line); }
  .eyebrow{
    display:inline-block; font-size:.72rem; letter-spacing:.16em; text-transform:uppercase;
    color: var(--brass-bright); border:1px solid var(--line-strong); border-radius:999px;
    padding:6px 14px; margin-bottom:20px;
  }
  h1{
    font-family: var(--serif); font-weight:600; font-size: clamp(2.1rem, 5vw, 3.4rem);
    line-height:1.08; margin: 0 0 18px; letter-spacing:-0.01em;
  }
  h1 em{ font-style: italic; color: var(--brass-bright); }
  .lede{ font-size:1.1rem; color: var(--ink-dim); max-width:640px; margin: 0 0 28px; }
  .hero-actions{ display:flex; gap:14px; flex-wrap:wrap; align-items:center; }
  .btn-outline{
    text-decoration:none; color: var(--ink); border:1px solid var(--line-strong);
    padding:10px 18px; border-radius:999px; font-size:.9rem;
  }
  .btn-outline:hover{ border-color: var(--brass-bright); color: var(--brass-bright); }
  .keystrip{ margin-top:44px; }
  .keystrip svg{ width:100%; height:auto; display:block; }
  .keystrip figcaption{ margin-top:10px; font-size:.78rem; color: var(--ink-faint); text-align:center; }
  main{ padding-top: 8px; }
  section{ padding: 64px 0; border-bottom: 1px solid var(--line); }
  section:last-of-type{ border-bottom:none; }
  .section-head{ max-width:640px; margin-bottom:36px; }
  .num{ font-family: var(--serif); color: var(--brass); font-size:.85rem; letter-spacing:.08em; }
  h2{
    font-family: var(--serif); font-weight:600; font-size: clamp(1.6rem, 3vw, 2.2rem);
    margin: 8px 0 12px; letter-spacing:-0.01em;
  }
  .section-head p{ color: var(--ink-dim); margin:0; }
  h3{ font-family: var(--serif); font-size:1.15rem; font-weight:600; margin:0 0 8px; color: var(--ink); }
  .lvl{
    display:inline-flex; align-items:center; gap:6px; font-size:.68rem; letter-spacing:.06em;
    text-transform:uppercase; padding:4px 10px; border-radius:999px; font-weight:600;
    border:1px solid currentColor;
  }
  .lvl::before{ content:""; width:6px; height:6px; border-radius:50%; background:currentColor; }
  .lvl.beginner{ color: var(--lvl-beginner); }
  .lvl.intermediate{ color: var(--lvl-intermediate); }
  .lvl.advanced{ color: var(--lvl-advanced); }
  .sargam-grid{
    display:grid; grid-template-columns: repeat(7, 1fr); gap:10px;
  }
  .sargam-cell{
    background: var(--bg-panel); border:1px solid var(--line); border-radius:12px;
    padding:16px 10px; text-align:center;
  }
  .sargam-cell .sw{ font-family: var(--serif); font-size:1.5rem; color: var(--brass-bright); }
  .sargam-cell .full{ font-size:.78rem; color: var(--ink-dim); margin-top:4px; }
  .sargam-cell .western{ font-size:.7rem; color: var(--ink-faint); margin-top:2px; }
  .cards{ display:grid; grid-template-columns: repeat(auto-fit, minmax(240px,1fr)); gap:18px; }
  .card{
    background: var(--bg-panel); border:1px solid var(--line); border-radius:14px; padding:22px;
  }
  .card .step{ color: var(--brass); font-family: var(--serif); font-size:.82rem; letter-spacing:.06em; margin-bottom:8px; }
  .card p{ color: var(--ink-dim); font-size:.94rem; margin:0; }
  .split{ display:grid; grid-template-columns: 1.1fr 0.9fr; gap:40px; align-items:start; }
  @media (max-width: 780px){ .split{ grid-template-columns:1fr; } }
  .list-clean{ list-style:none; margin:0; padding:0; }
  .list-clean li{
    padding: 14px 0; border-bottom:1px solid var(--line); display:flex; gap:14px;
  }
  .list-clean li:last-child{ border-bottom:none; }
  .list-clean .tag{
    flex:none; width:30px; height:30px; border-radius:50%; border:1px solid var(--line-strong);
    display:flex; align-items:center; justify-content:center; font-family:var(--serif); font-size:.8rem; color: var(--brass-bright);
  }
  .list-clean strong{ display:block; margin-bottom:2px; }
  .list-clean span{ color: var(--ink-dim); font-size:.92rem; }
  .level-track{ display:grid; grid-template-columns: repeat(3, 1fr); gap:20px; }
  @media (max-width: 860px){ .level-track{ grid-template-columns:1fr; } }
  .level-card{
    background: var(--bg-panel); border:1px solid var(--line); border-radius:16px; padding:26px;
    position:relative;
  }
  .level-card.beginner{ border-top:3px solid var(--lvl-beginner); }
  .level-card.intermediate{ border-top:3px solid var(--lvl-intermediate); }
  .level-card.advanced{ border-top:3px solid var(--lvl-advanced); }
  .level-card .lvl{ margin-bottom:14px; }
  .level-card h3{ font-size:1.3rem; margin-bottom:6px; }
  .level-card .timeframe{ font-size:.8rem; color: var(--ink-faint); margin-bottom:16px; }
  .level-card ul{ list-style:none; margin:0; padding:0; }
  .level-card li{
    font-size:.9rem; color: var(--ink-dim); padding: 9px 0 9px 22px; position:relative;
    border-bottom:1px solid var(--line);
  }
  .level-card li:last-child{ border-bottom:none; }
  .level-card li::before{
    content:"—"; position:absolute; left:0; color: var(--brass);
  }
  .alankar-list{ display:flex; flex-direction:column; gap:14px; }
  .alankar{
    background: var(--bg-panel); border:1px solid var(--line); border-radius:14px;
    padding:20px 22px; display:grid; grid-template-columns: auto 1fr auto; gap:18px; align-items:center;
  }
  @media (max-width: 700px){ .alankar{ grid-template-columns:1fr; } }
  .alankar .idx{ font-family: var(--serif); color: var(--brass); font-size:1rem; }
  .alankar .pattern{
    font-family: var(--mono); font-size: .98rem; color: var(--brass-bright);
    letter-spacing:.02em; overflow-x:auto; white-space:nowrap;
  }
  .alankar .pattern .rest{ color: var(--ink-faint); }
  .alankar .meta{ font-size:.82rem; color: var(--ink-dim); text-align:right; }
  @media (max-width: 700px){ .alankar .meta{ text-align:left; } }
  .taal-grid{ display:grid; grid-template-columns: repeat(auto-fit, minmax(230px,1fr)); gap:18px; }
  .taal{ background: var(--bg-panel); border:1px solid var(--line); border-radius:14px; padding:20px; }
  .taal h3{ display:flex; align-items:baseline; justify-content:space-between; gap:10px; }
  .taal h3 .matras{ font-family: var(--sans); font-size:.75rem; color: var(--brass); font-weight:600; }
  .taal .bols{ font-family: var(--mono); font-size:.86rem; color: var(--ink-dim); margin: 10px 0; line-height:1.9; word-break: break-word; }
  .taal .bols .sam{ color: var(--brass-bright); font-weight:700; }
  .taal p.use{ margin:0; font-size:.84rem; color: var(--ink-faint); }
  dl.ornaments{ display:grid; grid-template-columns: repeat(2, 1fr); gap: 0 40px; }
  @media (max-width: 700px){ dl.ornaments{ grid-template-columns: 1fr; } }
  dl.ornaments div{ padding:16px 0; border-bottom:1px solid var(--line); }
  dl.ornaments dt{ font-family: var(--serif); color: var(--brass-bright); font-size:1.05rem; }
  dl.ornaments dd{ margin:5px 0 0; color: var(--ink-dim); font-size:.9rem; }
  .routine{ width:100%; border-collapse: collapse; margin-top:8px; }
  .routine th, .routine td{ text-align:left; padding:12px 14px; border-bottom:1px solid var(--line); font-size:.92rem; }
  .routine th{ color: var(--ink-faint); font-weight:500; text-transform:uppercase; font-size:.72rem; letter-spacing:.08em; }
  .routine td:first-child, .routine th:first-child{ color: var(--brass-bright); font-family: var(--serif); white-space:nowrap; }
  .routine-tabs{ display:flex; gap:10px; margin-bottom:18px; flex-wrap:wrap; }
  .routine-tabs .lvl{ cursor:default; }
  .raag-grid{ display:grid; grid-template-columns: repeat(auto-fit, minmax(220px,1fr)); gap:16px; }
  .raag{
    border:1px solid var(--line); border-radius:14px; padding:18px 20px; background: var(--bg-panel);
  }
  .raag .top-row{ display:flex; justify-content:space-between; align-items:flex-start; gap:10px; margin-bottom:6px; }
  .raag h3{ margin-bottom:0; }
  .raag .mood{ font-size:.76rem; color: var(--brass); letter-spacing:.04em; text-transform:uppercase; margin-bottom:8px; }
  .raag p{ margin:0; color: var(--ink-dim); font-size:.9rem; }
  dl.glossary{ display:grid; grid-template-columns: repeat(2, 1fr); gap: 0 40px; }
  @media (max-width: 700px){ dl.glossary{ grid-template-columns: 1fr; } }
  dl.glossary div{ padding:14px 0; border-bottom:1px solid var(--line); }
  dl.glossary dt{ font-family: var(--serif); color: var(--brass-bright); font-size:1rem; }
  dl.glossary dd{ margin:4px 0 0; color: var(--ink-dim); font-size:.9rem; }
  details.faq{
    border-bottom:1px solid var(--line); padding: 18px 0;
  }
  details.faq summary{
    cursor:pointer; font-family: var(--serif); font-size:1.05rem; color: var(--ink);
    list-style:none; display:flex; justify-content:space-between; align-items:center; gap:16px;
  }
  details.faq summary::-webkit-details-marker{ display:none; }
  details.faq summary::after{
    content:"+"; color: var(--brass-bright); font-size:1.3rem; font-family: var(--sans); flex:none;
  }
  details.faq[open] summary::after{ content:"–"; }
  details.faq p{ color: var(--ink-dim); margin: 12px 0 0; max-width: 680px; }
  .final-cta{
    text-align:center; padding: 72px 24px; border-radius: 24px;
    background: linear-gradient(160deg, var(--bg-panel-2), var(--bg-panel));
    border:1px solid var(--line-strong);
  }
  .final-cta h2{ margin-bottom:10px; }
  .final-cta p{ color: var(--ink-dim); max-width:480px; margin: 0 auto 26px; }
  footer.site{ border-top:1px solid var(--line); padding: 32px 0; }
  .foot-row{ display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; }
  .foot-row p{ margin:0; color: var(--ink-faint); font-size:.85rem; }
  .foot-links{ display:flex; gap:22px; }
  .foot-links a{ text-decoration:none; color: var(--ink-dim); font-size:.85rem; }
  .foot-links a:hover{ color: var(--brass-bright); }
  .toc{ display:flex; flex-wrap:wrap; gap:8px 10px; margin: 22px 0 0; }
  .toc a{
    text-decoration:none; font-size:.78rem; color: var(--ink-dim); border:1px solid var(--line);
    padding:6px 12px; border-radius:999px;
  }
  .toc a:hover{ color: var(--brass-bright); border-color: var(--line-strong); }
  @media (max-width: 720px){
    nav.links{ display:none; }
    .sargam-grid{ grid-template-columns: repeat(4,1fr); }
    .sargam-cell:last-child{ grid-column: span 4; }
  }
</style>
<a class="skip-link" href="#main">Skip to content</a>
<header class="site">
  <div class="nav">
    <a class="logo" href="/" aria-label="Riyaz home">
      <span class="mark" aria-hidden="true">R</span>
      Riyaz
    </a>
    <nav class="links" aria-label="Primary">
      <a href="/#features">Features</a>
      <a href="/#modes">Modes</a>
      <a href="/learn" aria-current="page">Learn</a>
    </nav>
    <a class="cta" href="/play">Play Now</a>
  </div>
</header>
<main id="main">
  <div class="wrap">
    <p class="crumb"><a href="/">Riyaz</a> / <span aria-current="page">Learn</span></p>
    <section class="hero" aria-labelledby="hero-heading" style="border-bottom:none;">
      <span class="eyebrow">Free harmonium course · beginner to advanced</span>
      <h1 id="hero-heading">Learn the harmonium,<br><em>one breath at a time.</em></h1>
      <p class="lede">A complete, level-by-level path through Indian classical harmonium — sargam, alankars, bellows control, thaats, taal and laya, ornamentation, and a daily riyaz routine, taught the way it's traditionally passed down: by ear, by repetition, by practice.</p>
      <div class="hero-actions">
        <a class="cta" href="/play">Start practicing on Riyaz</a>
        <a class="btn-outline" href="#levels">See the learning levels ↓</a>
      </div>
      <nav class="toc" aria-label="On this page">
        <a href="#sargam">Sargam</a>
        <a href="#levels">Levels</a>
        <a href="#alankars">Alankars</a>
        <a href="#technique">Technique</a>
        <a href="#thaat">Thaats</a>
        <a href="#taal">Taal & laya</a>
        <a href="#ornaments">Ornaments</a>
        <a href="#routine">Riyaz routine</a>
        <a href="#raag">Raags</a>
        <a href="#glossary">Glossary</a>
        <a href="#faq">FAQ</a>
      </nav>
      <figure class="keystrip" aria-hidden="true">
        <svg viewBox="0 0 900 130" preserveAspectRatio="none" role="img" aria-label="Illustration of harmonium keys labelled with sargam notes Sa Re Ga Ma Pa Dha Ni Sa">
          <rect x="0" y="0" width="900" height="130" fill="none"/>
          <g>
            <g fill="#241a10" stroke="#3a2a17" stroke-width="1">
              <rect x="0"   y="10" width="112" height="110" rx="6"/>
              <rect x="113" y="10" width="112" height="110" rx="6"/>
              <rect x="226" y="10" width="112" height="110" rx="6"/>
              <rect x="339" y="10" width="112" height="110" rx="6"/>
              <rect x="452" y="10" width="112" height="110" rx="6"/>
              <rect x="565" y="10" width="112" height="110" rx="6"/>
              <rect x="678" y="10" width="112" height="110" rx="6"/>
              <rect x="791" y="10" width="109" height="110" rx="6"/>
            </g>
            <g fill="#e8bd76" font-family="Fraunces, serif" font-size="20" text-anchor="middle">
              <text x="56"  y="95">Sa</text>
              <text x="169" y="95">Re</text>
              <text x="282" y="95">Ga</text>
              <text x="395" y="95">Ma</text>
              <text x="508" y="95">Pa</text>
              <text x="621" y="95">Dha</text>
              <text x="734" y="95">Ni</text>
              <text x="845" y="95">Sa</text>
            </g>
          </g>
        </svg>
        <figcaption>The seven sargam notes — the foundation of everything you'll play.</figcaption>
      </figure>
    </section>
    <section id="sargam" aria-labelledby="sargam-heading">
      <div class="section-head">
        <span class="num">01 — Notation</span>
        <h2 id="sargam-heading">Sargam: the seven notes</h2>
        <p>Indian classical music is taught by ear using sargam syllables instead of staff notation. Learn to sing these before you play them — the ear leads the hand, not the other way round.</p>
      </div>
      <div class="sargam-grid">
        <div class="sargam-cell"><div class="sw">Sa</div><div class="full">Shadja</div><div class="western">C (when Sa=C)</div></div>
        <div class="sargam-cell"><div class="sw">Re</div><div class="full">Rishabh</div><div class="western">D (when Sa=C)</div></div>
        <div class="sargam-cell"><div class="sw">Ga</div><div class="full">Gandhar</div><div class="western">E (when Sa=C)</div></div>
        <div class="sargam-cell"><div class="sw">Ma</div><div class="full">Madhyam</div><div class="western">F (when Sa=C)</div></div>
        <div class="sargam-cell"><div class="sw">Pa</div><div class="full">Pancham</div><div class="western">G (when Sa=C)</div></div>
        <div class="sargam-cell"><div class="sw">Dha</div><div class="full">Dhaivat</div><div class="western">A (when Sa=C)</div></div>
        <div class="sargam-cell"><div class="sw">Ni</div><div class="full">Nishad</div><div class="western">B (when Sa=C)</div></div>
      </div>
      <p style="color:var(--ink-faint); font-size:.85rem; margin-top:16px;"><strong>Sa is the tonic</strong> — the reference pitch everything else is measured from — so it is not fixed to C. The Western letters above apply when Sa = C; if you choose a different tonic (using the scale changer on the harmonium), every Western note shifts accordingly. Sa and Pa are fixed (achal); the other five can be shifted flat (komal) or, for Ma, sharp (tivra) depending on the raag. Riyaz shows both sargam and western labels on every key so you can cross-reference as you learn.</p>
    </section>
    <section id="levels" aria-labelledby="levels-heading">
      <div class="section-head">
        <span class="num">02 — Curriculum</span>
        <h2 id="levels-heading">Three levels, one continuous path</h2>
        <p>There's no exam to pass between levels — they overlap, and you'll circle back to earlier ones often. Use this as a checklist for what to focus your riyaz on next.</p>
      </div>
      <div class="level-track">
        <div class="level-card beginner">
          <span class="lvl beginner">Beginner</span>
          <h3>Foundations</h3>
          <div class="timeframe">Roughly the first 1–3 months</div>
          <ul>
            <li>Locate Sa and play a steady Sa-to-Sa scale</li>
            <li>Sing and play straight (sapaat) alankars 1–3</li>
            <li>Basic bellows timing — pump between phrases, not on them</li>
            <li>One fixed finger per note, both directions</li>
            <li>Thaat Bilaval, all seven natural notes</li>
            <li>Keep a simple 8-beat Keherwa clap</li>
          </ul>
        </div>
        <div class="level-card intermediate">
          <span class="lvl intermediate">Intermediate</span>
          <h3>Control</h3>
          <div class="timeframe">Roughly months 3–9</div>
          <ul>
            <li>Alankars 4–8, including skips and turns</li>
            <li>Independent left-hand drone under right-hand melody</li>
            <li>Thaats Kafi and Bhairav; komal Re, Ga, Dha</li>
            <li>Keep Teentaal (16 beats) at a steady laya</li>
            <li>First ornaments: meend and kan swar</li>
            <li>Full raags: Bhupali, Yaman, Kafi</li>
          </ul>
        </div>
        <div class="level-card advanced">
          <span class="lvl advanced">Advanced</span>
          <h3>Expression</h3>
          <div class="timeframe">9 months and beyond</div>
          <ul>
            <li>Reverse and combined (mishra) alankars at speed</li>
            <li>Tivra Ma and less common thaats (Marwa, Purvi)</li>
            <li>Gamak, murki and andolan ornaments</li>
            <li>Improvised alaap within a raag's grammar</li>
            <li>Accompanying a vocalist: following, not leading</li>
            <li>Tabla-independent laya control across taals</li>
          </ul>
        </div>
      </div>
    </section>
    <section id="alankars" aria-labelledby="alankar-heading">
      <div class="section-head">
        <span class="num">03 — Exercises</span>
        <h2 id="alankar-heading">Alankars (paltas)</h2>
        <p>An alankar is a fixed melodic pattern, played on every step of the scale in turn. Alankars build finger independence, ear-to-hand speed, and the specific hand shapes each raag will later reuse — practise them slowly before you practise them fast.</p>
      </div>
      <div class="alankar-list">
        <div class="alankar">
          <span class="idx">1</span>
          <span class="pattern">S R G, R G M, G M P, M P D, P D N, D N Ṡ <span class="rest">…and reverse</span></span>
          <span class="meta"><span class="lvl beginner">Beginner</span></span>
        </div>
        <div class="alankar">
          <span class="idx">2</span>
          <span class="pattern">S R G R, R G M G, G M P M, M P D P <span class="rest">…and reverse</span></span>
          <span class="meta"><span class="lvl beginner">Beginner</span></span>
        </div>
        <div class="alankar">
          <span class="idx">3</span>
          <span class="pattern">S R S R, G R G R, M G M G, P M P M <span class="rest">…and reverse</span></span>
          <span class="meta"><span class="lvl beginner">Beginner</span></span>
        </div>
        <div class="alankar">
          <span class="idx">4</span>
          <span class="pattern">S R G, S R G, R G M, R G M, G M P, G M P <span class="rest">…and reverse</span></span>
          <span class="meta"><span class="lvl intermediate">Intermediate</span></span>
        </div>
        <div class="alankar">
          <span class="idx">5</span>
          <span class="pattern">S G R M, G M R P, M P G D, P D M N <span class="rest">…skip patterns</span></span>
          <span class="meta"><span class="lvl intermediate">Intermediate</span></span>
        </div>
        <div class="alankar">
          <span class="idx">6</span>
          <span class="pattern">S R G M P D N Ṡ, Ṡ N D P M G R S <span class="rest">…full scale, one breath</span></span>
          <span class="meta"><span class="lvl intermediate">Intermediate</span></span>
        </div>
        <div class="alankar">
          <span class="idx">7</span>
          <span class="pattern">S R G M, R G M P, G M P D, M P D N <span class="rest">…mishra, ascending only</span></span>
          <span class="meta"><span class="lvl advanced">Advanced</span></span>
        </div>
        <div class="alankar">
          <span class="idx">8</span>
          <span class="pattern">Ṡ N D P, N D P M, D P M G, P M G R <span class="rest">…mishra, descending, double speed</span></span>
          <span class="meta"><span class="lvl advanced">Advanced</span></span>
        </div>
      </div>
      <p style="color:var(--ink-faint); font-size:.85rem; margin-top:18px;">Practise each alankar at three speeds — vilambit (slow), madhya (medium), drut (fast) — before moving to the next. Speed without accuracy just teaches your fingers to be fast and wrong.</p>
    </section>
    <section id="technique" aria-labelledby="technique-heading">
      <div class="section-head">
        <span class="num">04 — Technique</span>
        <h2 id="technique-heading">Bellows and fingering</h2>
        <p>Two habits separate a confident player from someone fighting the instrument. Build both from day one.</p>
      </div>
      <div class="cards">
        <div class="card">
          <div class="step">Bellows</div>
          <h3>Pump low, steady, and off-beat</h3>
          <p>Squeeze from the base of the bellows in short, even strokes timed between phrases, never on the note you're trying to sustain. A jerky bellows shows up as a wobble in every note you play.</p>
        </div>
        <div class="card">
          <div class="step">Right hand</div>
          <h3>One finger, one note, always</h3>
          <p>Assign fixed fingers to Sa Re Ga Ma Pa Dha Ni early and keep them consistent. Random fingering feels fine at slow speed and collapses the moment you try to move quickly.</p>
        </div>
        <div class="card">
          <div class="step">Left hand</div>
          <h3>Learn drone before chords</h3>
          <p>Before adding harmony, practise holding a steady Sa-Pa drone with the bellows hand alone. It's the single most useful left-hand habit for accompanying singing.</p>
        </div>
        <div class="card">
          <div class="step">Posture</div>
          <h3>Sit low, wrists level</h3>
          <p>Traditional floor-seated posture keeps the bellows arm relaxed and your wrist level with the keybed — the same posture works seated at a desk with the instrument on a stand.</p>
        </div>
      </div>
    </section>
    <section id="thaat" aria-labelledby="thaat-heading">
      <div class="section-head">
        <span class="num">05 — Scales</span>
        <h2 id="thaat-heading">Thaats: the ten parent scales</h2>
        <p>Every raag borrows its seven notes from one of ten thaats — think of them as the scale families everything else is built from. Start with the first three; the rest come later.</p>
      </div>
      <ul class="list-clean">
        <li>
          <span class="tag">1</span>
          <div><strong>Bilaval <span class="lvl beginner" style="margin-left:8px;">Beginner</span></strong><span>All seven natural notes — identical shape to a Western major scale. Start here.</span></div>
        </li>
        <li>
          <span class="tag">2</span>
          <div><strong>Kafi <span class="lvl beginner" style="margin-left:8px;">Beginner</span></strong><span>Bilaval with a flattened Ga and Ni — the sound behind most folk melodies and many bhajans.</span></div>
        </li>
        <li>
          <span class="tag">3</span>
          <div><strong>Bhairav <span class="lvl intermediate" style="margin-left:8px;">Intermediate</span></strong><span>Flattened Re and Dha against natural Ga — the devotional, early-morning colour heard in temple music.</span></div>
        </li>
        <li>
          <span class="tag">4</span>
          <div><strong>Khamaj <span class="lvl intermediate" style="margin-left:8px;">Intermediate</span></strong><span>Natural scale with a flattened Ni only — light, playful, common in thumri and film music.</span></div>
        </li>
        <li>
          <span class="tag">5</span>
          <div><strong>Marwa <span class="lvl advanced" style="margin-left:8px;">Advanced</span></strong><span>Flattened Re with a sharpened Ma and no Pa emphasis — an unsettled, twilight colour that's genuinely hard to sing in tune.</span></div>
        </li>
        <li>
          <span class="tag">6</span>
          <div><strong>Purvi <span class="lvl advanced" style="margin-left:8px;">Advanced</span></strong><span>Flattened Re and Dha together with a sharpened Ma — dense and meditative, usually tackled after Marwa.</span></div>
        </li>
      </ul>
    </section>
    <section id="taal" aria-labelledby="taal-heading">
      <div class="section-head">
        <span class="num">06 — Rhythm</span>
        <h2 id="taal-heading">Taal and laya</h2>
        <p><strong style="color:var(--ink)">Laya</strong> is simply speed — slow (vilambit), medium (madhya) or fast (drut). <strong style="color:var(--ink)">Taal</strong> is the fixed rhythmic cycle a piece is set to, counted in matras (beats) and returning to sam, the first beat, each time round.</p>
      </div>
      <div class="taal-grid">
        <div class="taal">
          <h3>Keherwa <span class="matras">8 matras</span></h3>
          <div class="bols"><span class="sam">Dha</span> Ge Na Ti | Na Ke Dhi Na</div>
          <p class="use">The first taal most beginners internalise — common in bhajans and light songs.</p>
        </div>
        <div class="taal">
          <h3>Dadra <span class="matras">6 matras</span></h3>
          <div class="bols"><span class="sam">Dha</span> Dhi Na | Dha Tu Na</div>
          <p class="use">A light, swaying six-beat cycle used widely in thumri and semi-classical singing.</p>
        </div>
        <div class="taal">
          <h3>Teentaal <span class="matras">16 matras</span></h3>
          <div class="bols"><span class="sam">Dha</span> Dhin Dhin Dha | Dha Dhin Dhin Dha | Dha Tin Tin Ta | Ta Dhin Dhin Dha</div>
          <p class="use">The backbone taal of Hindustani classical music — four sections of four beats, sam on the first Dha.</p>
        </div>
        <div class="taal">
          <h3>Ektaal <span class="matras">12 matras</span></h3>
          <div class="bols">Dhin Dhin | Dha Ge Ti Rre Ke Dhin | Dhin Dha Ge Ti Rre Ke Na</div>
          <p class="use">A denser 12-beat cycle used in slower, more ornamented classical compositions.</p>
        </div>
      </div>
    </section>
    <section id="ornaments" aria-labelledby="ornament-heading">
      <div class="section-head">
        <span class="num">07 — Expression</span>
        <h2 id="ornament-heading">Ornaments</h2>
        <p>Once a scale is steady, ornaments are what turn a correct performance into an expressive one. They're mostly bellows and wrist work, not extra notes.</p>
      </div>
      <dl class="ornaments">
        <div><dt>Meend</dt><dd>A smooth glide between two notes, sliding across the keys in one bellows breath rather than striking each note separately.</dd></div>
        <div><dt>Kan swar</dt><dd>A brief "grace" touch of an adjacent note just before the main note, barely audible as a separate pitch.</dd></div>
        <div><dt>Gamak</dt><dd>A heavier, oscillating shake on a note, giving it weight and forward motion — common in faster, more powerful passages.</dd></div>
        <div><dt>Murki</dt><dd>A fast, light turn around a note using its neighbours, typically three to five notes long — decorative rather than structural.</dd></div>
        <div><dt>Andolan</dt><dd>A slow, wide sway of a note, usually a komal note, that never fully resolves — used sparingly for a searching, unresolved feeling.</dd></div>
        <div><dt>Khatka</dt><dd>A quick two- or three-note flick that snaps back to the main note, giving an accent without changing the underlying pitch's duration.</dd></div>
      </dl>
    </section>
    <section id="routine" aria-labelledby="routine-heading">
      <div class="section-head">
        <span class="num">08 — Riyaz</span>
        <h2 id="routine-heading">A daily riyaz routine</h2>
        <p>Riyaz means disciplined, repeated practice — short daily sessions beat occasional long ones. The shape stays the same as you advance; only the content inside each block gets harder.</p>
      </div>
      <div class="routine-tabs">
        <span class="lvl beginner">Beginner · 20 min</span>
        <span class="lvl intermediate">Intermediate · 30 min</span>
        <span class="lvl advanced">Advanced · 45+ min</span>
      </div>
      <table class="routine">
        <thead>
          <tr><th>Minutes</th><th>Focus</th><th>What to do</th></tr>
        </thead>
        <tbody>
          <tr><td>0–5</td><td>Warm-up</td><td>Slow Sa-to-Sa scale, ascending and descending, matching bellows to breath.</td></tr>
          <tr><td>5–15</td><td>Alankars</td><td>Two or three alankars at your current level, each in vilambit then madhya laya.</td></tr>
          <tr><td>15–25</td><td>Raag or bhajan</td><td>Apply the day's thaat to a memorised melodic line or composition, keeping taal by hand.</td></tr>
          <tr><td>25–35</td><td>Ornament or taal focus</td><td>Isolate one ornament, or keep a taal cycle steady while the right hand plays freely.</td></tr>
          <tr><td>Last 5</td><td>Cool-down</td><td>Slow drone with the left hand only — the habit that carries over to accompaniment.</td></tr>
        </tbody>
      </table>
    </section>
    <section id="raag" aria-labelledby="raag-heading">
      <div class="section-head">
        <span class="num">09 — Repertoire</span>
        <h2 id="raag-heading">Raags by level</h2>
        <p>Simple ascending-descending structures for your first raags, then more demanding note movement as you progress.</p>
      </div>
      <div class="raag-grid">
        <div class="raag"><div class="top-row"><h3>Bhupali</h3><span class="lvl beginner">Beginner</span></div><div class="mood">Anytime</div><p>Only five notes (Sa Re Ga Pa Dha), which makes it the easiest full raag to internalise quickly.</p></div>
        <div class="raag"><div class="top-row"><h3>Bhairav</h3><span class="lvl beginner">Beginner</span></div><div class="mood">Morning</div><p>Grave and devotional; a classic first raag for its clear, memorable komal Re and Dha.</p></div>
        <div class="raag"><div class="top-row"><h3>Yaman</h3><span class="lvl intermediate">Intermediate</span></div><div class="mood">Evening</div><p>Bright and resolving, built on a sharpened Ma — often called the "gateway raag" to intermediate playing.</p></div>
        <div class="raag"><div class="top-row"><h3>Kafi</h3><span class="lvl intermediate">Intermediate</span></div><div class="mood">Folk-rooted</div><p>The natural next step from Bilaval; underlies a huge amount of bhajan and light classical repertoire.</p></div>
        <div class="raag"><div class="top-row"><h3>Marwa</h3><span class="lvl advanced">Advanced</span></div><div class="mood">Twilight</div><p>An unsettled, Pa-avoiding raag that demands real ear control over the sharpened Ma and flattened Re.</p></div>
        <div class="raag"><div class="top-row"><h3>Darbari Kanada</h3><span class="lvl advanced">Advanced</span></div><div class="mood">Late night</div><p>Deep, slow-moving and heavily ornamented — usually approached only after gamak and andolan feel natural.</p></div>
      </div>
    </section>
    <section id="glossary" aria-labelledby="glossary-heading">
      <div class="section-head">
        <span class="num">10 — Reference</span>
        <h2 id="glossary-heading">Glossary</h2>
      </div>
      <dl class="glossary">
        <div><dt>Sargam</dt><dd>The seven-note solfa system: Sa Re Ga Ma Pa Dha Ni.</dd></div>
        <div><dt>Sa</dt><dd>The fixed tonic every scale is built around; set once per song.</dd></div>
        <div><dt>Komal</dt><dd>A "flattened" note, lowered a semitone from its natural position.</dd></div>
        <div><dt>Tivra</dt><dd>A "sharpened" note — used only for Ma.</dd></div>
        <div><dt>Thaat</dt><dd>A parent scale that groups related raags together.</dd></div>
        <div><dt>Raag</dt><dd>A melodic framework with its own note set, mood and rules of movement.</dd></div>
        <div><dt>Alankar / palta</dt><dd>A fixed melodic pattern practised across the scale to build technique.</dd></div>
        <div><dt>Taal</dt><dd>A fixed rhythmic cycle of a set number of beats, returning to sam each round.</dd></div>
        <div><dt>Laya</dt><dd>Tempo: vilambit (slow), madhya (medium) or drut (fast).</dd></div>
        <div><dt>Sam</dt><dd>The first, strongest beat of a taal cycle, where a phrase typically resolves.</dd></div>
        <div><dt>Riyaz</dt><dd>Disciplined, repeated daily practice — the backbone of classical training.</dd></div>
        <div><dt>Scale changer</dt><dd>A coupler that shifts the whole keyboard so Sa moves without retuning.</dd></div>
      </dl>
    </section>
    <section id="faq" aria-labelledby="faq-heading">
      <div class="section-head">
        <span class="num">11 — FAQ</span>
        <h2 id="faq-heading">Common questions</h2>
      </div>
      <details class="faq">
        <summary>Do I need to read music to learn harmonium?</summary>
        <p>No. Indian classical music is taught aurally through sargam — Sa Re Ga Ma Pa Dha Ni — which you learn by listening and repeating, not by reading staff notation.</p>
      </details>
      <details class="faq">
        <summary>What is an alankar?</summary>
        <p>An alankar, also called a palta, is a fixed melodic pattern practised across the full scale to build finger control, ear training and speed. They are the harmonium equivalent of scale exercises.</p>
      </details>
      <details class="faq">
        <summary>How long does it take to reach an intermediate level?</summary>
        <p>With daily riyaz of twenty to thirty minutes, most students move from beginner to intermediate — comfortable alankars, two or three thaats and basic taal keeping — in around four to six months.</p>
      </details>
      <details class="faq">
        <summary>What is the difference between taal and laya?</summary>
        <p>Laya is the underlying tempo or speed of a performance. Taal is the fixed rhythmic cycle, made of a set number of beats grouped into sections, that a composition is set to — for example Teentaal has sixteen beats.</p>
      </details>
      <details class="faq">
        <summary>What is riyaz?</summary>
        <p>Riyaz is the daily, disciplined practice routine at the heart of Indian classical training — short, repeated, focused sessions rather than occasional long ones.</p>
      </details>
      <details class="faq">
        <summary>Can I learn harmonium on a virtual keyboard before buying one?</summary>
        <p>Yes. A browser harmonium is enough to learn sargam, alankars, scale positions and bellows-timing habits; many players use it to warm up even after owning a physical instrument.</p>
      </details>
    </section>
    <section style="border-bottom:none; padding-bottom: 88px;">
      <div class="final-cta">
        <h2>Put it into practice</h2>
        <p>Everything above works on the keyboard right now — sargam labels included on every key. Try the interactive practice exercises for guided, step-by-step feedback.</p>
        <div style="display:flex; gap:14px; justify-content:center; flex-wrap:wrap; margin-top:8px;">
          <a class="cta" href="/play">Open the harmonium →</a>
          <a class="btn-outline" href="/practice">Practice exercises →</a>
        </div>
      </div>
    </section>
  </div>
</main>
<footer class="site">
  <div class="wrap foot-row">
    <p>© 2026 Riyaz. Crafted for musicians.</p>
    <nav class="foot-links" aria-label="Footer">
      <a href="/play">Play Harmonium</a>
      <a href="/harmonium-notes">Harmonium Notes</a>
      <a href="/harmonium-songs">Harmonium Songs</a>
      <a href="/how-to-play-harmonium">How to Play</a>
    </nav>
  </div>
</footer>`;
