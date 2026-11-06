import React, { useState, useEffect } from 'react';
import { CinematicLoader } from './components/CinematicLoader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { ProjectShowcase } from './components/ProjectShowcase';
import { LinkedInSection } from './components/LinkedInSection';
import { DesignProcess } from './components/DesignProcess';
import { SkillsDashboard } from './components/SkillsDashboard';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ProjectModal } from './components/ProjectModal';
import { CAD_PROJECTS, CADProject } from './data/projects';

export const App: React.FC = () => {
  const [loaderComplete, setLoaderComplete] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [preselectedService, setPreselectedService] = useState<string>('3D CAD Modelling');
  const [selectedProject, setSelectedProject] = useState<CADProject | null>(null);

  // Track active section for sticky navbar highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'projects', 'linkedin', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectServiceForContact = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNextModalProject = () => {
    if (!selectedProject) return;
    const currentIdx = CAD_PROJECTS.findIndex((p) => p.id === selectedProject.id);
    const nextIdx = (currentIdx + 1) % CAD_PROJECTS.length;
    setSelectedProject(CAD_PROJECTS[nextIdx]);
  };

  const handlePrevModalProject = () => {
    if (!selectedProject) return;
    const currentIdx = CAD_PROJECTS.findIndex((p) => p.id === selectedProject.id);
    const prevIdx = (currentIdx - 1 + CAD_PROJECTS.length) % CAD_PROJECTS.length;
    setSelectedProject(CAD_PROJECTS[prevIdx]);
  };

  const currentModalIndex = selectedProject
    ? CAD_PROJECTS.findIndex((p) => p.id === selectedProject.id)
    : 0;

  return (
    <div className="relative min-h-screen bg-[#080A0E] text-[#F5F7FA] font-sans selection:bg-[#3987FF] selection:text-white">
      {/* Cinematic Opening Intro */}
      {!loaderComplete && (
        <CinematicLoader onComplete={() => setLoaderComplete(true)} />
      )}

      {/* Desktop Custom Crosshair Cursor */}
      <CustomCursor />

      {/* Sticky Premium Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections — One Continuous Flow */}
      <main>
        {/* 1. Existing Hero and 3D CAD Viewer (strictly untouched) */}
        <Hero />

        {/* 2. About Section */}
        <About />

        {/* 3. Services Section */}
        <Services onSelectServiceForContact={handleSelectServiceForContact} />

        {/* 4. ONE SINGLE CONTINUOUS PROJECT SHOWCASE SECTION:
               - First Stage: 4 Cinematic Featured Projects (01-04)
               - Second Stage: Remaining 3 Projects Archive (05-07) in the SAME section container */}
        <ProjectShowcase onSelectProject={(p) => setSelectedProject(p)} />

        {/* 5. LinkedIn Activity (Clean professional networking, no duplicate gallery) */}
        <LinkedInSection />

        {/* 6. Design Process & Workflow */}
        <DesignProcess />

        {/* 7. Skills & Verified Software */}
        <SkillsDashboard />

        {/* 8. Contact & Project Inquiry */}
        <ContactSection preselectedService={preselectedService} />
      </main>

      {/* 9. Comprehensive Studio Footer */}
      <Footer />

      {/* Full-Screen Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onNextProject={handleNextModalProject}
        onPrevProject={handlePrevModalProject}
        hasPrev={true}
        hasNext={true}
        currentIndex={currentModalIndex}
        totalProjects={CAD_PROJECTS.length}
      />
    </div>
  );
};

export default App;
