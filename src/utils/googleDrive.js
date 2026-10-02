/**
 * ============================================================================
 * GOOGLE DRIVE & GOOGLE SHEETS CONNECTOR (METHOD 2 & 3)
 * ============================================================================
 * 
 * - Method 2: Loads stories dynamically from a public Google Sheet
 * - Method 3: Converts Google Drive file share links into high-speed direct CDN images
 */

/**
 * Extracts the Google Sheet ID from any Google Sheet URL or raw ID
 * Examples supported:
 *   - https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing
 *   - https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view
 *   - 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
 */
export function extractGoogleSheetId(input) {
  if (!input || typeof input !== "string") return null;
  const trimmed = input.trim();
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) return match[1];
  // If user pasted just the ID directly (alphanumeric, dashes, underscores, length > 15)
  if (/^[a-zA-Z0-9_-]{20,}$/.test(trimmed)) return trimmed;
  return null;
}

/**
 * METHOD 3: Normalizes Google Drive image sharing links into direct Google CDN URLs
 * 
 * Input examples:
 *   - https://drive.google.com/file/d/1xABC...XYZ/view?usp=sharing
 *   - https://drive.google.com/open?id=1xABC...XYZ
 *   - https://drive.google.com/uc?id=1xABC...XYZ
 * 
 * Output:
 *   - https://lh3.googleusercontent.com/d/1xABC...XYZ
 * (or returns original URL if not Google Drive)
 */
export function normalizeGoogleDriveImageUrl(url) {
  if (!url || typeof url !== "string") {
    return "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80";
  }

  const trimmed = url.trim();

  // If already standard non-Google Drive image URL (Unsplash, HTTPS image, etc.)
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
 * Universally parses summary lyrics from:
 * - Alt + Enter line breaks (\r\n, \n, \r) from Google Sheets & Excel
 * - Pipe symbols (|)
 * - Array of strings
 * - Numbered/bulleted lists (e.g. "1. Line \n 2. Line")
 * - Escaped \n literals
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

  // 2. If a multi-line or pipe-delimited string (e.g. cell with Alt+Enter in Google Sheets)
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
 * Handles both double-spaced paragraphs and single Alt+Enter dialogue lines.
 */
export function autoPaginateContent(title, subtitle, contentText) {
  if (!contentText) return [];

  // Normalize all line breaks from Google Sheets (Alt+Enter = \r\n or \n)
  const normalized = contentText.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
  if (!normalized) return [];

  // If text contains double newlines, split by \n\n. If only single newlines (e.g. dialogue/poetry), split by \n
  const rawParagraphs = normalized.includes("\n\n")
    ? normalized.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
    : normalized.split(/\n+/).map((p) => p.trim()).filter(Boolean);

  if (rawParagraphs.length === 0) return [];

  const pages = [];
  let currentPageParas = [];
  let currentWordCount = 0;
  let pageNumber = 1;

  for (let i = 0; i < rawParagraphs.length; i++) {
    const para = rawParagraphs[i];
    const words = para.trim().split(/\s+/).length;

    // Split if accumulated words exceed ~240 words and we already have at least 2 paragraphs/dialogue cues
    if (currentWordCount + words > 260 && currentPageParas.length >= 2) {
      pages.push({
        pageNumber,
        chapter: pageNumber === 1 ? (subtitle || `${title} · Part I`) : `${title} · Part ${pageNumber}`,
        content: currentPageParas
      });
      pageNumber++;
      currentPageParas = [para];
      currentWordCount = words;
    } else {
      currentPageParas.push(para);
      currentWordCount += words;
    }
  }

  if (currentPageParas.length > 0) {
    pages.push({
      pageNumber,
      chapter: pageNumber === 1 ? (subtitle || `${title} · Part I`) : `${title} · Part ${pageNumber}`,
      content: currentPageParas
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

  // Google Visualization API returns public JSON without needing any API key
  const endpoint = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

  const response = await fetch(endpoint);
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

  // Check if row 0 has header strings (common in Google Sheets when cols don't carry labels)
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
