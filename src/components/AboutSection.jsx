import React from "react";
import { 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  Compass, 
  Laptop, 
  Award, 
  Users, 
  Layers 
import { studioProfile } from "../data/profileData";

export function AboutSection() {
  return (
    <section id="studio" className="py-28 sm:py-36 border-t border-black/5 dark:border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
        {/* Studio Philosophy & Profile Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold">
              <Compass className="w-4 h-4" />
              <span>Character Lore · Origin & Codex</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1c1b18] dark:text-[#f4f4f2] leading-tight">
              Where mathematical rigor meets cinematic imagination.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-black/75 dark:text-white/75 font-sans font-light leading-relaxed">
              <p>
                I am <strong>Joy Karmakar</strong>. In the grand world of creation, I treat code and creative media not as separate domains, but as interconnected expressions of the same instinct: <em>forging systems that evoke clarity, wonder, and profound human utility.</em>
              </p>
              <p>
                Specializing in Computer Science and honored as a <strong>Dell Aspire Scholar</strong> by the Michael & Susan Dell Foundation, my technical spellbook spans custom machine learning models, edge computer vision architectures, and resilient high-speed web systems.
              </p>
              <p>
                In parallel, my world-building craft spans rendering photorealistic lighting and procedural materials in <strong>Blender 5</strong>, directing street theatre productions captivating tens of thousands of souls, and preserving cultural soundtracks with over <strong>120 million impressions</strong>.
              </p>
            </div>

            {/* Studio Pillars / Passive Traits */}
            <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs text-black/80 dark:text-white/80">
              <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-600/20 dark:border-amber-400/20 text-amber-800 dark:text-amber-300">
                ✦ Edge AI Divination
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-600/20 dark:border-amber-400/20 text-amber-800 dark:text-amber-300">
                ✦ Procedural 3D & Spatial Engines
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-600/20 dark:border-amber-400/20 text-amber-800 dark:text-amber-300">
                ✦ 120M+ Resonance Campaigns
              </span>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/[0.08] bg-black/5 dark:bg-white/5">
              <img
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80"
                alt="Studio space"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent flex flex-col justify-end p-7 text-white">
                <span className="font-mono text-xs text-emerald-400">Creative Philosophy</span>
                <p className="font-serif text-lg italic mt-1 font-light">
                  "Technology shouldn't simply work—it should inspire, engage, and elevate human dignity."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Studio Disciplines (01 to 04) */}
        <div className="space-y-8 pt-8 border-t border-black/5 dark:border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold">
                Class Specializations
              </span>
              <h3 className="font-serif text-3xl font-normal text-[#1c1b18] dark:text-[#f4f4f2]">
                Architect Masteries & Passive Abilities
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-black/60 dark:text-white/60 max-w-md font-sans">
              Interdisciplinary skill trees spanning software engineering, machine perception, spatial computer graphics, and live storytelling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {studioProfile.capabilities.map((cap) => (
              <div
                key={cap.number}
                className="p-8 rounded-3xl bg-[#faf9f6] dark:bg-[#111319] border border-black/10 dark:border-white/[0.08] shadow-sm flex flex-col justify-between space-y-6 hover:border-amber-500/50 dark:hover:border-amber-400/50 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-amber-800 dark:text-amber-400 px-2.5 py-1 rounded-md bg-amber-500/10 dark:bg-amber-400/10 border border-amber-600/20">
                      RANK {cap.number}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-black/40 dark:text-white/40 tracking-wider">Passive Skill Tree</span>
                  </div>

                  <h4 className="font-serif text-2xl font-medium text-[#1c1b18] dark:text-[#f4f4f2]">
                    {cap.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 font-sans font-light leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/5 dark:border-white/5 flex flex-wrap gap-1.5">
                  {cap.stack.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-black/5 dark:bg-white/5 text-black/75 dark:text-white/75 border border-black/5 dark:border-white/5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Recognitions & Initiatives */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-black/5 dark:border-white/10">
          {/* Selected Honors */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#d97746] dark:text-[#e58e5e] font-semibold">
              <Award className="w-4 h-4" />
              <span>Acquired Trophies & Distinctions</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1c1b18] dark:text-[#f4f4f2]">
              Guild Honors & Medals
            </h3>

            <div className="space-y-4">
              {studioProfile.recognitions.map((rec, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-[#faf9f6] dark:bg-[#111319] border border-black/10 dark:border-white/[0.08] space-y-1.5 hover:border-amber-500/30 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[#d97746] dark:text-[#e58e5e] font-semibold tracking-wide">{rec.issuer}</span>
                    <span className="font-mono text-black/40 dark:text-white/40">{rec.year}</span>
                  </div>
                  <h5 className="font-serif text-base font-medium text-[#1c1b18] dark:text-[#f4f4f2]">
                    {rec.title}
                  </h5>
                  <p className="text-xs text-black/60 dark:text-white/60 font-sans font-light">
                    {rec.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Initiatives & Direction */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold">
              <Users className="w-4 h-4" />
              <span>Faction Campaigns & High Council</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1c1b18] dark:text-[#f4f4f2]">
              Guild Expeditions & Leadership
            </h3>

            <div className="space-y-4">
              {studioProfile.initiatives.map((init, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-[#faf9f6] dark:bg-[#111319] border border-black/10 dark:border-white/[0.08] space-y-2 hover:border-amber-500/30 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-serif text-base font-medium text-[#1c1b18] dark:text-[#f4f4f2]">{init.role}</span>
                    <span className="font-mono text-black/40 dark:text-white/40 text-[11px]">{init.timeline}</span>
                  </div>
                  <div className="text-xs font-mono text-amber-700 dark:text-amber-400 font-semibold">{init.organization}</div>
                  <p className="text-xs text-black/65 dark:text-white/65 font-sans font-light leading-relaxed">
                    {init.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
