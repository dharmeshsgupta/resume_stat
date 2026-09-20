import React, { useEffect, useRef, useState } from 'react';
import { Bot, Cpu, Sparkles, Zap, ShieldCheck, Activity, Radio, Flame, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Interactive3DAvatar() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [fps, setFps] = useState(60);
  const [mode, setMode] = useState('AGENT'); // 'AGENT', 'OVERDRIVE', 'DEFENSE'

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = 0;
    let height = 0;

    const resize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    // Build 3D Cyber Bot Mesh Structure (Head, Visor, Horns, Core, Orbit Ring)
    const points = [];

    // 1. Sphere Head Base (Radius 70)
    for (let i = 0; i < 70; i++) {
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.PI * 2 * Math.random();
      const r = 70;
      points.push({
        type: 'head',
        x: r * Math.sin(theta) * Math.cos(phi),
        y: r * Math.sin(theta) * Math.sin(phi),
        z: r * Math.cos(theta),
        size: Math.random() * 2 + 1,
        color: '#00f0ff'
      });
    }

    // 2. Halo Orbit Ring (Radius 115)
    for (let i = 0; i < 40; i++) {
      const angle = (i / 40) * Math.PI * 2;
      points.push({
        type: 'ring',
        x: 115 * Math.cos(angle),
        y: 15 * Math.sin(angle * 2),
        z: 115 * Math.sin(angle),
        size: 2.2,
        color: '#ff9f00'
      });
    }

    // 3. Cyber Visor Eyes (Left & Right)
    points.push({ type: 'eye_left', x: -22, y: -12, z: 65, size: 8, color: '#00f0ff' });
    points.push({ type: 'eye_right', x: 22, y: -12, z: 65, size: 8, color: '#00f0ff' });

    // 4. Equalizer Mouth Matrix (5 bars)
    for (let i = -2; i <= 2; i++) {
      points.push({ type: 'mouth', x: i * 8, y: 28, z: 62, size: 3, index: i + 2, color: '#00f0ff' });
    }

    let angleX = 0;
    let angleY = 0;
    let targetAngleX = 0;
    let targetAngleY = 0;
    let lastTime = performance.now();
    let frameCount = 0;

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / width - 0.5;
      const my = (e.clientY - rect.top) / height - 0.5;
      targetAngleY = mx * 1.6;
      targetAngleX = -my * 1.6;
      setMousePos({ x: Math.round(mx * 100), y: Math.round(my * 100) });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = (now) => {
      // Calculate FPS
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = now;
      }

      angleX += (targetAngleX - angleX) * 0.08;
      angleY += (targetAngleY - angleY) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const time = now * 0.001;

      // Mode configuration colors
      const primaryColor = mode === 'OVERDRIVE' ? '#ff9f00' : mode === 'DEFENSE' ? '#c084fc' : '#00f0ff';
      const secondaryColor = mode === 'OVERDRIVE' ? '#ff4d4d' : mode === 'DEFENSE' ? '#38bdf8' : '#ff9f00';

      const rotY = angleY + time * (mode === 'OVERDRIVE' ? 0.9 : 0.4);
      const rotX = angleX + Math.sin(time * 0.7) * 0.15;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Transform & project all points
      const projected = points.map((p, idx) => {
        let x = p.x;
        let y = p.y;
        let z = p.z;

        // Animate mouth bars
        if (p.type === 'mouth') {
          const barHeight = Math.sin(time * 8 + p.index) * 6;
          y += barHeight;
        }

        // Rotate Y
        let x1 = x * cosY - z * sinY;
        let z1 = z * cosY + x * sinY;

        // Rotate X
        let y1 = y * cosX - z1 * sinX;
        let z2 = z1 * cosX + y * sinX;

        // Perspective
        const fov = 380;
        const scale = fov / (fov + z2 + 160);
        const px = cx + x1 * scale;
        const py = cy + y1 * scale;

        return { ...p, px, py, scale, z: z2 };
      });

      // Sort by depth
      projected.sort((a, b) => b.z - a.z);

      // Draw connecting holographic facial structure lines
      ctx.lineWidth = 1;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          if (p1.type === 'head' && p2.type === 'head') {
            const dx = p1.px - p2.px;
            const dy = p1.py - p2.py;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 42) {
              const alpha = (1 - dist / 42) * 0.2 * Math.min(p1.scale, p2.scale);
              ctx.strokeStyle = primaryColor;
              ctx.globalAlpha = alpha;
              ctx.beginPath();
              ctx.moveTo(p1.px, p1.py);
              ctx.lineTo(p2.px, p2.py);
              ctx.stroke();
            }
          }
        }
      }

      // Draw projected nodes
      projected.forEach(p => {
        const alpha = Math.max(0.2, Math.min(1, (p.z + 160) / 320));
        ctx.globalAlpha = alpha;

        if (p.type === 'eye_left' || p.type === 'eye_right') {
          // Cyber Eye Lenses
          const eyeGlow = Math.sin(time * 6) * 2;
          const radius = (p.size + eyeGlow) * p.scale;

          ctx.fillStyle = primaryColor;
          ctx.beginPath();
          ctx.arc(p.px, p.py, Math.max(2, radius), 0, Math.PI * 2);
          ctx.fill();

          // Outer Eye Ring
          ctx.strokeStyle = secondaryColor;
          ctx.lineWidth = 2 * p.scale;
          ctx.beginPath();
          ctx.arc(p.px, p.py, Math.max(4, radius * 1.6), 0, Math.PI * 2);
          ctx.stroke();
        } else if (p.type === 'mouth') {
          // Equalizer Mouth Nodes
          ctx.fillStyle = secondaryColor;
          ctx.beginPath();
          ctx.arc(p.px, p.py, p.size * p.scale, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'ring') {
          // Halo Ring Nodes
          ctx.fillStyle = secondaryColor;
          ctx.beginPath();
          ctx.arc(p.px, p.py, p.size * p.scale, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Head Base Nodes
          ctx.fillStyle = primaryColor;
          ctx.beginPath();
          ctx.arc(p.px, p.py, p.size * p.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1.0;

      // Draw Glowing Central Energy Core
      const corePulse = Math.sin(time * 4) * 8;
      const coreGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, 45 + corePulse);
      coreGrad.addColorStop(0, primaryColor);
      coreGrad.addColorStop(0.6, secondaryColor);
      coreGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 45 + corePulse, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current) resizeObserver.unobserve(containerRef.current);
    };
  }, [mode]);

  return (
    <div ref={containerRef} className="relative w-full h-[480px] rounded-2xl border-4 border-amber-400 bg-dark-900/90 backdrop-blur-xl overflow-hidden shadow-[8px_8px_0px_#ff9f00] flex flex-col justify-between p-5 noise-overlay">
      
      {/* Window Title Bar */}
      <div className="flex items-center justify-between border-b-2 border-white/10 pb-3 z-10">
        <div className="flex items-center gap-2">
          <Bot className="text-amber-400 animate-bounce" size={20} />
          <span className="font-mono text-xs sm:text-sm font-extrabold text-white tracking-wider uppercase">
            3D_GENAI_AGENT_CHARACTER.obj
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-cyber-teal/20 border border-cyber-teal/60 rounded text-[10px] font-mono font-bold text-cyber-teal">
            {fps} FPS
          </span>
          <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-400/60 rounded text-[10px] font-mono font-bold text-emerald-300">
            ONLINE
          </span>
        </div>
      </div>

      {/* Interactive 3D Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Character Mode Controller Buttons */}
      <div className="relative z-10 flex flex-wrap gap-2 justify-center my-2">
        <button
          onClick={() => setMode('AGENT')}
          className={`cartoon-btn px-3 py-1 text-xs ${mode === 'AGENT' ? 'bg-cyber-teal text-dark-900 border-cyan-300' : 'bg-dark-800 text-white border-white/20'}`}
        >
          🤖 NEURAL AGENT
        </button>

        <button
          onClick={() => setMode('OVERDRIVE')}
          className={`cartoon-btn px-3 py-1 text-xs ${mode === 'OVERDRIVE' ? 'bg-amber-400 text-dark-900 border-amber-300' : 'bg-dark-800 text-white border-white/20'}`}
        >
          ⚡ OVERDRIVE
        </button>

        <button
          onClick={() => setMode('DEFENSE')}
          className={`cartoon-btn px-3 py-1 text-xs ${mode === 'DEFENSE' ? 'bg-purple-400 text-dark-900 border-purple-300' : 'bg-dark-800 text-white border-white/20'}`}
        >
          🛡️ DEFENSE MATRIX
        </button>
      </div>

      {/* Footer Status Badges */}
      <div className="relative z-10 flex items-center justify-between pointer-events-none mt-auto pt-2">
        
        {/* Left Status Badge */}
        <motion.div 
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="px-3 py-1.5 bg-dark-800/90 border-2 border-amber-400 rounded-xl shadow-[3px_3px_0px_#ff9f00] font-mono text-[11px] text-amber-300 flex items-center gap-2"
        >
          <Activity size={14} className="animate-spin text-amber-400" />
          <span>3D ORBIT: [{mousePos.x}, {mousePos.y}]</span>
        </motion.div>

        {/* Right Tech Badge */}
        <motion.div 
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="px-3 py-1.5 bg-dark-800/90 border-2 border-cyber-teal rounded-xl shadow-[3px_3px_0px_#00f0ff] font-mono text-[11px] text-cyber-teal flex items-center gap-2"
        >
          <ShieldCheck size={14} />
          <span>MODE: {mode}</span>
        </motion.div>

      </div>
    </div>
  );
}
