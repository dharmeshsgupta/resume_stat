import React, { useState } from 'react';
import { Terminal, Code2, Github, Linkedin, Sparkles, Play, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import Interactive3DAvatar from './ui/Interactive3DAvatar';

export default function About() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const [terminalOutput, setTerminalOutput] = useState("System initialized. Select a sequence below...");
  const [activeCommand, setActiveCommand] = useState('INIT');

  const handleRunCommand = (cmd, text) => {
    setActiveCommand(cmd);
    setTerminalOutput(`Executing ${cmd}...\n> ${text}`);
  };

  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 max-w-[1400px] mx-auto relative z-20">
      
      {/* Mobile Sticky Social Bar */}
      <div className="flex md:hidden items-center justify-center gap-5 mb-10 p-3.5 rounded-2xl cartoon-card-teal noise-overlay">
        <a href="https://github.com/dharmeshsgupta" target="_blank" rel="noreferrer" className="p-2.5 bg-dark-900 border border-white/20 rounded-xl text-white hover:text-amber-400 active:scale-90 transition-all">
          <Github size={22} />
        </a>
        <a href="https://www.linkedin.com/in/dharmeshsgupta/" target="_blank" rel="noreferrer" className="p-2.5 bg-dark-900 border border-white/20 rounded-xl text-[#0a66c2] active:scale-90 transition-all">
          <Linkedin size={22} />
        </a>
        <a href="https://x.com/dharmeshsgupta" target="_blank" rel="noreferrer" className="p-2.5 bg-dark-900 border border-white/20 rounded-xl text-white active:scale-90 transition-all">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
        </a>
        <a href="https://leetcode.com/u/dharmeshsgupta/" target="_blank" rel="noreferrer" className="p-2.5 bg-dark-900 border border-white/20 rounded-xl text-[#ffa116] active:scale-90 transition-all">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.777 9.778a3.758 3.758 0 0 0 .002 5.305l6.087 6.09a3.757 3.757 0 0 0 5.305-.002l9.777-9.777a1.378 1.378 0 0 0-.974-2.351H13.724l2.967-2.967a1.375 1.375 0 0 0-.972-2.348h-2.236V0zm-4.326 12.017a.916.916 0 0 1 .648.268.905.905 0 0 1-.001 1.28l-2.583 2.584a.906.906 0 0 1-1.28-.001.917.917 0 0 1 .001-1.28l2.583-2.583a.916.916 0 0 1 .632-.268z" /></svg>
        </a>
        <a href="https://huggingface.co/dharmeshsgupta" target="_blank" rel="noreferrer" className="p-2.5 bg-dark-900 border border-white/20 rounded-xl text-[#FFD21E] active:scale-90 transition-all">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12.025 1.13c-5.77 0-10.449 4.647-10.449 10.378 0 1.112.178 2.181.503 3.185.064-.222.203-.444.416-.577a.96.96 0 0 1 .524-.15c.293 0 .584.124.84.284.278.173.48.408.71.694.226.282.458.611.684.951v-.014c.017-.324.106-.622.264-.874s.403-.487.762-.543c.3-.047.596.06.787.203s.31.313.4.467c.15.257.212.468.233.542.01.026.653 1.552 1.657 2.54.616.605 1.01 1.223 1.082 1.912.055.537-.096 1.059-.38 1.572.637.121 1.294.187 1.967.187.657 0 1.298-.063 1.921-.178-.287-.517-.44-1.041-.384-1.581.07-.69.465-1.307 1.081-1.913 1.004-.987 1.647-2.513 1.657-2.539.021-.074.083-.285.233-.542.09-.154.208-.323.4-.467a1.08 1.08 0 0 1 .787-.203c.359.056.604.29.762.543s.247.55.265.874v.015c.225-.34.457-.67.683-.952.23-.286.432-.52.71-.694.257-.16.547-.284.84-.285a.97.97 0 0 1 .524.151c.228.143.373.388.43.625l.006.04a10.3 10.3 0 0 0 .534-3.273c0-5.731-4.678-10.378-10.449-10.378M8.327 6.583a1.5 1.5 0 0 1 .713.174 1.487 1.487 0 0 1 .617 2.013c-.183.343-.762-.214-1.102-.094-.38.134-.532.914-.917.71a1.487 1.487 0 0 1 .69-2.803m7.486 0a1.487 1.487 0 0 1 .689 2.803c-.385.204-.536-.576-.916-.71-.34-.12-.92.437-1.103.094a1.487 1.487 0 0 1 .617-2.013 1.5 1.5 0 0 1 .713-.174m-10.68 1.55a.96.96 0 1 1 0 1.921.96.96 0 0 1 0-1.92m13.838 0a.96.96 0 1 1 0 1.92.96.96 0 0 1 0-1.92M8.489 11.458c.588.01 1.965 1.157 3.572 1.164 1.607-.007 2.984-1.155 3.572-1.164.196-.003.305.12.305.454 0 .886-.424 2.328-1.563 3.202-.22-.756-1.396-1.366-1.63-1.32q-.011.001-.02.006l-.044.026-.01.008-.03.024q-.018.017-.035.036l-.032.04a1 1 0 0 0-.058.09l-.014.025q-.049.088-.11.19a1 1 0 0 1-.083.116 1.2 1.2 0 0 1-.173.18q-.035.029-.075.058a1.3 1.3 0 0 1-.251-.243 1 1 0 0 1-.076-.107c-.124-.193-.177-.363-.337-.444-.034-.016-.104-.008-.2.022q-.094.03-.216.087-.06.028-.125.063l-.13.074q-.067.04-.136.086a3 3 0 0 0-.135.096 3 3 0 0 0-.26.219 2 2 0 0 0-.12.121 2 2 0 0 0-.106.128l-.002.002a2 2 0 0 0-.09.132l-.001.001a1.2 1.2 0 0 0-.105.212q-.013.036-.024.073c-1.139-.875-1.563-2.317-1.563-3.203 0-.334.109-.457.305-.454m.836 10.354c.824-1.19.766-2.082-.365-3.194-1.13-1.112-1.789-2.738-1.789-2.738s-.246-.945-.806-.858-.97 1.499.202 2.362c1.173.864-.233 1.45-.685.64-.45-.812-1.683-2.896-2.322-3.295s-1.089-.175-.938.647 2.822 2.813 2.562 3.244-1.176-.506-1.176-.506-2.866-2.567-3.49-1.898.473 1.23 2.037 2.16c1.564.932 1.686 1.178 1.464 1.53s-3.675-2.511-4-1.297c-.323 1.214 3.524 1.567 3.287 2.405-.238.839-2.71-1.587-3.216-.642-.506.946 3.49 2.056 3.522 2.064 1.29.33 4.568 1.028 5.713-.624m5.349 0c-.824-1.19-.766-2.082.365-3.194 1.13-1.112 1.789-2.738 1.789-2.738s.246-.945.806-.858.97 1.499-.202 2.362c-1.173.864.233 1.45.685.64.451-.812 1.683-2.896 2.322-3.295s1.089-.175.938.647-2.822 2.813-2.562 3.244 1.176-.506 1.176-.506 2.866-2.567 3.49-1.898-.473 1.23-2.037 2.16c-1.564.932-1.686 1.178-1.464 1.53s3.675-2.511 4-1.297c.323 1.214-3.524 1.567-3.287 2.405.238.839 2.71-1.587 3.216-.642.506.946-3.49 2.056-3.522 2.064-1.29.33-4.568 1.028-5.713-.624"/></svg>
        </a>
      </div>

      {/* Section Header */}
      <div className="flex items-center gap-3.5 mb-10 sm:mb-14">
        <div className="p-3 bg-amber-400 text-dark-900 rounded-2xl border-2 border-amber-300 shadow-[3px_3px_0px_#ff9f00]">
          <Terminal size={28} className="stroke-[2.5]" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono text-white tracking-widest uppercase text-glow-amber">
            _ABOUT_ME
          </h2>
          <p className="text-xs sm:text-sm font-mono text-cyber-teal font-semibold mt-0.5">
            Architecture • AI Systems • Scalable Backends
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        
        {/* Left Side: Content */}
        <div className="flex flex-col gap-6 justify-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="cartoon-card-amber p-6 sm:p-8 noise-overlay"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-white/10">
              <h3 className="text-xl sm:text-2xl font-bold text-amber-400 font-mono text-glow-amber flex items-center gap-2">
                <Sparkles size={22} />
                <span>&gt; system.profile.init()</span>
              </h3>
              <span className="px-2.5 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/50 rounded-lg text-xs font-mono font-bold">
                B.E. Comp Eng
              </span>
            </div>

            <p className="text-white/90 leading-relaxed mb-4 font-sans text-base sm:text-lg font-medium">
              I am a <strong className="text-amber-300 underline decoration-amber-400/60 decoration-2">Python Backend Engineer</strong> and <strong className="text-cyber-teal underline decoration-cyber-teal/60 decoration-2">AI Infrastructure Enthusiast</strong> pursuing my Computer Engineering degree. I specialize in building high-throughput RESTful services, orchestrating LangGraph multi-agent LLM systems, and containerizing distributed microservices.
            </p>
            <p className="text-white/70 leading-relaxed mb-6 font-sans text-sm sm:text-base">
              My engineering focus combines clean object-oriented architecture, strict asynchronous performance in FastAPI/Django, and reliable deployment on Docker and AWS Cloud infrastructure.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs sm:text-sm border-t-2 border-white/10 pt-4">
              <div className="flex items-center gap-2.5 p-2 bg-dark-900/60 rounded-xl border border-white/10">
                <CheckCircle2 size={18} className="text-emerald-400" />
                <span className="text-white font-bold">Open to Freelance</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 bg-dark-900/60 rounded-xl border border-white/10">
                <ShieldCheck size={18} className="text-cyber-teal" />
                <span className="text-white font-bold">Remote & Full-time</span>
              </div>
            </div>
          </motion.div>

          {/* Interactive Cartoon Command Playground */}
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
            className="cartoon-card-teal p-6 sm:p-8 noise-overlay"
          >
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="text-cyber-teal" size={22} />
              <h3 className="text-lg sm:text-xl font-bold text-white font-mono">&gt; Interactive_Agent_Console</h3>
            </div>

            <div className="bg-dark-900 p-4 rounded-xl border-2 border-cyber-teal/40 font-mono text-xs sm:text-sm text-cyber-teal mb-4 min-h-[70px] flex items-center">
              <p className="whitespace-pre-line font-bold">{terminalOutput}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRunCommand('AGENTS', 'LangGraph Multi-Agent Workflows: Active & Operational.')}
                className={`cartoon-btn px-3 py-1.5 text-xs ${activeCommand === 'AGENTS' ? 'bg-cyber-teal text-dark-900 border-cyan-300' : 'bg-dark-800 text-white border-white/20'}`}
              >
                <Play size={12} />
                <span>PING AGENTS</span>
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRunCommand('FASTAPI', 'FastAPI Async Routes: Running at high throughput.')}
                className={`cartoon-btn px-3 py-1.5 text-xs ${activeCommand === 'FASTAPI' ? 'bg-amber-400 text-dark-900 border-amber-300' : 'bg-dark-800 text-white border-white/20'}`}
              >
                <Cpu size={12} />
                <span>BENCHMARK FASTAPI</span>
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRunCommand('DOCKER', 'Docker Containers: Healthy & deployed on cloud targets.')}
                className={`cartoon-btn px-3 py-1.5 text-xs ${activeCommand === 'DOCKER' ? 'bg-purple-400 text-dark-900 border-purple-300' : 'bg-dark-800 text-white border-white/20'}`}
              >
                <Sparkles size={12} />
                <span>CONTAINER STATUS</span>
              </motion.button>
            </div>
          </motion.div>

        </div>

        {/* Right Side: Interactive 3D Character Canvas */}
        <div className="flex flex-col justify-between">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="w-full"
          >
            <Interactive3DAvatar />
          </motion.div>

          {/* Tech Tag Matrix */}
          <div className="mt-6 cartoon-card-purple p-6">
            <h4 className="text-sm font-mono font-bold text-purple-300 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Cpu size={16} />
              <span>Core Tech Matrix</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                'Python 3.12', 'Django REST', 'FastAPI', 'PostgreSQL', 
                'Docker', 'LangChain', 'LangGraph', 'AWS ECS', 'Git / GitHub'
              ].map(tech => (
                <span key={tech} className="px-3 py-1.5 bg-dark-900 border-2 border-white/20 rounded-xl font-mono text-xs font-bold text-white hover:border-amber-400 hover:text-amber-400 hover:scale-105 active:scale-95 transition-all cursor-pointer">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

