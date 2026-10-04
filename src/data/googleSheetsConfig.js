/**
 * ============================================================================
 * 🔗 CENTRAL GOOGLE SHEETS & GOOGLE DRIVE CONFIGURATION
 * ============================================================================
 * 
 * Your entire portfolio (Stories, Projects, Photo Gallery, and Skills)
 * is connected directly to Google Sheets and Google Drive!
 * 
 * Edit your Google Sheet at any time — changes appear live on your website
 * without needing any git commits or code changes!
 * 
 * You can keep everything in ONE single Google Spreadsheet with tabs:
 *   - Tab 1: "Stories" (or "Sheet1") -> Journal & literary works
 *   - Tab 2: "Projects"              -> Selected works & quests
 *   - Tab 3: "Photos"                -> Field photography gallery
 *   - Tab 4: "Skills"                -> Celestial mastery tree & skills
 * 
 * Or paste separate Google Sheet URLs below if you prefer individual sheets.
 */

export const GOOGLE_SHEETS_CONFIG = {
  // Master Spreadsheet Link (public with "Anyone with the link can view")
  masterUrl: "https://docs.google.com/spreadsheets/d/1BqN7OrBFSh_D5w26-4My6_5P6uWprQQeV9-mAVdBEWk/edit?usp=sharing",

  // Tab names in the master spreadsheet:
  tabs: {
    stories: "Stories",       // also checks Sheet1 (default)
    projects: "Projects",
    photos: "Photos",
    skills: "Skills"
  },

  // Optional: override individual section URLs if using separate spreadsheets (leave "" to use masterUrl)
  storiesUrl: "",
  projectsUrl: "",
  photosUrl: "",
  skillsUrl: ""
};

/**
 * Returns the effective Google Sheet URL for a given section
 */
export function getSectionSheetUrl(sectionKey) {
  const override = GOOGLE_SHEETS_CONFIG[`${sectionKey}Url`];
  if (override && override.trim().length > 0) {
    return override.trim();
  }
  return GOOGLE_SHEETS_CONFIG.masterUrl;
}

/**
 * Returns the tab name for a given section
 */
export function getSectionTabName(sectionKey) {
  return GOOGLE_SHEETS_CONFIG.tabs[sectionKey] || "";
}
