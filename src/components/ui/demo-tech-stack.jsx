import { TechStackMarquee } from "../../components/ui/tech-stack-marquee";
import { motion } from "motion/react";

// Standard CDN links for tech logos. 
const techData = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg" },
  { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "HTML", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/html5.svg" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/css3.svg" },
  { name: "Celery", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/celery.svg" },
  { name: "Postman", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/postman.svg" },
  { name: "OpenAI", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/openai.svg" },
  { name: "Gemini", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/googlegemini.svg" }, // Usually googlegemini
  { name: "LangChain", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/langchain.svg" },
  { name: "LangGraph", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/langgraph.svg" }, 
  { name: "VectorDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" },
  { name: "HuggingFace", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/huggingface.svg" },
  { name: "Ollama", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/ollama.svg" },
  { name: "DeepSeek", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/deepseek.svg" },
];

// Split the tech stack into two rows for the marquee effect
const rowOne = techData.slice(0, 11);
const rowTwo = techData.slice(11, 22);

const TechStack = () => {
  return (
    <section className="bg-transparent my-20 relative overflow-hidden py-10 border-y border-white/5 w-full">
      <div className="w-full z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[640px] mx-auto mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="border border-amber-500/30 py-1 px-4 rounded-lg backdrop-blur-md text-sm font-mono tracking-widest uppercase opacity-70 text-amber-500 box-glow-amber">
              System Capabilities
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-widest uppercase font-mono text-center text-white text-glow-amber">
            _TECHNOLOGIES & TOOLS
          </h2>
        </motion.div>

        {/* Marquee Containers */}
        <div className="flex flex-col gap-8 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] w-full">
          <TechStackMarquee technologies={rowOne} duration={35} />
          <TechStackMarquee technologies={rowTwo} duration={40} reverse={true} />
        </div>
      </div>
    </section>
  );
};

export default TechStack;
