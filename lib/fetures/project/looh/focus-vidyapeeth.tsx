"use client"

import { useState, useRef } from "react";
import Image from "next/image";

type Feature = {
  icon: string;
  title: string;
  desc: string;
  longDesc: string;
  image: string;
  color: string;
};

type Project = {
  title: string;
  subtitle: string;
  tag: string;
  longDesc: string;
  year: string;
  role: string;
  platform: string;
  liveUrl: string;
  githubUrl: string;
  videoUrl: string;
  features: Feature[];
  tech: string[];
  screenshots: string[];
  stats: { label: string; value: string; icon: string }[];
  appFlow: { step: string; title: string; desc: string }[];
};

const project: Project = {
  title: "Focus Vidyapeeth Study",
  subtitle: "App",
  tag: "Mobile App",
  longDesc:
    "Focus Vidyapeeth is an online learning app for 10th, 11th, and 12th students that provides live classes and online study batches.",
  year: "2025",
  role: "Flutter Developer",
  platform: "iOS & Android",
  liveUrl: "https://play.google.com/store/apps/details?id=com.smartstudy.learn",
  githubUrl: "https://github.com/yourrepo",
  videoUrl: "/video/looh-video.mp4",
  stats: [
    { label: "Downloads", value: "10K+", icon: "⬇️" },
    { label: "Rating", value: "4.8★", icon: "⭐" },
    { label: "Countries", value: "1", icon: "🌍" },
    { label: "Uptime", value: "99.9%", icon: "🔋" },
  ],
  features: [
    {
      icon: "🔐",
      title: "Auth & Social Login",
      desc: "Google, Apple, and email login with JWT sessions.",
      longDesc:  "Users can sign in via Google OAuth, Apple ID, or traditional email/password. JWT tokens are securely stored and auto-refreshed. Biometric login (Face ID / Fingerprint) is supported on compatible devices for quick return access.",
      image: "/project-images/looh.png",
      color: "#6366f1",
    },

    {
      icon: "💳",
      title: "Payment Integration",
      desc: "Stripe-powered checkout with saved cards support.",
      longDesc:
        "Complete Stripe integration with support for credit/debit cards, Apple Pay, and Google Pay. Users can save multiple cards securely via Stripe vault. Refund workflows are automated and tracked in the admin dashboard.",
      image: "/project-images/looh.png",
      color: "#a855f7",
    },
    {
      icon: "🔔",
      title: "Push Notifications",
      desc: "FCM-backed alerts for order status changes.",
      longDesc:
        "Firebase Cloud Messaging delivers real-time push alerts for every order milestone: confirmed, preparing, picked up, and delivered. Deep links route users directly to the relevant order screen on tap.",
      image: "/project-images/looh.png",
      color: "#f59e0b",
    },

    {
      icon: "🟢",
      title: "WhatsApp Messages",
      desc: "WhatsApp message updates during hostel booking and confirmation process.",
      longDesc:
        "WhatsApp message integration is implemented during the hostel booking and confirmation process using APIs. Users receive real-time WhatsApp notifications for booking updates, payment status, booking confirmation, hostel details, check-in information, and other important updates to ensure a smooth and seamless experience.",
      image: "/project-images/looh.png",
      color: "#0eae39",
    },

    {
      icon: "⭐",
      title: "Ratings & Reviews",
      desc: "Photo reviews with moderation and helpful votes.",
      longDesc:
        "After delivery, users can leave star ratings, written reviews, and photo attachments. A moderation queue flags suspicious reviews using NLP. Helpful votes surface the best reviews and penalize spam through a weighted scoring system.",
      image: "/project-images/looh.png",
      color: "#2c7feb",
    },

        {
      icon: "🎁",
      title: "Spin & Game Rewards",
      desc: "Spin a wheel to earn rewards and discounts on hostel bookings.",
      longDesc:
        "The Spin feature allows users to spin a virtual wheel once a day to earn rewards such as Looh Coins, discount coupons, or free hostel stays. Users can also earn additional spins by referring friends or completing certain actions within the app. The rewards earned from the Spin can be used during hostel bookings for discounts or special offers.",
      image: "/project-images/looh.png",
      color: "#fb252c",
    },
  ],
  tech: ["Flutter","Dart", "Node.js", "Supabase",  "Firebase",],
  screenshots: [
    "/project-images/focus-vidyapeeth/focus-vidyapeeth-icon3.jpeg",


  ],
  appFlow: [
    { step: "01", title: "Sign In & Sign Up", desc: "When users open the app, they first see an onboarding screen followed by mobile number login. After login, they can enter their name and referral code. Using LOOH500 gives 500 Looh Coins, and using a Captain code allows users to become a Looh Captain." },
    { step: "02", title: "Profile", desc: "The Profile section includes many features such as Profile, Booking, Privacy, Send Feedback, Favorites, Help Center, Refer & Earn, and Looh Coin Wallet, allowing users to easily manage their account and app activities." },
    { step: "03", title: "Hostels Booking", desc: "Users can search for hostels from anywhere in India, view hostel details, room availability, and facilities, and make bookings easily. They can also use Looh Coins to get discounts on bookings. The app provides payment options such as Pay at Hostel or Pay Online, with choices for custom payment, full payment, or ₹99 payment. If users choose full payment, they receive an additional ₹250 discount." },
    { step: "04", title: "Emergency SOS", desc: "If a user is staying in a hostel through this application and the hostel owner has added the student as a resident in the Partner App, then in case of any emergency, the user can press the Looh SOS button. Once activated, the user's details, hostel details, a 20-second voice recording, 3 live photos, and current location are automatically shared with the hostel owner, the user's parents, and the Looh team." },
    { step: "05", title: "Spin", desc: "Users can also earn rewards through the Spin feature and win up to 500 Looh Coins. A user can spin once at a time, and after scratching or referring a friend who downloads the app, they get another chance to spin again." },
    { step: "06", title: "Refer & Earn", desc: "If a user refers the application to a friend and the friend downloads it, the referrer earns ₹5. If the referred user makes a hostel booking, the person who referred receives ₹200, while the user who made the booking receives ₹100 and 100 Looh Coins." },
    { step: "07", title: "Captain", desc: "The Captain system works in a multi-level referral structure. To become a Captain, a user must first enter an existing Captain’s referral code. After becoming a Captain, if you refer User A and User A books a hostel, you earn ₹400 while User A does not receive any reward. If User A refers User B and User B makes a booking, User A earns ₹400 and you earn ₹200. Similarly, if User B refers User C and User C books a hostel, User B earns ₹400, User A earns ₹200, and you earn ₹100. This referral reward system continues for up to 3 levels only.s." },
  ],
};

