# Joy Karmakar — Portfolio & Field Archive

A modern, high-performance personal portfolio and creative archive for **Joy Karmakar**, combining software engineering, celestial RPG aesthetics, and wildlife/field photography.

Powered by a **live Google Sheets CMS**, changes made in your spreadsheet reflect instantly on the live site without requiring rebuilds or redeployments.

---

## 🌟 Key Features

### 1. 📊 Live Google Sheets CMS
The entire portfolio synchronizes directly with a centralized Google Sheet in real time:
- **Projects**: Project codex, challenges, tech relics, metrics, live demo URLs, video walkthroughs, and repository links.
- **Photography**: Photo gallery with categories (`Flowers`, `Animals`, `Birds`, `Scenery`), stories, and full optical camera EXIF metadata.
- **Skills**: Mastery trees with disciplines, proficiency percentages, and loot tier badges.
- **Stories / Journals**: Editorial essays and field notes with full formatting and line-break preservation.

### 2. 🌌 Celestial RPG Astrolabe (Projects Section)
- **Interactive 2D Canvas & Cluster Mesh**: Pan, zoom, and explore projects arranged as celestial constellation nodes.
- **Archive Codex Modal**: Opens detailed case studies with S-Tier achievement telemetry, conquered boss challenges, acquired tech relics, and single-play golden reveal gleam.
- **Smart Dynamic Action Buttons**:
  - `Launch Sim ↗`: Automatically appears when a project has a `DemoUrl`.
  - `Chronicle Video`: Appears when a `VideoUrl` is provided (becomes primary button for video-only projects).
  - `Code Relics ↗`: Appears when a GitHub `RepoUrl` is provided.

### 3. 💻 Live Mini-Browser Simulator (`LiveMiniPreviewModal`)
- Real-time address bar displaying the authentic project `DemoUrl`.
- Interactive `<iframe>` viewport allowing visitors to browse and interact with the live website directly on the portfolio.
- **Device Frame Switcher**: Test responsive layouts on **Desktop (100%)**, **Tablet (768px)**, and **Mobile (390px)**.
- **Intelligent GitHub Link Detection**: Displays a clean repository bridge card when a URL points to GitHub (due to `X-Frame-Options: DENY`), with direct new-tab launch and interactive sandbox fallback.

### 4. 🎬 Chronicle Video Preview (`VideoPreviewModal`)
- Integrated video player supporting YouTube, Vimeo, Google Drive video previews, and direct `.mp4` video files.
- Modal header and footer with quick links to live demo and source code relics.

### 5. 📷 Wildlife Photography & Optical EXIF Lightbox
- High-resolution gallery filtered by `Flowers`, `Animals`, `Birds`, and `Scenery`.
- Fullscreen Lightbox displaying comprehensive camera optical metadata:
  - **Camera Body**, **Lens Model**, **Aperture (f-stop)**, **Shutter Speed**, **ISO**, and **Focal Length**.
  - Interactive filmstrip strip and keyboard arrow navigation.

### 6. 📖 Editorial Journal & Stories Reader Drawer
- Clean, distraction-free reading mode with support for line breaks, paragraphs, and timestamps.
- Estimated reading time and category badges.

### 7. 🎨 Organic Minimalist & RPG Theme
- Earth-toned palette balancing warm amber `#d97746`, deep obsidian `#0c0d10`, and warm parchment tones.
- Full Light & Dark mode support with persistence.

---

## 📋 Google Sheets CMS Setup

The portfolio is linked to your master Google Sheet via [`src/data/googleSheetsConfig.js`](src/data/googleSheetsConfig.js).

### Sheet URL Configuration
Ensure your Google Sheet is set to:
> **General Access: Anyone with the link can view**

The master spreadsheet should contain four tabs:

### 1. `Projects` Tab Columns
| Column Name | Description | Example |
|---|---|---|
| `Title` | Project name | `Unitainment` |
| `Subtitle` | Brief one-line pitch | `Next-Gen Entertainment Discovery Platform` |
| `Overview` (or `Description`) | Detailed summary of the project | `High-performance entertainment discovery platform...` |
| `Category` | Domain or sector | `Full-Stack Web` |
| `Role` | Your role on the project | `Lead Developer` |
| `Year` | Completion year | `2026` |
| `TechStack` (or `Tags`) | Comma-separated technologies | `React, TypeScript, Tailwind, Node.js` |
| `KeyFeatures` (or `Highlights`) | Comma-separated bullet points | `Zero-latency search, Responsive UI, OAuth2` |
| `Impact` (or `Challenge`) | Main engineering problem solved | `Optimized bundle load time by 60%` |
| `DemoUrl` | Live website or web app link | `https://unitainment.renitsuki.in` |
| `VideoUrl` | Demo video (YouTube, Drive, MP4) | `https://youtu.be/...` |
| `RepoUrl` (or `GithubUrl`) | Source code repository link | `https://github.com/RenItsuki/Unitainment` |
| `Thumbnail` (or `ImageUrl`) | Preview image (Direct URL or Drive link) | `https://drive.google.com/file/d/...` |

