import React, { useState, useEffect } from "react";
import { Heart, ArrowUp, Compass } from "lucide-react";
import { studioProfile as personalInfo } from "../data/profileData";

export function Footer() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#dbd2c4] dark:border-[#38374d] py-12 bg-[#eae5d9]/30 dark:bg-[#151720]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-[#5e5953] dark:text-[#a9a5b8]">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="Joy Karmakar Logo"
              className="w-6 h-6 rounded-lg object-cover border border-[#b18a79]/40 dark:border-[#e5c07b]/40 shadow-sm"
            />
            <span className="font-serif font-semibold text-[#202020] dark:text-[#f3f2f7]">Joy Karmakar</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
          <span className="hidden sm:inline text-[#c8bfb8] dark:text-[#38374d]">•</span>
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b18a79] dark:bg-[#b6a2c9] animate-pulse" />
            <span>New Delhi & Ranchi, India {currentTime && `· ${currentTime} IST`}</span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-[#5e5953] dark:text-[#a9a5b8]">
          <span>Crafted with organic typography & mindful code</span>
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-[#eae5d9]/70 dark:bg-[#212530] hover:bg-[#ded6c7] dark:hover:bg-[#2e3242] text-[#202020] dark:text-[#f3f2f7] border border-[#dbd2c4] dark:border-[#38374d] transition-colors cursor-pointer shadow-sm"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
