import React, { useState, useEffect } from 'react';
import { Briefcase, Award, Sparkles, Calendar, Building2, CheckCircle2, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import Interactive3DAvatar from './ui/Interactive3DAvatar';

export default function Experience() {
  const [experiences, setExperiences] = useState([]);

  const DEFAULT_EXPERIENCES = [
    {
      id: 1,
      title: "Google Student Ambassador",
      company: "Google",
      type: "Internship",
      duration: "Aug 2025 – Jan 2026 (6 mos)",
      desc: "Represented Google on campus, organizing technical workshops, hands-on developer hackathons, and fostering Google Developer Groups (GDG) student communities.",
      tech: ["Community Leadership", "Developer Advocacy", "Google AI Tools"],
      cardStyle: "cartoon-card-teal",
      order: 0
    },
    {
      id: 2,
      title: "Open Source Developer",
      company: "Hacktoberfest",
      type: "Part-time, Remote",
      duration: "Oct 2025 (1 mo)",
      desc: "Contributed to multiple high-impact open-source Python repositories, resolved complex backend infrastructure issues, and optimized REST endpoints.",
      tech: ["Python", "Open-Source Software", "Backend Engineering", "Git / GitHub"],
      cardStyle: "cartoon-card-purple",
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
    <section id="experience" className="py-16 sm:py-24 px-4 sm:px-6 max-w-[1400px] mx-auto relative z-20">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 sm:mb-14 border-b border-white/10 pb-6">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-cyber-teal text-dark-900 rounded-2xl border-2 border-cyan-300 shadow-[3px_3px_0px_#000]">
            <Briefcase size={28} className="stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono text-white tracking-widest uppercase text-glow-amber">
              _EXPERIENCE
            </h2>
            <p className="text-xs sm:text-sm font-mono text-cyber-teal font-semibold mt-0.5">
              Ambassador • Open Source • Engineering Roles
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 px-3.5 py-2 bg-dark-900 border-2 border-cyan-300 rounded-xl font-mono text-xs text-cyber-teal shadow-[3px_3px_0px_#00f0ff]">
          <Users size={16} className="text-amber-400" />
          <span>Google Ambassador & OSS Contributor</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        
        {/* Left Side: 3D Bot Avatar & Professional Summary Card */}
        <div className="flex flex-col gap-6 sticky top-24 self-start">
          <Interactive3DAvatar />
          
          <div className="cartoon-card-teal p-6 noise-overlay border-2 border-cyan-300 shadow-[4px_4px_0px_#00f0ff]">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10 mb-3">
              <Sparkles size={18} className="text-amber-400" />
              <h3 className="font-mono text-sm font-black text-white uppercase tracking-wider">
                Leadership & Contributions
              </h3>
            </div>

            <div className="space-y-2.5 text-xs font-mono text-white/90 mb-4 leading-relaxed">
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-amber-300">Campus Leadership:</strong> Google Student Ambassador hosting technical events & hackathons.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-cyber-teal">Open Source:</strong> Hacktoberfest developer optimizing Python backend architectures.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-purple-300">Ecosystem:</strong> Active collaboration with Google Developer Groups (GDG).</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10">
              <p className="text-[11px] font-mono text-white/60 font-bold uppercase mb-2">Technical Competencies:</p>
              <div className="flex flex-wrap gap-1.5">
                {['Python 3.12', 'FastAPI', 'LangGraph', 'Docker', 'RESTful APIs', 'Git Workflow', 'Cloud Deployment'].map(skill => (
                  <span key={skill} className="px-2 py-0.5 bg-dark-900/80 border border-white/15 rounded text-[11px] font-mono text-cyan-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Timeline Content */}
        <div className="flex flex-col">
          <div className="relative border-l-4 border-cyber-teal/50 ml-3 sm:ml-6 pl-6 sm:pl-8 py-2 flex flex-col gap-6">
            {experiences.slice(0, 2).map((exp, idx) => {
              const isFirst = idx === 0;
              const cardClass = exp.cardStyle || (isFirst ? "cartoon-card-teal" : "cartoon-card-purple");

              return (
                <motion.div 
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline node */}
                  <div className="absolute -left-[35px] sm:-left-[43px] top-4 w-5 h-5 rounded-full bg-cyber-teal border-2 border-dark-900 shadow-[2px_2px_0px_#00f0ff]"></div>

                  <div className={`${cardClass} p-5 sm:p-7 noise-overlay`}>
                    
                    {isFirst && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyber-teal text-dark-900 font-mono text-xs font-black rounded-lg border border-cyan-300 mb-3 shadow-[2px_2px_0px_#000]">
                        <Award size={14} className="stroke-[3]" />
                        <span>FEATURED AMBASSADORSHIP</span>
                      </div>
                    )}

                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 font-sans">{exp.title}</h3>
                    
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="font-mono text-xs sm:text-sm font-extrabold text-amber-300 uppercase flex items-center gap-1">
                        <Building2 size={14} />
                        {exp.company}
                      </span>
                      <span className="text-white/40">•</span>
                      <span className="text-white/80 font-mono text-xs font-bold bg-dark-900/60 px-2 py-0.5 rounded border border-white/10">{exp.type}</span>
                    </div>
                    
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-dark-900/80 border border-white/20 rounded-lg text-white/80 font-mono text-xs mb-4">
                      <Calendar size={13} className="text-cyber-teal" />
                      <span>{exp.duration}</span>
                    </div>
                    
                    <p className="text-white/90 font-sans text-sm sm:text-base leading-relaxed mb-4">
                      {exp.desc}
                    </p>

                    {exp.tech && exp.tech.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                        {exp.tech.map(tag => (
                          <span key={tag} className="text-[11px] font-mono font-bold px-2 py-0.5 bg-dark-900/60 border border-white/20 rounded text-cyber-teal">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {experiences.length > 2 && (
              <div className="flex justify-start mt-2">
                <button 
                  onClick={() => window.portfolioNavigate('/experience')}
                  className="cartoon-btn px-5 py-2.5 bg-amber-400 border-amber-300 text-dark-900 text-xs font-mono font-black uppercase shadow-[3px_3px_0px_#000] hover:bg-amber-300"
                >
                  ⚡ [ACCESS ALL LOGS] &rarr;
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
