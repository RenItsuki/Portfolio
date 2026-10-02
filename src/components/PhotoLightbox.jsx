import React, { useEffect, useState } from "react";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Calendar, 
  Share2, 
  Check, 
  Info, 
  Heart, 
  Folder, 
  Compass, 
  ExternalLink,
  CloudCheck,
  Tag
} from "lucide-react";

// Google Photos 4-Color Pinwheel Icon SVG
function GooglePhotosIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 192 192" fill="none">
      <path d="M96 96V36C96 16.1177 79.8823 0 60 0C40.1177 0 24 16.1177 24 36C24 55.8823 40.1177 72 60 72H96V96Z" fill="#EA4335" />
      <path d="M96 96H156C175.882 96 192 79.8823 192 60C192 40.1177 175.882 24 156 24C136.118 24 120 40.1177 120 60V96H96Z" fill="#FBBC05" />
      <path d="M96 96V156C96 175.882 112.118 192 132 192C151.882 192 168 175.882 168 156C168 136.118 151.882 120 132 120H96V96Z" fill="#34A853" />
      <path d="M96 96H36C16.1177 96 0 112.118 0 132C0 151.882 16.1177 168 36 168C55.8823 168 72 151.882 72 132V96H96Z" fill="#4285F4" />
    </svg>
  );
}

