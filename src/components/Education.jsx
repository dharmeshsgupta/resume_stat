import React from 'react';
import { BookOpen, Award, Calendar, Sparkles, GraduationCap, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Interactive3DAvatar from './ui/Interactive3DAvatar';

const educationData = [
  {
    degree: "Bachelor of Engineering, Computer Engineering",
    institution: "Gujarat Technological University (GTU) / Pacific School of Engineering - India",
    timeline: "Jul 2024 – Jul 2028",
    tags: ["FastAPI", "RESTful architecture", "C (Programming Language)"],
    cardStyle: "cartoon-card-amber",
    highlight: true
  },
  {
    degree: "Certification Course (Social impact amongst global family)",
    institution: "Aspire Institute",
    timeline: "Aug 2024 – Nov 2024",
    tags: ["Leadership"],
    cardStyle: "cartoon-card-teal",
    highlight: false
  },
  {
    degree: "Higher Secondary (+2, PCM)",
    institution: "T. & T. V. Sarvajanik High School",
    timeline: "2022 – 2024",
    tags: ["Physics", "Chemistry", "Mathematics"],
    cardStyle: "cartoon-card-purple",
    highlight: false
  },
  {
    degree: "High School Diploma",
    institution: "Matrubhumi Vidhyalay",
    timeline: "2016 – 2022",
    metrics: "Grade: 83%",
    tags: ["Science & Math"],
    cardStyle: "cartoon-card-teal",
    highlight: false
  }
];

export default function Education() {
  return (
    <section id="education" className="py-16 sm:py-24 px-4 sm:px-6 max-w-[1400px] mx-auto relative z-20">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 sm:mb-14 border-b border-white/10 pb-6">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-purple-400 text-dark-900 rounded-2xl border-2 border-purple-300 shadow-[3px_3px_0px_#c084fc]">
            <BookOpen size={28} className="stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono text-white tracking-widest uppercase text-glow-amber">
              _EDUCATION
            </h2>
            <p className="text-xs sm:text-sm font-mono text-purple-300 font-semibold mt-0.5">
              Academic Degree • Leadership • Foundations
            </p>
          </div>
        </div>

        {/* Academic Degree Status Badge */}
        <div className="flex items-center gap-2 px-3.5 py-2 bg-dark-900 border-2 border-purple-400/50 rounded-xl font-mono text-xs text-purple-300 shadow-[3px_3px_0px_#c084fc]">
          <GraduationCap size={16} className="text-amber-400" />
          <span>Jul 2024 – Jul 2028 • B.E. Comp Eng</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        
        {/* Left Side: 3D Avatar & Academic Highlights Card */}
        <div className="flex flex-col gap-6 sticky top-24 self-start">
          <Interactive3DAvatar />
          
          <div className="cartoon-card-purple p-6 noise-overlay border-2 border-purple-300 shadow-[4px_4px_0px_#c084fc]">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10 mb-3">
              <GraduationCap size={18} className="text-amber-400" />
              <h3 className="font-mono text-sm font-black text-white uppercase tracking-wider">
                Academic Foundations & Coursework
              </h3>
            </div>

            <div className="space-y-2.5 text-xs font-mono text-white/90 mb-4 leading-relaxed">
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-amber-300">Degree:</strong> B.E. in Computer Engineering (GTU / PSE)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-purple-300">Fellowship:</strong> Aspire Institute Global Leadership (2024)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-cyber-teal">Score:</strong> High School Diploma Distinction (83%)</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10">
              <p className="text-[11px] font-mono text-white/60 font-bold uppercase mb-2">Key Coursework:</p>
              <div className="flex flex-wrap gap-1.5">
                {['Data Structures & Algo', 'Operating Systems', 'DBMS', 'Computer Networks', 'Python 3', 'FastAPI', 'REST APIs'].map(course => (
                  <span key={course} className="px-2 py-0.5 bg-dark-900/80 border border-white/15 rounded text-[11px] font-mono text-purple-200">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Academic Timeline Cards */}
        <div className="flex flex-col">
          <div className="relative border-l-4 border-purple-400/50 ml-3 sm:ml-6 pl-6 sm:pl-8 py-2 flex flex-col gap-6">
            {educationData.map((edu, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="relative group"
              >
                {/* Timeline node */}
                <div className="absolute -left-[35px] sm:-left-[43px] top-4 w-5 h-5 rounded-full bg-purple-400 border-2 border-dark-900 shadow-[2px_2px_0px_#c084fc]"></div>

                <div className={`${edu.cardStyle} p-5 sm:p-7 noise-overlay`}>
                  
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white font-sans">{edu.degree}</h3>
                    {edu.highlight && (
                      <span className="px-2.5 py-0.5 bg-amber-400 text-dark-900 rounded-lg text-[10px] font-mono font-extrabold border border-amber-300 uppercase shadow-[2px_2px_0px_#000]">
                        CURRENT DEGREE
                      </span>
                    )}
                  </div>

                  <p className="font-mono text-xs sm:text-sm font-extrabold text-amber-300 uppercase mb-3">
                    {edu.institution}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-3 mb-3 text-xs font-mono">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-dark-900/80 border border-white/20 rounded-lg text-white/80">
                      <Calendar size={13} className="text-amber-400" />
                      <span>{edu.timeline}</span>
                    </div>
                    {edu.metrics && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/20 border border-emerald-400/60 rounded-lg text-emerald-300 font-bold">
                        <Award size={13} />
                        <span>{edu.metrics}</span>
                      </div>
                    )}
                  </div>
                  
                  {edu.tags && edu.tags.length > 0 && (
                    <div className="pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                      {edu.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-dark-900/60 border border-white/20 rounded font-mono text-[11px] font-bold text-cyber-teal">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
