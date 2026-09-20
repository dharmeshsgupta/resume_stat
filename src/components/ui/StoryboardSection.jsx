import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Film } from 'lucide-react';
import { playSnap } from '../../utils/audioEffects';

export default function StoryboardSection({ children, id, panelNumber, title, direction = 'alternate' }) {
  // Determine fold angle direction based on panel number or explicit prop
  const isEven = (panelNumber || 1) % 2 === 0;
  const rotateYVal = direction === 'left' ? -12 : direction === 'right' ? 12 : (isEven ? 10 : -10);

  return (
    <motion.section
      id={id}
      initial={{
        opacity: 0,
        y: 80,
        scale: 0.9,
        rotateX: -18,
        rotateY: rotateYVal,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        rotateY: 0,
      }}
      onViewportEnter={() => {
        playSnap();
      }}
      viewport={{ once: false, amount: 0.12 }}
      transition={{
        type: 'spring',
        stiffness: 110,
        damping: 15,
        mass: 0.8,
      }}
      className="relative my-8 sm:my-14 perspective-1000 transform-gpu scroll-snap-panel scroll-mt-20"
    >
      {/* Cartoon Storyboard Panel Frame Marker Header */}
      {title && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1 bg-amber-400 text-dark-900 border-2 border-amber-300 rounded-lg shadow-[3px_3px_0px_#000] font-mono text-xs font-black tracking-wider uppercase">
            <Film size={14} className="stroke-[2.5]" />
            <span>STORYBOARD_PANEL_0{panelNumber || 1}: {title}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-amber-300/80 bg-dark-800/80 px-2.5 py-1 border border-amber-400/30 rounded-md">
            <Sparkles size={12} className="text-amber-400 animate-spin" />
            <span>FRAME_SLIDE_ACTIVE</span>
          </div>
        </div>
      )}

      {/* Main Section Content Wrapper with Cartoon Drop Shadow */}
      <div className="relative">
        {children}
      </div>
    </motion.section>
  );
}
