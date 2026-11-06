export interface CADProject {
  id: string;
  title: string;
  category: 'Mechanical Assemblies' | 'Surface Modelling' | 'Technical Drafting' | 'Kinematics & Simulation' | 'Concept Design';
  type: 'Assembly Modelling' | 'Kinematic Simulation' | 'Surface Design' | '2D Technical Drafting' | 'Concept Vehicle' | 'Drafting Exercise';
  description: string;
  longDescription: string;
  software: ('SolidWorks' | 'CATIA V5' | 'CATIA')[];
  images: string[];
  primaryImage: string;
  videos: string[];
  linkedInUrl: string;
  status: 'Completed CAD Model' | 'Kinematic Study' | 'Drafting Exercise' | 'Surface Study' | 'Concept Exploration';
  approvalStatus: 'Approved for Portfolio' | 'Client Review Required' | 'Learning Exercise Benchmark';
  isLearningExercise: boolean;
  safetySensitiveFlag: boolean;
  featured: boolean;
  designObservations: string[];
  componentsList?: string[];
  viewsAvailable: string[];
}

export const CAD_PROJECTS: CADProject[] = [
  {
    id: "water-control-ball-valve",
    title: "Water Control Ball Valve Assembly & Kinematics",
    category: "Mechanical Assemblies",
    type: "Assembly Modelling",
    description: "Parametric industrial ball valve mechanical assembly featuring split casing housing, spherical valve ball plug, rotary actuation lever, and exploded component layout.",
    longDescription: "A comprehensive mechanical CAD assembly of an industrial water control ball valve modeled in SolidWorks. The study includes full multi-body constraints, concentric mates, exploded-view axial breakdowns for assembly documentation, and 4-view orthographic projections (Front, Left, Top, and Isometric) evaluating internal fluid passage clearances and fastener alignments.",
    software: ["SolidWorks"],
    images: [
      "/assets/project -1/Designed and assembled a Water Control Ball Valve in SolidWorks .png",
      "/assets/project -1/Designed and assembled a Water Control Ball Valve in SolidWorks - 1.png",
      "/assets/project -1/Designed and assembled a Water Control Ball Valve in SolidWorks - 2.png"
    ],
    primaryImage: "/assets/project -1/Designed and assembled a Water Control Ball Valve in SolidWorks .png",
    videos: [],
    linkedInUrl: "https://www.linkedin.com/in/sundar-saravanan-341223336/",
    status: "Completed CAD Model",
    approvalStatus: "Approved for Portfolio",
    isLearningExercise: false,
    safetySensitiveFlag: false,
    featured: true,
    designObservations: [
      "Inlet Housing and Outlet Housing designed with 4-hole circular mounting bolt flanges for pipeline coupling",
      "Quarter-turn lock lever actuator mounted with hexagonal spindle cap screw and locking plate",
      "Exploded view demonstrates sequential axial disassembly of internal spherical valve ball, PTFE seal seats, and thermostat flange",
      "Four heavy-duty hexagonal coupling bolts clamp the dual-housing split body with uniform preload distribution",
      "SolidWorks FeatureManager tree structured with parametric mates, display states, and motion study setup"
    ],
    componentsList: [
      "Inlet Housing <1>",
      "Outlet Housing <2>",
      "Thermostate Flange <1>",
      "Lock Lever <1>",
      "Ball Valve Sub-Assembly <1>",
      "Cap Screws <1, 2>",
      "Hexagonal Body Bolts <1-4>"
    ],
    viewsAvailable: ["Full Assembly Tree View", "4-View Orthographic Layout (Front, Left, Top, Isometric)", "Axial Exploded View"]
  },
  {
    id: "4-cylinder-engine-assembly",
    title: "4-Cylinder Inline Engine Kinematic Assembly",
    category: "Kinematics & Simulation",
    type: "Kinematic Simulation",
    description: "Kinematic powertrain assembly of a 4-cylinder reciprocating engine in SolidWorks featuring multi-throw crankshaft, articulated connecting rods, and motion study simulation.",
    longDescription: "An advanced mechanical engine assembly designed in SolidWorks. Incorporates a 4-throw balanced crankshaft, connecting rods with split caps and fasteners, inline piston crowns, and a transparent cylinder block display state. Evaluates internal reciprocating clearances via SolidWorks Motion Study driven by an automated rotary motor simulation.",
    software: ["SolidWorks"],
    images: [
      "/assets/project -2/4-cylinder engine assembly using SOLIDWORKS..png"
    ],
    primaryImage: "/assets/project -2/4-cylinder engine assembly using SOLIDWORKS..png",
    videos: [],
    linkedInUrl: "https://www.linkedin.com/in/sundar-saravanan-341223336/",
    status: "Kinematic Study",
    approvalStatus: "Approved for Portfolio",
    isLearningExercise: false,
    safetySensitiveFlag: false,
    featured: true,
    designObservations: [
      "Four inline pistons mated to connecting rods with precise cylindrical and concentric constraints",
      "Counterweighted multi-throw crankshaft engineered for dynamic reciprocating balance",
      "Connecting rod caps secured with standard M9 threaded fasteners and nut hardware",
      "Semi-transparent cylinder block housing enables real-time visual inspection of piston top-dead-center (TDC) and bottom-dead-center (BDC) travel",
      "Basic Motion timeline configured with RotaryMotor2 operating across a 6-second motion cycle"
    ],
    componentsList: [
      "Connecting Rod Assemblies <1-4>",
      "Connecting Rod Caps <1-4>",
      "Multi-throw Crank Shaft <1>",
      "M9 Fastener Bolts & Nuts",
      "Piston Cylinders (4 Units)",
      "Engine Block Housing Casing",
      "Output Flywheel Hub Flange"
    ],
    viewsAvailable: ["Isometric Shaded with Transparent Casing & Motion Study Timeline"]
  },
  {
    id: "elbow-engine-assembly",
    title: "Kinematic Elbow Engine Assembly & Mechanism Study",
    category: "Mechanical Assemblies",
    type: "Assembly Modelling",
    description: "Multi-axis angular piston elbow engine modelled and assembled in SolidWorks, showcasing orthogonal mechanical power transmission, spoked flywheel, and exploded view breakdown.",
    longDescription: "A specialized mechanical assembly modeling study of an Elbow Engine (Hobson's joint variant), capable of transmitting rotary torque around a 90-degree angle using bent cylindrical pistons without bevel gears. Built with individual parametric parts, mates, a counterweighted spoked flywheel, manifold fluid routing, and comprehensive orthographic and trimetric drafting layouts.",
    software: ["SolidWorks"],
    images: [
      "/assets/project - 3/Designed and assembled an Elbow Engine in SolidWorks - 1.jpg",
      "/assets/project - 3/Designed and assembled an Elbow Engine in SolidWorks.png",
      "/assets/project - 3/Designed and assembled an Elbow Engine in SolidWorks - 2.png"
    ],
    primaryImage: "/assets/project - 3/Designed and assembled an Elbow Engine in SolidWorks - 1.jpg",
    videos: [],
    linkedInUrl: "https://www.linkedin.com/in/sundar-saravanan-341223336/",
    status: "Completed CAD Model",
    approvalStatus: "Approved for Portfolio",
    isLearningExercise: false,
    safetySensitiveFlag: false,
    featured: true,
    designObservations: [
      "Orthogonal power transmission utilizing curved reciprocating elbow pistons between vertical and horizontal cylinder blocks",
      "Four-spoke counterbalanced flywheel rim and web assembly supported by an upright structural post",
      "Valve port block with integrated manifold supply and exhaust tubing",
      "Exploded isometric projection detailing every fastener, cylinder body, piston pin, and foundation baseplate",
      "4-view projection (Front, Left, Top, Trimetric) validating axis intersections and operating clearances"
    ],
    componentsList: [
      "Vertical Cylinder Block <1>",
      "Horizontal Cylinder Block <1>",
      "Spoked Flywheel Web <1> & Outer Rim <1>",
      "Flywheel Mounting Upright Post <1>",
      "Valve Port Block & Manifold Piping",
      "Elbow Pistons <1, 4, 5>",
      "Foundation Baseplate & Screws"
    ],
    viewsAvailable: ["Assembled Isometric Perspective", "Axial Exploded View", "4-View Orthographic & Trimetric Layout"]
  },
  {
    id: "catia-surface-modelling-studies",
    title: "Complex Surface & Ergonomic Form Studies in CATIA",
    category: "Surface Modelling",
    type: "Surface Design",
    description: "Series of advanced surface modelling studies developed in CATIA V5 Generative Shape Design, exploring continuous aerodynamic curvatures, spiral sweeps, and ergonomic product geometries.",
    longDescription: "A diverse portfolio of Generative Shape Design (GSD) surface models produced in CATIA V5. Projects include a tennis racket frame engineered with smooth lofted profiles and structural throat bridge transitions, a cylindrical sleeve with multiple helical surface slot guides, and consumer bottle geometries demonstrating multi-profile sweeps, rotational symmetric surfaces, and ergonomic grip indentations.",
    software: ["CATIA V5"],
    images: [
      "/assets/project - 4/Exploring the power of Surface Modelling in CATIA .png",
      "/assets/project - 4/Exploring the power of Surface Modelling in CATIA- 2 .png",
      "/assets/project - 4/Exploring the power of Surface Modelling in CATIA  - 1.png",
      "/assets/project - 4/Exploring the power of Surface Modelling in CATIA - 3.png"
    ],
    primaryImage: "/assets/project - 4/Exploring the power of Surface Modelling in CATIA .png",
    videos: [],
    linkedInUrl: "https://www.linkedin.com/in/sundar-saravanan-341223336/",
    status: "Surface Study",
    approvalStatus: "Approved for Portfolio",
    isLearningExercise: false,
    safetySensitiveFlag: false,
    featured: true,
    designObservations: [
      "Tennis Racket Frame: Lofted aerodynamic tubular cross-sections maintaining G2 curvature continuity from handle grip through the throat into the oval hoop",
      "Helical Slotted Cylinder: 3D guide curves projected onto cylindrical surface with uniform angular array cutouts",
      "Beverage Flagon: Revolving contour with multi-start helical neck threads and conical transition zones",
      "Ergonomic Container: Bi-symmetric contoured waist grip tailored for consumer hand ergonomics"
    ],
    componentsList: [
      "Aero Tennis Racket Oval & Handle Frame",
      "Spiral-Slotted Guide Cylinder",
      "Threaded Neck Beverage Flagon",
      "Contoured Ergonomic Consumer Bottle"
    ],
    viewsAvailable: ["4-View Orthographic & Isometric Multi-Angle Representations"]
  },
  {
    id: "flanged-manifold-catia-drafting",
    title: "Multi-Flanged Hydraulic Manifold & 2D Technical Drafting",
    category: "Technical Drafting",
    type: "2D Technical Drafting",
    description: "Solid mechanical component design and engineering manufacturing drawing in CATIA V5 with full GD&T dimensions, multi-view projections, and scale annotations (Exercise No: 10).",
    longDescription: "A dual-phase mechanical design study executed in CATIA V5. Combines 3D solid part modeling of a heavy-duty hydraulic manifold body with a standardized 2D engineering manufacturing drafting sheet (Exercise No: 10). The drawing includes 6 coordinated views with full dimensional tolerances, centerlines, bore radii, and flange pitch-circle diameters.",
    software: ["CATIA V5"],
    images: [
      "/assets/project - 5/designed and drafted this mechanical component using CATIA V5 - 1.png",
      "/assets/project - 5/designed and drafted this mechanical component using CATIA V5.png"
    ],
    primaryImage: "/assets/project - 5/designed and drafted this mechanical component using CATIA V5 - 1.png",
    videos: [],
    linkedInUrl: "https://www.linkedin.com/in/sundar-saravanan-341223336/",
    status: "Drafting Exercise",
    approvalStatus: "Learning Exercise Benchmark",
    isLearningExercise: true,
    safetySensitiveFlag: false,
    featured: true,
    designObservations: [
      "Rigorous 2D drafting sheet (Exercise No: 10) rendered at 1:2 scale conforming to mechanical drawing standards",
      "Complete orthographic suite: Front view, Left view, Right view, Top view, Bottom view, and Isometric view",
      "Verified geometric dimensions: Ø50, Ø40, Ø35, Ø30, Ø20, Ø16, Ø8, R25, R10, R5, with accurate offset callouts",
      "3D solid model incorporates multiple orthogonal flanged ports with countersunk and through-hole bolt patterns"
    ],
    componentsList: [
      "Central Manifold Block Body",
      "Top Square Flange with 4-Hole Bolt Pattern",
      "Dual Side Circular Pipe Flanges with 4-Hole PCD",
      "Internal Porting Channels"
    ],
    viewsAvailable: ["Full 2D Engineering Sheet (6 Views)", "3D CAD Multi-View Shaded Representation"]
  },
  {
    id: "mechanical-drafting-exercises-series",
    title: "Precision GD&T Mechanical Drafting Exercises",
    category: "Technical Drafting",
    type: "Drafting Exercise",
    description: "Collection of standardized engineering 2D technical drawings covering bearing support brackets, multi-head socket tools, and ergonomic mechanisms (Exercises 2, 3 & 4).",
    longDescription: "A disciplined series of technical drafting exercises created to test adherence to international engineering drawing standards. Includes Exercise No: 4 (machined bearing block with channel milling and bore tolerances at 3:2 scale), Exercise No: 2 (ergonomic multi-head socket wrench with polygon dimensioning at 2:1 scale), and Exercise No: 3 (ergonomic grip and barrel mechanism contour study at 3:1 scale).",
    software: ["CATIA V5"],
    images: [
      "/assets/project - 6/Improving My Mechanical Design Skills.png",
      "/assets/project - 6/Improving My Mechanical Design Skills- 2.png",
      "/assets/project - 6/Improving My Mechanical Design Skills - 1.png"
    ],
    primaryImage: "/assets/project - 6/Improving My Mechanical Design Skills.png",
    videos: [],
    linkedInUrl: "https://www.linkedin.com/in/sundar-saravanan-341223336/",
    status: "Drafting Exercise",
    approvalStatus: "Client Review Required",
    isLearningExercise: true,
    safetySensitiveFlag: true,
    featured: false,
    designObservations: [
      "Exercise No: 4 - Machined Bearing Support Block: 3:2 scale detailing of R30/R77 curvature, Ø10/Ø20/Ø30 bores, stepped 50/90mm elevations, and isometric representation",
      "Exercise No: 2 - Multi-Head Socket Spanner: 2:1 scale drawing illustrating double-ended polygon sockets (R0.5, R1.5, R3, R5, R13), center recessed grip, and 75.65mm span",
      "Exercise No: 3 - Ergonomic Grip Frame: 3:1 scale contour study with radius arc transitions (R2.25, R5.41, R31.82). Annotated as academic drafting study for client portfolio review."
    ],
    componentsList: [
      "Machined Bearing Pillow Block (Exercise 4)",
      "Multi-Head Bone Wrench Tool (Exercise 2)",
      "Ergonomic Handgrip & Cylindrical Barrel Mechanism (Exercise 3)"
    ],
    viewsAvailable: ["Full 2D Drafting Sheets with Orthographic Front, Left, Top, and Isometric Projections"]
  },
  {
    id: "spacecraft-landing-module",
    title: "3D CAD Concept Design – Spacecraft Landing Module",
    category: "Concept Design",
    type: "Concept Vehicle",
    description: "Conceptual aerospace landing vehicle designed in CATIA V5 featuring an aerodynamic lenticular disk hull, observation dome with radial viewports, and tripod landing gear.",
    longDescription: "An imaginative conceptual 3D CAD exploration conceived in CATIA V5 Part & Surface Design. The design features a streamlined lenticular aero-shell engineered for atmospheric entry, a pressurized upper observation dome with 12 radial optical viewports, a ribbed reaction-control collar, a central ventral rocket thruster cavity, and articulating tripod landing struts with foot pads.",
    software: ["CATIA V5"],
    images: [
      "/assets/project - 7/3D CAD Concept Design – Spacecraft Landing Module 2.png",
      "/assets/project - 7/3D CAD Concept Design – Spacecraft Landing Module 1.png",
      "/assets/project - 7/3D CAD Concept Design – Spacecraft Landing Module 4.png"
    ],
    primaryImage: "/assets/project - 7/3D CAD Concept Design – Spacecraft Landing Module 2.png",
    videos: [],
    linkedInUrl: "https://www.linkedin.com/in/sundar-saravanan-341223336/",
    status: "Concept Exploration",
    approvalStatus: "Approved for Portfolio",
    isLearningExercise: false,
    safetySensitiveFlag: false,
    featured: true,
    designObservations: [
      "Lenticular disk body created via rotational surface sweeping with low aerodynamic drag profile",
      "Upper hemispherical command dome configured with 12 circumferential observation viewports",
      "Serrated cylindrical collar representing thermal radiation and attitude thruster integration",
      "Tripod landing strut arrangement providing stable tripod ground contact with articulating foot pads",
      "Rendered in metallic shaded display states as well as high-contrast technical line presentations"
    ],
    componentsList: [
      "Primary Lenticular Aero-Shell",
      "Upper Pressurized Command Dome",
      "Attitude Control / Thermal Radiator Collar",
      "Ventral Main Descent Propulsion Nozzle",
      "Tri-Pod Shock Absorber Landing Gear & Foot Pads"
    ],
    viewsAvailable: ["4-View CAD Projection (Isometric, Top, Bottom, Side)", "Metallic Studio Lighting Render", "High-Contrast Engineering Linework"]
  }
];

