import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, 
  Eye, 
  Volume2, 
  RotateCw, 
  Sliders, 
  Layers, 
  Play, 
  Pause, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Compass, 
  Music, 
  TrendingUp, 
  Activity,
  Award
} from "lucide-react";

/**
 * Interactive Sandboxes rendered directly inside the mini-window browser
 * Tailored 100% to Joy Karmakar's actual projects
 */
export function InteractiveAppSandbox({ projectId }) {
  if (projectId === "via-lux") {
    return <ViaLuxSandbox />;
  }
  if (projectId === "cinematic-donut-render") {
    return <BlenderDonutSandbox />;
  }
  if (projectId === "havish-ml-attrition") {
    return <AttritionMLSandbox />;
  }
  if (projectId === "nukkad-ki-awaazein") {
    return <TheatreAudioSandbox />;
  }
  return <WebWizardrySandbox />;
}

// 1. VIA-LUX: AI Spatial Navigation Assistant with 3x3 Grid & Voice Alerts
function ViaLuxSandbox() {
  const [activeCell, setActiveCell] = useState(4); // Center cell
  const [detectedItem, setDetectedItem] = useState({
    name: "Pedestrian",
    confidence: "96.4%",
    distance: "1.8m",
    priority: "HIGH",
    coords: "Center Grid [1,1]"
  });
  const [voiceAlert, setVoiceAlert] = useState("Caution: Pedestrian detected, front center, 1.8 meters ahead.");
  const [isScanning, setIsScanning] = useState(true);

  const gridCells = [
    { id: 0, label: "Top-Left", defaultItem: "Overhead Sign", dist: "3.5m", conf: "89%" },
    { id: 1, label: "Top-Center", defaultItem: "Traffic Signal", dist: "8.2m", conf: "94%" },
    { id: 2, label: "Top-Right", defaultItem: "Tree Branch", dist: "2.9m", conf: "91%" },
    { id: 3, label: "Mid-Left", defaultItem: "Bicycle", dist: "2.4m", conf: "95%" },
    { id: 4, label: "Center", defaultItem: "Pedestrian", dist: "1.8m", conf: "97%" },
    { id: 5, label: "Mid-Right", defaultItem: "Parked Vehicle", dist: "4.1m", conf: "98%" },
    { id: 6, label: "Bottom-Left", defaultItem: "Curb Step", dist: "1.1m", conf: "93%" },
    { id: 7, label: "Bottom-Center", defaultItem: "Pavement Puddle", dist: "1.2m", conf: "90%" },
    { id: 8, label: "Bottom-Right", defaultItem: "Drainage Grate", dist: "1.5m", conf: "92%" }
  ];

  const handleSelectCell = (cell) => {
    setActiveCell(cell.id);
    const item = {
      name: cell.defaultItem,
      confidence: cell.conf,
      distance: cell.dist,
      priority: Number(cell.dist.replace("m", "")) < 2 ? "HIGH" : "NORMAL",
      coords: cell.label
    };
    setDetectedItem(item);
    setVoiceAlert(`Alert: ${item.name} at ${item.distance} in ${cell.label}.`);
  };

  return (
    <div className="w-full h-full bg-[#0a0c10] text-white flex flex-col font-sans select-none overflow-hidden">
      {/* App Bar */}
      <div className="px-4 py-2.5 bg-[#12151d] border-b border-white/10 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-semibold text-emerald-400">Via-Lux Core Engine</span>
          <span className="text-[10px] font-mono text-white/50 bg-white/10 px-2 py-0.5 rounded">
            YOLO26n + ONNX Runtime [3x3 Grid]
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-white/60">
          <span>CameraX 30fps</span>
          <span>•</span>
          <span className="text-emerald-400">Latency: 38ms</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Visual 3x3 Camera Grid Area */}
        <div className="relative flex-1 bg-black flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 filter contrast-125"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=1200&q=80')"
            }}
          />

          {/* 3x3 Spatial Grid Overlay */}
          <div className="relative z-10 w-full max-w-md aspect-square grid grid-cols-3 grid-rows-3 gap-2 p-2 border border-emerald-500/30 rounded-2xl bg-black/40 backdrop-blur-sm">
            {gridCells.map((cell) => {
              const isActive = activeCell === cell.id;
              return (
                <button
                  key={cell.id}
                  onClick={() => handleSelectCell(cell)}
                  className={`relative rounded-xl border flex flex-col items-center justify-between p-2 transition-all cursor-pointer ${
                    isActive
                      ? "border-emerald-400 bg-emerald-500/25 ring-2 ring-emerald-400/50 scale-[1.02]"
                      : "border-white/15 bg-white/5 hover:bg-white/15 hover:border-white/30"
                  }`}
                >
                  <span className="text-[9px] font-mono text-white/50">{cell.label}</span>
                  <div className="text-center">
                    <span className="text-xs font-semibold text-white block truncate">{cell.defaultItem}</span>
                    <span className="text-[10px] font-mono text-emerald-300">{cell.dist}</span>
                  </div>
                  <span className="text-[8px] font-mono text-white/40">{cell.conf}</span>
                </button>
              );
            })}
          </div>

          <div className="absolute bottom-3 left-4 text-[11px] font-mono text-white/60 bg-black/70 backdrop-blur px-2.5 py-1 rounded-md border border-white/10">
            👆 Click any cell on the 3x3 grid to test spatial detection & voice alert
          </div>
        </div>

        {/* Sidebar Diagnostics & Speech Output */}
        <div className="w-full md:w-80 bg-[#11141b] border-t md:border-t-0 md:border-l border-white/10 p-5 flex flex-col justify-between space-y-4 text-xs">
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold tracking-wider">
                Active Detected Target
              </span>
              <div className="flex items-center justify-between">
                <span className="text-base font-serif font-medium">{detectedItem.name}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                  detectedItem.priority === "HIGH" ? "bg-red-500/20 text-red-400 border border-red-500/40" : "bg-emerald-500/20 text-emerald-400"
                }`}>
                  {detectedItem.priority} PRIORITY
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1 text-white/70">
                <div>Distance: <strong className="text-white">{detectedItem.distance}</strong></div>
                <div>Confidence: <strong className="text-white">{detectedItem.confidence}</strong></div>
              </div>
            </div>

            {/* Android TextToSpeech simulated audio output */}
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <Volume2 className="w-4 h-4 animate-pulse" />
                <span>Android TextToSpeech Output</span>
              </div>
              <p className="font-mono text-xs text-emerald-200/90 italic bg-black/40 p-2.5 rounded-lg border border-emerald-500/20">
                "{voiceAlert}"
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 text-[11px] text-white/50 leading-relaxed font-mono">
            Designed by Joy Karmakar using CameraX and ONNX Runtime to provide real-time spatial accessibility without cloud reliance.
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. CINEMATIC DONUT RENDER (BLENDER 5): Interactive 3D Shading & Lighting Studio
function BlenderDonutSandbox() {
  const [rotation, setRotation] = useState(45);
  const [roughness, setRoughness] = useState(0.2);
  const [lightingPreset, setLightingPreset] = useState("warm");
  const [wireframe, setWireframe] = useState(false);

  const presets = {
    warm: { label: "Warm Studio Key", color: "from-amber-600/30 via-orange-950/40 to-black" },
    moody: { label: "Cinematic Teal/Orange", color: "from-teal-600/30 via-stone-900 to-black" },
    sunset: { label: "Golden Dusk", color: "from-rose-600/30 via-amber-950/40 to-black" }
  };

  return (
    <div className="w-full h-full bg-[#0d0e12] text-white flex flex-col font-sans select-none overflow-hidden">
      {/* Top Header */}
      <div className="px-4 py-2.5 bg-[#141720] border-b border-white/10 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400" />
          <span className="font-medium">Blender 5 · Cinematic Viewport & Render Passes</span>
        </div>
        <span className="font-mono text-[11px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
          Cycles 512 Samples · PBR SSS
        </span>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* 3D Viewport Simulation */}
        <div className={`relative flex-1 bg-gradient-to-tr ${presets[lightingPreset].color} flex items-center justify-center p-6 overflow-hidden`}>
          {/* Donut Model Representation */}
          <div
            className="relative flex items-center justify-center transition-all duration-300"
            style={{ transform: `rotate(${rotation}deg) scale(1.05)` }}
          >
            {/* Outer Pastry Body */}
            <div className={`w-52 h-52 sm:w-64 sm:h-64 rounded-full border-8 ${
              wireframe ? "border-amber-400 bg-transparent border-dashed" : "bg-gradient-to-tr from-[#8a4b26] via-[#c9783f] to-[#e6a265] border-[#5e3116]"
            } shadow-2xl flex items-center justify-center relative transition-all`}>
              
              {/* Glossy Sugar Glaze Layer with Subsurface Scattering effect */}
              {!wireframe && (
                <div
                  className="absolute inset-2 rounded-full bg-gradient-to-br from-[#f87171]/90 via-[#fb7185]/80 to-[#ec4899]/70 shadow-inner flex items-center justify-center"
                  style={{
                    filter: `drop-shadow(0 4px 6px rgba(0,0,0,0.4))`,
                    opacity: 1 - roughness * 0.4
                  }}
                >
                  {/* Procedural Sprinkles simulated with vibrant geometry pills */}
                  {[
                    { t: "15%", l: "30%", r: "20deg", c: "bg-blue-400" },
                    { t: "25%", l: "70%", r: "-45deg", c: "bg-yellow-300" },
                    { t: "65%", l: "20%", r: "60deg", c: "bg-emerald-400" },
                    { t: "75%", l: "60%", r: "-15deg", c: "bg-white" },
                    { t: "40%", l: "85%", r: "35deg", c: "bg-purple-400" },
                    { t: "80%", l: "35%", r: "75deg", c: "bg-yellow-400" }
                  ].map((s, idx) => (
                    <span
                      key={idx}
                      className={`absolute w-4 h-1.5 rounded-full ${s.c} shadow-md`}
                      style={{ top: s.t, left: s.l, transform: `rotate(${s.r})` }}
                    />
                  ))}
                </div>
              )}

              {/* Donut Center Hole */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#0d0e12] border-4 border-[#5e3116] shadow-2xl z-10" />
            </div>
          </div>

          <div className="absolute bottom-3 left-4 text-[11px] font-mono text-white/50 bg-black/60 px-2.5 py-1 rounded backdrop-blur border border-white/10">
            Viewport: {wireframe ? "Wireframe Mesh Topology" : "PBR Material Shading"}
          </div>
        </div>

        {/* Shading Controls */}
        <div className="w-full md:w-80 bg-[#12141a] border-t md:border-t-0 md:border-l border-white/10 p-5 space-y-5 text-xs">
          <div className="space-y-2">
            <span className="text-white/60">360° Camera Orbital Angle</span>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="360"
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
              <span className="font-mono text-amber-400 w-12 text-right">{rotation}°</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-white/60">Glaze Subsurface Scattering Roughness</span>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0.05"
                max="0.8"
                step="0.05"
                value={roughness}
                onChange={(e) => setRoughness(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
              <span className="font-mono text-amber-400 w-12 text-right">{roughness.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-white/60">Studio Lighting Rig</span>
            <div className="grid grid-cols-3 gap-1.5">
              {Object.keys(presets).map((p) => (
                <button
                  key={p}
                  onClick={() => setLightingPreset(p)}
                  className={`p-2 rounded-lg capitalize text-center transition-all ${
                    lightingPreset === p
                      ? "bg-amber-600 text-white font-medium shadow-sm"
                      : "bg-white/5 text-white/60 hover:bg-white/10"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setWireframe(!wireframe)}
              className="w-full py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 font-medium text-xs transition-all flex items-center justify-center gap-2"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>{wireframe ? "Switch to PBR Cycles Shading" : "Inspect Wireframe Mesh Topology"}</span>
            </button>
          </div>

          <div className="pt-3 border-t border-white/10 text-[11px] text-white/50 leading-relaxed font-mono">
            Crafted in Blender 5 by Joy Karmakar using procedural bump maps, weight-painted geometry nodes, and three-point lighting.
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. HAVISH M CONSULTING: Live Machine Learning Attrition & Retention Predictor
function AttritionMLSandbox() {
  const [overtime, setOvertime] = useState(12); // hours
  const [jobSatisfaction, setJobSatisfaction] = useState(2); // 1-5
  const [workLifeBalance, setWorkLifeBalance] = useState(2); // 1-5
  const [salaryPercentHike, setSalaryPercentHike] = useState(11); // %

  // Logistic Regression formula from scratch: z = b0 + w1*overtime + w2*jobSat + w3*workLife + w4*salary
  const z = 0.8 + (overtime * 0.12) - (jobSatisfaction * 0.75) - (workLifeBalance * 0.65) - (salaryPercentHike * 0.08);
  const attritionProbability = Math.min(0.96, Math.max(0.04, 1 / (1 + Math.exp(-z))));
  const probPercent = Math.round(attritionProbability * 100);

  const getRiskStatus = () => {
    if (probPercent > 60) return { label: "CRITICAL RISK", color: "text-red-400", bg: "bg-red-500/20 border-red-500/40" };
    if (probPercent > 35) return { label: "MODERATE RISK", color: "text-amber-400", bg: "bg-amber-500/20 border-amber-500/40" };
    return { label: "HIGH RETENTION", color: "text-emerald-400", bg: "bg-emerald-500/20 border-emerald-500/40" };
  };

  const risk = getRiskStatus();

  return (
    <div className="w-full h-full bg-[#0e1015] text-white flex flex-col font-sans select-none overflow-y-auto">
      {/* Header */}
      <div className="px-5 py-3 bg-[#151821] border-b border-white/10 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-400" />
          <span className="font-semibold text-white">Havish M Consulting · Attrition ML Engine</span>
        </div>
        <span className="font-mono text-[11px] text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
          Logistic Regression (From Scratch)
        </span>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sliders Area */}
        <div className="md:col-span-7 space-y-5">
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-medium">Workforce Parameter Simulator</h3>
            <p className="text-xs text-white/60">
              Adjust employee variables to see live churn probability calculated via the logistic function \(\sigma(z)\).
            </p>
          </div>

          <div className="space-y-4 bg-white/5 p-5 rounded-2xl border border-white/10">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-white/70">Overtime Hours (per week)</span>
                <span className="font-mono text-blue-400 font-semibold">{overtime} hrs</span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                value={overtime}
                onChange={(e) => setOvertime(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-white/70">Job Satisfaction Score (1 - 5)</span>
                <span className="font-mono text-blue-400 font-semibold">{jobSatisfaction} / 5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={jobSatisfaction}
                onChange={(e) => setJobSatisfaction(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-white/70">Work-Life Balance Rating (1 - 5)</span>
                <span className="font-mono text-blue-400 font-semibold">{workLifeBalance} / 5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={workLifeBalance}
                onChange={(e) => setWorkLifeBalance(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-white/70">Annual Salary Hike Percentage</span>
                <span className="font-mono text-blue-400 font-semibold">{salaryPercentHike}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                value={salaryPercentHike}
                onChange={(e) => setSalaryPercentHike(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Result & Feature Weights */}
        <div className="md:col-span-5 flex flex-col justify-between space-y-4">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 text-center">
            <span className="text-[11px] font-mono uppercase text-white/50 block">Calculated Churn Probability</span>
            <div className="font-serif text-5xl font-bold tracking-tight text-white">
              {probPercent}%
            </div>
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold border ${risk.bg} ${risk.color}`}>
              {risk.label}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
            <span className="font-mono text-[10px] text-white/40 uppercase">Top Discovered Correlation Weights</span>
            <div className="space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between text-white/80">
                <span>Overtime Demand:</span>
                <span className="text-red-400">+0.24 (Positive Churn)</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>Job Satisfaction:</span>
                <span className="text-emerald-400">-0.19 (Protective)</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>Work-Life Balance:</span>
                <span className="text-emerald-400">-0.16 (Protective)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. THEATRE AUDIO ARCHIVE (NUKKAD KI AWAAZEIN - CULTURAL COLLECTIVE)
function TheatreAudioSandbox() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState(0);

  const tracks = [
    { title: "Nukkad Ki Awaazein (Original Anthem)", duration: "03:42", views: "120M+ Backtrack Views" },
    { title: "Manthan Mahotsav: Dhwani", duration: "02:15", views: "750K+ YouTube Views" },
    { title: "Kalyug Ka Rangmanch (Street Play Chorus)", duration: "04:05", views: "40+ Teams Preserved" }
  ];

  return (
    <div className="w-full h-full bg-[#121318] text-white flex flex-col font-sans select-none overflow-y-auto">
      <div className="px-5 py-3 bg-[#191b22] border-b border-white/10 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Music className="w-4 h-4 text-[#d97746]" />
          <span className="font-semibold">Nukkad Ki Awaazein · Cultural Audio Archive</span>
        </div>
        <span className="font-mono text-[11px] text-[#d97746] bg-[#d97746]/10 px-2.5 py-0.5 rounded border border-[#d97746]/20">
          120M+ Views Reached
        </span>
      </div>

      <div className="p-6 max-w-2xl mx-auto w-full space-y-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#d97746]/20 to-black/60 border border-[#d97746]/30 flex flex-col items-center text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-[#d97746] flex items-center justify-center shadow-lg">
            <Music className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-medium">{tracks[activeTrack].title}</h3>
            <p className="text-xs text-white/60 font-mono mt-0.5">{tracks[activeTrack].views}</p>
          </div>

          {/* Animated Waveform Simulator */}
          <div className="flex items-end justify-center gap-1 h-10 w-full max-w-xs py-1">
            {[40, 70, 90, 45, 80, 100, 60, 30, 85, 95, 55, 75, 90, 60, 40].map((h, i) => (
              <span
                key={i}
                className={`w-1.5 rounded-full bg-[#d97746] transition-all duration-300 ${
                  isPlaying ? "animate-pulse" : "opacity-40"
                }`}
                style={{ height: isPlaying ? `${h}%` : "20%" }}
              />
            ))}
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-xs shadow-lg hover:scale-105 transition-all"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-black" />}
            <span>{isPlaying ? "Pause Track" : "Play Composition"}</span>
          </button>
        </div>

        {/* Track Playlist */}
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-white/50">Archived Theatrical Compositions</span>
          <div className="space-y-1.5">
            {tracks.map((t, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setActiveTrack(idx);
                  setIsPlaying(true);
                }}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                  activeTrack === idx
                    ? "bg-[#d97746]/15 border-[#d97746]/40 text-white"
                    : "bg-white/5 border-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-white/40">0{idx + 1}</span>
                  <span className="text-xs font-medium">{t.title}</span>
                </div>
                <span className="text-[11px] font-mono text-[#d97746]">{t.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. WEB WIZARDRY (DPS RANCHI - 1ST PRIZE WINNER)
function WebWizardrySandbox() {
  return (
    <div className="w-full h-full bg-[#faf9f6] dark:bg-[#0d0f14] text-[#1c1b18] dark:text-[#f4f4f2] flex flex-col font-sans select-none overflow-y-auto">
      <div className="px-5 py-3 bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-500" />
          <span className="font-semibold">Web Wizardry Winner · DPS Ranchi</span>
        </div>
        <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded">
          1st Place Champion
        </span>
      </div>

      <div className="p-8 max-w-xl mx-auto space-y-6 text-center">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold">
          Semantic HTML5 & Pure CSS Architecture
        </span>
        <h2 className="font-serif text-3xl font-medium leading-tight">
          Crafting the Web Without Clutter
        </h2>
        <p className="text-sm text-black/70 dark:text-white/70 font-sans leading-relaxed">
          Awarded 1st place across top schools for clean responsive architecture, high performance scores, and elegant interaction design without relying on bulky libraries.
        </p>
        <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex justify-around text-xs font-mono">
          <div>
            <span className="text-lg font-bold text-emerald-500 block">100</span>
            <span className="text-black/50 dark:text-white/50 text-[10px]">Performance</span>
          </div>
          <div>
            <span className="text-lg font-bold text-emerald-500 block">100</span>
            <span className="text-black/50 dark:text-white/50 text-[10px]">Accessibility</span>
          </div>
          <div>
            <span className="text-lg font-bold text-emerald-500 block">0</span>
            <span className="text-black/50 dark:text-white/50 text-[10px]">Framework Bloat</span>
          </div>
        </div>
      </div>
    </div>
  );
}
