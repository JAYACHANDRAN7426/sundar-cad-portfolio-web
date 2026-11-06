import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, Box, Cpu, FileSpreadsheet, Compass } from 'lucide-react';
import { VERIFIED_PROFILE } from '../data/projects';

export const SkillsDashboard: React.FC = () => {
  const verifiedSoftware = [
    {
      name: "SolidWorks",
      category: "Parametric Mechanical CAD",
      status: "Verified in Project Portfolio",
      modules: [
        "FeatureManager 3D Part Design",
        "Multi-Component Assembly & Mates",
        "Motion Study & Kinematic Rotary Motors",
        "Axial Exploded Views & BOM",
        "Display States & Visual Styles"
      ],
      evidence: "Demonstrated in Water Control Ball Valve assembly, 4-Cylinder Reciprocating Engine simulation, and Elbow Engine model."
    },
    {
      name: "CATIA V5",
      category: "Advanced Surface & Industrial Design",
      status: "Verified in Project Portfolio",
      modules: [
        "Generative Shape Design (GSD)",
        "Lofted & Helical Surface Generation",
        "Generative Drafting & GD&T Standard Sheets",
        "Mechanical Part Design & Flanged Bodies",
        "Multi-View Orthographic Layouts"
      ],
      evidence: "Demonstrated in Spacecraft Landing Module concept, Tennis Racket surface loft, and standard Exercise engineering drawings."
    }
  ];

  const engineeringCompetencies = [
    { name: "Parametric Sketch Constraints", level: "Complete Definition (No Under-Defined Geometry)" },
    { name: "GD&T Tolerancing Standards", level: "ISO 128 / ASME Y14.5 Drawing Conventions" },
    { name: "Multi-View Projections", level: "1st & 3rd Angle Orthographic Suite" },
    { name: "Kinematic Assembly Mates", level: "Concentric, Coincident, Distance & Limits" },
    { name: "Exploded View Disassembly", level: "Axial Path Trajectories & BOM Integration" },
    { name: "Surface Curvature Continuity", level: "G1 / G2 Tangent & Curvature Matching" },
    { name: "Motion Simulation Analysis", level: "Rotary Motor Velocity & Stroke Verification" },
    { name: "Neutral Multi-CAD Formats", level: "STEP AP214 / AP242, IGES, STL, DXF" }
  ];

  return (
    <section className="py-24 bg-[#0A0E14] relative border-t border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#111720] border border-[#3987FF]/30 text-xs font-mono text-[#3987FF] uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>06 // TECHNICAL COMPETENCIES</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              SKILLS & VERIFIED SOFTWARE
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#A3ACB9] max-w-md mt-4 md:mt-0 font-sans">
            Strictly displaying verified CAD software and engineering tools backed by visual proof in Sundar's design archive.
          </p>
        </div>

        {/* Software Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {verifiedSoftware.map((sw, idx) => (
            <motion.div
              key={sw.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-[#111720] border border-[#1E293B] hover:border-[#3987FF]/50 transition-all flex flex-col justify-between shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Cpu className="w-32 h-32 text-[#3987FF]" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-[#151D2A] border border-[#3987FF]/30 flex items-center justify-center text-[#3987FF]">
                      <Box className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-white">{sw.name}</h3>
                      <span className="font-mono text-xs text-[#A3ACB9]">{sw.category}</span>
                    </div>
                  </div>

                  <span className="font-mono text-[10px] bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>VERIFIED</span>
                  </span>
                </div>

                <div className="mb-6">
                  <span className="font-mono text-[11px] text-[#A3ACB9] uppercase tracking-wider block mb-2.5">
                    Core Functional Modules:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {sw.modules.map((m) => (
                      <span
                        key={m}
                        className="font-mono text-xs bg-[#151D2A] text-[#CBD5E1] px-3 py-1.5 rounded-lg border border-[#1E293B]"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1E293B] font-sans text-xs text-[#A3ACB9] leading-relaxed">
                <span className="font-mono text-[11px] text-[#3987FF] font-semibold block mb-1">Portfolio Evidence:</span>
                {sw.evidence}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Engineering Standards & Competencies Dashboard */}
        <div className="p-8 rounded-2xl bg-[#111720] border border-[#1E293B]">
          <h3 className="font-display text-lg font-bold text-white mb-6 flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-[#3987FF]" />
            <span>Engineering Discipline & Technical Standards</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {engineeringCompetencies.map((comp, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#0E141D] border border-[#1E293B]/70 hover:border-[#3987FF]/40 transition-colors"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#3987FF] mb-2" />
                <h4 className="font-display text-xs font-bold text-white mb-1">
                  {comp.name}
                </h4>
                <p className="font-mono text-[11px] text-[#A3ACB9] leading-tight">
                  {comp.level}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