export interface VerifiedProfile {
  name: string;
  headline: string;
  tagline: string;
  avatar: string;
  banner: string;
  linkedInUrl: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  whatsappPlaceholder: string;
  location: string;
  bio: string[];
  softwareSkills: {
    name: string;
    level: string;
    verified: boolean;
    modules: string[];
    description: string;
  }[];
  engineeringSkills: string[];
  education: {
    degree: string;
    institution: string;
    status: string;
    highlights: string[];
  };
  designPhilosophy: {
    title: string;
    desc: string;
  }[];
}

export const VERIFIED_PROFILE: VerifiedProfile = {
  name: "Sundar Saravanan",
  headline: "CAD Designer | 3D Mechanical Modeller | Product Design Specialist",
  tagline: "Engineering Ideas Into Reality Through Precision Digital CAD & Kinematics",
  avatar: "/assets/profile.png",
  banner: "/assets/banner.png",
  linkedInUrl: "https://www.linkedin.com/in/sundar-saravanan-341223336/",
  emailPlaceholder: "sundarcovai02@gmail.com",
  phonePlaceholder: "+91 7604 888 467",
  whatsappPlaceholder: "+91 7604 888 467",
  location: "India (Available for Remote CAD & Mechanical Freelance Worldwide)",
  bio: [
    "I am Sundar Saravanan, a dedicated CAD Designer and Mechanical Product Modeller passionate about turning engineering ideas into tangible, manufacturable 3D realities.",
    "Specializing in SolidWorks and CATIA V5, my work bridges conceptual product design and rigorous mechanical drafting. From multi-part kinematic engine assemblies and hydraulic ball valves to complex generative surface models and GD&T technical drawings, I focus on parametric accuracy, structural feasibility, and precision geometry.",
    "Whether you require 3D parametric CAD modeling, exploded assembly animations, 2D manufacturing drawings, or product surface development, I deliver clean, production-ready engineering models built to exact technical specifications."
  ],
  softwareSkills: [
    {
      name: "SolidWorks",
      level: "Advanced Proficiency (Verified)",
      verified: true,
      modules: [
        "Part & Feature Modelling",
        "Assembly Modelling & Mates",
        "Motion Study & Kinematics",
        "Exploded Views & BOM",
        "Display States & Shading"
      ],
      description: "Demonstrated in complete kinematic engine assemblies, 4-cylinder reciprocating simulations, and multi-component industrial ball valve assemblies."
    },
    {
      name: "CATIA V5",
      level: "Advanced Proficiency (Verified)",
      verified: true,
      modules: [
        "Generative Shape Design (Surface Modelling)",
        "Part Design & Solid Modelling",
        "Generative Drafting & GD&T",
        "Assembly Design",
        "Lofted & Helical Surface Generation"
      ],
      description: "Demonstrated through multi-flanged hydraulic manifolds, standardized engineering drafting sheets (Exercise series), surface curvature continuity, and concept aerospace vehicles."
    }
  ],
  engineeringSkills: [
    "3D Parametric CAD Modelling",
    "2D Engineering Drafting & GD&T",
    "Multi-Part Assembly & Mates",
    "Kinematic Motion Studies",
    "Exploded Assembly Views & Technical Docs",
    "Generative Surface Modelling (GSD)",
    "Orthographic Multi-View Projection",
    "Design for Manufacturing (DFM) Principles",
    "Mechanical Product Visualization"
  ],
  education: {
    degree: "Mechanical Engineering & CAD Design Specialization",
    institution: "Engineering Institution (Verified CAD Curriculum)",
    status: "Active Mechanical CAD Practitioner",
    highlights: [
      "Rigorous coursework in Engineering Mechanics, Machine Drawing, and GD&T standards",
      "Hands-on intensive practice in CATIA V5 Generative Drafting and Generative Shape Design",
      "SolidWorks assembly kinematics, mechanism simulation, and motion analysis"
    ]
  },
  designPhilosophy: [
    {
      title: "Parametric Precision First",
      desc: "Every sketch is fully defined; every dimension serves functional and manufacturing tolerances without arbitrary assumptions."
    },
    {
      title: "Assembly & Kinematic Integrity",
      desc: "Mechanisms must function virtually with verified mate constraints, clearance verification, and simulated motion paths."
    },
    {
      title: "Clean Drafting Standards",
      desc: "Drawings are created with clear orthographic projections, standard section lines, and unambiguous dimension callouts."
    },
    {
      title: "G2 Curvature & Aesthetic Flow",
      desc: "Surfaces in consumer and aerospace products adhere to smooth continuity, eliminating unwanted creases or tangent discontinuities."
    }
  ]
};

