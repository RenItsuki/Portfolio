import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { 
  Play, 
  Code2, 
  Sparkles, 
  ExternalLink,
  Shield,
  Layers,
  Compass,
  Star,
  Zap,
  Crosshair,
  Maximize2,
  Minimize2,
  X,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Move,
  Cpu,
  Palette,
  Activity,
  Flame,
  Globe,
  Radio,
  Eye,
  CheckCircle2,
  Terminal,
  Boxes,
  Award,
  Crown,
  Scroll,
  Gem,
  Swords
} from "lucide-react";
import { 
  caseStudies, 
  projectCategories 
} from "../data/projectsData";

// Category-to-icon helper
const getCategoryIcon = (category = "") => {
  const cat = category.toLowerCase();
  if (cat.includes("ai") || cat.includes("vision") || cat.includes("robotics")) return Cpu;
  if (cat.includes("3d") || cat.includes("graphic") || cat.includes("shader")) return Palette;
  if (cat.includes("learning") || cat.includes("analytics")) return Activity;
  if (cat.includes("strategy") || cat.includes("theatre") || cat.includes("audio") || cat.includes("media")) return Flame;
  if (cat.includes("web") || cat.includes("ui")) return Globe;
  return Sparkles;
};

// RPG Tier badge helper for tech stack
const getTechTier = (index) => {
  if (index === 0) return { label: "[LEGENDARY]", color: "text-[#e5c07b] border-[#e5c07b]/70 bg-[#e5c07b]/20" };
  if (index === 1) return { label: "[EPIC]", color: "text-amber-400 border-amber-500/60 bg-amber-500/15" };
  if (index === 2) return { label: "[RARE]", color: "text-[#b18a79] border-[#b18a79]/60 bg-[#b18a79]/15" };
  return { label: "[ARTIFACT]", color: "text-neutral-400 border-neutral-500/40 bg-white/5" };
};

/**
 * Organic Centered Cluster Layout Algorithm
 * - Places project 0 directly in the center at (0, 0).
 * - Distributes subsequent projects organically in tight concentric rings around it.
 * - Spacing is intentionally intimate (~210px to ~420px) so all projects are close together.
 * - Automatically adapts to ANY number of projects dynamically!
 */
const calculateClusterLayout = (projects) => {
  if (!projects || projects.length === 0) return [];
  
  const positions = [];
  // Project 0 is ALWAYS in the center
  positions.push({
    ...projects[0],
    x: 0,
    y: 0,
    ring: 0,
    floatDuration: 5.2,
    floatDelay: 0.2
  });

  const ringRadii = [0, 215, 395, 575, 750, 920];
  const ringCapacities = [1, 5, 8, 12, 16, 20];

  let currentRing = 1;
  let currentInRing = 0;

  for (let i = 1; i < projects.length; i++) {
    if (currentInRing >= ringCapacities[currentRing]) {
      currentRing++;
      currentInRing = 0;
    }

    const cap = ringCapacities[currentRing];
    const baseRadius = ringRadii[currentRing];

    // Angular offset rotates each ring for organic staggering
    const ringAngleOffset = currentRing * 0.785;
    const angle = (2 * Math.PI * currentInRing / cap) + ringAngleOffset;

    // Organic deterministic jitter based on index
    const seed = (i * 9301 + 49297) % 233280;
    const jitterRadius = ((seed % 30) - 15); // +/- 15px
    const jitterAngle = (((seed / 100) % 18) - 9) * (Math.PI / 180); // +/- 9 deg

    const finalRadius = baseRadius + jitterRadius;
    const finalAngle = angle + jitterAngle;

    const x = Math.round(finalRadius * Math.cos(finalAngle));
    const y = Math.round(finalRadius * Math.sin(finalAngle));

    // Dynamic float durations and delays
    const floatDuration = 4.8 + ((i * 7) % 25) / 10;
    const floatDelay = ((i * 13) % 20) / 10;

    positions.push({
      ...projects[i],
      x,
      y,
      ring: currentRing,
      floatDuration,
      floatDelay
    });

    currentInRing++;
  }

  return positions;
};

