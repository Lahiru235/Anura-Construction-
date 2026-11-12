import { useState, useEffect, useRef } from "react";

/* ---------- Contact details ---------- */
const PHONE_DISPLAY = "+94 77 061 8758";
const PHONE_TEL = "+94770618758";
const WA_NUMBER = "94770618758"; // WhatsApp number, no "+" or spaces

/* ---------- Translations (Sinhala = si, English = en) ---------- */
const T = {
  si: {
    brand: "අනුර Construction",
    nav: { home: "මුල් පිටුව", about: "අප ගැන", projects: "ව්‍යාපෘති", contact: "අමතන්න" },
    h1a: "ඔබේ සිහින නිවස,",
    h1b: "විශ්වාසයෙන් ගොඩනඟමු.",
    heroSub: "කොළඹ, ගම්පහ, කැලණිය සහ රාජගිරිය ප්‍රදේශවල නිවාස ඉදිකර නිම කිරීමේ වසර 20ක අත්දැකීම්.",
    btnProjects: "ව්‍යාපෘති බලන්න",
    btnWA: "WhatsApp හරහා කතා කරන්න",
    stats: [
      { n: "20+", l: "වසරක පළපුරුද්ද" },
      { n: "4", l: "සේවා සපයන ප්‍රදේශ" },
      { n: "✓", l: "ඉදිකර නිම කළ නිවාස" },
    ],
    servicesT: "අපගේ සේවාවන්",
    servicesSub: "අත්තිවාරමේ සිට අවසන් නිමාව දක්වා සම්පූර්ණ නිවාස ඉදිකිරීම් සේවා.",
    services: [
      { n: "01", t: "නව නිවාස ඉදිකිරීම", d: "තනි මහල් සහ මහල් දෙකේ නවීන නිවාස අත්තිවාරමේ සිට සම්පූර්ණයෙන් ඉදිකිරීම." },
      { n: "02", t: "සම්පූර්ණ නිමාව", d: "වහල, ටයිල්, ජල නල, විදුලි වැඩ සහ අවසන් තීන්ත ආලේපය දක්වා සියලු නිමාවන්." },
      { n: "03", t: "අලුත්වැඩියා සහ පුළුල් කිරීම", d: "පවතින නිවාස නවීකරණය, ඉහළ මහල් එකතු කිරීම සහ පුළුල් කිරීමේ වැඩ." },
      { n: "04", t: "ස්ථාන පරීක්ෂාව සහ ඇස්තමේන්තු", d: "ඔබේ ඉඩමට පැමිණ පැහැදිලි වැඩ සැලැස්මක් සහ පිරිවැය ඇස්තමේන්තුවක් ලබා දීම." },
    ],
    processT: "අප වැඩ කරන ආකාරය",
    processSub: "පැහැදිලි පියවර හතරකින් ඔබේ නිවස ආරක්ෂිතව නිම කරමු.",
    steps: [
      { n: "01", t: "ස්ථාන පරීක්ෂාව", d: "ඔබේ ඉඩම පරීක්ෂා කර අවශ්‍යතා සාකච්ඡා කිරීම." },
      { n: "02", t: "පැහැදිලි ඇස්තමේන්තුව", d: "අමුද්‍රව්‍ය හා වැඩ කාලසටහන සමඟ විනිවිදභාවයෙන් මිල ගණන්." },
      { n: "03", t: "ගුණාත්මක ඉදිකිරීම", d: "පළපුරුදු කාර්ය මණ්ඩලය යටතේ නිරන්තර අධීක්ෂණයෙන් ගොඩනැගීම." },
      { n: "04", t: "සම්පූර්ණ භාරදීම", d: "අවසන් පරීක්ෂාවෙන් පසු නිම කළ නිවස ඔබට භාර දීම." },
    ],
    recent: "මෑත ව්‍යාපෘති",
    recentSub: "කොළඹ, ගම්පහ, කැලණිය සහ රාජගිරිය ප්‍රදේශවල අප ඉදිකර නිම කළ නිවාස.",
    all: "සියලු ව්‍යාපෘති",
    close: "වසන්න",
    ctaT: "නිවසක් තනන්න සැලසුම් කරනවාද?",
    ctaP: "WhatsApp පණිවිඩයක් එවන්න, අපි ඔබව අමතන්නෙමු.",
    aboutT: "අනුර Construction ගැන",
    aboutP1:
      "වසර 20කට වැඩි කාලයක් තිස්සේ අනුර Construction බස්නාහිර පළාතේ පවුල් වෙනුවෙන් නිවාස ඉදිකර ඇත. අත්තිවාරමේ සිට අවසන් තීන්ත ආලේපය දක්වා සෑම නිවසක්ම අපි නිම කර භාර දෙන්නෙමු.",
    aboutP2:
      "කොළඹ, ගම්පහ, කැලණිය සහ රාජගිරිය ප්‍රදේශවල නිවාස රැසක් අපි නිම කර හිමියන්ට භාර දී ඇත.",
    areasT: "අප නිවාස ඉදිකළ ප්‍රදේශ",
    areas: { colombo: "කොළඹ", gampaha: "ගම්පහ", kelaniya: "කැලණිය", rajagiriya: "රාජගිරිය" },
    projT: "අපගේ ව්‍යාපෘති",
    projSub: "අප ඉදිකර නිම කළ නිවාස.",
    filterAll: "සියල්ල",
    done: "නිම කළා",
    heroAlt: "අනුර Construction විසින් ඉදිකර නිම කළ නවීන දෙමහල් නිවස",
    aboutAlt: "බස්නාහිර පළාතේ ඉදිකර නිම කළ නවීන නිවස",
    contactT: "අප අමතන්න",
    contactSub: "දුරකථනයෙන් අමතන්න, නැතහොත් WhatsApp පණිවිඩයක් එවන්න.",
    phoneL: "දුරකථන / WhatsApp",
    call: "දැන් අමතන්න",
    name: "ඔබේ නම",
    msg: "ඔබේ නිවස ගැන කියන්න",
    send: "WhatsApp හරහා යවන්න",
    waHello: "ආයුබෝවන්! මම නිවසක් ගැන විමසන්න කැමතියි.",
    rights: "© අනුර Construction. සියලුම හිමිකම් ඇවිරිණි.",
  },
  en: {
    brand: "Anura Construction",
    nav: { home: "Home", about: "About Us", projects: "Projects", contact: "Contact Us" },
    h1a: "Your dream home,",
    h1b: "built with trust.",
    heroSub: "20 years of experience building and finishing houses in Colombo, Gampaha, Kelaniya and Rajagiriya.",
    btnProjects: "View projects",
    btnWA: "Chat on WhatsApp",
    stats: [
      { n: "20+", l: "Years of experience" },
      { n: "4", l: "Areas served" },
      { n: "✓", l: "Houses built & finished" },
    ],
    servicesT: "Our services",
    servicesSub: "Complete residential house construction from foundation to final handover.",
    services: [
      { n: "01", t: "New house construction", d: "Single- and two-storey homes built from groundwork and structure to handover." },
      { n: "02", t: "End-to-end finishing", d: "Roofing, tiling, plumbing, electrical fitting, woodwork, and final painting." },
      { n: "03", t: "Renovations & extensions", d: "Upper-floor additions, remodelling, and upgrading existing family homes." },
      { n: "04", t: "Site visits & estimates", d: "On-site assessment with practical guidance and clear cost breakdowns." },
    ],
    processT: "How we work",
    processSub: "A clear four-step process from first site visit to keys in hand.",
    steps: [
      { n: "01", t: "Site visit", d: "Inspect your plot and discuss your family's home requirements." },
      { n: "02", t: "Clear estimate", d: "Receive a transparent scope, timeline, and cost breakdown." },
      { n: "03", t: "Quality build", d: "Experienced crews executing every stage under close supervision." },
      { n: "04", t: "Final handover", d: "Final coat, quality inspection, and handover ready to move in." },
    ],
    recent: "Recent projects",
    recentSub: "Completed homes across Colombo, Gampaha, Kelaniya and Rajagiriya.",
    all: "All projects",
    close: "Close",
    ctaT: "Planning to build a house?",
    ctaP: "Send us a WhatsApp message and we will get back to you.",
    aboutT: "About Anura Construction",
    aboutP1:
      "For over 20 years, Anura Construction has built houses for families across the Western Province. From the first foundation to the final coat of paint, we see every house through to completion.",
    aboutP2:
      "We have completed houses in Colombo, Gampaha, Kelaniya and Rajagiriya, and every one was finished and handed over to its owners.",
    areasT: "Where we have built",
    areas: { colombo: "Colombo", gampaha: "Gampaha", kelaniya: "Kelaniya", rajagiriya: "Rajagiriya" },
    projT: "Our projects",
    projSub: "Houses we have built and finished.",
    filterAll: "All",
    done: "Completed",
    heroAlt: "Modern two-storey house built and finished by Anura Construction",
    aboutAlt: "Completed modern residential house in the Western Province",
    contactT: "Contact us",
    contactSub: "Call us, or send a message on WhatsApp.",
    phoneL: "Phone / WhatsApp",
    call: "Call now",
    name: "Your name",
    msg: "Tell us about your house",
    send: "Send on WhatsApp",
    waHello: "Hello! I would like to enquire about building a house.",
    rights: "© Anura Construction. All rights reserved.",
  },
};