### 2. `Photos` Tab Columns
| Column Name | Description | Example |
|---|---|---|
| `Title` | Photo title | `Eurasian Kingfisher at Dawn` |
| `Category` | Photo category | `Birds` (or `Flowers`, `Animals`, `Scenery`) |
| `ImageUrl` | Image URL (Direct or Google Drive share link) | `https://drive.google.com/file/d/...` |
| `Camera` | Camera body model | `Sony Alpha 7 IV` |
| `Lens` | Lens used | `FE 200-600mm F5.6-6.3 G OSS` |
| `Aperture` | Aperture value | `f/6.3` |
| `ShutterSpeed` | Shutter speed | `1/2000s` |
| `ISO` | ISO value | `800` |
| `FocalLength` | Focal length | `600mm` |
| `Location` | Capture location | `Sundarbans, India` |
| `Date` | Capture date | `Oct 2025` |
| `Story` | Short narrative behind the shot | `Captured after 4 hours of stillness...` |

### 3. `Skills` Tab Columns
| Column Name | Description | Example |
|---|---|---|
| `Skill` (or `Name`) | Skill or technology | `React & Next.js` |
| `Category` | Skill discipline | `Frontend Sorcery` |
| `Proficiency` | Mastery percentage (0-100) | `95` |
| `Icon` | Lucide icon name | `Code2` |
| `Description` | Brief summary of expertise | `Building high-performance interactive interfaces` |

### 4. `Stories` (or `Sheet1`) Tab Columns
| Column Name | Description | Example |
|---|---|---|
| `Title` | Story / Journal title | `The Optics of Quiet Moments` |
| `Date` | Publication date | `Oct 2025` |
| `Category` | Category tag | `Philosophy & Craft` |
| `Excerpt` | One-sentence summary | `Reflections on patience in photography and code` |
| `Content` (or `Story`) | Full article text (supports line breaks) | Multi-line text content... |

> [!TIP]
> Google Drive file sharing links (`https://drive.google.com/file/d/.../view`) for photos, thumbnails, and videos are automatically transformed into direct streaming CDN URLs by `src/utils/googleDrive.js`.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Integration**: Google Sheets CSV & Visualization API via Fetch
- **Media Support**: Google Drive Direct CDN converter & YouTube/Vimeo embed parser

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ recommended)
- `npm` or `pnpm`

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/RenItsuki/Portfolio.git
   cd Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. Build for production:
   ```bash
   npm run build
   ```
   The compiled static files will be generated in `dist/`.

---

## 📁 Project Structure

```text
Portfolio/
├── public/                     # Static assets and favicon
├── src/
│   ├── components/             # UI Components
│   │   ├── AstrolabeCelestialMap.jsx # 2D Celestial canvas cluster map
│   │   ├── ProjectsSection.jsx # Astrolabe & project codex modal
│   │   ├── LiveMiniPreviewModal.jsx  # Interactive mini-browser simulation modal
│   │   ├── VideoPreviewModal.jsx     # Walkthrough video player modal
│   │   ├── PhotoGallery.jsx    # Wildlife & nature photo gallery
│   │   ├── PhotoLightbox.jsx   # Fullscreen EXIF optics viewer
│   │   ├── SkillsAstrolabe.jsx # Arcane skill tree & proficiency
│   │   ├── JournalSection.jsx  # Editorial field notes reader drawer
│   │   ├── HeroSection.jsx     # Hero introduction & telemetry
│   │   ├── ContactSection.jsx  # Telepathic contact form
│   │   └── ...
│   ├── data/
│   │   ├── googleSheetsConfig.js # Central Google Sheet URL & tab definitions
│   │   └── portfolioData.js    # Fallback offline portfolio data
│   ├── utils/
│   │   └── googleDrive.js      # Google Sheets CSV parser & Drive CDN converter
│   ├── App.jsx                 # Main application root
│   ├── index.css               # Design tokens, theme classes & RPG animations
│   └── main.jsx                # React DOM entrypoint
├── package.json
└── vite.config.js
```

---

## 📜 License

Created with passion by [Joy Karmakar](https://github.com/RenItsuki). All rights reserved.
