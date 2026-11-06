import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, AlertTriangle, Layers, Maximize2, ShieldCheck, Box, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { LinkedinIcon } from './icons/LinkedinIcon';
import { CADProject } from '../data/projects';

interface ProjectModalProps {
  project: CADProject | null;
  onClose: () => void;
  onNextProject?: () => void;
  onPrevProject?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  currentIndex?: number;
  totalProjects?: number;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onNextProject,
  onPrevProject,
  hasPrev = true,
  hasNext = true,
  currentIndex = 0,
  totalProjects = 7,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  // Reset selected image when project changes
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [project?.id]);

  // Keyboard navigation
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowRight' && onNextProject && !isLightboxOpen) {
        onNextProject();
      } else if (e.key === 'ArrowLeft' && onPrevProject && !isLightboxOpen) {
        onPrevProject();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, isLightboxOpen, onNextProject, onPrevProject, onClose]);

  if (!project) return null;

  const currentImage = project.images[selectedImageIndex] || project.primaryImage;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-[#0C121B] border border-[#1E293B] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#111720]/95 backdrop-blur-md border-b border-[#1E293B] shrink-0 select-none">
            <div className="flex items-center space-x-3">
              <span className="font-mono text-xs uppercase px-2.5 py-1 rounded-md bg-[#182333] text-[#3987FF] border border-[#3987FF]/20 font-semibold">
                {project.category}
              </span>

              {project.isLearningExercise ? (
                <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-amber-950/40 text-amber-300 border border-amber-600/30 hidden sm:inline-block">
                  Learning Exercise Benchmark
                </span>
              ) : (
                <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 hidden sm:inline-block">
                  {project.status}
                </span>
              )}

              {project.safetySensitiveFlag && (
                <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-rose-950/50 text-rose-300 border border-rose-500/30 flex items-center space-x-1">
                  <AlertTriangle className="w-3 h-3" />
                  <span>Review Required</span>
                </span>
              )}

              <span className="font-mono text-xs text-[#A3ACB9] hidden md:inline">
                [{currentIndex + 1} of {totalProjects}]
              </span>
            </div>

            {/* Navigation & Close */}
            <div className="flex items-center space-x-2">
              {onPrevProject && (
                <button
                  onClick={onPrevProject}
                  disabled={!hasPrev}
                  className="p-2 rounded-xl bg-[#151D2A] text-[#A3ACB9] hover:text-white hover:bg-[#1E293B] disabled:opacity-40 transition-colors cursor-pointer"
                  title="Previous Project (Left Arrow)"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}

              {onNextProject && (
                <button
                  onClick={onNextProject}
                  disabled={!hasNext}
                  className="p-2 rounded-xl bg-[#151D2A] text-[#A3ACB9] hover:text-white hover:bg-[#1E293B] disabled:opacity-40 transition-colors cursor-pointer"
                  title="Next Project (Right Arrow)"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              <div className="h-4 w-px bg-[#1E293B] mx-1" />

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-[#151D2A] text-[#A3ACB9] hover:text-white hover:bg-[#1E293B] transition-colors cursor-pointer"
                aria-label="Close project modal (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
            {/* Project Title & Short Overview */}
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-[#3987FF] mb-2 uppercase tracking-widest">
                <span>0{currentIndex + 1} // FULL PRESENTATION</span>
                <span>•</span>
                <span>{project.type}</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                {project.title}
              </h2>
              <p className="text-sm sm:text-base text-[#A3ACB9] leading-relaxed font-sans max-w-4xl">
                {project.longDescription}
              </p>
            </div>

            {/* Media Gallery Stage */}
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden border border-[#1E293B] bg-[#070A0F] group flex items-center justify-center min-h-[320px] max-h-[540px]">
                <img
                  src={currentImage}
                  alt={`${project.title} - View ${selectedImageIndex + 1}`}
                  className="w-full max-h-[500px] object-contain p-2 cursor-pointer transition-transform duration-300 group-hover:scale-[1.01]"
                  onClick={() => setIsLightboxOpen(true)}
                />

                {/* Lightbox / Zoom Prompt */}
                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-[#080A0E]/85 backdrop-blur-md text-white border border-[#1E293B] hover:border-[#3987FF] transition-colors shadow-lg"
                  title="View full-size image"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                <div className="absolute top-4 left-4 font-mono text-[11px] text-[#A3ACB9] bg-[#080A0E]/85 px-3 py-1 rounded-md backdrop-blur-md border border-[#1E293B]">
                  View {selectedImageIndex + 1} of {project.images.length}
                </div>
              </div>

              {/* Multi-view Thumbnails selector */}
              {project.images.length > 1 && (
                <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                  {project.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-24 h-16 sm:w-28 sm:h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all bg-[#0A0E14] cursor-pointer ${
                        selectedImageIndex === idx
                          ? 'border-[#3987FF] shadow-lg shadow-[#3987FF]/30 scale-102'
                          : 'border-[#1E293B] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain p-1" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Specifications & Verified CAD Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 border-t border-[#1E293B]">
              {/* Left Column: Design Observations & Analysis */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-white font-bold mb-3 flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3987FF]" />
                    <span>Verified CAD Observations & Design Features</span>
                  </h3>
                  <ul className="space-y-2.5">
                    {project.designObservations.map((obs, i) => (
                      <li key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#A3ACB9] leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3987FF] shrink-0 mt-2" />
                        <span>{obs}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {project.componentsList && project.componentsList.length > 0 && (
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-wider text-white font-bold mb-3 flex items-center space-x-2">
                      <Layers className="w-4 h-4 text-[#00D2FF]" />
                      <span>Components & Hierarchy Breakdown</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.componentsList.map((comp, i) => (
                        <span
                          key={i}
                          className="font-mono text-xs bg-[#111720] text-[#CBD5E1] px-3 py-1.5 rounded-lg border border-[#1E293B]"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Engineering Metadata Box */}
              <div className="md:col-span-5 space-y-4">
                <div className="p-6 rounded-2xl bg-[#111720] border border-[#1E293B] space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-white font-bold pb-2 border-b border-[#1E293B]">
                    Project Specifications
                  </h3>

                  <div>
                    <span className="font-mono text-[11px] text-[#A3ACB9] block">Verified CAD Software</span>
                    <div className="flex items-center space-x-2 mt-1">
                      {project.software.map((sw) => (
                        <span key={sw} className="font-mono text-xs bg-[#1E293B] text-white px-3 py-1 rounded font-semibold border border-[#3987FF]/30">
                          {sw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-[11px] text-[#A3ACB9] block">Modelling Category</span>
                    <span className="font-mono text-xs text-white">{project.type}</span>
                  </div>

                  <div>
                    <span className="font-mono text-[11px] text-[#A3ACB9] block">Available Projections</span>
                    <ul className="mt-1 space-y-1">
                      {project.viewsAvailable.map((v, i) => (
                        <li key={i} className="text-[11px] font-mono text-[#CBD5E1]">
                          • {v}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-mono text-[11px] text-[#A3ACB9] block">Approval & Status</span>
                    <span className="font-mono text-xs text-[#00D2FF]">{project.approvalStatus}</span>
                  </div>
                </div>

                {/* LinkedIn Action Box */}
                <div className="p-6 rounded-2xl bg-[#0A66C2]/10 border border-[#0A66C2]/30 space-y-3">
                  <div className="flex items-center space-x-2 text-[#0A66C2]">
                    <LinkedinIcon className="w-5 h-5" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                      Original LinkedIn Post Link
                    </span>
                  </div>
                  <p className="text-xs text-[#A3ACB9] font-sans">
                    View this exact mechanical design and Sundar Saravanan's professional network updates on LinkedIn.
                  </p>
                  <a
                    href={project.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#0A66C2] text-white font-mono text-xs font-semibold hover:bg-[#084e96] transition-colors flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <span>View Original Post on LinkedIn</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fullscreen Lightbox */}
        {isLightboxOpen && (
          <div
            className="fixed inset-0 z-60 bg-black/98 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={currentImage}
              alt="Fullscreen CAD preview"
              className="max-w-[95vw] max-h-[95vh] object-contain rounded-lg"
            />
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};