/* ---------- Completed house projects ---------- */
const PROJECTS = [
  { id: 1, area: "colombo", img: "/images/project-1.jpg", title: { si: "නවීන මහල් දෙකේ නිවස", en: "Modern two-storey house" } },
  { id: 2, area: "gampaha", img: "/images/project-2.jpg", title: { si: "පවුල් නිවස", en: "Family home" } },
  { id: 3, area: "kelaniya", img: "/images/project-3.jpg", title: { si: "මැදමිදුල් නිවස", en: "Courtyard house" } },
  { id: 4, area: "rajagiriya", img: "/images/project-4.jpg", title: { si: "උද්‍යාන නිවස", en: "Garden house" } },
  { id: 5, area: "colombo", img: "/images/project-5.jpg", title: { si: "සාම්ප්‍රදායික නිවස", en: "Classic house" } },
  { id: 6, area: "gampaha", img: "/images/project-6.jpg", title: { si: "නවීන විලා නිවස", en: "Contemporary villa" } },
  { id: 7, area: "kelaniya", img: "/images/project-7.jpg", title: { si: "තනි මහල් නිවස", en: "Single-storey home" } },
  { id: 8, area: "rajagiriya", img: "/images/project-8.jpg", title: { si: "නගර නිවස", en: "Town house" } },
];

