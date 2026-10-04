/**
 * ============================================================================
 * SKILLS & MASTERY TREE DATA
 * ============================================================================
 * 
 * Powered 100% dynamically by your Google Sheet!
 * Connects directly to the 'Skills' tab in your Google Sheet.
 */

import { getSectionSheetUrl, getSectionTabName, GOOGLE_SHEETS_CONFIG } from "./googleSheetsConfig";

export const GOOGLE_SHEETS_SKILLS_URL = getSectionSheetUrl("skills") || GOOGLE_SHEETS_CONFIG.masterUrl;
export const GOOGLE_SHEETS_SKILLS_TAB = getSectionTabName("skills") || "Skills";

// All placeholder mock skills have been removed as requested.
// Skills load dynamically from your live Google Sheet.
export const skills = [];
