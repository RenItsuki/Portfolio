/**
 * ============================================================================
 * GOOGLE DRIVE & GOOGLE SHEETS CONNECTOR (CMS POWERED FOR ENTIRE PORTFOLIO)
 * ============================================================================
 * 
 * - Stories: Dynamically loads stories & screenplay formatting
 * - Projects: Dynamically loads case studies & live quest constellation
 * - Photography: Dynamically loads photos, auto-generates albums & EXIF
 * - Skills: Dynamically loads celestial astrolabe skills & perks
 * - Method 3: Converts Google Drive file share links into high-speed direct CDN images
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
  Zap,
  Flame,
  Scroll,
  Compass,
  Brain,
  Database,
  Wrench,
  BookOpen
} from "lucide-react";

/**
 * Extracts the Google Sheet ID from any Google Sheet URL or raw ID
 */
export function extractGoogleSheetId(input) {
  if (!input || typeof input !== "string") return null;
  const trimmed = input.trim();
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) return match[1];
  if (/^[a-zA-Z0-9_-]{20,}$/.test(trimmed)) return trimmed;
  return null;
}

/**
 * METHOD 3: Normalizes Google Drive image sharing links into direct Google CDN URLs
 */
export function normalizeGoogleDriveImageUrl(url) {
  if (!url || typeof url !== "string") {
    return "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80";
  }

  const trimmed = url.trim();

  // If already standard non-Google Drive image URL
  if (!trimmed.includes("drive.google.com") && !trimmed.includes("docs.google.com")) {
    return trimmed;
  }

  // Extract file ID
  const fileIdMatch = 
    trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);

  if (fileIdMatch && fileIdMatch[1]) {
    const fileId = fileIdMatch[1];
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  return trimmed;
}

/**
 * Resolves any video URL (YouTube, Vimeo, Google Drive video, direct MP4/WebM)
 * into the appropriate playback descriptor (iframe embed or native video element)
 */
export function getVideoEmbedInfo(url) {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  // 1. YouTube video
  const ytMatch = 
    trimmed.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  if (ytMatch && ytMatch[1]) {
    return {
      type: "iframe",
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0`
    };
  }

  // 2. Vimeo video
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      type: "iframe",
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`
    };
  }

  // 3. Google Drive video preview
  const driveMatch = 
    trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i) ||
    trimmed.match(/docs\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i);
  if (driveMatch && driveMatch[1]) {
    return {
      type: "iframe",
      embedUrl: `https://drive.google.com/file/d/${driveMatch[1]}/preview`
    };
  }

  // 4. Direct video file or media stream
  return {
    type: "video",
    src: trimmed
  };
}

/**
 * Universally parses summary lyrics from:
 * - Alt + Enter line breaks (\r\n, \n, \r) from Google Sheets & Excel
 * - Pipe symbols (|)
 * - Array of strings
 * - Numbered/bulleted lists
 */
export function parseLyrics(input, fallbackExcerpt = "") {
  // 1. If already an array of lines
  if (Array.isArray(input)) {
    const cleaned = input
      .flatMap((item) => {
        if (typeof item === "string") {
          return item
            .replace(/\r\n/g, "\n")
            .replace(/\r/g, "\n")
            .split(/[\n|]+/)
            .map((s) => s.trim().replace(/^[\d+.)•\-*]+\s*/, ""))
            .filter(Boolean);
        }
        return item ? [String(item).trim()] : [];
      })
      .filter((line) => line.length > 0);

    if (cleaned.length > 0) return cleaned;
  }

  // 2. If a multi-line or pipe-delimited string
  if (typeof input === "string" && input.trim().length > 0) {
    const normalized = input
      .replace(/\\n/g, "\n")
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n");

    const lines = normalized
      .split(/[\n|]+/)
      .map((line) => line.trim().replace(/^[\d+.)•\-*]+\s*/, ""))
      .filter((line) => line.length > 0);

    if (lines.length > 0) return lines;
  }

  // 3. Fallback: extract summary from excerpt
  if (fallbackExcerpt && typeof fallbackExcerpt === "string" && fallbackExcerpt.trim().length > 0) {
    const firstSentence = fallbackExcerpt.trim().split(/(?<=[.?!])\s+/)[0] || fallbackExcerpt.trim();
    return [
      firstSentence,
      "Words woven across time, memory, and quiet devotion.",
      "Click the card to open the paginated book reader."
    ];
  }

  return [
    "A quiet thought whispered before time takes us in different directions.",
    "Click the card to open the paginated book reader."
  ];
}

