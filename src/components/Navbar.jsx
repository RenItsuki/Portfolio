import React, { useState, useEffect } from "react";
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ArrowUpRight
} from "lucide-react";


import { navWaypoints } from "../data/profileData";

export function Navbar({ theme, onToggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredWaypoint, setHoveredWaypoint] = useState(null);
  
  // Dock side fixed to right
  const dockSide = "right";

  // Dynamic waypoints imported from profileData.js
  const waypoints = navWaypoints;

  // Track scroll position to update active waypoint and top bar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);

      const sectionIds = ["connect", "journal", "photography", "projects", "home"];
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (const id of sectionIds) {
        if (id === "home") {
          if (window.scrollY < 450) {
            setActiveSection("home");
            return;
          }
        }
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top - 120) {
            setActiveSection(id);
            return;
          }
        }
      }
      setActiveSection("home");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  // Smooth scroll handler
  const scrollToSection = (id) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* ============================================================== */}
      {/* Top Editorial Header Bar (Branding, Side Toggle, Theme, CTA)  */}
      {/* ============================================================== */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#fdfcf9]/92 dark:bg-[#08090e]/92 backdrop-blur-xl border-b border-[#dbd2c4]/70 dark:border-white/10 py-3 shadow-md"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Monogram Emblem */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3 group cursor-pointer text-left"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-[#b18a79] to-[#dfb29d] dark:from-[#e5c07b] dark:to-[#d97706] shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0">
              <img
                src="/logo.png"
                alt="Joy Karmakar Logo"
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base font-medium tracking-wide text-[#202020] dark:text-[#f3f2f7] group-hover:text-[#b18a79] dark:group-hover:text-[#e5c07b] transition-colors">
                Joy Karmakar
              </span>
              <span className="text-[10px] tracking-widest uppercase font-mono text-[#b18a79] dark:text-[#e5c07b] font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                LV. 99 ARCHITECT
              </span>
            </div>
          </button>


          {/* Right Actions: Theme Toggle, Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2.5 rounded-full ios-glass-pill text-[#202020] dark:text-[#f3f2f7] hover:scale-105 transition-all flex items-center justify-center cursor-pointer shadow-sm active:scale-95 border border-[#dbd2c4]/60 dark:border-white/15"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-[#e5c07b] hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-[#b18a79] hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl ios-glass-pill text-[#202020] dark:text-[#f3f2f7] border border-[#dbd2c4]/60 dark:border-white/15"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-3 pb-6 bg-[#fdfcf9]/98 dark:bg-[#08090e]/98 backdrop-blur-2xl border-b border-[#dbd2c4] dark:border-white/10 animate-in slide-in-from-top-2 shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="text-xs font-mono text-[#8f8880] dark:text-[#736f82] uppercase tracking-wider mb-2 px-2 flex items-center justify-between">
              <span>Timeline Milestones</span>
              <span className="text-[10px] text-amber-500 font-bold">5 WAYPOINTS</span>
            </div>
            <div className="flex flex-col space-y-2">
              {waypoints.map((wp) => {
                const isActive = activeSection === wp.id;
                return (
                  <button
                    key={wp.id}
                    onClick={() => scrollToSection(wp.id)}
                    className={`p-3 rounded-2xl text-left transition-all ${
                      isActive
                        ? "bg-[#b18a79]/15 dark:bg-white/10 border border-[#b18a79] dark:border-white/20"
                        : "hover:bg-black/5 dark:hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono text-[#8f8880] dark:text-neutral-400 font-medium">
                        {wp.period}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/5 dark:bg-white/10 font-mono text-[#5e5953] dark:text-neutral-300">
                        {wp.category}
                      </span>
                    </div>
                    <div className="font-bold text-sm text-[#202020] dark:text-white">
                      {wp.title}
                    </div>
                    <div className="text-xs text-[#5e5953] dark:text-neutral-400 mt-1 line-clamp-2">
                      {wp.description}
                    </div>
                  </button>
                );
              })}
              <button
                onClick={() => scrollToSection("connect")}
                className="mt-3 px-4 py-2.5 rounded-2xl text-sm font-bold bg-[#b18a79] dark:bg-[#e5c07b] text-white dark:text-black flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Summon · Connect</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ============================================================== */}
      {/* Vertical Timeline Navbar on the Side (Right or Left)            */}
      {/* Details shown ONLY when hovered. Resting state is clean & slim.  */}
      {/* Inspired directly by media_1790834526466.png                   */}
      {/* ============================================================== */}
      <aside
        aria-label="Timeline Navigation Rail"
        className={`fixed top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col ${
          dockSide === "right" ? "right-4 lg:right-7 items-end" : "left-4 lg:left-7 items-start"
        }`}
      >

        {/* Main Vertical Timeline Container */}
        <div className="relative py-2 flex flex-col items-center">
          
          {/* Continuous Vertical Timeline Line */}
          <div
            className={`absolute top-4 bottom-4 w-[1.5px] pointer-events-none transition-colors duration-300 ${
              dockSide === "right" ? "right-[13px]" : "left-[13px]"
            } bg-neutral-300/60 dark:bg-white/20`}
            style={{
              boxShadow: theme === "dark" ? "0 0 10px rgba(255, 255, 255, 0.15)" : "none"
            }}
          />

          {/* Timeline Milestones Vertical Stack */}
          <div className="flex flex-col space-y-6 relative">
            {waypoints.map((wp) => {
              const isActive = activeSection === wp.id;
              const isHovered = hoveredWaypoint === wp.id;

              return (
                <div
                  key={wp.id}
                  onMouseEnter={() => setHoveredWaypoint(wp.id)}
                  onMouseLeave={() => setHoveredWaypoint(null)}
                  className={`group relative flex items-center h-9 ${
                    dockSide === "right" ? "flex-row justify-end" : "flex-row-reverse justify-start"
                  }`}
                >
                  {/* Floating Milestone Card: ONLY SHOWN WHEN HOVERED */}
                  <div
                    onClick={() => scrollToSection(wp.id)}
                    className={`absolute z-50 cursor-pointer transition-all duration-300 ease-out transform ${
                      dockSide === "right" 
                        ? "right-full mr-4 origin-right" 
                        : "left-full ml-4 origin-left"
                    } ${
                      isHovered
                        ? "opacity-100 scale-100 pointer-events-auto visible translate-x-0"
                        : "opacity-0 scale-95 pointer-events-none invisible translate-x-2"
                    }`}
                  >
                    <div
                      className={`w-72 sm:w-84 xl:w-96 rounded-2xl p-5 text-left backdrop-blur-2xl shadow-2xl relative overflow-hidden transition-all duration-300 ${
                        theme === "dark"
                          ? "bg-[#0e0f14]/98 text-white border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.92)] hover:border-white/30"
                          : "bg-[#fdfcf9]/98 text-[#202020] border border-[#dbd2c4] shadow-[0_20px_45px_rgba(0,0,0,0.16)] hover:border-[#b18a79]"
                      } ${isActive ? "ring-1 ring-white/30 dark:ring-white/30" : ""}`}
                    >
                      {/* Top Header: Monospace Date on left, Category pill on right */}
                      <div className="flex items-center justify-between text-xs mb-3">
                        <span className="font-mono text-neutral-400 font-semibold tracking-wider">
                          {wp.period}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${
                            theme === "dark"
                              ? "bg-[#1e1f26] border-neutral-700/60 text-neutral-300"
                              : "bg-[#efeae0] border-[#dbd2c4] text-[#5e5953]"
                          }`}
                        >
                          {wp.category}
                        </span>
                      </div>

                      {/* Prominent Bold Title */}
                      <h4 className="text-base sm:text-lg font-bold tracking-tight mb-2 group-hover:text-[#b18a79] dark:group-hover:text-[#e5c07b] transition-colors leading-snug">
                        {wp.title}
                      </h4>

                      {/* Descriptive Summary */}
                      <p
                        className={`text-xs sm:text-sm font-normal leading-relaxed mb-4 ${
                          theme === "dark" ? "text-neutral-400" : "text-[#5e5953]"
                        }`}
                      >
                        {wp.description}
                      </p>

                      {/* Bottom Tag Pills */}
                      <div className="flex flex-wrap gap-2">
                        {wp.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2.5 py-1 text-[11px] font-mono rounded-lg border ${
                              theme === "dark"
                                ? "bg-[#16171d] border-neutral-800 text-neutral-300"
                                : "bg-[#f5ede8] border-[#dbd2c4] text-[#5e5953]"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Active indicator edge accent */}
                      {isActive && (
                        <div
                          className={`absolute top-0 bottom-0 w-1 ${
                            dockSide === "right" ? "right-0" : "left-0"
                          } bg-[#b18a79] dark:bg-[#e5c07b]`}
                        />
                      )}
                    </div>
                  </div>

                  {/* Compact Section Label on Rail (Always cleanly visible on resting state) */}
                  <button
                    onClick={() => scrollToSection(wp.id)}
                    className={`cursor-pointer transition-all duration-200 text-xs font-mono font-medium py-1 px-3 rounded-full shadow-sm flex items-center gap-1.5 whitespace-nowrap ${
                      dockSide === "right" ? "mr-3" : "ml-3"
                    } ${
                      isActive
                        ? "bg-[#b18a79] dark:bg-[#e5c07b] text-white dark:text-black font-bold shadow-md"
                        : isHovered
                        ? theme === "dark"
                          ? "bg-white/15 text-white border border-white/20"
                          : "bg-black/10 text-[#202020] border border-black/15"
                        : theme === "dark"
                        ? "bg-[#0e0f14]/85 text-neutral-400 border border-white/10 hover:text-white hover:bg-neutral-800"
                        : "bg-white/85 text-[#5e5953] border border-[#dbd2c4] hover:text-[#202020]"
                    }`}
                  >
                    <span>{wp.category}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-black animate-pulse" />
                    )}
                  </button>

                  {/* Whisker Connector line between label and node */}
                  <div
                    className={`w-3.5 h-[1.5px] transition-colors duration-300 pointer-events-none ${
                      isActive
                        ? theme === "dark" ? "bg-white" : "bg-[#b18a79]"
                        : isHovered
                        ? theme === "dark" ? "bg-white/80" : "bg-[#b18a79]"
                        : "bg-neutral-300/50 dark:bg-white/20"
                    }`}
                  />

                  {/* Circular Waypoint Node centered on the continuous line */}
                  <div className="relative flex items-center justify-center w-7 h-7">
                    <button
                      onClick={() => scrollToSection(wp.id)}
                      className={`relative rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center ${
                        isActive
                          ? theme === "dark"
                            ? "w-4.5 h-4.5 bg-black border-2 border-white timeline-active-node z-20 scale-110"
                            : "w-4.5 h-4.5 bg-white border-2 border-[#b18a79] timeline-active-node-light z-20 scale-110"
                          : isHovered
                          ? theme === "dark"
                            ? "w-3.5 h-3.5 bg-white border-2 border-white scale-125 z-15"
                            : "w-3.5 h-3.5 bg-[#b18a79] border-2 border-[#b18a79] scale-125 z-15"
                          : theme === "dark"
                          ? "w-3 h-3 bg-[#12131a] border border-white/50 hover:border-white hover:scale-130 z-10"
                          : "w-3 h-3 bg-neutral-100 border border-neutral-400 hover:border-[#b18a79] hover:scale-130 z-10"
                      }`}
                      aria-label={`Jump to ${wp.title}`}
                      title={wp.title}
                    >
                      {isActive && (
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            theme === "dark" ? "bg-white" : "bg-[#b18a79]"
                          }`}
                        />
                      )}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </aside>
    </>
  );
}

export default Navbar;
