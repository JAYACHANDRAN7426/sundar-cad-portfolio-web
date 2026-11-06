import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

export interface ServiceDetail {
  id: string;
  title: string;
  category: string;
  description: string;
  deliverables: string[];
  softwareUsed: string[];
  workflow: string[];
  applicableProjects: string[];
}

interface ServiceModalProps {
  service: ServiceDetail | null;
  onClose: () => void;
  onSelectServiceForContact: (title: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onSelectServiceForContact }) => {
  if (!service) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-[#0F1622] border border-[#1E293B] rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-[#151D2A] text-[#A3ACB9] hover:text-white hover:bg-[#1E293B] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-[#111720] border border-[#3987FF]/30 text-xs font-mono text-[#3987FF] mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>{service.category}</span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
            {service.title}
          </h3>

          <p className="text-sm sm:text-base text-[#A3ACB9] leading-relaxed mb-6">
            {service.description}
          </p>

          {/* Deliverables */}
          <div className="mb-6">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#3987FF]" />
              <span>Standard Engineering Deliverables</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-[#CBD5E1] bg-[#151D2A] p-2.5 rounded-lg border border-[#1E293B]">
                  <CheckCircle2 className="w-4 h-4 text-[#3987FF] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Workflow Steps */}
          <div className="mb-6">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-2">
              Execution Process
            </h4>
            <div className="flex flex-col space-y-2">
              {service.workflow.map((step, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-xs text-[#A3ACB9]">
                  <span className="font-mono font-bold text-[#3987FF] w-6 shrink-0">0{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Software & Action */}
          <div className="pt-6 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs text-[#A3ACB9]">Verified Tools:</span>
              {service.softwareUsed.map((sw) => (
                <span key={sw} className="font-mono text-xs bg-[#1E293B] text-white px-2.5 py-1 rounded">
                  {sw}
                </span>
              ))}
            </div>

            <button
              onClick={() => {
                onSelectServiceForContact(service.title);
                onClose();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#3987FF] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:brightness-110 flex items-center justify-center space-x-2 shadow-lg shadow-[#3987FF]/25"
            >
              <span>Enquire About This Service</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

