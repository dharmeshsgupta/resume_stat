import React, { useEffect, useRef, useState } from 'react';

export function QuantumTransmission() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [telemetry, setTelemetry] = useState({ freq: 2.4, amp: 40, speed: 750 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let width = 0;
    let height = 0;
    let frameCount = 0;

    const isMobile = window.innerWidth < 768;
    // Grid configuration
    const COLS = isMobile ? 12 : 26;
    const ROWS = isMobile ? 12 : 26;
    const pulses = [];

    // Mouse interactive controls
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let isHovered = false;
    let lastPulseTime = 0;

    // High DPI Canvas Scaling
    const resize = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      width = rect ? rect.width : canvas.clientWidth;
      height = rect ? rect.height : canvas.clientHeight;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left) / width - 0.5; // range [-0.5, 0.5]
      targetMouseY = (e.clientY - rect.top) / height - 0.5; // range [-0.5, 0.5]
      isHovered = true;

      // Spawn a mini data pulse as mouse moves (rate-limited)
      const now = Date.now();
      if (now - lastPulseTime > 150) {
        pulses.push({
          cx: targetMouseX,
          cy: targetMouseY,
          radius: 0,
          speed: 0.015,
          maxRadius: 0.8,
          intensity: 0.25,
          decay: 0.96,
        });
        lastPulseTime = now;
      }
    };

    const handleMouseLeave = () => {
      isHovered = false;
      targetMouseX = 0;
      targetMouseY = 0;
    };

    const handleCanvasClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = (e.clientX - rect.left) / width - 0.5;
      const clickY = (e.clientY - rect.top) / height - 0.5;
      
      // Trigger a high-energy primary pulse
      pulses.push({
        cx: clickX,
        cy: clickY,
        radius: 0,
        speed: 0.02,
        maxRadius: 1.2,
        intensity: 0.6,
        decay: 0.98,
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleCanvasClick);

    // Animation Loop
    const animate = () => {
      frameCount++;
      
      // Interpolate mouse coordinates for fluid motion
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      // Clear canvas fully to allow glass-card background transparency
      ctx.clearRect(0, 0, width, height);

      // Update interactive pulses
      for (let k = pulses.length - 1; k >= 0; k--) {
        const pulse = pulses[k];
        pulse.radius += pulse.speed;
        pulse.intensity *= pulse.decay;
        if (pulse.radius > pulse.maxRadius || pulse.intensity < 0.01) {
          pulses.splice(k, 1);
        }
      }

      // Projection angles (tilted 3D grid layout)
      // Slow rotation over time plus mouse guidance
      const yaw = -0.45 + mouseX * 0.4;
      const pitch = 0.55 + mouseY * 0.3;

      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosX = Math.cos(pitch);
      const sinX = Math.sin(pitch);

      const centerX = width / 2;
      const centerY = height / 2 + 10;
      const scale = Math.min(width, height) * 0.85;

      // Temporary grid points store for rendering wireframe
      const projectedGrid = [];

      // Calculate 3D grid points
      for (let i = 0; i < COLS; i++) {
        projectedGrid[i] = [];
        const u = (i / (COLS - 1)) - 0.5; // [-0.5, 0.5]
        
        for (let j = 0; j < ROWS; j++) {
          const v = (j / (ROWS - 1)) - 0.5; // [-0.5, 0.5]

          // Base Carrier Wave Math: Multiple composite sine waves
          const distToCenter = Math.sqrt(u * u + v * v);
          
          // Modulate frequency/wavelength based on mouse interaction
          const baseFreq = isHovered ? 8 + (mouseX + 0.5) * 12 : 12;
          const baseAmp = isHovered ? 0.08 + (mouseY + 0.5) * 0.12 : 0.12;

          let w = Math.sin(distToCenter * baseFreq - frameCount * 0.05) * baseAmp;
          w += Math.cos(u * 5 + frameCount * 0.03) * v * 0.05; // Diagonal twisting noise

          // Overlay active transmission ripples/pulses
          for (let k = 0; k < pulses.length; k++) {
            const p = pulses[k];
            const distToPulse = Math.sqrt((u - p.cx) * (u - p.cx) + (v - p.cy) * (v - p.cy));
            const delta = Math.abs(distToPulse - p.radius);
            if (delta < 0.18) {
              // Add a ripple bell curve boost
              const rippleStrength = Math.cos((delta / 0.18) * Math.PI * 0.5);
              w += rippleStrength * p.intensity * 0.22;
            }
          }

          // 3D coordinate scaling
          const x3d = u * 0.85;
          const z3d = v * 0.85;
          const y3d = w; // Vertical displacement

          // Rotate 3D points
          // Rotate Yaw (around Y axis)
          const x1 = x3d * cosY - z3d * sinY;
          const z1 = x3d * sinY + z3d * cosY;

          // Rotate Pitch (around X axis)
          const y2 = y3d * cosX - z1 * sinX;
          const z2 = y3d * sinX + z1 * cosX;

          // Projection scale (incorporating pseudo depth)
          const fov = 1.8;
          const dist = fov - z2;
          const sx = centerX + (x1 / dist) * scale;
          const sy = centerY + (y2 / dist) * scale;

          projectedGrid[i][j] = { sx, sy, height: w, dist };
        }
      }

      // Draw Grid Mesh (Wireframe connections)
      ctx.lineWidth = 0.85;
      
      for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
          const curr = projectedGrid[i][j];

          // Determine line color based on point height
          // Height goes roughly from -0.15 to 0.25
          const heightRatio = Math.max(0, Math.min(1, (curr.height + 0.1) / 0.25));
          
          // Color gradient: Cyber Teal (0, 240, 255) to Amber Glow (255, 176, 0)
          const r = Math.floor(0 * (1 - heightRatio) + 255 * heightRatio);
          const g = Math.floor(240 * (1 - heightRatio) + 176 * heightRatio);
          const b = Math.floor(255 * (1 - heightRatio) + 0 * heightRatio);

          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.12 + heightRatio * 0.28})`;

          // Draw columns link
          if (i < COLS - 1) {
            const right = projectedGrid[i + 1][j];
            if (Math.abs(curr.sx - right.sx) < width * 0.5) {
              ctx.beginPath();
              ctx.moveTo(curr.sx, curr.sy);
              ctx.lineTo(right.sx, right.sy);
              ctx.stroke();
            }
          }

          // Draw rows link
          if (j < ROWS - 1) {
            const down = projectedGrid[i][j + 1];
            if (Math.abs(curr.sx - down.sx) < width * 0.5) {
              ctx.beginPath();
              ctx.moveTo(curr.sx, curr.sy);
              ctx.lineTo(down.sx, down.sy);
              ctx.stroke();
            }
          }

          // Draw glowing node dots at peaks
          if (heightRatio > 0.65) {
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${(heightRatio - 0.5) * 1.5})`;
            ctx.beginPath();
            ctx.arc(curr.sx, curr.sy, 1.5 + (heightRatio * 1.5), 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Draw Retro HUD overlay frame
      const margin = 20;
      const len = 10;
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 176, 0, 0.2)';

      // Corner frames
      // Top Left
      ctx.beginPath(); ctx.moveTo(margin, margin + len); ctx.lineTo(margin, margin); ctx.lineTo(margin + len, margin); ctx.stroke();
      // Top Right
      ctx.beginPath(); ctx.moveTo(width - margin, margin + len); ctx.lineTo(width - margin, margin); ctx.lineTo(width - margin - len, margin); ctx.stroke();
      // Bottom Left
      ctx.beginPath(); ctx.moveTo(margin, height - margin - len); ctx.lineTo(margin, height - margin); ctx.lineTo(margin + len, height - margin); ctx.stroke();
      // Bottom Right
      ctx.beginPath(); ctx.moveTo(width - margin, height - margin - len); ctx.lineTo(width - margin, height - margin); ctx.lineTo(width - margin - len, height - margin); ctx.stroke();

      // Horizontal Sweep Grid Line
      const sweepY = (Math.sin(frameCount * 0.01) + 1) * 0.5 * (height - margin * 2) + margin;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.025)';
      ctx.beginPath();
      ctx.moveTo(margin + 5, sweepY);
      ctx.lineTo(width - margin - 5, sweepY);
      ctx.stroke();

      // Dynamic variables for visual updates
      const signalFreq = isHovered ? 2.0 + (mouseX + 0.5) * 1.2 : 2.45;
      const signalAmp = isHovered ? 30 + (mouseY + 0.5) * 35 : 45.2;
      const txSpeed = isHovered ? 600 + Math.floor((mouseX + 0.5) * 400) : 840;

      if (frameCount % 12 === 0) {
        setTelemetry({
          freq: parseFloat(signalFreq.toFixed(3)),
          amp: parseFloat(signalAmp.toFixed(1)),
          speed: txSpeed + Math.floor(Math.random() * 20 - 10)
        });
      }

      // Text Telemetry Console Layout
      ctx.font = '9px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
      
      ctx.fillStyle = 'rgba(255, 176, 0, 0.7)';
      ctx.fillText('COMMS://LINK_ESTABLISHED', margin + 12, margin + 22);
      ctx.fillText(`CARRIER_FREQ: ${telemetry.freq} GHz`, margin + 12, margin + 37);
      ctx.fillText(`TRANSMIT_AMP: ${telemetry.amp} dB`, margin + 12, margin + 52);

      ctx.fillStyle = 'rgba(0, 240, 255, 0.7)';
      ctx.fillText(`CIPHER_SUITE: AES_256_GCM`, width - margin - 160, margin + 22);
      ctx.fillText(`LINK_RATE: ${telemetry.speed} Mb/s`, width - margin - 160, margin + 37);
      ctx.fillText(`PACKETS: SECURE [0.00% LOSS]`, width - margin - 160, margin + 52);

      // Bottom dynamic wave diagram (Modulation carrier)
      ctx.fillStyle = 'rgba(255, 176, 0, 0.4)';
      ctx.fillText('MODULATED SIGNAL SIDEBAND (1.2V-P)', margin + 12, height - margin - 22);
      ctx.strokeStyle = 'rgba(255, 176, 0, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = margin + 12; x < width - margin - 12; x += 4) {
        // Amplitudes and shape follow modulated states
        const scaleVal = 4 + (telemetry.amp / 60) * 4;
        const wave = Math.sin(x * 0.08 * (telemetry.freq / 2) + frameCount * 0.15) * scaleVal;
        const y = height - margin - 10 + wave;
        if (x === margin + 12) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, [telemetry.freq, telemetry.amp]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[400px] lg:min-h-[500px] relative rounded-2xl overflow-hidden glass-card border border-white/5 bg-dark-900/60 backdrop-blur-xl group hover:border-amber-500/20 transition-all duration-700 pointer-events-auto"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-cyber-teal/5 to-amber-500/5 opacity-40 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none" />
      <canvas 
        ref={canvasRef} 
        className="block cursor-crosshair relative z-10 w-full h-full"
      />
      <div className="absolute bottom-6 right-8 z-20 pointer-events-none select-none text-right">
        <span className="text-[10px] font-mono text-white/20 tracking-wider group-hover:text-amber-500/40 transition-colors uppercase">
          [ Click canvas or pan to modulate signal wave ]
        </span>
      </div>
    </div>
  );
}
