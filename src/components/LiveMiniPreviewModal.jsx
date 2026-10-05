import React, { useState, useEffect } from "react";
import { 
  X, 
  ExternalLink, 
  RotateCw, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Copy, 
  Check, 
  Maximize2, 
  Minimize2,
  Lock,
  Code2
} from "lucide-react";
import { InteractiveAppSandbox } from "./InteractiveAppSandbox";

export function LiveMiniPreviewModal({ project, isOpen, onClose }) {
  const [device, setDevice] = useState("desktop"); // desktop, tablet, mobile
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(project.demoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 400);
  };

  const simulatedUrl = `https://joykarmakar.dev/apps/${project.id}`;

  const getDeviceContainerClass = () => {
    if (device === "mobile") {
      return "w-[390px] h-[720px] max-h-[82vh] border-[10px] border-[#1d2028] rounded-[36px] shadow-2xl overflow-hidden ring-1 ring-white/10";
    }
    if (device === "tablet") {
      return "w-[768px] max-w-[95%] h-[680px] max-h-[82vh] border-[8px] border-[#1d2028] rounded-[24px] shadow-2xl overflow-hidden ring-1 ring-white/10";
    }
    return "w-full h-full rounded-b-xl overflow-hidden";
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md transition-all duration-300 animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className={`relative flex flex-col bg-[#0f1115] border border-white/15 text-white shadow-2xl transition-all duration-300 overflow-hidden ${
          isFullscreen 
            ? "w-full h-full rounded-none" 
            : "w-full max-w-6xl h-[88vh] rounded-2xl"
        }`}
      >
        {/* Browser Top Window Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#15181f] border-b border-white/10 select-none">
          {/* Window Control Buttons */}
          <div className="flex items-center gap-2">
            <button 
              onClick={onClose}
              className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:brightness-110 flex items-center justify-center group"
              title="Close window"
            >
              <X className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 text-black/80" />
            </button>
            <button 
              onClick={() => setDevice("tablet")}
              className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] hover:brightness-110"
              title="Resize to tablet"
            />
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="w-3.5 h-3.5 rounded-full bg-[#27c93f] hover:brightness-110 flex items-center justify-center group"
              title="Toggle fullscreen"
            >
              <Maximize2 className="w-2 h-2 opacity-0 group-hover:opacity-100 text-black/80" />
            </button>
            <span className="hidden sm:inline ml-2 text-xs font-mono font-medium text-amber-400/90 truncate max-w-[260px] tracking-wide">
              QUEST SIMULATOR // {project.title}
            </span>
          </div>

          {/* Browser Address Bar */}
          <div className="flex-1 max-w-lg mx-3">
            <div className="flex items-center gap-2 bg-[#0c0d10] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/70">
              <Lock className="w-3.5 h-3.5 text-[#b6a2c9] shrink-0" />
              <span className="font-mono text-[11px] truncate flex-1 text-white/80">
                {simulatedUrl}
              </span>
              <button 
                onClick={handleRefresh}
                className={`p-1 hover:text-white transition-all cursor-pointer ${isRefreshing ? "animate-spin text-[#b6a2c9]" : ""}`}
                title="Reload preview"
              >
                <RotateCw className="w-3 h-3" />
              </button>
              <button 
                onClick={handleCopyUrl}
                className="p-1 hover:text-white transition-colors cursor-pointer"
                title="Copy URL"
              >
                {copied ? <Check className="w-3 h-3 text-[#b6a2c9]" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* Device Size Toggles & Actions */}
          <div className="flex items-center gap-1.5">
            <div className="hidden md:flex items-center bg-[#0c0d10] border border-white/10 rounded-lg p-0.5 mr-2">
              <button
                onClick={() => setDevice("desktop")}
                className={`p-1.5 rounded-md transition-all cursor-pointer ${
                  device === "desktop" ? "bg-white/15 text-white" : "text-white/50 hover:text-white"
                }`}
                title="Desktop View (100%)"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDevice("tablet")}
                className={`p-1.5 rounded-md transition-all cursor-pointer ${
                  device === "tablet" ? "bg-white/15 text-white" : "text-white/50 hover:text-white"
                }`}
                title="Tablet View (768px)"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDevice("mobile")}
                className={`p-1.5 rounded-md transition-all cursor-pointer ${
                  device === "mobile" ? "bg-white/15 text-white" : "text-white/50 hover:text-white"
                }`}
                title="Mobile View (390px)"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>

            {Boolean(project.demoUrl?.trim()) && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-[#4b396f] hover:bg-[#5a4584] border border-[#b6a2c9]/30 text-white transition-colors"
              >
                <span>Open live</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 text-white/60 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
              title="Toggle fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Live Viewport Area */}
        <div className="relative flex-1 bg-[#090a0d] flex items-center justify-center overflow-auto p-2 sm:p-4">
          <div className={`${getDeviceContainerClass()} transition-all duration-300 flex flex-col bg-[#111317]`}>
            {/* If mobile, show simulated notch */}
            {device === "mobile" && (
              <div className="h-6 bg-[#1d2028] flex items-center justify-center shrink-0">
                <div className="w-20 h-3.5 bg-black rounded-full" />
              </div>
            )}

            <div className="flex-1 w-full h-full relative overflow-hidden">
              {isRefreshing ? (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-[#0d0e12] text-white/60">
                  <RotateCw className="w-6 h-6 animate-spin text-[#b6a2c9]" />
                  <span className="text-xs font-mono">Reloading sandbox...</span>
                </div>
              ) : (
                <InteractiveAppSandbox projectId={project.id} />
              )}
            </div>

            {/* Mobile bottom home indicator bar */}
            {device === "mobile" && (
              <div className="h-4 bg-[#1d2028] flex items-center justify-center shrink-0">
                <div className="w-24 h-1 bg-white/30 rounded-full" />
              </div>
            )}
          </div>
        </div>

        {/* Bottom Status & Project Quick Info */}
        <div className="px-4 py-2.5 bg-[#14161d] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-white/60 select-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#b6a2c9] animate-ping" />
            <span className="text-white/80 font-medium">Interactive Mini-Window:</span>
            <span>Click, drag, or interact with this application live inside this frame.</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline font-mono text-[11px] text-white/40">
              Viewport: {device.toUpperCase()}
            </span>
            <div className="flex items-center gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-white/70 border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
