import React, { useState, useEffect } from 'react';
import { Mail, Send, Github, Linkedin, Terminal, Sparkles, Phone, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { QuantumTransmission } from './ui/QuantumTransmission';

export default function Contact() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const [linkedinFollowers, setLinkedinFollowers] = useState("12,300+");
  
  // Form states
  const [inquiryType, setInquiryType] = useState('HIRE'); // 'HIRE' or 'FREELANCE'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  // Hire-specific states
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  
  // Freelance-specific states
  const [projectDomain, setProjectDomain] = useState('');
  const [budgetScope, setBudgetScope] = useState('$2k-$5k');

  const [submitStatus, setSubmitStatus] = useState(null); // null, 'submitting', 'success', 'error'
  const [responseMsg, setResponseMsg] = useState('');

  useEffect(() => {
    fetch("/api/stats/")
      .then((res) => {
        if (!res.ok) throw new Error("Local stats error");
        return res.json();
      })
      .catch(() => fetch("https://guptadharmesh.pythonanywhere.com/api/stats/").then(res => res.json()))
      .then((data) => {
        if (data && data.linkedin_followers) {
          setLinkedinFollowers(data.linkedin_followers);
        }
      })
      .catch((err) => console.log("Using fallback follower stats:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setSubmitStatus('error');
      setResponseMsg('Name, Email, and Message fields are required.');
      return;
    }

    if (inquiryType === 'HIRE' && (!company.trim() || !jobTitle.trim())) {
      setSubmitStatus('error');
      setResponseMsg('Company and Target Position are required for HIRE protocol.');
      return;
    }

    if (inquiryType === 'FREELANCE' && (!projectDomain.trim() || !budgetScope)) {
      setSubmitStatus('error');
      setResponseMsg('Project Domain and Budget Scope are required for FREELANCE protocol.');
      return;
    }

    setSubmitStatus('submitting');
    setResponseMsg('');

    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        inquiry_type: inquiryType,
        message: message.trim(),
        company: inquiryType === 'HIRE' ? company.trim() : '',
        job_title: inquiryType === 'HIRE' ? jobTitle.trim() : '',
        project_domain: inquiryType === 'FREELANCE' ? projectDomain.trim() : '',
        budget_scope: inquiryType === 'FREELANCE' ? budgetScope : ''
      };

      let res;
      try {
        res = await fetch("/api/contact/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } catch {
        res = await fetch("https://guptadharmesh.pythonanywhere.com/api/contact/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Transmission packet lost.');
      }

      setSubmitStatus('success');
      setResponseMsg(data.message || 'Message sent successfully!');
      
      // Clear inputs
      setName('');
      setEmail('');
      setMessage('');
      setCompany('');
      setJobTitle('');
      setProjectDomain('');
      setBudgetScope('$2k-$5k');
    } catch (err) {
      setSubmitStatus('error');
      setResponseMsg(err.message || 'System fault: Connection link failed.');
    }
  };

  const isHire = inquiryType === 'HIRE';

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 max-w-[1400px] mx-auto relative z-20">
      
      {/* Section Header */}
      <div className="flex items-center gap-3.5 mb-10 sm:mb-14">
        <div className="p-3 bg-amber-400 text-dark-900 rounded-2xl border-2 border-amber-300 shadow-[3px_3px_0px_#ff9f00]">
          <Terminal size={28} className="stroke-[2.5]" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono text-white tracking-widest uppercase text-glow-amber">
            _INITIATE_CONTACT
          </h2>
          <p className="text-xs sm:text-sm font-mono text-amber-300 font-semibold mt-0.5">
            Direct Messaging • Hire Protocol • Freelance Inquiries
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        
        {/* Left Side: Contact Cards & Form */}
        <div className="flex flex-col gap-6 h-full">
          
          {/* Direct Channels Box */}
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="cartoon-card-teal p-6 sm:p-8 noise-overlay"
          >
            <h3 className="text-xl font-bold font-mono text-white mb-6 flex items-center gap-2">
              <Sparkles size={20} className="text-amber-400" />
              <span>Direct Communication Nodes</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="mailto:dharmeshgupta.r@gmail.com" className="p-4 bg-dark-900 rounded-xl border-2 border-white/20 hover:border-amber-400 transition-all flex items-center gap-3 group">
                <div className="p-2.5 bg-amber-400 text-dark-900 rounded-lg border border-amber-300 shadow-[2px_2px_0px_#000]">
                  <Mail size={18} className="stroke-[2.5]" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-amber-300 font-bold uppercase">Direct Email</p>
                  <p className="text-xs font-bold text-white group-hover:text-amber-300 truncate">dharmeshgupta.r@gmail.com</p>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/dharmeshsgupta/" target="_blank" rel="noreferrer" className="p-4 bg-dark-900 rounded-xl border-2 border-white/20 hover:border-cyber-teal transition-all flex items-center gap-3 group">
                <div className="p-2.5 bg-cyber-teal text-dark-900 rounded-lg border border-cyan-300 shadow-[2px_2px_0px_#000]">
                  <Linkedin size={18} className="stroke-[2.5]" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-cyber-teal font-bold uppercase">LinkedIn Profile</p>
                  <p className="text-xs font-bold text-white group-hover:text-cyber-teal truncate">{linkedinFollowers} Connections</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Form Container */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`p-6 sm:p-8 rounded-2xl border-4 ${isHire ? 'border-amber-400 bg-dark-800 shadow-[6px_6px_0px_#ff9f00]' : 'border-cyber-teal bg-dark-800 shadow-[6px_6px_0px_#00f0ff]'} transition-all duration-300 noise-overlay flex-grow`}
          >
            <form onSubmit={handleSubmit} className="space-y-5 h-full flex flex-col justify-between">
              <div className="space-y-4">
                
                {/* Protocol Toggle */}
                <div>
                  <label className="font-mono text-xs font-extrabold uppercase text-white mb-2 block">
                    ⚡ Select Inquiry Protocol:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setInquiryType('HIRE')}
                      className={`py-3 px-4 rounded-xl font-mono text-xs font-black uppercase border-2 transition-all ${isHire ? 'bg-amber-400 text-dark-900 border-amber-300 shadow-[3px_3px_0px_#000]' : 'bg-dark-900 text-white/60 border-white/20 hover:border-white/40'}`}
                    >
                      💼 [HIRE PROTOCOL]
                    </button>
                    <button
                      type="button"
                      onClick={() => setInquiryType('FREELANCE')}
                      className={`py-3 px-4 rounded-xl font-mono text-xs font-black uppercase border-2 transition-all ${!isHire ? 'bg-cyber-teal text-dark-900 border-cyan-300 shadow-[3px_3px_0px_#000]' : 'bg-dark-900 text-white/60 border-white/20 hover:border-white/40'}`}
                    >
                      🚀 [FREELANCE PROJECT]
                    </button>
                  </div>
                </div>

                {/* Name Input */}
                <div>
                  <label className="font-mono text-xs font-bold text-amber-300 uppercase mb-1 block">
                    &gt; Your Name:
                  </label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={submitStatus === 'submitting'}
                    className="w-full min-h-[44px] bg-dark-900 border-2 border-white/20 rounded-xl px-4 text-white focus:border-amber-400 focus:outline-none transition-all font-mono text-sm placeholder:text-white/30" 
                    placeholder="e.g. Alex Smith" 
                  />
                </div>

                {/* HIRE specific fields */}
                {isHire && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-xs font-bold text-amber-300 uppercase mb-1 block">
                        &gt; Company / Organization:
                      </label>
                      <input 
                        type="text" 
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        disabled={submitStatus === 'submitting'}
                        className="w-full min-h-[44px] bg-dark-900 border-2 border-white/20 rounded-xl px-4 text-white focus:border-amber-400 focus:outline-none transition-all font-mono text-sm placeholder:text-white/30" 
                        placeholder="Company name" 
                      />
                    </div>
                    <div>
                      <label className="font-mono text-xs font-bold text-amber-300 uppercase mb-1 block">
                        &gt; Role / Position:
                      </label>
                      <input 
                        type="text" 
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        disabled={submitStatus === 'submitting'}
                        className="w-full min-h-[44px] bg-dark-900 border-2 border-white/20 rounded-xl px-4 text-white focus:border-amber-400 focus:outline-none transition-all font-mono text-sm placeholder:text-white/30" 
                        placeholder="e.g. Backend Engineer" 
                      />
                    </div>
                  </div>
                )}

                {/* FREELANCE specific fields */}
                {!isHire && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-xs font-bold text-cyber-teal uppercase mb-1 block">
                        &gt; Project Domain:
                      </label>
                      <input 
                        type="text" 
                        value={projectDomain}
                        onChange={(e) => setProjectDomain(e.target.value)}
                        disabled={submitStatus === 'submitting'}
                        className="w-full min-h-[44px] bg-dark-900 border-2 border-white/20 rounded-xl px-4 text-white focus:border-cyber-teal focus:outline-none transition-all font-mono text-sm placeholder:text-white/30" 
                        placeholder="GenAI Agent / API" 
                      />
                    </div>
                    <div>
                      <label className="font-mono text-xs font-bold text-cyber-teal uppercase mb-1 block">
                        &gt; Budget Scope:
                      </label>
                      <select 
                        value={budgetScope}
                        onChange={(e) => setBudgetScope(e.target.value)}
                        disabled={submitStatus === 'submitting'}
                        className="w-full min-h-[44px] bg-dark-900 border-2 border-white/20 rounded-xl px-4 text-white focus:border-cyber-teal focus:outline-none transition-all font-mono text-sm cursor-pointer"
                      >
                        <option value="<$2k" className="bg-dark-900 text-white">&lt; $2,000</option>
                        <option value="$2k-$5k" className="bg-dark-900 text-white">$2,000 - $5,000</option>
                        <option value="$5k-$10k" className="bg-dark-900 text-white">$5,000 - $10,000</option>
                        <option value="$10k+" className="bg-dark-900 text-white">$10,000+</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Email Input */}
                <div>
                  <label className="font-mono text-xs font-bold text-amber-300 uppercase mb-1 block">
                    &gt; Email Address:
                  </label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={submitStatus === 'submitting'}
                    className="w-full min-h-[44px] bg-dark-900 border-2 border-white/20 rounded-xl px-4 text-white focus:border-amber-400 focus:outline-none transition-all font-mono text-sm placeholder:text-white/30" 
                    placeholder="your.email@company.com" 
                  />
                </div>

                {/* Message TextArea */}
                <div>
                  <label className="font-mono text-xs font-bold text-amber-300 uppercase mb-1 block">
                    &gt; Message / Requirements:
                  </label>
                  <textarea 
                    rows="3" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={submitStatus === 'submitting'}
                    className="w-full bg-dark-900 border-2 border-white/20 rounded-xl p-4 text-white focus:border-amber-400 focus:outline-none transition-all font-mono text-sm placeholder:text-white/30" 
                    placeholder="Tell me about your project or role requirements..."
                  />
                </div>
              </div>

              {/* Status Message and Submit button */}
              <div className="space-y-3 pt-2">
                {submitStatus === 'success' && (
                  <div className="p-3 bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 font-mono text-xs font-bold rounded-xl">
                    ✅ [SUCCESS]: {responseMsg}
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-500/20 border-2 border-red-400 text-red-300 font-mono text-xs font-bold rounded-xl">
                    ⚠️ [ERROR]: {responseMsg}
                  </div>
                )}
                
                <button 
                  type="submit" 
                  disabled={submitStatus === 'submitting'}
                  className={`w-full min-h-[48px] cartoon-btn ${isHire ? 'bg-amber-400 border-amber-300 text-dark-900 shadow-[4px_4px_0px_#000]' : 'bg-cyber-teal border-cyan-300 text-dark-900 shadow-[4px_4px_0px_#000]'} font-extrabold font-mono text-sm tracking-wider uppercase flex items-center justify-center gap-2`}
                >
                  <Send size={18} className="stroke-[2.5]" />
                  <span>{submitStatus === 'submitting' ? 'SENDING MESSAGE...' : 'SEND MESSAGE NOW'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Right Side: Quantum Transmission 3D Canvas (PC) / Cartoon Graphic (Mobile) */}
        <div className="flex flex-col justify-between">
          <div className="hidden lg:flex relative pointer-events-auto w-full h-[520px] items-center justify-center rounded-2xl border-2 border-amber-400/40 bg-black/40 overflow-hidden shadow-[6px_6px_0px_#ff9f00]">
            <div className="absolute inset-0 w-full h-full">
              <QuantumTransmission />
            </div>
          </div>

          <div className="cartoon-card-purple p-6 mt-4 lg:mt-6">
            <h3 className="text-base font-mono font-extrabold text-purple-300 uppercase tracking-widest mb-2 flex items-center gap-2">
              <MessageSquare size={18} />
              <span>Fast Response Guarantee</span>
            </h3>
            <p className="text-white/90 text-sm font-sans leading-relaxed">
              I read and respond to all email inquiries within 24 hours. Looking forward to discussing your backend architecture or AI project!
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

