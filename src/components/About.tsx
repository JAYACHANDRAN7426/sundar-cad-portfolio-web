import React from 'react';
import { motion } from 'framer-motion';
import { VERIFIED_PROFILE } from '../data/projects';
import { Award, Compass, Layers, ShieldCheck, GraduationCap, CheckCircle, ExternalLink } from 'lucide-react';
import { LinkedinIcon } from './icons/LinkedinIcon';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#080A0E] relative border-t border-[#1E293B]">
      {/* Decorative technical watermark */}
      <div className="absolute right-4 top-12 font-mono text-[90px] font-black text-white/[0.015] select-none pointer-events-none hidden xl:block">
        CAD STUDIO
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#111720] border border-[#3987FF]/30 text-xs font-mono text-[#3987FF] uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>01 // PROFESSIONAL BACKGROUND</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            DESIGNING WITH PRECISION. <br />
            <span className="text-[#3987FF]">THINKING BEYOND LIMITS.</span>
          </h2>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Profile Media & Verified Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col space-y-6"
          >
            {/* Profile Image with Engineering Frame */}
            <div className="relative group">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#1E293B] group-hover:border-[#3987FF]/60 transition-all shadow-2xl bg-[#111720]">
                <img
                  src={VERIFIED_PROFILE.avatar}
                  alt={VERIFIED_PROFILE.name}
                  className="w-full h-[400px] sm:h-[460px] object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />

                {/* Corner Technical Bracket Accents */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#3987FF]"></div>
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#3987FF]"></div>
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#3987FF]"></div>
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#3987FF]"></div>

                {/* Floating Profile Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#080A0E]/90 backdrop-blur-md p-4 rounded-xl border border-[#1E293B]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">{VERIFIED_PROFILE.name}</h3>
                      <p className="font-mono text-xs text-[#3987FF]">{VERIFIED_PROFILE.headline}</p>
                    </div>
                    <a
                      href={VERIFIED_PROFILE.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-[#0A66C2] text-white hover:bg-[#0A66C2]/80 transition-colors"
                      title="LinkedIn Profile"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* LinkedIn Banner Highlight */}
            <div className="rounded-xl overflow-hidden border border-[#1E293B] bg-[#111720] p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] text-[#A3ACB9] uppercase tracking-wider">Engineering Draftsmanship</span>
                <span className="font-mono text-[10px] text-[#3987FF]">VERIFIED BLUEPRINT</span>
              </div>
              <img
                src={VERIFIED_PROFILE.banner}
                alt="Technical Drawing Banner"
                className="w-full h-24 object-cover rounded-lg border border-[#1E293B]/60"
              />
            </div>
          </motion.div>

          {/* Right Column: Bio, Skills & Verified Curriculum */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col space-y-8"
          >
            {/* Biography Narrative */}
            <div className="space-y-4 text-[#A3ACB9] text-base leading-relaxed font-sans">
              {VERIFIED_PROFILE.bio.map((paragraph, idx) => (
                <p key={idx} className={idx === 0 ? "text-lg text-[#F5F7FA] font-medium" : ""}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Core Software Specializations */}
            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold text-white flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-[#3987FF]" />
                <span>Verified CAD Software Specialization</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {VERIFIED_PROFILE.softwareSkills.map((software) => (
                  <div
                    key={software.name}
                    className="p-5 rounded-xl bg-[#111720] border border-[#1E293B] hover:border-[#3987FF]/50 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-display text-base font-bold text-white group-hover:text-[#3987FF] transition-colors">
                          {software.name}
                        </h4>
                        <span className="text-[10px] font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
                          VERIFIED
                        </span>
                      </div>
                      <p className="text-xs text-[#A3ACB9] mb-4 leading-relaxed font-sans">
                        {software.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#1E293B]/80 flex flex-wrap gap-1.5">
                      {software.modules.map((mod) => (
                        <span
                          key={mod}
                          className="font-mono text-[10px] bg-[#151D2A] text-[#CBD5E1] px-2 py-0.5 rounded border border-[#1E293B]"
                        >
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Technical Background */}
            <div className="p-5 rounded-xl bg-[#111720] border border-[#1E293B]">
              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-lg bg-[#3987FF]/15 text-[#3987FF]">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-display text-base font-bold text-white mb-1">
                    {VERIFIED_PROFILE.education.degree}
                  </h4>
                  <p className="text-xs font-mono text-[#3987FF] mb-3">
                    {VERIFIED_PROFILE.education.status}
                  </p>
                  <ul className="space-y-1.5">
                    {VERIFIED_PROFILE.education.highlights.map((h, i) => (
                      <li key={i} className="flex items-center space-x-2 text-xs text-[#A3ACB9]">
                        <CheckCircle className="w-3.5 h-3.5 text-[#3987FF] shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Engineering Principles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {VERIFIED_PROFILE.designPhilosophy.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-[#0E141D] border border-[#1E293B]/70 hover:border-[#3987FF]/30 transition-colors"
                >
                  <span className="font-mono text-xs font-semibold text-white block mb-1">
                    {item.title}
                  </span>
                  <p className="text-xs text-[#A3ACB9] font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