export function ProjectsSection({ onOpenLivePreview, onOpenVideoDemo }) {
  const containerRef = useRef(null);
  
  // Viewport dimensions
  const [viewportSize, setViewportSize] = useState({ width: 1000, height: 680 });

  // Category Filter State
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Selected Project for RPG Inspection Codex Modal
  const [activeProject, setActiveProject] = useState(null);

  // Drag interaction state
  const [showDragHint, setShowDragHint] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  // Filtered projects list
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "all") return caseStudies;
    const catObj = projectCategories.find(c => c.id === selectedCategory);
    const matchTerm = (catObj?.match || selectedCategory).toLowerCase();
    return caseStudies.filter(p => p.category.toLowerCase().includes(matchTerm));
  }, [selectedCategory]);

  // Layout calculation for the current filtered list (Project 0 always centered!)
  const layoutProjects = useMemo(() => {
    return calculateClusterLayout(filteredProjects);
  }, [filteredProjects]);

  // Dynamic mesh bounding radius (expands automatically if more projects exist)
  const meshRadius = useMemo(() => {
    if (layoutProjects.length === 0) return 600;
    const maxDist = Math.max(...layoutProjects.map(p => Math.hypot(p.x, p.y)));
    return Math.max(maxDist + 280, 520);
  }, [layoutProjects]);

  // Viewport Pan & Zoom State (Centered on (0, 0))
  const [zoom, setZoom] = useState(0.92);
  const [pan, setPan] = useState({ x: 500, y: 340 });

  // Update viewport dimensions on mount & window resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setViewportSize({ width: rect.width, height: rect.height });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Clamping function: prevents panning beyond the cluster mesh!
  const clampPan = useCallback((newPanX, newPanY, currentZoom = zoom) => {
    const w = viewportSize.width;
    const h = viewportSize.height;
    // Allow panning so cluster stays within viewport margins, but stops at mesh edge
    const maxPanDist = (meshRadius * currentZoom) + 80;

    const minX = w / 2 - maxPanDist;
    const maxX = w / 2 + maxPanDist;
    const minY = h / 2 - maxPanDist;
    const maxY = h / 2 + maxPanDist;

    return {
      x: Math.min(Math.max(newPanX, minX), maxX),
      y: Math.min(Math.max(newPanY, minY), maxY)
    };
  }, [viewportSize, meshRadius, zoom]);

  // Re-center whenever filter or layout changes
  useEffect(() => {
    const initialZoom = viewportSize.width < 768 ? 0.72 : 0.92;
    setZoom(initialZoom);
    setPan({
      x: viewportSize.width / 2,
      y: viewportSize.height / 2
    });
  }, [selectedCategory, viewportSize.width, viewportSize.height]);

  // Reset to cluster center
  const resetView = useCallback(() => {
    const defaultZoom = viewportSize.width < 768 ? 0.72 : 0.92;
    setZoom(defaultZoom);
    setPan({
      x: viewportSize.width / 2,
      y: viewportSize.height / 2
    });
  }, [viewportSize]);

  // Center on a specific project
  const centerOnProject = useCallback((x, y) => {
    const targetPanX = viewportSize.width / 2 - x * zoom;
    const targetPanY = viewportSize.height / 2 - y * zoom;
    const clamped = clampPan(targetPanX, targetPanY, zoom);
    setPan(clamped);
  }, [viewportSize, zoom, clampPan]);

  // Zoom In / Out handlers with clamping
  const handleZoomIn = () => {
    const newZoom = Math.min(zoom * 1.25, 1.7);
    setZoom(newZoom);
    setPan(prev => clampPan(prev.x, prev.y, newZoom));
    setShowDragHint(false);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoom * 0.8, 0.55);
    setZoom(newZoom);
    setPan(prev => clampPan(prev.x, prev.y, newZoom));
    setShowDragHint(false);
  };

  // Mouse Drag / Pan handlers
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y
    };
    setShowDragHint(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    const candidateX = dragStartRef.current.panX + dx;
    const candidateY = dragStartRef.current.panY + dy;
    setPan(clampPan(candidateX, candidateY, zoom));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Handlers for Mobile Devices
  const touchStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0, dist: 0 });

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        panX: pan.x,
        panY: pan.y,
        dist: 0
      };
      setShowDragHint(false);
    } else if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      touchStartRef.current.dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && isDragging) {
      const dx = e.touches[0].clientX - touchStartRef.current.x;
      const dy = e.touches[0].clientY - touchStartRef.current.y;
      setPan(clampPan(touchStartRef.current.panX + dx, touchStartRef.current.panY + dy, zoom));
    } else if (e.touches.length === 2 && touchStartRef.current.dist > 0) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const factor = dist / touchStartRef.current.dist;
      const newZoom = Math.min(Math.max(zoom * factor, 0.55), 1.7);
      setZoom(newZoom);
      setPan(prev => clampPan(prev.x, prev.y, newZoom));
      touchStartRef.current.dist = dist;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Mouse Wheel Zoom centered on cursor with mesh boundary clamping
  const handleWheel = (e) => {
    e.preventDefault();
    setShowDragHint(false);
    
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
    const newZoom = Math.min(Math.max(zoom * zoomFactor, 0.55), 1.7);

    const scaleChange = newZoom / zoom;
    const newPanX = mouseX - (mouseX - pan.x) * scaleChange;
    const newPanY = mouseY - (mouseY - pan.y) * scaleChange;

    setZoom(newZoom);
    setPan(clampPan(newPanX, newPanY, newZoom));
  };

  // Node Click: smoothly center on project and open RPG Quest Codex
  const handleNodeClick = (project, e) => {
    e.stopPropagation();
    centerOnProject(project.x, project.y);
    setActiveProject(project);
  };

  return (
    <section id="projects" className="py-24 sm:py-32 border-t border-[#dbd2c4] dark:border-white/10 relative overflow-hidden select-none">
      
      {/* Ambient RPG Mystic Auroras */}
      <div className="absolute top-1/4 left-1/4 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-[#dfb29d]/15 via-[#b18a79]/10 to-transparent dark:from-[#4b396f]/25 dark:via-[#e5c07b]/10 dark:to-transparent blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-amber-500/10 via-[#b18a79]/8 to-transparent dark:from-[#e5c07b]/15 dark:via-[#4b396f]/10 dark:to-transparent blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================== */}
        {/* Section Header                                                 */}
        {/* ============================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#b18a79] dark:text-[#e5c07b]">
              <span className="w-2 h-2 rounded-full bg-[#b18a79] dark:bg-[#e5c07b] animate-pulse" />
              <span>EXPEDITION ARCHIVE // FLOATING QUEST ASTROLABE</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#202020] dark:text-[#f3f2f7] tracking-tight flex items-center gap-3">
              <span>Completed Quests & Floating Works</span>
            </h2>
            
            <p className="text-xs sm:text-sm text-[#5e5953] dark:text-[#a9a5b8] max-w-2xl font-sans font-light leading-relaxed">
              Explore completed software quests floating organically in the air. Drag freely to explore the constellation, scroll to zoom, and select any quest orb to unfurl its RPG Codex, blueprints, and live battle simulator.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-[#dbd2c4] dark:border-white/10 overflow-x-auto no-scrollbar max-w-full">
            {projectCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-[#b18a79] dark:bg-[#e5c07b] text-white dark:text-black font-bold shadow-[0_0_18px_rgba(229,192,123,0.35)] scale-102"
                    : "text-[#5e5953] dark:text-[#a9a5b8] hover:text-[#202020] dark:hover:text-[#e5c07b]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* Omnidirectional Floating Cosmos Viewport Container             */}
        {/* ============================================================== */}
        <div 
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          className={`relative w-full h-[620px] sm:h-[680px] md:h-[740px] rounded-[32px] sm:rounded-[40px] overflow-hidden border border-[#dbd2c4] dark:border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.85)] bg-[#f8f5ee] dark:bg-[#07080e] select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {/* Top-Left Telemetry Pill */}
          <div className="absolute top-4 left-4 sm:left-6 z-30 flex items-center gap-3 pointer-events-none">
            <div className="px-3.5 py-1.5 rounded-xl bg-[#fdfcf9]/90 dark:bg-[#12141e]/90 backdrop-blur-md border border-[#dbd2c4] dark:border-white/10 text-xs font-mono text-[#b18a79] dark:text-[#e5c07b] flex items-center gap-2 shadow-lg">
              <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: "16s" }} />
              <span className="font-bold">QUEST CONSTELLATION</span>
              <span className="text-neutral-400 dark:text-neutral-600">|</span>
              <span className="text-[#5e5953] dark:text-[#a9a5b8]">
                {layoutProjects.length} of {caseStudies.length} Clustered
              </span>
            </div>
          </div>

          {/* Top-Right Mini Controls Deck (Zoom In, Zoom Out, Reset Center) */}
          <div className="absolute top-4 right-4 sm:right-6 z-30 flex items-center gap-2 pointer-events-auto">
            <button
              onClick={handleZoomIn}
              className="w-9 h-9 rounded-xl bg-[#fdfcf9]/90 dark:bg-[#12141e]/90 hover:bg-[#b18a79] dark:hover:bg-[#e5c07b] hover:text-white dark:hover:text-black backdrop-blur-md border border-[#dbd2c4] dark:border-white/10 text-[#202020] dark:text-[#e5c07b] flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
              title="Zoom In"
              aria-label="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="w-9 h-9 rounded-xl bg-[#fdfcf9]/90 dark:bg-[#12141e]/90 hover:bg-[#b18a79] dark:hover:bg-[#e5c07b] hover:text-white dark:hover:text-black backdrop-blur-md border border-[#dbd2c4] dark:border-white/10 text-[#202020] dark:text-[#e5c07b] flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
              title="Zoom Out"
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={resetView}
              className="w-9 h-9 rounded-xl bg-[#fdfcf9]/90 dark:bg-[#12141e]/90 hover:bg-[#b18a79] dark:hover:bg-[#e5c07b] hover:text-white dark:hover:text-black backdrop-blur-md border border-[#dbd2c4] dark:border-white/10 text-[#202020] dark:text-[#e5c07b] flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
              title="Center Astrolabe"
              aria-label="Center Astrolabe"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Floating Hint Overlay */}
          {showDragHint && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-full bg-[#fdfcf9]/90 dark:bg-[#12141e]/90 backdrop-blur-md border border-[#dbd2c4] dark:border-white/15 text-[11px] font-mono text-[#b18a79] dark:text-[#e5c07b] flex items-center gap-2 shadow-xl animate-bounce pointer-events-none">
              <Move className="w-3.5 h-3.5" />
              <span>Drag freely to explore • Scroll or pinch to zoom • Bounded to cluster</span>
            </div>
          )}

          {/* ============================================================== */}
          {/* Centered Floating Cosmos Canvas (Origin at 0, 0)               */}
          {/* ============================================================== */}
          <div
            style={{
              transform: `translate3d(${pan.x}px, ${pan.y}px, 0px) scale(${zoom})`,
              transformOrigin: "0 0",
              transition: isDragging ? "none" : "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
            className="absolute top-0 left-0 pointer-events-none"
          >
            {/* Dynamic Continuous RPG Astrolabe Mesh Background (10,000px infinite space) */}
            <div 
              style={{
                width: "10000px",
                height: "10000px",
                left: "-5000px",
                top: "-5000px"
              }}
              className="absolute pointer-events-none"
            >
              <svg className="w-full h-full" viewBox="0 0 10000 10000">
                <defs>
                  {/* Subtle Mystic Dot Grid - Seamless & Infinite */}
                  <pattern id="mysticDots" width="36" height="36" patternUnits="userSpaceOnUse">
                    <circle cx="18" cy="18" r="1.1" className="fill-[#b18a79]/20 dark:fill-[#e5c07b]/20" />
                  </pattern>

                  {/* Soft Radial Fade Mask so Astrolabe rings dissolve seamlessly */}
                  <radialGradient id="astrolabeFadeGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="white" stopOpacity="1" />
                    <stop offset="65%" stopColor="white" stopOpacity="0.85" />
                    <stop offset="88%" stopColor="white" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </radialGradient>

                  <mask id="astrolabeRingsMask">
                    <circle cx="5000" cy="5000" r={meshRadius + 120} fill="url(#astrolabeFadeGrad)" />
                  </mask>

                  {/* Ambient Glow Gradient */}
                  <radialGradient id="meshRadialFade" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#e5c07b" stopOpacity="0.14" />
                    <stop offset="45%" stopColor="#b18a79" stopOpacity="0.06" />
                    <stop offset="80%" stopColor="#b18a79" stopOpacity="0.02" />
                    <stop offset="100%" stopColor="#b18a79" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Continuous Infinite Dot Grid across entire space */}
                <rect width="100%" height="100%" fill="url(#mysticDots)" />

                {/* Soft Radial Ambient Aura in Center */}
                <circle cx="5000" cy="5000" r={meshRadius + 100} fill="url(#meshRadialFade)" />

                {/* Astrolabe Concentric Rings and Mystic Rays (Fading gracefully to transparent) */}
                <g mask="url(#astrolabeRingsMask)">
                  {/* Dynamically generated concentric orbit rings every 180px */}
                  {Array.from({ length: Math.ceil((meshRadius + 80) / 180) }, (_, i) => (i + 1) * 180).map((r, i) => (
                    <circle 
                      key={`orbit-${r}`}
                      cx="5000" 
                      cy="5000" 
                      r={r} 
                      fill="none" 
                      className={
                        i % 2 === 0
                          ? "stroke-[#b18a79]/25 dark:stroke-[#e5c07b]/25"
                          : "stroke-[#b18a79]/15 dark:stroke-[#e5c07b]/15"
                      }
                      strokeWidth={i === 0 ? "1.5" : "1"} 
                      strokeDasharray={i % 3 === 0 ? "6 8" : i % 3 === 1 ? "12 10" : "4 6"} 
                    />
                  ))}

                  {/* Radial Mystic Rays emanating from center */}
                  <line x1="5000" y1={5000 - (meshRadius + 100)} x2="5000" y2={5000 + (meshRadius + 100)} className="stroke-[#b18a79]/15 dark:stroke-[#e5c07b]/15" strokeWidth="0.8" strokeDasharray="8 8" />
                  <line x1={5000 - (meshRadius + 100)} y1="5000" x2={5000 + (meshRadius + 100)} y2="5000" className="stroke-[#b18a79]/15 dark:stroke-[#e5c07b]/15" strokeWidth="0.8" strokeDasharray="8 8" />
                  
                  {/* Diagonal Mystic Rays */}
                  <line 
                    x1={5000 - (meshRadius * 0.7)} 
                    y1={5000 - (meshRadius * 0.7)} 
                    x2={5000 + (meshRadius * 0.7)} 
                    y2={5000 + (meshRadius * 0.7)} 
                    className="stroke-[#b18a79]/10 dark:stroke-[#e5c07b]/10" 
                    strokeWidth="0.8" 
                    strokeDasharray="6 8" 
                  />
                  <line 
                    x1={5000 - (meshRadius * 0.7)} 
                    y1={5000 + (meshRadius * 0.7)} 
                    x2={5000 + (meshRadius * 0.7)} 
                    y2={5000 - (meshRadius * 0.7)} 
                    className="stroke-[#b18a79]/10 dark:stroke-[#e5c07b]/10" 
                    strokeWidth="0.8" 
                    strokeDasharray="6 8" 
                  />
                </g>

                {/* Center Sacred Geometry Astrolabe Glyph */}
                <g className="arcane-rune-spin" style={{ transformOrigin: "5000px 5000px" }}>
                  <polygon
                    points="5000,4930 5060,5035 4940,5035"
                    fill="none"
                    className="stroke-[#b18a79]/30 dark:stroke-[#e5c07b]/30"
                    strokeWidth="1.2"
                  />
                  <polygon
                    points="5000,5070 5060,4965 4940,4965"
                    fill="none"
                    className="stroke-[#b18a79]/30 dark:stroke-[#e5c07b]/30"
                    strokeWidth="1.2"
                  />
                  <circle cx="5000" cy="5000" r="85" fill="none" className="stroke-[#b18a79]/20 dark:stroke-[#e5c07b]/20" strokeWidth="1" strokeDasharray="4 4" />
                </g>
              </svg>
            </div>



            {/* ============================================================ */}
            {/* Floating Project Orbs (Close, Non-Overlapping & Independent) */}
            {/* ============================================================ */}
            {layoutProjects.map((project, index) => {
              const IconComponent = getCategoryIcon(project.category);
              const isCenterNode = index === 0;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={project.id || index}
                  style={{
                    left: `${project.x}px`,
                    top: `${project.y}px`,
                    transform: "translate(-50%, -50%)"
                  }}
                  className="absolute pointer-events-auto group"
                >
                  {/* Subtle Bobbing Animation Container */}
                  <div
                    style={{
                      animation: `${isEven ? "celestialBob" : "celestialBobAlt"} ${project.floatDuration}s ease-in-out infinite`,
                      animationDelay: `${project.floatDelay}s`
                    }}
                    className="flex flex-col items-center cursor-pointer transition-transform duration-300 group-hover:scale-110"
                    onClick={(e) => handleNodeClick(project, e)}
                  >
                    {/* Breathing Ambient Halo behind each orb */}
                    <div className={`absolute -inset-4 rounded-full ${
                      isCenterNode
                        ? "bg-gradient-to-tr from-[#e5c07b]/30 to-[#b18a79]/30 blur-2xl"
                        : "bg-gradient-to-tr from-[#b18a79]/15 to-[#e5c07b]/15 blur-xl"
                    } pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity`} />

                    {/* Circular Project Artwork Orb */}
                    <div className={`relative ${
                      isCenterNode ? "w-28 h-28 sm:w-32 sm:h-32 ring-2 ring-[#e5c07b] ring-offset-2 ring-offset-black" : "w-24 h-24 sm:w-28 sm:h-28"
                    } rounded-full p-1 bg-gradient-to-tr from-[#b18a79] via-[#e5c07b] to-[#b18a79] dark:from-[#b18a79] dark:via-[#e5c07b] dark:to-[#d97706] shadow-[0_10px_35px_rgba(0,0,0,0.3)] dark:shadow-[0_12px_45px_rgba(229,192,123,0.35)] transition-all group-hover:shadow-[0_0_40px_rgba(229,192,123,0.8)] group-hover:scale-105`}>
                      
                      {/* Outer Rotating Arcane Runes Sweep */}
                      <div className="absolute -inset-1.5 rounded-full border border-dashed border-[#b18a79]/50 dark:border-[#e5c07b]/50 hud-radar-sweep pointer-events-none" />

                      {/* Inner Circular Image Container */}
                      <div className="relative w-full h-full rounded-full overflow-hidden bg-neutral-900 border-2 border-[#fdfcf9] dark:border-[#12141e]">
                        <img
                          src={project.posterImage}
                          alt={project.title}
                          className="w-full h-full object-cover filter brightness-95 group-hover:brightness-110 group-hover:scale-115 transition-all duration-700 ease-out"
                          loading="lazy"
                        />
                        {/* Radial Shadow Scrim */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

                        {/* Floating Category Icon Badge in Center */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 p-1.5 rounded-full bg-[#12141e]/85 backdrop-blur-md border border-[#e5c07b]/60 text-[#e5c07b] shadow-md group-hover:scale-110 transition-transform">
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Center Node Crown or Index Badge */}
                      {isCenterNode ? (
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#e5c07b] to-amber-500 text-black font-mono font-extrabold text-[9px] shadow-lg flex items-center gap-1 border border-white/40">
                          <Crown className="w-3 h-3 fill-current" />
                          <span>NEXUS</span>
                        </div>
                      ) : (
                        <div className="absolute -top-1.5 -left-1.5 px-2 py-0.5 rounded-full bg-[#b18a79] dark:bg-[#e5c07b] text-white dark:text-black font-mono font-extrabold text-[10px] shadow-md border border-white/20">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      )}
                    </div>

                    {/* Clean Floating Title Pill (Placed closely below orb) */}
                    <div className="mt-2.5 px-3 py-1.5 rounded-2xl bg-[#fdfcf9]/95 dark:bg-[#12141e]/95 backdrop-blur-md border border-[#dbd2c4] dark:border-[#38374d] group-hover:border-[#b18a79] dark:group-hover:border-[#e5c07b] shadow-lg text-center w-36 sm:w-40 transition-all group-hover:shadow-[0_0_20px_rgba(229,192,123,0.3)]">
                      <div className="font-serif font-bold text-xs text-[#202020] dark:text-white truncate">
                        {project.title}
                      </div>
                      <div className="text-[9px] font-mono text-[#b18a79] dark:text-[#e5c07b] truncate mt-0.5">
                        {project.category}
                      </div>
                      
                      {/* Click hint on hover */}
                      <div className="mt-1 flex items-center justify-center gap-1 text-[8px] font-mono text-[#8f8880] dark:text-[#a9a5b8] group-hover:text-[#b18a79] dark:group-hover:text-[#e5c07b] transition-colors">
                        <Swords className="w-2.5 h-2.5" />
                        <span>OPEN CODEX</span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* ============================================================== */}
      {/* RPG Quest Codex Reveal Modal (Dramatic Arcane Magic Unfurl)    */}
      {/* ============================================================== */}
      {activeProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-300"
          onClick={() => setActiveProject(null)}
        >
          {/* Rotating Arcane Magic Astrolabe Circle behind Modal */}
          <div className="absolute w-[560px] h-[560px] sm:w-[720px] sm:h-[720px] pointer-events-none opacity-30 dark:opacity-40">
            <svg className="w-full h-full arcane-rune-spin" viewBox="0 0 600 600">
              <circle cx="300" cy="300" r="280" fill="none" stroke="#e5c07b" strokeWidth="1.5" strokeDasharray="8 6" />
              <circle cx="300" cy="300" r="240" fill="none" stroke="#b18a79" strokeWidth="2" strokeDasharray="16 12" />
              <polygon points="300,40 520,420 80,420" fill="none" stroke="#e5c07b" strokeWidth="1.5" />
              <polygon points="300,560 520,180 80,180" fill="none" stroke="#e5c07b" strokeWidth="1.5" />
            </svg>
            <svg className="absolute inset-0 w-full h-full arcane-rune-reverse" viewBox="0 0 600 600">
              <circle cx="300" cy="300" r="180" fill="none" stroke="#e5c07b" strokeWidth="1" strokeDasharray="4 8" />
              <circle cx="300" cy="300" r="120" fill="none" stroke="#b18a79" strokeWidth="1.5" strokeDasharray="10 6" />
            </svg>
          </div>

          {/* Modal Container: Unfurls with 3D Perspective & Golden Gleam */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#fdfcf9] dark:bg-[#12141e] border-2 border-[#b18a79] dark:border-[#e5c07b]/80 shadow-[0_0_90px_rgba(229,192,123,0.45)] p-6 sm:p-8 text-[#202020] dark:text-[#f3f2f7] rpg-quest-unfurl text-left overflow-hidden"
          >
            {/* Golden Gleam Light Sweep */}
            <div className="rpg-gleam-effect" />

            {/* Top RPG Decorative Banner */}
            <div className="flex items-center justify-between pb-3 border-b border-[#dbd2c4]/70 dark:border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <div className="px-2.5 py-0.5 rounded-full bg-[#b18a79]/15 dark:bg-[#e5c07b]/15 border border-[#b18a79]/50 dark:border-[#e5c07b]/50 text-[#b18a79] dark:text-[#e5c07b] font-mono font-bold text-[10px] sm:text-xs flex items-center gap-1.5 shadow-sm">
                  <Swords className="w-3.5 h-3.5 text-[#b18a79] dark:text-[#e5c07b]" />
                  <span>⚔ QUEST COMPLETED // ARCHIVE CODEX</span>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-[#e5c07b]">
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-[10px] font-mono font-bold ml-1 text-[#b18a79] dark:text-[#e5c07b]">S-TIER</span>
                </div>
              </div>

              {/* Dismiss / Return Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="px-3 py-1 rounded-xl bg-red-950/20 dark:bg-red-950/80 hover:bg-red-900/40 border border-red-500/50 text-red-700 dark:text-red-200 font-mono text-xs flex items-center gap-1.5 shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer z-20"
                aria-label="Dismiss Codex"
                title="Return to Astrolabe Map"
              >
                <X className="w-4 h-4 text-red-500" />
                <span>RETURN TO MAP ✕</span>
              </button>
            </div>

            {/* Title & Quest Category */}
            <div className="mb-6">
              <div className="text-xs font-mono uppercase tracking-widest text-[#b18a79] dark:text-[#e5c07b] mb-1 flex items-center gap-2">
                <span>SECTOR // {activeProject.category}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#b18a79] dark:bg-[#e5c07b]" />
                <span className="text-neutral-500 dark:text-neutral-400">AUTHENTICATED</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#202020] dark:text-white">
                {activeProject.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5e5953] dark:text-[#a9a5b8] font-light leading-relaxed mt-1 font-sans">
                {activeProject.subtitle}
              </p>
            </div>

            {/* Two Column Layout: Media on Left, Quest Ledger on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column (5 cols): Media & Adventure Triggers */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#b18a79]/50 dark:border-[#e5c07b]/50 shadow-md group">
                  <img
                    src={activeProject.posterImage}
                    alt={activeProject.title}
                    className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-85 pointer-events-none" />
                  
                  {/* Ornate Corner Diamond Rivets */}
                  <div className="absolute top-2 left-2 text-[#e5c07b] text-xs font-bold pointer-events-none">◆</div>
                  <div className="absolute top-2 right-2 text-[#e5c07b] text-xs font-bold pointer-events-none">◆</div>
                  <div className="absolute bottom-2 left-2 text-[#e5c07b] text-xs font-bold pointer-events-none">◆</div>
                  <div className="absolute bottom-2 right-2 text-[#e5c07b] text-xs font-bold pointer-events-none">◆</div>

                  {/* RPG Telemetry Dock */}
                  <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-[11px] font-mono text-[#fde68a] bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15">
                    <span>LVL: <strong className="text-white">99</strong></span>
                    <span>ROLE: <strong className="text-white">{activeProject.role}</strong></span>
                    <span>YEAR: <strong className="text-white">{activeProject.year}</strong></span>
                  </div>
                </div>

                {/* Adventure Action Triggers (Launch Sim, Video, Code Relic) */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {onOpenLivePreview && (
                    <button
                      onClick={() => {
                        onOpenLivePreview(activeProject);
                        setActiveProject(null);
                      }}
                      className="flex-1 min-w-[140px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#b18a79] via-[#9c7564] to-[#b18a79] dark:from-[#e5c07b] dark:via-[#d97706] dark:to-[#e5c07b] text-white dark:text-black font-mono font-bold text-xs shadow-[0_0_20px_rgba(229,192,123,0.35)] flex items-center justify-center gap-2 transition-transform hover:scale-102 active:scale-95 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Launch Sim ↗</span>
                    </button>
                  )}

                  {onOpenVideoDemo && activeProject.videoPreviewUrl && (
                    <button
                      onClick={() => {
                        onOpenVideoDemo(activeProject);
                        setActiveProject(null);
                      }}
                      className="py-2 px-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[#202020] dark:text-[#e5c07b] border border-[#dbd2c4] dark:border-white/15 text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:border-[#b18a79] dark:hover:border-[#e5c07b]"
                    >
                      <Scroll className="w-3.5 h-3.5 text-[#b18a79] dark:text-[#e5c07b]" />
                      <span>Chronicle Video</span>
                    </button>
                  )}

                  {(activeProject.githubUrl || activeProject.links?.github) && (
                    <a
                      href={activeProject.githubUrl || activeProject.links?.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[#202020] dark:text-[#e5c07b] border border-[#dbd2c4] dark:border-white/15 text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:border-[#b18a79] dark:hover:border-[#e5c07b]"
                    >
                      <Code2 className="w-3.5 h-3.5 text-[#b18a79] dark:text-[#e5c07b]" />
                      <span>Code Relics ↗</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column (7 cols): Challenge Conquered, Relics, Chronicles */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Defeated Boss / Conquered Challenge Box */}
                <div className="p-4 rounded-2xl bg-[#efeae0]/60 dark:bg-[#1a1d2b]/80 border border-[#dbd2c4] dark:border-[#38374d] text-left">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#b18a79] dark:text-[#e5c07b] mb-1.5">
                    <Swords className="w-4 h-4 text-[#b18a79] dark:text-[#e5c07b]" />
                    <span>⚔ DEFEATED BOSS / CONQUERED CHALLENGE:</span>
                  </div>
                  <h4 className="font-sans font-bold text-sm sm:text-base text-[#202020] dark:text-white mb-2">
                    {activeProject.impact || activeProject.challenge}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5e5953] dark:text-[#a9a5b8] font-light leading-relaxed">
                    {activeProject.summary || activeProject.description}
                  </p>
                </div>

                {/* Acquired Loot & Tech Relics */}
                <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-[#dbd2c4] dark:border-white/10 text-left">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#b18a79] dark:text-[#e5c07b] mb-3">
                    <Gem className="w-4 h-4 text-[#b18a79] dark:text-[#e5c07b]" />
                    <span>💎 ACQUIRED LOOT & TECH RELICS:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(activeProject.tags || activeProject.stack)?.map((tech, i) => {
                      const tier = getTechTier(i);
                      return (
                        <span
                          key={tech}
                          className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 border shadow-sm ${tier.color}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                          <span>{tech}</span>
                          <span className="text-[9px] opacity-75 font-normal">
                            {tier.label}
                          </span>
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* System Chronicles & Achievement Feats */}
                <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-[#dbd2c4] dark:border-white/10 text-left">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#b18a79] dark:text-[#e5c07b] mb-2.5">
                    <Scroll className="w-4 h-4 text-[#b18a79] dark:text-[#e5c07b]" />
                    <span>📜 CHRONICLES & ACHIEVEMENT FEATS:</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#5e5953] dark:text-[#a9a5b8] font-light">
                    {activeProject.highlights?.map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#b18a79] dark:text-[#e5c07b] font-mono font-bold mt-0.5">✦</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
