import React from 'react';
import { ArrowUp, Mail, Phone, ExternalLink, ShieldCheck, Cpu } from 'lucide-react';
import { LinkedinIcon } from './icons/LinkedinIcon';
import { VERIFIED_PROFILE } from '../data/projects';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'LinkedIn', href: '#linkedin' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#05070A] border-t border-[#1E293B] pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#1E293B]">
          {/* Brand Identity */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#111720] border border-[#3987FF]/40 flex items-center justify-center">
                <span className="font-display font-bold text-sm text-[#3987FF]">SS</span>
              </div>
              <div>
                <span className="font-display font-bold text-base tracking-wider text-white block">
                  SUNDAR SARAVANAN
                </span>
                <span className="font-mono text-[10px] tracking-widest text-[#A3ACB9]">
                  CAD DESIGNER & PRODUCT DESIGN
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#A3ACB9] max-w-sm leading-relaxed font-sans">
              Precision-driven CAD modelling, kinematic mechanism assemblies, and GD&T technical drafting in SolidWorks & CATIA V5.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href={VERIFIED_PROFILE.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#111720] border border-[#1E293B] text-[#A3ACB9] hover:text-[#0A66C2] hover:border-[#0A66C2] transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${VERIFIED_PROFILE.emailPlaceholder}`}
                className="p-2.5 rounded-xl bg-[#111720] border border-[#1E293B] text-[#A3ACB9] hover:text-[#3987FF] hover:border-[#3987FF] transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/917604888467"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#111720] border border-[#1E293B] text-[#A3ACB9] hover:text-emerald-400 hover:border-emerald-400 transition-colors"
                title="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-xs text-white font-bold uppercase tracking-wider block">
              Navigation
            </span>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-mono text-xs text-[#A3ACB9] hover:text-[#3987FF] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Engineering Disciplines & Contact */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-mono text-xs text-white font-bold uppercase tracking-wider block">
              Verified CAD Capabilities
            </span>
            <div className="flex flex-wrap gap-1.5">
              <span className="font-mono text-[11px] bg-[#111720] text-[#CBD5E1] px-2.5 py-1 rounded border border-[#1E293B]">
                SolidWorks Assemblies
              </span>
              <span className="font-mono text-[11px] bg-[#111720] text-[#CBD5E1] px-2.5 py-1 rounded border border-[#1E293B]">
                CATIA V5 Surface (GSD)
              </span>
              <span className="font-mono text-[11px] bg-[#111720] text-[#CBD5E1] px-2.5 py-1 rounded border border-[#1E293B]">
                GD&T 2D Technical Drafting
              </span>
              <span className="font-mono text-[11px] bg-[#111720] text-[#CBD5E1] px-2.5 py-1 rounded border border-[#1E293B]">
                Kinematic Motion Studies
              </span>
              <span className="font-mono text-[11px] bg-[#111720] text-[#CBD5E1] px-2.5 py-1 rounded border border-[#1E293B]">
                Exploded Views & BOM
              </span>
            </div>

            <div className="pt-2 font-mono text-xs text-[#A3ACB9] space-y-1">
              <span className="block text-white font-semibold mb-1">Direct Contact:</span>
              <a href="mailto:sundarcovai02@gmail.com" className="block text-[#3987FF] hover:underline">
                sundarcovai02@gmail.com
              </a>
              <a href="tel:+917604888467" className="block text-[#CBD5E1] hover:text-[#3987FF] transition-colors">
                +91 7604 888 467
              </a>
              <span className="block text-[#A3ACB9] text-[11px]">{VERIFIED_PROFILE.location}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Back to Top Button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-[#64748B]">
            © {new Date().getFullYear()} Sundar Saravanan. All rights reserved. Engineering CAD Portfolio.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#111720] border border-[#1E293B] text-xs font-mono text-[#A3ACB9] hover:text-white hover:border-[#3987FF] transition-all cursor-pointer group"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#3987FF] group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
