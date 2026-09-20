import React, { useEffect, useRef, useState } from 'react';

export function QuantumAttractor() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ yaw: 0, pitch: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let width = 0;
    let height = 0;

    // Attractor parameters
    const a = 0.95;
    const b = 0.7;
    const c = 0.6;
    const d = 3.5;
    const e = 0.25;
    const f = 0.1;
    const dt = 0.015;

    const PARTICLE_COUNT = 600;
    const particles = [];

    // Helper to initialize/respawn a particle on the attractor shell
    const initParticle = (p = {}) => {
      p.x = (Math.random() - 0.5) * 1.5;
      p.y = (Math.random() - 0.5) * 1.5;
      p.z = Math.random() * 2;
      p.history = []; // Initialize coordinate history trail

      // Run some initial warmup steps to collapse the particle onto the chaotic attractor manifold
      const warmupSteps = 50 + Math.floor(Math.random() * 50);
      for (let i = 0; i < warmupSteps; i++) {
        const dx = (p.z - b) * p.x - d * p.y;
        const dy = d * p.x + (p.z - b) * p.y;
        const dz = c + a * p.z - (p.z * p.z * p.z) / 3 - (p.x * p.x + p.y * p.y) * (1 + e * p.z) + f * p.z * p.x * p.x * p.x;
        p.x += dx * dt;
        p.y += dy * dt;
        p.z += dz * dt;
      }

      p.speed = 0.6 + Math.random() * 0.8;
      p.opacity = 0.25 + Math.random() * 0.6;
      return p;
    };

    // Populate initial particle swarm
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(initParticle({}));
    }

    // Handles canvas resizing to match parent element bounds
    const resize = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      width = rect ? rect.width : canvas.clientWidth;
      height = rect ? rect.height : canvas.clientHeight;
      
      // Support high DPI screens for crisp rendering
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

    // Mouse tracking state for rotation control
    let yaw = 0.5;
    let pitch = 0.2;
    let targetYaw = 0.5;
    let targetPitch = 0.2;
    let mouseActive = false;
    let frameCount = 0;

    const handleMouseMove = (e) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      
      // Map mouse position to yaw (-Math.PI to Math.PI) and pitch (-Math.PI/2 to Math.PI/2)
      targetYaw = ((mx / width) - 0.5) * Math.PI * 2.2;
      targetPitch = -((my / height) - 0.5) * Math.PI * 1.5;
      mouseActive = true;
    };

    const handleMouseLeave = () => {
      mouseActive = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Main animation loop
    const animate = () => {
      frameCount++;
      
      // Clear canvas fully to support transparency
      ctx.clearRect(0, 0, width, height);

      // Smooth interpolation (lerp) towards target angles
      if (mouseActive) {
        yaw += (targetYaw - yaw) * 0.08;
        pitch += (targetPitch - pitch) * 0.08;
      } else {
        // Auto rotate slowly when idle
        yaw += 0.004;
        pitch = 0.25 + Math.sin(frameCount * 0.003) * 0.15;
      }

      // Update external React state occasionally (rate-limited to avoid excessive re-renders)
      if (frameCount % 10 === 0) {
        setRotation({ yaw, pitch });
      }

      // Precalculate trig values for rotation matrix
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosX = Math.cos(pitch);
      const sinX = Math.sin(pitch);

      // Reduced scale factor to prevent particles from rendering under borders/telemetry
      const scale = Math.min(width, height) * 0.15;
      const centerX = width / 2;
      const centerY = height / 2 - 10; // Shift up slightly for HUD room

      // 1. Draw central retro calibration circle (HUD background) - removed oversized outer circles
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.04)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, scale * 1.3, 0, Math.PI * 2);
      ctx.stroke();

      // 2. Update and render particle physics with history trails
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Solve Aizawa differential equations for next step
        const dx = (p.z - b) * p.x - d * p.y;
        const dy = d * p.x + (p.z - b) * p.y;
        const dz = c + a * p.z - (p.z * p.z * p.z) / 3 - (p.x * p.x + p.y * p.y) * (1 + e * p.z) + f * p.z * p.x * p.x * p.x;

        p.x += dx * dt * p.speed;
        p.y += dy * dt * p.speed;
        p.z += dz * dt * p.speed;

        // Reset particle if it diverges or breaks out of bounds
        const distSq = p.x * p.x + p.y * p.y + p.z * p.z;
        if (distSq > 100 || isNaN(p.x) || p.z < -2) {
          initParticle(p);
          continue;
        }

        // Push current coordinates to trail history
        p.history.push({ x: p.x, y: p.y, z: p.z });
        if (p.history.length > 8) {
          p.history.shift();
        }

        // Draw particle trail from history
        if (p.history.length > 1) {
          // Project first point in history
          let pt0 = p.history[0];
          let dx_0 = pt0.x;
          let dy_0 = pt0.y;
          let dz_0 = pt0.z - 1.1;

          let x1_0 = dx_0 * cosY - dz_0 * sinY;
          let z1_0 = dx_0 * sinY + dz_0 * cosY;
          let y2_0 = dy_0 * cosX - z1_0 * sinX;

          let prevSx = centerX + x1_0 * scale;
          let prevSy = centerY + y2_0 * scale;

          for (let h = 1; h < p.history.length; h++) {
            const pt = p.history[h];
            const dx_h = pt.x;
            const dy_h = pt.y;
            const dz_h = pt.z - 1.1;

            const x1_h = dx_h * cosY - dz_h * sinY;
            const z1_h = dx_h * sinY + dz_h * cosY;
            const y2_h = dy_h * cosX - z1_h * sinX;

            const sx = centerX + x1_h * scale;
            const sy = centerY + y2_h * scale;

            if (Math.abs(sx - prevSx) < 150 && Math.abs(sy - prevSy) < 150) {
              const historyRatio = h / p.history.length;
              const zRatio = Math.max(0, Math.min(1, (pt.z - 0.2) / 2.0));

              // Colors: Cyber Teal (0, 240, 255) to Amber Glow (255, 176, 0)
              const r = Math.floor(0 * (1 - zRatio) + 255 * zRatio);
              const g = Math.floor(240 * (1 - zRatio) + 176 * zRatio);
              const b = Math.floor(255 * (1 - zRatio) + 0 * zRatio);

              ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${p.opacity * historyRatio * 0.75})`;
              ctx.lineWidth = historyRatio * 1.5;
              ctx.beginPath();
              ctx.moveTo(prevSx, prevSy);
              ctx.lineTo(sx, sy);
              ctx.stroke();
            }

            prevSx = sx;
            prevSy = sy;
          }
        }
      }

      // 3. Render Cyber-HUD Frame Overlays
      const margin = 20;
      const len = 12;

      // Outer Corner brackets
      ctx.strokeStyle = 'rgba(255, 176, 0, 0.25)';
      ctx.lineWidth = 1;

      // Top Left
      ctx.beginPath();
      ctx.moveTo(margin, margin + len);
      ctx.lineTo(margin, margin);
      ctx.lineTo(margin + len, margin);
      ctx.stroke();

      // Top Right
      ctx.beginPath();
      ctx.moveTo(width - margin, margin + len);
      ctx.lineTo(width - margin, margin);
      ctx.lineTo(width - margin - len, margin);
      ctx.stroke();

      // Bottom Left
      ctx.beginPath();
      ctx.moveTo(margin, height - margin - len);
      ctx.lineTo(margin, height - margin);
      ctx.lineTo(margin + len, height - margin);
      ctx.stroke();

      // Bottom Right
      ctx.beginPath();
      ctx.moveTo(width - margin, height - margin - len);
      ctx.lineTo(width - margin, height - margin);
      ctx.lineTo(width - margin - len, height - margin);
      ctx.stroke();

      // Horizontal scanner sweeping line
      const scanY = (Math.sin(frameCount * 0.015) + 1) * 0.5 * (height - margin * 2) + margin;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.03)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(margin + 5, scanY);
      ctx.lineTo(width - margin - 5, scanY);
      ctx.stroke();

      // Dynamic Telemetry Readouts
      ctx.font = '9px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
      ctx.fillStyle = 'rgba(255, 176, 0, 0.75)';
      ctx.fillText('LOC://PROJECTS_CORE', margin + 12, margin + 22);
      ctx.fillText(`SYS_YAW: ${yaw.toFixed(4)}`, margin + 12, margin + 37);
      ctx.fillText(`SYS_PIT: ${pitch.toFixed(4)}`, margin + 12, margin + 52);

      ctx.fillStyle = 'rgba(0, 240, 255, 0.75)';
      ctx.fillText(`PARTICLES: ${PARTICLE_COUNT} ACTIVE`, width - margin - 150, margin + 22);
      ctx.fillText('CORE: AIZAWA_3D_ATTRACTOR', width - margin - 150, margin + 37);
      ctx.fillText(`STATUS: COHERENT [${(98.2 + Math.sin(frameCount * 0.05) * 0.4).toFixed(2)}%]`, width - margin - 150, margin + 52);

      // Bottom Telemetry Flux Chart
      ctx.fillStyle = 'rgba(0, 240, 255, 0.4)';
      ctx.fillText('QUANTUM VIBRATION FLUX (10Ghz)', margin + 12, height - margin - 20);
      
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.18)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = margin + 12; x < width - margin - 12; x += 3) {
        const wave = Math.sin(x * 0.04 + frameCount * 0.08) * 4 * Math.sin(x * 0.005 + frameCount * 0.02);
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
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[400px] lg:min-h-[500px] relative rounded-2xl overflow-hidden glass-card border border-white/5 bg-dark-900/60 backdrop-blur-xl group hover:border-amber-500/20 transition-all duration-700 pointer-events-auto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-cyber-teal/5 opacity-40 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none" />
      <canvas 
        ref={canvasRef} 
        className="block cursor-crosshair relative z-10 w-full h-full"
      />
      <div className="absolute bottom-6 right-8 z-20 pointer-events-none select-none text-right">
        <span className="text-[10px] font-mono text-white/20 tracking-wider group-hover:text-amber-500/40 transition-colors uppercase">
          [ Hover / Pan to skew vector matrix ]
        </span>
      </div>
    </div>
  );
}
