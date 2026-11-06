import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, PenTool, Cpu, Settings2, Sparkles, CheckCircle2, Compass } from 'lucide-react';

export const DesignProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      num: '01',
      title: 'Understanding the Concept',
      phase: 'Requirement Analysis & Bounding Box',
      desc: 'Deconstructing mechanical requirements, customer design briefs, functional kinematics, envelope dimensions, and manufacturing constraints.',
      icon: <Lightbulb className="w-5 h-5 text-[#3987FF]" />,
      deliverable: 'Design specification & baseline packaging envelope'
    },
    {
      num: '02',
      title: 'Initial Modelling & Wireframe',
      phase: 'Parametric Skeleton & Reference Geometry',
      desc: 'Establishing primary coordinate systems, reference planes, master sketches, and 3D guide curves to define functional proportions without clutter.',
      icon: <PenTool className="w-5 h-5 text-[#00D2FF]" />,
      deliverable: 'Constrained 2D/3D wireframe sketches & datum framework'
    },
    {
      num: '03',
      title: 'CAD Development & Solid/Surface Generation',
      phase: 'Parametric Feature Tree Construction',
      desc: 'Building solid parametric features, complex lofts, swept surfaces, wall thicknesses, draft angles, and standard mounting interfaces in SolidWorks or CATIA V5.',
      icon: <Cpu className="w-5 h-5 text-[#3987FF]" />,
      deliverable: 'Feature-based native 3D CAD part models (.SLDPRT, .CATPart)'
    },
    {
      num: '04',
      title: 'Assembly and Refinement',
      phase: 'Kinematic Mates & Clearance Checks',
      desc: 'Integrating multi-part assemblies with mechanical mates (concentric, distance, gear, limit mates), verifying collision clearance and motion study cycles.',
      icon: <Settings2 className="w-5 h-5 text-[#00D2FF]" />,
      deliverable: 'Master assembly model (.SLDASM, .CATProduct) with interference report'
    },
    {
      num: '05',
      title: 'Final Visualization & Technical Drafting',
      phase: 'GD&T Documentation & Rendering',
      desc: 'Producing production-ready 2D technical drawings with full GD&T tolerances, exploded axial views with BOM tables, and metallic shaded presentation renders.',
      icon: <Sparkles className="w-5 h-5 text-[#3987FF]" />,
      deliverable: 'High-res manufacturing PDF drawings & presentation render suite'
    }
  ];

  return (
    <section className="py-24 bg-[#080A0E] relative border-t border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#111720] border border-[#3987FF]/30 text-xs font-mono text-[#3987FF] uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>05 // METHODOLOGY & WORKFLOW</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
            FROM CONCEPT TO <span className="text-[#3987FF]">CREATION</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A3ACB9] font-sans">
            A disciplined engineering design pipeline ensuring precision from early concept sketches to manufacturing-ready CAD documentation.
          </p>
        </div>

        {/* Process Stepper Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
          {steps.map((step, idx) => (
            <button
              key={step.num}
              onClick={() => setActiveStep(idx)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                activeStep === idx
                  ? 'bg-[#151D2A] border-[#3987FF] shadow-lg shadow-[#3987FF]/20'
                  : 'bg-[#111720]/80 border-[#1E293B] hover:border-[#2C3B52]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`font-mono text-sm font-bold ${activeStep === idx ? 'text-[#3987FF]' : 'text-[#A3ACB9]'}`}>
                  {step.num}
                </span>
                {step.icon}
              </div>
              <span className="font-display text-xs font-semibold text-white block line-clamp-1">
                {step.title}
              </span>
            </button>
          ))}
        </div>

        {/* Active Step Detailed Card */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="p-8 rounded-2xl bg-[#111720] border border-[#1E293B] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 font-mono text-8xl font-black text-white/[0.03] pointer-events-none select-none">
            {steps[activeStep].num}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            <div className="md:col-span-8 space-y-4">
              <span className="font-mono text-xs text-[#3987FF] uppercase tracking-widest block">
                STAGE {steps[activeStep].num} // {steps[activeStep].phase}
              </span>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                {steps[activeStep].title}
              </h3>

              <p className="text-sm sm:text-base text-[#A3ACB9] leading-relaxed font-sans max-w-2xl">
                {steps[activeStep].desc}
              </p>
            </div>

            <div className="md:col-span-4 p-5 rounded-xl bg-[#151D2A] border border-[#1E293B] space-y-2">
              <span className="font-mono text-[11px] text-[#A3ACB9] uppercase tracking-wider block">
                Deliverable at this stage:
              </span>
              <p className="font-mono text-xs text-white flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#3987FF] shrink-0 mt-0.5" />
                <span>{steps[activeStep].deliverable}</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

