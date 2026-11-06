import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CAD_PROJECTS, CADProject } from '../data/projects';
import { 
  Compass, 
  ChevronRight, 
  ChevronLeft, 
  Eye, 
  Layers, 
  ArrowRight, 
  ArrowDown, 
  CheckCircle2, 
  ExternalLink,
  SlidersHorizontal,
  Sparkles,
  Maximize2,
  Cpu,
  Box,
  FileSpreadsheet
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProjectShowcaseProps {
  onSelectProject: (project: CADProject) => void;
}

// Typing text component that reveals text character by character
const TypewriterTitle: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const characters = Array.from(text);
  return (
    <span className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.04,
            delay: index * 0.025,
            ease: 'easeOut',
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ onSelectProject }) => {
  // All 7 projects from verified archive:
  // 1. Water Control Ball Valve Assembly & Kinematics
  // 2. 4-Cylinder Inline Engine Kinematic Assembly
  // 3. Kinematic Elbow Engine Assembly & Mechanism Study
  // 4. Complex Surface & Ergonomic Form Studies
  // 5. Multi-Flanged Hydraulic Manifold & 2D Drafting
  // 6. Precision GD&T Mechanical Drafting Exercises
  // 7. 3D CAD Concept Design – Spacecraft Landing Module
  const allProjects = CAD_PROJECTS;

  // Active scene index: 
  // 0: Scene 1 (Opening Title)
  // 1: Scene 2 (Project 01 - Ball Valve)
  // 2: Scene 3 (Project 02 - 4-Cylinder Engine)
  // 3: Scene 4 (Project 03 - Elbow Engine)
  // 4: Scene 5 (Project 04 - CATIA Surface Studies)
  const [activeScene, setActiveScene] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [autoPlay, setAutoPlay] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const showreelPinRef = useRef<HTMLDivElement>(null);

  const categories = [
    'All',
    'Mechanical Assemblies',
    'Surface Modelling',
    'Technical Drafting',
    'Kinematics & Simulation',
    'Concept Design'
  ];

  const filteredProjects = activeCategory === 'All'
    ? allProjects
    : allProjects.filter((p) => p.category === activeCategory);

  // GSAP ScrollTrigger to sync scrolling with showreel scenes
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=380%',
        pin: showreelPinRef.current,
        scrub: 0.8,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Progress mapping to 5 showreel scenes:
          // 0.00 - 0.18: Scene 0 (Opening Title)
          // 0.18 - 0.38: Scene 1 (Project 01)
          // 0.38 - 0.58: Scene 2 (Project 02)
          // 0.58 - 0.78: Scene 3 (Project 03)
          // 0.78 - 1.00: Scene 4 (Project 04)
          if (progress < 0.18) {
            setActiveScene(0);
          } else if (progress < 0.38) {
            setActiveScene(1);
          } else if (progress < 0.58) {
            setActiveScene(2);
          } else if (progress < 0.78) {
            setActiveScene(3);
          } else {
            setActiveScene(4);
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleNextScene = () => {
    setActiveScene((prev) => (prev + 1) % 5);
  };

  const handlePrevScene = () => {
    setActiveScene((prev) => (prev - 1 + 5) % 5);
  };

  const scrollToAllProjects = () => {
    const target = document.getElementById('all-projects-gallery');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative bg-[#080A0E] text-[#F5F7FA] border-t border-[#1E293B] overflow-hidden"
    >
      {/* Background Engineering Blueprint Overlay */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#3987FF]/5 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[#00D2FF]/5 blur-[150px] pointer-events-none rounded-full" />

      {/* ========================================================================= */}
      {/* PART 1: PINNED SCROLL-CONTROLLED SHOWREEL STAGE                           */}
      {/* ========================================================================= */}
      <div
        ref={showreelPinRef}
        className="h-screen w-full flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative z-20 max-w-7xl mx-auto overflow-hidden"
      >
        {/* Top Telemetry & HUD Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]/80 bg-[#080A0E]/60 backdrop-blur-md relative z-30">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00D2FF] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider font-semibold text-white">
              CAD SHOWREEL // SCENE 0{activeScene + 1} OF 05
            </span>
            <span className="hidden sm:inline-block text-[#1E293B]">|</span>
            <span className="hidden sm:inline-block font-mono text-xs text-[#3987FF]">
              {activeScene === 0 ? 'CINEMATIC INTRO' : allProjects[activeScene - 1]?.category}
            </span>
          </div>

          {/* Scene Navigation Pills & All Projects Shortcut */}
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-1.5 mr-2">
              {['INTRO', '01 BALL VALVE', '02 4-CYL ENGINE', '03 ELBOW ENGINE', '04 SURFACING'].map((label, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveScene(idx)}
                  className={`px-2.5 py-1 rounded text-[10px] font-mono transition-all ${
                    activeScene === idx
                      ? 'bg-[#3987FF] text-white font-bold shadow-md shadow-[#3987FF]/30'
                      : 'bg-[#111720] text-[#A3ACB9] hover:text-white border border-[#1E293B]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <button
              onClick={scrollToAllProjects}
              className="px-3 py-1.5 rounded-lg bg-[#151D2A] hover:bg-[#1E293B] border border-[#1E293B] hover:border-[#3987FF] text-xs font-mono text-[#00D2FF] flex items-center space-x-1 transition-all"
            >
              <span>Explore All 7</span>
              <ArrowDown className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Center Main Showreel Stage (Changes dynamically per scene) */}
        <div className="relative flex-1 flex items-center justify-center my-auto py-4">
          <AnimatePresence mode="wait">
            {/* SCENE 1 — OPENING TITLE */}
            {activeScene === 0 && (
              <motion.div
                key="showreel-scene-0"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full text-center max-w-4xl mx-auto space-y-6 relative"
              >
                {/* Engineering Grid & Streaks */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-[#00D2FF]/60 to-transparent blur-sm animate-pulse" />
                
                <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#111720] border border-[#3987FF]/40 text-xs font-mono text-[#3987FF] uppercase tracking-widest shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-[#00D2FF]" />
                  <span>CAD PROJECT SHOWREEL // SUNDAR SARAVANAN</span>
                </div>

                <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-tight">
                  ENGINEERING <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3987FF] via-[#00D2FF] to-white drop-shadow-[0_0_35px_rgba(57,135,255,0.4)]">
                    IDEAS INTO REALITY.
                  </span>
                </h2>

                <p className="text-sm sm:text-base md:text-lg text-[#CBD5E1] font-sans max-w-2xl mx-auto leading-relaxed">
                  A scroll-synchronized showcase exploring precision mechanical assemblies, kinematic simulations, parametric surface lofts, and production drawings.
                </p>

                {/* Coordinate Readouts & Scroll Callout */}
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-mono text-[#A3ACB9]">
                  <span className="px-3 py-1 rounded bg-[#111720] border border-[#1E293B]">
                    SYS_COORD: 43.19.88 // 60 FPS RECORDING
                  </span>
                  <span className="flex items-center space-x-1.5 text-[#00D2FF] animate-bounce">
                    <span>Scroll Down to Initiate Showreel</span>
                    <ArrowDown className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            )}

            {/* SCENE 2 — PROJECT 01: Water Control Ball Valve Assembly & Kinematics */}
            {activeScene === 1 && (
              <motion.div
                key="showreel-scene-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.55 }}
                className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center"
              >
                {/* Content Left */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#3987FF]/15 border border-[#3987FF]/30 text-xs font-mono text-[#3987FF]">
                    <span className="font-bold">SCENE 02</span>
                    <span>// MASK REVEAL & ZOOM</span>
                  </div>

                  <div className="space-y-2">
                    <div className="font-mono text-xs text-[#00D2FF]">01. VERIFIED CAD ASSEMBLY</div>
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                      <TypewriterTitle text={allProjects[0].title} />
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-[#CBD5E1] font-sans leading-relaxed">
                    {allProjects[0].description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#1E293B] text-xs font-mono">
                    <div className="flex items-center space-x-2 text-[#A3ACB9]">
                      <span className="text-[#3987FF] font-bold">SOFTWARE:</span>
                      <span className="text-white font-semibold">SolidWorks 2024</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[#A3ACB9]">
                      <span className="text-[#3987FF] font-bold">FEATURES:</span>
                      <span className="text-[#00D2FF]">Concentric Mates • Exploded View BOM</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center space-x-3">
                    <button
                      onClick={() => onSelectProject(allProjects[0])}
                      className="px-5 py-3 rounded-xl bg-[#3987FF] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#2563EB] transition-all flex items-center space-x-2 shadow-lg shadow-[#3987FF]/30 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Project Details</span>
                    </button>
                    <a
                      href={allProjects[0].linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 rounded-xl bg-[#151D2A] hover:bg-[#1E293B] border border-[#1E293B] text-[#A3ACB9] hover:text-white font-mono text-xs flex items-center space-x-1.5 transition-all"
                    >
                      <span>LinkedIn</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#3987FF]" />
                    </a>
                  </div>
                </div>

                {/* Media Right (Cinematic Mask Reveal with Slow Zoom) */}
                <motion.div
                  initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', scale: 1.02 }}
                  animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', scale: 1.08 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-[#1E293B] bg-[#070A0F] shadow-2xl group cursor-pointer"
                  onClick={() => onSelectProject(allProjects[0])}
                >
                  <div className="relative aspect-[16/10] overflow-hidden flex items-center justify-center p-4 sm:p-6 bg-[#070A0F]">
                    <img
                      src={allProjects[0].primaryImage}
                      alt={allProjects[0].title}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080A0E] via-transparent to-transparent opacity-40 pointer-events-none" />
                    <div className="absolute bottom-4 right-4 bg-[#0A0E14]/90 backdrop-blur-md px-3 py-1 rounded-lg border border-[#1E293B] text-xs font-mono text-white flex items-center space-x-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#3987FF]" />
                      <span>3 Multi-Views Available</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* SCENE 3 — PROJECT 02: 4-Cylinder Inline Engine Kinematic Assembly */}
            {activeScene === 2 && (
              <motion.div
                key="showreel-scene-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.55 }}
                className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center"
              >
                {/* Content Left */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#00D2FF]/15 border border-[#00D2FF]/30 text-xs font-mono text-[#00D2FF]">
                    <span className="font-bold">SCENE 03</span>
                    <span>// HORIZONTAL WIPE & PARALLAX</span>
                  </div>

                  <div className="space-y-2">
                    <div className="font-mono text-xs text-[#3987FF]">02. KINEMATIC SIMULATION</div>
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                      <TypewriterTitle text={allProjects[1].title} />
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-[#CBD5E1] font-sans leading-relaxed">
                    {allProjects[1].description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#1E293B] text-xs font-mono">
                    <div className="flex items-center space-x-2 text-[#A3ACB9]">
                      <span className="text-[#00D2FF] font-bold">SOFTWARE:</span>
                      <span className="text-white font-semibold">SolidWorks Motion Study 3</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[#A3ACB9]">
                      <span className="text-[#00D2FF] font-bold">DYNAMICS:</span>
                      <span className="text-[#CBD5E1]">Rotary Kinematics • Dynamic Balancing</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center space-x-3">
                    <button
                      onClick={() => onSelectProject(allProjects[1])}
                      className="px-5 py-3 rounded-xl bg-[#3987FF] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#2563EB] transition-all flex items-center space-x-2 shadow-lg shadow-[#3987FF]/30 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Project Details</span>
                    </button>
                    <a
                      href={allProjects[1].linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 rounded-xl bg-[#151D2A] hover:bg-[#1E293B] border border-[#1E293B] text-[#A3ACB9] hover:text-white font-mono text-xs flex items-center space-x-1.5 transition-all"
                    >
                      <span>LinkedIn</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#3987FF]" />
                    </a>
                  </div>
                </div>

                {/* Media Right (Horizontal Wipe Reveal) */}
                <motion.div
                  initial={{ x: 120, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-[#1E293B] bg-[#070A0F] shadow-2xl group cursor-pointer"
                  onClick={() => onSelectProject(allProjects[1])}
                >
                  <div className="relative aspect-[16/10] overflow-hidden flex items-center justify-center p-4 sm:p-6 bg-[#070A0F]">
                    <img
                      src={allProjects[1].primaryImage}
                      alt={allProjects[1].title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 left-4 font-mono text-[11px] bg-[#080A0E]/90 text-[#00D2FF] px-3 py-1 rounded border border-[#00D2FF]/30">
                      SOLIDWORKS MOTION STUDY 3
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* SCENE 4 — PROJECT 03: Kinematic Elbow Engine Assembly & Mechanism Study */}
            {activeScene === 3 && (
              <motion.div
                key="showreel-scene-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.55 }}
                className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center"
              >
                {/* Content Left */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#3987FF]/15 border border-[#3987FF]/30 text-xs font-mono text-[#3987FF]">
                    <span className="font-bold">SCENE 04</span>
                    <span>// SPLIT-SCREEN REVEAL</span>
                  </div>

                  <div className="space-y-2">
                    <div className="font-mono text-xs text-[#00D2FF]">03. HOBSON'S JOINT MECHANISM</div>
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                      <TypewriterTitle text={allProjects[2].title} />
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-[#CBD5E1] font-sans leading-relaxed">
                    {allProjects[2].description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#1E293B] text-xs font-mono">
                    <div className="flex items-center space-x-2 text-[#A3ACB9]">
                      <span className="text-[#3987FF] font-bold">SOFTWARE:</span>
                      <span className="text-white font-semibold">SolidWorks 2024</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[#A3ACB9]">
                      <span className="text-[#3987FF] font-bold">VIEWS:</span>
                      <span className="text-[#00D2FF]">Exploded View • 4-View Projection</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center space-x-3">
                    <button
                      onClick={() => onSelectProject(allProjects[2])}
                      className="px-5 py-3 rounded-xl bg-[#3987FF] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#2563EB] transition-all flex items-center space-x-2 shadow-lg shadow-[#3987FF]/30 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Project Details</span>
                    </button>
                    <a
                      href={allProjects[2].linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 rounded-xl bg-[#151D2A] hover:bg-[#1E293B] border border-[#1E293B] text-[#A3ACB9] hover:text-white font-mono text-xs flex items-center space-x-1.5 transition-all"
                    >
                      <span>LinkedIn</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#3987FF]" />
                    </a>
                  </div>
                </div>

                {/* Media Right (Split Screen Reveal) */}
                <motion.div
                  initial={{ scale: 1.15, opacity: 0 }}
                  animate={{ scale: 1.0, opacity: 1 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-[#1E293B] bg-[#070A0F] shadow-2xl group cursor-pointer"
                  onClick={() => onSelectProject(allProjects[2])}
                >
                  <div className="relative aspect-[16/10] overflow-hidden flex items-center justify-center p-4 sm:p-6 bg-[#070A0F]">
                    <img
                      src={allProjects[2].primaryImage}
                      alt={allProjects[2].title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute bottom-4 right-4 bg-[#0A0E14]/90 backdrop-blur-md px-3 py-1 rounded-lg border border-[#1E293B] text-xs font-mono text-white flex items-center space-x-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#3987FF]" />
                      <span>Exploded View & 4-Projection</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* SCENE 5 — PROJECT 04: Complex Surface & Ergonomic Form Studies */}
            {activeScene === 4 && (
              <motion.div
                key="showreel-scene-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.55 }}
                className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center"
              >
                {/* Content Left */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#00D2FF]/15 border border-[#00D2FF]/30 text-xs font-mono text-[#00D2FF]">
                    <span className="font-bold">SCENE 05</span>
                    <span>// DIAGONAL MASK & BLUEPRINT SCAN</span>
                  </div>

                  <div className="space-y-2">
                    <div className="font-mono text-xs text-[#3987FF]">04. GENERATIVE SHAPE DESIGN (GSD)</div>
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                      <TypewriterTitle text={allProjects[3].title} />
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-[#CBD5E1] font-sans leading-relaxed">
                    {allProjects[3].description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#1E293B] text-xs font-mono">
                    <div className="flex items-center space-x-2 text-[#A3ACB9]">
                      <span className="text-[#00D2FF] font-bold">SOFTWARE:</span>
                      <span className="text-white font-semibold">CATIA V5 GSD</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[#A3ACB9]">
                      <span className="text-[#00D2FF] font-bold">MODELS:</span>
                      <span className="text-[#CBD5E1]">Tennis Racket • Helical Surface • Flagon</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center space-x-3">
                    <button
                      onClick={() => onSelectProject(allProjects[3])}
                      className="px-5 py-3 rounded-xl bg-[#3987FF] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#2563EB] transition-all flex items-center space-x-2 shadow-lg shadow-[#3987FF]/30 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Project Details</span>
                    </button>
                    <a
                      href={allProjects[3].linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 rounded-xl bg-[#151D2A] hover:bg-[#1E293B] border border-[#1E293B] text-[#A3ACB9] hover:text-white font-mono text-xs flex items-center space-x-1.5 transition-all"
                    >
                      <span>LinkedIn</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#3987FF]" />
                    </a>
                  </div>
                </div>

                {/* Media Right (Diagonal Mask Wipe with Blueprint Laser Scan) */}
                <motion.div
                  initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', opacity: 0 }}
                  animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-[#1E293B] bg-[#070A0F] shadow-2xl group cursor-pointer"
                  onClick={() => onSelectProject(allProjects[3])}
                >
                  {/* Animated Laser Beam */}
                  <motion.div
                    initial={{ top: '-10%' }}
                    animate={{ top: '110%' }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent shadow-[0_0_15px_#00D2FF] z-10 pointer-events-none opacity-70"
                  />

                  <div className="relative aspect-[16/10] overflow-hidden flex items-center justify-center p-4 sm:p-6 bg-[#070A0F]">
                    <img
                      src={allProjects[3].primaryImage}
                      alt={allProjects[3].title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute bottom-4 right-4 bg-[#0A0E14]/90 backdrop-blur-md px-3 py-1 rounded-lg border border-[#1E293B] text-xs font-mono text-white flex items-center space-x-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#00D2FF]" />
                      <span>4 Surfacing Models Included</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Timecode & Stepper Controller */}
        <div className="pt-3 border-t border-[#1E293B]/80 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#080A0E]/60 backdrop-blur-md relative z-30">
          <div className="flex items-center space-x-3 text-xs font-mono text-[#A3ACB9]">
            <span className="text-[#3987FF] font-bold">TIMECODE:</span>
            <span>00:0{activeScene + 1}:24 // 60 FPS</span>
            <div className="flex items-center space-x-1 ml-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeScene
                      ? 'w-8 bg-gradient-to-r from-[#3987FF] to-[#00D2FF]'
                      : 'w-2 bg-[#1E293B]'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevScene}
              className="px-3 py-1.5 rounded-lg bg-[#151D2A] hover:bg-[#1E293B] border border-[#1E293B] text-xs font-mono text-white flex items-center space-x-1 transition-all"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev Scene</span>
            </button>
            <button
              onClick={handleNextScene}
              className="px-3 py-1.5 rounded-lg bg-[#151D2A] hover:bg-[#1E293B] border border-[#1E293B] text-xs font-mono text-white flex items-center space-x-1 transition-all"
            >
              <span>Next Scene</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={scrollToAllProjects}
              className="px-4 py-1.5 rounded-lg bg-[#3987FF] hover:bg-[#2563EB] text-xs font-mono text-white font-semibold flex items-center space-x-1 transition-all shadow-md shadow-[#3987FF]/25"
            >
              <span>Transform to All 7 Projects ↓</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PART 2: CINEMATIC TRANSFORMATION INTO ALL SEVEN PROJECTS GALLERY          */}
      {/* ========================================================================= */}
      <div id="all-projects-gallery" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Seamless Transformation Scene Divider */}
        <div className="relative flex items-center justify-center my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#3987FF]/40 to-transparent" />
          </div>
          <div className="relative px-6 py-2 rounded-full bg-[#111720] border border-[#1E293B] shadow-2xl text-center">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#00D2FF] flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#3987FF] animate-pulse" />
              <span>SCENE 06 // CINEMATIC TRANSFORMATION: ALL 7 PROJECTS GALLERY</span>
              <span className="w-2 h-2 rounded-full bg-[#3987FF] animate-pulse" />
            </span>
          </div>
        </div>

        {/* Gallery Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#111720] border border-[#3987FF]/30 text-xs font-mono text-[#3987FF] uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5 text-[#00D2FF]" />
              <span>03.B // COMPLETE PORTFOLIO ARCHIVE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              ALL SEVEN PROJECTS. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3987FF] via-[#00D2FF] to-white">
                ENGINEERED TO PERFECTION.
              </span>
            </h2>
          </div>

          <div className="mt-4 lg:mt-0 max-w-md">
            <p className="text-sm text-[#CBD5E1] font-sans leading-relaxed">
              The complete collection of mechanical assemblies, kinematic simulations, CATIA surface models, and standard ISO/ASME 2D drafting sheets.
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#3987FF] text-white shadow-lg shadow-[#3987FF]/25 font-bold'
                    : 'bg-[#111720] text-[#A3ACB9] hover:text-white hover:bg-[#151D2A] border border-[#1E293B]'
                }`}
              >
                {cat}
                {cat === 'All' ? ` (${allProjects.length})` : ''}
              </button>
            );
          })}
        </div>

        {/* Animated Staggered Asymmetric Editorial Grid (All 7 Projects) */}
        {activeCategory === 'All' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* ROW 1: Large Featured Card (8 Cols) - Water Control Ball Valve */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onClick={() => onSelectProject(allProjects[0])}
              className="lg:col-span-8 rounded-3xl bg-[#111720] border border-[#1E293B] hover:border-[#3987FF] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#3987FF]/15 group cursor-pointer overflow-hidden flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] bg-[#070A0F] overflow-hidden flex items-center justify-center p-6">
                <img
                  src={allProjects[0].primaryImage}
                  alt={allProjects[0].title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 font-mono text-[11px] bg-[#0A0E14]/90 text-[#3987FF] px-3 py-1 rounded-md border border-[#3987FF]/30">
                  PROJECT // 01
                </div>
                <div className="absolute bottom-4 right-4 bg-[#0A0E14]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#1E293B] text-xs font-mono text-white flex items-center space-x-2">
                  <Eye className="w-3.5 h-3.5 text-[#00D2FF]" />
                  <span>Click to Inspect 3D Model & Drawings</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 bg-gradient-to-b from-[#111720] to-[#0E1520]">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="font-mono text-xs text-[#00D2FF] uppercase tracking-wider font-semibold">
                      {allProjects[0].category}
                    </span>
                    <span className="text-[#1E293B]">•</span>
                    <span className="font-mono text-xs text-[#A3ACB9]">
                      {allProjects[0].software[0]}
                    </span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#3987FF] transition-colors mb-3">
                    {allProjects[0].title}
                  </h3>
                  <p className="text-sm text-[#A3ACB9] font-sans leading-relaxed line-clamp-2">
                    {allProjects[0].description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#1E293B] flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs font-mono text-[#64748B]">
                    <CheckCircle2 className="w-4 h-4 text-[#3987FF]" />
                    <span>Concentric Mates & Exploded Disassembly</span>
                  </div>
                  <span className="font-mono text-xs text-[#3987FF] font-semibold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>Inspect CAD</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            </motion.div>

            {/* ROW 1: Medium Card 1 (4 Cols) - 4-Cylinder Engine */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onClick={() => onSelectProject(allProjects[1])}
              className="lg:col-span-4 rounded-3xl bg-[#111720] border border-[#1E293B] hover:border-[#3987FF] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#3987FF]/15 group cursor-pointer overflow-hidden flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] bg-[#070A0F] overflow-hidden flex items-center justify-center p-4">
                <img
                  src={allProjects[1].primaryImage}
                  alt={allProjects[1].title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 font-mono text-[10px] bg-[#0A0E14]/90 text-[#00D2FF] px-2.5 py-1 rounded border border-[#00D2FF]/30">
                  PROJECT // 02
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1 bg-gradient-to-b from-[#111720] to-[#0E1520]">
                <div>
                  <div className="flex items-center space-x-2 mb-2 font-mono text-xs text-[#A3ACB9]">
                    <span className="text-[#3987FF] font-bold">SOLIDWORKS</span>
                    <span>•</span>
                    <span>MOTION STUDY 3</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-[#3987FF] transition-colors mb-2">
                    {allProjects[1].title}
                  </h3>
                  <p className="text-xs text-[#A3ACB9] font-sans leading-relaxed line-clamp-3">
                    {allProjects[1].description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#1E293B] flex items-center justify-between">
                  <span className="font-mono text-xs text-[#64748B]">Crankshaft Dynamic Balance</span>
                  <span className="font-mono text-xs text-[#3987FF] font-semibold">Inspect →</span>
                </div>
              </div>
            </motion.div>

            {/* ROW 2: Medium Card 2 (5 Cols) - Kinematic Elbow Engine */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              onClick={() => onSelectProject(allProjects[2])}
              className="lg:col-span-5 rounded-3xl bg-[#111720] border border-[#1E293B] hover:border-[#3987FF] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#3987FF]/15 group cursor-pointer overflow-hidden flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] bg-[#070A0F] overflow-hidden flex items-center justify-center p-4">
                <img
                  src={allProjects[2].primaryImage}
                  alt={allProjects[2].title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 font-mono text-[10px] bg-[#0A0E14]/90 text-[#3987FF] px-2.5 py-1 rounded border border-[#3987FF]/30">
                  PROJECT // 03
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1 bg-gradient-to-b from-[#111720] to-[#0E1520]">
                <div>
                  <div className="flex items-center space-x-2 mb-2 font-mono text-xs text-[#A3ACB9]">
                    <span className="text-[#3987FF] font-bold">SOLIDWORKS</span>
                    <span>•</span>
                    <span>HOBSON'S JOINT</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-[#3987FF] transition-colors mb-2">
                    {allProjects[2].title}
                  </h3>
                  <p className="text-xs text-[#A3ACB9] font-sans leading-relaxed line-clamp-3">
                    {allProjects[2].description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#1E293B] flex items-center justify-between">
                  <span className="font-mono text-xs text-[#64748B]">Exploded View & BOM</span>
                  <span className="font-mono text-xs text-[#3987FF] font-semibold">Inspect →</span>
                </div>
              </div>
            </motion.div>

            {/* ROW 2: Medium/Large Card 3 (7 Cols) - CATIA Surface Studies */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={() => onSelectProject(allProjects[3])}
              className="lg:col-span-7 rounded-3xl bg-[#111720] border border-[#1E293B] hover:border-[#3987FF] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#3987FF]/15 group cursor-pointer overflow-hidden flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] bg-[#070A0F] overflow-hidden flex items-center justify-center p-4">
                <img
                  src={allProjects[3].primaryImage}
                  alt={allProjects[3].title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 font-mono text-[10px] bg-[#0A0E14]/90 text-[#00D2FF] px-2.5 py-1 rounded border border-[#00D2FF]/30">
                  PROJECT // 04
                </div>
                <div className="absolute bottom-4 right-4 bg-[#0A0E14]/90 backdrop-blur-md px-2.5 py-1 rounded border border-[#1E293B] text-[11px] font-mono text-white flex items-center space-x-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#00D2FF]" />
                  <span>4 Surfacing Models</span>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1 bg-gradient-to-b from-[#111720] to-[#0E1520]">
                <div>
                  <div className="flex items-center space-x-2 mb-2 font-mono text-xs text-[#A3ACB9]">
                    <span className="text-[#00D2FF] font-bold">CATIA V5 GSD</span>
                    <span>•</span>
                    <span>G2 CONTINUITY</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-[#3987FF] transition-colors mb-2">
                    {allProjects[3].title}
                  </h3>
                  <p className="text-xs text-[#A3ACB9] font-sans leading-relaxed line-clamp-2">
                    {allProjects[3].description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#1E293B] flex items-center justify-between">
                  <span className="font-mono text-xs text-[#64748B]">Tennis Racket & Flagon</span>
                  <span className="font-mono text-xs text-[#3987FF] font-semibold">Inspect →</span>
                </div>
              </div>
            </motion.div>

            {/* ROW 3: Remaining 3 Projects (Cards 05, 06, 07 - 4 Cols Each = 12 Cols Total) */}
            {allProjects.slice(4, 7).map((project, idx) => {
              const projectNumber = `0${idx + 5}`;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.25 + idx * 0.08 }}
                  onClick={() => onSelectProject(project)}
                  className="lg:col-span-4 rounded-3xl bg-[#111720] border border-[#1E293B] hover:border-[#3987FF] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#3987FF]/15 group cursor-pointer overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] bg-[#070A0F] overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={project.primaryImage}
                      alt={project.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 left-4 font-mono text-[10px] bg-[#0A0E14]/90 text-[#3987FF] px-2.5 py-1 rounded border border-[#3987FF]/30">
                      PROJECT // {projectNumber}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1 bg-gradient-to-b from-[#111720] to-[#0E1520]">
                    <div>
                      <div className="flex items-center space-x-2 mb-2 font-mono text-xs text-[#A3ACB9]">
                        <span className="text-[#00D2FF] font-bold">{project.software[0]}</span>
                        <span>•</span>
                        <span className="truncate">{project.category}</span>
                      </div>
                      <h3 className="font-display text-base font-bold text-white group-hover:text-[#3987FF] transition-colors mb-2 line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[#A3ACB9] font-sans leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#1E293B] flex items-center justify-between">
                      <span className="font-mono text-xs text-[#64748B]">
                        {project.images.length} Drawing(s) / Views
                      </span>
                      <span className="font-mono text-xs text-[#3987FF] font-semibold">Inspect →</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Filtered Category Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onClick={() => onSelectProject(project)}
                className="rounded-3xl bg-[#111720] border border-[#1E293B] hover:border-[#3987FF] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#3987FF]/15 group cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] bg-[#070A0F] overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={project.primaryImage}
                    alt={project.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 font-mono text-[10px] bg-[#0A0E14]/90 text-[#3987FF] px-2.5 py-1 rounded border border-[#3987FF]/30">
                    {project.category}
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1 bg-gradient-to-b from-[#111720] to-[#0E1520]">
                  <div>
                    <div className="flex items-center space-x-2 mb-2 font-mono text-xs text-[#A3ACB9]">
                      <span className="text-[#00D2FF] font-bold">{project.software[0]}</span>
                      <span>•</span>
                      <span>{project.status}</span>
                    </div>
                    <h3 className="font-display text-base font-bold text-white group-hover:text-[#3987FF] transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#A3ACB9] font-sans leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#1E293B] flex items-center justify-between">
                    <span className="font-mono text-xs text-[#64748B]">
                      {project.images.length} View(s) Available
                    </span>
                    <span className="font-mono text-xs text-[#3987FF] font-semibold">Inspect →</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
