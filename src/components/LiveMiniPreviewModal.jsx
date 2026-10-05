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
  Code2,
  Sparkles
} from "lucide-react";
import { InteractiveAppSandbox } from "./InteractiveAppSandbox";

export function LiveMiniPreviewModal({ project, isOpen, onClose }) {
  const [device, setDevice] = useState("desktop"); // desktop, tablet, mobile
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [forceSandbox, setForceSandbox] = useState(false);

  useEffect(() => {
    setForceSandbox(false);
  }, [project?.id, project?.demoUrl]);

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

  const rawDemoUrl = (project.demoUrl || "").trim();
  const hasDemoUrl = Boolean(rawDemoUrl);
  const isGitHubUrl = hasDemoUrl && rawDemoUrl.toLowerCase().includes("github.com");
  
  // Use the exact demoUrl from Google Sheets when present, otherwise fallback to app route
  const displayUrl = hasDemoUrl 
    ? rawDemoUrl 
    : `https://joykarmakar.dev/apps/${project.slug || project.id}`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(displayUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setRefreshKey((prev) => prev + 1);
    setTimeout(() => setIsRefreshing(false), 400);
  };

  const getDeviceContainerClass = () => {
    if (device === "mobile") {
      return "w-[390px] h-[720px] max-h-[82vh] border-[10px] border-[#1d2028] rounded-[36px] shadow-2xl overflow-hidden ring-1 ring-white/10";
    }
    if (device === "tablet") {
      return "w-[768px] max-w-[95%] h-[680px] max-h-[82vh] border-[8px] border-[#1d2028] rounded-[24px] shadow-2xl overflow-hidden ring-1 ring-white/10";
    }
    return "w-full h-full rounded-b-xl overflow-hidden";
  };

  const getHostDomain = (url) => {
    try {
      const u = new URL(url.startsWith("http") ? url : `https://${url}`);
      return u.hostname;
    } catch {
      return url;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md transition-all duration-300 animate-in fade-in"
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
              LIVE SIMULATOR // {project.title}
            </span>
          </div>

          {/* Browser Address Bar */}
          <div className="flex-1 max-w-lg mx-3">
            <div className="flex items-center gap-2 bg-[#0c0d10] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/70">
              <Lock className="w-3.5 h-3.5 text-[#b6a2c9] shrink-0" />
              <span className="font-mono text-[11px] truncate flex-1 text-white/90" title={displayUrl}>
                {displayUrl}
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

            {hasDemoUrl && (
              <a
                href={rawDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-[#b18a79] hover:bg-[#9c7766] dark:bg-[#e5c07b] dark:hover:bg-[#d4ac57] text-white dark:text-black font-semibold transition-all shadow-sm hover:scale-102"
                title="Launch in new browser tab"
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

            <div className="flex-1 w-full h-full relative overflow-hidden bg-black/40">
              {isRefreshing ? (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-[#0d0e12] text-white/60">
                  <RotateCw className="w-6 h-6 animate-spin text-[#b6a2c9]" />
                  <span className="text-xs font-mono">Reloading view...</span>
                </div>
              ) : hasDemoUrl && !isGitHubUrl && !forceSandbox ? (
                <div className="w-full h-full relative flex flex-col bg-white">
                  <iframe
                    key={refreshKey}
                    src={rawDemoUrl}
                    title={project.title}
                    className="w-full h-full border-0 bg-white"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    loading="lazy"
                  />
                  {/* Subtle float overlay banner */}
                  <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/75 hover:bg-black/90 backdrop-blur-md text-[11px] font-mono text-white/80 border border-white/20 shadow-lg pointer-events-auto transition-opacity opacity-75 hover:opacity-100">
                    <span className="hidden sm:inline">Host: {getHostDomain(rawDemoUrl)}</span>
                    <a
                      href={rawDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-300 hover:text-amber-200 underline font-semibold flex items-center gap-1 ml-1"
                    >
                      <span>Open tab ↗</span>
                    </a>
                  </div>
                </div>
              ) : hasDemoUrl && isGitHubUrl && !forceSandbox ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#0d0e12] text-white">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-[#e5c07b] shadow-xl">
                    <Code2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-serif font-bold text-white mb-2">
                    {project.title} · Repository Link
                  </h4>
                  <p className="max-w-md text-xs sm:text-sm text-white/70 mb-4 font-mono leading-relaxed">
                    This project's live demo URL connects directly to GitHub:
                    <br />
                    <span className="text-[#e5c07b] break-all">{rawDemoUrl}</span>
                  </p>
                  <p className="max-w-md text-xs text-white/50 mb-6">
                    GitHub restricts direct inline iframe embedding due to frame security headers (X-Frame-Options: DENY). You can launch the repository in a new tab or test the interactive simulation below.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={rawDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#b18a79] via-[#9c7564] to-[#b18a79] dark:from-[#e5c07b] dark:via-[#d97706] dark:to-[#e5c07b] text-white dark:text-black font-mono font-bold text-xs flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-transform"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Open Repository on GitHub ↗</span>
                    </a>
                    <button
                      onClick={() => setForceSandbox(true)}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#b6a2c9]" />
                      <span>Try Interactive Simulation</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full relative">
                  <InteractiveAppSandbox projectId={project.slug || project.id} />
                  {isGitHubUrl && forceSandbox && (
                    <button
                      onClick={() => setForceSandbox(false)}
                      className="absolute top-2 right-2 px-2.5 py-1 rounded bg-black/80 hover:bg-black text-[11px] font-mono text-white/80 border border-white/20 transition-colors z-20 cursor-pointer"
                    >
                      ← Back to Repo Details
                    </button>
                  )}
                </div>
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
            {hasDemoUrl && !isGitHubUrl ? (
              <span>Rendering live deployment from <strong className="text-amber-300 font-mono">{getHostDomain(rawDemoUrl)}</strong></span>
            ) : (
              <span>Click, drag, or interact with this application live inside this frame.</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline font-mono text-[11px] text-white/40">
              Viewport: {device.toUpperCase()}
            </span>
            <div className="flex items-center gap-1.5">
              {(project.tags || project.stack || []).slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-white/70 border border-white/5 font-mono"
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
