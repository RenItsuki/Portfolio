/**
 * ============================================================================
 * PROJECTS & QUEST CASE STUDIES DATA
 * ============================================================================
 * 
 * Customize, add, or remove projects, case studies, and floating quest orbs.
 * 
 * AUTOMATIC RANDOM PLACEMENT:
 *   You do NOT need to specify coordinates!
 *   The cosmos canvas automatically places the first project in the center,
 *   and clusters the other projects randomly around it in close proximity.
 *   Whenever you add a new project, it is placed automatically.
 * 
 * TO ADD A NEW PROJECT:
 *   Add an object to the `caseStudies` array below with:
 *     - id: unique string key (e.g. "my-project")
 *     - title: Project Title
 *     - subtitle: Brief one-line pitch
 *     - category: Category name:
 *         "Edge AI & Computer Vision"
 *         "3D Art & Computer Graphics"
 *         "Machine Learning & Analytics"
 *         "Creative Strategy & Digital Media"
 *         "Web Engineering & UI/UX"
 *     - year: e.g. "2026"
 *     - role: Your role
 *     - summary: In-depth paragraph description
 *     - impact: Highlighted outcome or metric
 *     - tags: Array of keywords/technologies
 *     - posterImage: URL to high-res screenshot or artwork
 *     - videoPreviewUrl: Direct MP4 or video stream URL
 *     - demoUrl: Live deployed URL
 *     - githubUrl: GitHub source repository URL
 *     - previewType: Simulator key ("via-lux-sim", "blender-donut-sim", "attrition-ml-sim", "theatre-audio-sim", "web-wizardry-sim", or "iframe")
 *     - highlights: Array of 3 key architectural highlights
 * 
 * TO REMOVE A PROJECT:
 *   Simply delete or comment out the project object from `caseStudies`.
 */