/**
 * Automatically splits long story prose or screenplay text into balanced book pages for the reader.
 * Handles both double-spaced paragraphs and single Alt+Enter dialogue lines, preserving line breaks.
 */
export function autoPaginateContent(title, subtitle, contentText) {
  if (!contentText) return [];

  // Normalize all line breaks from Google Sheets (Alt+Enter = \r\n, \n, or \r)
  const normalized = contentText.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
  if (!normalized) return [];

  // Split into lines
  const lines = normalized.split("\n").map((l) => l.trim());

  // Collapse 3+ consecutive blank lines down to at most 1 blank line
  const rawLines = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === "") {
      if (rawLines.length > 0 && rawLines[rawLines.length - 1] !== "") {
        rawLines.push("");
      }
    } else {
      rawLines.push(lines[i]);
    }
  }

  if (rawLines.length === 0) return [];

  // Group lines into readable pages of ~10-15 dialogue blocks or ~220 words
  const pages = [];
  let currentBlocks = [];
  let currentWords = 0;
  let pageNumber = 1;

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];
    const words = line ? line.split(/\s+/).length : 0;

    // Check if line indicates a major scene transition
    const isMajorBreak = 
      line.includes("playing at her funeral") || 
      line.includes("Sometimes in the darkest of places") ||
      line.startsWith("WHITEBOARD —") ||
      line.startsWith("[Act") ||
      line.startsWith("[Scene");

    if ((currentWords + words > 220 || isMajorBreak) && currentBlocks.length >= 4) {
      // Trim any trailing blank line from previous page
      while (currentBlocks.length > 0 && currentBlocks[currentBlocks.length - 1] === "") {
        currentBlocks.pop();
      }

      if (currentBlocks.length > 0) {
        pages.push({
          pageNumber,
          chapter: pageNumber === 1 ? (subtitle || `${title} · Part I`) : `${title} · Part ${pageNumber}`,
          content: currentBlocks
        });
        pageNumber++;
      }

      // Do not start a new page with an empty blank line
      currentBlocks = line === "" ? [] : [line];
      currentWords = words;
    } else {
      // Do not start an empty page with an empty line
      if (line === "" && currentBlocks.length === 0) {
        continue;
      }
      currentBlocks.push(line);
      currentWords += words;
    }
  }

  // Trim any trailing blank line from final page
  while (currentBlocks.length > 0 && currentBlocks[currentBlocks.length - 1] === "") {
    currentBlocks.pop();
  }

  if (currentBlocks.length > 0) {
    pages.push({
      pageNumber,
      chapter: pageNumber === 1 ? (subtitle || `${title} · Part I`) : `${title} · Part ${pageNumber}`,
      content: currentBlocks
    });
  }

  return pages;
}

/**
 * Normalizes category/type to match our filters:
 * "shortstory" | "longstory" | "poem" | "essay"
 */
function normalizeStoryType(rawType = "") {
  const t = rawType.toLowerCase().trim();
  if (t.includes("long") || t.includes("serial") || t.includes("novel")) return "longstory";
  if (t.includes("poem") || t.includes("verse") || t.includes("poetry")) return "poem";
  if (t.includes("essay") || t.includes("article") || t.includes("chronicle")) return "essay";
  return "shortstory"; // default to short story
}

/**
 * Returns a human-friendly category label
 */
function getCategoryLabel(type) {
  switch (type) {
    case "longstory": return "Long Story";
    case "poem": return "Poem";
    case "essay": return "Essay";
    default: return "Short Story";
  }
}

