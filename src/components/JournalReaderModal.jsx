import React, { useEffect } from "react";
import { X, Clock, Calendar, Bookmark, Share2 } from "lucide-react";

function formatInlineMarkdown(text) {
  if (!text) return "";
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-[#202020] dark:text-white">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i} className="italic text-[#b18a79] dark:text-[#dfb29d]">{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

export function JournalReaderModal({ article, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !article) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#fdfcf9] dark:bg-[#151720] border border-[#dbd2c4] dark:border-[#38374d] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#202020] dark:text-[#f3f2f7]">
        {/* Top Sticky Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#dbd2c4] dark:border-[#38374d] bg-[#f6f3eb]/90 dark:bg-[#212530]/90 backdrop-blur shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded bg-amber-500/10 dark:bg-amber-400/15 border border-amber-600/30 text-amber-700 dark:text-amber-400 font-bold">
              MEMORY SHARD
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#b18a79]/15 dark:bg-[#4b396f]/40 text-[#b18a79] dark:text-[#b6a2c9] font-medium border border-[#b18a79]/20 dark:border-[#b6a2c9]/30">
              {article.tag || article.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-[#5e5953] dark:text-[#a9a5b8] font-mono">
              <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              {article.readTime}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#5e5953] dark:text-[#a9a5b8] hover:text-[#202020] dark:hover:text-[#f3f2f7] hover:bg-[#eae5d9] dark:hover:bg-[#2e3242] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Article Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6">
          {/* Audio Chronicle Artwork Banner */}
          {article.coverImage && (
            <div className="relative w-full h-44 sm:h-60 rounded-2xl overflow-hidden mb-6 border border-[#dbd2c4] dark:border-white/10 shadow-xl group">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
              
              <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono">
                  <span className="flex items-end gap-0.5 h-3">
                    <span className="w-1 bg-amber-400 rounded-full animate-eq-1" />
                    <span className="w-1 bg-amber-400 rounded-full animate-eq-2" />
                    <span className="w-1 bg-amber-400 rounded-full animate-eq-3" />
                  </span>
                  <span>NOW PLAYING · 44.1kHz ON-DEVICE TRANSCRIPT</span>
                </div>
                
                <span className="text-[11px] font-mono text-white/80 bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 hidden sm:inline-block">
                  Joy Karmakar Studio
                </span>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-[#8f8880] dark:text-[#736f82]">
              <Calendar className="w-3.5 h-3.5" />
              <span>Published {article.date} · By Joy Karmakar</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight tracking-tight text-[#202020] dark:text-[#f3f2f7]">
              {article.title}
            </h1>
            <p className="text-base sm:text-lg text-[#5e5953] dark:text-[#a9a5b8] font-sans italic border-l-2 border-[#b18a79] dark:border-[#b6a2c9] pl-4 py-1">
              {article.excerpt}
            </p>
          </div>

          <hr className="border-[#dbd2c4] dark:border-[#38374d] my-6" />

          {/* Body with formatted markdown */}
          <div className="prose dark:prose-invert max-w-none text-[#202020]/90 dark:text-[#f3f2f7]/90 font-sans text-sm sm:text-base leading-relaxed space-y-5">
            {article.content.split("\n\n").map((block, idx) => {
              const trimmed = block.trim();
              if (trimmed.startsWith("### ")) {
                return (
                  <h3 key={idx} className="font-serif text-xl sm:text-2xl font-semibold text-[#202020] dark:text-[#f3f2f7] pt-3">
                    {formatInlineMarkdown(trimmed.replace("### ", ""))}
                  </h3>
                );
              }
              if (trimmed.startsWith("> ")) {
                return (
                  <blockquote key={idx} className="p-4 my-4 rounded-xl bg-[#eae5d9]/50 dark:bg-[#212530] border-l-4 border-[#b18a79] dark:border-[#b6a2c9] font-serif italic text-base text-[#202020] dark:text-[#f3f2f7]">
                    {formatInlineMarkdown(trimmed.replace("> ", ""))}
                  </blockquote>
                );
              }
              if (trimmed.startsWith("1. ") || trimmed.startsWith("- ")) {
                return (
                  <div key={idx} className="pl-4 space-y-2">
                    {trimmed.split("\n").map((line, lIdx) => (
                      <div key={lIdx} className="text-sm sm:text-base">
                        {formatInlineMarkdown(line)}
                      </div>
                    ))}
                  </div>
                );
              }
              return (
                <p key={idx} className="leading-relaxed">
                  {formatInlineMarkdown(trimmed)}
                </p>
              );
            })}
          </div>

          <div className="pt-8 border-t border-[#dbd2c4] dark:border-[#38374d] mt-10 flex items-center justify-between text-xs text-[#5e5953] dark:text-[#a9a5b8]">
            <span>Written from the field & studio by Joy Karmakar</span>
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#dbd2c4] dark:border-[#38374d] hover:bg-[#eae5d9] dark:hover:bg-[#212530] transition-colors cursor-pointer text-[#202020] dark:text-[#f3f2f7]"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Copy Link</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
