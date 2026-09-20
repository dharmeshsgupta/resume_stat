import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 300;

export default function FullPageScrollVideo() {
  const canvasRef = useRef(null);
  const imagesRef = useRef({});
  const currentFrameRef = useRef(-1);
  const [loadedPercent, setLoadedPercent] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const isMobile = window.innerWidth < 768;
    // Step size for preloading: step 2 (150 frames) on desktop, step 3 (100 frames) on mobile
    const frameStep = isMobile ? 3 : 2;
    const expectedCount = Math.floor(TOTAL_FRAMES / frameStep);
    let loadedCount = 0;

    // Safety fallback timer: auto-complete boot after 1.2s max so user is NEVER stuck
    const safetyTimer = setTimeout(() => {
      if (isMounted) {
        setLoadedPercent(100);
        setBootComplete(true);
      }
    }, 1200);

    // Function to draw a specific frame
    const drawFrame = (frameIndex) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Find nearest available frame in imagesRef
      let imgToDraw = null;
      if (imagesRef.current[frameIndex]?.complete && imagesRef.current[frameIndex]?.naturalWidth > 0) {
        imgToDraw = imagesRef.current[frameIndex];
      } else {
        // Search outwards for nearest loaded frame
        for (let offset = 1; offset <= 30; offset++) {
          const prev = frameIndex - offset;
          if (prev >= 1 && imagesRef.current[prev]?.complete && imagesRef.current[prev]?.naturalWidth > 0) {
            imgToDraw = imagesRef.current[prev];
            break;
          }
          const next = frameIndex + offset;
          if (next <= TOTAL_FRAMES && imagesRef.current[next]?.complete && imagesRef.current[next]?.naturalWidth > 0) {
            imgToDraw = imagesRef.current[next];
            break;
          }
        }
      }

      if (!imgToDraw) return;
      if (currentFrameRef.current === frameIndex) return;
      currentFrameRef.current = frameIndex;

      const cw = canvas.width;
      const ch = canvas.height;
      if (cw === 0 || ch === 0) return;

      const sr = imgToDraw.width / imgToDraw.height;
      const cr = cw / ch;
      let dw, dh, dx, dy;

      if (sr > cr) {
        dh = ch;
        dw = ch * sr;
        dx = (cw - dw) / 2;
        dy = 0;
      } else {
        dw = cw;
        dh = cw / sr;
        dx = 0;
        dy = (ch - dh) / 2;
      }

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(imgToDraw, dx, dy, dw, dh);
    };

    // Resize canvas
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = window.innerWidth < 768 ? 1 : (window.devicePixelRatio || 1);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = window.innerWidth < 768 ? 'low' : 'high';

      currentFrameRef.current = -1;
      // Draw initial frame 1
      drawFrame(1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Preload frames
    for (let i = 1; i <= TOTAL_FRAMES; i += frameStep) {
      const img = new Image();
      img.src = `/frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;

      img.onload = () => {
        if (!isMounted) return;
        loadedCount++;
        const pct = Math.min(100, Math.floor((loadedCount / expectedCount) * 100));
        setLoadedPercent(pct);

        if (i === 1 || loadedCount === 1) {
          drawFrame(1);
        }

        if (loadedCount >= expectedCount) {
          setBootComplete(true);
        }
      };

      img.onerror = () => {
        if (!isMounted) return;
        loadedCount++;
        const pct = Math.min(100, Math.floor((loadedCount / expectedCount) * 100));
        setLoadedPercent(pct);

        if (loadedCount >= expectedCount) {
          setBootComplete(true);
        }
      };

      imagesRef.current[i] = img;
    }

    // Smooth continuous LERP frame rendering loop
    let targetFrame = 1;
    let currentRenderedFrame = 1;
    let animFrameId = null;

    const renderLoop = () => {
      // Linear interpolation towards target frame
      const diff = targetFrame - currentRenderedFrame;
      if (Math.abs(diff) > 0.05) {
        currentRenderedFrame += diff * 0.18; // smooth easing factor
        const frameToDraw = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(currentRenderedFrame)));
        drawFrame(frameToDraw);
      }
      animFrameId = requestAnimationFrame(renderLoop);
    };

    animFrameId = requestAnimationFrame(renderLoop);

    // GSAP ScrollTrigger for full document height video scrubbing
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        targetFrame = Math.min(
          TOTAL_FRAMES,
          Math.max(1, Math.floor(self.progress * (TOTAL_FRAMES - 1)) + 1)
        );
      }
    });

    // Fallback native scroll listener for high reliability
    const onScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalHeight));
        targetFrame = Math.min(
          TOTAL_FRAMES,
          Math.max(1, Math.floor(progress * (TOTAL_FRAMES - 1)) + 1)
        );
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      isMounted = false;
      if (animFrameId) cancelAnimationFrame(animFrameId);
      clearTimeout(safetyTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', onScroll);
      trigger.kill();
    };
  }, []);

  return (
    <>
      {/* SYSTEM BOOT OVERLAY */}
      {!bootComplete && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-900 text-amber-400 font-mono text-xl font-bold transition-opacity duration-500">
          <div className="p-6 bg-dark-800 border-4 border-amber-400 rounded-2xl shadow-[6px_6px_0px_#ff9f00] flex flex-col items-center gap-4 max-w-xs w-full text-center">
            <Sparkles className="animate-spin text-amber-400" size={36} />
            <div className="space-y-1">
              <span className="text-base sm:text-lg font-black tracking-wider uppercase block">
                SYSTEM_BOOT... {loadedPercent}%
              </span>
              <p className="text-[10px] text-amber-300/80 uppercase font-mono">
                Initializing 3D Quantum Canvas
              </p>
            </div>
            <div className="w-full h-3 bg-dark-900 rounded-full border-2 border-amber-400 overflow-hidden p-0.5">
              <div
                className="h-full bg-amber-400 rounded-full transition-all duration-150"
                style={{ width: `${loadedPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* FIXED BACKGROUND VIDEO CANVAS */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 vignette overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover scanlines opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/40 via-transparent to-dark-900/90 pointer-events-none" />
      </div>
    </>
  );
}
