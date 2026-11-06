import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, FastForward } from 'lucide-react';

interface CinematicLoaderProps {
  onComplete: () => void;
}

export const CinematicLoader: React.FC<CinematicLoaderProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 400);   // Grid lines
    const timer2 = setTimeout(() => setStep(2), 1000);  // Technical geometry
    const timer3 = setTimeout(() => setStep(3), 1600);  // Name & Title reveal
    const timer4 = setTimeout(() => {
      onComplete();
    }, 2800);                                           // Transition into homepage

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#080A0E] overflow-hidden select-none"
    >
      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="absolute top-6 right-6 z-20 flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#111720]/80 border border-[#1E293B] text-xs font-mono text-[#A3ACB9] hover:text-white hover:border-[#3987FF] transition-all cursor-pointer group"
      >
        <span>SKIP INTRO</span>
        <FastForward className="w-3.5 h-3.5 text-[#3987FF] group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Grid Lines Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 1 ? 0.35 : 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-blueprint-dense pointer-events-none"
      />

      {/* Crosshair coordinate markers */}
      <div className="absolute top-8 left-8 font-mono text-[11px] text-[#3987FF]/60 flex items-center space-x-2">
        <span className="inline-block w-2 h-2 border border-[#3987FF]/80"></span>
        <span>SYS.CAD_INITIALIZE // 2026</span>
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-[11px] text-[#A3ACB9]/50">
        SOLIDWORKS & CATIA V5 WORKSPACE
      </div>

      {/* Center Cinematic Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl">
        {/* Animated Technical SVG Blueprint Reticle */}
        <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            {/* Outer Rotating Compass Ring */}
            <motion.circle
              cx="50"
              cy="50"
              r="44"
              stroke="#1E293B"
              strokeWidth="1.5"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="44"
              stroke="#3987FF"
              strokeWidth="2"
              strokeDasharray="280"
              initial={{ strokeDashoffset: 280 }}
              animate={{ strokeDashoffset: step >= 2 ? 0 : 180 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
            {/* Inner Precision Crosshair */}
            <motion.path
              d="M50 15 V85 M15 50 H85"
              stroke="#3987FF"
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ opacity: 0 }}
              animate={{ opacity: step >= 2 ? 0.8 : 0 }}
              transition={{ duration: 0.5 }}
            />
            {/* Technical polygon */}
            <motion.polygon
              points="50,26 71,38 71,62 50,74 29,62 29,38"
              stroke="#00D2FF"
              strokeWidth="1.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: step >= 2 ? 1 : 0, opacity: step >= 2 ? 1 : 0 }}
              transition={{ duration: 0.6 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Compass className="w-8 h-8 text-[#3987FF] animate-pulse" />
          </div>
        </div>

        {/* Text Sequence */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <span className="font-mono text-xs tracking-[0.3em] text-[#3987FF] uppercase mb-2">
                Digital Engineering Studio
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
                SUNDAR SARAVANAN
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-3 mt-1"
            >
              <div className="h-px w-8 bg-[#3987FF]/50" />
              <span className="font-mono text-xs sm:text-sm text-[#A3ACB9] tracking-widest uppercase">
                CAD DESIGNER / PRODUCT DESIGN
              </span>
              <div className="h-px w-8 bg-[#3987FF]/50" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-[#151D2A] rounded-full mt-8 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#3987FF] to-[#00D2FF]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.6, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

