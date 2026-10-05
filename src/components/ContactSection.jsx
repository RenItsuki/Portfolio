import React, { useState } from "react";
import { 
  Mail, 
  Copy, 
  Check, 
  Send, 
  Sparkles, 
  ArrowUpRight, 
  Radio, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Compass, 
  Gem,
  Flame,
  Swords
} from "lucide-react";
import { studioProfile } from "../data/profileData";

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YoutubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
    </svg>
  );
}

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    subject: "⚡ AI / ML Engineering Quest", 
    message: "" 
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(studioProfile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "⚡ AI / ML Engineering Quest", message: "" });
    }, 4500);
  };

  return (
    <section id="connect" className="py-28 sm:py-36 border-t border-[#dbd2c4] dark:border-[#38374d] relative overflow-hidden">
      {/* Ambient RPG Color Glows */}
      <div className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#b18a79]/15 to-transparent dark:from-[#4b396f]/25 dark:to-transparent blur-[140px] pointer-events-none -z-10 animate-ambient-glow" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#cfbeaa]/15 to-transparent dark:from-[#3a2e58]/30 dark:to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================== */}
        {/* Top Header                                                     */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* ============================================================== */}
          {/* Left Column: Telepathic Resonance Altar & Guild Frequencies     */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#b18a79] dark:text-[#e5c07b]">
                <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
                <span>ETHEREAL FREQUENCIES · TELEPATHIC LINK</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#202020] dark:text-[#f3f2f7] tracking-tight">
                CONTACT ME
              </h2>

              <p className="text-sm sm:text-base text-[#5e5953] dark:text-[#a9a5b8] font-sans font-light leading-relaxed">
                Connect directly with Joy Karmakar for engineering guilds, on-device AI quests, 3D CGI direction, or photographic art prints.
              </p>
            </div>

            {/* Live Telepathic Resonance Beacon */}
            <div 
              className="p-4 sm:p-5 rounded-3xl ios-glass-card shadow-sm border border-[#b18a79]/30 dark:border-[#e5c07b]/30 flex items-center justify-between gap-4"
              style={{
                WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                maskImage: "radial-gradient(white, black)",
                isolation: "isolate"
              }}
            >
              <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#202020] dark:text-[#f3f2f7] block">
                    TELEPATHIC CRYSTAL ACTIVE (TIME)
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-[#8f8880] dark:text-[#736f82] block">
                    Available for Q2/Q3 2026 Quests & Guild Expeditions
                  </span>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full ios-glass-pill text-[10px] font-mono text-[#5e5953] dark:text-[#a9a5b8]">
                <Clock className="w-3 h-3 text-[#b18a79] dark:text-[#e5c07b]" />
                <span>IST (UTC+5:30)</span>
              </div>
            </div>

            {/* Direct Telepathic Frequencies (Email & Phone) */}
            <div className="space-y-3">
              {/* Primary Email Frequency */}
              <div 
                className="p-4 sm:p-5 rounded-3xl ios-glass-card shadow-sm border border-white/25 dark:border-white/10 flex items-center justify-between gap-3 group hover:border-[#b18a79]/60 dark:hover:border-[#e5c07b]/60 transition-all"
                style={{
                  WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                  maskImage: "radial-gradient(white, black)",
                  isolation: "isolate"
                }}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="p-3 rounded-2xl bg-[#b18a79]/15 dark:bg-[#e5c07b]/15 text-[#b18a79] dark:text-[#e5c07b] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#8f8880] dark:text-[#736f82] block">
                      ✉️ Primary Telepathic Inscription (Email)
                    </span>
                    <a 
                      href={`mailto:${studioProfile.email}`} 
                      className="text-[11px] sm:text-xs xl:text-sm font-mono text-[#202020] dark:text-[#f3f2f7] hover:underline block break-all sm:break-normal"
                    >
                      {studioProfile.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="px-3.5 py-1.5 rounded-full ios-glass-pill text-xs font-medium text-[#202020] dark:text-[#f3f2f7] flex items-center gap-1.5 transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95 border border-white/20 shrink-0"
                  title="Harmonize / Copy Email"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Harmonized</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Harmonize</span>
                    </>
                  )}
                </button>
              </div>
            </div>


            {/* Guild & Alliance Portals */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono uppercase text-[#8f8880] dark:text-[#736f82] block tracking-wider">
                GUILD & ALLIANCE PORTALS
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {/* LinkedIn Card */}
                <a
                  href={studioProfile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 rounded-3xl ios-glass-card hover:border-[#0a66c2]/60 transition-all flex flex-col justify-between space-y-3 hover:-translate-y-1 shadow-sm border border-white/20 dark:border-white/10"
                  style={{
                    WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                    maskImage: "radial-gradient(white, black)",
                    isolation: "isolate"
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-xl bg-[#0a66c2]/15 text-[#0a66c2]">
                      <LinkedinIcon />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#8f8880] dark:text-[#736f82] group-hover:text-[#0a66c2] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#202020] dark:text-[#f3f2f7] block">
                      High Council
                    </span>
                    <span className="text-[10px] font-mono text-[#8f8880] dark:text-[#736f82]">
                      LinkedIn Network
                    </span>
                  </div>
                </a>

                {/* GitHub Card */}
                <a
                  href={studioProfile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 rounded-3xl ios-glass-card hover:border-[#b18a79]/60 dark:hover:border-[#e5c07b]/60 transition-all flex flex-col justify-between space-y-3 hover:-translate-y-1 shadow-sm border border-white/20 dark:border-white/10"
                  style={{
                    WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                    maskImage: "radial-gradient(white, black)",
                    isolation: "isolate"
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-xl bg-black/10 dark:bg-white/10 text-[#202020] dark:text-[#f3f2f7]">
                      <GithubIcon />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#8f8880] dark:text-[#736f82] group-hover:text-[#b18a79] dark:group-hover:text-[#e5c07b] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#202020] dark:text-[#f3f2f7] block">
                      Code Armory
                    </span>
                    <span className="text-[10px] font-mono text-[#8f8880] dark:text-[#736f82]">
                      GitHub Repos
                    </span>
                  </div>
                </a>

                {/* Siren's Resonance (120M+) Card */}
                <div 
                  className="p-4 rounded-3xl ios-glass-card flex flex-col justify-between space-y-3 shadow-sm border border-white/20 dark:border-white/10 relative overflow-hidden"
                  style={{
                    WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                    maskImage: "radial-gradient(white, black)",
                    isolation: "isolate"
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-xl bg-red-500/15 text-red-500">
                      <YoutubeIcon />
                    </div>
                    <div className="flex items-end gap-0.5 h-4">
                      <span className="w-1 h-2 bg-red-500/70 rounded-full animate-pulse" />
                      <span className="w-1 h-4 bg-red-500 rounded-full animate-pulse [animation-delay:150ms]" />
                      <span className="w-1 h-3 bg-red-500/80 rounded-full animate-pulse [animation-delay:300ms]" />
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-red-500 dark:text-red-400 block font-mono">
                      120M+ Resonance
                    </span>
                    <span className="text-[10px] font-mono text-[#8f8880] dark:text-[#736f82]">
                      Siren's Call & Audio
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* Right Column: Telepathic Inscription Forge                     */}
          {/* ============================================================== */}
          <div className="lg:col-span-7">
            <div 
              className="p-7 sm:p-10 rounded-[32px] sm:rounded-[36px] ios-glass-card shadow-2xl relative overflow-hidden border border-white/25 dark:border-white/10"
              style={{
                WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                maskImage: "radial-gradient(white, black)",
                isolation: "isolate"
              }}
            >
              {submitted ? (
                <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-16 h-16 rounded-3xl bg-[#b18a79]/20 dark:bg-[#e5c07b]/20 text-[#b18a79] dark:text-[#e5c07b] flex items-center justify-center shadow-lg border border-white/20">
                    <Zap className="w-8 h-8" />
                  </div>
                  <div className="space-y-1.5 max-w-md">
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#202020] dark:text-[#f3f2f7]">
                      Telepathic Link Established
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5e5953] dark:text-[#a9a5b8] font-sans font-light leading-relaxed">
                      Ethereal wave confirmed, <span className="font-semibold text-[#202020] dark:text-[#f3f2f7]">{formData.name || "Adventurer"}</span>. Your missive has resonated directly inside Joy Karmakar's primary sanctum. Expect psychic resonance within 24 hours.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center justify-between pb-2 border-b border-[#dbd2c4]/60 dark:border-white/10">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#b18a79] dark:text-[#e5c07b] font-bold">
                      <Zap className="w-4 h-4" />
                      <span>Telepathic Inscription Forge</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#8f8880] dark:text-[#736f82]">
                      Level 99 Sanctum Link
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-mono text-[#5e5953] dark:text-[#a9a5b8] block">
                        Adventurer / Sender Name <span className="text-[#b18a79] dark:text-[#e5c07b]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Commander Elena"
                        className="w-full px-4 py-3 rounded-2xl bg-[#eae5d9]/40 dark:bg-[#151720]/80 border border-[#dbd2c4] dark:border-[#38374d] text-xs sm:text-sm text-[#202020] dark:text-[#f3f2f7] placeholder-[#8f8880] dark:placeholder-[#736f82] focus:outline-none focus:border-[#b18a79] dark:focus:border-[#e5c07b] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-xs font-mono text-[#5e5953] dark:text-[#a9a5b8] block">
                        Ethereal Frequency (Email) <span className="text-[#b18a79] dark:text-[#e5c07b]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="elena@guild.org"
                        className="w-full px-4 py-3 rounded-2xl bg-[#eae5d9]/40 dark:bg-[#151720]/80 border border-[#dbd2c4] dark:border-[#38374d] text-xs sm:text-sm text-[#202020] dark:text-[#f3f2f7] placeholder-[#8f8880] dark:placeholder-[#736f82] focus:outline-none focus:border-[#b18a79] dark:focus:border-[#e5c07b] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-subject" className="text-xs font-mono text-[#5e5953] dark:text-[#a9a5b8] block">
                      Quest Objective & Scope
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#eae5d9]/40 dark:bg-[#151720]/80 border border-[#dbd2c4] dark:border-[#38374d] text-xs sm:text-sm text-[#202020] dark:text-[#f3f2f7] focus:outline-none focus:border-[#b18a79] dark:focus:border-[#e5c07b] transition-colors cursor-pointer"
                    >
                      <option value="⚡ AI / ML Engineering Quest" className="bg-[#fdfcf9] dark:bg-[#151720]">
                        ⚡ High-Impact Edge AI or Software Engineering Role
                      </option>
                      <option value="🎨 3D CGI & Blender Direction" className="bg-[#fdfcf9] dark:bg-[#151720]">
                        🎨 3D CGI, Motion Graphics or Blender Collaboration
                      </option>
                      <option value="📷 Wildlife Photography Bounty" className="bg-[#fdfcf9] dark:bg-[#151720]">
                        📷 Nature Photography Print or Media Bounty
                      </option>
                      <option value="☕ General Creative Summon" className="bg-[#fdfcf9] dark:bg-[#151720]">
                        ☕ Guild Collaboration & General Consultation
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-mono text-[#5e5953] dark:text-[#a9a5b8] block">
                      Inscribe Message Scroll <span className="text-[#b18a79] dark:text-[#e5c07b]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Detail your quest specifications, timeline, party requirements, or ethereal coordinates..."
                      className="w-full px-4 py-3 rounded-2xl bg-[#eae5d9]/40 dark:bg-[#151720]/80 border border-[#dbd2c4] dark:border-[#38374d] text-xs sm:text-sm text-[#202020] dark:text-[#f3f2f7] placeholder-[#8f8880] dark:placeholder-[#736f82] focus:outline-none focus:border-[#b18a79] dark:focus:border-[#e5c07b] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#b18a79] hover:bg-[#9c7564] dark:bg-[#e5c07b] dark:hover:bg-[#d4af37] text-white dark:text-black text-xs sm:text-sm font-bold transition-all shadow-lg hover:shadow-xl cursor-pointer border border-white/20 active:scale-[0.99]"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Transmit Telepathic Link to Joy</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 pt-1 text-[11px] font-mono text-[#8f8880] dark:text-[#736f82]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Encrypted Ethereal Wave • Direct to Primary Sanctum</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
