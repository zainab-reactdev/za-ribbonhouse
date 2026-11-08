import { useEffect, useRef, useState } from "react";

const BRAND = "ZA RibbonHouse";
const TAGLINE = "Tied with Love";
const PHONE = "923242778992";
const EMAIL = "zaineali987@gmail.com";
const INSTAGRAM = "https://www.instagram.com/za.ribbonhouse";
const INSTA_HANDLE = "@za.ribbonhouse";

const img = (file) => `/images/${encodeURIComponent(file)}`;

const LOGO = img("Logo.jpeg");

// Edit names and prices here
const products = [
  { name: "Red Rose Bouquet", price: "Rs 2000", img: img("Product 1.jpeg") },
  { name: "Pearl Ribbon Choker", price: "Rs 900", img: img("Product 2.jpeg") },
  { name: "Rose Chocolate Bouquet", price: "Rs 4500", img: img("Product 3.jpeg") },
  { name: "Pearl Bag Charm", price: "Rs 750", img: img("Product 4.jpeg") },
  { name: "Satin Bow Clips", price: "Rs 300", img: img("Product 5.jpeg") },
  { name: "Bridesmaid Wrist Corsage", price: "Rs 1200", img: img("Product 6.jpeg") },
];

// icon options: heart | pencil | truck | chat | sparkles | gift
const WHY = [
  {
    icon: "heart",
    title: "Handmade with Care",
    text: "Every piece is tied, shaped and finished by hand, never mass produced.",
  },
  {
    icon: "pencil",
    title: "Customised Orders",
    text: "Have something special in mind? We can create your favourite items just the way you want them.",
  },
  {
    icon: "truck",
    title: "Fast Delivery",
    text: "Your orders will be delivered to your doorstep within 2 weeks.",
  },
  {
    icon: "chat",
    title: "Easy Ordering",
    text: "Pick your favorite and order straight on WhatsApp. No sign-ups, no hassle.",
  },
];

const STORY = [
  "ZA RibbonHouse was started by Zaine and Zainab with one simple belief: the smallest details make the prettiest moments.",
  "We create handmade ribbon accessories, each one tied and finished by hand with patience and care.",
  "Whether it's for your everyday look or a gift for someone special, we hope every piece adds a little charm and a lot of love to your day.",
  "Thank you for supporting our small handmade business.",
];

// Floating hearts and sparkles for the hero.
// To remove one, delete its line. To add one, copy a line and change pos.
const DECOR = [
  { type: "heart", pos: "left-[22%] top-[18%]", size: "text-3xl", color: "text-[#E68DB0]", anim: "floaty", delay: "1.5s" },
  { type: "heart", pos: "right-[24%] top-[16%]", size: "text-2xl", color: "text-[#B84A74]", anim: "floaty-slow", delay: "0.8s" },
  { type: "heart", pos: "left-[6%] top-[55%]", size: "text-2xl", color: "text-[#B84A74]", anim: "floaty-slow", delay: "2.2s" },
  { type: "heart", pos: "right-[7%] top-[58%]", size: "text-3xl", color: "text-[#E68DB0]", anim: "floaty", delay: "0.3s" },
  { type: "heart", pos: "left-[30%] bottom-[18%]", size: "text-xl", color: "text-[#F7B6CD]", anim: "floaty", delay: "1.2s" },
  { type: "star", pos: "left-[14%] top-[38%]", size: "text-2xl", color: "text-white", anim: "twinkle", delay: "0.2s" },
  { type: "star", pos: "right-[16%] top-[40%]", size: "text-3xl", color: "text-white", anim: "twinkle", delay: "1.1s" },
  { type: "star", pos: "left-[40%] top-[12%]", size: "text-xl", color: "text-white", anim: "twinkle", delay: "1.8s" },
  { type: "star", pos: "right-[32%] bottom-[16%]", size: "text-2xl", color: "text-white", anim: "twinkle", delay: "0.6s" },
  { type: "star", pos: "left-[8%] bottom-[12%]", size: "text-xl", color: "text-[#F7B6CD]", anim: "twinkle", delay: "2.4s" },
  { type: "star", pos: "right-[8%] bottom-[10%]", size: "text-xl", color: "text-white", anim: "twinkle", delay: "1.5s" },
];

// One script style used everywhere (section sub-lines and the signature)
const SCRIPT_LINE = "font-script text-2xl text-[#8E2F5C]";

// One card style used in Collection, Why Choose Us and Our Story
const CARD = "rounded-3xl border border-[#F7B6CD] bg-white shadow-sm";

const waLink = (text) =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;

const WaIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-current" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.200Zm4.500-6.100c-.2-.1-1.500-.7-1.700-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.200-.3.200-.5.100a6.700 6.700 0 0 1-3.300-2.900c-.2-.4.200-.4.700-1.300.1-.2 0-.3 0-.5l-.8-1.800c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.100-.7.300-.2.300-.9.900-.9 2.200s.9 2.500 1 2.700c.1.200 1.800 2.800 4.400 3.900 1.600.7 2.300.7 3.100.6.500-.1 1.500-.6 1.700-1.200.2-.6.2-1.100.2-1.200-.1-.1-.3-.2-.5-.3Z" />
  </svg>
);

