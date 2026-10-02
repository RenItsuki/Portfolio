// @ts-nocheck
import { useEffect } from 'react';

/**
 * useCanvasCursor: Fluid harmonic oscillator ribbon cursor trail
 * 
 * Theme-consistent dynamic colors:
 * - Dark Mode: Radiant twilight lavender / violet glow (`hsla(~280, 50%, 60%, 0.22)` with `lighter` blend)
 * - Light Mode: Warm terracotta / sienna silk ribbon (`hsla(~20, 45%, 44%, 0.18)` with `source-over` blend)
 * - Real-time smooth transition when toggling themes
 */
const useCanvasCursor = () => {
  function n(e) {
    this.init(e || {});
  }
  n.prototype = {
    init: function (e) {
      this.phase = e.phase || 0;
      this.offset = e.offset || 0;
      this.frequency = e.frequency || 0.001;
      this.amplitude = e.amplitude || 1;
    },
    update: function () {
      return (
        (this.phase += this.frequency),
        (e = this.offset + Math.sin(this.phase) * this.amplitude)
      );
    },
    value: function () {
      return e;
    },
  };

  function Line(e) {
    this.init(e || {});
  }

  Line.prototype = {
    init: function (e) {
      this.spring = e.spring + 0.1 * Math.random() - 0.02;
      this.friction = E.friction + 0.01 * Math.random() - 0.002;
      this.nodes = [];
      for (var t, n = 0; n < E.size; n++) {
        t = new Node();
        t.x = pos.x;
        t.y = pos.y;
        this.nodes.push(t);
      }
    },
    update: function () {
      var e = this.spring,
        t = this.nodes[0];
      t.vx += (pos.x - t.x) * e;
      t.vy += (pos.y - t.y) * e;
      for (var n, i = 0, a = this.nodes.length; i < a; i++)
        (t = this.nodes[i]),
          0 < i &&
            ((n = this.nodes[i - 1]),
            (t.vx += (n.x - t.x) * e),
            (t.vy += (n.y - t.y) * e),
            (t.vx += n.vx * E.dampening),
            (t.vy += n.vy * E.dampening)),
          (t.vx *= this.friction),
          (t.vy *= this.friction),
          (t.x += t.vx),
          (t.y += t.vy),
          (e *= E.tension);
    },
    draw: function () {
      var e,
        t,
        n = this.nodes[0].x,
        i = this.nodes[0].y;
      ctx.beginPath();
      ctx.moveTo(n, i);
      for (var a = 1, o = this.nodes.length - 2; a < o; a++) {
        e = this.nodes[a];
        t = this.nodes[a + 1];
        n = 0.5 * (e.x + t.x);
        i = 0.5 * (e.y + t.y);
        ctx.quadraticCurveTo(e.x, e.y, n, i);
      }
      e = this.nodes[a];
      t = this.nodes[a + 1];
      ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
      ctx.stroke();
      ctx.closePath();
    },
  };

  function Node() {
    this.x = 0;
    this.y = 0;
    this.vy = 0;
    this.vx = 0;
  }

  var ctx,
    f,
    e = 0,
    pos = { x: 0, y: 0 },
    lines = [],
    animationFrameId,
    currentOffset = 280,
    currentAmp = 18,
    currentSat = 45,
    currentLight = 60,
    currentAlpha = 0.11,
    E = {
      debug: false,
      friction: 0.45,
      trails: 10,
      size: 32,
      dampening: 0.20,
      tension: 0.98,
    };

  function render() {
    if (ctx && ctx.running) {
      // Check current active theme
      const isDark = document.documentElement.classList.contains('dark') ||
        document.documentElement.getAttribute('data-theme') === 'dark';

      // Theme-consistent target color parameters:
      // Dark Mode: Twilight lavender (#b6a2c9) ~280deg hue with 'lighter' glow
      // Light Mode: Warm terracotta (#b18a79) ~20deg hue with 'source-over' crisp ribbon
      const targetOffset = isDark ? 280 : 20;
      const targetAmp = isDark ? 18 : 10;
      const targetSat = isDark ? 45 : 38;
      const targetLight = isDark ? 62 : 44;
      const targetAlpha = isDark ? 0.12 : 0.09;
      const blendMode = isDark ? 'lighter' : 'source-over';

      // Smooth interpolation between light and dark modes
      currentOffset += (targetOffset - currentOffset) * 0.08;
      currentAmp += (targetAmp - currentAmp) * 0.08;
      currentSat += (targetSat - currentSat) * 0.08;
      currentLight += (targetLight - currentLight) * 0.08;
      currentAlpha += (targetAlpha - currentAlpha) * 0.08;

      f.offset = currentOffset;
      f.amplitude = currentAmp;

      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = blendMode;
      ctx.strokeStyle = `hsla(${Math.round(f.update())}, ${Math.round(currentSat)}%, ${Math.round(currentLight)}%, ${currentAlpha.toFixed(3)})`;
      ctx.lineWidth = 0.75;

      for (var i = 0; i < E.trails; i++) {
        if (lines[i]) {
          lines[i].update();
          lines[i].draw();
        }
      }
      ctx.frame++;
      animationFrameId = window.requestAnimationFrame(render);
    }
  }

  function resizeCanvas() {
    if (ctx && ctx.canvas) {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    }
  }

  useEffect(() => {
    const canvas = document.getElementById('canvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    if (!ctx) return;

    const initialDark = document.documentElement.classList.contains('dark') ||
      document.documentElement.getAttribute('data-theme') === 'dark';

    currentOffset = initialDark ? 280 : 20;
    currentAmp = initialDark ? 35 : 15;
    currentSat = initialDark ? 52 : 44;
    currentLight = initialDark ? 62 : 44;
    currentAlpha = initialDark ? 0.22 : 0.18;

    ctx.running = true;
    ctx.frame = 1;
    f = new n({
      phase: Math.random() * 2 * Math.PI,
      amplitude: currentAmp,
      frequency: 0.0015,
      offset: currentOffset,
    });

    function createLines() {
      lines = [];
      for (var i = 0; i < E.trails; i++) {
        lines.push(new Line({ spring: 0.4 + (i / E.trails) * 0.025 }));
      }
    }

    function onPointerMove(ev) {
      if (ev.touches && ev.touches.length > 0) {
        pos.x = ev.touches[0].pageX;
        pos.y = ev.touches[0].pageY;
      } else {
        pos.x = ev.clientX;
        pos.y = ev.clientY;
      }
    }

    function onFirstMove(ev) {
      onPointerMove(ev);
      createLines();
      render();

      window.removeEventListener('mousemove', onFirstMove);
      window.removeEventListener('touchstart', onFirstMove);
      window.addEventListener('mousemove', onPointerMove, { passive: true });
      window.addEventListener('touchmove', onPointerMove, { passive: true });
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('mousemove', onFirstMove, { passive: true });
    window.addEventListener('touchstart', onFirstMove, { passive: true });

    const handleFocus = () => {
      if (ctx && !ctx.running) {
        ctx.running = true;
        render();
      }
    };
    const handleBlur = () => {
      if (ctx) ctx.running = true;
    };
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      if (ctx) ctx.running = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onFirstMove);
      window.removeEventListener('touchstart', onFirstMove);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);
};

export default useCanvasCursor;
