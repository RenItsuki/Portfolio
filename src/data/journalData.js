/**
 * ============================================================================
 * JOURNAL, STORIES & POEMS DATA ARCHIVE
 * ============================================================================
 * 
 * Powered 100% dynamically by your Google Sheet!
 * All stories, category tags, summary lyrics, content, and Google Drive
 * cover images are fetched in real-time from your Google Sheet.
 */

import { getSectionSheetUrl, GOOGLE_SHEETS_CONFIG } from "./googleSheetsConfig";

export const GOOGLE_SHEETS_STORIES_URL = getSectionSheetUrl("stories") || GOOGLE_SHEETS_CONFIG.masterUrl;

// All placeholder mock stories have been removed as requested.
// Stories load exclusively from your live Google Sheet.
export const essays = [];
