import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RotateCw, Maximize2, Minimize2, Eye, Compass, Layers, Sparkles } from 'lucide-react';

interface CadViewer3DProps {
  className?: string;
  compact?: boolean;
}

export const CadViewer3D: React.FC<CadViewer3DProps> = ({ className = '', compact = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [exploded, setExploded] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [renderMode, setRenderMode] = useState<'metallic' | 'blueprint'>('metallic');

  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const partsGroupRef = useRef<THREE.Group | null>(null);
  const explodedPartsRef = useRef<{ mesh: THREE.Object3D; originalPos: THREE.Vector3; explodePos: THREE.Vector3 }[]>([]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 400;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e14);

    // Fog for depth
    scene.fog = new THREE.FogExp2(0x0a0e14, 0.04);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(4, 3, 5);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 14;
    controls.minDistance = 2;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.5;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x3987ff, 2.5);
    dirLight1.position.set(6, 8, 6);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xe2e8f0, 1.8);
    dirLight2.position.set(-6, -4, -4);
    scene.add(dirLight2);

    const rimLight = new THREE.PointLight(0x00d2ff, 3, 12);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    // Engineering Blueprint Floor Grid
    const gridHelper = new THREE.GridHelper(10, 20, 0x3987ff, 0x1e293b);
    gridHelper.position.y = -1.5;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.4;
    scene.add(gridHelper);

    // Group for Assembly
    const assemblyGroup = new THREE.Group();
    scene.add(assemblyGroup);
    partsGroupRef.current = assemblyGroup;

    // Materials
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x223249,
      metalness: 0.88,
      roughness: 0.22,
      wireframe: wireframe,
    });

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.9,
      roughness: 0.25,
      wireframe: wireframe,
    });

    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x3987ff,
      metalness: 0.6,
      roughness: 0.3,
      wireframe: wireframe,
    });

    const darkSteelMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.95,
      roughness: 0.2,
      wireframe: wireframe,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.98,
      roughness: 0.1,
      wireframe: wireframe,
    });

    // Sub-components for Mechanical Assembly (Inspired by Sundar's Valve & Kinematic Engine designs)
    const explodedParts: { mesh: THREE.Object3D; originalPos: THREE.Vector3; explodePos: THREE.Vector3 }[] = [];

    // 1. Central Spherical Body Housing
    const bodyGeometry = new THREE.SphereGeometry(0.85, 32, 24);
    const bodyMesh = new THREE.Mesh(bodyGeometry, metalMat);
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    assemblyGroup.add(bodyMesh);
    explodedParts.push({
      mesh: bodyMesh,
      originalPos: new THREE.Vector3(0, 0, 0),
      explodePos: new THREE.Vector3(0, 0, 0)
    });

    // 2. Left Flange & Pipe Extension
    const leftGroup = new THREE.Group();
    const pipeGeom = new THREE.CylinderGeometry(0.5, 0.5, 1.2, 32);
    const pipeMesh = new THREE.Mesh(pipeGeom, metalMat);
    pipeMesh.rotation.z = Math.PI / 2;
    pipeMesh.position.x = -0.7;
    leftGroup.add(pipeMesh);

    // Flange Disc
    const flangeGeom = new THREE.CylinderGeometry(0.9, 0.9, 0.18, 32);
    const flangeMesh = new THREE.Mesh(flangeGeom, darkSteelMat);
    flangeMesh.rotation.z = Math.PI / 2;
    flangeMesh.position.x = -1.3;
    leftGroup.add(flangeMesh);

    // 4 Bolts on Flange
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const boltGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.35, 16);
      const bolt = new THREE.Mesh(boltGeom, chromeMat);
      bolt.rotation.z = Math.PI / 2;
      bolt.position.set(-1.3, Math.cos(angle) * 0.68, Math.sin(angle) * 0.68);
      leftGroup.add(bolt);
    }
    assemblyGroup.add(leftGroup);
    explodedParts.push({
      mesh: leftGroup,
      originalPos: new THREE.Vector3(0, 0, 0),
      explodePos: new THREE.Vector3(-1.4, 0, 0)
    });

    // 3. Right Flange & Pipe Extension
    const rightGroup = new THREE.Group();
    const pipeRightGeom = new THREE.CylinderGeometry(0.5, 0.5, 1.2, 32);
    const pipeRight = new THREE.Mesh(pipeRightGeom, metalMat);
    pipeRight.rotation.z = Math.PI / 2;
    pipeRight.position.x = 0.7;
    rightGroup.add(pipeRight);

    const flangeRight = new THREE.Mesh(flangeGeom, darkSteelMat);
    flangeRight.rotation.z = Math.PI / 2;
    flangeRight.position.x = 1.3;
    rightGroup.add(flangeRight);

    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.35, 16), chromeMat);
      bolt.rotation.z = Math.PI / 2;
      bolt.position.set(1.3, Math.cos(angle) * 0.68, Math.sin(angle) * 0.68);
      rightGroup.add(bolt);
    }
    assemblyGroup.add(rightGroup);
    explodedParts.push({
      mesh: rightGroup,
      originalPos: new THREE.Vector3(0, 0, 0),
      explodePos: new THREE.Vector3(1.4, 0, 0)
    });

    // 4. Upper Bonnet & Stem Neck
    const bonnetGroup = new THREE.Group();
    const neckGeom = new THREE.CylinderGeometry(0.38, 0.44, 0.6, 24);
    const neckMesh = new THREE.Mesh(neckGeom, brassMat);
    neckMesh.position.y = 0.95;
    bonnetGroup.add(neckMesh);

    const glandNutGeom = new THREE.CylinderGeometry(0.32, 0.32, 0.22, 6); // Hexagonal nut
    const glandNut = new THREE.Mesh(glandNutGeom, chromeMat);
    glandNut.position.y = 1.3;
    bonnetGroup.add(glandNut);

    assemblyGroup.add(bonnetGroup);
    explodedParts.push({
      mesh: bonnetGroup,
      originalPos: new THREE.Vector3(0, 0, 0),
      explodePos: new THREE.Vector3(0, 0.9, 0)
    });

    // 5. Quarter-Turn Actuator Lever Handle (Cyan Accent)
    const leverGroup = new THREE.Group();
    const leverBaseGeom = new THREE.CylinderGeometry(0.24, 0.24, 0.15, 16);
    const leverBase = new THREE.Mesh(leverBaseGeom, accentMat);
    leverBase.position.y = 1.45;
    leverGroup.add(leverBase);

    // Lever arm
    const armGeom = new THREE.BoxGeometry(1.6, 0.09, 0.22);
    const armMesh = new THREE.Mesh(armGeom, accentMat);
    armMesh.position.set(0.75, 1.48, 0);
    leverGroup.add(armMesh);

    // Ergonomic vinyl grip cover
    const gripGeom = new THREE.BoxGeometry(0.7, 0.14, 0.26);
    const gripMesh = new THREE.Mesh(gripGeom, darkSteelMat);
    gripMesh.position.set(1.2, 1.48, 0);
    leverGroup.add(gripMesh);

    // Spindle bolt cap
    const topCapGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.08, 6);
    const topCap = new THREE.Mesh(topCapGeom, chromeMat);
    topCap.position.y = 1.58;
    leverGroup.add(topCap);

    assemblyGroup.add(leverGroup);
    explodedParts.push({
      mesh: leverGroup,
      originalPos: new THREE.Vector3(0, 0, 0),
      explodePos: new THREE.Vector3(0, 1.7, 0)
    });

    // 6. Central Ball Plug Core (Internal)
    const ballPlugGeom = new THREE.SphereGeometry(0.65, 24, 20);
    const ballPlug = new THREE.Mesh(ballPlugGeom, chromeMat);
    assemblyGroup.add(ballPlug);
    explodedParts.push({
      mesh: ballPlug,
      originalPos: new THREE.Vector3(0, 0, 0),
      explodePos: new THREE.Vector3(0, -1.2, 0)
    });

    explodedPartsRef.current = explodedParts;

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth lerp for exploded view transition
      explodedParts.forEach((item) => {
        const target = exploded ? item.explodePos : item.originalPos;
        item.mesh.position.lerp(target, delta * 5);
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      container.innerHTML = '';
    };
  }, [exploded]);

  // Update wireframe state dynamically
  useEffect(() => {
    if (!partsGroupRef.current) return;
    partsGroupRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => {
            if ('wireframe' in m) (m as any).wireframe = wireframe;
          });
        } else if (mesh.material && 'wireframe' in mesh.material) {
          (mesh.material as any).wireframe = wireframe;
        }
      }
    });
  }, [wireframe]);

  // Update auto-rotate
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  const handleResetCamera = () => {
    if (controlsRef.current && cameraRef.current) {
      cameraRef.current.position.set(4, 3, 5);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  const toggleFullscreen = () => {
    const elem = mountRef.current?.parentElement;
    if (!elem) return;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div className={`relative bg-[#0A0E14] rounded-2xl border border-[#1E293B] overflow-hidden shadow-2xl flex flex-col ${className}`}>
      {/* CAD Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#111720]/90 backdrop-blur-md border-b border-[#1E293B] z-10 select-none">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#3987FF] animate-pulse"></div>
          <span className="font-mono text-xs font-semibold text-[#F5F7FA] tracking-wider uppercase">
            3D Assembly Viewer // Water Valve Kinematic Model
          </span>
          <span className="text-[10px] bg-[#1E293B] text-[#3987FF] font-mono px-2 py-0.5 rounded border border-[#3987FF]/20">
            SOLIDWORKS SPEC
          </span>
        </div>

        {/* Viewport Control Badges */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => setExploded(!exploded)}
            className={`px-2.5 py-1 text-xs font-mono rounded flex items-center space-x-1.5 transition-all ${
              exploded
                ? 'bg-[#3987FF] text-white shadow-lg shadow-[#3987FF]/30'
                : 'bg-[#151D2A] text-[#A3ACB9] hover:text-[#F5F7FA] hover:bg-[#1E293B]'
            }`}
            title="Toggle Exploded Assembly View"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{exploded ? 'Assembled' : 'Explode View'}</span>
          </button>

          <button
            onClick={() => setWireframe(!wireframe)}
            className={`px-2.5 py-1 text-xs font-mono rounded flex items-center space-x-1.5 transition-all ${
              wireframe
                ? 'bg-[#00D2FF]/20 text-[#00D2FF] border border-[#00D2FF]/50'
                : 'bg-[#151D2A] text-[#A3ACB9] hover:text-[#F5F7FA] hover:bg-[#1E293B]'
            }`}
            title="Toggle Wireframe CAD Mode"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{wireframe ? 'Solid' : 'Wireframe'}</span>
          </button>

          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-1.5 rounded transition-all ${
              autoRotate
                ? 'bg-[#3987FF]/20 text-[#3987FF]'
                : 'bg-[#151D2A] text-[#A3ACB9] hover:text-[#F5F7FA]'
            }`}
            title="Toggle Turntable Rotation"
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </button>

          <button
            onClick={handleResetCamera}
            className="p-1.5 bg-[#151D2A] text-[#A3ACB9] hover:text-[#F5F7FA] hover:bg-[#1E293B] rounded transition-all"
            title="Reset Perspective Camera"
          >
            <Compass className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 bg-[#151D2A] text-[#A3ACB9] hover:text-[#F5F7FA] hover:bg-[#1E293B] rounded transition-all"
            title="Full Screen View"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 3D Canvas Container */}
      <div
        ref={mountRef}
        className={`w-full relative cursor-grab active:cursor-grabbing ${compact ? 'h-[320px]' : 'h-[440px] sm:h-[500px]'}`}
      />

      {/* Technical HUD Overlay */}
      <div className="absolute bottom-3 left-3 pointer-events-none z-10 flex flex-col space-y-1 font-mono text-[10px] text-[#A3ACB9]/70 bg-[#080A0E]/80 backdrop-blur-md p-2 rounded-lg border border-[#1E293B]/60">
        <div className="flex items-center space-x-2 text-[#3987FF]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]"></span>
          <span className="font-semibold">ENGINEERING HUD</span>
        </div>
        <div>AXIS CONSTRAINTS: X/Y/Z ORTHO</div>
        <div>MEMBER COUNT: 8 SUB-ASSEMBLIES</div>
        <div>INTERACTION: DRAG TO ORBIT | SCROLL TO ZOOM</div>
      </div>

      {/* Verified Stamp */}
      <div className="absolute bottom-3 right-3 pointer-events-none z-10">
        <div className="flex items-center space-x-1.5 bg-[#111720]/80 backdrop-blur-md px-2.5 py-1 rounded border border-[#3987FF]/30 text-white font-mono text-[10px]">
          <Sparkles className="w-3 h-3 text-[#3987FF]" />
          <span>PARAMETRIC DIGITAL TWIN</span>
        </div>
      </div>
    </div>
  );
};
