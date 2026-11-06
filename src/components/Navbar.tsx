import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Cpu } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'LinkedIn', href: '#linkedin' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080A0E]/90 backdrop-blur-xl border-b border-[#1E293B]/80 py-3 shadow-2xl shadow-black/50'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-[#3987FF] rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E293B] to-[#111720] border border-[#3987FF]/30 flex items-center justify-center group-hover:border-[#3987FF] transition-all shadow-lg group-hover:shadow-[#3987FF]/20">
              <span className="font-display font-bold text-sm tracking-tighter text-[#3987FF]">
                SS
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-base tracking-wider text-white group-hover:text-[#3987FF] transition-colors">
                SUNDAR SARAVANAN
              </span>
              <span className="font-mono text-[10px] tracking-widest text-[#A3ACB9] flex items-center space-x-1">
                <span>CAD DESIGNER</span>
                <span className="text-[#3987FF]">•</span>
                <span>PRODUCT DESIGN</span>
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-[#111720]/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#1E293B]">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-[#3987FF] text-white shadow-md shadow-[#3987FF]/30 font-semibold'
                      : 'text-[#A3ACB9] hover:text-white hover:bg-[#1E293B]/60'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center space-x-3">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#3987FF] to-[#1E6BDB] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:brightness-110 shadow-lg shadow-[#3987FF]/25 transition-all group hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-[#111720] border border-[#1E293B] text-[#A3ACB9] hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0E14]/98 backdrop-blur-2xl border-b border-[#1E293B] px-6 py-6 transition-all animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl font-mono text-sm uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'bg-[#3987FF] text-white font-semibold'
                      : 'text-[#A3ACB9] hover:text-white hover:bg-[#151D2A]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="pt-3 border-t border-[#1E293B]">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-[#3987FF] text-white font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-[#3987FF]/20"
              >
                <span>START A PROJECT</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