function Card({ pr, lang, t, eager = false, onOpen }) {
  const title = pr.title[lang];
  const areaLabel = t.areas[pr.area];
  return (
    <article className="card">
      <button type="button" className="card-btn" onClick={() => onOpen(pr)}>
        <div className="card-img">
          <img
            className="photo"
            src={pr.img}
            alt={`${title} - ${areaLabel}`}
            width={1264}
            height={848}
            loading={eager ? undefined : "lazy"}
            decoding="async"
          />
          <span className="badge">{areaLabel}</span>
        </div>
        <div className="card-body">
          <h3>{title}</h3>
          <p className="muted">✓ {t.done}</p>
        </div>
      </button>
    </article>
  );
}

function AboutSection({ t, headingAs = "h2" }) {
  const Heading = headingAs;
  return (
    <div className="wrap about">
      <div className="about-text">
        <div className="about-brand">
          <Logo size={34} />
          <span>{t.brand}</span>
        </div>
        <Heading>{t.aboutT}</Heading>
        <p>{t.aboutP1}</p>
        <p>{t.aboutP2}</p>
        <h3>{t.areasT}</h3>
        <div className="chips">
          {Object.keys(t.areas).map((k) => (
            <span key={k} className="chip">
              {t.areas[k]}
            </span>
          ))}
        </div>
      </div>
      <div className="about-side">
        <div className="big20">
          <b>20+</b>
          <span>{t.stats[0].l}</span>
        </div>
        <div className="about-img">
          <img
            className="photo"
            src="/images/about.jpg"
            alt={t.aboutAlt}
            width={1264}
            height={848}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}

function ContactSection({ t, form, setForm, waLink, sendWA, headingAs = "h2" }) {
  const Heading = headingAs;
  return (
    <div className="wrap contact">
      <div>
        <Heading>{t.contactT}</Heading>
        <p className="muted">{t.contactSub}</p>
        <div className="phone-box">
          <div className="contact-brand">
            <Logo size={30} />
            <span>{t.brand}</span>
          </div>
          <span className="muted">{t.phoneL}</span>
          <a className="phone-num" href={`tel:${PHONE_TEL}`}>
            {PHONE_DISPLAY}
          </a>
          <div className="btns">
            <a className="btn amber" href={`tel:${PHONE_TEL}`}>
              {t.call}
            </a>
            <a className="btn wa" href={waLink()} target="_blank" rel="noopener noreferrer">
              <WaIcon /> WhatsApp
            </a>
          </div>
        </div>
        <div className="chips">
          {Object.keys(t.areas).map((k) => (
            <span key={k} className="chip">
              {t.areas[k]}
            </span>
          ))}
        </div>
      </div>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          sendWA();
        }}
      >
        <label>
          {t.name}
          <input autoComplete="name" value={form.name} placeholder={t.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </label>
        <label>
          {t.msg}
          <textarea rows="5" value={form.msg} placeholder={t.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} />
        </label>
        <button type="submit" className="btn wa">
          <WaIcon /> {t.send}
        </button>
      </form>
    </div>
  );
}

