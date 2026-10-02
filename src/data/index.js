/**
 * ============================================================================
 * PORTFOLIO DATA ARCHITECTURE BARREL EXPORT
 * ============================================================================
 * 
 * All portfolio data is neatly organized into dedicated modular files:
 * 
 * 1. heroData.js      -> Hero profiles, stats, active quest, header quotes
 * 2. skillsData.js    -> Skills array, levels, perks, ratings, colors, icons
 * 3. projectsData.js  -> Case studies, sectors, districts, highway route segments
 * 4. photosData.js    -> Google Photos albums, geotagged photo series, EXIF notes
 * 5. journalData.js   -> Thought leadership essays, lyrics stream, content
 * 6. profileData.js   -> Studio profile, capabilities, recognitions, initiatives
 * 
 * You can import either from this index file:
 *   import { caseStudies, skills, heroProfiles } from '../data';
 * 
 * Or directly from the specific module:
 *   import { heroProfiles } from '../data/heroData';
 *   import { skills } from '../data/skillsData';
 *   import { caseStudies } from '../data/projectsData';
 *   import { photoSeries } from '../data/photosData';
 *   import { essays } from '../data/journalData';
 *   import { studioProfile } from '../data/profileData';
 */

export * from "./heroData";
export * from "./skillsData";
export * from "./projectsData";
export * from "./photosData";
export * from "./journalData";
export * from "./profileData";
