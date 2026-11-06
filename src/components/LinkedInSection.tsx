import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, UserPlus, CheckCircle2, MessageSquare, ThumbsUp, Share2, Compass, Award, Sparkles } from 'lucide-react';
import { LinkedinIcon } from './icons/LinkedinIcon';
import { VERIFIED_PROFILE } from '../data/projects';

export const LinkedInSection: React.FC = () => {
  // Curated professional LinkedIn engineering discussions & activity previews
  const linkedInDiscussions = [
    {
      id: 'discussion-kinematics',
      headline: 'Kinematic Powertrain Simulation & Rotary Motion Studies in SolidWorks',
      date: 'Published on LinkedIn',
      discussion: 'Shared a detailed analysis on setting up multi-throw crankshaft assemblies and verifying piston top-dead-center travel in SolidWorks Motion Study. Discussed kinematic mate constraint techniques, preventing redundant degree-of-freedom locks, and dynamic counterbalancing.',
      tags: ['#SolidWorks', '#MotionStudy', '#Kinematics', '#MechanicalDesign'],
      engagement: 'Active Engineering Discussion',
      url: 'https://www.linkedin.com/in/sundar-saravanan-341223336/',
    },
    {
      id: 'discussion-surface',
      headline: 'Class-A Generative Shape Design (GSD) & Curvature Continuity in CATIA V5',
      date: 'Published on LinkedIn',
      discussion: 'Published an overview of G2 curvature-continuous lofting workflows in CATIA V5. Focused on transitional surface blending across complex ergonomic consumer products, highlight flow lines, and neutral CAD file translation to manufacturing tooling.',
      tags: ['#CATIAV5', '#SurfaceModelling', '#GSD', '#IndustrialDesign'],
      engagement: 'Industry Peer Review',
      url: 'https://www.linkedin.com/in/sundar-saravanan-341223336/',
    },
    {
      id: 'discussion-gdt',
      headline: 'Production Drafting & ASME Y14.5 GD&T Standards for Machine Assemblies',
      date: 'Published on LinkedIn',
      discussion: 'Examined standard orthographic drawing sheet generation from 3D parametric models. Covered unambiguous datum reference frames (DRF), runout tolerancing, and concentricity verification to eliminate machining discrepancies on factory floors.',
      tags: ['#GDandT', '#TechnicalDrafting', '#ISOStandards', '#ManufacturingCAD'],
      engagement: 'Standards & Best Practices',
      url: 'https://www.linkedin.com/in/sundar-saravanan-341223336/',
    },
  ];

  return (
    <section id="linkedin" className="py-24 bg-[#080A0E] relative border-t border-[#1E293B] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#0A66C2]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#0A66C2]/15 border border-[#0A66C2]/30 text-xs font-mono text-[#0A66C2] uppercase tracking-wider mb-3">
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>04 // PROFESSIONAL NETWORK</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              CONNECT ON <span className="text-[#3987FF]">LINKEDIN.</span>
            </h2>
          </div>

          <div className="mt-4 lg:mt-0 flex items-center space-x-3">
            <a
              href="https://www.linkedin.com/in/sundar-saravanan-341223336/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-[#0A66C2] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#084e96] transition-all flex items-center space-x-2 shadow-lg shadow-[#0A66C2]/30"
            >
              <UserPlus className="w-4 h-4" />
              <span>Connect with Sundar</span>
            </a>
          </div>
        </div>

        {/* Profile Card Banner */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-[#111720] border border-[#1E293B] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0A66C2]/10 blur-3xl pointer-events-none rounded-full" />
          <div className="flex items-center space-x-5 relative z-10">
            <div className="relative">
              <img
                src={VERIFIED_PROFILE.avatar}
                alt={VERIFIED_PROFILE.name}
                className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#3987FF]"
              />
              <div className="absolute -bottom-1 -right-1 p-1 bg-[#0A66C2] rounded-full text-white">
                <LinkedinIcon className="w-3.5 h-3.5" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-display text-xl font-bold text-white">{VERIFIED_PROFILE.name}</h3>
                <CheckCircle2 className="w-4 h-4 text-[#3987FF]" />
              </div>
              <p className="text-xs sm:text-sm font-mono text-[#A3ACB9]">{VERIFIED_PROFILE.headline}</p>
              <span className="text-xs font-mono text-[#3987FF] block mt-1">
                linkedin.com/in/sundar-saravanan-341223336
              </span>
            </div>
          </div>

          <a
            href="https://www.linkedin.com/in/sundar-saravanan-341223336/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-[#151D2A] text-white hover:bg-[#1E293B] border border-[#1E293B] hover:border-[#0A66C2] font-mono text-xs flex items-center space-x-2 transition-all relative z-10"
          >
            <span>Visit Full Profile</span>
            <ExternalLink className="w-4 h-4 text-[#3987FF]" />
          </a>
        </div>

        {/* Professional Activity & Insights (3 Distinct Discussion Cards, NOT duplicate projects) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {linkedInDiscussions.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="rounded-3xl bg-[#111720] border border-[#1E293B] hover:border-[#0A66C2]/70 p-6 shadow-xl hover:shadow-2xl hover:shadow-[#0A66C2]/15 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1E293B]">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#0A66C2]/20 border border-[#0A66C2]/40 flex items-center justify-center text-[#0A66C2]">
                      <LinkedinIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-white font-bold block">
                        Sundar Saravanan
                      </span>
                      <span className="text-[10px] font-mono text-[#64748B] block">
                        {item.date}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#00D2FF] bg-[#00D2FF]/10 px-2 py-0.5 rounded border border-[#00D2FF]/20">
                    {item.engagement}
                  </span>
                </div>

                {/* Content */}
                <h4 className="font-display text-sm font-bold text-white mb-3 group-hover:text-[#3987FF] transition-colors leading-snug">
                  "{item.headline}"
                </h4>
                <p className="text-xs text-[#A3ACB9] leading-relaxed font-sans mb-4">
                  {item.discussion}
                </p>

                {/* Hashtags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {item.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[10px] text-[#3987FF]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#CBD5E1]">
                  Connect on LinkedIn
                </span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 font-mono text-xs text-[#0A66C2] hover:text-[#3987FF] transition-colors font-semibold"
                >
                  <span>Read on LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
