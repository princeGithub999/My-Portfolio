"use client";
import { useState, useEffect, useRef } from "react";
import { db } from "@/lib/firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import Image from "next/image";
import { Projects } from "@/lib/fetures/project/components/project";


// ─── Types ───────────────────────────────────────────────────────────────────
type NavItem = { label: string; href: string };
type Skill = { name: string; years: string; level: string; pct: number };
type SkillGroup = { category: string; skills: Skill[] };
type Service = { icon: string; title: string; desc: string; large?: boolean };
type Testimonial = { quote: string; name: string; role: string; stat: string; statLabel: string };

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const TECH_STACK = [
  {name: "Flutter", icon: "🐦"},
  { name: "React.js", icon: "⚛" },
  { name: "Next.js", icon: "N" },
  { name: "TypeScript", icon: "TS" },
  { name: "Tailwind CSS", icon: "≋" },
  { name: "Node.js", icon: "⬡" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Supabase", icon: "📊" },
  {name: "Firebase", icon: "🔥"},
  {name: "Git", icon: "🔧"},
  {name: "Figma", icon: "🎨"},
];

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Frontend Development",
    skills: [
      { name: "Flutter", years: "2+ years", level: "Expert", pct: 95 },
      { name: "React.js", years: "2+ years", level: "Expert", pct: 95 },
      { name: "JavaScript", years: "2+ years", level: "Expert", pct: 92 },
      { name: "TypeScript", years: "2+ years", level: "Advanced", pct: 80 },
      { name: "Next.js", years: "2+ years", level: "Advanced", pct: 82 },
      { name: "Tailwind CSS", years: "2+ years", level: "Expert", pct: 90 },
    ],
  },
  {
    category: "Backend & APIs",
    skills: [
      { name: "Node.js", years: "2+ years", level: "Intermediate", pct: 65 },
      { name: "REST APIs", years: "2+ years", level: "Advanced", pct: 78 },
    ],
  },
  {
    category: "Tools & Others",
    skills: [
      { name: "Git & GitHub", years: "2+ years", level: "Advanced", pct: 85 },
      { name: "Responsive Design", years: "2+ years", level: "Expert", pct: 93 },
      { name: "Figma", years: "2+ years", level: "Intermediate", pct: 68 },
    ],
  },
];


