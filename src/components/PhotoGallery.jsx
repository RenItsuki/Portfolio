import React, { useState, useMemo } from "react";
import { 
  MapPin, 
  Calendar, 
  Folder, 
  Images, 
  Sparkles, 
  Heart, 
  Info, 
  Compass, 
  ChevronRight, 
  ChevronLeft, 
  ArrowLeft, 
  LayoutGrid, 
  Search, 
  X,
  Camera
} from "lucide-react";
import { photoSeries, photoAlbums } from "../data/photosData";

// Elegant Themed Photo Pinwheel Icon SVG (Harmonized with Portfolio Palette)
function ThemedPhotosIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 192 192" fill="none">
      {/* Warm Terracotta Blade */}
      <path d="M96 96V36C96 16.1177 79.8823 0 60 0C40.1177 0 24 16.1177 24 36C24 55.8823 40.1177 72 60 72H96V96Z" fill="#b18a79" />
      {/* Warm Gold Blade */}
      <path d="M96 96H156C175.882 96 192 79.8823 192 60C192 40.1177 175.882 24 156 24C136.118 24 120 40.1177 120 60V96H96Z" fill="#e5c07b" />
      {/* Amber Bronze Blade */}
      <path d="M96 96V156C96 175.882 112.118 192 132 192C151.882 192 168 175.882 168 156C168 136.118 151.882 120 132 120H96V96Z" fill="#d97706" />
      {/* Soft Rosy Terracotta Blade */}
      <path d="M96 96H36C16.1177 96 0 112.118 0 132C0 151.882 16.1177 168 36 168C55.8823 168 72 151.882 72 132V96H96Z" fill="#9c7564" />
    </svg>
  );
}

// Authentic Google Photos Multi-Photo Album Collage Cover Component
function AlbumCollageCover({ album }) {
  const photos = album.collagePhotos || [];

  return (
    <div className="relative aspect-[4/3] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black/20 shadow-md group-hover:shadow-2xl transition-all duration-500 border border-[#dbd2c4]/60 dark:border-white/10">
      {/* 3-Photo Asymmetrical Google Photos Collage Grid */}
      <div className="grid grid-cols-12 h-full w-full gap-1 p-1 bg-black/10">
        
        {/* Left Hero Photo (Spans 7 of 12 columns) */}
        <div className="col-span-7 h-full rounded-xl sm:rounded-2xl overflow-hidden relative">
          <img
            src={photos[0]}
            alt={album.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Right Stacked Photos (Spans 5 of 12 columns, 2 rows) */}
        <div className="col-span-5 h-full flex flex-col gap-1">
          {/* Top Right Photo */}
          <div className="h-1/2 w-full rounded-xl sm:rounded-2xl overflow-hidden relative">
            <img
              src={photos[1] || photos[0]}
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Bottom Right Photo */}
          <div className="h-1/2 w-full rounded-xl sm:rounded-2xl overflow-hidden relative">
            <img
              src={photos[2] || photos[0]}
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>

      </div>

      {/* Floating Count Pill Styled in Theme */}
      <div className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-[#e5c07b]/40 text-[#fde68a] text-[11px] font-mono shadow-md flex items-center gap-1.5">
        <Images className="w-3 h-3 text-[#e5c07b]" />
        <span>{album.count}</span>
      </div>
    </div>
  );
}

