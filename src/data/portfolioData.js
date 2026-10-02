/**
 * ============================================================================
 * PORTFOLIO DATA - CENTRAL BRIDGE & BACKWARD COMPATIBILITY
 * ============================================================================
 * 
 * Note: Data has been modularized into separate, easy-to-edit files in this folder:
 * 
 * - src/data/heroData.js      -> Hero page profiles, character stats, quotes, quests
 * - src/data/skillsData.js    -> Skills list, levels, perks, icons, ratings
 * - src/data/projectsData.js  -> Projects with full details, sectors, map districts
 * - src/data/photosData.js    -> Photography series, Google Photos albums, metadata
 * - src/data/journalData.js   -> Essays, articles, streamed lyrics, reflections
 * - src/data/profileData.js   -> Studio bio, capabilities, recognitions, initiatives
 * 
 * Edit the specific file above whenever you want to add or change portfolio items.
 */

export * from "./heroData";
export * from "./skillsData";
export * from "./projectsData";
export * from "./photosData";
export * from "./journalData";
export * from "./profileData";

// Backward-compatible aliases for existing components
import { studioProfile } from "./profileData";
import { caseStudies } from "./projectsData";
import { photoSeries } from "./photosData";
import { essays } from "./journalData";

export const personalInfo = studioProfile;
export const actualProjects = caseStudies;
export const projects = caseStudies;
export const photos = photoSeries;
export const journalEntries = essays;
