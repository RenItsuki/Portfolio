/**
 * ============================================================================
 * SKILLS & MASTERY TREE DATA
 * ============================================================================
 * 
 * Customize, add, or remove skills displayed in the celestial circling
 * skill astrolabe on the Hero section.
 * 
 * TO ADD A NEW SKILL:
 *   Add an object to the `skills` array.
 *   Note: If you omit `angle`, the astrolabe automatically spaces all skills
 *   evenly around the full 360-degree circle!
 * 
 * TO REMOVE A SKILL:
 *   Simply delete or comment out the skill object from the array.
 */

import { 
  Code2, 
  Palette, 
  Megaphone, 
  Globe, 
  Camera, 
  Sparkles, 
  Users,
  Cpu,
  Layers,
  Terminal,
  Shield,
  Zap
} from "lucide-react";

export const skills = [
  {
    id: "tech",
    name: "TECH & AI",
    level: "Lv. 99",
    angle: -90, // 12 o'clock (top)
    icon: Code2,
    color: "from-amber-400 to-orange-500",
    bgLight: "bg-amber-100/90 text-amber-900 border-amber-400/60",
    bgDark: "dark:bg-amber-950/80 dark:text-amber-200 dark:border-amber-400/50",
    tagline: "Build neural engines that shape tomorrow.",
    manaCost: "Sub-45ms Latency",
    cooldown: "Instant ONNX",
    perk: "On-Device YOLO26n & CameraX Spatial Audio Matrix",
    rating: "★★★★★"
  },
  {
    id: "design",
    name: "3D & DESIGN",
    level: "Lv. 90",
    angle: -141.43, // ~10:15 (top-left)
    icon: Palette,
    color: "from-purple-400 to-pink-500",
    bgLight: "bg-purple-100/90 text-purple-900 border-purple-400/60",
    bgDark: "dark:bg-purple-950/80 dark:text-purple-200 dark:border-purple-400/50",
    tagline: "Procedural PBR shaders & photoreal realms.",
    manaCost: "Cycles 512-Sample",
    cooldown: "Continuous",
    perk: "Subsurface Scattering & Geometry Nodes Mastery",
    rating: "★★★★★"
  },
  {
    id: "marketing",
    name: "MARKETING",
    level: "Lv. 99",
    angle: -192.86, // ~8:30 (mid-left)
    icon: Megaphone,
    color: "from-emerald-400 to-teal-500",
    bgLight: "bg-emerald-100/90 text-emerald-900 border-emerald-400/60",
    bgDark: "dark:bg-emerald-950/80 dark:text-emerald-200 dark:border-emerald-400/50",
    tagline: "Viral distribution & cultural storytelling.",
    manaCost: "120M+ Reach",
    cooldown: "Global Cast",
    perk: "Nukkad Ki Awaazein & Cultural Outreach Campaigns",
    rating: "★★★★★"
  },
  {
    id: "outreach",
    name: "OUTREACH",
    level: "Lv. 90",
    angle: -244.29, // ~7:00 (lower-left)
    icon: Globe,
    color: "from-amber-600 to-yellow-600",
    bgLight: "bg-amber-50 text-amber-900 border-amber-600/40",
    bgDark: "dark:bg-yellow-950/70 dark:text-amber-200 dark:border-yellow-600/50",
    tagline: "Build bridges. Expand impact beyond borders.",
    manaCost: "40 Public Venues",
    cooldown: "Real-Time",
    perk: "All-India Collegiate & Guild Partnerships",
    rating: "★★★★☆"
  },
  {
    id: "media",
    name: "MEDIA & OPTICS",
    level: "Lv. 90",
    angle: -295.71, // ~4:15 (lower-right)
    icon: Camera,
    color: "from-violet-500 to-indigo-600",
    bgLight: "bg-indigo-100/90 text-indigo-900 border-indigo-400/60",
    bgDark: "dark:bg-indigo-950/80 dark:text-indigo-200 dark:border-indigo-400/50",
    tagline: "Capture moments. Freeze the decisive millisecond.",
    manaCost: "600mm Lenscraft",
    cooldown: "1/2500s Shutter",
    perk: "Avian Aerodynamics & Macro Dew Refraction",
    rating: "★★★★★"
  },
  {
    id: "events",
    name: "EVENTS & HACKS",
    level: "Lv. 95",
    angle: -347.14, // ~2:30 (mid-right)
    icon: Sparkles,
    color: "from-yellow-400 to-amber-500",
    bgLight: "bg-yellow-100/90 text-yellow-900 border-yellow-400/60",
    bgDark: "dark:bg-yellow-950/80 dark:text-yellow-200 dark:border-yellow-400/50",
    tagline: "Orchestrate hackathons & legendary experiences.",
    manaCost: "1,000+ Participants",
    cooldown: "12h Non-stop",
    perk: "CodeFest 2.0 & Techfest Embedded Systems Leadership",
    rating: "★★★★☆"
  },
  {
    id: "more",
    name: "& SYSTEMS",
    level: "Lv. 95",
    angle: -398.57, // ~1:15 (top-right, same as -38.57°)
    icon: Users,
    color: "from-cyan-400 to-blue-500",
    bgLight: "bg-cyan-100/90 text-cyan-900 border-cyan-400/60",
    bgDark: "dark:bg-cyan-950/80 dark:text-cyan-200 dark:border-cyan-400/50",
    tagline: "Orchestrate 1,500+ performers with fault tolerance.",
    manaCost: "High Precision",
    cooldown: "Active Aura",
    perk: "Distributed Systems Architecture & Stagecraft",
    rating: "★★★★★"
  }
];

// Helper to provide accessible fallback icons
export const skillIcons = {
  Code2,
  Palette,
  Megaphone,
  Globe,
  Camera,
  Sparkles,
  Users,
  Cpu,
  Layers,
  Terminal,
  Shield,
  Zap
};
