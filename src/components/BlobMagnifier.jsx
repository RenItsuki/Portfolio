import React, { useRef, useState, useEffect } from "react";

/**
 * BlobMagnifier: Borderless Dynamic Liquid Blob Magnifying Glass
 * 
 * - Renders base content (cards, images, typography, video) normally.
 * - On hover, renders a scaled duplicate layer masked by a dynamic fluid metaball blob.
 * - Dynamic 5-point fluid spring spine stretches organically into an elongated droplet when moving,
 *   and contracts into a smooth circular droplet when stationary.
 * - Borderless: Seamless multi-stop feathered gradient falloff (no hard lines or borders).
 * - Aligns 1:1 with cursor: transform-origin = (cursor.x, cursor.y) so pixel under cursor is stationary.
 * - Automatically synchronizes any <video> elements between base and magnified layers.
 * - Never drops hover prematurely: pointer event bounding verification prevents early timeout.
 */
export function BlobMagnifier({
  children,
  className = "",
  scale = 1.6,
  blobRadius = 58,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const containerRef = useRef(null);
  const baseRef = useRef(null);
  const layerRef = useRef(null);
  const innerRef = useRef(null);

  // 3-point harmonic spring physics nodes (lead, body, tail)
  const p0 = useRef({ x: -100, y: -100 });
  const p1 = useRef({ x: -100, y: -100, vx: 0, vy: 0 });
  const p2 = useRef({ x: -100, y: -100, vx: 0, vy: 0 });

  const animFrameId = useRef(null);
  const lastTimeRef = useRef(performance.now());

  const handlePointerEnter = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    p0.current = { x, y };
    p1.current = { x, y, vx: 0, vy: 0 };
    p2.current = { x, y, vx: 0, vy: 0 };

    setIsHovered(true);
    lastTimeRef.current = performance.now();
  };

  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    p0.current.x = x;
    p0.current.y = y;

    if (!isHovered) {
      setIsHovered(true);
      p1.current.x = x;
      p1.current.y = y;
      p2.current.x = x;
      p2.current.y = y;
    }
  };

  const handlePointerLeave = (e) => {
    if (!containerRef.current) {
      setIsHovered(false);
      return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    // Only cancel hover when pointer truly exits the card boundaries
    if (
      e.clientX < rect.left ||
      e.clientX >= rect.right ||
      e.clientY < rect.top ||
      e.clientY >= rect.bottom
    ) {
      setIsHovered(false);
    }
  };

  useEffect(() => {
    if (!isHovered) {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      return;
    }

    // Dynamic fluid spring loop with 5-point spine interpolation
    const animate = (now) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.032);
      lastTimeRef.current = now;

      // Point 1 trails Point 0 (fluid body)
      const tension1 = 460;
      const friction1 = 28;
      const mass1 = 1.6;
      const f1x = (p0.current.x - p1.current.x) * tension1 - p1.current.vx * friction1;
      const f1y = (p0.current.y - p1.current.y) * tension1 - p1.current.vy * friction1;
      p1.current.vx += (f1x / mass1) * dt;
      p1.current.vy += (f1y / mass1) * dt;
      p1.current.x += p1.current.vx * dt;
      p1.current.y += p1.current.vy * dt;

      // Point 2 trails Point 1 (fluid tail)
      const tension2 = 340;
      const friction2 = 24;
      const mass2 = 2.0;
      const f2x = (p1.current.x - p2.current.x) * tension2 - p2.current.vx * friction2;
      const f2y = (p1.current.y - p2.current.y) * tension2 - p2.current.vy * friction2;
      p2.current.vx += (f2x / mass2) * dt;
      p2.current.vy += (f2y / mass2) * dt;
      p2.current.x += p2.current.vx * dt;
      p2.current.y += p2.current.vy * dt;

      // 5-point fluid spine interpolation along the velocity curve
      const p05 = {
        x: (p0.current.x + p1.current.x) * 0.5,
        y: (p0.current.y + p1.current.y) * 0.5,
      };
      const p15 = {
        x: (p1.current.x + p2.current.x) * 0.5,
        y: (p1.current.y + p2.current.y) * 0.5,
      };

      // Radii tapering along the fluid tail
      const r0 = blobRadius;
      const r05 = Math.round(blobRadius * 0.88);
      const r1 = Math.round(blobRadius * 0.74);
      const r15 = Math.round(blobRadius * 0.60);
      const r2 = Math.round(blobRadius * 0.46);

      // Borderless feathered gradient mask function
      const makeGrad = (r, x, y, solidPct, midPct) =>
        `radial-gradient(circle ${r}px at ${x.toFixed(1)}px ${y.toFixed(1)}px, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${solidPct}%, rgba(0,0,0,0.85) ${midPct}%, rgba(0,0,0,0.2) 88%, transparent 100%)`;

      const mask = [
        makeGrad(r0, p0.current.x, p0.current.y, 45, 68),
        makeGrad(r05, p05.x, p05.y, 40, 65),
        makeGrad(r1, p1.current.x, p1.current.y, 35, 62),
        makeGrad(r15, p15.x, p15.y, 30, 58),
        makeGrad(r2, p2.current.x, p2.current.y, 25, 52),
      ].join(", ");

      if (layerRef.current) {
        layerRef.current.style.webkitMaskImage = mask;
        layerRef.current.style.maskImage = mask;
      }

      // Exact 1:1 optical alignment at cursor position
      if (innerRef.current) {
        innerRef.current.style.transformOrigin = `${p0.current.x.toFixed(1)}px ${p0.current.y.toFixed(1)}px`;
      }

      // Synchronize any videos between base and magnified overlay
      const baseVideos = baseRef.current ? baseRef.current.querySelectorAll("video") : null;
      const overlayVideos = innerRef.current ? innerRef.current.querySelectorAll("video") : null;
      if (baseVideos && overlayVideos && baseVideos.length === overlayVideos.length) {
        for (let i = 0; i < baseVideos.length; i++) {
          const bVid = baseVideos[i];
          const oVid = overlayVideos[i];
          if (!bVid.paused && oVid.paused) {
            oVid.play().catch(() => {});
          } else if (bVid.paused && !oVid.paused) {
            oVid.pause();
          }
          if (Math.abs(oVid.currentTime - bVid.currentTime) > 0.04) {
            oVid.currentTime = bVid.currentTime;
          }
        }
      }

      animFrameId.current = requestAnimationFrame(animate);
    };

    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isHovered, scale, blobRadius]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* 1. Base Content (Unmagnified) */}
      <div ref={baseRef} className="w-full h-full">
        {children}
      </div>

      {/* 2. Borderless Dynamic Blob Magnifier Layer */}
      <div
        ref={layerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full overflow-hidden select-none transition-opacity duration-200"
        style={{
          opacity: isHovered ? 1 : 0,
          willChange: "mask-image, -webkit-mask-image",
        }}
      >
        {/* Larger Copy of Content - Precisely aligned at cursor origin with optical glass enhancement */}
        <div
          ref={innerRef}
          className="w-full h-full will-change-transform"
          style={{
            transform: `scale(${scale})`,
            filter: "contrast(1.06) brightness(1.03) saturate(1.08)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default BlobMagnifier;