/**
 * Assigns a default accent glow color based on category
 */
function getDefaultAccentColor(type) {
  switch (type) {
    case "longstory": return "#38bdf8"; // Cyan
    case "poem": return "#f472b6";      // Rose
    case "essay": return "#a855f7";     // Purple
    default: return "#d97746";          // Warm Amber
  }
}

/**
 * METHOD 2: Fetches and parses stories from a public Google Sheet
 */
export async function fetchStoriesFromGoogleSheet(sheetUrlOrId) {
  const sheetId = extractGoogleSheetId(sheetUrlOrId);
  if (!sheetId) {
    throw new Error("Invalid Google Sheet link or ID. Please check the URL.");
  }

  // Cache busting query parameter & no-store cache to ensure real-time Google Sheet edits load instantly
  const endpoint = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&_t=${Date.now()}`;

  const response = await fetch(endpoint, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Google Sheet request failed with status: ${response.status}`);
  }

  const rawText = await response.text();

  // Strip Google's JSONP wrapper: /*O_o*/ google.visualization.Query.setResponse({...});
  const jsonMatch = rawText.match(/google\.visualization\.Query\.setResponse\(([\s\S]+)\);?$/);
  if (!jsonMatch || !jsonMatch[1]) {
    throw new Error("Could not parse Google Sheet response. Ensure Sheet sharing is set to 'Anyone with the link can view'.");
  }

  const parsed = JSON.parse(jsonMatch[1]);
  const table = parsed.table;
  if (!table || !table.rows || table.rows.length === 0) {
    return [];
  }

  // Map header column indices
  const headers = {};
  table.cols.forEach((col, idx) => {
    if (col && col.label) {
      headers[col.label.toLowerCase().replace(/[^a-z0-9]/g, "")] = idx;
    }
  });

  // Check if row 0 has header strings
  let startRowIndex = 0;
  const firstRowCells = table.rows[0]?.c || [];
  const hasHeaderRow = firstRowCells.some(
    (cell) => cell && typeof cell.v === "string" && ["title", "content", "story", "type", "category"].includes(cell.v.toLowerCase().trim())
  );

  if (hasHeaderRow) {
    firstRowCells.forEach((cell, idx) => {
      if (cell && cell.v) {
        const key = String(cell.v).toLowerCase().replace(/[^a-z0-9]/g, "");
        headers[key] = idx;
      }
    });
    startRowIndex = 1;
  }

  // Helper to extract cell value
  const getVal = (row, ...aliases) => {
    for (const alias of aliases) {
      const idx = headers[alias];
      if (idx !== undefined && row.c && row.c[idx] && row.c[idx].v !== null && row.c[idx].v !== undefined) {
        return String(row.c[idx].v).trim();
      }
    }
    return "";
  };

  const stories = [];

  for (let r = startRowIndex; r < table.rows.length; r++) {
    const row = table.rows[r];
    if (!row || !row.c) continue;

    const title = getVal(row, "title", "name", "storytitle", "heading");
    const content = getVal(row, "content", "story", "body", "text");

    // Skip empty rows
    if (!title && !content) continue;

    const subtitle = getVal(row, "subtitle", "tagline", "subheading");
    const rawType = getVal(row, "category", "type", "tag", "genre");
    const normalizedType = normalizeStoryType(rawType);
    const categoryLabel = getCategoryLabel(normalizedType);

    const rawLyrics = getVal(row, "summarylyrics", "lyrics", "summary", "beats");
    const excerpt = getVal(row, "excerpt", "description", "synopsis") || (content ? content.slice(0, 180) + "..." : "");
    const rawImage = getVal(row, "coverimage", "image", "cover", "photo", "img");
    const coverImage = normalizeGoogleDriveImageUrl(rawImage);
    const accentColor = getVal(row, "accentcolor", "color", "accent") || getDefaultAccentColor(normalizedType);
    const date = getVal(row, "date", "published", "year") || "Recent Archive";
    const readTime = getVal(row, "readtime", "readingtime", "duration") || `${Math.max(2, Math.round(content.split(/\s+/).length / 200))} min read`;

    // Universal Alt + Enter & Pipe lyrics parsing
    const lyrics = parseLyrics(rawLyrics, excerpt || title);

    // Auto-paginate content into chapters/pages for the book reader
    const pages = autoPaginateContent(title, subtitle, content);

    stories.push({
      id: `gsheet-${r}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      title: title || "Untitled Story",
      subtitle: subtitle || categoryLabel,
      type: normalizedType,
      category: categoryLabel,
      date,
      readTime,
      tag: categoryLabel,
      coverImage,
      accentColor,
      excerpt,
      lyrics,
      content,
      pages: pages.length > 0 ? pages : undefined,
      isFromGoogleSheet: true
    });
  }

  return stories;
}

/**
 * ============================================================================
 * 🛠️ PROJECTS & CASE STUDIES FROM GOOGLE SHEET
 * ============================================================================
 */
export async function fetchProjectsFromGoogleSheet(sheetUrlOrId, tabName = "Projects") {
  const sheetId = extractGoogleSheetId(sheetUrlOrId);
  if (!sheetId) return [];

  const tabParam = tabName ? `&sheet=${encodeURIComponent(tabName)}` : "";
  const endpoint = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json${tabParam}&_t=${Date.now()}`;

  try {
    const response = await fetch(endpoint, { cache: "no-store" });
    if (!response.ok) return [];

    const rawText = await response.text();
    const jsonMatch = rawText.match(/google\.visualization\.Query\.setResponse\(([\s\S]+)\);?$/);
    if (!jsonMatch || !jsonMatch[1]) return [];

    const parsed = JSON.parse(jsonMatch[1]);
    const table = parsed.table;
    if (!table || !table.rows || table.rows.length === 0) return [];

    // Map header column indices
    const headers = {};
    table.cols.forEach((col, idx) => {
      if (col && col.label) {
        headers[col.label.toLowerCase().replace(/[^a-z0-9]/g, "")] = idx;
      }
    });

    let startRowIndex = 0;
    const firstRowCells = table.rows[0]?.c || [];
    const hasHeaderRow = firstRowCells.some(
      (cell) => cell && typeof cell.v === "string" && ["title", "project", "name", "role", "summary", "category"].includes(cell.v.toLowerCase().trim())
    );

    if (hasHeaderRow) {
      firstRowCells.forEach((cell, idx) => {
        if (cell && cell.v) {
          const key = String(cell.v).toLowerCase().replace(/[^a-z0-9]/g, "");
          headers[key] = idx;
        }
      });
      startRowIndex = 1;
    }

    // Safety check: verify this is actually a Projects sheet and not Google fallback to Sheet1
    const isProjectSheet = 
      headers["role"] !== undefined || 
      headers["summary"] !== undefined || 
      headers["posterimage"] !== undefined || 
      headers["demourl"] !== undefined || 
      headers["githuburl"] !== undefined || 
      headers["tags"] !== undefined ||
      headers["impact"] !== undefined;

    if (!isProjectSheet) {
      return [];
    }

    const getVal = (row, ...aliases) => {
      for (const alias of aliases) {
        const idx = headers[alias];
        if (idx !== undefined && row.c && row.c[idx] && row.c[idx].v !== null && row.c[idx].v !== undefined) {
          return String(row.c[idx].v).trim();
        }
      }
      return "";
    };

    const projects = [];

    for (let r = startRowIndex; r < table.rows.length; r++) {
      const row = table.rows[r];
      if (!row || !row.c) continue;

      const title = getVal(row, "title", "name", "project", "heading");
      if (!title) continue;

      const subtitle = getVal(row, "subtitle", "tagline", "pitch");
      const category = getVal(row, "category", "sector", "field", "type") || "Edge AI & Computer Vision";
      const year = getVal(row, "year", "date") || "2026";
      const role = getVal(row, "role", "position") || "Lead Architect";
      const summary = getVal(row, "summary", "description", "body", "about");
      const impact = getVal(row, "impact", "metric", "result", "outcome");
      const rawTags = getVal(row, "tags", "tech", "technologies", "skills");
      const tags = rawTags ? rawTags.split(/[,|;]+/).map((t) => t.trim()).filter(Boolean) : ["AI", "Web", "Design"];
      const rawImage = getVal(row, "posterimage", "image", "cover", "photo", "img", "thumbnail");
      const posterImage = normalizeGoogleDriveImageUrl(rawImage);
      const videoPreviewUrl = getVal(row, "videopreviewurl", "videourl", "video");
      const demoUrl = getVal(row, "demourl", "liveurl", "url", "link", "site");
      const githubUrl = getVal(row, "githuburl", "repo", "github", "source");
      const rawHighlights = getVal(row, "highlights", "keypoints", "features");
      const highlights = rawHighlights ? rawHighlights.split(/[\n|;]+/).map((h) => h.trim().replace(/^[-•*]\s*/, "")).filter(Boolean) : [];
      const previewType = getVal(row, "previewtype", "simulator") || "iframe";

      projects.push({
        id: `proj-${r}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        title,
        subtitle: subtitle || category,
        category,
        year,
        role,
        summary: summary || subtitle || title,
        impact: impact || `${year} Production Deployment`,
        tags,
        posterImage,
        videoPreviewUrl: videoPreviewUrl ? videoPreviewUrl.trim() : "",
        videoPlaceholder: posterImage,
        demoUrl: demoUrl ? demoUrl.trim() : "",
        githubUrl: githubUrl ? githubUrl.trim() : "",
        previewType,
        highlights: highlights.length > 0 ? highlights : [
          "High-performance architecture with modern reactive interface",
          "Responsive cross-device design with fluid interactions",
          "Optimized execution and graceful degradation"
        ],
        isFromGoogleSheet: true
      });
    }

    return projects;
  } catch (err) {
    console.warn("Could not load Google Sheet projects:", err);
    return [];
  }
}

/**
 * ============================================================================
 * 📸 FIELD PHOTOGRAPHY FROM GOOGLE SHEET
 * ============================================================================
 */
export async function fetchPhotosFromGoogleSheet(sheetUrlOrId, tabName = "Photos") {
  const sheetId = extractGoogleSheetId(sheetUrlOrId);
  if (!sheetId) return [];

  const tabParam = tabName ? `&sheet=${encodeURIComponent(tabName)}` : "";
  const endpoint = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json${tabParam}&_t=${Date.now()}`;

  try {
    const response = await fetch(endpoint, { cache: "no-store" });
    if (!response.ok) return [];

    const rawText = await response.text();
    const jsonMatch = rawText.match(/google\.visualization\.Query\.setResponse\(([\s\S]+)\);?$/);
    if (!jsonMatch || !jsonMatch[1]) return [];

    const parsed = JSON.parse(jsonMatch[1]);
    const table = parsed.table;
    if (!table || !table.rows || table.rows.length === 0) return [];

    const headers = {};
    table.cols.forEach((col, idx) => {
      if (col && col.label) {
        headers[col.label.toLowerCase().replace(/[^a-z0-9]/g, "")] = idx;
      }
    });

    let startRowIndex = 0;
    const firstRowCells = table.rows[0]?.c || [];
    const hasHeaderRow = firstRowCells.some(
      (cell) => cell && typeof cell.v === "string" && ["title", "photo", "image", "imageurl", "driveurl", "location"].includes(cell.v.toLowerCase().trim())
    );

    if (hasHeaderRow) {
      firstRowCells.forEach((cell, idx) => {
        if (cell && cell.v) {
          const key = String(cell.v).toLowerCase().replace(/[^a-z0-9]/g, "");
          headers[key] = idx;
        }
      });
      startRowIndex = 1;
    }

    // Safety check: verify this is actually a Photos sheet
    const isPhotoSheet = 
      headers["imageurl"] !== undefined || 
      headers["image"] !== undefined || 
      headers["photo"] !== undefined || 
      headers["driveurl"] !== undefined || 
      headers["album"] !== undefined || 
      headers["location"] !== undefined;

    if (!isPhotoSheet) {
      return [];
    }

    const getVal = (row, ...aliases) => {
      for (const alias of aliases) {
        const idx = headers[alias];
        if (idx !== undefined && row.c && row.c[idx] && row.c[idx].v !== null && row.c[idx].v !== undefined) {
          return String(row.c[idx].v).trim();
        }
      }
      return "";
    };

    const photos = [];

    for (let r = startRowIndex; r < table.rows.length; r++) {
      const row = table.rows[r];
      if (!row || !row.c) continue;

      const rawImage = getVal(row, "imageurl", "image", "photo", "driveurl", "pic", "link", "url");
      if (!rawImage) continue;

      const title = getVal(row, "title", "name", "caption") || "Field Photograph";
      const category = getVal(row, "category", "genre", "type") || "Scenery";
      const album = getVal(row, "album", "series", "collection") || "Field Visuals";
      const location = getVal(row, "location", "place") || "Field Sanctuary";
      const cityRegion = getVal(row, "cityregion", "city", "region", "state", "country") || "India";
      const coordinates = getVal(row, "coordinates", "gps") || "22.5726° N, 88.3639° E";
      const capturedDate = getVal(row, "date", "captureddate", "time") || "Recent Archive";
      const year = getVal(row, "year") || (capturedDate.match(/\d{4}/)?.[0] || "2026");
      const aspect = getVal(row, "aspect", "orientation")?.toLowerCase() || "landscape";
      const rawTags = getVal(row, "tags", "keywords");
      const tags = rawTags ? rawTags.split(/[,|;]+/).map((t) => t.trim()).filter(Boolean) : [category, album];
      const note = getVal(row, "note", "description", "caption", "story") || "";
      const backupStatus = getVal(row, "backupstatus", "backup", "exif") || "Google Drive CDN Synchronized";

      const imageUrl = normalizeGoogleDriveImageUrl(rawImage);
      const rawThumb = getVal(row, "thumbnailurl", "thumbnail", "thumb");
      const thumbnailUrl = rawThumb ? normalizeGoogleDriveImageUrl(rawThumb) : imageUrl;

      photos.push({
        id: `photo-${r}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        title,
        album,
        category,
        location,
        cityRegion,
        coordinates,
        capturedDate,
        year,
        imageUrl,
        thumbnailUrl,
        aspect,
        tags,
        backupStatus,
        note,
        isFromGoogleSheet: true
      });
    }

    return photos;
  } catch (err) {
    console.warn("Could not load Google Sheet photos:", err);
    return [];
  }
}

/**
 * Derives album series dynamically from any photo array (auto-detects albums & covers)
 */
export function deriveAlbumsFromPhotos(photosList = []) {
  if (!photosList || photosList.length === 0) return [];
  const albumsMap = new Map();
  photosList.forEach((photo) => {
    const albumName = photo.album || "Field Archive";
    if (!albumsMap.has(albumName)) {
      albumsMap.set(albumName, {
        id: `album-${albumName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        title: albumName,
        category: photo.category || "Field Archive",
        location: photo.location || photo.cityRegion || "Field Location",
        year: photo.year || "2026",
        coverPhoto: photo.imageUrl,
        collagePhotos: [photo.imageUrl],
        count: 0,
        photoCount: 0,
        description: photo.note || `A curated photographic series documenting ${albumName.toLowerCase()}.`,
        accentColor: "#b18a79"
      });
    }
    const albumObj = albumsMap.get(albumName);
    albumObj.count++;
    albumObj.photoCount++;
    if (albumObj.collagePhotos.length < 3 && !albumObj.collagePhotos.includes(photo.imageUrl)) {
      albumObj.collagePhotos.push(photo.imageUrl);
    }
  });
  return Array.from(albumsMap.values());
}

/**
 * ============================================================================
 * ⚡ SKILLS & MASTERY TREE FROM GOOGLE SHEET
 * ============================================================================
 */
export async function fetchSkillsFromGoogleSheet(sheetUrlOrId, tabName = "Skills") {
  const sheetId = extractGoogleSheetId(sheetUrlOrId);
  if (!sheetId) return [];

  const tabParam = tabName ? `&sheet=${encodeURIComponent(tabName)}` : "";
  const endpoint = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json${tabParam}&_t=${Date.now()}`;

  try {
    const response = await fetch(endpoint, { cache: "no-store" });
    if (!response.ok) return [];

    const rawText = await response.text();
    const jsonMatch = rawText.match(/google\.visualization\.Query\.setResponse\(([\s\S]+)\);?$/);
    if (!jsonMatch || !jsonMatch[1]) return [];

    const parsed = JSON.parse(jsonMatch[1]);
    const table = parsed.table;
    if (!table || !table.rows || table.rows.length === 0) return [];

    const headers = {};
    table.cols.forEach((col, idx) => {
      if (col && col.label) {
        headers[col.label.toLowerCase().replace(/[^a-z0-9]/g, "")] = idx;
      }
    });

    let startRowIndex = 0;
    const firstRowCells = table.rows[0]?.c || [];
    const hasHeaderRow = firstRowCells.some(
      (cell) => cell && typeof cell.v === "string" && ["name", "skill", "level", "rating", "perk", "tagline"].includes(cell.v.toLowerCase().trim())
    );

    if (hasHeaderRow) {
      firstRowCells.forEach((cell, idx) => {
        if (cell && cell.v) {
          const key = String(cell.v).toLowerCase().replace(/[^a-z0-9]/g, "");
          headers[key] = idx;
        }
      });
      startRowIndex = 1;
    }

    // Safety check: verify this is actually a Skills sheet
    const isSkillSheet = 
      headers["level"] !== undefined || 
      headers["rating"] !== undefined || 
      headers["perk"] !== undefined || 
      headers["tagline"] !== undefined ||
      headers["skill"] !== undefined;

    if (!isSkillSheet) {
      return [];
    }

    const getVal = (row, ...aliases) => {
      for (const alias of aliases) {
        const idx = headers[alias];
        if (idx !== undefined && row.c && row.c[idx] && row.c[idx].v !== null && row.c[idx].v !== undefined) {
          return String(row.c[idx].v).trim();
        }
      }
      return "";
    };

    const skillsList = [];

    for (let r = startRowIndex; r < table.rows.length; r++) {
      const row = table.rows[r];
      if (!row || !row.c) continue;

      const name = getVal(row, "name", "skill", "title");
      if (!name) continue;

      const level = getVal(row, "level", "grade", "lv") || "Lv. 99";
      const tagline = getVal(row, "tagline", "description", "summary") || "Mastery in field craft and execution.";
      const rating = getVal(row, "rating", "stars") || "★★★★★";
      const perk = getVal(row, "perk", "specialty", "highlight") || "Field Expertise & Architecture";
      const manaCost = getVal(row, "manacost", "metric", "cost") || "Production Ready";
      const cooldown = getVal(row, "cooldown", "cadence") || "Continuous";
      const colorKey = getVal(row, "color", "theme", "gradient");
      const iconKey = getVal(row, "icon", "symbol");
      const rawAngle = getVal(row, "angle", "position");

      const colorConfig = getSkillColorConfig(colorKey, r);
      const IconComp = getSkillIcon(iconKey, name);

      skillsList.push({
        id: `skill-${r}-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        name,
        level,
        angle: rawAngle ? parseFloat(rawAngle) : undefined,
        icon: IconComp,
        color: colorConfig.color,
        bgLight: colorConfig.bgLight,
        bgDark: colorConfig.bgDark,
        tagline,
        manaCost,
        cooldown,
        perk,
        rating,
        isFromGoogleSheet: true
      });
    }

    return skillsList;
  } catch (err) {
    console.warn("Could not load Google Sheet skills:", err);
    return [];
  }
}

/**
 * Intelligent Icon matcher for skills from Google Sheet keywords
 */
export function getSkillIcon(iconKey = "", skillName = "") {
  const key = `${iconKey} ${skillName}`.toLowerCase();
  if (key.includes("code") || key.includes("dev") || key.includes("program") || key.includes("software")) return Code2;
  if (key.includes("palette") || key.includes("design") || key.includes("3d") || key.includes("art") || key.includes("ui") || key.includes("ux")) return Palette;
  if (key.includes("megaphone") || key.includes("market") || key.includes("growth") || key.includes("media") || key.includes("pr")) return Megaphone;
  if (key.includes("globe") || key.includes("outreach") || key.includes("network") || key.includes("world")) return Globe;
  if (key.includes("camera") || key.includes("photo") || key.includes("optics") || key.includes("video")) return Camera;
  if (key.includes("cpu") || key.includes("ai") || key.includes("ml") || key.includes("deep") || key.includes("neural")) return Cpu;
  if (key.includes("layers") || key.includes("system") || key.includes("architect")) return Layers;
  if (key.includes("terminal") || key.includes("cli") || key.includes("backend") || key.includes("cloud")) return Terminal;
  if (key.includes("shield") || key.includes("sec") || key.includes("cyber")) return Shield;
  if (key.includes("zap") || key.includes("speed") || key.includes("perf")) return Zap;
  if (key.includes("brain")) return Brain;
  if (key.includes("data") || key.includes("sql")) return Database;
  if (key.includes("users") || key.includes("team") || key.includes("lead")) return Users;
  return Sparkles;
}

/**
 * Color and styling matcher for celestial skill nodes
 */
export function getSkillColorConfig(colorKey = "", index = 0) {
  const palette = [
    {
      color: "from-amber-400 to-orange-500",
      bgLight: "bg-amber-100/90 text-amber-900 border-amber-400/60",
      bgDark: "dark:bg-amber-950/80 dark:text-amber-200 dark:border-amber-400/50"
    },
    {
      color: "from-purple-400 to-pink-500",
      bgLight: "bg-purple-100/90 text-purple-900 border-purple-400/60",
      bgDark: "dark:bg-purple-950/80 dark:text-purple-200 dark:border-purple-400/50"
    },
    {
      color: "from-emerald-400 to-teal-500",
      bgLight: "bg-emerald-100/90 text-emerald-900 border-emerald-400/60",
      bgDark: "dark:bg-emerald-950/80 dark:text-emerald-200 dark:border-emerald-400/50"
    },
    {
      color: "from-sky-400 to-blue-500",
      bgLight: "bg-sky-100/90 text-sky-900 border-sky-400/60",
      bgDark: "dark:bg-sky-950/80 dark:text-sky-200 dark:border-sky-400/50"
    },
    {
      color: "from-violet-500 to-indigo-600",
      bgLight: "bg-violet-100/90 text-violet-900 border-violet-400/60",
      bgDark: "dark:bg-violet-950/80 dark:text-violet-200 dark:border-violet-400/50"
    },
    {
      color: "from-rose-400 to-red-500",
      bgLight: "bg-rose-100/90 text-rose-900 border-rose-400/60",
      bgDark: "dark:bg-rose-950/80 dark:text-rose-200 dark:border-rose-400/50"
    },
    {
      color: "from-amber-600 to-yellow-600",
      bgLight: "bg-amber-50 text-amber-900 border-amber-600/40",
      bgDark: "dark:bg-yellow-950/70 dark:text-amber-200 dark:border-yellow-600/50"
    }
  ];

  const key = (colorKey || "").toLowerCase();
  if (key.includes("amber") || key.includes("orange")) return palette[0];
  if (key.includes("purple") || key.includes("pink")) return palette[1];
  if (key.includes("emerald") || key.includes("green") || key.includes("teal")) return palette[2];
  if (key.includes("sky") || key.includes("blue") || key.includes("cyan")) return palette[3];
  if (key.includes("violet") || key.includes("indigo")) return palette[4];
  if (key.includes("rose") || key.includes("red")) return palette[5];
  if (key.includes("yellow")) return palette[6];

  return palette[index % palette.length];
}