const TECH_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "React Native": { bg: "#083344", text: "#67e8f9", border: "#164e63" },
  "Node.js":      { bg: "#052e16", text: "#86efac", border: "#14532d" },
  MongoDB:        { bg: "#022c22", text: "#6ee7b7", border: "#065f46" },
  "Socket.io":    { bg: "#18181b", text: "#d4d4d8", border: "#3f3f46" },
  Stripe:         { bg: "#2e1065", text: "#c4b5fd", border: "#4c1d95" },
  Firebase:       { bg: "#422006", text: "#fcd34d", border: "#78350f" },
  Redis:          { bg: "#450a0a", text: "#fca5a5", border: "#7f1d1d" },
  default:        { bg: "#18181b", text: "#a1a1aa", border: "#3f3f46" },
};


export default function FocusVidyapeeth() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const videoRef = useRef<HTMLDivElement>(null);

  const scrollToVideo = () => {
    videoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#070707] text-white" style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}>

      <nav className="sticky top-0 z-40 flex items-center justify-between px-5 md:px-12 h-14 border-b border-white/[0.05] bg-[#070707]/95 backdrop-blur-xl">
        <a href="/" className="text-xs text-zinc-500 hover:text-white transition-colors flex items-center gap-2 font-mono tracking-wider">
          ← BACK
        </a>
        <span className="hidden md:block font-mono text-[9px] tracking-[0.25em] uppercase text-zinc-700 border border-white/[0.06] px-3 py-1 rounded-full">
          {project.tag}
        </span>
        <div className="flex items-center gap-2">
      
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="text-[11px] font-bold text-black bg-[#4ade80] hover:bg-[#22c55e] px-4 py-1.5 rounded-lg transition-colors">
            Live ↗
          </a>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ height: "min(80vh, 640px)" }}>
        {/* BG image */}
        <div className="absolute inset-0">
          <Image
            src={project.screenshots[activeScreen]}
            alt={project.title}
            fill
            className="object-cover transition-all duration-700 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/60 to-[#070707]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-transparent to-transparent" />
        </div>

        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-14 pb-12">
          <div className="max-w-2xl">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 bg-[#4ade80]/10 border border-[#4ade80]/20 rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-[#4ade80]">{project.year} · {project.role}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-[1] tracking-tighter mb-4">
              {project.title}{" "}
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1.5px #4ade80" }}
              >
                {project.subtitle}
              </span>
            </h1>

            <p className="text-sm text-zinc-400 max-w-md leading-relaxed mb-8 hidden md:block">
              {project.longDesc}
            </p>

            {/* CTA row */}
            <div className="flex items-center gap-3">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#4ade80] text-black font-bold text-sm px-6 py-3 rounded-xl hover:bg-[#22c55e] transition-all hover:scale-105 active:scale-95">
                ↗ Live Demo
              </a>
              <button onClick={scrollToVideo}
                className="flex items-center gap-2 bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 text-sm px-6 py-3 rounded-xl transition-all backdrop-blur-sm">
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">▶</span>
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail strip — right side */}
        {/* <div className="absolute right-5 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-2.5">
          {project.screenshots.map((src, i) => (
            <button key={i} onClick={() => setActiveScreen(i)}
              className={`relative w-16 h-20 md:w-20 md:h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                i === activeScreen
                  ? "border-[#4ade80] shadow-[0_0_12px_rgba(74,222,128,0.4)]"
                  : "border-white/10 opacity-40 hover:opacity-70"
              }`}>
              <Image src={src} alt="" fill className="object-cover" />
            </button>
          ))}
        </div> */}
      </section>

      {/* ── STATS ───────────────────────────────────────────── */}
      <section className="border-y border-white/[0.05]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {project.stats.map(({ label, value, icon }, i) => (
            <div key={label}
              className={`flex flex-col items-center py-7 gap-1.5 ${i < 3 ? "border-r border-white/[0.05]" : ""}`}>
              <span className="text-xl mb-1">{icon}</span>
              <span className="text-2xl md:text-3xl font-black tracking-tight">{value}</span>
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-600">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── VIDEO SECTION ───────────────────────────────────── */}
      <section ref={videoRef} className="max-w-5xl mx-auto px-5 md:px-14 py-16">
        <SectionLabel accent="#4ade80">Full Demo Video</SectionLabel>
        <h2 className="text-2xl md:text-3xl font-black mb-6 tracking-tight">
          See the app in <span className="text-[#4ade80]">action</span>
        </h2>

        {/* Video embed container */}
        <div
          className="relative w-full rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_0_60px_rgba(74,222,128,0.06)]"
          style={{ aspectRatio: "16/9" }}
        >
          <video
            src={project.videoUrl}
            title="App Demo Video"
            className="absolute inset-0 w-full h-full object-contain bg-black"
            controls
            loop
            playsInline
          />
        </div>

        {/* You can also swap the iframe above with a <video> tag if you have a local mp4: */}
        {/*
        <video
          src="/demo-video.mp4"
          controls
          autoPlay
          muted
          loop
          playsInline
          className="w-full rounded-2xl border border-white/[0.08]"
        />
        */}
      </section>

      {/* ── APP FLOW ────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 md:px-14 py-6 pb-16">
        <SectionLabel accent="#4ade80">How It Works</SectionLabel>
        <h2 className="text-2xl md:text-3xl font-black mb-10 tracking-tight">
          End-to-end user <span className="text-[#4ade80]">journey</span>
        </h2>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-[2.6rem] top-8 bottom-8 w-px bg-gradient-to-b from-[#4ade80]/40 via-[#4ade80]/20 to-transparent" />

          <div className="space-y-4">
            {project.appFlow.map((item, i) => (
              <div key={i}
                className="flex gap-5 md:gap-8 items-start group p-4 rounded-2xl hover:bg-white/[0.03] transition-colors">
                {/* Step circle */}
                <div className="shrink-0 w-12 h-12 rounded-xl bg-[#4ade80]/10 border border-[#4ade80]/20 flex items-center justify-center font-mono text-[11px] font-bold text-[#4ade80] group-hover:bg-[#4ade80]/20 transition-colors">
                  {item.step}
                </div>
                <div className="pt-1">
                  <h3 className="font-bold text-white text-[15px] mb-1">{item.title}</h3>
                  <p className="text-zinc-500 text-[13px] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES (with screenshot per feature) ─────────── */}
      <section className="max-w-5xl mx-auto px-5 md:px-14 py-6 pb-20">
        <SectionLabel accent="#4ade80">Features</SectionLabel>
        <h2 className="text-2xl md:text-3xl font-black mb-10 tracking-tight">
          What makes it <span className="text-[#4ade80]">powerful</span>
        </h2>

        {/* Tab pills */}
        <div className="flex gap-2 flex-wrap mb-10">
          {project.features.map((f, i) => (
            <button key={i} onClick={() => setActiveFeature(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold transition-all border ${
                i === activeFeature
                  ? "text-black border-transparent"
                  : "text-zinc-400 border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
              }`}
              style={i === activeFeature ? { backgroundColor: f.color, borderColor: f.color } : {}}>
              <span>{f.icon}</span>
              <span>{f.title}</span>
            </button>
          ))}
        </div>

        {/* Feature detail card */}
        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] overflow-hidden grid md:grid-cols-2">
          {/* Left: text */}
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <div className="text-4xl mb-5">{project.features[activeFeature].icon}</div>
            <h3
              className="text-2xl font-black mb-3 tracking-tight"
              style={{ color: project.features[activeFeature].color }}
            >
              {project.features[activeFeature].title}
            </h3>
            <p className="text-zinc-400 text-[14px] leading-[1.9]">
              {project.features[activeFeature].longDesc}
            </p>

            {/* Mini badges */}
            <div className="mt-6 flex gap-2 flex-wrap">
              {project.tech.slice(0, 3).map((t) => {
                const c = TECH_COLORS[t] ?? TECH_COLORS.default;
                return (
                  <span key={t} className="font-mono text-[9px] tracking-wider px-2 py-1 rounded-md border"
                    style={{ backgroundColor: c.bg, color: c.text, borderColor: c.border }}>
                    {t}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Right: screenshot */}
          <div className="relative min-h-[260px] md:min-h-0">
            <Image
              src={project.features[activeFeature].image}
              alt={project.features[activeFeature].title}
              fill
              className="object-cover transition-all duration-500"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0"
              style={{ background: `linear-gradient(135deg, ${project.features[activeFeature].color}22, transparent 60%)` }} />
          </div>
        </div>

        {/* All features grid (thumbnails) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {project.features.map((f, i) => (
            <button key={i} onClick={() => setActiveFeature(i)}
              className={`relative overflow-hidden rounded-2xl border text-left p-5 transition-all group ${
                i === activeFeature
                  ? "border-transparent"
                  : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1]"
              }`}
              style={i === activeFeature ? { borderColor: f.color + "55", backgroundColor: f.color + "10" } : {}}>
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{f.icon}</span>
                <div>
                  <p className="font-bold text-[13px] text-white mb-1">{f.title}</p>
                  <p className="text-zinc-500 text-[11px] leading-relaxed">{f.desc}</p>
                </div>
              </div>
              {/* Color accent bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl transition-all"
                style={{ backgroundColor: i === activeFeature ? f.color : "transparent" }} />
            </button>
          ))}
        </div>
      </section>

      {/* ── SCREENSHOTS GALLERY ──────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 md:px-14 pb-20">
        <SectionLabel accent="#4ade80">Screenshots</SectionLabel>
        <h2 className="text-2xl md:text-3xl font-black mb-8 tracking-tight">
          App <span className="text-[#4ade80]">gallery</span>
        </h2>

<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
  {project.screenshots.map((src, i) => (
    <button
      key={i}
      onClick={() => setActiveScreen(i)}
      className={`relative h-[350px] md:h-[450px] rounded-2xl overflow-hidden border-2 transition-all ${
        i === activeScreen
          ? "border-[#4ade80] shadow-[0_0_20px_rgba(74,222,128,0.3)] scale-105"
          : "border-white/[0.06] hover:border-white/20 hover:scale-[1.02]"
      }`}
    >
      <Image
        src={src}
        alt={`Screenshot ${i + 1}`}
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      <span className="absolute bottom-2 right-2 font-mono text-[9px] text-white/60">
        0{i + 1}
      </span>
    </button>
  ))}
</div>
      </section>

      {/* ── TECH + INFO ROW ─────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 md:px-14 pb-20 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Tech stack */}
        <div>
          <SectionLabel accent="#4ade80">Tech Stack</SectionLabel>
          <h2 className="text-xl font-black mb-6 tracking-tight">Built with</h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => {
              const c = TECH_COLORS[t] ?? TECH_COLORS.default;
              return (
                <span key={t}
                  className="font-mono text-[11px] tracking-wider px-3.5 py-2 rounded-xl border font-semibold"
                  style={{ backgroundColor: c.bg, color: c.text, borderColor: c.border }}>
                  {t}
                </span>
              );
            })}
          </div>
        </div>

        {/* Project info */}
        <div>
          <SectionLabel accent="#4ade80">Project Info</SectionLabel>
          <h2 className="text-xl font-black mb-6 tracking-tight">Details</h2>
          <div className="rounded-2xl border border-white/[0.06] overflow-hidden">
            {[
              { label: "Year", value: project.year },
              { label: "Role", value: project.role },
              { label: "Platform", value: project.platform },
              { label: "Category", value: project.tag },
            ].map(({ label, value }, i) => (
              <div key={label}
                className={`flex items-center justify-between px-5 py-3.5 ${i > 0 ? "border-t border-white/[0.05]" : ""}`}>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">{label}</span>
                <span className="text-[13px] text-zinc-200 font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 md:px-14 pb-24">
        <div className="rounded-3xl border border-[#4ade80]/20 bg-[#4ade80]/[0.04] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
              Ready to explore?
            </h2>
            <p className="text-zinc-500 text-sm">
              Check out the live demo or dig into the source code.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#4ade80] text-black font-bold text-sm px-6 py-3.5 rounded-xl hover:bg-[#22c55e] transition-all hover:scale-105 active:scale-95">
              ↗ Live Demo
            </a>

          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.05] px-5 py-7 text-center font-mono text-[9px] tracking-[0.25em] uppercase text-zinc-800">
        {project.title} · {project.year} · Built with ❤️
      </footer>
    </main>
  );
}

function SectionLabel({ children, accent = "#4ade80" }: { children: React.ReactNode; accent?: string }) {
  return (
    <p className="font-mono text-[9px] tracking-[0.22em] uppercase mb-3 flex items-center gap-3"
      style={{ color: accent }}>
      <span className="inline-block w-5 h-px" style={{ backgroundColor: accent }} />
      {children}
    </p>
  );
}