const SERVICES: Service[] = [
  {
    icon: "▦",
    title: "Frontend Development",
    desc: "Building responsive and performant web applications using React, Next.js, and modern JavaScript frameworks with pixel-perfect designs.",
    large: true,
  },
  {
    icon: "📱",
    title: "Responsive Design",
    desc: "Creating mobile-first, responsive interfaces that work seamlessly across all devices and screen sizes with exceptional user experience.",
    large: true,
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    desc: "Designing intuitive and visually appealing user interfaces with a focus on usability, accessibility, and modern aesthetics.",
  },
  {
    icon: "</>",
    title: "Custom Components",
    desc: "Developing reusable, scalable component libraries and design systems that maintain consistency.",
  },
  {
    icon: "⚡",
    title: "Performance Optimization",
    desc: "Optimizing web applications for speed and efficiency through code splitting, lazy loading, and best practices.",
  },
  {
    icon: "⎇",
    title: "Code Review & Consulting",
    desc: "Providing expert code reviews, architecture consulting, and technical guidance to improve your codebase.",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Outstanding work on our React application. Alex delivered a high-performance, scalable solution that exceeded our expectations. The attention to detail and code quality was exceptional.",
    name: "Sarah Mitchell",
    role: "CTO, TechStart Inc.",
    stat: "3×",
    statLabel: "Faster Delivery",
  },
  {
    quote:
      "Alex transformed our outdated UI into a modern, accessible platform. The communication was clear throughout, and the final product was polished and professional.",
    name: "James Torres",
    role: "Product Lead, Nexora",
    stat: "98%",
    statLabel: "Client Satisfaction",
  },
  {
    quote:
      "Incredible TypeScript skills and architecture thinking. Our codebase went from spaghetti to structured in weeks. Highly recommend for any serious project.",
    name: "Priya Nair",
    role: "Eng Manager, Cloudleap",
    stat: "50+",
    statLabel: "Projects Done",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const levelColor: Record<string, string> = {
  Expert: "bg-green-700 text-green-200",
  Advanced: "bg-emerald-800 text-emerald-200",
  Intermediate: "bg-teal-800 text-teal-200",
};

// ─── Sub-components ───────────────────────────────────────────────────────────
function Navbar({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-1 text-xl font-bold">
          <span className="text-[#4ade80]">&lt;&gt;</span>
          <span className="text-[#4ade80] ml-1">Prince Kumar</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <li key={n.label}>
              <a
                href={n.href}
                className={`text-sm transition-colors ${
                  active === n.label
                    ? "text-white font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:block px-5 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-100 transition"
        >
          Hire Me
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-white text-sm"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-5 py-2 rounded-full bg-white text-black text-sm font-semibold text-center"
          >
            Hire Me
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-green-900/30 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-green-900/20 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
        {/* Left */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-700/50 bg-green-900/20 text-green-400 text-sm">
            <span>⭐</span> Flutter Developer & Web Enthusiast | Building Modern Apps
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-white">
            Full Stack Developer Portfolio
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
            Building modern, scalable web applications with React, Node.js, and cutting-edge
            technologies. Transforming ideas into exceptional digital experiences.
          </p>

          <a
            href="#contact"
            className="inline-block px-7 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition"
          >
            Get in Touch
          </a>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 pt-4">
            {[
              { val: "3+", label: "Years Experience" },
              { val: "50+", label: "Projects Completed" },
              { val: "15+", label: "Technologies" },
              { val: "98%", label: "Client Satisfaction" },
            ].map((s) => (
              <div key={s.label} className="border-l-2 border-green-500 pl-3">
                <div className="text-2xl font-bold text-[#4ade80]">{s.val}</div>
                <div className="text-xs text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right – photo placeholder + tech badges */}
        <div className="relative flex justify-center group">
        <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-b from-green-900/30 to-black p-[2px]">

          {/* Moving border */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-conic from-transparent via-green-500 to-transparent"></div>
          </div>

          {/* Content Box */}
          <div className="relative h-full w-full rounded-2xl bg-black flex items-center justify-center">

          <div className="relative h-full w-full rounded-2xl bg-black flex items-center justify-center">

          <Image
            src="/profile.png"
            alt="Profile"
            width={400}
            height={450}
          />

            {/* Bottom black shadow */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>

          {/* Tech stack */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {TECH_STACK.slice(0, 5).map((t) => (
              <div
                key={t.name}
                title={t.name}
                className="w-9 h-9 rounded-lg bg-black/70 border border-green-900/50 flex items-center justify-center text-[#4ade80] text-sm font-bold"
              >
                {t.icon}
              </div>
            ))}
          </div>

</div>

            {/* Tech stack */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {TECH_STACK.slice(0, 5).map((t) => (
                <div
                  key={t.name}
                  title={t.name}
                  className="w-9 h-9 rounded-lg bg-black/70 border border-green-900/50 flex items-center justify-center text-[#4ade80] text-sm font-bold"
                >
                  {t.icon}
                </div>
              ))}
            </div>

          </div>
        </div>
</div>


      </div>

      {/* Scroll caret */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 hover:text-white animate-bounce"
      >
        ↓
      </a>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-700/50 bg-green-900/20 text-green-400 text-sm">
          <span>&lt;/&gt;</span> Full-Stack Developer ✦
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Crafting Digital<br />Experiences That Matter
            </h2>
            <p className="text-gray-400 leading-relaxed">
              I&apos; am a passionate Flutter and Web Developer who enjoys building modern, scalable, and high-performance applications. My focus is on creating user interfaces that combine attractive design with smooth functionality.
            </p>
            <p className="text-gray-400 leading-relaxed">
              My expertise includes Flutter, Next.js, React, and modern technologies. I&spos; focus on writing clean and maintainable code while staying updated with the latest technologies and trends.
            </p>
            <p className="text-gray-400 leading-relaxed">
              When I&apos;m not coding, you&apos;ll find me contributing to open-source projects, writing
              technical articles, or exploring new design trends.
            </p>

            <div className="flex flex-wrap gap-6 pt-2">
              {[
                { val: "45+", label: "Happy Clients" },
                { val: "2.5K+", label: "Code Commits" },
                { val: "500+", label: "GitHub Stars" },
              ].map((s) => (
                <div key={s.label} className="border-l-2 border-green-500 pl-3">
                  <div className="text-2xl font-bold text-white">{s.val}</div>
                  <div className="text-xs text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>

            <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white text-sm hover:bg-white/5 transition">
             <a  href="/resumes.pdf" download >
              ⬇ Download Resume
            </a>
            </button>


          </div>

          {/* Right cards */}
          <div className="grid grid-cols-1 gap-4">
            <div className="rounded-2xl bg-[#111] border border-white/5 p-6 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-green-900/40 border border-green-700/30 flex items-center justify-center text-green-400">&lt;/&gt;</div>
              <div>
                <h3 className="text-white font-semibold mb-1">Expertise</h3>
                <p className="text-gray-400 text-sm">Specialized in building scalable web applications with modern technologies and best practices.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-[#111] border border-white/5 p-6">
                <div className="w-9 h-9 rounded-lg bg-green-900/40 border border-green-700/30 flex items-center justify-center text-green-400 mb-3">✦</div>
                <h3 className="text-white font-semibold mb-1">Clean Code</h3>
                <p className="text-gray-400 text-sm">Writing maintainable, well-documented code that scales.</p>
              </div>
              <div className="rounded-2xl bg-[#111] border border-white/5 p-6">
                <div className="w-9 h-9 rounded-lg bg-green-900/40 border border-green-700/30 flex items-center justify-center text-green-400 mb-3">⬇</div>
                <h3 className="text-white font-semibold mb-1">Performance</h3>
                <p className="text-gray-400 text-sm">Optimizing for speed and efficiency in every project.</p>
              </div>
            </div>

            <div className="rounded-2xl bg-[#111] border border-white/5 p-6 grid grid-cols-3 text-center">
              {[
                { val: "100%", label: "Client Satisfaction" },
                { val: "24/7", label: "Support Available" },
                { val: "Fast", label: "Delivery Time" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-[#4ade80]">{s.val}</div>
                  <div className="text-xs text-gray-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech stack */}
        <div className="mt-20 text-center">
          <h3 className="text-white text-xl font-semibold mb-2">Tech Stack &amp; Expertise</h3>
          <p className="text-gray-500 text-sm mb-8">Technologies I work with to build amazing products</p>
          <div className="flex flex-wrap justify-center gap-4">
            {TECH_STACK.map((t) => (
              <div
                key={t.name}
                className="flex flex-col items-center gap-2 w-24 p-4 rounded-2xl bg-[#111] border border-white/5 hover:border-green-700/40 transition"
              >
                <div className="text-2xl text-[#4ade80] font-bold">{t.icon}</div>
                <span className="text-gray-300 text-xs">{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-24 bg-[#070707]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-700/50 bg-green-900/20 text-green-400 text-sm mb-6">
            ✦ My Expertise
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">Skills &amp; Technologies</h2>
          <p className="text-gray-400 mt-3">A comprehensive overview of my technical skills and proficiency levels</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group) => (
            <div key={group.category} className="rounded-2xl bg-[#111] border border-white/5 p-6 space-y-5">
              <div className="flex items-center gap-2 border-l-2 border-green-500 pl-3">
                <span className="text-white font-semibold">{group.category}</span>
              </div>
              {group.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <span className="text-white text-sm font-medium">{skill.name}</span>
                      <span className="text-gray-500 text-xs ml-2">{skill.years}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${levelColor[skill.level] ?? "bg-gray-700 text-gray-300"}`}>
                      {skill.level}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-800">
                    <div
                      className="h-1.5 rounded-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-1000"
                      style={{ width: `${skill.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



function Services() {
  return (
    <section id="services" className="py-24 bg-[#070707]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-700/50 bg-green-900/20 text-green-400 text-sm mb-6">
            🔧 What I Offer
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Built for innovation.<br />Designed for results.
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Comprehensive solutions to transform your ideas into exceptional digital experiences.
          </p>
        </div>

        {/* Large top two */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {SERVICES.filter((s) => s.large).map((s) => (
            <div
              key={s.title}
              className="rounded-2xl bg-[#111] border border-white/5 p-8 hover:border-green-700/30 transition group"
            >
              <div className="w-12 h-12 rounded-xl bg-green-900/40 border border-green-700/30 flex items-center justify-center text-[#4ade80] text-xl mb-5">
                {s.icon}
              </div>
              <h3 className="text-white text-xl font-semibold mb-3">{s.title}</h3>
              <p className="text-gray-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom four */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.filter((s) => !s.large).map((s) => (
            <div
              key={s.title}
              className="rounded-2xl bg-[#111] border border-white/5 p-6 hover:border-green-700/30 transition"
            >
              <div className="w-10 h-10 rounded-lg bg-green-900/40 border border-green-700/30 flex items-center justify-center text-[#4ade80] text-lg mb-4">
                {s.icon}
              </div>
              <h3 className="text-white font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
       
      </div>
    </section>
  );
}

function Testimonials() {
  const [idx, setIdx] = useState(0);
  const t = TESTIMONIALS[idx];

  return (
    <div className="mt-24">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-700/50 bg-green-900/20 text-green-400 text-sm mb-6">
          ❝❞ Testimonials
        </div>
        <h2 className="text-4xl font-bold text-white">Trusted by forward-thinking teams</h2>
        <p className="text-gray-400 mt-3">
          Empowering clients with design-driven, high-quality solutions built for success.
        </p>
      </div>

      <div className="relative flex items-center gap-6">
        <button
          onClick={() => setIdx((idx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 shrink-0"
        >
          ←
        </button>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Photo placeholder */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#1a2e1a] to-[#0a0a0a] aspect-[4/5] flex items-center justify-center">
            <div className="text-[80px] grayscale opacity-60 select-none">🧑‍💼</div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-5 py-3">
              <div className="text-[#4ade80] text-2xl font-bold">{t.stat}</div>
              <div className="text-gray-300 text-sm">{t.statLabel}</div>
            </div>
          </div>

          {/* Quote */}
          <div className="space-y-6">
            <div className="text-[#4ade80] text-4xl">❝❞</div>
            <p className="text-white text-lg leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
            <div>
              <div className="text-white font-semibold">{t.name}</div>
              <div className="text-gray-400 text-sm">{t.role}</div>
            </div>
            <div className="flex gap-1 text-[#4ade80]">★★★★★</div>
          </div>
        </div>

        <button
          onClick={() => setIdx((idx + 1) % TESTIMONIALS.length)}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 shrink-0"
        >
          →
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === idx ? "bg-[#4ade80] w-6" : "bg-gray-600"}`}
          />
        ))}
      </div>
    </div>
  );
}

