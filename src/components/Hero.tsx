import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Box, Mail, ExternalLink, Sparkles, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { LinkedinIcon } from './icons/LinkedinIcon';
import { CadViewer3D } from './CadViewer3D';
import { CAD_PROJECTS } from '../data/projects';

export const Hero: React.FC = () => {
  const [activeHeroTab, setActiveHeroTab] = useState<'3d' | 'elbow' | 'engine'>('3d');
  const featuredElbow = CAD_PROJECTS.find((p) => p.id === 'elbow-engine-assembly');
  const featuredEngine = CAD_PROJECTS.find((p) => p.id === '4-cylinder-engine-assembly');

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center overflow-hidden bg-blueprint-dense">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#3987FF]/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#00D2FF]/5 blur-[120px] pointer-events-none rounded-full" />

      {/* Engineering Blueprint Corner Markers */}
      <div className="absolute top-24 left-6 hidden lg:flex flex-col space-y-1 font-mono text-[10px] text-[#A3ACB9]/40 pointer-events-none">
        <span>COORD: LAT 13.0827° N / LON 80.2707° E</span>
        <span>PROJ_SYSTEM: MECHANICAL_ISO_128</span>
        <span>WORKSPACE: SOLIDWORKS // CATIA V5 GSD</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Typography & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            {/* Professional Verified Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#111720] border border-[#3987FF]/30 text-xs font-mono mb-6 shadow-lg shadow-black/40">
              <span className="w-2 h-2 rounded-full bg-[#3987FF] animate-pulse"></span>
              <span className="text-[#F5F7FA] font-medium tracking-wider uppercase text-[11px]">
                CAD DESIGNER | 3D MODELLING | MECHANICAL DESIGN
              </span>
            </div>

            {/* Animated Name & Identity Callout */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-2.5 mb-3"
            >
              <div className="h-px w-6 bg-[#3987FF]" />
              <span className="font-mono text-xs sm:text-sm tracking-[0.25em] text-[#CBD5E1] uppercase font-semibold">
                SUNDAR SARAVANAN
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-6"
            >
              ENGINEERING <br />
              <span className="metallic-text">IDEAS INTO</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3987FF] via-[#00D2FF] to-white drop-shadow-[0_0_40px_rgba(57,135,255,0.45)]">
                REALITY.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-[#CBD5E1] font-sans max-w-xl mb-8 leading-relaxed font-medium"
            >
              Precision-driven CAD modelling. Creative product design. Engineering excellence.
            </motion.p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3.5 mb-10 w-full sm:w-auto">
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#3987FF] to-[#1E6BDB] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:brightness-110 shadow-xl shadow-[#3987FF]/30 transition-all flex items-center justify-center space-x-2 group"
              >
                <span>Explore My Work</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="px-6 py-3.5 rounded-xl bg-[#151D2A] text-white border border-[#2C3B52] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#1E293B] hover:border-[#3987FF]/50 transition-all flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>Hire Me</span>
                <Mail className="w-4 h-4 text-[#3987FF]" />
              </a>

              <a
                href="https://www.linkedin.com/in/sundar-saravanan-341223336/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-[#0A66C2]/15 text-[#3987FF] border border-[#0A66C2]/40 font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#0A66C2]/25 transition-all flex items-center justify-center space-x-2"
                title="View Sundar's Official LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span className="hidden sm:inline">LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>

            {/* Key Verified Specs Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#1E293B] w-full">
              <div>
                <span className="font-mono text-xl sm:text-2xl font-bold text-white block">
                  SolidWorks
                </span>
                <span className="text-[11px] font-mono text-[#A3ACB9]">Assemblies & Mates</span>
              </div>
              <div>
                <span className="font-mono text-xl sm:text-2xl font-bold text-white block">
                  CATIA V5
                </span>
                <span className="text-[11px] font-mono text-[#A3ACB9]">Surface Design & GD&T</span>
              </div>
              <div>
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#3987FF] block flex items-center">
                  100%
                </span>
                <span className="text-[11px] font-mono text-[#A3ACB9]">Parametric Fidelity</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive CAD Model / Real Render Tabs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col"
          >
            {/* View Mode Switcher Header */}
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="font-mono text-xs text-[#A3ACB9] flex items-center space-x-1.5">
                <Box className="w-3.5 h-3.5 text-[#3987FF]" />
                <span>INTERACTIVE CAD WORKSTATION</span>
              </span>
              <div className="flex space-x-1 bg-[#111720] p-1 rounded-lg border border-[#1E293B]">
                <button
                  onClick={() => setActiveHeroTab('3d')}
                  className={`px-2.5 py-1 text-[11px] font-mono rounded transition-all ${
                    activeHeroTab === '3d'
                      ? 'bg-[#3987FF] text-white shadow-sm'
                      : 'text-[#A3ACB9] hover:text-white'
                  }`}
                >
                  Interactive 3D
                </button>
                <button
                  onClick={() => setActiveHeroTab('elbow')}
                  className={`px-2.5 py-1 text-[11px] font-mono rounded transition-all ${
                    activeHeroTab === 'elbow'
                      ? 'bg-[#3987FF] text-white shadow-sm'
                      : 'text-[#A3ACB9] hover:text-white'
                  }`}
                >
                  Elbow Engine
                </button>
                <button
                  onClick={() => setActiveHeroTab('engine')}
                  className={`px-2.5 py-1 text-[11px] font-mono rounded transition-all ${
                    activeHeroTab === 'engine'
                      ? 'bg-[#3987FF] text-white shadow-sm'
                      : 'text-[#A3ACB9] hover:text-white'
                  }`}
                >
                  Engine Motion
                </button>
              </div>
            </div>

            {/* Display Viewport */}
            {activeHeroTab === '3d' && (
              <CadViewer3D />
            )}

            {activeHeroTab === 'elbow' && featuredElbow && (
              <div className="relative bg-[#0A0E14] rounded-2xl border border-[#1E293B] overflow-hidden shadow-2xl group">
                <img
                  src={featuredElbow.primaryImage}
                  alt={featuredElbow.title}
                  className="w-full h-[440px] sm:h-[500px] object-contain bg-[#111720]/80 p-2"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#080A0E] via-[#080A0E]/80 to-transparent flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs text-[#3987FF] block">SOLIDWORKS ASSEMBLED VIEW</span>
                    <h3 className="font-display text-sm font-bold text-white">{featuredElbow.title}</h3>
                  </div>
                  <a
                    href="#projects"
                    className="px-3 py-1.5 rounded-lg bg-[#3987FF]/20 border border-[#3987FF]/40 text-xs font-mono text-white hover:bg-[#3987FF] transition-all"
                  >
                    View Details
                  </a>
                </div>
              </div>
            )}

            {activeHeroTab === 'engine' && featuredEngine && (
              <div className="relative bg-[#0A0E14] rounded-2xl border border-[#1E293B] overflow-hidden shadow-2xl group">
                <img
                  src={featuredEngine.primaryImage}
                  alt={featuredEngine.title}
                  className="w-full h-[440px] sm:h-[500px] object-contain bg-[#111720]/80 p-2"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#080A0E] via-[#080A0E]/80 to-transparent flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs text-[#00D2FF] block">SOLIDWORKS MOTION STUDY 3 TIMELINE</span>
                    <h3 className="font-display text-sm font-bold text-white">{featuredEngine.title}</h3>
                  </div>
                  <a
                    href="#projects"
                    className="px-3 py-1.5 rounded-lg bg-[#3987FF]/20 border border-[#3987FF]/40 text-xs font-mono text-white hover:bg-[#3987FF] transition-all"
                  >
                    View Details
                  </a>
                </div>
              </div>
            )}

            {/* CAD Telemetry bar */}
            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#A3ACB9] px-2">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified CAD Assets from Workspace</span>
              </span>
              <span className="text-[#3987FF]">Sundar Saravanan Studio</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="w-full flex justify-center mt-12">
        <a
          href="#about"
          className="flex flex-col items-center space-y-1.5 text-[#A3ACB9] hover:text-[#3987FF] transition-colors font-mono text-[10px] tracking-widest uppercase focus:outline-none"
        >
          <span>Scroll to Explore</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
