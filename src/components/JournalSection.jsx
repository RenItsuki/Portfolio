import React, { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  MessageSquare, 
  ListMusic, 
  MoreHorizontal, 
  Airplay, 
  Disc3, 
  Sparkles, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  BookOpen, 
  Feather, 
  BookMarked, 
  Compass, 
  SlidersHorizontal,
  FileSpreadsheet,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  X,
  HelpCircle
} from "lucide-react";
import { essays, GOOGLE_SHEETS_STORIES_URL } from "../data/journalData";
import { StoryBookReaderModal } from "./StoryBookReaderModal";
import { 
  fetchStoriesFromGoogleSheet, 
  normalizeGoogleDriveImageUrl,
  extractGoogleSheetId,
  parseLyrics
} from "../utils/googleDrive";

// Synthesize tactical acoustic audio feedback for player actions
const playAudioFeedback = (type = "click") => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "play") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.14);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } else if (type === "switch") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(540, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === "tab") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(620, ctx.currentTime);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    }
  } catch (e) {
    // Graceful fallback if AudioContext is restricted
  }
};

export function JournalSection({ onReadArticle }) {
  // Master stories state (starts with built-in essays, updates with Google Sheet if configured)
  const [storiesList, setStoriesList] = useState(essays);
  const [isLoadingSheet, setIsLoadingSheet] = useState(false);
  const [sheetSyncStatus, setSheetSyncStatus] = useState("idle"); // "idle" | "syncing" | "success" | "error"
  const [sheetErrorMessage, setSheetErrorMessage] = useState("");
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  
  // Custom Google Sheet URL state (can be saved in localStorage or from code config)
  const [customSheetUrl, setCustomSheetUrl] = useState(() => {
    try {
      return localStorage.getItem("joy_custom_sheet_url") || GOOGLE_SHEETS_STORIES_URL || "";
    } catch (e) {
      return GOOGLE_SHEETS_STORIES_URL || "";
    }
  });

  // Category filter state: "all" | "shortstory" | "longstory" | "poem" | "essay"
  const [filter, setFilter] = useState("all");

  // Load from Google Sheet on mount if URL is provided
  useEffect(() => {
    const targetUrl = customSheetUrl || GOOGLE_SHEETS_STORIES_URL;
    if (targetUrl && targetUrl.trim().length > 0) {
      syncGoogleSheetStories(targetUrl);
    }
  }, []);

  const syncGoogleSheetStories = async (urlToFetch) => {
    if (!urlToFetch || !urlToFetch.trim()) return;
    setIsLoadingSheet(true);
    setSheetSyncStatus("syncing");
    setSheetErrorMessage("");

    try {
      const fetched = await fetchStoriesFromGoogleSheet(urlToFetch);
      if (fetched && fetched.length > 0) {
        setStoriesList(fetched);
        setSheetSyncStatus("success");
        try {
          localStorage.setItem("joy_custom_sheet_url", urlToFetch.trim());
        } catch (e) {}
      } else {
        setSheetSyncStatus("error");
        setSheetErrorMessage("No rows found in this sheet. Ensure row 1 has headers like Title, Content, CoverImage.");
      }
    } catch (err) {
      console.warn("Could not load Google Sheet stories:", err);
      setSheetSyncStatus("error");
      setSheetErrorMessage(err.message || "Failed to fetch from Google Sheet");
    } finally {
      setIsLoadingSheet(false);
    }
  };

  // Filter items according to user request
  const filteredEssays = storiesList.filter((item) => {
    if (filter === "all") return true;
    if (filter === "shortstory") return item.type === "shortstory";
    if (filter === "longstory") return item.type === "longstory";
    if (filter === "poem") return item.type === "poem";
    if (filter === "essay") return item.type === "essay";
    return true;
  });

  // Calculate counts for tab badges
  const allCount = storiesList.length;
  const shortCount = storiesList.filter((e) => e.type === "shortstory").length;
  const longCount = storiesList.filter((e) => e.type === "longstory").length;
  const poemCount = storiesList.filter((e) => e.type === "poem").length;
  const essayCount = storiesList.filter((e) => e.type === "essay").length;

  // Active coverflow index
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lyricIndex, setLyricIndex] = useState(0);
  const [progress, setProgress] = useState(20);
  const [isMuted, setIsMuted] = useState(false);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const activeEssay = filteredEssays[activeIndex] || filteredEssays[0] || storiesList[0];
  
  // Concise summary lyrics for streaming playback (supports arrays, Alt+Enter, and pipes)
  const lyrics = parseLyrics(activeEssay?.lyrics, activeEssay?.excerpt || activeEssay?.title);

  const touchStartXRef = useRef(null);

  // Resize listener for responsive 3D spacing
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // When filter changes, reset activeIndex, lyricIndex, and progress
  const handleFilterChange = (newFilter) => {
    playAudioFeedback("tab");
    setFilter(newFilter);
    setActiveIndex(0);
    setLyricIndex(0);
    setProgress(0);
  };

  // When active index changes, reset lyric index to 0
  useEffect(() => {
    setLyricIndex(0);
    setProgress(0);
  }, [activeIndex]);

  // Stream concise summary lyrics slowly line-by-line while playing
  useEffect(() => {
    let lyricsTimer;
    let progressTimer;

    if (isPlaying) {
      lyricsTimer = setInterval(() => {
        setLyricIndex((prev) => {
          if (prev >= lyrics.length - 1) {
            setIsPlaying(false);
            setProgress(100);
            return prev;
          }
          return prev + 1;
        });
      }, 3400);

      progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 0.4;
        });
      }, 250);
    }

    return () => {
      clearInterval(lyricsTimer);
      clearInterval(progressTimer);
    };
  }, [isPlaying, lyrics.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isReaderOpen || isSyncModalOpen) return;
      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, isPlaying, isReaderOpen, isSyncModalOpen, filteredEssays.length]);

  const handlePrev = () => {
    if (filteredEssays.length <= 1) return;
    playAudioFeedback("switch");
    setActiveIndex((prev) => (prev - 1 + filteredEssays.length) % filteredEssays.length);
  };

  const handleNext = () => {
    if (filteredEssays.length <= 1) return;
    playAudioFeedback("switch");
    setActiveIndex((prev) => (prev + 1) % filteredEssays.length);
  };

  const togglePlay = () => {
    playAudioFeedback("play");
    if (!isPlaying && (progress >= 100 || lyricIndex >= lyrics.length - 1)) {
      setProgress(0);
      setLyricIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  // Open high-end book reader modal when clicked
  const handleBoxClick = (index) => {
    if (index === activeIndex) {
      setIsReaderOpen(true);
      if (onReadArticle) onReadArticle(activeEssay);
      playAudioFeedback("click");
    } else {
      playAudioFeedback("switch");
      setActiveIndex(index);
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
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartXRef.current = null;
  };

  // Calculate 4 visible lines of summary lyrics for normal view
  const getVisible4Lines = (currentIdx, totalLyrics) => {
    const total = totalLyrics.length;
    let start = currentIdx <= 1 ? 0 : currentIdx >= total - 3 ? Math.max(0, total - 4) : currentIdx - 1;
    return [0, 1, 2, 3].map((offset) => {
      const idx = start + offset;
      return {
        lineIndex: idx,
        text: totalLyrics[idx] || "",
        isActive: idx === currentIdx
      };
    });
  };

  // Responsive 3D Transform calculations matching Apple Coverflow geometry
  const getCardTransform = (index, total) => {
    if (total <= 1) {
      return {
        transform: `translateX(0px) translateZ(80px) rotateY(0deg) scale(${windowWidth < 640 ? 1.0 : 1.05})`,
        zIndex: 40,
        opacity: 1,
        filter: "brightness(1) drop-shadow(0 30px 50px rgba(0,0,0,0.65))",
        pointerEvents: "auto"
      };
    }

    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const isMobile = windowWidth < 640;
    const isTablet = windowWidth >= 640 && windowWidth < 1024;

    const spacing1 = isMobile ? 100 : isTablet ? 175 : 240;
    const spacing2 = isMobile ? 170 : isTablet ? 305 : 420;

    if (diff === 0) {
      return {
        transform: `translateX(0px) translateZ(80px) rotateY(0deg) scale(${isMobile ? 1.0 : 1.05})`,
        zIndex: 40,
        opacity: 1,
        filter: "brightness(1) drop-shadow(0 30px 50px rgba(0,0,0,0.65))",
        pointerEvents: "auto"
      };
    } else if (diff === -1) {
      return {
        transform: `translateX(-${spacing1}px) translateZ(0px) rotateY(26deg) scale(${isMobile ? 0.82 : 0.88})`,
        zIndex: 30,
        opacity: 0.90,
        filter: "brightness(0.82) drop-shadow(0 20px 35px rgba(0,0,0,0.45))",
        pointerEvents: "auto"
      };
    } else if (diff === 1) {
      return {
        transform: `translateX(${spacing1}px) translateZ(0px) rotateY(-26deg) scale(${isMobile ? 0.82 : 0.88})`,
        zIndex: 30,
        opacity: 0.90,
        filter: "brightness(0.82) drop-shadow(0 20px 35px rgba(0,0,0,0.45))",
        pointerEvents: "auto"
      };
    } else if (diff === -2) {
      return {
        transform: `translateX(-${spacing2}px) translateZ(-80px) rotateY(42deg) scale(${isMobile ? 0.68 : 0.76})`,
        zIndex: 20,
        opacity: isMobile ? 0.45 : 0.70,
        filter: "brightness(0.7) drop-shadow(0 15px 25px rgba(0,0,0,0.35))",
        pointerEvents: "auto"
      };
    } else if (diff === 2) {
      return {
        transform: `translateX(${spacing2}px) translateZ(-80px) rotateY(-42deg) scale(${isMobile ? 0.68 : 0.76})`,
        zIndex: 20,
        opacity: isMobile ? 0.45 : 0.70,
        filter: "brightness(0.7) drop-shadow(0 15px 25px rgba(0,0,0,0.35))",
        pointerEvents: "auto"
      };
    } else {
      return {
        transform: `translateX(${diff > 0 ? 500 : -500}px) scale(0.5)`,
        zIndex: 0,
        opacity: 0,
        pointerEvents: "none"
      };
    }
  };

  return (
    <section 
      id="journal" 
      className="py-24 sm:py-32 border-t border-[#dbd2c4] dark:border-[#38374d] relative overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#b18a79] dark:text-[#e5c07b]">
              <Disc3 className="w-4 h-4 animate-spin [animation-duration:8s]" />
              <span>STORIES, POEMS & CHRONICLES · 3D COVERFLOW</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#202020] dark:text-[#f3f2f7] tracking-tight">
              Literary Field & Audio Lyrics
            </h2>
            
            <p className="text-sm sm:text-base text-[#5e5953] dark:text-[#a9a5b8] max-w-2xl font-sans font-light leading-relaxed">
              Curated short stories, serials, and poems. Press <span className="font-semibold text-[#202020] dark:text-white">Play</span> to stream concise <span className="font-semibold text-[#202020] dark:text-white">summary lyrics</span>, or click any card to open the <span className="font-semibold text-[#202020] dark:text-white">paginated book reader</span>.
            </p>
          </div>

          {/* Right Header Badges: Google Sheet Connect & Reader Pill */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Google Sheets Connect & Sync Pill */}
            <button
              onClick={() => setIsSyncModalOpen(true)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono transition-all border cursor-pointer ${
                sheetSyncStatus === "success"
                  ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/35 hover:scale-105"
                  : isLoadingSheet
                  ? "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/35 animate-pulse"
                  : "ios-glass-pill text-[#5e5953] dark:text-[#a9a5b8] hover:text-[#202020] dark:hover:text-white hover:border-[#b18a79]/40"
              }`}
              title="Connect or Sync your Google Sheet / Google Drive"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                {sheetSyncStatus === "success" 
                  ? "Google Sheet Synced" 
                  : isLoadingSheet 
                  ? "Syncing Sheet..." 
                  : "Google Sheet Sync"}
              </span>
              {sheetSyncStatus === "success" && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </button>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full ios-glass-pill text-xs font-mono text-[#5e5953] dark:text-[#a9a5b8]">
              <BookOpen className="w-3.5 h-3.5 text-amber-500 dark:text-[#e5c07b]" />
              <span>Book Reader</span>
            </div>
          </div>
        </div>

        {/* Filter Pills (All, Short Story, Long Story, Poem, Essays) */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 sm:gap-3 mb-8 sm:mb-12 py-1">
          
          {/* ALL FILTER */}
          <button
            onClick={() => handleFilterChange("all")}
            className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-300 cursor-pointer flex items-center gap-2 shrink-0 border ${
              filter === "all"
                ? "bg-[#202020] dark:bg-white text-white dark:text-black border-transparent shadow-lg scale-105"
                : "bg-black/5 dark:bg-white/5 text-[#5e5953] dark:text-[#a9a5b8] border-black/10 dark:border-white/10 hover:border-black/25 dark:hover:border-white/25"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>All Works</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
              filter === "all" ? "bg-white/20 dark:bg-black/20" : "bg-black/10 dark:bg-white/10"
            }`}>
              {allCount}
            </span>
          </button>

          {/* SHORT STORY FILTER */}
          <button
            onClick={() => handleFilterChange("shortstory")}
            className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-300 cursor-pointer flex items-center gap-2 shrink-0 border ${
              filter === "shortstory"
                ? "bg-amber-600 dark:bg-amber-400 text-white dark:text-black border-transparent shadow-lg scale-105"
                : "bg-black/5 dark:bg-white/5 text-[#5e5953] dark:text-[#a9a5b8] border-black/10 dark:border-white/10 hover:border-amber-500/40"
            }`}
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>Short Stories</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
              filter === "shortstory" ? "bg-white/20 dark:bg-black/20" : "bg-black/10 dark:bg-white/10"
            }`}>
              {shortCount}
            </span>
          </button>

          {/* LONG STORY FILTER */}
          <button
            onClick={() => handleFilterChange("longstory")}
            className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-300 cursor-pointer flex items-center gap-2 shrink-0 border ${
              filter === "longstory"
                ? "bg-sky-600 dark:bg-sky-400 text-white dark:text-black border-transparent shadow-lg scale-105"
                : "bg-black/5 dark:bg-white/5 text-[#5e5953] dark:text-[#a9a5b8] border-black/10 dark:border-white/10 hover:border-sky-500/40"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Long Stories</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
              filter === "longstory" ? "bg-white/20 dark:bg-black/20" : "bg-black/10 dark:bg-white/10"
            }`}>
              {longCount}
            </span>
          </button>

          {/* POEM FILTER */}
          <button
            onClick={() => handleFilterChange("poem")}
            className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-300 cursor-pointer flex items-center gap-2 shrink-0 border ${
              filter === "poem"
                ? "bg-pink-600 dark:bg-pink-400 text-white dark:text-black border-transparent shadow-lg scale-105"
                : "bg-black/5 dark:bg-white/5 text-[#5e5953] dark:text-[#a9a5b8] border-black/10 dark:border-white/10 hover:border-pink-500/40"
            }`}
          >
            <Feather className="w-3.5 h-3.5" />
            <span>Poems</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
              filter === "poem" ? "bg-white/20 dark:bg-black/20" : "bg-black/10 dark:bg-white/10"
            }`}>
              {poemCount}
            </span>
          </button>

          {/* ESSAYS FILTER */}
          <button
            onClick={() => handleFilterChange("essay")}
            className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-300 cursor-pointer flex items-center gap-2 shrink-0 border ${
              filter === "essay"
                ? "bg-[#4b396f] dark:bg-[#b6a2c9] text-white dark:text-black border-transparent shadow-lg scale-105"
                : "bg-black/5 dark:bg-white/5 text-[#5e5953] dark:text-[#a9a5b8] border-black/10 dark:border-white/10 hover:border-[#b6a2c9]/40"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Essays</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
              filter === "essay" ? "bg-white/20 dark:bg-black/20" : "bg-black/10 dark:bg-white/10"
            }`}>
              {essayCount}
            </span>
          </button>

        </div>

        {/* 3D Coverflow Stage Area */}
        <div 
          className="relative w-full py-6 flex flex-col items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Dynamic Ambient Background Aura Matching Active Album Palette */}
          {activeEssay && (
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] sm:w-[680px] lg:w-[880px] h-[320px] sm:h-[420px] lg:h-[500px] rounded-full pointer-events-none transition-all duration-700 ease-out -z-10"
              style={{
                background: `radial-gradient(ellipse at center, ${activeEssay.accentColor}44 0%, ${activeEssay.accentColor}18 50%, transparent 75%)`,
                filter: "blur(80px)"
              }}
            />
          )}

          {/* Left / Right Fast Step Chevron Arrows (Desktop Convenience) */}
          {filteredEssays.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-6 z-40 p-3 rounded-full bg-black/40 hover:bg-black/60 dark:bg-white/10 dark:hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 active:scale-95 cursor-pointer hidden md:flex items-center justify-center shadow-lg"
                title="Previous track (Left Arrow)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-6 z-40 p-3 rounded-full bg-black/40 hover:bg-black/60 dark:bg-white/10 dark:hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 active:scale-95 cursor-pointer hidden md:flex items-center justify-center shadow-lg"
                title="Next track (Right Arrow)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* 3D Coverflow Cards Stage */}
          <div className="coverflow-stage flex items-center justify-center h-[420px] sm:h-[470px] lg:h-[510px]">
            {filteredEssays.map((essay, idx) => {
              const cardTransform = getCardTransform(idx, filteredEssays.length);
              const isActive = idx === activeIndex;
              const essayLyrics = parseLyrics(essay.lyrics, essay.excerpt || essay.title);
              const visible4 = getVisible4Lines(isActive ? lyricIndex : 0, essayLyrics);
              const cardCover = normalizeGoogleDriveImageUrl(essay.coverImage);

              return (
                <div
                  key={essay.id}
                  onClick={() => handleBoxClick(idx)}
                  className={`coverflow-card absolute w-[260px] sm:w-[310px] lg:w-[350px] h-[390px] sm:h-[445px] lg:h-[485px] rounded-[30px] sm:rounded-[34px] overflow-hidden border border-white/25 dark:border-white/15 cursor-pointer group select-none shadow-2xl transition-all ${
                    isActive ? "ring-2 ring-white/30 dark:ring-white/20" : ""
                  }`}
                  style={{
                    ...cardTransform,
                    WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                    maskImage: "radial-gradient(white, black)"
                  }}
                  title={isActive ? "Click card to open Paginated Book Reader" : `Select ${essay.title}`}
                >
                  {/* Background Artwork Image (Supports Google Drive image URLs) */}
                  <img
                    src={cardCover}
                    alt={essay.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                    loading="lazy"
                  />

                  {/* Dark Vignettes for Contrast (Top behind title & Bottom behind summary lyrics) */}
                  <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-black/90 via-black/60 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-black/95 via-black/75 to-transparent pointer-events-none" />

                  {/* TITLE AT TOP OF THE CARD */}
                  <div className="absolute top-0 inset-x-0 p-4 sm:p-5 z-20 flex flex-col gap-1 text-left">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span 
                        className="font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15"
                        style={{ color: isActive ? essay.accentColor : "#ffffff" }}
                      >
                        {essay.category || essay.tag}
                      </span>

                      {/* Equalizer animation when active & playing */}
                      {isActive && isPlaying ? (
                        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono text-amber-400">
                          <span className="flex items-end gap-0.5 h-3">
                            <span className="w-0.5 bg-amber-400 rounded-full animate-eq-1" />
                            <span className="w-0.5 bg-amber-400 rounded-full animate-eq-2" />
                            <span className="w-0.5 bg-amber-400 rounded-full animate-eq-3" />
                          </span>
                          <span>STREAMING</span>
                        </div>
                      ) : (
                        <span className="text-white/70 flex items-center gap-1 font-mono text-[10px] bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                          <Clock className="w-2.5 h-2.5" />
                          {essay.readTime}
                        </span>
                      )}
                    </div>

                    {/* Main Title at Top */}
                    <h3 className="font-serif text-base sm:text-lg lg:text-xl font-semibold text-white tracking-tight leading-snug line-clamp-2 mt-1 drop-shadow-md group-hover:text-amber-300 transition-colors">
                      {essay.title}
                    </h3>
                    
                    <span className="text-[11px] font-sans text-white/60">
                      Joy Karmakar
                    </span>
                  </div>

                  {/* ONLY SUMMARY IN THE PLAYING LYRICS (4 LINES NORMAL VIEW) */}
                  <div className="absolute bottom-4 sm:bottom-6 inset-x-0 px-4 sm:px-6 z-20 flex flex-col justify-end text-left">
                    
                    {/* The 4-Line Summary Lyrics Box */}
                    <div className="space-y-2 sm:space-y-2.5 min-h-[140px] sm:min-h-[160px] flex flex-col justify-center">
                      {visible4.map((item, lIdx) => {
                        const isCurrent = isActive && isPlaying && item.isActive;
                        return (
                          <p
                            key={lIdx}
                            className={`leading-snug transition-all duration-500 font-sans cursor-pointer ${
                              isCurrent
                                ? "apple-lyric-active text-sm sm:text-base font-semibold"
                                : "apple-lyric-inactive text-xs sm:text-sm font-normal"
                            }`}
                            style={{
                              color: isCurrent ? essay.accentColor || "#ffffff" : undefined
                            }}
                          >
                            {item.text}
                          </p>
                        );
                      })}
                    </div>

                    {/* Subtle Cue Prompt at Bottom of Box */}
                    <div className="pt-3 mt-1 border-t border-white/15 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-white/60">
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-3 h-3 text-amber-400" />
                        <span>Click to read pages</span>
                      </span>

                      <span className="flex items-center gap-1 opacity-75 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-3 h-3" />
                        <span>Open Book</span>
                      </span>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Track Dots Indicator */}
          {filteredEssays.length > 1 && (
            <div className="flex items-center gap-2 mt-7 mb-2">
              {filteredEssays.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleBoxClick(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    idx === activeIndex
                      ? "w-8 h-2 bg-amber-500 dark:bg-[#e5c07b]"
                      : "w-2 h-2 bg-black/20 dark:bg-white/25 hover:bg-black/40 dark:hover:bg-white/45"
                  }`}
                  aria-label={`Jump to album ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Floating Liquid Glass Player Dock */}
        <div className="relative max-w-3xl mx-auto mt-2 px-2 sm:px-0">
          
          {/* Quick Playlist Queue Popover */}
          {isQueueOpen && (
            <div className="absolute bottom-full mb-3 inset-x-0 bg-white/95 dark:bg-[#1a1c26]/95 backdrop-blur-2xl rounded-3xl border border-white/40 dark:border-white/15 p-4 shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-black/10 dark:border-white/10 text-xs font-mono font-semibold uppercase tracking-wider text-[#5e5953] dark:text-[#a9a5b8]">
                <span>Filtered Track Queue ({filteredEssays.length} Records)</span>
                <button
                  onClick={() => setIsQueueOpen(false)}
                  className="p-1 hover:text-black dark:hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-1.5 max-h-56 overflow-y-auto">
                {filteredEssays.map((essay, idx) => (
                  <div
                    key={essay.id}
                    onClick={() => {
                      setActiveIndex(idx);
                      setIsQueueOpen(false);
                      playAudioFeedback("switch");
                    }}
                    className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                      idx === activeIndex
                        ? "bg-amber-500/15 dark:bg-amber-400/20 text-[#202020] dark:text-white font-medium border border-amber-500/30"
                        : "hover:bg-black/5 dark:hover:bg-white/5 text-[#5e5953] dark:text-[#a9a5b8]"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono text-xs opacity-60">
                        0{idx + 1}
                      </span>
                      <img
                        src={normalizeGoogleDriveImageUrl(essay.coverImage)}
                        alt=""
                        className="w-8 h-8 rounded-lg object-cover shrink-0"
                      />
                      <span className="truncate text-xs sm:text-sm font-serif">
                        {essay.title}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono shrink-0 ml-2">
                      {essay.readTime}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* The Frosted Liquid Glass Player Pill */}
          <div className="player-glass-dock relative flex items-center justify-between gap-2 sm:gap-4 p-2 sm:p-2.5">
            
            {/* Left Playback Transport Controls */}
            <div className="flex items-center gap-1 sm:gap-2 pl-1 sm:pl-2 shrink-0">
              <button
                onClick={handlePrev}
                className="p-2 sm:p-2.5 rounded-full text-[#303030] dark:text-white/80 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all active:scale-90 cursor-pointer"
                title="Previous Track"
              >
                <SkipBack className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              </button>

              <button
                onClick={togglePlay}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1b1b22] dark:bg-white text-white dark:text-black flex items-center justify-center hover:scale-108 active:scale-95 transition-transform shadow-lg cursor-pointer group"
                title={isPlaying ? "Pause Summary Lyrics Stream" : "Play & Stream Summary Lyrics"}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                ) : (
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current translate-x-0.5" />
                )}
              </button>

              <button
                onClick={handleNext}
                className="p-2 sm:p-2.5 rounded-full text-[#303030] dark:text-white/80 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all active:scale-90 cursor-pointer"
                title="Next Track"
              >
                <SkipForward className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              </button>
            </div>

            {/* Center "Now Playing" Capsule - Click to open Book Reader */}
            <div 
              onClick={() => setIsReaderOpen(true)}
              className="flex-1 min-w-0 max-w-sm sm:max-w-md bg-black/80 dark:bg-black/85 backdrop-blur-xl border border-white/15 rounded-2xl px-2.5 py-1.5 sm:px-3 sm:py-2 flex items-center gap-2.5 sm:gap-3 cursor-pointer hover:border-white/35 transition-all shadow-inner group relative overflow-hidden"
              title="Click to open Paginated Book Reader"
            >
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden shrink-0 border border-white/20 shadow">
                <img
                  src={normalizeGoogleDriveImageUrl(activeEssay?.coverImage)}
                  alt={activeEssay?.title}
                  className="w-full h-full object-cover"
                />
                {isPlaying && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-0.5">
                    <span className="w-0.5 bg-amber-400 rounded-full animate-eq-1" />
                    <span className="w-0.5 bg-amber-400 rounded-full animate-eq-2" />
                    <span className="w-0.5 bg-amber-400 rounded-full animate-eq-3" />
                  </div>
                )}
              </div>

              {/* Track Title & Summary Lyric Preview */}
              <div className="min-w-0 flex-1 pr-1">
                <p className="text-xs sm:text-sm font-semibold text-white truncate group-hover:text-amber-300 dark:group-hover:text-[#e5c07b] transition-colors leading-tight">
                  {activeEssay?.title}
                </p>
                <p className="text-[10px] sm:text-[11px] text-white/60 truncate leading-tight">
                  {isPlaying ? `♫ ${lyrics[lyricIndex] || activeEssay?.tag}` : `Joy Karmakar · ${activeEssay?.category || activeEssay?.tag}`}
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-white/50 group-hover:text-white/80 transition-colors shrink-0">
                <Airplay className="w-3.5 h-3.5" />
                <MoreHorizontal className="w-3.5 h-3.5" />
              </div>

              {/* Progress Scrubber */}
              <div className="absolute bottom-0 inset-x-0 h-[2px] bg-white/15">
                <div 
                  className="h-full bg-amber-400 transition-[width] duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Right Utility Action Buttons */}
            <div className="flex items-center gap-1 sm:gap-2 pr-1 sm:pr-2 shrink-0 text-[#303030] dark:text-white/80">
              
              {/* Google Sheets Sync Indicator Button */}
              <button
                onClick={() => setIsSyncModalOpen(true)}
                className={`p-2 sm:p-2.5 rounded-full transition-all cursor-pointer ${
                  sheetSyncStatus === "success" 
                    ? "text-emerald-500 hover:bg-emerald-500/10" 
                    : "hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:hover:text-white"
                }`}
                title="Google Sheet Live Sync"
              >
                <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Open Book Reader Button */}
              <button
                onClick={() => setIsReaderOpen((prev) => !prev)}
                className={`p-2 sm:p-2.5 rounded-full transition-all cursor-pointer ${
                  isReaderOpen
                    ? "bg-amber-500/20 text-amber-500 dark:text-amber-400"
                    : "hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:hover:text-white"
                }`}
                title="Open Paginated Book Reader"
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Queue List Trigger */}
              <button
                onClick={() => setIsQueueOpen((prev) => !prev)}
                className={`p-2 sm:p-2.5 rounded-full transition-all cursor-pointer ${
                  isQueueOpen
                    ? "bg-black/10 dark:bg-white/20 text-black dark:text-white"
                    : "hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:hover:text-white"
                }`}
                title="Archive Tracklist Queue"
              >
                <ListMusic className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Sound / Mute toggle */}
              <button
                onClick={() => setIsMuted((prev) => !prev)}
                className="p-2 sm:p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-all cursor-pointer"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                ) : (
                  <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* PAGINATED BOOK READER MODAL                                    */}
      {/* ============================================================== */}
      <StoryBookReaderModal
        article={activeEssay}
        isOpen={isReaderOpen}
        onClose={() => setIsReaderOpen(false)}
      />

      {/* ============================================================== */}
      {/* GOOGLE DRIVE & SHEETS LIVE SYNC MODAL                           */}
      {/* Configure Google Sheet link & see column instructions          */}
      {/* ============================================================== */}
      {isSyncModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsSyncModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-xl bg-[#fdfcf9] dark:bg-[#161822] border border-[#dbd2c4] dark:border-[#38374d] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#dbd2c4] dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#202020] dark:text-[#f3f2f7]">
                    Google Sheet & Drive Sync
                  </h3>
                  <p className="text-xs font-mono text-[#5e5953] dark:text-[#a9a5b8]">
                    Load stories dynamically without uploading to GitHub
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsSyncModalOpen(false)}
                className="p-1.5 rounded-lg text-[#5e5953] dark:text-[#a9a5b8] hover:text-[#202020] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Input Form */}
            <div className="space-y-3">
              <label className="block text-xs font-mono uppercase tracking-wider font-semibold text-[#202020] dark:text-[#f3f2f7]">
                Google Sheet Link or Sheet ID:
              </label>
              
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customSheetUrl}
                  onChange={(e) => setCustomSheetUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit?usp=sharing"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[#dbd2c4] dark:border-[#38374d] bg-white dark:bg-[#10121a] text-[#202020] dark:text-[#f3f2f7] text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />

                <button
                  onClick={() => syncGoogleSheetStories(customSheetUrl)}
                  disabled={isLoadingSheet || !customSheetUrl.trim()}
                  className={`px-4 py-2.5 rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isLoadingSheet
                      ? "bg-emerald-500/50 text-white cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md active:scale-95"
                  }`}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingSheet ? "animate-spin" : ""}`} />
                  <span>Sync</span>
                </button>
              </div>

              {/* Status Message */}
              {sheetSyncStatus === "success" && (
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Successfully synced {storiesList.length} stories from your Google Sheet!</span>
                </div>
              )}

              {sheetSyncStatus === "error" && (
                <div className="flex items-start gap-2 text-xs font-mono text-red-600 dark:text-red-400 bg-red-500/10 p-2.5 rounded-xl border border-red-500/20">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Sync Failed:</p>
                    <p>{sheetErrorMessage || "Could not access sheet. Verify sharing is 'Anyone with the link can view'."}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Step-by-Step Instructions */}
            <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-3 text-xs text-[#5e5953] dark:text-[#a9a5b8]">
              <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px] text-[#202020] dark:text-[#f3f2f7]">
                <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>How to Format Your Google Sheet (Method 2 & 3)</span>
              </div>

              <div className="space-y-1.5 font-sans leading-relaxed">
                <p>
                  <strong className="text-[#202020] dark:text-white">1. Column Headers (Row 1):</strong> Make sure row 1 has columns named:
                </p>
                <div className="p-2 rounded-lg bg-white dark:bg-black/40 font-mono text-[11px] border border-black/10 dark:border-white/10 text-emerald-600 dark:text-emerald-300">
                  Title · Category · SummaryLyrics · Content · CoverImage
                </div>

                <p>
                  <strong className="text-[#202020] dark:text-white">2. Category values:</strong> Use <code className="font-mono text-amber-600 dark:text-amber-400">Short Story</code>, <code className="font-mono text-sky-600 dark:text-sky-400">Long Story</code>, or <code className="font-mono text-pink-600 dark:text-pink-400">Poem</code>.
                </p>

                <p>
                  <strong className="text-[#202020] dark:text-white">3. Google Drive Cover Images (Method 3):</strong> In the <code className="font-mono">CoverImage</code> column, you can paste normal Google Drive image share links like:
                </p>
                <div className="p-2 rounded-lg bg-white dark:bg-black/40 font-mono text-[10px] break-all border border-black/10 dark:border-white/10 opacity-80">
                  https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing
                </div>
                <p className="text-[11px] italic">
                  The portfolio automatically converts it to a direct CDN image!
                </p>

                <p>
                  <strong className="text-[#202020] dark:text-white">4. Share Settings:</strong> In Google Sheets, click <strong>Share</strong> and set to <strong>"Anyone with the link can view"</strong>.
                </p>
              </div>
            </div>

            {/* Permanent Code Config Note */}
            <div className="pt-2 text-[11px] font-mono text-[#8f8880] dark:text-[#736f82] flex items-center justify-between">
              <span>Permanently configure in: <code className="text-[#202020] dark:text-white font-bold">src/data/journalData.js</code></span>
              <button
                onClick={() => setIsSyncModalOpen(false)}
                className="px-3 py-1 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-[#202020] dark:text-white"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

export default JournalSection;
