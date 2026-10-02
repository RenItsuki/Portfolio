/**
 * ============================================================================
 * HERO & CHARACTER CODEX DATA
 * ============================================================================
 * 
 * Customize all text, character stats, names carousel, and active quest
 * displayed in the Hero section of your portfolio.
 * 
 * TO ADD A NEW NAME PROFILE:
 *   Add an object to `heroProfiles` with { name: "Your Name", initials: "YN", title: "Your Title" }.
 * 
 * TO EDIT CHARACTER STATS:
 *   Modify or add items in `characterStats`.
 */

// Name Carousel: Cycles through these identities with matching initials and dissolve animations
export const heroProfiles = [
  { 
    name: "Joy Karmakar", 
    initials: "JK", 
    title: "Creative Technologist · AI & 3D · Visual Artist",
    classTitle: "GRAND SYSTEMS ARCHITECT"
  },
  { 
    name: "Ren Itsuki", 
    initials: "RI", 
    title: "Visual Artist & Cinematic CGI Director",
    classTitle: "PROCEDURAL 3D WEAVER"
  },
  { 
    name: "Jay Karmakar", 
    initials: "JK", 
    title: "Applied AI Researcher & Systems Engineer",
    classTitle: "EDGE INTELLIGENCE PIONEER"
  },
  { 
    name: "Kirai Yami", 
    initials: "KY", 
    title: "Cybernetics Architect & Creative Director",
    classTitle: "DISTRIBUTED SYSTEMS SOVEREIGN"
  }
];

// Character Stats HUD (curiosity, system speed, 3D realism, team orchestration, reach & impact)
export const characterStats = [
  {
    id: "curiosity",
    label: "CURIOSITY",
    value: "90",
    percent: 90,
    color: "from-[#b18a79] to-[#dfb29d] dark:from-[#b6a2c9] dark:to-[#e5c07b]",
    icon: "Sparkles"
  },
  {
    id: "speed",
    label: "SYSTEM SPEED",
    value: "<45ms",
    percent: 90,
    color: "from-sky-500 to-cyan-400",
    icon: "Code2"
  },
  {
    id: "realism",
    label: "3D REALISM",
    value: "85",
    percent: 85,
    color: "from-amber-500 to-yellow-400",
    icon: "Shield"
  },
  {
    id: "orchestration",
    label: "TEAM ORCHESTRATION",
    value: "90",
    percent: 90,
    color: "from-purple-500 to-pink-500",
    icon: "Users"
  },
  {
    id: "reach",
    label: "REACH & IMPACT",
    value: "120M+",
    percent: 99,
    color: "from-rose-500 to-red-600",
    icon: "Flame"
  }
];

// RPG Level, EXP & Buff info
export const characterLevel = {
  level: "LEVEL 99",
  exp: "EXP: 999,999 / ∞",
  status: "BUFFED",
  tag: "Lv.99"
};

// Top Bar Header & Badges
export const heroHeader = {
  chapter: "CREATIVE SYSTEMS & ARCHITECT CODEX",
  expedition: "GAIA & CYBERNETICS EXPEDITION",
  questBadge: "QUEST ACTIVE · LV. 99",
  classBadge: "CLASS: GRAND SYSTEMS ARCHITECT • CREATIVE TECHNOLOGIST"
};

// Hero Core Quotes & Lore Inscriptions

export const heroQuotes = {
  tagline: "I build the things I wish existed.",
  subheading: "Code the logic. Shape the world. Leave something behind.",
  inscription: "I don't want to just experience worlds. I want to create them.",
  playerLabel: "PLAYER: JOY/JAY/REN/KIRAI"
};


// Active Quest HUD Panel

export const activeQuest = {
  category: "MAIN STORY",
  title: "Too many ideas. Not enough time.",
  primaryObjective:
    "Turn curiosity into code, imagination into worlds, and ideas into something real.",
  difficulty: "DIFFICULTY: SSS-RANK",
  status: "IN PROGRESS"
};
