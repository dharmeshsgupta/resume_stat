import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Film,
  X,
} from 'lucide-react';

import { QuantumAttractor } from './ui/QuantumAttractor';

export default function AllProjectsView() {
  const [projects, setProjects] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);

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
      order: 1,
    },
    {
      id: 3,
      title: 'RiwaazWear (E-Commerce Web Application)',
      type: 'E-Commerce Web Application',
      year: '2025',
      desc:
        'A complete e-commerce web application built with Django and PostgreSQL, featuring user registration, login, Google OAuth authentication, secure PayPal payments, refunds, transaction history, and a dynamic admin panel for managing products, categories, pricing, inventory, and images.',
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
      order: 2,
    },
    {
      id: 4,
      title: 'Aadhaar DBT Mitra',
      type: 'Public Service / AI',
      year: '2025',
      desc:
        'A public-service application designed to help users verify Aadhaar–Bank and DBT linkage status. It also includes community features such as posts, comments, likes, media sharing, image and video uploads, and an AI-powered chatbot for Aadhaar DBT-related queries.',
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
      order: 3,
    },
  ];

  /* -------------------------------------------------------
     Fetch projects from backend
  ------------------------------------------------------- */

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const localResponse = await fetch('/api/projects/');

        if (!localResponse.ok) {
          throw new Error('Local projects API unavailable');
        }

        const localData = await localResponse.json();

        if (Array.isArray(localData) && localData.length > 0) {
          setProjects(localData);
          return;
        }

        setProjects(DEFAULT_PROJECTS);
      } catch (localError) {
        try {
          const remoteResponse = await fetch(
            'https://guptadharmesh.pythonanywhere.com/api/projects/'
          );

          if (!remoteResponse.ok) {
            throw new Error('Remote projects API unavailable');
          }

          const remoteData = await remoteResponse.json();

          if (
            Array.isArray(remoteData) &&
            remoteData.length > 0
          ) {
            setProjects(remoteData);
          } else {
            setProjects(DEFAULT_PROJECTS);
          }
        } catch (remoteError) {
          console.error(
            'Error fetching projects:',
            remoteError
          );

          setProjects(DEFAULT_PROJECTS);
        }
      }
    };

    fetchProjects();
  }, []);

  /* -------------------------------------------------------
     YouTube URL → Embed URL
  ------------------------------------------------------- */

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';

    try {
      if (url.includes('youtube.com/watch')) {
        const urlParams = new URLSearchParams(
          new URL(url).search
        );

        const videoId = urlParams.get('v');

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }

      if (url.includes('youtu.be/')) {
        const videoId = url
          .split('youtu.be/')[1]
          .split('?')[0];

        return `https://www.youtube.com/embed/${videoId}`;
      }

      if (url.includes('youtube.com/embed/')) {
        return url;
      }
    } catch (error) {
      console.error(
        'Error processing YouTube URL:',
        error
      );
    }

    return url;
  };

  /* -------------------------------------------------------
     Close video modal
  ------------------------------------------------------- */

  const closeVideo = () => {
    setActiveVideo(null);
  };

  return (
    <div className="bg-dark-900 min-h-screen text-white font-sans selection:bg-amber-500/30 selection:text-amber-200 relative pb-24">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-dark-900/95 noise-overlay pointer-events-none" />

      {/* ---------------------------------------------------
          HEADER
      --------------------------------------------------- */}

      <header className="max-w-[1400px] mx-auto px-6 pt-12 flex justify-between items-center relative z-20">
        <button
          onClick={() =>
            window.portfolioNavigate?.('/')
          }
          className="flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 text-white/70 hover:text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-300 font-mono text-sm uppercase rounded shadow-[0_0_15px_rgba(0,0,0,0.4)]"
        >
          <ArrowLeft size={16} />

          <span>[back_to_core]</span>
        </button>

        <span className="text-white/20 font-mono text-xs tracking-widest uppercase hidden md:inline">
          SYSTEM_ARCHIVE_FILE // PROJECTS
        </span>
      </header>

      {/* ---------------------------------------------------
          PROJECTS SECTION
      --------------------------------------------------- */}

      <section className="py-16 px-6 max-w-[1400px] mx-auto relative z-20">
        {/* Section Heading */}

        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-16 border-b border-white/5 pb-8">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold font-mono text-white text-glow-amber tracking-widest uppercase">
              _PROJECTS_ARCHIVE
            </h2>

            <p className="text-white/40 font-mono text-xs mt-3 tracking-wider">
              SELECTED PROJECTS // ENGINEERING PORTFOLIO
            </p>
          </div>

          <span className="text-cyber-teal font-mono text-xs px-3 py-1 bg-cyber-teal/10 border border-cyber-teal/20 rounded uppercase tracking-wider md:self-center">
            {projects.length} ACTIVE_VECTORS
          </span>
        </div>

        {/* -------------------------------------------------
            MAIN CONTENT
        ------------------------------------------------- */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* ------------------------------------------------
              PROJECT GRID
          ------------------------------------------------ */}

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((proj, index) => (
              <div
                key={proj.id}
                className="glass-card group p-1 flex flex-col border-white/5 hover:border-amber-500/40 transition-all duration-500 noise-overlay"
              >
                <div className="bg-dark-900/40 p-8 rounded-[14px] h-full flex flex-col justify-between backdrop-blur-md min-h-[390px]">
                  {/* Project Content */}

                  <div>
                    {/* Project Number + Type */}

                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <p className="text-amber-400/80 font-mono text-[10px] tracking-[0.2em] uppercase">
                            PROJECT_{String(index + 1).padStart(
                              2,
                              '0'
                            )}
                          </p>
                          {proj.year && (
                            <span className="text-white/60 font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/10 border border-white/10">
                              {proj.year}
                            </span>
                          )}
                        </div>

                        <p className="text-cyber-teal font-mono text-xs mb-2 tracking-widest uppercase text-glow-teal">
                          {proj.type}
                        </p>

                        <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                          {proj.title}
                        </h3>
                      </div>

                      {/* Project Actions */}

                      <div className="flex gap-4 items-center shrink-0">
                        {proj.video_link && (
                          <button
                            onClick={() =>
                              setActiveVideo(
                                proj.video_link
                              )
                            }
                            className="text-white/40 hover:text-red-400 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] transition-all cursor-pointer"
                            title="Watch Demo Video"
                            aria-label="Watch demo video"
                          >
                            <Film size={20} />
                          </button>
                        )}

                        {proj.github &&
                          proj.github !== '#' && (
                            <a
                              href={proj.github}
                              className="text-white/40 hover:text-white transition-colors"
                              target="_blank"
                              rel="noreferrer"
                              title="GitHub Repository"
                              aria-label={`${proj.title} GitHub repository`}
                            >
                              <Github size={20} />
                            </a>
                          )}

                        {proj.link &&
                          proj.link !== '#' && (
                            <a
                              href={proj.link}
                              className="text-white/40 hover:text-amber-400 transition-colors"
                              target="_blank"
                              rel="noreferrer"
                              title="Live Project"
                              aria-label={`${proj.title} live project`}
                            >
                              <ExternalLink size={20} />
                            </a>
                          )}
                      </div>
                    </div>

                    {/* Highlights / Description */}
                    {proj.highlights && proj.highlights.length > 0 ? (
                      <ul className="space-y-2 mb-8">
                        {proj.highlights.map((point, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-white/80 text-xs sm:text-sm leading-relaxed"
                          >
                            <span className="text-amber-400 mt-0.5 shrink-0 font-bold">›</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-white/70 mb-8 font-sans leading-relaxed text-sm">
                        {proj.desc}
                      </p>
                    )}
                  </div>

                  {/* ------------------------------------------------
                      PROJECT FOOTER
                  ------------------------------------------------ */}

                  <div className="mt-auto">
                    {/* Demo Button */}

                    {proj.video_link && (
                      <button
                        onClick={() =>
                          setActiveVideo(
                            proj.video_link
                          )
                        }
                        className="mb-6 flex items-center gap-2 text-xs font-mono px-4 py-2 bg-amber-500/10 border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-dark-900 transition-all duration-300 rounded"
                      >
                        <Film size={14} />

                        <span>
                          [WATCH_DEMO_VIDEO]
                        </span>
                      </button>
                    )}

                    {/* Tech Stack */}

                    <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                      {proj.tech?.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 bg-white/5 border border-white/10 rounded text-white/50 hover:text-amber-300 hover:border-amber-400/30 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ------------------------------------------------
              RIGHT SIDE VISUAL
          ------------------------------------------------ */}

          <div className="lg:sticky lg:top-8 hidden lg:flex w-full items-center justify-center">
            <div className="w-full max-w-[420px]">
              <QuantumAttractor />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------
          VIDEO MODAL
      --------------------------------------------------- */}

      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-6"
          onClick={closeVideo}
        >
          <div
            className="relative w-full max-w-4xl bg-dark-900 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,176,0,0.2)]"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* Close Button */}

            <button
              onClick={closeVideo}
              className="absolute top-4 right-4 z-50 text-white/70 hover:text-white bg-black/40 p-2.5 rounded-full hover:bg-black/60 transition-colors"
              aria-label="Close video"
            >
              <X size={20} />
            </button>

            {/* Video Container */}

            <div className="aspect-video w-full bg-black">
              {activeVideo.includes(
                'youtube.com'
              ) ||
              activeVideo.includes('youtu.be') ? (
                <iframe
                  src={getYouTubeEmbedUrl(
                    activeVideo
                  )}
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
    </div>
  );
}