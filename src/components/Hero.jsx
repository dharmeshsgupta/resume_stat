import React, { useEffect, useRef, useState } from 'react';
import { Terminal, Sparkles, Download, ArrowDown, Zap, Bot, Code2, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero({ linkedinFollowers, resumeUrl }) {
  const textRef = useRef(null);

  return (
    <div className="relative min-h-[90vh] sm:min-h-screen w-full flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 relative z-10 scroll-snap-panel scroll-mt-20">
      
      {/* Cartoon Badges on Desktop */}
      <div className="hidden lg:block absolute top-32 left-8 z-20 pointer-events-none">
        <div className="px-4 py-2 bg-amber-400 text-dark-900 font-mono font-bold text-xs rounded-xl border-2 border-amber-300 shadow-[4px_4px_0px_#000] flex items-center gap-2">
          <Zap size={16} className="fill-dark-900 stroke-[2.5]" />
          <span>PYTHON BACKEND & FASTAPI</span>
        </div>
      </div>

      <div className="hidden lg:block absolute top-52 left-16 z-20 pointer-events-none">
        <div className="px-4 py-2 bg-cyber-teal text-dark-900 font-mono font-bold text-xs rounded-xl border-2 border-cyan-300 shadow-[4px_4px_0px_#000] flex items-center gap-2">
          <Bot size={16} className="stroke-[2.5]" />
          <span>GENAI & LANGGRAPH AGENTS</span>
        </div>
      </div>

      {/* Main Hero Terminal Window */}
      <div className="max-w-[1400px] w-full mx-auto flex items-center justify-center lg:justify-end">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="z-20 max-w-2xl w-full"
        >
          <div ref={textRef} className="bg-dark-900/90 backdrop-blur-2xl border-4 border-amber-400 shadow-[8px_8px_0px_#ff9f00] p-5 sm:p-7 md:p-9 rounded-2xl relative noise-overlay">
            
            {/* Cartoon Window Header Bar */}
            <div className="flex items-center justify-between mb-5 border-b-2 border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-red-500 border border-red-700"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-yellow-400 border border-yellow-600"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-green-500 border border-green-700"></div>
              </div>
              
              <div className="flex items-center gap-2">
                <Terminal className="text-amber-400 w-5 h-5 stroke-[2.5]" />
                <span className="text-amber-400 font-mono text-xs sm:text-sm font-extrabold tracking-widest uppercase">
                  DHARMESH_GUPTA.py
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-500/20 border border-emerald-400/60 rounded-full">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-[10px] font-mono font-bold text-emerald-300 uppercase">ONLINE</span>
              </div>
            </div>

            {/* Main Content Info */}
            <div className="font-mono text-white space-y-3.5 text-xs sm:text-sm md:text-base leading-relaxed">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 border-b border-white/10 pb-2">
                <span className="text-amber-400 font-bold tracking-wider">&gt; DEVELOPER:</span> 
                <span className="text-white font-black text-sm sm:text-lg">
                  Dharmesh Gupta
                </span>
              </div>

              <div className="flex flex-col gap-1 border-b border-white/10 pb-2">
                <span className="text-cyber-teal font-bold tracking-wider">&gt; SPECIALIZATION:</span> 
                <span className="text-white font-semibold leading-snug">
                  Python Backend Engineer • GenAI Architect • LangGraph & LLM Orchestrator
                </span>
              </div>

              <div className="flex flex-col gap-1 border-b border-white/10 pb-2">
                <span className="text-purple-400 font-bold tracking-wider">&gt; TECH_STACK:</span> 
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Python', 'Django', 'FastAPI', 'PostgreSQL', 'Docker', 'LangChain', 'AWS'].map(tech => (
                    <motion.span 
                      key={tech} 
                      whileHover={{ scale: 1.1, rotate: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-2 py-0.5 bg-white/10 border border-white/20 rounded font-mono text-[11px] font-bold text-amber-300 hover:bg-amber-400 hover:text-dark-900 transition-colors cursor-pointer inline-block"
                    >
                      #{tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 border-b border-white/10 pb-2">
                <span className="text-white/60 font-bold tracking-wider">&gt; NETWORK_STAT:</span> 
                <span className="text-emerald-400 font-bold">{linkedinFollowers} LinkedIn Connections</span>
              </div>

              {/* Cartoon Command Quick Jump Filters */}
              <div className="pt-2">
                <p className="text-[11px] text-white/50 mb-2 font-bold uppercase tracking-wider">&gt; Quick Section Jump:</p>
                <div className="flex flex-wrap gap-2">
                  <motion.a 
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href="#about" 
                    className="cartoon-btn px-3 py-1 bg-dark-800 border-amber-400 text-amber-300 text-xs shadow-[2px_2px_0px_#ff9f00] hover:bg-amber-400 hover:text-dark-900"
                  >
                    ⚡ About Me
                  </motion.a>
                  <motion.a 
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href="#projects" 
                    className="cartoon-btn px-3 py-1 bg-dark-800 border-cyber-teal text-cyber-teal text-xs shadow-[2px_2px_0px_#00f0ff] hover:bg-cyber-teal hover:text-dark-900"
                  >
                    🚀 Projects
                  </motion.a>
                  <motion.a 
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href="#experience" 
                    className="cartoon-btn px-3 py-1 bg-dark-800 border-purple-400 text-purple-300 text-xs shadow-[2px_2px_0px_#c084fc] hover:bg-purple-400 hover:text-dark-900"
                  >
                    💼 Experience
                  </motion.a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-2 flex flex-col sm:flex-row items-center gap-3">
                <motion.a 
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  href={resumeUrl || '/resume.pdf'} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  download="Dharmesh_Gupta_Resume.pdf"
                  className="w-full sm:w-auto cartoon-btn px-5 py-2.5 bg-cyber-teal border-cyan-300 text-dark-900 text-sm shadow-[4px_4px_0px_#000] hover:bg-cyan-300 font-extrabold flex items-center justify-center gap-2"
                >
                  <Download size={16} className="stroke-[3]" />
                  <span>Download Resume / CV</span>
                </motion.a>

                <motion.a 
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  href="#contact"
                  className="w-full sm:w-auto cartoon-btn px-5 py-2.5 bg-amber-400 border-amber-300 text-dark-900 text-sm shadow-[4px_4px_0px_#000] hover:bg-amber-300 font-extrabold flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} className="stroke-[2.5]" />
                  <span>Hire Dharmesh</span>
                </motion.a>
              </div>

            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-amber-400 pointer-events-none sm:hidden">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-dark-900/90 px-2.5 py-0.5 border border-amber-400/60 rounded-full shadow-[2px_2px_0px_#000]">
          Scroll Down
        </span>
        <ArrowDown size={14} className="animate-bounce stroke-[2.5]" />
      </div>

    </div>
  );
}