// Line icons for the Why Choose Us cards
function WhyIcon({ name }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-6 w-6",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  if (name === "heart")
    return (
      <svg {...common}>
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    );
  if (name === "pencil")
    return (
      <svg {...common}>
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        <path d="m15 5 4 4" />
      </svg>
    );
  if (name === "truck")
    return (
      <svg {...common}>
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
        <path d="M15 18H9" />
        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
        <circle cx="17" cy="18" r="2" />
        <circle cx="7" cy="18" r="2" />
      </svg>
    );
  if (name === "sparkles")
    return (
      <svg {...common}>
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
        <path d="M20 3v4" />
        <path d="M22 5h-4" />
        <path d="M4 17v2" />
        <path d="M5 18H3" />
      </svg>
    );
  if (name === "gift")
    return (
      <svg {...common}>
        <rect x="3" y="8" width="18" height="4" rx="1" />
        <path d="M12 8v13" />
        <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
        <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
      </svg>
    );
  // chat
  return (
    <svg {...common}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

const Bow = ({ className = "" }) => (
  <svg viewBox="0 0 120 70" className={className} fill="currentColor" aria-hidden="true">
    <path d="M60 35 C45 5 10 0 4 14 C0 26 22 44 60 35Z" />
    <path d="M60 35 C75 5 110 0 116 14 C120 26 98 44 60 35Z" />
    <path d="M60 35 C48 48 38 62 30 68 L46 62 L56 46Z" />
    <path d="M60 35 C72 48 82 62 90 68 L74 62 L64 46Z" />
    <circle cx="60" cy="35" r="8" />
  </svg>
);

// color = next section color, bg = previous section color (optional)
function Wave({ color, bg }) {
  return (
    <div style={bg ? { background: bg } : undefined}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="block h-10 w-full sm:h-16">
        <path
          d="M0,40 C240,90 480,0 720,40 C960,80 1200,10 1440,40 L1440,80 L0,80 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${show ? "show" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

// Same title design for every section: heading, a line below it, then the script line
function SectionTitle({ children, sub }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="font-serif-d text-3xl font-semibold text-[#5E1A3A] sm:text-4xl">
        {children}
      </h2>
      <div className="mx-auto mt-3 h-[3px] w-20 rounded-full bg-[#B84A74]" />
      {sub && <p className={`${SCRIPT_LINE} mt-3`}>{sub}</p>}
    </div>
  );
}

// Just the logo itself, with no extra frame or circle around it.
// mix-blend-multiply hides the white background of the image.
function LogoBadge({ className = "h-14 w-14" }) {
  return (
    <img
      src={LOGO}
      alt={`${BRAND} logo`}
      className={`${className} shrink-0 object-contain mix-blend-multiply`}
    />
  );
}

export default function App() {
  return (
    <div className="text-[#5E1A3A]">
      {/* FLOATING PILL NAVBAR */}
      <nav className="fixed left-3 right-3 top-3 z-30 mx-auto flex max-w-5xl items-center justify-between rounded-full border border-[#F7B6CD] bg-white/90 py-1 pl-3 pr-3 shadow-lg shadow-[#B84A74]/15 backdrop-blur sm:pr-4">
        <a href="#top" className="flex items-center gap-2">
          <LogoBadge className="h-12 w-12" />
          <span className="hidden text-base font-semibold tracking-wide text-[#5E1A3A] sm:inline">
            {BRAND}
          </span>
        </a>
        <div className="flex items-center gap-1 text-xs font-medium sm:gap-2 sm:text-sm">
          <a href="#top" className="rounded-full bg-[#B84A74] px-3 py-1.5 text-white sm:px-4">
            Home
          </a>
          <a href="#products" className="rounded-full px-3 py-1.5 hover:bg-[#FFD9E6]">
            Shop
          </a>
          <a href="#why" className="rounded-full px-3 py-1.5 hover:bg-[#FFD9E6]">
            Why Us
          </a>
          <a href="#about" className="hidden rounded-full px-3 py-1.5 hover:bg-[#FFD9E6] sm:block">
            Our Story
          </a>
          <a href="#contact" className="hidden rounded-full px-3 py-1.5 hover:bg-[#FFD9E6] sm:block">
            Contact
          </a>
        </div>
      </nav>

      {/* HERO: one fixed bow in the center, floating hearts and sparkles */}
      <header
        id="top"
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#FFD9E6] via-[#FFE9F1] to-[#FFF5F8]"
      >
        {/* soft glowing circles */}
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#F7B6CD]/50 blur-3xl" />
        <div className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-[#E68DB0]/30 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-white/70 blur-3xl" />

        {/* floating hearts and sparkles */}
        {DECOR.map((d, i) => (
          <span
            key={i}
            className={`${d.anim} absolute ${d.pos} ${d.size} ${d.color}`}
            style={{ animationDelay: d.delay }}
            aria-hidden="true"
          >
            {d.type === "heart" ? "♡" : "✦"}
          </span>
        ))}

        <div className="relative z-10 px-5 pb-24 pt-28 text-center">
          {/* this bow is fixed: it does not move */}
          <Bow className="mx-auto h-14 w-24 text-[#B84A74] drop-shadow sm:h-20 sm:w-32" />
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#8E2F5C]">
            Handmade ribbon accessories
          </p>
          <h1 className="font-serif-d mt-3 text-5xl font-bold leading-tight sm:text-7xl">
            ZA RibbonHouse
          </h1>
          <p className="mt-3 text-lg font-medium text-[#8E2F5C] sm:text-xl">
            {TAGLINE} <span className="text-[#E68DB0]">♡</span>
          </p>
          <a
            href="#products"
            className="btn-shine mt-8 inline-block rounded-full border-2 border-white px-9 py-3 font-semibold text-white shadow-xl transition hover:scale-105"
          >
            Shop Now
          </a>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <Wave color="#FFF5F8" />
        </div>
      </header>

      {/* PRODUCTS: all cards in a row are the same height, buttons line up */}
      <section id="products" className="scroll-mt-24 bg-[#FFF5F8] px-4 pb-16 pt-8">
        <div className="mx-auto max-w-5xl">
          <SectionTitle sub="Explore more products on our Instagram">Our Collection</SectionTitle>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.img} delay={(i % 3) * 120} className="h-full">
                <div className={`${CARD} flex h-full flex-col p-2.5 sm:p-3`}>
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="aspect-[4/5] w-full rounded-2xl object-cover"
                  />
                  {/* name area grows, so price and button always sit at the bottom */}
                  <h3 className="font-serif-d mt-3 flex flex-1 items-center justify-center px-1 text-center text-sm font-semibold leading-snug sm:text-xl">
                    {p.name}
                  </h3>
                  <p className="mx-auto mt-2 w-fit rounded-full bg-[#FFD9E6] px-4 py-0.5 text-sm font-semibold text-[#8E2F5C]">
                    {p.price}
                  </p>
                  <a
                    href={waLink(`Hi ${BRAND}, I want to order the ${p.name}`)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[#B84A74] px-2 py-2 text-xs font-semibold text-white sm:gap-2 sm:text-sm"
                  >
                    <WaIcon />
                    <span className="sm:hidden">Order Now</span>
                    <span className="hidden sm:inline">Order on WhatsApp</span>
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="why" className="scroll-mt-4 bg-[#FFE9F1] px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <SectionTitle sub="A few reasons you'll love us">Why Choose Us?</SectionTitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {WHY.map((w) => (
              <div key={w.title} className={`${CARD} p-6 text-center`}>
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFD9E6] text-[#B84A74]">
                  <WhyIcon name={w.icon} />
                </span>
                <h3 className="font-serif-d mt-4 text-lg font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5E1A3A]/80">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section id="about" className="scroll-mt-4 bg-[#FFF5F8] px-4 pb-8 pt-16">
        <div className="mx-auto max-w-3xl">
          <SectionTitle>Our Story</SectionTitle>
          <div className={`${CARD} flex flex-col items-center gap-6 p-6 md:flex-row md:items-center`}>
            <LogoBadge className="h-44 w-44" />
            <div className="space-y-3 text-center text-sm leading-relaxed sm:text-base md:text-left">
              {STORY.map((s) => (
                <p key={s}>{s}</p>
              ))}
              <p className={SCRIPT_LINE}>With love, Zaine & Zainab ♡</p>
            </div>
          </div>
        </div>
      </section>

      <Wave color="#5E1A3A" bg="#FFF5F8" />

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-4 bg-[#5E1A3A] px-5 pb-12 pt-2 text-center">
        <div className="mx-auto max-w-md">
          <Bow className="mx-auto h-10 w-16 text-[#F7B6CD]" />
          <h2 className="font-script mt-2 text-5xl font-bold text-white">Let's Connect</h2>
          <p className="mt-2 text-sm text-[#FFD9E6]">Message us to order or ask anything.</p>
          <div className="mt-6 flex flex-col items-center gap-3">
            <a
              href={waLink(`Hi ${BRAND}!`)}
              target="_blank"
              rel="noreferrer"
              className="flex w-72 items-center justify-center gap-2 rounded-full bg-[#FFD9E6] py-3 font-semibold text-[#5E1A3A] shadow transition hover:bg-white"
            >
              <WaIcon /> WhatsApp
            </a>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="btn-shine w-72 rounded-full py-3 font-semibold text-white shadow"
            >
              Instagram {INSTA_HANDLE}
            </a>
            <a href={`mailto:${EMAIL}`} className="mt-1 text-sm text-[#FFD9E6] underline">
              {EMAIL}
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-[#3F0F26] py-5 text-center text-xs text-[#FFD9E6]">
        <span className="font-script text-xl">{TAGLINE} ♡</span>
        <br />© {new Date().getFullYear()} {BRAND}
      </footer>
    </div>
  );
}