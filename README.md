# Joy Karmakar — Personal Portfolio & Field Archive

A modern, organic minimalist portfolio designed to showcase:
- **Software Projects** with interactive live mini-browser window execution & walkthrough video previews.
- **Wildlife & Nature Photography** categorized by Flowers, Animals, Birds, and Scenery with complete technical EXIF metadata (lens, focal length, shutter speed, aperture, ISO) and full-screen lightbox.
- **Field Notes & Journal** for essays bridging engineering craft, optics, and philosophy with an editorial reader drawer.
- **About & Identity** documenting your dual passion: software engineering & wildlife photography, gear bag, and interactive contact form.

---

## 🌿 Design Ethos
- **Organic Minimalist Aesthetics**: Earth tones (deep forest sage `#2e5a44`, warm terracotta/amber `#d97746`, deep obsidian `#0c0d10`, and warm alabaster `#faf9f6`).
- **Seamless Light & Dark Mode**: Respects system preferences with a 2-state toggle and FOUC prevention.
- **Editorial Typography**: Pairing Playfair Display serif headers with Plus Jakarta Sans body and JetBrains Mono for optical EXIF tags.

---

## 🚀 Getting Started

### 1. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Build for Production
```bash
npm run build
```
The optimized static build will be generated in `dist/`.

---

## 📁 How to Customize Your Content

All data is cleanly organized in [`src/data/portfolioData.js`](src/data/portfolioData.js):

- **Personal Bio & Links**: Update `personalInfo` (bio, email, stats, camera gear, tech skills, socials).
- **Projects**: Add or edit items in `projects` (title, summary, tags, live URLs, GitHub links, and demo videos).
- **Photos**: Add your own photographs in `photos` (specify category: `Flowers`, `Animals`, `Birds`, or `Scenery`, along with camera EXIF details like lens, aperture, shutter speed, and the story behind the shot).
- **Journal Entries**: Add essays to `journalEntries` (markdown supported).