export function PhotoLightbox({ photos, currentIndex, isOpen, onClose, onNavigate }) {
  const [copied, setCopied] = useState(false);
  const [showInfoDrawer, setShowInfoDrawer] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);

  const currentPhoto = photos[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((currentIndex - 1 + photos.length) % photos.length);
      if (e.key === "ArrowRight") onNavigate((currentIndex + 1) % photos.length);
      if (e.key === "i" || e.key === "I") setShowInfoDrawer((prev) => !prev);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, photos?.length, onClose, onNavigate]);

  if (!isOpen || !currentPhoto) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentPhoto.title,
        text: `${currentPhoto.title} (${currentPhoto.location}) by Joy Karmakar`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const mapQueryUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    (currentPhoto.location || "") + ", " + (currentPhoto.cityRegion || "")
  )}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in select-none text-white"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Lightbox Top Google Photos Header */}
      <div className="absolute top-0 inset-x-0 p-4 sm:p-5 flex items-center justify-between z-30 bg-gradient-to-b from-black/85 via-black/50 to-transparent">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            title="Back to gallery"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <GooglePhotosIcon className="w-4 h-4 hidden sm:inline-block" />
            <span className="font-mono text-xs text-white/70 bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
              {currentIndex + 1} of {photos.length}
            </span>
            <h3 className="font-serif text-sm sm:text-base font-medium truncate max-w-xs sm:max-w-md hidden sm:block">
              {currentPhoto.title}
            </h3>
          </div>
        </div>

        {/* Top Action Buttons (Favorite, Info Drawer, Share, Close) */}
        <div className="flex items-center gap-2">
          {/* Favorite */}
          <button
            onClick={() => setIsFavorited((prev) => !prev)}
            className={`p-2.5 rounded-full border transition-all cursor-pointer ${
              isFavorited
                ? "bg-rose-500 border-rose-400 text-white"
                : "bg-white/10 border-white/15 text-white/80 hover:bg-white/20"
            }`}
            title="Favorite photo"
          >
            <Heart className="w-4 h-4 fill-current" />
          </button>

          {/* Info Drawer Toggle (Google Photos 'i' icon) */}
          <button
            onClick={() => setShowInfoDrawer(!showInfoDrawer)}
            className={`p-2.5 rounded-full border transition-all cursor-pointer ${
              showInfoDrawer 
                ? "bg-blue-600 border-blue-400 text-white shadow-md" 
                : "bg-white/10 border-white/15 text-white/80 hover:bg-white/20"
            }`}
            title="Toggle Details & Location Info (Press 'i')"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="p-2.5 rounded-full bg-white/10 border border-white/15 text-white/80 hover:bg-white/20 transition-colors cursor-pointer"
            title="Share"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 border border-white/15 text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => onNavigate((currentIndex - 1 + photos.length) % photos.length)}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
        title="Previous photo (Left Arrow)"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => onNavigate((currentIndex + 1) % photos.length)}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
        title="Next photo (Right Arrow)"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Container: Photo on left/center, Info Drawer on right */}
      <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-center p-3 sm:p-6 pt-16 sm:pt-20 overflow-hidden">
        
        {/* Photo Viewport */}
        <div className={`relative flex-1 h-full flex items-center justify-center transition-all duration-300 ${
          showInfoDrawer ? "md:pr-4" : ""
        }`}>
          <img
            src={currentPhoto.imageUrl}
            alt={currentPhoto.title}
            className="max-h-[75vh] sm:max-h-[82vh] max-w-full object-contain rounded-2xl shadow-2xl transition-all duration-300"
          />
        </div>

        {/* Google Photos "Info (i)" Details Drawer (Location, Date, Album, Story, Tags - NO CAMERA SETTINGS) */}
        {showInfoDrawer && (
          <div className="w-full md:w-96 max-h-[48vh] md:max-h-[85vh] overflow-y-auto bg-[#181a24]/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-5 sm:p-6 text-white shadow-2xl flex flex-col gap-5 z-20 shrink-0 animate-in slide-in-from-right-4 duration-300">
            
            {/* Drawer Title Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-400" />
                <span className="font-serif text-base font-medium">Details & Geotag</span>
              </div>
              <span className="text-[11px] font-mono text-white/50">
                Google Photos
              </span>
            </div>

            {/* Photo Title & Description */}
            <div className="space-y-1.5">
              <h2 className="font-serif text-xl font-semibold tracking-tight text-white leading-snug">
                {currentPhoto.title}
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                {currentPhoto.note}
              </p>
            </div>

            {/* Date & Time Section */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-blue-500/15 text-blue-400 shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <span className="text-[11px] font-mono text-white/50 block">Captured Date & Time</span>
                <span className="text-xs sm:text-sm font-medium text-white block truncate">
                  {currentPhoto.capturedDate}
                </span>
                <span className="text-[11px] font-mono text-blue-300">
                  {currentPhoto.year} Expedition Log
                </span>
              </div>
            </div>

            {/* Location & Map Preview Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-white/60">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>Geotagged Location</span>
                </span>
                <a
                  href={mapQueryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>Open Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Simulated Google Maps Location Card */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#121520] to-[#1c2235] border border-white/15 space-y-2 relative overflow-hidden group">
                {/* Subtle map grid texture lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-sm text-white">
                      {currentPhoto.location}
                    </h4>
                    <p className="text-xs text-white/60">
                      {currentPhoto.cityRegion}
                    </p>
                  </div>

                  {/* Red Google Maps Pin with Pulsing Radar Ring */}
                  <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40">
                    <span className="absolute w-6 h-6 rounded-full bg-rose-500/30 animate-ping pointer-events-none" />
                    <MapPin className="w-4 h-4 text-rose-400 relative z-10" />
                  </div>
                </div>

                <div className="relative z-10 pt-1 flex items-center justify-between text-[10px] font-mono text-white/50 border-t border-white/10">
                  <span>GPS Coordinates:</span>
                  <span className="text-white/80 font-semibold">{currentPhoto.coordinates}</span>
                </div>
              </div>
            </div>

            {/* Album Membership */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <Folder className="w-4 h-4 text-amber-400" />
                <div>
                  <span className="text-[10px] font-mono text-white/50 block">Album</span>
                  <span className="font-medium text-white">{currentPhoto.album}</span>
                </div>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                {currentPhoto.category}
              </span>
            </div>

            {/* Detected Entities / Tags */}
            {currentPhoto.tags && (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-white/60">
                  <Tag className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Subjects & Field Context</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentPhoto.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/15 text-[11px] font-sans text-white/80 border border-white/10 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Storage & Cloud Quality Status (NO CAMERA EXIF) */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
              <span className="flex items-center gap-1 text-emerald-400">
                <span>✓</span>
                <span>Original Quality Backup</span>
              </span>
              <span>16 MP · Geo Intact</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
