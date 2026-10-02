import React, { useState, useEffect, useRef } from "react";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Columns2, 
  FileText, 
  Sparkles, 
  Clock, 
  Volume2,
  Maximize2,
  Minimize2
} from "lucide-react";
import { autoPaginateContent, parseLyrics, normalizeGoogleDriveImageUrl } from "../utils/googleDrive";

/**
 * Parses and formats story content with literary typography:
 * - Highlights character dialogue cues (Chihara, Shiki, Mana, Uncle, etc.)
 * - Styles stage directions & breathing pauses (*Takes a breath*, etc.)
 * - Formats scene markers (*This Video was playing at her funeral*, etc.)
 * - Formats philosophical conclusions and literary drop caps
 */
function renderFormattedStoryParagraph(text, index, isFirstOfChapter = false, accentColor = "#d97746", textPrimary = "") {
  if (!text) return null;
  const trimmed = text.trim();

  // 1. Philosophical / Inspirational Closing Callouts
  if (
    trimmed.startsWith("Sometimes in the darkest of places") ||
    trimmed.startsWith("Love has no bounds") ||
    trimmed.startsWith("In the face of a broken world")
  ) {
    return (
      <blockquote 
        key={index}
        className="my-6 p-5 sm:p-6 rounded-2xl border-l-4 shadow-sm text-left transition-all leading-relaxed font-serif italic text-base sm:text-lg select-none"
        style={{
          borderColor: accentColor,
          backgroundColor: `${accentColor}12`
        }}
      >
        <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest font-bold not-italic" style={{ color: accentColor }}>
          <Sparkles className="w-3.5 h-3.5" />
          <span>Reflections & Epilogue</span>
        </div>
        <p className="opacity-95 leading-relaxed">
          "{trimmed}"
        </p>
      </blockquote>
    );
  }

  // 2. Whiteboard Headers & Major Bracketed Scenes [Dream 1], WHITEBOARD — ...
  if (/^\[.+\]$/.test(trimmed) || trimmed.startsWith("WHITEBOARD —")) {
    return (
      <div 
        key={index}
        className="my-5 p-3.5 sm:p-4 rounded-xl border border-dashed font-mono text-xs sm:text-sm tracking-wide text-left transition-all select-none"
        style={{
          borderColor: `${accentColor}55`,
          backgroundColor: `${accentColor}10`
        }}
      >
        <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-[11px]" style={{ color: accentColor }}>
          <Sparkles className="w-3.5 h-3.5" />
          <span>{trimmed.replace(/^\[|\]$/g, "")}</span>
        </div>
      </div>
    );
  }

  // 3. Narrative Scene Cues in Asterisks (e.g. *This Video was playing at her funeral*, *Her mother clutched a photo frame...*)
  if (
    trimmed.startsWith("*This Video") ||
    trimmed.startsWith("*Her mother") ||
    trimmed.startsWith("*Her friends") ||
    trimmed.startsWith("*Bruno") ||
    trimmed.startsWith("*The room fell silent") ||
    trimmed.startsWith("*Chihara pauses") ||
    trimmed.startsWith("*Chihara smiles")
  ) {
    const cleanScene = trimmed.replace(/^[*]+|[*”"]+$/g, "").trim();
    return (
      <div 
        key={index}
        className="my-4 p-3.5 sm:p-4 rounded-xl border border-amber-500/25 bg-amber-500/5 text-left font-serif italic text-sm sm:text-base leading-relaxed opacity-90 select-none"
      >
        <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider font-bold text-amber-700 dark:text-amber-400 not-italic mb-1">
          <span>Scene Atmosphere</span>
        </div>
        <p>{cleanScene}</p>
      </div>
    );
  }

  // 4. Subtle Stage Directions & Breathing Pauses (e.g. *Takes a breath*, *smiles*, *Went silent for a while*)
  if (
    /^\*.*[\*”"]$/.test(trimmed) ||
    trimmed.startsWith("*Takes a") ||
    trimmed.startsWith("*Took a") ||
    trimmed.startsWith("*went silent") ||
    trimmed.startsWith("*She went") ||
    trimmed.startsWith("*Hint of") ||
    trimmed.startsWith("*A genuine") ||
    trimmed.startsWith("*smiling") ||
    trimmed.startsWith("*sniff*")
  ) {
    const cleanDirection = trimmed.replace(/^[*]+|[*”"]+$/g, "").trim();
    return (
      <div key={index} className="my-2.5 py-0.5 text-xs font-mono italic opacity-70 flex items-center gap-2 text-amber-700 dark:text-amber-300 select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500/70 shrink-0" />
        <span>{cleanDirection}</span>
      </div>
    );
  }

  // 5. Whiteboard Bullet Points
  if (trimmed.startsWith("• ") || trimmed.startsWith("- ")) {
    return (
      <div key={index} className="flex items-start gap-2.5 my-2 pl-3 font-mono text-xs sm:text-sm leading-relaxed opacity-90 text-left select-none">
        <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: accentColor }} />
        <span>{trimmed.replace(/^[•-]\s*/, "")}</span>
      </div>
    );
  }

  // 6. Character Dialogue Identification
  const dialogueRegex = /^([A-Za-z0-9_?*]{1,15})(?:\s*\(([^)]*)\))?\s*:\s*(?:\(([^)]*)\))?\s*([\s\S]*)$/;
  const dialogueMatch = trimmed.match(dialogueRegex);

  if (dialogueMatch) {
    const speaker = dialogueMatch[1].trim();
    const emotion = (dialogueMatch[2] || dialogueMatch[3] || "").trim();
    const speech = dialogueMatch[4].trim();

    const isChihara = /chihara/i.test(speaker);
    const isShiki = /shiki/i.test(speaker);
    const isMana = /mana/i.test(speaker);
    const isUncle = /uncle/i.test(speaker);

    let speakerClass = "bg-stone-500/15 border-stone-500/35 text-stone-800 dark:text-stone-300";
    if (isChihara) {
      speakerClass = "bg-cyan-500/15 border-cyan-500/35 text-cyan-800 dark:text-cyan-300 font-bold";
    } else if (isShiki) {
      speakerClass = "bg-sky-500/15 border-sky-500/35 text-sky-800 dark:text-sky-300 font-bold";
    } else if (isMana) {
      speakerClass = "bg-amber-500/15 border-amber-500/35 text-amber-800 dark:text-amber-300 font-bold";
    } else if (isUncle) {
      speakerClass = "bg-purple-500/15 border-purple-500/35 text-purple-800 dark:text-purple-300 font-bold";
    }

    return (
      <div key={index} className="my-3.5 pl-3 sm:pl-4 border-l-2 border-black/10 dark:border-white/10 text-left transition-colors select-none">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-mono uppercase tracking-wider border ${speakerClass}`}>
            {speaker}
          </span>
          {emotion && (
            <span className="text-[11px] font-mono italic opacity-75">
              ({emotion})
            </span>
          )}
        </div>
        <p className={`font-serif leading-relaxed text-sm sm:text-base opacity-95 text-left mt-1 ${textPrimary}`}>
          {speech}
        </p>
      </div>
    );
  }

  // 7. Standard Literary Prose Paragraph
  return (
    <p 
      key={index} 
      className={`leading-relaxed my-3 font-serif text-justify select-none ${textPrimary} ${
        isFirstOfChapter && index === 0 
          ? "first-letter:text-3xl first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:leading-none" 
          : ""
      }`}
    >
      {trimmed}
    </p>
  );
}

export function StoryBookReaderModal({ article, isOpen, onClose }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [readerMode, setReaderMode] = useState("spread"); // "spread" | "single"
  const [fontSize, setFontSize] = useState("normal"); // "small" | "normal" | "large"
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSummaryBanner, setShowSummaryBanner] = useState(false);

  // Original beloved themes: parchment, obsidian, sepia
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof document !== "undefined" && document.documentElement.classList.contains("dark")) {
      return "obsidian";
    }
    return "parchment";
  });

  const touchStartXRef = useRef(null);
  const modalRef = useRef(null);

  // Reset page when article changes
  useEffect(() => {
    if (isOpen) {
      setCurrentPage(0);
      setShowSummaryBanner(false);
    }
  }, [isOpen, article?.id]);

  // Global protection: block copy shortcuts (Ctrl+C, Cmd+C, Ctrl+A, Ctrl+U, Ctrl+S)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      // Disable copying and selecting all shortcuts
      if ((e.ctrlKey || e.metaKey) && ["c", "C", "a", "A", "u", "U", "s", "S"].includes(e.key)) {
        e.preventDefault();
        return;
      }

      if (e.key === "Escape") {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      } else if (e.key === "ArrowLeft") {
        handlePrevPage();
      } else if (e.key === "ArrowRight") {
        handleNextPage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentPage, readerMode, isFullscreen]);

  if (!isOpen || !article) return null;

  // Extract or synthesize pages (using intelligent auto-pagination for Google Sheets & raw text)
  const pages = article?.pages && article.pages.length > 0 
    ? article.pages 
    : autoPaginateContent(article?.title, article?.subtitle, article?.content || article?.excerpt || "");

  const totalPages = Math.max(1, pages.length);

  const handlePrevPage = () => {
    if (readerMode === "spread") {
      setCurrentPage((prev) => Math.max(0, prev - 2));
    } else {
      setCurrentPage((prev) => Math.max(0, prev - 1));
    }
  };

  const handleNextPage = () => {
    if (readerMode === "spread") {
      setCurrentPage((prev) => Math.min(totalPages - 1, prev + 2));
    } else {
      setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
    }
  };

  // Touch Swipe Handlers for mobile gestures
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartXRef.current;
    if (diff > 50) {
      handleNextPage();
    } else if (diff < -50) {
      handlePrevPage();
    }
    touchStartXRef.current = null;
  };

  // Original beloved themes: Parchment, Obsidian, Sepia
  const themeStyles = {
    parchment: {
      bg: "bg-[#fbf8f1]",
      border: "border-[#e5ded0]",
      textPrimary: "text-[#2b2723]",
      textSecondary: "text-[#6e6862]",
      pageBg: "bg-[#fdfbf7]",
      gutterShadow: "shadow-[inset_0_0_25px_rgba(110,85,60,0.08)]",
      divider: "border-[#e8e2d5]"
    },
    obsidian: {
      bg: "bg-[#0f1118]",
      border: "border-[#242938]",
      textPrimary: "text-[#e8eaf2]",
      textSecondary: "text-[#8e94a8]",
      pageBg: "bg-[#141722]",
      gutterShadow: "shadow-[inset_0_0_30px_rgba(0,0,0,0.65)]",
      divider: "border-[#252b3d]"
    },
    sepia: {
      bg: "bg-[#1c1714]",
      border: "border-[#382e28]",
      textPrimary: "text-[#ece2d6]",
      textSecondary: "text-[#a49688]",
      pageBg: "bg-[#231e1a]",
      gutterShadow: "shadow-[inset_0_0_25px_rgba(0,0,0,0.55)]",
      divider: "border-[#3a3029]"
    }
  };

  const currentTheme = themeStyles[themeMode] || themeStyles.parchment;

  // Font size classes
  const fontSizes = {
    small: "text-sm leading-relaxed",
    normal: "text-base leading-relaxed sm:text-[17px] sm:leading-[1.8]",
    large: "text-lg leading-[1.85] sm:text-xl sm:leading-[1.9]"
  };

  // Current pages to display
  const leftPageIndex = currentPage;
  const rightPageIndex = readerMode === "spread" && leftPageIndex + 1 < totalPages ? leftPageIndex + 1 : null;
  const leftPageData = pages[leftPageIndex];
  const rightPageData = rightPageIndex !== null ? pages[rightPageIndex] : null;

  const readingProgress = Math.round(((leftPageIndex + 1) / totalPages) * 100);
  const coverImageSrc = normalizeGoogleDriveImageUrl(article.coverImage);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-0 ${
        isFullscreen ? "sm:p-0" : "sm:p-2 lg:p-4"
      } bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none`}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none"
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isFullscreen) onClose();
      }}
    >
      {/* Main Hardcover Book Container — Maximized Widescreen Dimensions */}
      <div 
        ref={modalRef}
        className={`relative w-full ${
          isFullscreen 
            ? "h-screen w-screen rounded-none border-0" 
            : "max-w-[98vw] 2xl:max-w-[1720px] h-[98vh] sm:h-[94vh] rounded-[18px] sm:rounded-[28px] border"
        } ${currentTheme.border} ${currentTheme.bg} shadow-2xl flex flex-col overflow-hidden transition-all duration-300 select-none`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onCopy={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* Top Reading Control Ribbon */}
        <header className={`px-4 sm:px-6 lg:px-8 py-3 border-b ${currentTheme.divider} flex items-center justify-between gap-3 shrink-0 ${currentTheme.bg} z-20 select-none`}>
          
          {/* Left: Book Meta Info */}
          <div className="flex items-center gap-3 min-w-0">
            <span 
              className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold border shrink-0"
              style={{
                backgroundColor: `${article.accentColor}18`,
                borderColor: `${article.accentColor}40`,
                color: article.accentColor
              }}
            >
              {article.category || article.tag}
            </span>

            <div className="min-w-0">
              <h2 className={`font-serif text-sm sm:text-base lg:text-lg font-medium truncate ${currentTheme.textPrimary}`}>
                {article.title}
              </h2>
              <p className={`text-[11px] font-mono truncate hidden sm:block ${currentTheme.textSecondary}`}>
                By Joy Karmakar · {article.date} · {article.readTime}
              </p>
            </div>
          </div>

          {/* Right: Reader Options (Fullscreen, Mode, Font, Theme, Close) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Summary Lyric Preview Toggle */}
            <button
              onClick={() => setShowSummaryBanner((prev) => !prev)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 border transition-all cursor-pointer ${
                showSummaryBanner 
                  ? "bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/40" 
                  : `${currentTheme.textSecondary} hover:${currentTheme.textPrimary} border-transparent`
              }`}
              title="Toggle Playing Lyrics Summary"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Summary Beats</span>
            </button>

            {/* Reading Mode Switcher (Spread vs Single) - Desktop */}
            <div className="hidden lg:flex items-center p-0.5 rounded-lg border border-black/10 dark:border-white/10">
              <button
                onClick={() => setReaderMode("single")}
                className={`p-1.5 rounded-md transition-all cursor-pointer ${
                  readerMode === "single" ? "bg-black/10 dark:bg-white/20 shadow-sm" : "opacity-60 hover:opacity-100"
                }`}
                title="Single Page View"
              >
                <FileText className={`w-4 h-4 ${currentTheme.textPrimary}`} />
              </button>
              <button
                onClick={() => setReaderMode("spread")}
                className={`p-1.5 rounded-md transition-all cursor-pointer ${
                  readerMode === "spread" ? "bg-black/10 dark:bg-white/20 shadow-sm" : "opacity-60 hover:opacity-100"
                }`}
                title="Two-Page Book Spread View"
              >
                <Columns2 className={`w-4 h-4 ${currentTheme.textPrimary}`} />
              </button>
            </div>

            {/* Font Size Adjuster */}
            <div className="flex items-center p-0.5 rounded-lg border border-black/10 dark:border-white/10">
              <button
                onClick={() => setFontSize("small")}
                className={`px-2 py-0.5 rounded text-xs font-serif transition-all cursor-pointer ${
                  fontSize === "small" ? "bg-black/10 dark:bg-white/20 font-bold" : "opacity-60 hover:opacity-100"
                }`}
                title="Small text"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize("normal")}
                className={`px-2 py-0.5 rounded text-xs font-serif transition-all cursor-pointer ${
                  fontSize === "normal" ? "bg-black/10 dark:bg-white/20 font-bold" : "opacity-60 hover:opacity-100"
                }`}
                title="Default text"
              >
                A
              </button>
              <button
                onClick={() => setFontSize("large")}
                className={`px-2 py-0.5 rounded text-xs font-serif transition-all cursor-pointer ${
                  fontSize === "large" ? "bg-black/10 dark:bg-white/20 font-bold" : "opacity-60 hover:opacity-100"
                }`}
                title="Large text"
              >
                A+
              </button>
            </div>

            {/* Theme Selector (Parchment, Obsidian, Sepia) */}
            <div className="flex items-center gap-1 pl-1">
              <button
                onClick={() => setThemeMode("parchment")}
                className={`w-5 h-5 rounded-full border transition-all cursor-pointer ${
                  themeMode === "parchment" ? "ring-2 ring-amber-600 scale-110" : "opacity-60 hover:opacity-100"
                } bg-[#fbf8f1] border-[#d8d0c0]`}
                title="Parchment Paper"
              />
              <button
                onClick={() => setThemeMode("obsidian")}
                className={`w-5 h-5 rounded-full border transition-all cursor-pointer ${
                  themeMode === "obsidian" ? "ring-2 ring-sky-400 scale-110" : "opacity-60 hover:opacity-100"
                } bg-[#0f1118] border-[#31374a]`}
                title="Obsidian Night"
              />
              <button
                onClick={() => setThemeMode("sepia")}
                className={`w-5 h-5 rounded-full border transition-all cursor-pointer ${
                  themeMode === "sepia" ? "ring-2 ring-amber-400 scale-110" : "opacity-60 hover:opacity-100"
                } bg-[#231e1a] border-[#4a3e35]`}
                title="Warm Sepia"
              />
            </div>

            {/* Fullscreen Toggle (Maximize all space) */}
            <button
              onClick={() => setIsFullscreen((prev) => !prev)}
              className={`p-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer ${currentTheme.textSecondary}`}
              title={isFullscreen ? "Exit Fullscreen" : "Maximize Space (Fullscreen)"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className={`p-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-all cursor-pointer ${currentTheme.textPrimary}`}
              title="Close reader (Esc)"
            >
              <X className="w-4 h-4" />
            </button>

          </div>
        </header>

        {/* Reading Progress Line */}
        <div className="w-full h-1 bg-black/5 dark:bg-white/5 relative shrink-0">
          <div 
            className="h-full transition-all duration-300 ease-out"
            style={{ 
              width: `${readingProgress}%`,
              backgroundColor: article.accentColor || "#d97746"
            }}
          />
        </div>

        {/* Optional Streamed Lyrics / Narrative Summary Banner */}
        {showSummaryBanner && (
          <div className="px-6 py-3 bg-amber-500/10 dark:bg-amber-400/10 border-b border-amber-500/20 text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0 animate-in slide-in-from-top duration-200 select-none">
            <div className="flex items-center gap-2">
              <span className="font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                ♫ STREAMED AUDIO SUMMARY BEATS:
              </span>
              <span className="text-[#5e5953] dark:text-[#a9a5b8]">
                {parseLyrics(article.lyrics, article.excerpt).length} narrative lines streamed during audio playback
              </span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto text-[11px] opacity-85">
              <span>{article.excerpt}</span>
            </div>
          </div>
        )}

        {/* Central Book Body / Spread Area — Fills Viewport */}
        <div className="flex-1 overflow-hidden relative flex select-none">
          
          {/* Left Page (Always visible) */}
          <div className={`flex-1 flex flex-col overflow-y-auto px-6 sm:px-10 lg:px-14 xl:px-20 py-6 sm:py-8 lg:py-10 ${currentTheme.pageBg} ${currentTheme.gutterShadow} border-r ${currentTheme.divider} select-none`}>
            
            {/* Page Header Strip */}
            <div className={`pb-3 mb-4 border-b ${currentTheme.divider} flex items-center justify-between text-xs font-mono ${currentTheme.textSecondary} select-none`}>
              <span className="uppercase tracking-widest font-semibold text-[11px]">
                {leftPageData?.chapter || article.title}
              </span>
              <span>Page {leftPageIndex + 1} of {totalPages}</span>
            </div>

            {/* Page Hero Image if on Page 1 */}
            {leftPageIndex === 0 && coverImageSrc && (
              <div className="relative w-full h-44 sm:h-56 lg:h-64 rounded-2xl overflow-hidden mb-6 border border-black/10 dark:border-white/10 shadow-md shrink-0 select-none">
                <img
                  src={coverImageSrc}
                  alt={article.title}
                  className="w-full h-full object-cover pointer-events-none"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-5 right-5 text-white pointer-events-none">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold mb-1.5 bg-white/20 backdrop-blur-md">
                    {article.category || article.tag}
                  </span>
                  <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight drop-shadow">
                    {article.title}
                  </h1>
                  <p className="text-xs sm:text-sm font-sans text-white/80 mt-1 line-clamp-2">
                    {article.subtitle || article.excerpt}
                  </p>
                </div>
              </div>
            )}

            {/* Page Content Paragraphs */}
            <div className={`flex-1 ${currentTheme.textPrimary} ${fontSizes[fontSize]} select-none`}>
              {leftPageData?.content?.map((paragraph, pIdx) => 
                renderFormattedStoryParagraph(paragraph, pIdx, leftPageIndex === 0, article.accentColor, currentTheme.textPrimary)
              )}
            </div>

            {/* Page Footer Number */}
            <div className={`pt-4 mt-6 border-t ${currentTheme.divider} flex items-center justify-between text-xs font-mono ${currentTheme.textSecondary} select-none`}>
              <span>Joy Karmakar · Field Archive</span>
              <span className="font-bold">— {leftPageIndex + 1} —</span>
            </div>
          </div>

          {/* Right Page (Visible when readerMode === "spread" on wide screens) */}
          {readerMode === "spread" && (
            <div className={`hidden lg:flex flex-1 flex-col overflow-y-auto px-6 sm:px-10 lg:px-14 xl:px-20 py-6 sm:py-8 lg:py-10 ${currentTheme.pageBg} ${currentTheme.gutterShadow} select-none`}>
              {rightPageData ? (
                <>
                  {/* Page Header Strip */}
                  <div className={`pb-3 mb-4 border-b ${currentTheme.divider} flex items-center justify-between text-xs font-mono ${currentTheme.textSecondary} select-none`}>
                    <span className="uppercase tracking-widest font-semibold text-[11px]">
                      {rightPageData.chapter || article.title}
                    </span>
                    <span>Page {rightPageIndex + 1} of {totalPages}</span>
                  </div>

                  {/* Page Content Paragraphs */}
                  <div className={`flex-1 ${currentTheme.textPrimary} ${fontSizes[fontSize]} select-none`}>
                    {rightPageData.content?.map((paragraph, pIdx) => 
                      renderFormattedStoryParagraph(paragraph, pIdx, false, article.accentColor, currentTheme.textPrimary)
                    )}
                  </div>

                  {/* Page Footer Number */}
                  <div className={`pt-4 mt-6 border-t ${currentTheme.divider} flex items-center justify-between text-xs font-mono ${currentTheme.textSecondary} select-none`}>
                    <span>{article.category || "Story Chronicle"}</span>
                    <span className="font-bold">— {rightPageIndex + 1} —</span>
                  </div>
                </>
              ) : (
                /* Book Endplate when story ends on an odd page */
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-60 select-none">
                  <BookOpen className="w-12 h-12 mb-3 stroke-1" style={{ color: article.accentColor }} />
                  <p className="font-serif italic text-base">Finis</p>
                  <p className="text-xs font-mono mt-1">End of chronicle · {article.title}</p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Bottom Page Flipping & Navigation Footer */}
        <footer className={`px-4 sm:px-6 lg:px-8 py-3 border-t ${currentTheme.divider} flex items-center justify-between gap-3 shrink-0 ${currentTheme.bg} z-20 select-none`}>
          
          {/* Previous Page Button */}
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-mono transition-all cursor-pointer select-none ${
              currentPage === 0
                ? "opacity-30 cursor-not-allowed border-transparent"
                : `hover:bg-black/5 dark:hover:bg-white/10 ${currentTheme.textPrimary} border-black/10 dark:border-white/10 shadow-sm active:scale-95`
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous Page</span>
            <span className="sm:hidden">Prev</span>
          </button>

          {/* Quick Page Jump Chips / Indicator */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-[200px] sm:max-w-lg lg:max-w-2xl no-scrollbar py-1 select-none">
            {pages.map((p, idx) => {
              const isSelected = 
                idx === leftPageIndex || 
                (readerMode === "spread" && idx === rightPageIndex);

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className={`min-w-7 h-7 sm:min-w-8 sm:h-8 px-1 rounded-lg text-xs font-mono flex items-center justify-center transition-all cursor-pointer select-none ${
                    isSelected
                      ? "bg-amber-500 text-white font-bold shadow-md scale-105"
                      : `${currentTheme.textSecondary} hover:bg-black/5 dark:hover:bg-white/10`
                  }`}
                  style={{
                    backgroundColor: isSelected ? article.accentColor || "#d97746" : undefined
                  }}
                  title={`Jump to Page ${idx + 1}: ${p.chapter}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Next Page Button */}
          <button
            onClick={handleNextPage}
            disabled={
              readerMode === "spread" 
                ? (rightPageIndex !== null ? rightPageIndex >= totalPages - 1 : leftPageIndex >= totalPages - 1)
                : leftPageIndex >= totalPages - 1
            }
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-mono transition-all cursor-pointer select-none ${
              (readerMode === "spread" 
                ? (rightPageIndex !== null ? rightPageIndex >= totalPages - 1 : leftPageIndex >= totalPages - 1)
                : leftPageIndex >= totalPages - 1)
                ? "opacity-30 cursor-not-allowed border-transparent"
                : `hover:bg-black/5 dark:hover:bg-white/10 ${currentTheme.textPrimary} border-black/10 dark:border-white/10 shadow-sm active:scale-95`
            }`}
          >
            <span className="hidden sm:inline">Next Page</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>

        </footer>

      </div>
    </div>
  );
}
export default StoryBookReaderModal;
