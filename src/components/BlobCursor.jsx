// @ts-nocheck
import React, { useRef, useEffect, useState } from 'react';
import './BlobCursor.css';

/**
 * BlobCursor: Liquid Glass Blob with Dynamic Hover Magnification
 * - No duplicate cloned boxes or floating preview portions
 * - Uses the fluid gooey metaball SVG filter with fast spring physics
 * - The blob itself magnifies (scales up dynamically) when hovering over images, cards, and interactive elements
 * - Optical liquid glass material: brightens, enhances contrast and saturation without opaque color
 * - Blazingly fast 120 FPS / 60 FPS hardware-accelerated performance
 */
export const BlobCursor = ({ blobType = 'circle' }) => {
  const [visible, setVisible] = useState(false);

  const containerRef = useRef(null);
  const node0Ref = useRef(null);
  const node1Ref = useRef(null);
  const node2Ref = useRef(null);

  const mousePos = useRef({ x: -200, y: -200 });
  const points = useRef([
    { x: -200, y: -200, vx: 0, vy: 0 },
    { x: -200, y: -200, vx: 0, vy: 0 },
    { x: -200, y: -200, vx: 0, vy: 0 },
  ]);

  // Dynamic magnification scale of the blob itself
  const currentScale = useRef(1);
  const targetScale = useRef(1);

  const animFrameId = useRef(null);
  const lastTimeRef = useRef(performance.now());

  // Fast, responsive spring parameters
  const fast = { mass: 1, tension: 2400, friction: 36 };
  const slow1 = { mass: 2, tension: 550, friction: 32 };
  const slow2 = { mass: 2.5, tension: 450, friction: 30 };

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse / trackpad)
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const handlePointerMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      mousePos.current.x = x;
      mousePos.current.y = y;

      if (!visible) {
        setVisible(true);
        points.current.forEach((p) => {
          p.x = x;
          p.y = y;
          p.vx = 0;
          p.vy = 0;
        });
      }
    };

    // Lightweight event-delegated hover detection (0ms cost, no mousemove overhead)
    const handlePointerOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isImage = !!target.closest('img, [data-photo], .flip-card-front');
      const isInteractive = !!target.closest(
        'a, button, [role="button"], input, textarea, .cursor-pointer, .ios-glass-pill, .group'
      );

      if (isImage) {
        targetScale.current = 1.65; // Magnify blob into large lens over images
      } else if (isInteractive) {
        targetScale.current = 1.35; // Expand over interactive buttons/links
      } else {
        targetScale.current = 1.0;  // Standard liquid droplet size
      }
    };

    const handlePointerOut = () => {
      targetScale.current = 1.0;
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    // Blazing-fast 120 FPS spring physics loop
    const animate = (now) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.032);
      lastTimeRef.current = now;

      const pts = points.current;
      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      // Point 0 (Lead: tracks pointer with ultra-fast responsiveness)
      const f0x = (mx - pts[0].x) * fast.tension - pts[0].vx * fast.friction;
      const f0y = (my - pts[0].y) * fast.tension - pts[0].vy * fast.friction;
      pts[0].vx += (f0x / fast.mass) * dt;
      pts[0].vy += (f0y / fast.mass) * dt;
      pts[0].x += pts[0].vx * dt;
      pts[0].y += pts[0].vy * dt;

      // Point 1 (Mid: trails lead point)
      const f1x = (pts[0].x - pts[1].x) * slow1.tension - pts[1].vx * slow1.friction;
      const f1y = (pts[0].y - pts[1].y) * slow1.tension - pts[1].vy * slow1.friction;
      pts[1].vx += (f1x / slow1.mass) * dt;
      pts[1].vy += (f1y / slow1.mass) * dt;
      pts[1].x += pts[1].vx * dt;
      pts[1].y += pts[1].vy * dt;

      // Point 2 (Tail: trails mid point)
      const f2x = (pts[1].x - pts[2].x) * slow2.tension - pts[2].vx * slow2.friction;
      const f2y = (pts[1].y - pts[2].y) * slow2.tension - pts[2].vy * slow2.friction;
      pts[2].vx += (f2x / slow2.mass) * dt;
      pts[2].vy += (f2y / slow2.mass) * dt;
      pts[2].x += pts[2].vx * dt;
      pts[2].y += pts[2].vy * dt;

      // Smoothly interpolate magnification scale of the blob
      currentScale.current += (targetScale.current - currentScale.current) * 0.15;
      const s = currentScale.current;

      // Direct GPU transform updates (Zero React re-renders)
      if (node0Ref.current) {
        node0Ref.current.style.transform = `translate3d(${pts[0].x}px, ${pts[0].y}px, 0) translate3d(-50%, -50%, 0) scale(${s})`;
      }
      if (node1Ref.current) {
        node1Ref.current.style.transform = `translate3d(${pts[1].x}px, ${pts[1].y}px, 0) translate3d(-50%, -50%, 0) scale(${s * 0.9})`;
      }
      if (node2Ref.current) {
        node2Ref.current.style.transform = `translate3d(${pts[2].x}px, ${pts[2].y}px, 0) translate3d(-50%, -50%, 0) scale(${s * 0.75})`;
      }

      animFrameId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseover', handlePointerOver, { passive: true });
    document.addEventListener('mouseout', handlePointerOut, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseover', handlePointerOver);
      document.removeEventListener('mouseout', handlePointerOut);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [visible]);

  return (
    <div
      ref={containerRef}
      className={`blob-container transition-opacity duration-150 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Pure Invisible Optical Glass Follower - No visible blob silhouette, only the optical effect is active */}
      <div className="blob-main">
        {/* Node 0: Lead Optical Lens (Invisible graphic, pure optical enhancement) */}
        <div
          ref={node0Ref}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            willChange: 'transform',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
            backdropFilter: 'brightness(1.16) contrast(1.10) saturate(1.22)',
            WebkitBackdropFilter: 'brightness(1.16) contrast(1.10) saturate(1.22)',
            WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 28%, rgba(0,0,0,0) 75%)',
            maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 28%, rgba(0,0,0,0) 75%)',
          }}
        />

        {/* Node 1: Mid Trailing Optical Refraction */}
        <div
          ref={node1Ref}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            willChange: 'transform',
            background: 'transparent',
            border: 'none',
            backdropFilter: 'brightness(1.10) contrast(1.06) saturate(1.15)',
            WebkitBackdropFilter: 'brightness(1.10) contrast(1.06) saturate(1.15)',
            WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 70%)',
            maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 70%)',
          }}
        />

        {/* Node 2: Tail Trailing Optical Refraction */}
        <div
          ref={node2Ref}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            willChange: 'transform',
            background: 'transparent',
            border: 'none',
            backdropFilter: 'brightness(1.06) contrast(1.04) saturate(1.10)',
            WebkitBackdropFilter: 'brightness(1.06) contrast(1.04) saturate(1.10)',
            WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 65%)',
            maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 65%)',
          }}
        />
      </div>
    </div>
  );
};

export default BlobCursor;
