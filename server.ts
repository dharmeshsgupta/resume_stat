import express from "express";
import cors from "cors";
import path from "path";
import { createServer as createViteServer } from "vite";

interface Inquiry {
  id: number;
  name: string;
  email: string;
  inquiry_type: "HIRE" | "FREELANCE";
  message: string;
  company?: string;
  job_title?: string;
  project_domain?: string;
  budget_scope?: string;
  created_at: string;
}

const inquiries: Inquiry[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get(["/api/stats", "/api/stats/"], (req, res) => {
    res.json({
      linkedin_followers: "12,300+",
      resume: "/resume.pdf",
      updated_at: new Date().toISOString()
    });
  });

  app.get(["/api/projects", "/api/projects/"], (req, res) => {
    res.json([
      {
        id: 1,
        title: "OrchSutra.ai",
        type: "GenAI / Infrastructure",
        year: "2026",
        desc: "A scalable multi-LLM orchestration platform routing queries across top-tier models (OpenAI, Anthropic, Ollama, Gemini) via a unified RESTful API. Features automated fallback strategies, token analytics tracking, asynchronous processing, Firebase authentication, multimodal chat, dynamic API key management, and pre-built RAG agents powered by LangChain and LangGraph.",
        highlights: [
          "Developed a scalable multi-LLM orchestration platform routing queries across top-tier models (OpenAI, Anthropic, Ollama, Gemini) via a unified RESTful API.",
          "Built a high-performance FastAPI backend with automated fallback strategies, token analytics tracking, and asynchronous processing for concurrent AI workflows.",
          "Engineered a responsive React dashboard integrating Firebase authentication, interactive multi-modal chat (Vision/TTS), and dynamic API key management.",
          "Implemented an automated API key provisioning engine featuring pre-built, memory-optimized RAG agents powered by LangChain and LangGraph for zero-knowledge integration.",
          "Deployed a highly available, containerized microservices architecture utilizing Docker, Render, and Vercel."
        ],
        tech: ["FastAPI", "PostgreSQL", "SQLite", "JWT", "Firebase", "Docker", "Vercel"],
        link: "https://orchsutra.ai-eta-ruddy.vercel.app",
        github: "https://github.com/dharmeshsgupta/OrchSutra.ai",
        video_link: null,
        cardStyle: "cartoon-card-amber",
        order: 0
      },
      {
        id: 2,
        title: "BusLocator – Smart Campus Transport Management System",
        type: "Smart Campus Transport / Microservices",
        year: "2026",
        desc: "A scalable microservices-based transport management platform using FastAPI, React, PostgreSQL, Redis, and Docker. Features real-time tracking with WebSockets and Redis Pub/Sub, secure JWT role-based access, Razorpay payments, and responsive dashboards with Leaflet.",
        highlights: [
          "Engineered a scalable microservices-based transport management platform using FastAPI, React, PostgreSQL, Redis, and Docker.",
          "Implemented secure JWT authentication, role-based authorization, and REST APIs for managing students, drivers, buses, routes, and transport assignments.",
          "Developed a real-time tracking service with WebSockets and Redis Pub/Sub to stream live bus locations, ETA updates, occupancy, and route progress.",
          "Integrated Razorpay for transport fee payments with secure order creation, webhook verification, transaction auditing, and receipt generation.",
          "Built responsive dashboards using React Query, Zustand, and Leaflet, enabling live tracking, analytics, and transport administration."
        ],
        tech: ["FastAPI", "React", "PostgreSQL", "Redis", "Docker", "WebSockets", "Razorpay", "Leaflet", "Zustand", "React Query"],
        link: "https://bus-locator-six.vercel.app/",
        github: "https://github.com/dharmeshsgupta/BusLocator",
        video_link: null,
        cardStyle: "cartoon-card-teal",
        order: 1
      },
      {
        id: 3,
        title: "RiwaazWear (E-Commerce Web Application)",
        type: "E-Commerce Web Application",
        year: "2025",
        desc: "A complete e-commerce web application built with Django and PostgreSQL, featuring user registration, login, Google OAuth authentication, secure PayPal payments, refunds, transaction history, and a dynamic admin panel for managing products, categories, pricing, inventory, and images.",
        highlights: [
          "Developed a complete e-commerce web application with user registration, login, and Google OAuth authentication.",
          "Integrated PayPal payment gateway supporting secure payments, refunds, and transaction history tracking.",
          "Designed a dynamic admin panel for managing products, categories, pricing, inventory, and images.",
          "Implemented a scalable backend architecture to support future features and high data consistency."
        ],
        tech: ["Django", "PostgreSQL", "Google OAuth", "PayPal"],
        link: "#",
        github: "https://github.com/dharmeshsgupta/E-commerce-django",
        video_link: null,
        cardStyle: "cartoon-card-amber",
        order: 2
      },
      {
        id: 4,
        title: "Aadhaar DBT Mitra",
        type: "Public Service / AI",
        year: "2025",
        desc: "A public-service application designed to help users verify Aadhaar–Bank and DBT linkage status. It also includes community features such as posts, comments, likes, media sharing, image and video uploads, and an AI-powered chatbot for Aadhaar DBT-related queries.",
        highlights: [
          "Designed a public-service application to help users verify Aadhaar–Bank and DBT linkage status with high reliability.",
          "Built community features including posts, comments, likes, media sharing, and image and video uploads.",
          "Engineered an AI-powered chatbot for dynamic, context-aware Aadhaar DBT-related user queries and assistance."
        ],
        tech: ["Django", "PostgreSQL", "AI Chatbot", "REST API"],
        link: "#",
        github: "https://github.com/dharmeshsgupta/DBT_Mitra_Project",
        video_link: null,
        cardStyle: "cartoon-card-teal",
        order: 3
      }
    ]);
  });

  app.get(["/api/experiences", "/api/experiences/"], (req, res) => {
    res.json([
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
    ]);
  });

  app.post(["/api/contact", "/api/contact/"], (req, res) => {
    const {
      name,
      email,
      inquiry_type,
      message,
      company,
      job_title,
      project_domain,
      budget_scope
    } = req.body || {};

    const trimmedName = (name || "").trim();
    const trimmedEmail = (email || "").trim();
    const trimmedInquiryType = (inquiry_type || "").trim().toUpperCase();
    const trimmedMessage = (message || "").trim();

    if (!trimmedName || !trimmedEmail || !trimmedInquiryType || !trimmedMessage) {
      return res.status(400).json({ error: "All fields (name, email, inquiry_type, message) are required." });
    }

    if (trimmedInquiryType !== "HIRE" && trimmedInquiryType !== "FREELANCE") {
      return res.status(400).json({ error: "Invalid inquiry type. Must be 'HIRE' or 'FREELANCE'." });
    }

    let finalCompany = "";
    let finalJobTitle = "";
    let finalProjectDomain = "";
    let finalBudgetScope = "";

    if (trimmedInquiryType === "HIRE") {
      finalCompany = (company || "").trim();
      finalJobTitle = (job_title || "").trim();
      if (!finalCompany || !finalJobTitle) {
        return res.status(400).json({ error: "Company and Job Title are required for Hire protocol." });
      }
    } else {
      finalProjectDomain = (project_domain || "").trim();
      finalBudgetScope = (budget_scope || "").trim();
      if (!finalProjectDomain || !finalBudgetScope) {
        return res.status(400).json({ error: "Project Domain and Budget Scope are required for Freelance protocol." });
      }
    }

    const inquiryId = Date.now();
    inquiries.push({
      id: inquiryId,
      name: trimmedName,
      email: trimmedEmail,
      inquiry_type: trimmedInquiryType,
      message: trimmedMessage,
      company: finalCompany || undefined,
      job_title: finalJobTitle || undefined,
      project_domain: finalProjectDomain || undefined,
      budget_scope: finalBudgetScope || undefined,
      created_at: new Date().toISOString()
    });

    const protocolDisplay = trimmedInquiryType === "HIRE" ? "Full-Time Hire" : "Freelance Project";
    return res.status(201).json({
      status: "success",
      message: `Inquiry saved successfully under ${protocolDisplay} protocol.`,
      id: inquiryId
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
