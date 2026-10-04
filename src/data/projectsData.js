/**
 * ============================================================================
 * PROJECTS & QUEST CASE STUDIES DATA
 * ============================================================================
 * 
 * Powered 100% dynamically by your Google Sheet!
 * Connects directly to the 'Projects' tab in your Google Sheet.
 */

import { getSectionSheetUrl, getSectionTabName, GOOGLE_SHEETS_CONFIG } from "./googleSheetsConfig";

export const GOOGLE_SHEETS_PROJECTS_URL = getSectionSheetUrl("projects") || GOOGLE_SHEETS_CONFIG.masterUrl;
export const GOOGLE_SHEETS_PROJECTS_TAB = getSectionTabName("projects") || "Projects";

// All placeholder mock projects have been removed as requested.
// Projects load dynamically from your live Google Sheet.
export const caseStudies = [];

// Project Filter Categories with short labels and matchers
export const projectCategories = [
  { id: "all", label: "ALL PROJECTS", match: "All" },
  { id: "edge-ai", label: "⚡ EDGE AI & CV", match: "Edge AI" },
  { id: "3d-art", label: "✦ 3D GRAPHICS", match: "3D Art" },
  { id: "ml", label: "⬡ ML & ANALYTICS", match: "Machine Learning" },
  { id: "creative", label: "◈ CREATIVE MEDIA", match: "Creative Strategy" },
  { id: "web", label: "✦ WEB SYSTEMS", match: "Web Engineering" }
];

// Preserved for compatibility
export const sectors = [];
export const districtData = [];
export const routeSegments = [];