function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" className="logo-mark">
      <rect x="1.5" y="1.5" width="45" height="45" rx="11" fill="#0B1F3A" stroke="#F5A800" strokeWidth="2.2" />
      <path d="M16 24.5L24 17L32 24.5" fill="#F5A800" opacity="0.22" />
      <path d="M9.5 24.5L24 11L38.5 24.5" fill="none" stroke="#F5A800" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 23.5V36.5H34V23.5" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="10" y1="36.5" x2="38" y2="36.5" stroke="#F5A800" strokeWidth="3.2" strokeLinecap="round" />
      <rect x="20.7" y="20.2" width="2.8" height="2.8" rx="0.4" fill="#F5A800" />
      <rect x="24.5" y="20.2" width="2.8" height="2.8" rx="0.4" fill="#F5A800" />
      <rect x="20.7" y="24" width="2.8" height="2.8" rx="0.4" fill="#F5A800" />
      <rect x="24.5" y="24" width="2.8" height="2.8" rx="0.4" fill="#F5A800" />
      <rect x="21.5" y="29.2" width="5" height="7.3" rx="0.8" fill="#F5A800" />
    </svg>
  );
}

const WaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.200zm4.500-6.100c-.2-.1-1.500-.7-1.700-.8-.2-.1-.4-.1-.6.100l-.8 1c-.1.200-.3.200-.5.100a6.700 6.700 0 0 1-3.300-2.900c-.2-.4.200-.4.700-1.300.1-.2 0-.3 0-.5l-.8-1.800c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.100-.7.300-.7.700-1 1.500-1 2.400.1 1 .5 2 1.200 2.800a9.600 9.600 0 0 0 3.900 3.300c1.500.6 2.100.7 2.900.6.500-.1 1.500-.6 1.700-1.200.2-.6.200-1.100.2-1.200-.1-.1-.3-.2-.5-.3z" />
  </svg>
);

