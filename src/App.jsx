import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ProjectsSection } from "./components/ProjectsSection";
import { PhotoGallery } from "./components/PhotoGallery";
import { JournalSection } from "./components/JournalSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { LiveMiniPreviewModal } from "./components/LiveMiniPreviewModal";
import { VideoPreviewModal } from "./components/VideoPreviewModal";
import { PhotoLightbox } from "./components/PhotoLightbox";
import { JournalReaderModal } from "./components/JournalReaderModal";
import CanvasCursor from "./components/CanvasCursor";
import useLiquidGlass from "./hooks/useLiquidGlass";
import { caseStudies, photoSeries, essays } from "./data/portfolioData";

export function App() {
  // Activate interactive specular liquid glass tracking
  useLiquidGlass();

  // Theme state: dark by default, persists in localStorage
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem("joy_theme");
      if (stored === "light" || stored === "dark") return stored;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } catch (e) {
      return "dark";
    }
  });

  // Modal states
  const [livePreviewProject, setLivePreviewProject] = useState(null);
  const [videoDemoProject, setVideoDemoProject] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [activeArticle, setActiveArticle] = useState(null);

  // Synchronize theme with <html> element and data-theme attribute
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) meta.content = theme;
    try {
      localStorage.setItem("joy_theme", theme);
    } catch (e) {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleOpenPhoto = (photo, index) => {
    setLightboxIndex(index);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300 selection:bg-[#b18a79]/25 dark:selection:bg-[#b6a2c9]/30">
      {/* Canvas Cursor Trail */}
      <CanvasCursor />

      {/* Editorial Navigation */}
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      {/* Main Content: Hero, Projects, Photography, Journal, Connect */}
      <main className="flex-1">
        {/* Hero */}
        <Hero
          onOpenLivePreview={(proj) => setLivePreviewProject(proj)}
          onOpenVideoDemo={(proj) => setVideoDemoProject(proj)}
        />

        {/* Selected Works with Live Mini-Window & Video Walkthroughs */}
        <ProjectsSection
          onOpenLivePreview={(proj) => setLivePreviewProject(proj)}
          onOpenVideoDemo={(proj) => setVideoDemoProject(proj)}
        />

        {/* Photography & Field Visuals */}
        <PhotoGallery onSelectPhoto={handleOpenPhoto} />

        {/* Field Notes & Journal */}
        <JournalSection onReadArticle={(article) => setActiveArticle(article)} />

        {/* Connect & Social Media Presence */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Mini-Window Preview Modal */}
      <LiveMiniPreviewModal
        project={livePreviewProject}
        isOpen={!!livePreviewProject}
        onClose={() => setLivePreviewProject(null)}
      />

      {/* Video Demo Preview Modal */}
      <VideoPreviewModal
        project={videoDemoProject}
        isOpen={!!videoDemoProject}
        onClose={() => setVideoDemoProject(null)}
        onOpenLivePreview={(proj) => {
          setVideoDemoProject(null);
          setLivePreviewProject(proj);
        }}
      />

      {/* Fullscreen Photo Lightbox with Camera Optics */}
      <PhotoLightbox
        photos={photoSeries}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />

      {/* Journal Essay Reader Modal */}
      <JournalReaderModal
        article={activeArticle}
        isOpen={!!activeArticle}
        onClose={() => setActiveArticle(null)}
      />
    </div>
  );
}

export default App;
