"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Project = {
  title: string;
  slug : string;
  desc: string;
  tag: string;
  img: string;
};

const PROJECTS: Project[] = [
  {
    title: "LOOH",
    slug: "looh",
    desc: "LOOH is a hostel booking application through which users can easily search and book hostels from any location.",
    tag: "Apps",
    img: "/project-images/looh.png",
  },
  {
    title: "LOOH Partners App",
    slug: "partner-app",
    desc: "Looh Hostel Partner App helps hostel owners manage bookings made through the Looh Hostel Booking App. It shows user booking details, room status, and helps manage hostel operations easily.",
    tag: "Apps",
    img: "/project-images/looh-partner/looh-partner-icon.png",
  },
  {
    title: "Focus Vidyapeeth",
    slug: "focus-vidyapeeth",
    desc: "Focus Vidyapeeth is an online learning app for 10th, 11th, and 12th students that provides live classes and online study batches.",
    tag: "UI Components",
    img: "/project-images/focus-vidyapeeth/focus-vidyapeeth-icon3.jpeg",
  },
  {
    title: "Analytics SaaS",
    slug: "analytics-saas",
    desc: "Real-time analytics dashboard with interactive charts, data exports, and custom reporting.",
    tag: "Web Apps",
    img: "/project-images/looh.png",
  },
  {
    title: "Design System",
    slug: "design-system",
    desc: "End-to-end design system with Figma tokens synced to a React component library.",
    tag: "UI Components",
    img: "/project-images/looh.png",
  },
  {
    title: "Social Platform",
    slug: "social-platform",
    desc: "Full-stack social app with real-time messaging, feed algorithms, and media uploads.",
    tag: "Full Stack",
    img: "/project-images/looh.png",
  },
];

export function Projects() {
  const router = useRouter();
  const [filter, setFilter] = useState("All");

  const TAGS = ["All", "Web Apps", "UI Components", "Full Stack"];

  const filtered =  filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tag === filter);

  return (
    <section id="projects" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white">Featured Projects</h2>
          <p className="text-gray-400 mt-2">
            Showcasing my best work and achievements
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-5 py-2 rounded-full text-sm border transition ${
                filter === tag
                  ? "bg-green-700/30 border-green-600 text-green-300"
                  : "border-white/10 text-gray-400"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div
              key={p.title}
              onClick={() =>
               router.push(`/projects/${p.slug}`)
              }
              className="cursor-pointer group rounded-2xl bg-[#111] border border-white/5 overflow-hidden hover:border-green-700/30 transition-all"
            >
              {/* Image */}
              <div className="relative h-48">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  className="object-  cover group-hover:scale-105 transition-transform"
                />

                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-black/60 text-xs text-gray-300 rounded">
                    {p.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-white font-semibold">{p.title}</h3>
                <p className="text-gray-400 text-sm mt-2">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}