/* ---------- Main app ---------- */
export default function AnuraConstruction() {
  const [lang, setLang] = useState("si"); // Sinhala by default for the local audience
  const [page, setPage] = useState("home");
  const [menu, setMenu] = useState(false);
  const [area, setArea] = useState("all");
  const [form, setForm] = useState({ name: "", msg: "" });
  const [preview, setPreview] = useState(null);
  const dialogRef = useRef(null);
  const headerRef = useRef(null);
  const t = T[lang];

  useEffect(() => {
    try {
      const saved = localStorage.getItem("anura-lang");
      if (saved === "si" || saved === "en") setLang(saved);
    } catch (e) {}
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang === "si" ? "si" : "en";
    document.title = t.brand;
    try {
      localStorage.setItem("anura-lang", lang);
    } catch (e) {}
  }, [lang, t.brand]);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (preview && !dlg.open) dlg.showModal();
    else if (!preview && dlg.open) dlg.close();
  }, [preview]);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMenu(false);
    };
    const onDown = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [menu]);

  const go = (p) => {
    setPage(p);
    setMenu(false);
    window.scrollTo({ top: 0 });
  };
  const waLink = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text || t.waHello)}`;
  const sendWA = () => {
    const text = `${t.waHello}\n${form.name ? form.name + "\n" : ""}${form.msg}`;
    window.open(waLink(text), "_blank", "noopener");
  };

  const navItems = ["home", "about", "projects", "contact"];
  const shown = area === "all" ? PROJECTS : PROJECTS.filter((x) => x.area === area);

  return (
    <div className={`app ${lang}`}>
      <style>{css}</style>

      {/* Top bar with language switch */}
      <div className="topbar">
        <div className="wrap topbar-in">
          <div className="lang" role="group" aria-label="Language">
            <button aria-pressed={lang === "si"} onClick={() => setLang("si")}>
              සිංහල
            </button>
            <button aria-pressed={lang === "en"} onClick={() => setLang("en")}>
              English
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="header" ref={headerRef}>
        <div className="wrap header-in">
          <button className="brand" onClick={() => go("home")} aria-label={t.brand}>
            <Logo size={42} />
            <span>{t.brand}</span>
          </button>
          <button
            className="burger"
            aria-label={lang === "si" ? "මෙනුව" : "Menu"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            <span />
            <span />
            <span />
          </button>
          <nav className={`nav ${menu ? "open" : ""}`} aria-label={lang === "si" ? "ප්‍රධාන මෙනුව" : "Main navigation"}>
            {navItems.map((k) => (
              <button
                key={k}
                className={page === k ? "active" : ""}
                aria-current={page === k ? "page" : undefined}
                onClick={() => go(k)}
              >
                {t.nav[k]}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {/* ---------------- HOME ---------------- */}
        {page === "home" && (
          <>
            <section className="hero">
              <div className="wrap hero-in">
                <div className="hero-text">
                  <div className="hero-brand">
                    <Logo size={26} />
                    <span>{t.brand}</span>
                  </div>
                  <h1>
                    {t.h1a}
                    <br />
                    <span>{t.h1b}</span>
                  </h1>
                  <p>{t.heroSub}</p>
                  <div className="btns">
                    <button className="btn amber" onClick={() => go("projects")}>
                      {t.btnProjects}
                    </button>
                    <a className="btn ghost" href={waLink()} target="_blank" rel="noopener noreferrer">
                      <WaIcon /> {t.btnWA}
                    </a>
                  </div>
                </div>
                <div className="hero-img">
                  <img
                    className="photo"
                    src="/images/hero.jpg"
                    alt={t.heroAlt}
                    width={1264}
                    height={848}
                    fetchPriority="high"
                    decoding="async"
                  />
                </div>
              </div>
            </section>

            <div className="wrap">
              <div className="stats">
                {t.stats.map((s, i) => (
                  <div key={i} className="stat">
                    <b>{s.n}</b>
                    <span>{s.l}</span>
                  </div>
                ))}
              </div>
            </div>

            <section className="section wrap">
              <div className="sec-head">
                <div>
                  <h2>{t.servicesT}</h2>
                  <p className="muted sec-sub">{t.servicesSub}</p>
                </div>
              </div>
              <div className="grid4">
                {t.services.map((srv) => (
                  <article key={srv.n} className="info-card">
                    <span className="num-pill">{srv.n}</span>
                    <h3>{srv.t}</h3>
                    <p className="muted">{srv.d}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="band-white section">
              <div className="wrap">
                <div className="sec-head">
                  <div>
                    <h2>{t.recent}</h2>
                    <p className="muted sec-sub">{t.recentSub}</p>
                  </div>
                  <button className="btn outline" onClick={() => go("projects")}>
                    {t.all}
                  </button>
                </div>
                <div className="grid">
                  {PROJECTS.slice(0, 4).map((pr) => (
                    <Card key={pr.id} pr={pr} lang={lang} t={t} onOpen={setPreview} />
                  ))}
                </div>
              </div>
            </section>

            <section className="section wrap">
              <div className="sec-head">
                <div>
                  <h2>{t.processT}</h2>
                  <p className="muted sec-sub">{t.processSub}</p>
                </div>
              </div>
              <div className="grid4">
                {t.steps.map((st) => (
                  <div key={st.n} className="step-card">
                    <span className="step-num">{st.n}</span>
                    <h3>{st.t}</h3>
                    <p className="muted">{st.d}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="band-white section">
              <AboutSection t={t} headingAs="h2" />
            </section>

            <section className="cta">
              <div className="wrap cta-in">
                <div>
                  <h2>{t.ctaT}</h2>
                  <p>{t.ctaP}</p>
                </div>
                <a className="btn amber" href={waLink()} target="_blank" rel="noopener noreferrer">
                  <WaIcon /> {t.btnWA}
                </a>
              </div>
            </section>

            <section className="section">
              <ContactSection t={t} form={form} setForm={setForm} waLink={waLink} sendWA={sendWA} headingAs="h2" />
            </section>
          </>
        )}

        {/* ---------------- ABOUT ---------------- */}
        {page === "about" && (
          <section className="section">
            <AboutSection t={t} headingAs="h1" />
          </section>
        )}

        {/* ---------------- PROJECTS ---------------- */}
        {page === "projects" && (
          <section className="section wrap">
            <div className="about-brand">
              <Logo size={34} />
              <span>{t.brand}</span>
            </div>
            <h1>{t.projT}</h1>
            <p className="muted">{t.projSub}</p>
            <div className="chips filters">
              {["all", "colombo", "gampaha", "kelaniya", "rajagiriya"].map((k) => (
                <button key={k} className={`chip ${area === k ? "on" : ""}`} aria-pressed={area === k} onClick={() => setArea(k)}>
                  {k === "all" ? t.filterAll : t.areas[k]}
                </button>
              ))}
            </div>
            <div className="grid">
              {shown.map((pr, idx) => (
                <Card key={pr.id} pr={pr} lang={lang} t={t} eager={idx < 4} onOpen={setPreview} />
              ))}
            </div>
          </section>
        )}

        {/* ---------------- CONTACT ---------------- */}
        {page === "contact" && (
          <section className="section">
            <ContactSection t={t} form={form} setForm={setForm} waLink={waLink} sendWA={sendWA} headingAs="h1" />
          </section>
        )}
      </main>

      <footer className="footer">
        <div className="wrap footer-in">
          <div className="brand static">
            <Logo size={40} />
            <span>{t.brand}</span>
          </div>
          <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
          <small>{t.rights}</small>
        </div>
      </footer>

      {/* Floating WhatsApp button */}
      <a className="fab" href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <WaIcon />
      </a>

      <dialog
        ref={dialogRef}
        className="lightbox"
        onClose={() => setPreview(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setPreview(null);
        }}
      >
        {preview && (
          <div className="lightbox-in">
            <img src={preview.img} alt={`${preview.title[lang]} - ${t.areas[preview.area]}`} width={1264} height={848} />
            <div className="lightbox-bar">
              <div>
                <span className="badge static">{t.areas[preview.area]}</span>
                <h3>{preview.title[lang]}</h3>
                <p className="muted">✓ {t.done}</p>
              </div>
              <button type="button" className="btn outline" onClick={() => setPreview(null)}>
                {t.close}
              </button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}

/* ---------- Styles (palette taken from the sample: deep navy + construction amber) ---------- */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Sinhala:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
body{margin:0}
.app{--navy:#0B1F3A;--navy2:#13294B;--amber:#F5A800;--amber-d:#D98F00;--bg:#F4F6FA;--card:#fff;--muted:#5B6B82;--line:#DFE5EE;
 font-family:'Plus Jakarta Sans','Noto Sans Sinhala',system-ui,sans-serif;color:var(--navy);background:var(--bg);min-height:100dvh;line-height:1.55;overflow-x:clip}
.app.si{line-height:1.75}
.app *{box-sizing:border-box}
:where(.app) button{font:inherit;cursor:pointer;color:inherit}
.app a{color:inherit;text-decoration:none}
.app :focus-visible{outline:3px solid var(--amber);outline-offset:2px}
.wrap{max-width:1380px;margin:0 auto;padding:0 clamp(20px,3vw,48px)}
h1,h2,h3{line-height:1.25;margin:0}
.muted{color:var(--muted)}.small{font-size:13px;margin-top:14px}

.topbar{background:var(--navy);color:#fff;font-size:14px}
.topbar-in{display:flex;justify-content:flex-end;align-items:center;padding-top:8px;padding-bottom:8px}
.lang{display:flex;background:var(--navy2);border-radius:999px;padding:3px}
.lang button{border:0;background:transparent;color:#cdd8ea;padding:5px 16px;border-radius:999px;font-weight:600}
.lang button[aria-pressed="true"]{background:var(--amber);color:var(--navy)}

.header{background:#fff;border-bottom:1px solid var(--line);position:sticky;top:0;z-index:20}
.header-in{display:flex;align-items:center;justify-content:space-between;height:68px;gap:12px}
.brand{display:flex;align-items:center;gap:10px;background:none;border:0;padding:0;font-weight:800;font-size:clamp(17px,2.4vw,21px);letter-spacing:-.015em;color:var(--navy);min-width:0}
.brand span{font-weight:800;white-space:nowrap}
.brand.static{color:#fff;font-size:19px}
.logo-mark{flex-shrink:0;display:block}
.nav{display:flex;gap:6px}
.nav button{background:none;border:0;padding:10px 16px;font-weight:600;border-radius:8px;border-bottom:3px solid transparent}
.nav button:hover{background:var(--bg)}
.nav button.active{border-bottom-color:var(--amber)}
.burger{display:none;background:none;border:0;padding:8px;min-width:44px;min-height:44px;flex-direction:column;justify-content:center;align-items:center;gap:5px;border-radius:8px;flex-shrink:0}
.burger span{display:block;width:24px;height:3px;background:var(--navy);border-radius:2px;transition:transform .2s ease,opacity .2s ease}
.burger[aria-expanded="true"] span:nth-child(1){transform:translateY(8px) rotate(45deg)}
.burger[aria-expanded="true"] span:nth-child(2){opacity:0}
.burger[aria-expanded="true"] span:nth-child(3){transform:translateY(-8px) rotate(-45deg)}

.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:12px 22px;border-radius:8px;font-weight:700;border:2px solid transparent;transition:transform .15s}
.btn:hover{transform:translateY(-1px)}
.btn.amber{background:var(--amber);color:var(--navy)}
.btn.amber:hover{background:var(--amber-d)}
.btn.ghost{background:transparent;border-color:#ffffff66;color:#fff}
.btn.outline{background:#fff;border-color:var(--navy)}
.btn.wa{background:#25D366;color:#063b1b}
.btns{display:flex;flex-wrap:wrap;gap:12px;margin-top:24px}

.hero{background:var(--navy);color:#fff;overflow:clip}
.hero-in{display:grid;grid-template-columns:1.05fr 1.15fr;align-items:center;gap:44px;padding-top:52px;padding-bottom:96px}
.hero-brand{display:inline-flex;align-items:center;gap:10px;background:#ffffff12;border:1px solid #ffffff26;padding:5px 14px 5px 6px;border-radius:999px;margin-bottom:18px;font-weight:700;font-size:14px;color:#fff}
.hero h1{font-size:clamp(34px,4.5vw,56px);font-weight:800}
.hero h1 span{color:var(--amber)}
.hero p{font-size:18px;color:#d3ddee;max-width:520px;margin:18px 0 0}
.hero-img{border-radius:16px;overflow:clip;aspect-ratio:3/2;box-shadow:0 18px 40px #00000055;border:1px solid #ffffff22}
.photo{width:100%;height:100%;object-fit:cover;display:block;transition:transform .35s ease}

.stats{display:grid;grid-template-columns:repeat(3,1fr);background:var(--navy2);color:#fff;border-radius:14px;margin-top:-52px;position:relative;box-shadow:0 12px 30px #0b1f3a33}
.stat{padding:22px 24px;display:flex;align-items:center;gap:16px}
.stat+.stat{border-left:1px solid #ffffff22}
.stat b{font-size:38px;color:var(--amber);font-weight:800}
.stat span{font-weight:600;color:#dbe5f5}

.band-white{background:#fff;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.section{padding-top:60px;padding-bottom:60px}
.sec-head{display:flex;justify-content:space-between;align-items:flex-end;gap:16px;margin-bottom:28px;flex-wrap:wrap}
.sec-sub{margin:8px 0 0;font-size:16px;max-width:62ch}
.section h1{font-size:clamp(28px,4vw,40px)}
.section h2{font-size:clamp(24px,3.2vw,34px)}
.grid,.grid4{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:22px;margin-top:24px}
.sec-head+.grid,.sec-head+.grid4{margin-top:0}
.info-card,.step-card{background:#fff;border:1px solid var(--line);border-radius:14px;padding:24px;display:flex;flex-direction:column;gap:10px}
.info-card{border-top:4px solid var(--amber);transition:box-shadow .2s ease,transform .2s ease}
.info-card:hover{box-shadow:0 10px 24px #0b1f3a12;transform:translateY(-2px)}
.num-pill{display:inline-grid;place-items:center;width:40px;height:40px;border-radius:10px;background:var(--navy);color:var(--amber);font-weight:800;font-size:15px}
.step-num{font-size:30px;font-weight:800;line-height:1;color:var(--amber)}
.info-card h3,.step-card h3{font-size:18px}
.info-card p,.step-card p{margin:0;font-size:15px}
.card{background:var(--card);border:1px solid var(--line);border-radius:12px;overflow:clip;transition:box-shadow .2s ease,transform .2s ease}
.card-btn{display:block;width:100%;text-align:left;background:none;border:0;padding:0}
.card:hover{box-shadow:0 10px 24px #0b1f3a18;transform:translateY(-2px)}
.card:hover .photo{transform:scale(1.03)}
.card-img{position:relative;aspect-ratio:3/2;overflow:clip;background:#e4eaf3}
.badge{position:absolute;top:12px;left:12px;background:var(--amber);color:var(--navy);font-weight:700;font-size:13px;padding:4px 12px;border-radius:6px;box-shadow:0 2px 8px #0b1f3a44}
.badge.static{position:static;display:inline-block;margin-bottom:8px;box-shadow:none}
.card-body{padding:16px 18px}
.card-body h3{font-size:18px}
.card-body p{margin:6px 0 0;font-size:14px;font-weight:600;color:#1f8a4c}

.cta{background:linear-gradient(100deg,var(--navy) 55%,#1c3a68);color:#fff}
.cta-in{display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap;padding-top:48px;padding-bottom:48px}
.cta h2{font-size:clamp(24px,3.4vw,32px)}
.cta p{color:#d3ddee;margin:8px 0 0}

.about{display:grid;grid-template-columns:1.2fr 1fr;gap:48px;align-items:start}
.about-brand{display:inline-flex;align-items:center;gap:10px;margin-bottom:14px;font-weight:800;font-size:16px;color:var(--navy)}
.about-text p{font-size:17px;max-width:62ch;margin:16px 0 0}
.about-text h3{margin-top:32px;font-size:20px}
.chips{display:flex;flex-wrap:wrap;flex-wrap:balance;gap:10px;margin-top:14px}
.chip{background:#fff;border:1px solid var(--line);padding:7px 18px;min-height:40px;display:inline-flex;align-items:center;border-radius:999px;font-weight:600}
button.chip:hover{border-color:var(--navy)}
.chip.on{background:var(--navy);border-color:var(--navy);color:#fff}
.filters{margin-top:20px}
.big20{background:var(--amber);border-radius:14px;padding:22px 26px;display:flex;align-items:center;gap:18px}
.big20 b{font-size:56px;font-weight:800;line-height:1}
.big20 span{font-weight:700;font-size:18px}
.about-img{margin-top:18px;border-radius:14px;overflow:hidden;aspect-ratio:3/2;box-shadow:0 10px 24px #0b1f3a18}

.contact{display:grid;grid-template-columns:1fr 1fr;gap:48px}
.phone-box{background:#fff;border:1px solid var(--line);border-left:6px solid var(--amber);border-radius:12px;padding:22px 24px;margin:24px 0}
.contact-brand{display:flex;align-items:center;gap:10px;margin-bottom:14px;padding-bottom:12px;border-bottom:1px solid var(--line);font-weight:800;font-size:16px}
.phone-box .phone-num{display:block;font-size:clamp(22px,5.5vw,30px);font-weight:800;margin-top:4px;overflow-wrap:anywhere}
.form{background:#fff;border:1px solid var(--line);border-radius:14px;padding:26px;display:flex;flex-direction:column;gap:18px;align-self:start}
.form label{display:flex;flex-direction:column;gap:6px;font-weight:600}
.form input,.form textarea{font:inherit;font-size:16px;min-height:46px;padding:12px 14px;border:1px solid #c5cedd;border-radius:8px;background:#fff;color:var(--navy);resize:vertical}
.form .btn{justify-content:center}

.footer{background:var(--navy);color:#cdd8ea}
.footer-in{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;padding-top:28px;padding-bottom:28px}
.footer a{font-weight:700;color:var(--amber)}

.fab{position:fixed;right:max(16px,env(safe-area-inset-right));bottom:max(16px,env(safe-area-inset-bottom));width:56px;height:56px;border-radius:50%;background:#25D366;color:#063b1b;display:grid;place-items:center;box-shadow:0 6px 18px #0004;z-index:30}
.fab svg{width:30px;height:30px}

.lightbox{border:0;border-radius:16px;padding:0;margin:auto;overflow:clip;max-width:860px;width:calc(100% - 24px);background:#fff;color:var(--navy);box-shadow:0 24px 60px #0008}
.lightbox::backdrop{background:#0b1f3acc}
.lightbox-in img{width:100%;height:auto;max-height:70dvh;object-fit:cover;display:block}
.lightbox-bar{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:18px 22px;flex-wrap:wrap}
.lightbox-bar p{margin:4px 0 0;font-size:14px;font-weight:600;color:#1f8a4c}

@media (max-width:1024px){
 .grid,.grid4{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (max-width:860px){
 .header-in{height:64px}
 .burger{display:flex}
 .nav{display:none;position:absolute;top:64px;left:0;right:0;background:#fff;border-bottom:1px solid var(--line);box-shadow:0 14px 32px #0b1f3a1f;flex-direction:column;padding:12px 20px 18px;gap:4px}
 .nav.open{display:flex}
 .nav button{text-align:left;min-height:46px;display:flex;align-items:center;border-bottom:0;border-left:4px solid transparent;padding:10px 14px}
 .nav button.active{background:#fff7e0;border-left-color:var(--amber);border-bottom-color:transparent}
 .hero-in{grid-template-columns:1fr;padding-top:28px;padding-bottom:72px;gap:24px}
 .hero p{font-size:16px;margin-top:14px}
 .stats{grid-template-columns:1fr;margin-top:-40px}
 .stat{padding:16px 20px;gap:14px}
 .stat b{font-size:28px;min-width:50px}
 .stat+.stat{border-left:0;border-top:1px solid #ffffff22}
 .section{padding-top:42px;padding-bottom:42px}
 .about,.contact{grid-template-columns:1fr;gap:28px}
}
@media (max-width:600px){
 .topbar-in{padding-top:6px;padding-bottom:6px}
 .lang button{padding:6px 14px;font-size:13px;min-height:36px}
 .hero h1{font-size:clamp(28px,7.5vw,38px)}
 .hero .btns,.phone-box .btns{flex-direction:column}
 .hero .btns .btn,.phone-box .btns .btn,.cta-in .btn,.sec-head .btn{width:100%}
 .grid,.grid4{grid-template-columns:1fr;gap:16px}
 .info-card,.step-card,.form,.phone-box{padding:18px}
 .big20{padding:18px 20px}
 .big20 b{font-size:44px}
 .cta-in{padding-top:36px;padding-bottom:36px}
 .footer-in{flex-direction:column;align-items:flex-start;gap:10px;padding-bottom:84px}
 .fab{width:52px;height:52px}
 .lightbox-in img{max-height:55dvh}
 .lightbox-bar{padding:16px}
}
@media (max-width:380px){
 .header .logo-mark{width:34px;height:34px}
 .brand{font-size:16px;gap:8px}
}
@media (prefers-reduced-motion:reduce){.btn,.card,.info-card,.photo,.burger span{transition:none}}
`;
