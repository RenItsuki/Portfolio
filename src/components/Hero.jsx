import React, { useState, useEffect, useRef } from "react";
import { 
  Code2, 
  Palette, 
  Megaphone, 
  Globe, 
  Camera, 
  Sparkles, 
  Users, 
  Shield, 
  Compass, 
  Zap, 
  RotateCw, 
  Flame, 
  Scroll, 
  Layers, 
  ChevronRight,
  ArrowUpRight
} from "lucide-react";
import { 
  heroProfiles, 
  characterStats, 
  characterLevel, 
  heroHeader, 
  heroQuotes, 
  activeQuest 
} from "../data/heroData";
import { 
  skills, 
  GOOGLE_SHEETS_SKILLS_URL, 
  GOOGLE_SHEETS_SKILLS_TAB 
} from "../data/skillsData";
import { fetchSkillsFromGoogleSheet } from "../utils/googleDrive";
import { caseStudies } from "../data/projectsData";
import logoImg from "../assets/logo.png";

const statIconMap = {
  Sparkles,
  Code2,
  Shield,
  Users,
  Flame
};

export function Hero({ onOpenLivePreview, onOpenVideoDemo }) {
  const [skillsList, setSkillsList] = useState(skills);
  const [activeSkill, setActiveSkill] = useState(null);
  const [sweepActive, setSweepActive] = useState(false);
  const [revealedSkillIds, setRevealedSkillIds] = useState([]);
  const [radius, setRadius] = useState(215);
  const skillSectionRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  // Load skills dynamically from Google Sheet
  useEffect(() => {
    if (GOOGLE_SHEETS_SKILLS_URL) {
      fetchSkillsFromGoogleSheet(GOOGLE_SHEETS_SKILLS_URL, GOOGLE_SHEETS_SKILLS_TAB)
        .then((fetched) => {
          if (fetched && fetched.length > 0) {
            setSkillsList(fetched);
          }
        })
        .catch((err) => {
          console.warn("Could not load Google Sheet skills:", err);
        });
    }
  }, []);

  // Name Carousel: RPG alias switching with matching initials (JK, RI, KY)
  const [nameIndex, setNameIndex] = useState(0);
  const [nameAnimating, setNameAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNameAnimating(true);
      setTimeout(() => {
        setNameIndex((prev) => (prev + 1) % heroProfiles.length);
        setNameAnimating(false);
      }, 380);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Dynamic responsive radius calculation
  useEffect(() => {
    const updateRadius = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 480) {
          setRadius(135);
        } else if (window.innerWidth < 768) {
          setRadius(175);
        } else {
          setRadius(215);
        }
      }
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  // Trigger skills coming in anticlockwise one after another in a circle
  const triggerAnticlockwiseAwakening = () => {
    if (skillsList.length === 0) return;
    setSweepActive(true);
    setRevealedSkillIds([]);
    
    // Reveal nodes one by one in anticlockwise order
    skillsList.forEach((skill, index) => {
      setTimeout(() => {
        setRevealedSkillIds((prev) => (prev.includes(skill.id) ? prev : [...prev, skill.id]));
      }, 140 + index * 180);
    });

    setTimeout(() => {
      setSweepActive(false);
    }, skillsList.length * 180 + 450);
  };

  // Scroll down trigger via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          triggerAnticlockwiseAwakening();
        }
      },
      { threshold: 0.25 }
    );

    if (skillSectionRef.current) {
      observer.observe(skillSectionRef.current);
    }

    return () => observer.disconnect();
  }, [skillsList]);

  // Re-awaken when dynamic skills load if section is already visible
  useEffect(() => {
    if (hasTriggeredRef.current && skillsList.length > 0) {
      triggerAnticlockwiseAwakening();
    }
  }, [skillsList]);

  return (
    <section id="home" className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden">
      {/* Background RPG Ambience - Celestial Constellations & Parchment Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-gradient-to-b from-[#dfb29d]/18 via-[#b18a79]/10 to-transparent dark:from-[#4b396f]/25 dark:via-[#1c2238]/30 dark:to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================== */}
        {/* Top RPG Header Bar (Chapter, Status Badge, Series)             */}
        {/* ============================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#dbd2c4]/70 dark:border-white/10 pb-4 mb-10 text-xs font-mono uppercase tracking-widest text-[#8f8880] dark:text-[#a9a5b8]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rotate-45 bg-[#b18a79] dark:bg-[#e5c07b]" />
            <span className="font-semibold text-[#202020] dark:text-[#f3f2f7]">CREATIVE SYSTEMS & ARCHITECT CODEX</span>
            <span className="text-[#dbd2c4] dark:text-white/20">|</span>
            <span>GAIA & CYBERNETICS EXPEDITION</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#b18a79]/15 dark:bg-[#4b396f]/40 text-[#b18a79] dark:text-[#e5c07b] border border-[#b18a79]/30 dark:border-[#e5c07b]/30 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-semibold">QUEST ACTIVE · LV. 99</span>
            </div>
            
            <button
              onClick={triggerAnticlockwiseAwakening}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full ios-glass-pill hover:bg-black/5 dark:hover:bg-white/10 transition-all cursor-pointer text-[11px] text-[#202020] dark:text-[#f3f2f7]"
              title="Recast skill awakening sweep around Joy Karmakar"
            >
              <RotateCw className={`w-3 h-3 text-[#b18a79] dark:text-[#e5c07b] ${sweepActive ? "animate-spin" : ""}`} />
              <span>Awaken Circle</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* Top RPG Status HUD Grid: Character Avatar, Stats, Active Quest */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
          
          {/* Left Column: Player Stats HUD (Curiosity, Courage, Passion, etc.) */}
          <div className="lg:col-span-3 space-y-4 order-2 lg:order-1">
            <div className="p-5 rounded-3xl rpg-panel space-y-3.5">
              <div className="flex items-center justify-between border-b border-[#dbd2c4]/70 dark:border-white/10 pb-2 text-[11px] font-mono uppercase tracking-wider text-[#8f8880] dark:text-[#a9a5b8]">
                <span>← CHARACTER STATS →</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{characterLevel.status || "BUFFED"}</span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                {characterStats.map((stat) => {
                  const IconComp = statIconMap[stat.icon] || Sparkles;
                  return (
                    <div key={stat.id || stat.label}>
                      <div className="flex justify-between text-[#202020] dark:text-[#f3f2f7] mb-0.5">
                        <span className="flex items-center gap-1.5">
                          <IconComp className="w-3.5 h-3.5 text-[#b18a79] dark:text-[#e5c07b]" />
                          <span>{stat.label}</span>
                        </span>
                        <span className="font-bold">{stat.value}</span>
                      </div>
                      <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${stat.color || "from-[#b18a79] to-[#dfb29d]"}`} 
                          style={{ width: `${stat.percent || 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-[#dbd2c4]/70 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-[#8f8880] dark:text-[#736f82]">
                <span>{characterLevel.exp || "EXP: 999,999 / ∞"}</span>
                <span className="text-[#b18a79] dark:text-[#e5c07b] font-bold">{characterLevel.level || "LEVEL 99"}</span>
              </div>
            </div>
          </div>

          {/* Center Column: Character Dais & Title */}
          <div className="lg:col-span-6 text-center space-y-4 order-1 lg:order-2">
            {/* Summoning Dais Character Silhouette */}
            <div className="flex flex-col items-center justify-center">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#b18a79] dark:text-[#e5c07b] font-bold block mb-1">
                {heroQuotes.playerLabel || "PLAYER: YOU & JOY"}
              </span>
              
              {/* Silhouette with Glowing Aura on Dais */}
              <div className="relative w-28 h-28 flex items-center justify-center">
                {/* Dais Pedestal Circles */}
                <div className="absolute inset-0 rounded-full border border-[#b18a79]/40 dark:border-[#e5c07b]/30 animate-ping opacity-25" />
                <div className="absolute inset-2 rounded-full border border-dashed border-[#b18a79]/60 dark:border-[#e5c07b]/50 rpg-spin-slow" />
                
                {/* Center Stylized Knight / Architect Avatar */}
                <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#b18a79] to-[#dfb29d] dark:from-[#e5c07b] dark:to-[#d97706] p-0.5 shadow-xl flex items-center justify-center overflow-hidden group">
                  <div className="w-full h-full rounded-[14px] overflow-hidden relative bg-[#fdfcf9] dark:bg-[#0d101d] select-none">
                    <img
                      src={logoImg}
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "./logo.png"; }}
                      alt="Joy Karmakar Character Logo"
                      draggable={false}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none select-none"
                    />
                    <div className="absolute inset-x-0 bottom-0 py-0.5 bg-black/65 backdrop-blur-xs flex items-center justify-center select-none pointer-events-none">
                      <span className="text-[9px] font-mono font-bold uppercase text-amber-300 dark:text-[#e5c07b] tracking-wider">{characterLevel.tag || "Lv.99"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full ios-glass-pill text-xs font-mono text-[#5e5953] dark:text-[#a9a5b8]">
                <span>{heroProfiles[nameIndex]?.classTitle || "CLASS: GRAND SYSTEMS ARCHITECT"}</span>
                <span>•</span>
                <span>{heroProfiles[nameIndex]?.title || "CREATIVE TECHNOLOGIST"}</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#202020] dark:text-[#f3f2f7] tracking-tight leading-tight relative overflow-hidden">
                <span
                  key={`hero-name-${nameIndex}`}
                  style={{
                    display: "inline-block",
                    animation: nameAnimating
                      ? "dissolveOut 0.38s cubic-bezier(0.4, 0, 0.2, 1) forwards"
                      : "dissolveIn 0.45s cubic-bezier(0.4, 0, 0.2, 1) forwards",
                    willChange: "transform, opacity, filter"
                  }}
                >
                  {heroProfiles[nameIndex]?.name || "Joy Karmakar"}
                </span>
              </h1>
              {/* Name index dots */}
              <div className="flex items-center justify-center gap-1.5 mt-1">
                {heroProfiles.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (i === nameIndex) return;
                      setNameAnimating(true);
                      setTimeout(() => {
                        setNameIndex(i);
                        setNameAnimating(false);
                      }, 380);
                    }}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      i === nameIndex
                        ? "w-4 h-1.5 bg-[#b18a79] dark:bg-[#e5c07b]"
                        : "w-1.5 h-1.5 bg-[#dbd2c4] dark:bg-white/20 hover:bg-[#b18a79]/60 dark:hover:bg-[#e5c07b]/50"
                    }`}
                    title={`${p.name} (${p.initials})`}
                  />
                ))}
              </div>
              <p className="font-serif italic text-lg sm:text-xl text-[#b18a79] dark:text-[#dfb29d] font-light max-w-xl mx-auto">
                "{heroQuotes.tagline || "Bridging code, 3D worlds, and the quiet wild."}"
              </p>
            </div>
          </div>

          {/* Right Column: Active Quest Scroll Box */}
          <div className="lg:col-span-3 space-y-4 order-3">
            <div className="p-5 rounded-3xl rpg-panel space-y-3">
              <div className="flex items-center justify-between border-b border-[#dbd2c4]/70 dark:border-white/10 pb-2 text-[11px] font-mono uppercase tracking-wider text-[#8f8880] dark:text-[#a9a5b8]">
                <span className="flex items-center gap-1.5 text-[#b18a79] dark:text-[#e5c07b] font-semibold">
                  <Scroll className="w-3.5 h-3.5" />
                  <span>ACTIVE QUEST</span>
                </span>
                <span>{activeQuest.category || "MAIN STORY"}</span>
              </div>

              <div className="space-y-2 text-xs font-sans text-[#5e5953] dark:text-[#a9a5b8] leading-relaxed">
                <p className="font-serif italic text-sm text-[#202020] dark:text-[#f3f2f7]">
                  "{activeQuest.title}"
                </p>
                <p className="text-[11px] font-mono border-t border-[#dbd2c4]/40 dark:border-white/5 pt-2">
                  <span className="text-[#202020] dark:text-[#f3f2f7] font-semibold block">PRIMARY OBJECTIVE:</span>
                  {activeQuest.primaryObjective}
                </p>
              </div>

              <div className="pt-2 border-t border-[#dbd2c4]/70 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-[#8f8880] dark:text-[#736f82]">
                <span>{activeQuest.difficulty || "DIFFICULTY: S-RANK"}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{activeQuest.status || "READY"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* ============================================================== */}
        {/* CENTERPIECE: CELESTIAL ASTROLABE & CIRCLING SKILL AWAKENING    */}
        {/* ============================================================== */}
        <div 
          ref={skillSectionRef}
          className="relative my-12 py-10 sm:py-16 px-4 rounded-[40px] rpg-panel overflow-hidden border border-[#b18a79]/30 dark:border-[#e5c07b]/25 shadow-2xl"
        >
          {/* Central Callout Heading */}
          <div className="relative z-10 text-center space-y-2 mb-8">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#b18a79] dark:text-[#e5c07b] font-semibold">
              ✦ AWAKENED SKILL TREE & MASTERY NODES ✦
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#202020] dark:text-[#f3f2f7]">
              CREATE A WORLD <span className="italic text-[#b18a79] dark:text-[#e5c07b]">NEVER DISCOVERED</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#5e5953] dark:text-[#a9a5b8] max-w-xl mx-auto">
              Skills awaken in an anticlockwise celestial circle around Joy Karmakar. Concentric astrolabe rings rotate in opposite directions.
            </p>
          </div>

          {/* ============================================================== */}
          {/* THE ORBITAL SKILL RING (Circling Around Joy Karmakar's Core)   */}
          {/* ============================================================== */}
          <div className="relative w-full max-w-3xl mx-auto h-[480px] sm:h-[540px] md:h-[580px] flex items-center justify-center">
            
            {/* ========================================================== */}
            {/* CONCENTRIC CELESTIAL ASTROLABE RINGS (Exact Centering)      */}
            {/* Alternating in OPPOSITE directions (Clockwise vs Counter)   */}
            {/* ========================================================== */}

            {/* Ring 1: Outermost Celestial Astrolabe SVG Ring (Rotates CLOCKWISE) */}
            <div 
              style={{ width: `${Math.max(500, radius * 2 + 130)}px`, height: `${Math.max(500, radius * 2 + 130)}px` }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-35 dark:opacity-25"
            >
              <svg className="w-full h-full rpg-spin-slow" viewBox="0 0 500 500" fill="none">
                <circle cx="250" cy="250" r="235" stroke="currentColor" strokeWidth="1" strokeDasharray="6 8" className="text-[#b18a79] dark:text-[#e5c07b]" />
                <circle cx="250" cy="250" r="215" stroke="currentColor" strokeWidth="1.5" className="text-[#b18a79] dark:text-[#e5c07b]" />
                <polygon points="250,30 260,240 470,250 260,260 250,470 240,260 30,250 240,240" stroke="currentColor" strokeWidth="1" opacity="0.45" className="text-[#b18a79] dark:text-[#e5c07b]" />
                <circle cx="250" cy="15" r="3" fill="currentColor" className="text-[#b18a79] dark:text-[#e5c07b]" />
                <circle cx="485" cy="250" r="3" fill="currentColor" className="text-[#b18a79] dark:text-[#e5c07b]" />
                <circle cx="250" cy="485" r="3" fill="currentColor" className="text-[#b18a79] dark:text-[#e5c07b]" />
                <circle cx="15" cy="250" r="3" fill="currentColor" className="text-[#b18a79] dark:text-[#e5c07b]" />
              </svg>
            </div>

            {/* Ring 2: Outer Dashed Rune Track (Rotates COUNTER-CLOCKWISE / OPPOSITE DIRECTION) */}
            <div 
              style={{ width: `${radius * 2 + 70}px`, height: `${radius * 2 + 70}px` }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300"
            >
              <div className="w-full h-full rounded-full border-2 border-dashed border-[#b18a79]/50 dark:border-[#e5c07b]/45 rpg-spin-reverse relative">
                {/* 4 Cardinal Diamond Accents rotating counter-clockwise */}
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-[#b18a79] dark:bg-[#e5c07b]" />
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rotate-45 bg-[#b18a79] dark:bg-[#e5c07b]" />
                <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-[#b18a79] dark:bg-[#e5c07b]" />
                <span className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-[#b18a79] dark:bg-[#e5c07b]" />
              </div>
            </div>

            {/* Ring 3: Main Heptagon Skill Orbit Track (Rotates CLOCKWISE) */}
            <div 
              style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300"
            >
              <div className="w-full h-full rounded-full border border-[#b18a79]/60 dark:border-[#e5c07b]/50 rpg-spin-slow-alt relative">
                {/* Orbital tick dots */}
                <span className="absolute top-2 left-1/4 w-1.5 h-1.5 rounded-full bg-[#b18a79]/60 dark:bg-[#e5c07b]/60" />
                <span className="absolute bottom-2 right-1/4 w-1.5 h-1.5 rounded-full bg-[#b18a79]/60 dark:bg-[#e5c07b]/60" />
              </div>
            </div>

            {/* Ring 4: Inner Geometric Ring (Rotates COUNTER-CLOCKWISE / OPPOSITE DIRECTION) */}
            <div 
              style={{ width: `${Math.round(radius * 1.35)}px`, height: `${Math.round(radius * 1.35)}px` }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300"
            >
              <div className="w-full h-full rounded-full border border-dashed border-[#b18a79]/40 dark:border-[#e5c07b]/35 rpg-spin-reverse-fast relative">
                <span className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-amber-400/70" />
                <span className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-amber-400/70" />
              </div>
            </div>

            {/* Ring 5: Core Ambient Halo (Rotates CLOCKWISE around Joy Karmakar's Plaque) */}
            <div 
              style={{ width: `${Math.round(radius * 0.95)}px`, height: `${Math.round(radius * 0.95)}px` }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300"
            >
              <div className="w-full h-full rounded-full border border-[#dbd2c4] dark:border-white/10 rpg-spin-slow" />
            </div>

            {/* Glowing Anticlockwise Sweep Line circling around Joy Karmakar once */}
            {sweepActive && (
              <div 
                style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-10 rpg-rune-sweep-anticlockwise"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-amber-300 to-[#e5c07b] shadow-[0_0_30px_10px_rgba(229,192,123,0.95)] animate-pulse" />
              </div>
            )}

            {/* Central RPG Skill Tree Core Plaque (Mastery Nexus) */}
            <div 
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)"
              }}
              className="z-20 flex flex-col items-center justify-center p-5 sm:p-6 rounded-[28px] sm:rounded-[32px] ios-glass-card shadow-2xl border-2 border-[#b18a79]/70 dark:border-[#e5c07b]/70 text-center w-[185px] sm:w-[225px] bg-[#faf8f4]/90 dark:bg-[#12141e]/90 pointer-events-auto transition-all duration-300"
            >
              {/* Top Crest / Talent Tree Header */}
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-1.5 h-1.5 rotate-45 bg-[#b18a79] dark:bg-[#e5c07b]" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#b18a79] dark:text-[#e5c07b] font-bold">
                  {activeSkill ? "ACTIVE PERK" : "SKILL TREE CORE"}
                </span>
                <span className="w-1.5 h-1.5 rotate-45 bg-[#b18a79] dark:bg-[#e5c07b]" />
              </div>

              {/* Main RPG Skill Title */}
              <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#202020] dark:text-[#f3f2f7] my-0.5 leading-snug">
                {activeSkill ? activeSkill.name : "SKILL MATRIX"}
              </h3>

              {/* Master Level & Perk Count */}
              <span className="text-[11px] font-mono font-medium text-[#5e5953] dark:text-[#a9a5b8]">
                {activeSkill ? `${activeSkill.level} • ${activeSkill.rating}` : skillsList.length > 0 ? `Lv. MAX • ${skillsList.length} Masteries` : "Connected to Google Sheet"}
              </span>

              {/* RPG Status Ribbon */}
              <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#b18a79]/15 dark:bg-[#e5c07b]/20 text-[10px] font-mono text-[#b18a79] dark:text-[#e5c07b] font-semibold border border-[#b18a79]/30 dark:border-[#e5c07b]/30 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>{activeSkill ? "PERK AWAKENED" : skillsList.length > 0 ? "ALL SKILLS UNLOCKED" : "AWAITING INSCRIPTION"}</span>
              </div>
            </div>

            {/* ========================================================== */}
            {/* The Circular Skill Nodes Positioned Symmetrically in Heptagon */}
            {/* ========================================================== */}
            {skillsList.map((skill, index) => {
              const skillAngle = skill.angle !== undefined ? skill.angle : (-90 - index * (360 / Math.max(1, skillsList.length)));
              const rad = (skillAngle * Math.PI) / 180;
              const x = Math.round(Math.cos(rad) * radius);
              const y = Math.round(Math.sin(rad) * radius);
              const isRevealed = revealedSkillIds.includes(skill.id);
              const isSelected = activeSkill?.id === skill.id;
              const IconComp = skill.icon || Sparkles;

              return (
                <div
                  key={skill.id}
                  onClick={() => setActiveSkill(skill)}
                  onMouseEnter={() => setActiveSkill(skill)}
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: isRevealed
                      ? `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`
                      : `translate(-50%, -50%) scale(0)`,
                    opacity: isRevealed ? 1 : 0,
                    transition: "all 600ms cubic-bezier(0.34, 1.56, 0.64, 1)"
                  }}
                  className="absolute z-30 flex flex-col items-center cursor-pointer group"
                >
                  {/* Floating Skill Badge Capsule */}
                  <div
                    className={`w-13 h-13 sm:w-16 sm:h-16 rounded-full flex items-center justify-center p-0.5 shadow-xl transition-all duration-300 group-hover:scale-125 ${
                      isSelected
                        ? "ring-4 ring-[#b18a79] dark:ring-[#e5c07b] shadow-[0_0_20px_rgba(212,163,89,0.8)]"
                        : "group-hover:shadow-[0_0_15px_rgba(182,162,201,0.5)]"
                    }`}
                  >
                    <div className={`w-full h-full rounded-full flex flex-col items-center justify-center border ${skill.bgLight || "bg-amber-100/90 text-amber-900 border-amber-400/60"} ${skill.bgDark || "dark:bg-amber-950/80 dark:text-amber-200 dark:border-amber-400/50"}`}>
                      <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span className="text-[8px] font-mono font-bold mt-0.5">{skill.level}</span>
                    </div>
                  </div>

                  {/* Skill Label Beneath Node */}
                  <div className="mt-1 px-2 py-0.5 rounded-full ios-glass-pill text-[10px] font-mono font-semibold text-[#202020] dark:text-[#f3f2f7] whitespace-nowrap shadow-sm group-hover:border-[#b18a79] dark:group-hover:border-[#e5c07b]">
                    {skill.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ============================================================== */}
          {/* Active Skill Inspection HUD (Details when clicking any skill)  */}
          {/* ============================================================== */}
          {activeSkill && (
            <div className="relative z-30 max-w-xl mx-auto mt-6 p-5 rounded-3xl ios-glass-card border border-[#b18a79]/50 dark:border-[#e5c07b]/40 shadow-2xl animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-[#dbd2c4] dark:border-white/10 pb-2.5 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-xl bg-[#b18a79]/20 dark:bg-[#e5c07b]/20 text-[#b18a79] dark:text-[#e5c07b]">
                    <activeSkill.icon className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#202020] dark:text-[#f3f2f7]">
                      {activeSkill.name}
                    </h4>
                    <span className="text-[11px] font-mono text-[#8f8880] dark:text-[#a9a5b8]">
                      Tier: {activeSkill.level} • Mastery {activeSkill.rating}
                    </span>
                  </div>
                </div>

                <div className="text-right text-[10px] font-mono">
                  <span className="text-emerald-600 dark:text-emerald-400 block font-semibold">PASSIVE: READY</span>
                  <span className="text-[#8f8880] dark:text-[#736f82]">{activeSkill.cooldown}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-sans text-[#5e5953] dark:text-[#a9a5b8] mb-3 leading-relaxed">
                {activeSkill.tagline}
              </p>

              <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-black/5 dark:bg-white/5 text-[11px] font-mono text-[#202020] dark:text-[#f3f2f7]">
                <div>
                  <span className="text-[#8f8880] dark:text-[#736f82] block text-[9px]">MANA / COST:</span>
                  <span className="font-semibold">{activeSkill.manaCost}</span>
                </div>
                <div>
                  <span className="text-[#8f8880] dark:text-[#736f82] block text-[9px]">SIGNATURE PERK:</span>
                  <span className="font-semibold">{activeSkill.perk}</span>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* Bottom RPG Level Up Gauges: Strategy, Innovation, Leadership  */}
          {/* ============================================================== */}
          <div className="mt-12 pt-8 border-t border-[#dbd2c4]/70 dark:border-white/10">
            <div className="text-center mb-6">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8f8880] dark:text-[#a9a5b8]">
                EQUIP YOURSELF · LEVEL UP ATTRIBUTES
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 max-w-5xl mx-auto text-xs font-mono">
              <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-[#dbd2c4]/60 dark:border-white/10 space-y-1">
                <div className="flex justify-between text-[#202020] dark:text-[#f3f2f7]">
                  <span>STRATEGY</span>
                  <span className="font-bold text-[#b18a79] dark:text-[#e5c07b]">Lv. ∞</span>
                </div>
                <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 w-[95%]" />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-[#dbd2c4]/60 dark:border-white/10 space-y-1">
                <div className="flex justify-between text-[#202020] dark:text-[#f3f2f7]">
                  <span>INNOVATION</span>
                  <span className="font-bold text-[#b18a79] dark:text-[#e5c07b]">Lv. ∞</span>
                </div>
                <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-[98%]" />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-[#dbd2c4]/60 dark:border-white/10 space-y-1">
                <div className="flex justify-between text-[#202020] dark:text-[#f3f2f7]">
                  <span>SYSTEMS</span>
                  <span className="font-bold text-[#b18a79] dark:text-[#e5c07b]">Lv. 99</span>
                </div>
                <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 w-[99%]" />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-[#dbd2c4]/60 dark:border-white/10 space-y-1">
                <div className="flex justify-between text-[#202020] dark:text-[#f3f2f7]">
                  <span>LEADERSHIP</span>
                  <span className="font-bold text-[#b18a79] dark:text-[#e5c07b]">Lv. 98</span>
                </div>
                <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 w-[94%]" />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-[#dbd2c4]/60 dark:border-white/10 space-y-1 col-span-2 sm:col-span-1">
                <div className="flex justify-between text-[#202020] dark:text-[#f3f2f7]">
                  <span>ADAPTABILITY</span>
                  <span className="font-bold text-[#b18a79] dark:text-[#e5c07b]">Lv. ∞</span>
                </div>
                <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-rose-500 to-red-500 w-[100%]" />
                </div>
              </div>
            </div>

            {/* Inscription Quote Footer */}
            <div className="mt-8 text-center">
              <p className="font-serif italic text-sm text-[#5e5953] dark:text-[#a9a5b8]">
                "{heroQuotes.inscription || "Not all those who wander are lost. Some are building what's next."}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
