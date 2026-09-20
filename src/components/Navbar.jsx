import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Terminal, User, BookOpen, Briefcase, FolderGit2, Mail, Sparkles, Download, Check, Copy, Volume2, VolumeX } from 'lucide-react';
import { playClick, playHover, getMuteState, setMuteState, initAudio } from '../utils/audioEffects';

const NAV_ITEMS = [
  { name: 'Home', href: '#', icon: Terminal },
  { name: 'About', href: '#about', icon: User },
  { name: 'Education', href: '#education', icon: BookOpen },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Projects', href: '#projects', icon: FolderGit2 },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export default function Navbar({ resumeUrl }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    initAudio();
    setMuted(getMuteState());

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMute = () => {
    const newState = !muted;
    setMuteState(newState);
    setMuted(newState);
    if (!newState) playClick();
  };

  const handleCopyEmail = () => {
    playClick();
    navigator.clipboard.writeText('dharmeshgupta.r@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Top Navbar Header */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-dark-900/90 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.8)] border-b-2 border-amber-500/30 backdrop-blur-xl' : 'bg-dark-900/40 py-3 md:py-5 border-b border-white/10 backdrop-blur-md'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          
          {/* Logo with Cartoon Badge */}
          <a href="#" onClick={playClick} onMouseEnter={playHover} className="flex items-center gap-2.5 group cursor-pointer select-none">
            <div className="p-2 bg-amber-400 text-dark-900 rounded-xl border-2 border-amber-300 shadow-[2px_2px_0px_#ff9f00] group-hover:rotate-6 group-hover:scale-110 transition-all">
              <Terminal size={22} className="stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors flex items-center gap-1">
                DS-GUPTA<span className="text-amber-400 animate-pulse">_</span>
              </span>
              <span className="text-[10px] font-mono font-bold uppercase text-cyber-teal tracking-widest -mt-1 hidden sm:inline-block">
                Backend & GenAI Architect
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-5 text-sm font-bold font-mono">
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className="text-white/80 hover:text-amber-400 hover:bg-white/5 px-3 py-1.5 rounded-lg transition-all relative group flex items-center gap-1.5"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 pl-4 border-l-2 border-white/10">
              {/* Retro Sound SFX Toggle */}
              <button
                onClick={toggleMute}
                onMouseEnter={playHover}
                className={`cartoon-btn p-1.5 text-xs ${muted ? 'bg-dark-800 border-white/20 text-white/50' : 'bg-amber-400/20 border-amber-400 text-amber-300 shadow-[2px_2px_0px_#ff9f00]'}`}
                title={muted ? 'Unmute Arcade SFX' : 'Mute Arcade SFX'}
              >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} className="animate-pulse" />}
              </button>

              <button
                onClick={handleCopyEmail}
                onMouseEnter={playHover}
                className="cartoon-btn px-3 py-1.5 bg-dark-800 border-cyber-teal/50 text-cyber-teal text-xs hover:bg-cyber-teal hover:text-dark-900 shadow-[2px_2px_0px_#00f0ff]"
                title="Copy email to clipboard"
              >
                {copied ? <Check size={14} className="stroke-[3]" /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Email'}</span>
              </button>

              <a
                href={resumeUrl || '/resume.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                download="Dharmesh_Gupta_Resume.pdf"
                className="cartoon-btn px-3.5 py-1.5 bg-dark-800 border-white/30 text-white text-xs hover:border-amber-400 hover:text-amber-400 shadow-[2px_2px_0px_#ffffff50]"
                title="Download CV"
              >
                <Download size={14} />
                <span>CV</span>
              </a>

              <a 
                href="#contact" 
                onClick={playClick}
                onMouseEnter={playHover}
                className="cartoon-btn px-4 py-1.5 bg-amber-400 border-amber-300 text-dark-900 text-xs shadow-[3px_3px_0px_#ff9f00] hover:bg-amber-300"
              >
                <Sparkles size={14} className="stroke-[2.5]" />
                <span>Hire Me</span>
              </a>
            </div>
          </div>

          {/* Mobile Top Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleMute}
              className={`p-1.5 border-2 rounded-lg font-mono text-xs ${muted ? 'bg-dark-800 border-white/20 text-white/50' : 'bg-amber-400 border-amber-300 text-dark-900'}`}
              title="Toggle SFX"
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            <a 
              href="#contact" 
              onClick={playClick}
              className="px-3 py-1.5 bg-amber-400 border-2 border-amber-300 text-dark-900 font-mono text-xs font-bold rounded-lg shadow-[2px_2px_0px_#ff9f00] active:translate-y-0.5"
            >
              Hire Me
            </a>
            <button 
              onClick={() => {
                playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }} 
              className="p-2 bg-dark-800 border-2 border-white/20 rounded-xl text-white active:scale-95 transition-transform"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Top Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-dark-900/95 backdrop-blur-2xl border-b-2 border-amber-500/40 flex flex-col py-5 px-6 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            {NAV_ITEMS.map((item) => {
              const IconComp = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white/90 hover:text-amber-400 font-mono font-bold text-base border-b border-white/10 pb-2.5 flex items-center gap-3 active:text-amber-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <IconComp size={18} className="text-amber-400" />
                  <span>{item.name}</span>
                </a>
              );
            })}
            
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={handleCopyEmail}
                className="w-full cartoon-btn py-2.5 bg-dark-800 border-cyber-teal text-cyber-teal text-sm shadow-[3px_3px_0px_#00f0ff]"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? 'Email Copied!' : 'Copy Email (dharmeshgupta.r@gmail.com)'}</span>
              </button>

              <a
                href={resumeUrl || '/resume.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  playClick();
                  setMobileMenuOpen(false);
                }}
                download="Dharmesh_Gupta_Resume.pdf"
                className="w-full cartoon-btn py-2.5 bg-amber-400 border-amber-300 text-dark-900 text-sm shadow-[3px_3px_0px_#ff9f00] flex items-center justify-center gap-2"
              >
                <Download size={16} />
                <span>Download CV</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Floating Bottom Navigation Dock for Thumb Ergonomics */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 md:hidden w-[92%] max-w-sm bg-dark-900/90 backdrop-blur-xl border-2 border-amber-400/60 shadow-[0_8px_30px_rgba(0,0,0,0.9),0_0_15px_rgba(255,176,0,0.3)] rounded-2xl p-1.5 flex items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const IconComp = item.icon;
          return (
            <a
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center p-2 rounded-xl text-white/70 hover:text-amber-400 active:text-amber-300 active:scale-95 transition-all min-w-[44px] min-h-[44px]"
              title={item.name}
            >
              <IconComp size={20} className="stroke-[2.2]" />
              <span className="text-[9px] font-mono font-bold tracking-tight mt-0.5">{item.name}</span>
            </a>
          );
        })}
      </div>
    </>
  );
}

