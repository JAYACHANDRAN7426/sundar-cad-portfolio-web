import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, FileText, Settings, Layers, PlayCircle, Eye, Wrench, ArrowUpRight, Compass } from 'lucide-react';
import { ServiceModal, ServiceDetail } from './ServiceModal';

interface ServicesProps {
  onSelectServiceForContact: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForContact }) => {
  const [activeModalService, setActiveModalService] = useState<ServiceDetail | null>(null);

  const servicesList: (ServiceDetail & { icon: React.ReactNode })[] = [
    {
      id: "3d-cad-modelling",
      title: "3D CAD Modelling & Part Design",
      category: "Solid Modelling",
      description: "Fully parametric 3D solid part modeling built with clean feature trees, robust sketch constraints, and precise manufacturing intent.",
      icon: <Box className="w-6 h-6 text-[#3987FF]" />,
      softwareUsed: ["SolidWorks", "CATIA V5"],
      deliverables: [
        "Native CAD files (.SLDPRT, .CATPart)",
        "Standard neutral exchange formats (.STEP, .IGES, .STL)",
        "Fully constrained parametric sketches & feature trees",
        "Design revision histories & design variations"
      ],
      workflow: [
        "Review concept sketches, design briefs, or physical sample dimensions",
        "Construct primary reference datums and fundamental solid extrusions",
        "Apply engineering fillets, draft angles, ribs, and thread geometry",
        "Export multi-CAD neutral formats for machining and 3D printing"
      ],
      applicableProjects: ["Water Control Ball Valve", "Hydraulic Manifold", "Elbow Engine"]
    },
    {
      id: "2d-technical-drafting",
      title: "2D Technical Drafting & GD&T",
      category: "Manufacturing Drawings",
      description: "Standardized 2D manufacturing drawings conforming to ISO/ASME standards with full orthographic views, tolerances, and title blocks.",
      icon: <FileText className="w-6 h-6 text-[#00D2FF]" />,
      softwareUsed: ["CATIA V5 Drafting", "SolidWorks Drawings"],
      deliverables: [
        "High-resolution PDF engineering drawings",
        "Vector CAD drafts (.DWG, .DXF)",
        "Full GD&T tolerance callouts & surface finishes",
        "Section cuts, detail break-outs, and title blocks"
      ],
      workflow: [
        "Generate 1st or 3rd angle projection layouts from 3D models",
        "Define linear, radial, angular, and datum references",
        "Apply geometric dimensioning and tolerancing (GD&T)",
        "Format production-ready engineering sheets (e.g. Exercise 10, Exercise 4 style)"
      ],
      applicableProjects: ["Hydraulic Manifold Drafting", "Bearing Block Exercise", "Wrench Drawing"]
    },
    {
      id: "mechanical-product-modelling",
      title: "Mechanical Product Modelling",
      category: "Product Engineering",
      description: "Transforming functional product ideas, industrial housings, and mechanical devices into manufacturable digital CAD assets.",
      icon: <Wrench className="w-6 h-6 text-[#3987FF]" />,
      softwareUsed: ["SolidWorks", "CATIA V5"],
      deliverables: [
        "Manufacturable multi-component product models",
        "Enclosure split lines, fastening lugs, and snap fits",
        "Wall thickness uniformity verification",
        "DFM (Design for Manufacturing) optimization"
      ],
      workflow: [
        "Concept translation into 3D structural bounding boxes",
        "Internal mechanical layout and mounting interface placement",
        "Ergonomic external shell sculpting and styling",
        "Manufacturing feasibility check"
      ],
      applicableProjects: ["Spacecraft Landing Module", "Elbow Engine Housing", "Ergonomic Bottles"]
    },
    {
      id: "assembly-modelling-mates",
      title: "Assembly Modelling & Mates",
      category: "Multi-Body Mechanics",
      description: "Multi-part mechanical assembly design with verified concentric, coincident, distance, and mechanical gear/cam mates.",
      icon: <Settings className="w-6 h-6 text-[#3987FF]" />,
      softwareUsed: ["SolidWorks Assembly", "CATIA V5 Assembly Design"],
      deliverables: [
        "Master assembly CAD files (.SLDASM, .CATProduct)",
        "Interference and clearance collision detection reports",
        "Standard hardware library integration (bolts, nuts, washers)",
        "Sub-assembly hierarchy organization"
      ],
      workflow: [
        "Import or model individual components with uniform coordinate systems",
        "Apply kinematic mates reflecting real mechanical degrees of freedom",
        "Run static interference detection across all mating faces",
        "Establish assembly configurations and display states"
      ],
      applicableProjects: ["Water Control Ball Valve", "Elbow Engine Assembly", "4-Cylinder Engine"]
    },
    {
      id: "exploded-assembly-views",
      title: "Exploded Assembly Views & BOM",
      category: "Technical Documentation",
      description: "Step-by-step exploded assembly presentations depicting axial disassembly paths, component callouts, and Bill of Materials preparation.",
      icon: <Layers className="w-6 h-6 text-[#00D2FF]" />,
      softwareUsed: ["SolidWorks", "CATIA V5"],
      deliverables: [
        "Axial exploded view isometric diagrams",
        "Numbered part callout balloons",
        "Formatted Bill of Materials (BOM) tables",
        "Assembly sequence documentation"
      ],
      workflow: [
        "Plan logical disassembly trajectories for all hardware",
        "Configure exploded steps and explode-line sketches",
        "Generate balloon annotations keyed to the BOM table",
        "Render high-contrast documentation graphics"
      ],
      applicableProjects: ["Elbow Engine Exploded View", "Ball Valve Exploded Breakdown"]
    },
    {
      id: "product-visualization-motion",
      title: "Product Visualization & Kinematic Studies",
      category: "Simulation & Display",
      description: "Realistic metallic shaded renderings, multi-view display states, and motion simulation timeline studies to evaluate reciprocating mechanisms.",
      icon: <PlayCircle className="w-6 h-6 text-[#3987FF]" />,
      softwareUsed: ["SolidWorks Motion Study", "CATIA Shading Studio"],
      deliverables: [
        "High-definition shaded CAD presentation imagery",
        "Kinematic stroke and stroke-displacement analysis",
        "Automated motion cycles (e.g. rotary motor simulations)",
        "Multi-view projection presentation boards"
      ],
      workflow: [
        "Assign physical materials and realistic metallic surface finishes",
        "Define motor velocities and motion study timelines in SolidWorks",
        "Configure camera viewpoints and directional lighting",
        "Generate motion cycle visual studies and presentation assets"
      ],
      applicableProjects: ["4-Cylinder Engine Motion Study 3", "Spacecraft Module Renders"]
    }
  ];

  return (
    <section id="services" className="py-24 bg-[#0A0E14] relative border-t border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#111720] border border-[#3987FF]/30 text-xs font-mono text-[#3987FF] uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>02 // CAPABILITIES & SERVICES</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              WHAT I CAN DESIGN
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#A3ACB9] max-w-md mt-4 md:mt-0 font-sans">
            Specialized engineering and design services backed by verified SolidWorks and CATIA V5 experience.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-[#111720] border border-[#1E293B] hover:border-[#3987FF]/50 transition-all duration-300 flex flex-col justify-between group hover:shadow-2xl hover:shadow-[#3987FF]/10 relative overflow-hidden"
            >
              {/* Subtle accent hover line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3987FF] to-[#00D2FF] opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header Icon & Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-xl bg-[#151D2A] border border-[#1E293B] group-hover:border-[#3987FF]/40 group-hover:scale-110 transition-all">
                    {service.icon}
                  </div>
                  <span className="font-mono text-[10px] text-[#A3ACB9] bg-[#151D2A] px-2.5 py-1 rounded border border-[#1E293B]">
                    {service.category}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-white mb-2.5 group-hover:text-[#3987FF] transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#A3ACB9] leading-relaxed mb-6 font-sans">
                  {service.description}
                </p>
              </div>

              {/* Card Footer: Verified Software & Discover More */}
              <div className="pt-4 border-t border-[#1E293B]/80 flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  {service.softwareUsed.map((sw) => (
                    <span key={sw} className="font-mono text-[10px] text-[#CBD5E1] bg-[#182232] px-2 py-0.5 rounded">
                      {sw}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setActiveModalService(service)}
                  className="inline-flex items-center space-x-1 font-mono text-xs text-[#3987FF] hover:text-white transition-colors group/btn cursor-pointer"
                >
                  <span>Discover More</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      <ServiceModal
        service={activeModalService}
        onClose={() => setActiveModalService(null)}
        onSelectServiceForContact={onSelectServiceForContact}
      />
    </section>
  );
};