export const caseStudies = [
  {
    id: "via-lux",
    title: "Via-Lux",
    subtitle: "Real-Time Spatial Audio & Vision Assistant for Accessibility",
    category: "Edge AI & Computer Vision",
    year: "2026",
    role: "Lead Systems Architect",
    summary: "An on-device computer vision assistant engineered for the visually impaired. Rather than depending on high-latency cloud APIs, Via-Lux executes quantized YOLO26n models locally via ONNX Runtime and CameraX, dividing the visual field into a 3x3 spatial audio matrix with dynamic obstacle priority alerts.",
    impact: "Sub-45ms on-device inference latency with zero cloud dependency; real-time directional voice guidance.",
    tags: ["Android", "ONNX Runtime", "YOLO26n", "CameraX", "Edge AI", "Spatial Audio"],
    posterImage: "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=1200&q=80",
    videoPreviewUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    videoPlaceholder: "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://github.com/joy-karmakar/via-lux",
    githubUrl: "https://github.com/joy-karmakar/via-lux",
    previewType: "via-lux-sim",
    highlights: [
      "Quantized neural network execution on mobile edge eliminating network latency hazards",
      "3x3 spatial projection matrix translating optical bounding boxes into natural directional coordinates",
      "Dynamic acoustic alert engine with motion-vector expansion tracking to prioritize approaching hazards"
    ]
  },
  {
    id: "cinematic-donut-render",
    title: "Cinematic Realism in Blender",
    subtitle: "High-Fidelity 3D Environment & Material Choreography",
    category: "3D Art & Computer Graphics",
    year: "2026",
    role: "3D Artist & Technical Director",
    summary: "A study in photorealism and PBR optical physics modeled from scratch in Blender 5. Employs procedural Subsurface Scattering (SSS) for translucent sugar glazes, geometry-node sprinkle particle distribution, and cinematic 3-point studio lighting with camera depth-of-field.",
    impact: "Cycles 512-sample PBR render pipeline showcasing advanced material physics and topology.",
    tags: ["Blender 5", "Cycles Engine", "Procedural Shading", "Geometry Nodes", "3D Animation"],
    posterImage: "https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?auto=format&fit=crop&w=1200&q=80",
    videoPreviewUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    videoPlaceholder: "https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://github.com/joy-karmakar/blender-cycles-art",
    githubUrl: "https://github.com/joy-karmakar/blender-cycles-art",
    previewType: "blender-donut-sim",
    highlights: [
      "Custom Subsurface Scattering (SSS) shader setup simulating organic sugar and dough translucency",
      "Procedural bump and displacement mapping generating micro-surface pastry porosity",
      "Choreographed camera orbital motion path with focal blur and warm volumetric lighting"
    ]
  },
  {
    id: "havish-ml-attrition",
    title: "Workforce Retention Intelligence",
    subtitle: "Predictive Employee Churn Modeling for Havish M Consulting",
    category: "Machine Learning & Analytics",
    year: "2025 – 2026",
    role: "Machine Learning Intern",
    summary: "An 8-week corporate consulting engagement analyzing employee turnover across 1,400+ enterprise records. Rather than relying on blackbox libraries, I implemented mathematical logistic regression models from first principles to isolate overtime and job satisfaction as the primary attrition drivers.",
    impact: "Identified 4 strategic retention levers with statistically significant cost reduction for enterprise leadership.",
    tags: ["Python", "Logistic Regression from Scratch", "EDA", "Feature Importance", "Statistical Analysis"],
    posterImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    videoPreviewUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    videoPlaceholder: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://github.com/joy-karmakar/workforce-attrition-ml",
    githubUrl: "https://github.com/joy-karmakar/workforce-attrition-ml",
    previewType: "attrition-ml-sim",
    highlights: [
      "Handcrafted gradient descent optimization and sigmoid activation math without external ML frameworks",
      "Correlation matrix identifying overtime (r=0.24) and job satisfaction (r=-0.19) as dominant signals",
      "Structured executive presentation detailing data-driven retention policies"
    ]
  },
  {
    id: "nukkad-ki-awaazein",
    title: "Nukkad Ki Awaazein",
    subtitle: "Digital Street Theatre Preservation & National Reach",
    category: "Creative Strategy & Digital Media",
    year: "2026",
    role: "Head of Marketing & Creative Direction",
    summary: "A nationwide cultural preservation campaign uniting 40+ collegiate street-play teams to digitally record and preserve 100+ original musical compositions. Drove distribution strategy leading to 750K+ YouTube views and over 120M+ backtrack views on an original self-composition.",
    impact: "120M+ backtrack impressions, 100+ theatrical songs preserved for digital history.",
    tags: ["Cultural Preservation", "Digital Campaigns", "Audio Production", "Cultural Outreach", "Creative Direction"],
    posterImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    videoPreviewUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
    videoPlaceholder: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://youtube.com/@joykarmakar",
    githubUrl: "https://github.com/joy-karmakar",
    previewType: "theatre-audio-sim",
    highlights: [
      "Directed high-fidelity multi-track audio recording and digital mastering for 40+ street play teams",
      "Built multi-platform release campaigns resulting in 625% growth in digital viewership",
      "Preserved grassroots social commentary music through permanent open digital distribution"
    ]
  },
  {
    id: "web-wizardry-dps",
    title: "Web Wizardry",
    subtitle: "Award-Winning Pure CSS & Semantic Web Architecture",
    category: "Web Engineering & UI/UX",
    year: "2023",
    role: "Lead Designer & Developer",
    summary: "1st Prize Winner in the flagship inter-school Web Wizardry Competition at DPS Ranchi. Designed and coded a responsive, highly performant web portal emphasizing zero framework bloat, semantic HTML5, and fluid keyframe micro-interactions.",
    impact: "1st Place Winner across top schools; 100/100 performance & accessibility scores.",
    tags: ["HTML5", "CSS3", "JavaScript", "Interaction Design", "Winner"],
    posterImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    videoPreviewUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    videoPlaceholder: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://github.com/joy-karmakar/web-wizardry",
    githubUrl: "https://github.com/joy-karmakar/web-wizardry",
    previewType: "web-wizardry-sim",
    highlights: [
      "Lightweight semantic markup with sub-20ms rendering times and zero third-party dependencies",
      "Custom responsive CSS grid layouts adapting seamlessly across handheld and desktop screens",
      "Awarded 1st place for aesthetic refinement, accessibility, and clean code hygiene"
    ]
  },
  {
    id: "swarm-robotics-mesh",
    title: "Autonomous Swarm Robotics",
    subtitle: "Distributed Decentralized Mesh SLAM & Obstacle Navigation",
    category: "Edge AI & Computer Vision",
    year: "2026",
    role: "Autonomous Systems Researcher",
    summary: "Simulated peer-to-peer ad-hoc mesh networking for drone constellations exploring GPS-denied environments. Uses decentralized Kalman filters and local disparity maps to coordinate flight trajectories with zero single-point-of-failure.",
    impact: "Sub-20ms peer-to-peer collision avoidance synchronization across 32 active nodes.",
    tags: ["Robotics", "ROS 2", "Edge AI", "Mesh Network", "SLAM"],
    posterImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    videoPreviewUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    demoUrl: "https://github.com/joy-karmakar/swarm-robotics",
    githubUrl: "https://github.com/joy-karmakar/swarm-robotics",
    previewType: "iframe",
    highlights: [
      "Decentralized peer-to-peer consensus protocol maintaining swarm cohesion under packet drop",
      "Visual SLAM disparity map alignment across heterogeneous optical sensors",
      "Autonomous dynamic leader election during signal degradation"
    ]
  },
  {
    id: "procedural-dune-shader",
    title: "Procedural Dune Biome Shader",
    subtitle: "Real-Time Volumetric Sand Physics & Atmospheric Ray-Marching",
    category: "3D Art & Computer Graphics",
    year: "2026",
    role: "Graphics Programmer",
    summary: "WebGL 2 and GLSL implementation of procedural desert dunes using multi-octave Simplex noise, anisotropic sand specular highlights, and real-time Rayleigh/Mie atmospheric scattering.",
    impact: "Constant 60 FPS on mobile GPUs with dynamic time-of-day shadow marching.",
    tags: ["GLSL", "WebGL 2", "Ray-Marching", "Shaders", "PBR"],
    posterImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
    videoPreviewUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    demoUrl: "https://github.com/joy-karmakar/dune-shader",
    githubUrl: "https://github.com/joy-karmakar/dune-shader",
    previewType: "iframe",
    highlights: [
      "Multi-octave fractional Brownian motion generating wind-carved dune crests",
      "Analytic atmospheric light scattering for warm sunset color degradation",
      "Screen-space subsurface scattering for shimmering micro-grain highlights"
    ]
  },
  {
    id: "neural-audio-dsp",
    title: "Neural Audio DSP Matrix",
    subtitle: "Real-Time Spatial Harmonic Synthesizer & Acoustic Canvas",
    category: "Creative Strategy & Digital Media",
    year: "2026",
    role: "Audio Technologist",
    summary: "Interactive Web Audio API synthesizer translating cursor velocity and multi-touch vectors into generative microtonal ambient soundscapes, with dynamic convolution reverb and spatial binaural panning.",
    impact: "Zero audio glitching with Web Audio Worklet threads; 48kHz studio-grade DSP processing.",
    tags: ["Web Audio API", "DSP", "Interactive Sound", "Generative Art"],
    posterImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80",
    videoPreviewUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    demoUrl: "https://github.com/joy-karmakar/neural-dsp",
    githubUrl: "https://github.com/joy-karmakar/neural-dsp",
    previewType: "theatre-audio-sim",
    highlights: [
      "Low-latency Web Audio Worklet processing pipeline with zero garbage collection spikes",
      "Binaural head-related transfer function (HRTF) positioning sound sources in 3D sphere",
      "Procedural harmonic oscillator banks reacting organically to touch and mouse kinetics"
    ]
  }
];

// Project Filter Categories with short labels and matchers
export const projectCategories = [
  { id: "all", label: "ALL PROJECTS", match: "All" },
  { id: "edge-ai", label: "⚡ EDGE AI & CV", match: "Edge AI" },
  { id: "3d-art", label: "✦ 3D GRAPHICS", match: "3D Art" },
  { id: "ml", label: "⬡ ML & ANALYTICS", match: "Machine Learning" },
  { id: "creative", label: "◈ CREATIVE MEDIA", match: "Creative Strategy" },
  { id: "web", label: "✦ WEB SYSTEMS", match: "Web Engineering" }
];

// Preserved for compatibility
export const sectors = [];
export const districtData = [];
export const routeSegments = [];
