/**
 * ============================================================================
 * PHOTOGRAPHY & FIELD VISUALS DATA
 * ============================================================================
 * 
 * Powered 100% dynamically by your Google Sheet!
 * Connects directly to the 'Photos' tab in your Google Sheet.
 * Direct Google Drive file sharing links are automatically converted into
 * high-speed direct CDN images.
 */

import { getSectionSheetUrl, getSectionTabName, GOOGLE_SHEETS_CONFIG } from "./googleSheetsConfig";

export const GOOGLE_SHEETS_PHOTOS_URL = getSectionSheetUrl("photos") || GOOGLE_SHEETS_CONFIG.masterUrl;
export const GOOGLE_SHEETS_PHOTOS_TAB = getSectionTabName("photos") || "Photos";

// All placeholder mock photos and stock albums have been removed as requested.
// Photography loads dynamically from your live Google Sheet.
export const photoAlbums = [];
export const photoSeries = [];
