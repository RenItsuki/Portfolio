import React, { useState, useEffect, useRef } from "react";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Columns2, 
  FileText, 
  Type, 
  Palette, 
  Sparkles, 
  Clock, 
  Calendar, 
  Share2, 
  Check, 
  Bookmark,
  Volume2
} from "lucide-react";
import { autoPaginateContent, parseLyrics } from "../utils/googleDrive";

/**
 * Parses and formats story content with literary typography:
 * - Highlights character dialogue cues (Shiki, Mana, Uncle, etc.)
 * - Styles scene markers and whiteboard notes ([Dream 1], WHITEBOARD, etc.)
 * - Formats standard literary paragraphs with drop caps
 */
function renderFormattedStoryParagraph(text, index, isFirstOfChapter = false, accentColor = "#d97746") {
  if (!text) return null;
  const trimmed = text.trim();

  // 1. Scene Markers & Flashback Headers e.g. [Dream 1], [Scene shifts into flashback]
  if (/^\[.+\]$/.test(trimmed) || trimmed.startsWith("WHITEBOARD —")) {
    return (
      <div 
        key={index}
        className="my-5 p-3.5 sm:p-4 rounded-xl border border-dashed font-mono text-xs sm:text-sm tracking-wide text-left transition-all"
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

  // 2. Whiteboard bullet lists
  if (trimmed.startsWith("• ") || trimmed.startsWith("- ")) {
    return (
      <div key={index} className="flex items-start gap-2.5 my-1.5 pl-3 font-mono text-xs sm:text-sm leading-relaxed opacity-90">
        <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: accentColor }} />
        <span>{trimmed.replace(/^[•-]\s*/, "")}</span>
      </div>
    );
  }

  // 3. Dialogue Identification: Character Name (emotion/action): Dialogue
  const dialogueMatch = trimmed.match(/^([A-Za-z0-9_?]{1,12}(?:\s*\([^)]*\))?)\s*:\s*([\s\S]+)$/);
  if (dialogueMatch) {
    const rawSpeaker = dialogueMatch[1].trim();
    const speech = dialogueMatch[2].trim();

    // Determine speaker theme
    const isShiki = /shiki/i.test(rawSpeaker);
    const isMana = /mana/i.test(rawSpeaker);
    const isUncle = /uncle/i.test(rawSpeaker);

    let speakerBg = "bg-stone-500/15 border-stone-500/30 text-stone-700 dark:text-stone-300";
    if (isShiki) speakerBg = "bg-sky-500/15 border-sky-500/35 text-sky-700 dark:text-sky-300";
    else if (isMana) speakerBg = "bg-amber-500/15 border-amber-500/35 text-amber-700 dark:text-amber-300";
    else if (isUncle) speakerBg = "bg-purple-500/15 border-purple-500/35 text-purple-700 dark:text-purple-300";

    return (
      <div key={index} className="my-3.5 pl-2 sm:pl-3 border-l-2 border-black/10 dark:border-white/10 text-left">
        <div className="flex items-center gap-2 mb-1">
          <span className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-mono font-semibold uppercase tracking-wider border ${speakerBg}`}>
            {rawSpeaker}
          </span>
        </div>
        <p className="font-serif leading-relaxed text-sm sm:text-base opacity-95">
          {speech}
        </p>
      </div>
    );
  }

  // 4. Standard literary paragraph
  return (
    <p 
      key={index} 
      className={`leading-relaxed my-3 font-serif text-justify ${
        isFirstOfChapter && index === 0 ? "first-letter:text-3xl first-letter:font-bold first-letter:mr-1 first-letter:float-left" : ""
      }`}
    >
      {trimmed}
    </p>
  );
}

export function StoryBookReaderModal({ article, isOpen, onClose }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [readerMode, setReaderMode] = useState("spread"); // "spread" (2-page on desktop) | "single" (1-page)
  const [fontSize, setFontSize] = useState("normal"); // "small" | "normal" | "large"
  const [themeMode, setThemeMode] = useState("parchment"); // "parchment" | "obsidian" | "sepia"
  const [copied, setCopied] = useState(false);
  const [showSummaryBanner, setShowSummaryBanner] = useState(false);

  const touchStartXRef = useRef(null);
  const modalRef = useRef(null);

  // Reset to page 0 whenever article changes
  useEffect(() => {
    setCurrentPage(0);
    setShowSummaryBanner(false);
  }, [article?.id]);

  // Extract or synthesize pages (using intelligent auto-pagination for Google Sheets & raw text)
  const pages = article?.pages && article.pages.length > 0 
    ? article.pages 
    : autoPaginateContent(article?.title, article?.subtitle, article?.content || article?.excerpt || "");

  const totalPages = pages.length;

  // Keyboard navigation for turning pages
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrevPage();
      } else if (e.key === "ArrowRight") {
        handleNextPage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentPage, totalPages, readerMode]);

  if (!isOpen || !article) return null;

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
      handleNextPage(); // Swipe Left -> Next
    } else if (diff < -50) {
      handlePrevPage(); // Swipe Right -> Prev
    }
    touchStartXRef.current = null;
  };

  const handleCopyLink = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Theme styling definitions
  const themeStyles = {
    parchment: {
      bg: "bg-[#fbf8f1]",
      border: "border-[#e5ded0]",
      textPrimary: "text-[#2b2723]",
      textSecondary: "text-[#6e6862]",
      pageBg: "bg-[#fdfbf7]",
      gutterShadow: "shadow-[inset_0_0_25px_rgba(110,85,60,0.08)]",
      divider: "border-[#e8e2d5]",
      accentBadge: "bg-[#8b5a2b]/10 text-[#8b5a2b] border-[#8b5a2b]/20"
    },
    obsidian: {
      bg: "bg-[#0f1118]",
      border: "border-[#242938]",
      textPrimary: "text-[#e8eaf2]",
      textSecondary: "text-[#8e94a8]",
      pageBg: "bg-[#141722]",
      gutterShadow: "shadow-[inset_0_0_30px_rgba(0,0,0,0.65)]",
      divider: "border-[#252b3d]",
      accentBadge: "bg-[#38bdf8]/15 text-[#38bdf8] border-[#38bdf8]/30"
    },
    sepia: {
      bg: "bg-[#1c1714]",
      border: "border-[#382e28]",
      textPrimary: "text-[#ece2d6]",
      textSecondary: "text-[#a49688]",
      pageBg: "bg-[#231e1a]",
      gutterShadow: "shadow-[inset_0_0_25px_rgba(0,0,0,0.55)]",
      divider: "border-[#3a3029]",
      accentBadge: "bg-[#e5a953]/15 text-[#e5a953] border-[#e5a953]/30"
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 select-text"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Main Hardcover Book Container */}
      <div 
        ref={modalRef}
        className={`relative w-full max-w-6xl h-[94vh] sm:h-[90vh] rounded-[24px] sm:rounded-[32px] border ${currentTheme.border} ${currentTheme.bg} shadow-2xl flex flex-col overflow-hidden transition-colors duration-300`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Reading Control Ribbon */}
        <header className={`px-4 sm:px-6 py-3 border-b ${currentTheme.divider} flex items-center justify-between gap-3 shrink-0 ${currentTheme.bg} z-20`}>
          
          {/* Left: Book Meta Info */}
          <div className="flex items-center gap-2.5 min-w-0">
            <span 
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold border shrink-0`}
              style={{
                backgroundColor: `${article.accentColor}18`,
                borderColor: `${article.accentColor}40`,
                color: article.accentColor
              }}
            >
              {article.category || article.tag}
            </span>

            <div className="min-w-0">
              <h2 className={`font-serif text-sm sm:text-base font-medium truncate ${currentTheme.textPrimary}`}>
                {article.title}
              </h2>
              <p className={`text-[11px] font-mono truncate hidden sm:block ${currentTheme.textSecondary}`}>
                By Joy Karmakar · {article.date} · {article.readTime}
              </p>
            </div>
          </div>

          {/* Right: Reader Options (Font, Theme, Mode, Close) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Summary Lyric Preview Toggle */}
            <button
              onClick={() => setShowSummaryBanner((prev) => !prev)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 border transition-all cursor-pointer ${
                showSummaryBanner 
                  ? "bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/40" 
                  : `${currentTheme.textSecondary} hover:${currentTheme.textPrimary} border-transparent`
              }`}
              title="Toggle Playing Lyrics Summary"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Summary Beats</span>
            </button>

            {/* Reading Mode Switcher (Spread vs Single) - Desktop only */}
            <div className="hidden lg:flex items-center p-0.5 rounded-lg border border-black/10 dark:border-white/10">
              <button
                onClick={() => setReaderMode("single")}
                className={`p-1.5 rounded-md transition-all cursor-pointer ${
                  readerMode === "single" ? "bg-black/10 dark:bg-white/20 shadow-sm" : "opacity-60 hover:opacity-100"
                }`}
                title="Single Page View"
              >
                <FileText className={`w-3.5 h-3.5 ${currentTheme.textPrimary}`} />
              </button>
              <button
                onClick={() => setReaderMode("spread")}
                className={`p-1.5 rounded-md transition-all cursor-pointer ${
                  readerMode === "spread" ? "bg-black/10 dark:bg-white/20 shadow-sm" : "opacity-60 hover:opacity-100"
                }`}
                title="Two-Page Book Spread View"
              >
                <Columns2 className={`w-3.5 h-3.5 ${currentTheme.textPrimary}`} />
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

            {/* Copy Share Link */}
            <button
              onClick={handleCopyLink}
              className={`p-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer ${currentTheme.textSecondary}`}
              title="Share story"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Close Modal Button */}
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
          <div className="px-6 py-3 bg-amber-500/10 dark:bg-amber-400/10 border-b border-amber-500/20 text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0 animate-in slide-in-from-top duration-200">
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

        {/* Central Book Body / Spread Area */}
        <div className="flex-1 overflow-hidden relative flex">
          
          {/* Left Page (Always visible) */}
          <div className={`flex-1 flex flex-col overflow-y-auto px-6 sm:px-10 lg:px-14 py-6 sm:py-8 ${currentTheme.pageBg} ${currentTheme.gutterShadow} border-r ${currentTheme.divider}`}>
            
            {/* Page Header Strip */}
            <div className={`pb-3 mb-4 border-b ${currentTheme.divider} flex items-center justify-between text-xs font-mono ${currentTheme.textSecondary}`}>
              <span className="uppercase tracking-widest font-semibold text-[11px]">
                {leftPageData?.chapter || article.title}
              </span>
              <span>Page {leftPageIndex + 1} of {totalPages}</span>
            </div>

            {/* Page Hero Image if on Page 1 */}
            {leftPageIndex === 0 && article.coverImage && (
              <div className="relative w-full h-40 sm:h-52 rounded-2xl overflow-hidden mb-6 border border-black/10 dark:border-white/10 shadow-md shrink-0">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h1 className="font-serif text-lg sm:text-2xl font-semibold leading-tight drop-shadow">
                    {article.title}
                  </h1>
                  <p className="text-xs font-mono text-white/80 mt-0.5 truncate">
                    {article.subtitle || article.excerpt}
                  </p>
                </div>
              </div>
            )}

            {/* Page Content Paragraphs */}
            <div className={`flex-1 ${currentTheme.textPrimary} ${fontSizes[fontSize]}`}>
              {leftPageData?.content?.map((paragraph, pIdx) => 
                renderFormattedStoryParagraph(paragraph, pIdx, leftPageIndex === 0, article.accentColor)
              )}
            </div>

            {/* Page Footer Number */}
            <div className={`pt-4 mt-6 border-t ${currentTheme.divider} flex items-center justify-between text-xs font-mono ${currentTheme.textSecondary}`}>
              <span>Joy Karmakar · Field Archive</span>
              <span className="font-bold">— {leftPageIndex + 1} —</span>
            </div>
          </div>

          {/* Right Page (Visible when readerMode === "spread" on wide screens) */}
          {readerMode === "spread" && (
            <div className={`hidden lg:flex flex-1 flex-col overflow-y-auto px-6 sm:px-10 lg:px-14 py-6 sm:py-8 ${currentTheme.pageBg} ${currentTheme.gutterShadow}`}>
              {rightPageData ? (
                <>
                  {/* Page Header Strip */}
                  <div className={`pb-3 mb-4 border-b ${currentTheme.divider} flex items-center justify-between text-xs font-mono ${currentTheme.textSecondary}`}>
                    <span className="uppercase tracking-widest font-semibold text-[11px]">
                      {rightPageData.chapter || article.title}
                    </span>
                    <span>Page {rightPageIndex + 1} of {totalPages}</span>
                  </div>

                  {/* Page Content Paragraphs */}
                  <div className={`flex-1 ${currentTheme.textPrimary} ${fontSizes[fontSize]}`}>
                    {rightPageData.content?.map((paragraph, pIdx) => 
                      renderFormattedStoryParagraph(paragraph, pIdx, false, article.accentColor)
                    )}
                  </div>

                  {/* Page Footer Number */}
                  <div className={`pt-4 mt-6 border-t ${currentTheme.divider} flex items-center justify-between text-xs font-mono ${currentTheme.textSecondary}`}>
                    <span>{article.category || "Story Chronicle"}</span>
                    <span className="font-bold">— {rightPageIndex + 1} —</span>
                  </div>
                </>
              ) : (
                /* Book Endplate when story ends on an odd page */
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-60">
                  <BookOpen className="w-12 h-12 mb-3 stroke-1" style={{ color: article.accentColor }} />
                  <p className="font-serif italic text-base">Finis</p>
                  <p className="text-xs font-mono mt-1">End of chronicle · {article.title}</p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Bottom Page Flipping & Navigation Footer */}
        <footer className={`px-4 sm:px-6 py-3 border-t ${currentTheme.divider} flex items-center justify-between gap-3 shrink-0 ${currentTheme.bg} z-20`}>
          
          {/* Previous Page Button */}
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-mono transition-all cursor-pointer ${
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
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-[200px] sm:max-w-md no-scrollbar py-1">
            {pages.map((p, idx) => {
              const isSelected = 
                idx === leftPageIndex || 
                (readerMode === "spread" && idx === rightPageIndex);

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-mono flex items-center justify-center transition-all cursor-pointer ${
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
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-mono transition-all cursor-pointer ${
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
