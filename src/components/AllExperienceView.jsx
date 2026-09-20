import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { SplineScene } from './ui/SplineScene';

export default function AllExperienceView() {
  const [experiences, setExperiences] = useState([]);

  const DEFAULT_EXPERIENCES = [
    {
      id: 1,
      title: "Google Student Ambassador",
      company: "Google",
      type: "Internship",
      duration: "Aug 2025 – Jan 2026 (6 mos)",
      desc: "Represented Google on campus, organizing tech workshops and fostering developer communities.",
      tech: [],
      order: 0
    },
    {
      id: 2,
      title: "Open Source Developer",
      company: "Hacktoberfest",
      type: "Part-time, Remote",
      duration: "Oct 2025 (1 mo)",
      desc: "Contributed to multiple high-impact open-source repositories and resolved backend infrastructure issues.",
      tech: ["Open-Source Software", "Open-Source Development", "Backend Engineering"],
      order: 1
    }
  ];

  useEffect(() => {
    fetch("/api/experiences/")
      .then(res => {
        if (!res.ok) throw new Error("Local experiences error");
        return res.json();
      })
      .catch(() => fetch("https://guptadharmesh.pythonanywhere.com/api/experiences/").then(res => res.json()))
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setExperiences(data);
        else setExperiences(DEFAULT_EXPERIENCES);
      })
      .catch(err => {
        console.error("Error fetching experiences:", err);
        setExperiences(DEFAULT_EXPERIENCES);
      });
  }, []);

  return (
    <div className="bg-dark-900 min-h-screen text-white font-sans selection:bg-amber-500/30 selection:text-amber-200 relative pb-24">
      {/* Background overlay */}
      <div className="absolute inset-0 z-0 bg-dark-900/95 noise-overlay pointer-events-none" />

      {/* Header */}
      <header className="max-w-[1400px] mx-auto px-6 pt-12 flex justify-between items-center relative z-20">
        <button 
          onClick={() => window.portfolioNavigate('/')}
          className="flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 text-white/70 hover:text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-300 font-mono text-sm uppercase rounded shadow-[0_0_15px_rgba(0,0,0,0.4)]"
        >
          <ArrowLeft size={16} />
          [back_to_core]
        </button>
        <span className="text-white/20 font-mono text-xs tracking-widest uppercase hidden md:inline">
          SYSTEM_ARCHIVE_FILE // EXPERIENCE_TIMELINE
        </span>
      </header>

      <section className="py-16 px-6 max-w-[1400px] mx-auto relative z-20">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-16 border-b border-white/5 pb-8">
          <h2 className="text-4xl font-bold font-mono text-white text-glow-amber tracking-widest uppercase">_EXPERIENCE_LOGS</h2>
          <span className="text-cyber-teal font-mono text-xs px-3 py-1 bg-cyber-teal/10 border border-cyber-teal/20 rounded uppercase tracking-wider md:self-center">
            {experiences.length} ACTIVE_RECORDS
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Left Side: Timeline */}
          <div className="flex flex-col">
            <div className="relative border-l border-white/10 ml-4 md:ml-6 pl-10 py-4 h-full flex flex-col gap-10">
              {experiences.map((exp, idx) => {
                const isFirst = idx === 0;
                return (
                  <motion.div 
                    key={exp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="relative group h-full"
                  >
                    <div className={`absolute -left-[45px] top-4 w-3 h-3 rounded-full box-glow-amber group-hover:scale-150 transition-transform duration-300 ${isFirst ? 'bg-cyber-teal shadow-[0_0_10px_#00f0ff]' : 'bg-amber-500'}`}></div>
                    <div className={`glass-card p-8 border-white/5 transition-all duration-300 noise-overlay h-full flex flex-col ${isFirst ? 'group-hover:border-cyber-teal/40 group-hover:shadow-[0_0_25px_rgba(0,240,255,0.2)]' : 'group-hover:border-amber-500/30 group-hover:shadow-[0_0_25px_rgba(255,176,0,0.2)]'}`}>
                      
                      {isFirst && (
                        <div className="absolute top-0 right-0 bg-cyber-teal/10 border-b border-l border-cyber-teal/30 px-4 py-1 rounded-bl-lg flex items-center gap-2">
                          <Award size={14} className="text-cyber-teal" />
                          <span className="text-cyber-teal font-mono text-xs uppercase tracking-widest">Premium Node</span>
                        </div>
                      )}

                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:animate-pulse">{exp.title}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                        <p className={`font-mono text-sm tracking-widest uppercase ${isFirst ? 'text-cyber-teal text-glow-teal' : 'text-amber-500 text-glow-amber'}`}>{exp.company}</p>
                        <span className="hidden sm:inline text-white/30">•</span>
                        <p className="text-white/50 font-mono text-xs uppercase tracking-wider">{exp.type}</p>
                      </div>
                      
                      <div className="inline-block self-start px-3 py-1 bg-dark-800/80 border border-white/10 rounded font-mono text-xs text-white/60 mb-6">
                        {exp.duration}
                      </div>
                      
                      <p className="text-white/70 font-sans flex-grow mb-4">
                        {exp.desc}
                      </p>

                      {exp.tech && exp.tech.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                          {exp.tech.map(tag => (
                            <span key={tag} className="text-xs font-mono px-2 py-1 bg-white/5 border border-white/10 rounded text-white/50">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Spline scene */}
          <div className="hidden lg:flex relative pointer-events-auto w-full items-center justify-center">
            <div className="absolute inset-0 w-full h-full mix-blend-screen" style={{ transform: 'scale(0.95) translateX(8%)' }}>
              <SplineScene 
                scene="https://prod.spline.design/6PqZ39NqAFy9b0Lj/scene.splinecode" 
                className="w-full h-full"
                onLoad={(spline) => {
                  const objects = spline.getAllObjects();
                  objects.forEach(obj => {
                    if (
                      (obj.type && obj.type.toLowerCase() === 'text') ||
                      (obj.name && (
                        obj.name.toLowerCase().includes('text') ||
                        obj.name.includes('Building') ||
                        obj.name.includes('xperiences') ||
                        obj.name.includes('Crafting') ||
                        obj.name.includes('Resources') ||
                        obj.name.includes('Contact') ||
                        obj.name.includes('MOTION')
                      ))
                    ) {
                      obj.visible = false;
                      if (obj.scale) {
                        obj.scale.x = 0;
                        obj.scale.y = 0;
                        obj.scale.z = 0;
                      }
                    }
                  });
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
