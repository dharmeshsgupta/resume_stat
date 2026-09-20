import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import TechStack from './components/ui/demo-tech-stack'
import AllProjectsView from './components/AllProjectsView'
import AllExperienceView from './components/AllExperienceView'
import FullPageScrollVideo from './components/ui/FullPageScrollVideo'
import StoryboardSection from './components/ui/StoryboardSection'

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [stats, setStats] = useState({ linkedinFollowers: "12,300+", resume: "/resume.pdf" });

  useEffect(() => {
    fetch("/api/stats/")
      .then((res) => {
        if (!res.ok) throw new Error("Local stats error");
        return res.json();
      })
      .catch(() => fetch("https://guptadharmesh.pythonanywhere.com/api/stats/").then(res => res.json()))
      .then((data) => {
        if (data) {
          setStats({
            linkedinFollowers: data.linkedin_followers || "12,300+",
            resume: data.resume || "/resume.pdf"
          });
        }
      })
      .catch((err) => console.log("Using fallback stats:", err));
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
      window.scrollTo(0, 0);
    };

    window.portfolioNavigate = (to) => {
      window.history.pushState(null, '', to);
      window.dispatchEvent(new Event('popstate'));
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const pageVariants = {
    initial: { opacity: 0, x: 100, rotateY: 15, scale: 0.95 },
    animate: { opacity: 1, x: 0, rotateY: 0, scale: 1 },
    exit: { opacity: 0, x: -100, rotateY: -15, scale: 0.95 }
  };

  return (
    <AnimatePresence mode="wait">
      {path === '/projects' ? (
        <motion.div
          key="projects-view"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ type: "spring", stiffness: 90, damping: 14 }}
        >
          <AllProjectsView />
        </motion.div>
      ) : path === '/experience' ? (
        <motion.div
          key="experience-view"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ type: "spring", stiffness: 90, damping: 14 }}
        >
          <AllExperienceView />
        </motion.div>
      ) : (
        <motion.div
          key="main-view"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ type: "spring", stiffness: 90, damping: 14 }}
          className="bg-dark-900 min-h-screen text-white font-sans selection:bg-amber-500/30 selection:text-amber-200 relative overflow-x-hidden"
        >
          {/* Full Page Animated Video Frame Background */}
          <FullPageScrollVideo />

          <Navbar resumeUrl={stats.resume} />
          
          <main className="relative z-10">
            <Hero linkedinFollowers={stats.linkedinFollowers} resumeUrl={stats.resume} />
            
            {/* Semi-transparent Glass Wrapper containing Storyboard Section Panels */}
            <div className="relative z-10 bg-dark-900/65 backdrop-blur-md border-t-2 border-amber-400/30 py-6">
              
              <StoryboardSection id="about" panelNumber={1} title="SYSTEM_PROFILE" direction="left">
                <About />
              </StoryboardSection>

              <StoryboardSection id="techstack" panelNumber={2} title="CORE_TECH_STACK" direction="right">
                <TechStack />
              </StoryboardSection>

              <StoryboardSection id="education" panelNumber={3} title="ACADEMIC_TIMELINE" direction="left">
                <Education />
              </StoryboardSection>

              <StoryboardSection id="experience" panelNumber={4} title="CAREER_LOGS" direction="right">
                <Experience />
              </StoryboardSection>

              <StoryboardSection id="projects" panelNumber={5} title="FEATURED_PROJECTS" direction="left">
                <Projects />
              </StoryboardSection>

              <StoryboardSection id="contact" panelNumber={6} title="COMMUNICATION_LINK" direction="right">
                <Contact />
              </StoryboardSection>

            </div>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App