// 4-Item Pagination & Continuous Page Advance Component (Strict Theme Colors)
function PaginationBar({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange, label = "items" }) {
  if (totalPages <= 1) return null;

  const startIdx = (currentPage - 1) * itemsPerPage + 1;
  const endIdx = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers array (with ellipsis if more than 7 pages)
  let pages = [];
  if (totalPages <= 7) {
    pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    if (currentPage <= 4) {
      pages = [1, 2, 3, 4, 5, "...", totalPages];
    } else if (currentPage >= totalPages - 3) {
      pages = [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      pages = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
    }
  }

  return (
    <div className="space-y-3 mb-8">
      {/* Primary Pagination Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-[#dbd2c4] dark:border-white/10">
        
        {/* Left Count Status */}
        <div className="text-xs font-mono text-[#5e5953] dark:text-[#a9a5b8] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#b18a79] dark:bg-[#e5c07b] animate-pulse" />
          <span>
            PAGE <strong className="text-[#202020] dark:text-white font-bold">{currentPage}</strong> OF <strong className="text-[#202020] dark:text-white font-bold">{totalPages}</strong>
          </span>
          <span>•</span>
          <span>Showing {startIdx}–{endIdx} of {totalItems} {label}</span>
        </div>

        {/* Center / Right Page Navigation Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          {/* Previous Page Button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#181a24] border border-[#dbd2c4] dark:border-white/10 text-xs font-mono font-medium disabled:opacity-30 disabled:cursor-not-allowed text-[#202020] dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center gap-1 cursor-pointer"
            title="Previous Page"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          {/* Numbered Page Buttons */}
          {pages.map((p, idx) => {
            if (p === "...") {
              return (
                <span key={`dots-${idx}`} className="px-2 text-xs font-mono text-[#8f8880] dark:text-[#736f82]">
                  ...
                </span>
              );
            }
            return (
              <button
                key={`page-${p}`}
                onClick={() => onPageChange(p)}
                className={`w-8 h-8 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  currentPage === p
                    ? "bg-[#b18a79] dark:bg-[#e5c07b] text-white dark:text-black shadow-md shadow-[#b18a79]/30 dark:shadow-[0_0_15px_rgba(229,192,123,0.4)] scale-105"
                    : "bg-white dark:bg-[#181a24] text-[#5e5953] dark:text-[#a9a5b8] hover:bg-black/5 dark:hover:bg-white/10 border border-[#dbd2c4] dark:border-white/10"
                }`}
                title={`Page ${p}`}
              >
                {p}
              </button>
            );
          })}

          {/* Next Page Button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#181a24] border border-[#dbd2c4] dark:border-white/10 text-xs font-mono font-medium disabled:opacity-30 disabled:cursor-not-allowed text-[#202020] dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center gap-1 cursor-pointer"
            title="Next Page"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Continuous Advance Button: Option for next page */}
      {currentPage < totalPages && (
        <div className="flex justify-center pt-1">
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#b18a79] to-[#9c7564] dark:from-[#e5c07b] dark:to-[#d97706] text-white dark:text-black text-xs font-mono font-bold shadow-lg shadow-[#b18a79]/20 dark:shadow-[0_0_20px_rgba(229,192,123,0.3)] flex items-center gap-2 transition-all cursor-pointer active:scale-98 hover:scale-102"
          >
            <span>Continue to Page {currentPage + 1} (Next 4 {label})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export function PhotoGallery({ onSelectPhoto }) {
  const [viewMode, setViewMode] = useState("albums"); // "albums" | "all"
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState({});

  // 4 items per page for BOTH albums and photos
  const [albumsPage, setAlbumsPage] = useState(1);
  const albumsPerPage = 4;

  const [photosPage, setPhotosPage] = useState(1);
  const photosPerPage = 4;

  const toggleFavorite = (e, photoId) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [photoId]: !prev[photoId] }));
  };

  // Scroll to photo grid smoothly when changing page
  const scrollToGrid = () => {
    const anchor = document.getElementById("photo-grid-anchor");
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Filtered albums based on search & category
  const filteredAlbums = useMemo(() => {
    return photoAlbums.filter((album) => {
      const matchesCategory = selectedCategory === "All" || album.category.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchesSearch = searchQuery.trim() === "" || 
        album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        album.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        album.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Paginated albums: exactly 4 per page
  const totalAlbumPages = Math.ceil(filteredAlbums.length / albumsPerPage) || 1;
  const currentAlbums = filteredAlbums.slice((albumsPage - 1) * albumsPerPage, albumsPage * albumsPerPage);

  // Filtered photos based on album selection, category, and search query
  const filteredPhotos = useMemo(() => {
    return photoSeries.filter((photo) => {
      const matchesAlbum = !selectedAlbum || photo.album === selectedAlbum.title;
      const matchesCategory = selectedCategory === "All" || photo.category.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchesSearch = searchQuery.trim() === "" ||
        photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.cityRegion.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (photo.tags && photo.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesAlbum && matchesCategory && matchesSearch;
    });
  }, [selectedAlbum, selectedCategory, searchQuery]);

  // Paginated photos: exactly 4 per page
  const totalPhotoPages = Math.ceil(filteredPhotos.length / photosPerPage) || 1;
  const currentPhotos = filteredPhotos.slice((photosPage - 1) * photosPerPage, photosPage * photosPerPage);

  // Categories list with count helper
  const categoriesList = [
    { label: "All", count: photoSeries.length },
    { label: "Birds", count: photoSeries.filter(p => p.category === "Birds").length },
    { label: "Flowers", count: photoSeries.filter(p => p.category === "Flowers").length },
    { label: "Animals", count: photoSeries.filter(p => p.category === "Animals").length },
    { label: "Scenery", count: photoSeries.filter(p => p.category === "Scenery").length },
    { label: "Monochrome", count: photoSeries.filter(p => p.category === "Monochrome").length },
    { label: "Astrophotography", count: photoSeries.filter(p => p.category === "Astrophotography").length },
    { label: "Urban", count: photoSeries.filter(p => p.category === "Urban").length },
    { label: "Coastal", count: photoSeries.filter(p => p.category === "Coastal").length }
  ];

  const handleSelectAlbum = (album) => {
    setSelectedAlbum(album);
    setPhotosPage(1);
    scrollToGrid();
  };

  const handleBackToAlbums = () => {
    setSelectedAlbum(null);
    setPhotosPage(1);
    scrollToGrid();
  };

  const handleAlbumsPageChange = (page) => {
    setAlbumsPage(page);
    scrollToGrid();
  };

  const handlePhotosPageChange = (page) => {
    setPhotosPage(page);
    scrollToGrid();
  };

  return (
    <section id="photography" className="py-24 sm:py-32 border-t border-[#dbd2c4] dark:border-white/10 relative overflow-hidden select-none">
      {/* Ambient Color Glows Styled in Portfolio Palette */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#b18a79]/12 via-[#dfb29d]/10 to-transparent dark:from-[#e5c07b]/15 dark:to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-20 left-10 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#9c7564]/10 via-[#e5c07b]/8 to-transparent dark:from-[#4b396f]/20 dark:to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-[#202020] dark:text-white">
              <ThemedPhotosIcon className="w-5 h-5 shadow-sm" />
              <span className="font-semibold text-[#b18a79] dark:text-[#e5c07b]">Expedition Visuals</span>
              <span className="text-[#8f8880] dark:text-[#a9a5b8]">· 4 Items Per Page · Multi-Page Selection</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#202020] dark:text-[#f3f2f7] tracking-tight">
              Curated Albums & Photo Library
            </h2>
            
            <p className="text-sm sm:text-base text-[#5e5953] dark:text-[#a9a5b8] max-w-2xl font-sans font-light">
              Browsing 4 albums or photographs per page. When more than 4 items are available, use the multi-page controls below to continuously browse page 2, page 3, and beyond.
            </p>
          </div>

          {/* View Mode Toggle: [Albums (4/page)] vs [All Photos (4/page)] */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center p-1 rounded-full ios-glass-pill bg-black/5 dark:bg-white/5 border border-[#dbd2c4] dark:border-white/10">
              <button
                onClick={() => {
                  setViewMode("albums");
                  setSelectedAlbum(null);
                  setAlbumsPage(1);
                }}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  viewMode === "albums" && !selectedAlbum
                    ? "bg-[#b18a79] dark:bg-[#e5c07b] text-white dark:text-black shadow-sm font-semibold"
                    : "text-[#5e5953] dark:text-[#a9a5b8] hover:text-black dark:hover:text-white"
                }`}
              >
                <Folder className="w-3.5 h-3.5" />
                <span>Albums ({photoAlbums.length})</span>
              </button>

              <button
                onClick={() => {
                  setViewMode("all");
                  setSelectedAlbum(null);
                  setPhotosPage(1);
                }}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  viewMode === "all" && !selectedAlbum
                    ? "bg-[#b18a79] dark:bg-[#e5c07b] text-white dark:text-black shadow-sm font-semibold"
                    : "text-[#5e5953] dark:text-[#a9a5b8] hover:text-black dark:hover:text-white"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>All Photos ({photoSeries.length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Filter Pills with counts */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-[#dbd2c4] dark:border-white/10 overflow-x-auto no-scrollbar w-full md:w-auto">
            {categoriesList.map((cat) => (
              <button
                key={cat.label}
                onClick={() => {
                  setSelectedCategory(cat.label);
                  setAlbumsPage(1);
                  setPhotosPage(1);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat.label
                    ? "bg-[#b18a79] dark:bg-[#e5c07b] text-white dark:text-black font-bold shadow-md shadow-[#b18a79]/20 dark:shadow-[0_0_15px_rgba(229,192,123,0.3)]"
                    : "text-[#5e5953] dark:text-[#a9a5b8] hover:text-black dark:hover:text-white"
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.label
                    ? "bg-white/20 dark:bg-black/20 text-white dark:text-black"
                    : "bg-black/10 dark:bg-white/10 text-neutral-500 dark:text-neutral-400"
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setAlbumsPage(1);
                setPhotosPage(1);
              }}
              placeholder="Search title, location, tag..."
              className="w-full pl-9 pr-8 py-2 rounded-xl text-xs bg-white/70 dark:bg-[#181a24]/80 border border-[#dbd2c4] dark:border-white/10 text-[#202020] dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#b18a79]/50 dark:focus:ring-[#e5c07b]/50 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black dark:hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Scroll anchor for smooth page transitions */}
        <div id="photo-grid-anchor" className="scroll-mt-28" />

        {/* Back Button & Breadcrumb when viewing an opened album */}
        {selectedAlbum && (
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#dbd2c4] dark:border-white/10">
            <button
              onClick={handleBackToAlbums}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-xs font-mono font-medium transition-colors cursor-pointer text-[#202020] dark:text-white"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Albums</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-[#5e5953] dark:text-[#a9a5b8]">
              <span className="font-semibold text-[#202020] dark:text-white">
                {selectedAlbum.title}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#b18a79] dark:text-[#e5c07b]" />
                {selectedAlbum.location}
              </span>
              <span>•</span>
              <span>({filteredPhotos.length} photos)</span>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 1. ALBUMS: EXACTLY 4 ALBUMS PER PAGE                           */}
        {/* ============================================================== */}
        {viewMode === "albums" && !selectedAlbum && (
          <div>
            {/* 4 Albums in 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8 mb-8">
              {currentAlbums.map((album) => (
                <div
                  key={album.id}
                  onClick={() => handleSelectAlbum(album)}
                  className="group relative cursor-pointer rounded-3xl p-3 sm:p-4 bg-white/40 dark:bg-[#181a24]/60 border border-[#dbd2c4] dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5"
                >
                  {/* 3-Photo Signature Collage Cover */}
                  <AlbumCollageCover album={album} />

                  {/* Album Details Bar */}
                  <div className="pt-4 px-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-lg sm:text-xl font-medium text-[#202020] dark:text-white group-hover:text-[#b18a79] dark:group-hover:text-[#e5c07b] transition-colors">
                        {album.title}
                      </h3>
                      
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#b18a79]/10 dark:bg-[#e5c07b]/15 text-[#b18a79] dark:text-[#e5c07b] border border-[#b18a79]/30 dark:border-[#e5c07b]/30">
                        {album.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#5e5953] dark:text-[#a9a5b8] font-sans pt-0.5">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#b18a79] dark:text-[#e5c07b] shrink-0" />
                        <span className="truncate">{album.location}</span>
                      </div>

                      <span className="font-mono text-[11px] text-[#8f8880] dark:text-[#736f82]">
                        {album.dateRange}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Albums Multi-Page Selection (4 albums per page) */}
            <PaginationBar
              currentPage={albumsPage}
              totalPages={totalAlbumPages}
              totalItems={filteredAlbums.length}
              itemsPerPage={albumsPerPage}
              onPageChange={handleAlbumsPageChange}
              label="albums"
            />
          </div>
        )}

        {/* ============================================================== */}
        {/* 2. PHOTOS: EXACTLY 4 PHOTOS PER PAGE                           */}
        {/* ============================================================== */}
        {(selectedAlbum || viewMode === "all") && (
          <div>
            {/* 4 Photos in 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7 mb-8">
              {currentPhotos.map((photo, index) => {
                const isFav = !!favorites[photo.id];
                // Global index in photoSeries for Lightbox
                const globalIndex = photoSeries.findIndex(p => p.id === photo.id);

                return (
                  <div
                    key={photo.id}
                    onClick={() => onSelectPhoto(photo, globalIndex >= 0 ? globalIndex : index)}
                    className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 border border-[#dbd2c4] dark:border-white/10 bg-[#151720] aspect-[16/11] sm:aspect-[4/3]"
                  >
                    <img
                      src={photo.imageUrl || photo.thumbnailUrl}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 opacity-75 group-hover:opacity-90 transition-opacity pointer-events-none" />

                    {/* Top Left: Album Name Chip */}
                    <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-white/90 font-mono border border-white/15">
                        {photo.album}
                      </span>
                    </div>

                    {/* Top Right: Favorite & Info Buttons */}
                    <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5">
                      <button
                        onClick={(e) => toggleFavorite(e, photo.id)}
                        className={`p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                          isFav
                            ? "bg-rose-500 text-white shadow-md scale-105"
                            : "bg-black/40 hover:bg-black/60 text-white/80 border border-white/15 opacity-0 group-hover:opacity-100"
                        }`}
                        title="Favorite"
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                      </button>

                      <span className="p-2 rounded-full bg-black/40 text-white/80 border border-white/15 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                        <Info className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    {/* Bottom Bar: Location & Date */}
                    <div className="absolute bottom-3.5 inset-x-3.5 p-3.5 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15 text-white pointer-events-none space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#e5c07b] font-sans">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-[#e5c07b]" />
                        <span className="truncate">{photo.location}</span>
                      </div>

                      <h3 className="font-serif text-lg font-medium tracking-wide text-white leading-snug truncate">
                        {photo.title}
                      </h3>

                      <div className="flex items-center justify-between text-[11px] font-mono text-white/60 pt-0.5">
                        <span>{photo.cityRegion}</span>
                        <span>{photo.capturedDate.split("·")[0]}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Photos Multi-Page Selection (4 photos per page) */}
            <PaginationBar
              currentPage={photosPage}
              totalPages={totalPhotoPages}
              totalItems={filteredPhotos.length}
              itemsPerPage={photosPerPage}
              onPageChange={handlePhotosPageChange}
              label="photos"
            />
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-8 p-6 rounded-3xl ios-glass flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5e5953] dark:text-[#a9a5b8] border border-[#dbd2c4] dark:border-white/10">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-[#b18a79]/15 dark:bg-[#e5c07b]/15 text-[#b18a79] dark:text-[#e5c07b]">
              <Camera className="w-4 h-4" />
            </span>
            <span>
              Curated field library by Joy Karmakar. 4 items per page with continuous multi-page selection. Click any photo to view full optical metadata and field notes.
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#8f8880] dark:text-[#736f82]">
            {photoSeries.length} Geotagged Photographs · {photoAlbums.length} Album Series
          </span>
        </div>

      </div>
    </section>
  );
}

export default PhotoGallery;