function Contact() {

  
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "";
  }>({  message: "",  type: "",
});


  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

  try {

    await addDoc(collection(db, "contacts"), {
      name: form.name,
      email: form.email,
      message: form.message,
      createdAt: new Date().toISOString(),
    });

    setToast({
      message: "Message sent successfully ✅",
      type: "success",
    });



    setForm({ name: "", email: "", message: "" });

    setTimeout(() => {
      setToast({  message: "",  type: "", });
    }, 3000);

  } catch (error) {
    console.log(error);

    setToast({
      message: "Failed to send message ❌",
      type: "error",
    });

    setTimeout(() => {
      setToast({  message: "", type: "", });
    }, 3000);

  }
};


  const soicialMediaLink = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/prince-kumar-9466432ba/" , "icon": "in" },
    { name: "GitHub", url: "https://github.com/princeGithub999" , "icon": "⬡" }
  ];

  return (
    <section id="contact" className="py-24 bg-black">

            {toast.message && (
        <div
          className={`fixed top-5 right-5 px-4 py-3 rounded-lg text-white z-50
          ${toast.type === "success"
            ? "bg-green-600"
            : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-white">Get In Touch</h2>
        </div>
        <p className="text-center text-gray-400 mb-12">
          Have a project in mind? Let&apos;s discuss how we can bring your ideas to life.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}

          <div className="rounded-2xl bg-[#111] border border-white/5 p-8 space-y-5">
            {sent && (
              <div className="rounded-lg bg-green-900/30 border border-green-700/40 text-green-300 px-4 py-3 text-sm">
                ✓ Message sent! I&apos;ll get back to you soon.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
              <label className="block text-gray-300 text-sm mb-2">Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                required
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-green-700"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Email</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={form.email}
                required
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-green-700"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Message</label>
              <textarea
                rows={5}
                placeholder="Tell me about your project..."
                value={form.message}
                required
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-green-700 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-green-700 to-green-500 text-white font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              Send Message 
            </button>   
            </form>




          </div>

          {/* Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Let&apos;s Connect</h3>
            <p className="text-gray-400 leading-relaxed">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part
              of your vision. Feel free to reach out!
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-2xl bg-[#111] border border-white/5 p-5">
                <div className="w-12 h-12 rounded-xl bg-green-900/40 border border-green-700/30 flex items-center justify-center text-[#4ade80] text-lg shrink-0">✉</div>
                <div>
                  <div className="text-gray-400 text-sm">Email</div>
                  <div className="text-white font-medium">prince85656@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl bg-[#111] border border-white/5 p-5">
                <div className="w-12 h-12 rounded-xl bg-green-900/40 border border-green-700/30 flex items-center justify-center text-[#4ade80] text-lg shrink-0">📍</div>
                <div>
                  <div className="text-gray-400 text-sm">Location</div>
                  <div className="text-white font-medium">Patna, Bihar, India</div>
                </div>
              </div>

                <div className="flex items-center gap-4 rounded-2xl bg-[#111] border border-white/5 p-5">
                <div className="w-12 h-12 rounded-xl bg-green-900/40 border border-green-700/30 flex items-center justify-center text-[#4ade80] text-lg shrink-0">📍</div>
                <div>
                  <div className="text-gray-400 text-sm">Phone</div>
                  <div className="text-white font-medium">+91 9798677908</div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-sm mb-4">Connect with me</p>
              <div className="flex gap-3">
                {
                  soicialMediaLink.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank" 
                      rel="noopener noreferrer"
                      
                      className="w-11 h-11 rounded-xl bg-[#111] border border-white/10 text-gray-400 hover:border-green-700/40 hover:text-[#4ade80] transition text-sm flex items-center justify-center"
                    > 
                      {s.icon}
                    </a>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#070707] border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-[#4ade80] text-2xl font-bold">&lt;&gt; Alex</div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Crafting seamless digital experiences with modern web technologies
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-lg bg-[#111] border border-white/5 px-4 py-3">
                <span className="text-[#4ade80]">✉</span>
                <span className="text-gray-300 text-sm">prince85656@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-[#111] border border-white/5 px-4 py-3">
                <span className="text-[#4ade80]">📍</span>
                <span className="text-gray-300 text-sm">Patna, Bihar, India</span>
              </div>

                            <div className="flex items-center gap-3 rounded-lg bg-[#111] border border-white/5 px-4 py-3">
                <span className="text-[#4ade80]">📞</span>
                <span className="text-gray-300 text-sm">+91 9798677908</span>,
              </div> 
            </div>
          </div> 

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {NAV.map((n) => (
                <li key={n.label}>
                  <a href={n.href} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold mb-3">Connect With Me</h4>
            <p className="text-gray-400 text-sm mb-5">Let&apos;s connect and create something amazing together</p>
            <div className="flex gap-3">
              {["⬡", "in", "✦", "◎"].map((icon) => (
                <button
                  key={icon}
                  className="w-11 h-11 rounded-xl bg-[#111] border border-white/10 text-gray-400 hover:border-green-700/40 hover:text-[#4ade80] transition text-sm"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <span>© 2025 Alex Johnson. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Built with <span className="text-[#4ade80]">♥</span> using React &amp; Tailwind CSS
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeNav, setActiveNav] = useState("About");

  useEffect(() => {
    const sections = NAV.map((n) => ({
      label: n.label,
      el: document.querySelector(n.href),
    }));
    const onScroll = () => {
      for (const s of [...sections].reverse()) {
        if (s.el && window.scrollY >= (s.el as HTMLElement).offsetTop - 100) {
          setActiveNav(s.label);
          return;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <Navbar active={activeNav} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}
// my name is amit