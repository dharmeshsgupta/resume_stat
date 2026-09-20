import React, { useState, useEffect } from 'react';
import {
  Code,
  ExternalLink,
  Github,
  Film,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);

  const isMobile =
    typeof window !== 'undefined' && window.innerWidth < 768;

  const DEFAULT_PROJECTS = [
    {
      id: 1,
      title: 'OrchSutra.ai',
      type: 'GenAI / Infrastructure',
      year: '2026',
      desc:
        'A scalable multi-LLM orchestration platform that routes queries across OpenAI, Anthropic, Ollama, and Gemini through a unified RESTful API. Built with automated fallback strategies, token analytics tracking, asynchronous processing, Firebase authentication, multimodal chat, dynamic API key management, and pre-built RAG agents powered by LangChain and LangGraph.',
      highlights: [
        'Developed a scalable multi-LLM orchestration platform routing queries across top-tier models (OpenAI, Anthropic, Ollama, Gemini) via a unified RESTful API.',
        'Built a high-performance FastAPI backend with automated fallback strategies, token analytics tracking, and asynchronous processing for concurrent AI workflows.',
        'Engineered a responsive React dashboard integrating Firebase authentication, interactive multi-modal chat (Vision/TTS), and dynamic API key management.',
        'Implemented an automated API key provisioning engine featuring pre-built, memory-optimized RAG agents powered by LangChain and LangGraph for zero-knowledge integration.',
        'Deployed a highly available, containerized microservices architecture utilizing Docker, Render, and Vercel.',
      ],
      tech: [
        'FastAPI',
        'PostgreSQL',
        'SQLite',
        'JWT',
        'Firebase',
        'Docker',
        'Vercel',
      ],
      link: 'https://orchsutra.ai-eta-ruddy.vercel.app',
      github: 'https://github.com/dharmeshsgupta/OrchSutra.ai',
      video_link: null,
      cardStyle: 'cartoon-card-amber',
      order: 0,
    },
    {
      id: 2,
      title: 'BusLocator – Smart Campus Transport Management System',
      type: 'Smart Campus Transport / Microservices',
      year: '2026',
      desc:
        'A scalable microservices-based transport management platform using FastAPI, React, PostgreSQL, Redis, and Docker. Implemented secure JWT authentication, role-based authorization, real-time tracking with WebSockets and Redis Pub/Sub, Razorpay payments, and responsive dashboards with Leaflet.',
      highlights: [
        'Engineered a scalable microservices-based transport management platform using FastAPI, React, PostgreSQL, Redis, and Docker.',
        'Implemented secure JWT authentication, role-based authorization, and REST APIs for managing students, drivers, buses, routes, and transport assignments.',
        'Developed a real-time tracking service with WebSockets and Redis Pub/Sub to stream live bus locations, ETA updates, occupancy, and route progress.',
        'Integrated Razorpay for transport fee payments with secure order creation, webhook verification, transaction auditing, and receipt generation.',
        'Built responsive dashboards using React Query, Zustand, and Leaflet, enabling live tracking, analytics, and transport administration.',
      ],
      tech: [
        'FastAPI',
        'React',
        'PostgreSQL',
        'Redis',
        'Docker',
        'WebSockets',
        'Razorpay',
        'Leaflet',
        'Zustand',
        'React Query',
      ],
      link: 'https://bus-locator-six.vercel.app/',
      github: 'https://github.com/dharmeshsgupta/BusLocator',
      video_link: null,
      cardStyle: 'cartoon-card-teal',
      order: 1,
    },
    {
      id: 3,
      title: 'RiwaazWear (E-Commerce Web Application)',
      type: 'E-Commerce Web Application',
      year: '2025',
      desc:
        'A complete e-commerce web application built with Django and PostgreSQL, featuring user registration, login, Google OAuth authentication, secure PayPal payments, refunds, transaction history, and a dynamic admin panel for products, categories, pricing, inventory, and images.',
      highlights: [
        'Developed a complete e-commerce web application with user registration, login, and Google OAuth authentication.',
        'Integrated PayPal payment gateway supporting secure payments, refunds, and transaction history tracking.',
        'Designed a dynamic admin panel for managing products, categories, pricing, inventory, and images.',
        'Implemented a scalable backend architecture to support future features and high data consistency.',
      ],
      tech: [
        'Django',
        'PostgreSQL',
        'Google OAuth',
        'PayPal',
        'REST API',
      ],
      link: '#',
      github: 'https://github.com/dharmeshsgupta/E-commerce-django',
      video_link: null,
      cardStyle: 'cartoon-card-amber',
      order: 2,
    },
    {
      id: 4,
      title: 'Aadhaar DBT Mitra',
      type: 'Public Service / AI',
      year: '2025',
      desc:
        'A public-service application designed to help users verify Aadhaar–Bank and DBT linkage status. It also provides community features including posts, comments, likes, media sharing, image and video uploads, and an AI-powered chatbot for Aadhaar DBT-related queries.',
      highlights: [
        'Designed a public-service application to help users verify Aadhaar–Bank and DBT linkage status with high reliability.',
        'Built community features including posts, comments, likes, media sharing, and image and video uploads.',
        'Engineered an AI-powered chatbot for dynamic, context-aware Aadhaar DBT-related user queries and assistance.',
      ],
      tech: [
        'Django',
        'PostgreSQL',
        'AI Chatbot',
        'REST API',
      ],
      link: '#',
      github: 'https://github.com/dharmeshsgupta/DBT_Mitra_Project',
      video_link: null,
      cardStyle: 'cartoon-card-teal',
      order: 3,
    },
  ];

  useEffect(() => {
    fetch('/api/projects/')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Local projects error');
        }
        return res.json();
      })
      .catch(() =>
        fetch(
          'https://guptadharmesh.pythonanywhere.com/api/projects/'
        ).then((res) => {
          if (!res.ok) {
            throw new Error('Remote projects error');
          }
          return res.json();
        })
      )
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(DEFAULT_PROJECTS);
        }
      })
      .catch((err) => {
        console.error('Error fetching projects:', err);
        setProjects(DEFAULT_PROJECTS);
      });
  }, []);

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';

    try {
      if (url.includes('youtube.com/watch')) {
        const urlParams = new URLSearchParams(
          new URL(url).search
        );

        const videoId = urlParams.get('v');

        return videoId
          ? `https://www.youtube.com/embed/${videoId}`
          : '';
      }

      if (url.includes('youtu.be/')) {
        const id = url
          .split('youtu.be/')[1]
          .split('?')[0];

        return `https://www.youtube.com/embed/${id}`;
      }

      if (url.includes('youtube.com/embed/')) {
        return url;
      }
    } catch (error) {
      console.error('YouTube URL error:', error);
    }

    return url;
  };

  return (
    <section
      id="projects"
      className="py-16 sm:py-24 px-4 sm:px-6 max-w-[1400px] mx-auto relative z-20"
    >
      {/* Section Header */}
      <div className="flex items-center gap-3.5 mb-10 sm:mb-14">
        <div className="p-3 bg-amber-400 text-dark-900 rounded-2xl border-2 border-amber-300 shadow-[3px_3px_0px_#ff9f00]">
          <Code size={28} className="stroke-[2.5]" />
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono text-white tracking-widest uppercase text-glow-amber">
            _PUBLISHED_PROJECTS
          </h2>

          <p className="text-xs sm:text-sm font-mono text-amber-300 font-semibold mt-0.5">
            GenAI Systems • Backend • Full-Stack Applications
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        {/* Left Side: Project Visual */}
        {!isMobile ? (
          <div className="hidden lg:flex relative pointer-events-auto w-full lg:h-auto items-center justify-center mb-4 lg:mb-0 rounded-2xl border-2 border-amber-400/40 bg-black/40 overflow-hidden shadow-[6px_6px_0px_#ff9f00]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64">
                {/* Central Orb */}
                <div className="absolute inset-12 rounded-full border-2 border-amber-400/50 bg-amber-400/5 shadow-[0_0_60px_rgba(255,159,0,0.15)] flex items-center justify-center">
                  <Code
                    size={80}
                    className="text-amber-400 stroke-[1.2]"
                  />
                </div>

                {/* Outer Ring */}
                <div className="absolute inset-4 rounded-full border border-amber-400/20 animate-pulse" />

                {/* Orbit Ring */}
                <div className="absolute inset-0 rounded-full border border-dashed border-amber-400/20 animate-[spin_20s_linear_infinite]" />

                {/* Decorative Nodes */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_15px_#ff9f00]" />

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_#00ffff]" />

                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-300 shadow-[0_0_15px_#ffcf40]" />

                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_15px_#00ffff]" />
              </div>
            </div>

            {/* Background Text */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p className="font-mono text-xs text-amber-300/60 tracking-[0.3em] uppercase">
                BUILD • DEPLOY • SCALE
              </p>
            </div>
          </div>
        ) : null}

        {/* Right Side: Project Cards */}
        <div className="flex flex-col gap-6 justify-between">
          <div className="flex flex-col gap-6">
            {projects.slice(0, 3).map((proj, idx) => {
              const cardClass =
                proj.cardStyle ||
                (idx === 0
                  ? 'cartoon-card-amber'
                  : idx === 1
                  ? 'cartoon-card-teal'
                  : 'cartoon-card-amber');

              return (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.2 },
                  }}
                  viewport={{
                    once: true,
                    margin: '-50px',
                  }}
                  transition={{
                    duration: 0.3,
                    delay: idx * 0.08,
                  }}
                  className={`${cardClass} p-6 sm:p-8 noise-overlay flex flex-col justify-between`}
                >
                  <div>
                    {/* Card Header */}
                    <div className="flex justify-between items-start gap-4 mb-4 pb-3 border-b-2 border-white/10">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="text-amber-300 font-mono text-xs font-black tracking-widest uppercase bg-dark-900/60 px-2.5 py-1 rounded-lg border border-white/10 inline-block">
                            {proj.type}
                          </span>
                          {proj.year && (
                            <span className="text-white/70 font-mono text-xs font-bold bg-white/10 px-2 py-1 rounded-lg border border-white/10 inline-block">
                              {proj.year}
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl sm:text-2xl font-black text-white font-sans">
                          {proj.title}
                        </h3>
                      </div>

                      <div className="flex gap-2 items-center shrink-0">
                        {/* Video Button */}
                        {proj.video_link && (
                          <button
                            onClick={() =>
                              setActiveVideo(proj.video_link)
                            }
                            className="p-2 bg-red-500 text-white rounded-xl border border-red-300 shadow-[2px_2px_0px_#000] active:scale-90 transition-all cursor-pointer"
                            title="Watch Demo Video"
                          >
                            <Film size={18} />
                          </button>
                        )}

                        {/* GitHub */}
                        {proj.github && proj.github !== '#' && (
                          <a
                            href={proj.github}
                            className="p-2 bg-dark-900 text-white rounded-xl border border-white/20 shadow-[2px_2px_0px_#000] hover:text-amber-400 active:scale-90 transition-all"
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${proj.title} GitHub repository`}
                          >
                            <Github size={18} />
                          </a>
                        )}

                        {/* Live Project */}
                        {proj.link && proj.link !== '#' && (
                          <a
                            href={proj.link}
                            className="p-2 bg-amber-400 text-dark-900 rounded-xl border border-amber-300 shadow-[2px_2px_0px_#000] hover:bg-amber-300 active:scale-90 transition-all"
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${proj.title} live project`}
                          >
                            <ExternalLink
                              size={18}
                              className="stroke-[2.5]"
                            />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Highlights / Description */}
                    {proj.highlights && proj.highlights.length > 0 ? (
                      <ul className="space-y-2 mb-6">
                        {proj.highlights.map((point, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-white/90 text-xs sm:text-sm leading-relaxed"
                          >
                            <span className="text-amber-400 mt-0.5 shrink-0 font-bold">›</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-white/90 font-sans text-sm sm:text-base leading-relaxed mb-6">
                        {proj.desc}
                      </p>
                    )}
                  </div>

                  <div>
                    {/* Demo Video */}
                    {proj.video_link && (
                      <button
                        onClick={() =>
                          setActiveVideo(proj.video_link)
                        }
                        className="mb-4 cartoon-btn px-4 py-2 bg-red-500 text-white text-xs font-mono font-bold shadow-[2px_2px_0px_#000] hover:bg-red-600 flex items-center gap-2"
                      >
                        <Film size={14} />
                        <span>WATCH DEMO VIDEO</span>
                      </button>
                    )}

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t-2 border-white/10">
                      {proj.tech?.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-mono font-extrabold px-2.5 py-1 bg-dark-900/80 border border-white/20 rounded-lg text-amber-300"
                        >
                          #{tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Access All Projects */}
          {projects.length > 0 && (
            <div className="flex justify-end mt-2">
              <button
                onClick={() =>
                  window.portfolioNavigate?.('/projects')
                }
                className="cartoon-btn px-5 py-2.5 bg-cyber-teal border-cyan-300 text-dark-900 text-xs font-mono font-black uppercase shadow-[3px_3px_0px_#000] hover:bg-cyan-300"
              >
                🚀 [ACCESS ALL PROJECTS] →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="relative w-full max-w-4xl cartoon-card-amber p-2 overflow-hidden noise-overlay">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-3 border-b-2 border-white/10">
              <span className="font-mono text-xs font-bold text-amber-300">
                DEMO_PREVIEW.mp4
              </span>

              <button
                onClick={() => setActiveVideo(null)}
                className="cartoon-btn p-1.5 bg-red-500 text-white border-red-300 text-xs shadow-[2px_2px_0px_#000]"
                aria-label="Close video"
              >
                <X size={18} />
              </button>
            </div>

            {/* Video */}
            <div className="aspect-video w-full bg-black rounded-xl overflow-hidden mt-2">
              {activeVideo.includes('youtube.com') ||
              activeVideo.includes('youtu.be') ? (
                <iframe
                  src={getYouTubeEmbedUrl(activeVideo)}
                  className="w-full h-full border-0"
                  title="Project demo video"
                  allowFullScreen
                  allow="autoplay; encrypted-media"
                />
              ) : (
                <video
                  src={activeVideo}
                  className="w-full h-full"
                  controls
                  autoPlay
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}