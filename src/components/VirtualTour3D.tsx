import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  RotateCcw,
  Sun,
  Sunset,
  Moon,
  Eye,
  Maximize2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Compass
} from 'lucide-react';

interface Props {
  onBookNow: () => void;
}

type LightingMood = 'sunset' | 'evening' | 'daylight';
type CameraView = 'overview' | 'bed' | 'lounge' | 'window';

export const VirtualTour3D: React.FC<Props> = ({ onBookNow }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [mood, setMood] = useState<LightingMood>('evening');
  const [currentView, setCurrentView] = useState<CameraView>('overview');
  const [isControlsCollapsed, setIsControlsCollapsed] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // References for render loop coordination
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const lightsRef = useRef<{
    keyLight: THREE.DirectionalLight;
    hemiLight: THREE.HemisphereLight;
    ambientLight: THREE.AmbientLight;
    bedSconces: THREE.PointLight[];
    windowLight: THREE.PointLight;
  } | null>(null);
  const targetCamPos = useRef<THREE.Vector3>(new THREE.Vector3(7, 4.5, 7));
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.2, 0));

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL to adapt performance gracefully
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 520;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x121518);
    scene.fog = new THREE.FogExp2(0x121518, 0.035);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(7, 4.5, 7);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 4. Studio Environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 5. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02; // Don't go below floor
    controls.minDistance = 3;
    controls.maxDistance = 14;
    controls.target.set(0, 1.2, 0);
    controlsRef.current = controls;

    // 6. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.6);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffecd2, 0x111620, 0.8);
    hemiLight.position.set(0, 10, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffe2b8, 1.5);
    keyLight.position.set(6, 8, 5);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Bed sconce accent lights
    const sconce1 = new THREE.PointLight(0xffc266, 1.8, 4);
    sconce1.position.set(-1.8, 2.2, -2.1);
    scene.add(sconce1);

    const sconce2 = new THREE.PointLight(0xffc266, 1.8, 4);
    sconce2.position.set(1.8, 2.2, -2.1);
    scene.add(sconce2);

    // Balcony window light
    const windowLight = new THREE.PointLight(0x88bbff, 1.2, 8);
    windowLight.position.set(-4.5, 3, 0);
    scene.add(windowLight);

    lightsRef.current = {
      keyLight,
      hemiLight,
      ambientLight,
      bedSconces: [sconce1, sconce2],
      windowLight
    };

    // 7. BUILD PROCEDURAL 3D LUXURY HOTEL SUITE (Multi-part Composite Group)
    const suiteGroup = new THREE.Group();

    // Material Library
    const woodFloorMat = new THREE.MeshStandardMaterial({
      color: 0x4a3221,
      roughness: 0.35,
      metalness: 0.1
    });

    const wallMat = new THREE.MeshStandardMaterial({
      color: 0xf2ece4,
      roughness: 0.85,
      metalness: 0.02
    });

    const featureWallMat = new THREE.MeshStandardMaterial({
      color: 0x24282c,
      roughness: 0.5,
      metalness: 0.15
    });

    const mahoganyMat = new THREE.MeshStandardMaterial({
      color: 0x3d2012,
      roughness: 0.3,
      metalness: 0.2
    });

    const bedLinenMat = new THREE.MeshStandardMaterial({
      color: 0xfcfcfc,
      roughness: 0.7,
      metalness: 0.0
    });

    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.25,
      metalness: 0.85
    });

    const velvetTealMat = new THREE.MeshStandardMaterial({
      color: 0x224855,
      roughness: 0.6,
      metalness: 0.1
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: isSoftwareGl ? 0 : 0.9,
      opacity: isSoftwareGl ? 0.35 : 1,
      transparent: true,
      roughness: 0.1,
      ior: 1.5,
      thickness: 0.5
    });

    // Floor (8x8 m)
    const floorGeo = new THREE.BoxGeometry(8, 0.2, 8);
    const floor = new THREE.Mesh(floorGeo, woodFloorMat);
    floor.position.y = -0.1;
    floor.receiveShadow = !isSoftwareGl;
    suiteGroup.add(floor);

    // Decorative Silk Rug under bed
    const rugGeo = new THREE.BoxGeometry(4.5, 0.02, 4.5);
    const rugMat = new THREE.MeshStandardMaterial({
      color: 0xd6cbb8,
      roughness: 0.95
    });
    const rug = new THREE.Mesh(rugGeo, rugMat);
    rug.position.set(0, 0.01, -0.6);
    rug.receiveShadow = !isSoftwareGl;
    suiteGroup.add(rug);

    // Back Wall (Behind Bed)
    const backWallGeo = new THREE.BoxGeometry(8, 4.2, 0.2);
    const backWall = new THREE.Mesh(backWallGeo, featureWallMat);
    backWall.position.set(0, 2, -4);
    backWall.receiveShadow = !isSoftwareGl;
    suiteGroup.add(backWall);

    // Side Wall (Right)
    const rightWallGeo = new THREE.BoxGeometry(0.2, 4.2, 8);
    const rightWall = new THREE.Mesh(rightWallGeo, wallMat);
    rightWall.position.set(4, 2, 0);
    rightWall.receiveShadow = !isSoftwareGl;
    suiteGroup.add(rightWall);

    // Balcony Glass Window Wall (Left)
    const windowFrameGeo = new THREE.BoxGeometry(0.1, 3.8, 6.5);
    const windowGlass = new THREE.Mesh(windowFrameGeo, glassMat);
    windowGlass.position.set(-3.9, 2, 0);
    suiteGroup.add(windowGlass);

    // Window Mullions (Gold/Bronze Brass)
    const mullionGeo = new THREE.BoxGeometry(0.15, 3.8, 0.08);
    for (let mz = -2.5; mz <= 2.5; mz += 1.25) {
      const mullion = new THREE.Mesh(mullionGeo, goldAccentMat);
      mullion.position.set(-3.85, 2, mz);
      suiteGroup.add(mullion);
    }

    // --- BED STRUCTURE ---
    const bedGroup = new THREE.Group();

    // Bed Frame
    const frameGeo = new THREE.BoxGeometry(2.6, 0.35, 2.8);
    const bedFrame = new THREE.Mesh(frameGeo, mahoganyMat);
    bedFrame.position.set(0, 0.25, -2);
    bedFrame.castShadow = !isSoftwareGl;
    bedFrame.receiveShadow = !isSoftwareGl;
    bedGroup.add(bedFrame);

    // Mattress & White Duvet
    const mattressGeo = new THREE.BoxGeometry(2.4, 0.45, 2.6);
    const mattress = new THREE.Mesh(mattressGeo, bedLinenMat);
    mattress.position.set(0, 0.6, -2);
    mattress.castShadow = !isSoftwareGl;
    mattress.receiveShadow = !isSoftwareGl;
    bedGroup.add(mattress);

    // Luxury Headboard with Brass Trim
    const headboardGeo = new THREE.BoxGeometry(3.6, 1.8, 0.15);
    const headboard = new THREE.Mesh(headboardGeo, mahoganyMat);
    headboard.position.set(0, 1.3, -3.85);
    headboard.castShadow = !isSoftwareGl;
    bedGroup.add(headboard);

    // Headboard Accent Inset
    const insetGeo = new THREE.BoxGeometry(3.3, 1.5, 0.05);
    const insetMat = new THREE.MeshStandardMaterial({
      color: 0x5a3720,
      roughness: 0.6
    });
    const inset = new THREE.Mesh(insetGeo, insetMat);
    inset.position.set(0, 1.3, -3.75);
    bedGroup.add(inset);

    // Pillows (4x)
    const pillowGeo = new THREE.BoxGeometry(0.75, 0.25, 0.5);
    const pillowMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });
    const p1 = new THREE.Mesh(pillowGeo, pillowMat);
    p1.position.set(-0.65, 0.95, -3.0);
    p1.rotation.x = 0.3;
    const p2 = new THREE.Mesh(pillowGeo, pillowMat);
    p2.position.set(0.65, 0.95, -3.0);
    p2.rotation.x = 0.3;

    // Accent Pillows (Gold Velvet)
    const accentPillowGeo = new THREE.BoxGeometry(0.55, 0.25, 0.4);
    const p3 = new THREE.Mesh(accentPillowGeo, goldAccentMat);
    p3.position.set(-0.65, 0.95, -2.7);
    p3.rotation.x = 0.4;
    const p4 = new THREE.Mesh(accentPillowGeo, goldAccentMat);
    p4.position.set(0.65, 0.95, -2.7);
    p4.rotation.x = 0.4;

    bedGroup.add(p1, p2, p3, p4);

    // Decorative Bed Runner (Teal / Gold)
    const runnerGeo = new THREE.BoxGeometry(2.42, 0.04, 0.65);
    const runner = new THREE.Mesh(runnerGeo, velvetTealMat);
    runner.position.set(0, 0.84, -1.2);
    bedGroup.add(runner);

    // Nightstands (Left & Right)
    const standGeo = new THREE.BoxGeometry(0.65, 0.55, 0.55);
    const standL = new THREE.Mesh(standGeo, mahoganyMat);
    standL.position.set(-1.8, 0.35, -3.5);
    standL.castShadow = !isSoftwareGl;
    const standR = new THREE.Mesh(standGeo, mahoganyMat);
    standR.position.set(1.8, 0.35, -3.5);
    standR.castShadow = !isSoftwareGl;
    bedGroup.add(standL, standR);

    // Designer Reading Lamps on Nightstands
    const lampBaseGeo = new THREE.CylinderGeometry(0.08, 0.12, 0.4, 16);
    const lampShadeGeo = new THREE.CylinderGeometry(0.18, 0.24, 0.3, 16);
    const lampShadeMat = new THREE.MeshStandardMaterial({
      color: 0xfffaea,
      emissive: 0xffd988,
      emissiveIntensity: 0.6,
      roughness: 0.3
    });

    const lampBaseL = new THREE.Mesh(lampBaseGeo, goldAccentMat);
    lampBaseL.position.set(-1.8, 0.75, -3.5);
    const lampShadeL = new THREE.Mesh(lampShadeGeo, lampShadeMat);
    lampShadeL.position.set(-1.8, 1.05, -3.5);

    const lampBaseR = new THREE.Mesh(lampBaseGeo, goldAccentMat);
    lampBaseR.position.set(1.8, 0.75, -3.5);
    const lampShadeR = new THREE.Mesh(lampShadeGeo, lampShadeMat);
    lampShadeR.position.set(1.8, 1.05, -3.5);

    bedGroup.add(lampBaseL, lampShadeL, lampBaseR, lampShadeR);
    suiteGroup.add(bedGroup);

    // --- LOUNGE CORNER ---
    const loungeGroup = new THREE.Group();

    // Luxury Lounge Armchair (Velvet Teal)
    const chairSeatGeo = new THREE.BoxGeometry(1.1, 0.35, 1.0);
    const chairBackGeo = new THREE.BoxGeometry(1.1, 0.9, 0.25);
    const armGeo = new THREE.BoxGeometry(0.2, 0.6, 1.0);

    const chairSeat = new THREE.Mesh(chairSeatGeo, velvetTealMat);
    chairSeat.position.set(2.2, 0.4, 1.5);
    chairSeat.castShadow = !isSoftwareGl;

    const chairBack = new THREE.Mesh(chairBackGeo, velvetTealMat);
    chairBack.position.set(2.2, 0.9, 1.9);

    const armL = new THREE.Mesh(armGeo, velvetTealMat);
    armL.position.set(1.6, 0.6, 1.5);

    const armR = new THREE.Mesh(armGeo, velvetTealMat);
    armR.position.set(2.8, 0.6, 1.5);

    loungeGroup.add(chairSeat, chairBack, armL, armR);

    // Coffee Table (Round Marble with Gold Ring)
    const tableTopGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.05, 32);
    const marbleMat = new THREE.MeshStandardMaterial({ color: 0xf8f8f8, roughness: 0.2, metalness: 0.1 });
    const tableTop = new THREE.Mesh(tableTopGeo, marbleMat);
    tableTop.position.set(1.8, 0.45, 0.2);
    tableTop.castShadow = !isSoftwareGl;

    const tableLegGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.42, 16);
    const tableLeg = new THREE.Mesh(tableLegGeo, goldAccentMat);
    tableLeg.position.set(1.8, 0.21, 0.2);
    loungeGroup.add(tableTop, tableLeg);

    // Golden Key Card on Coffee Table
    const keyCardGeo = new THREE.BoxGeometry(0.18, 0.01, 0.28);
    const keyCard = new THREE.Mesh(keyCardGeo, goldAccentMat);
    keyCard.position.set(1.8, 0.49, 0.2);
    keyCard.rotation.y = 0.4;
    loungeGroup.add(keyCard);

    suiteGroup.add(loungeGroup);

    // --- MODERN CHANDELIER RING ---
    const chandelierGroup = new THREE.Group();
    const ringGeo = new THREE.TorusGeometry(1.2, 0.04, 16, 64);
    const ring = new THREE.Mesh(ringGeo, goldAccentMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(0, 3.4, 0);

    const innerRingGeo = new THREE.TorusGeometry(0.7, 0.03, 16, 48);
    const innerRing = new THREE.Mesh(innerRingGeo, goldAccentMat);
    innerRing.rotation.x = Math.PI / 2;
    innerRing.position.set(0, 3.4, 0);

    chandelierGroup.add(ring, innerRing);
    suiteGroup.add(chandelierGroup);

    scene.add(suiteGroup);

    // 8. ANIMATION & RENDER LOOP
    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();

      // Silky smooth camera positioning dampening
      camera.position.lerp(targetCamPos.current, 0.04);
      controls.target.lerp(targetLookAt.current, 0.04);

      // Auto rotation
      if (isAutoRotate) {
        suiteGroup.rotation.y += 0.003;
      }

      // Gentle chandelier oscillation
      ring.rotation.z += 0.002;
      innerRing.rotation.z -= 0.0025;

      controls.update();
      renderer.render(scene, camera);

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update Mood Lights
  useEffect(() => {
    if (!lightsRef.current || !sceneRef.current) return;
    const { keyLight, hemiLight, ambientLight, bedSconces, windowLight } = lightsRef.current;
    const scene = sceneRef.current;

    if (mood === 'sunset') {
      scene.background = new THREE.Color(0x1e1516);
      scene.fog = new THREE.FogExp2(0x1e1516, 0.03);
      keyLight.color.setHex(0xff7733);
      keyLight.intensity = 2.0;
      hemiLight.color.setHex(0xffaa66);
      hemiLight.groundColor.setHex(0x221100);
      ambientLight.color.setHex(0xff9944);
      ambientLight.intensity = 0.5;
      bedSconces.forEach(s => { s.intensity = 2.2; s.color.setHex(0xff8833); });
      windowLight.color.setHex(0xff5522);
      windowLight.intensity = 1.8;
    } else if (mood === 'evening') {
      scene.background = new THREE.Color(0x121518);
      scene.fog = new THREE.FogExp2(0x121518, 0.035);
      keyLight.color.setHex(0xffe2b8);
      keyLight.intensity = 1.2;
      hemiLight.color.setHex(0xffecd2);
      hemiLight.groundColor.setHex(0x111620);
      ambientLight.color.setHex(0xfff5e6);
      ambientLight.intensity = 0.6;
      bedSconces.forEach(s => { s.intensity = 1.8; s.color.setHex(0xffc266); });
      windowLight.color.setHex(0x88bbff);
      windowLight.intensity = 1.2;
    } else if (mood === 'daylight') {
      scene.background = new THREE.Color(0x242d38);
      scene.fog = new THREE.FogExp2(0x242d38, 0.025);
      keyLight.color.setHex(0xffffff);
      keyLight.intensity = 2.2;
      hemiLight.color.setHex(0xe0f0ff);
      hemiLight.groundColor.setHex(0x332a22);
      ambientLight.color.setHex(0xffffff);
      ambientLight.intensity = 0.8;
      bedSconces.forEach(s => { s.intensity = 0.6; s.color.setHex(0xffe2b8); });
      windowLight.color.setHex(0xd0e8ff);
      windowLight.intensity = 2.5;
    }
  }, [mood]);

  // Camera Presets
  const setCameraPreset = (view: CameraView) => {
    setCurrentView(view);
    setIsAutoRotate(false);

    if (view === 'overview') {
      targetCamPos.current.set(7, 4.5, 7);
      targetLookAt.current.set(0, 1.2, 0);
      setActiveHotspot('Suite Overview');
    } else if (view === 'bed') {
      targetCamPos.current.set(0, 2.4, 2.2);
      targetLookAt.current.set(0, 1.2, -2.0);
      setActiveHotspot('King Master Bed & Headboard');
    } else if (view === 'lounge') {
      targetCamPos.current.set(3.8, 2.2, 3.2);
      targetLookAt.current.set(2.0, 0.8, 1.0);
      setActiveHotspot('Executive Lounge & Armchair');
    } else if (view === 'window') {
      targetCamPos.current.set(-1.5, 2.5, 4.0);
      targetLookAt.current.set(-3.8, 2.0, 0);
      setActiveHotspot('Panoramic Balcony Window');
    }
  };

  return (
    <section id="virtual-tour" className="py-20 bg-[#0d1013] text-stone-100 border-b border-stone-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>3D Virtual Tour &bull; Real-Time WebGL</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-100 tracking-tight" style={{ textWrap: 'balance' }}>
              Interactive 3D Luxury Suite Visualizer
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm max-w-xl font-light">
              Explore the architectural craftsmanship, plush king-size bed, executive lounge, and ambient lighting of Manju Hotel in real-time 3D. Click &amp; drag to rotate.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAutoRotate(!isAutoRotate)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded text-xs font-medium transition-colors border ${
                isAutoRotate
                  ? 'bg-[#D4AF37] text-stone-950 font-semibold border-[#D4AF37]'
                  : 'bg-stone-900 text-stone-300 border-stone-700 hover:text-white'
              }`}
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isAutoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
              <span>{isAutoRotate ? '360° Auto-Rotating' : 'Enable 360° Rotate'}</span>
            </button>

            <button
              onClick={onBookNow}
              className="px-5 py-2 bg-white hover:bg-stone-100 text-stone-950 font-semibold text-xs uppercase tracking-wider rounded transition-colors"
            >
              Book This Suite
            </button>
          </div>
        </div>

        {/* 3D Viewport Container */}
        <div className="relative w-full h-[520px] rounded-xl overflow-hidden border border-stone-800 bg-[#121518] shadow-2xl">
          {/* WebGL Canvas Mount (Clean isolated container per Three.js skill) */}
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Top-Left Minimal Spec Watermark */}
          <div className="absolute top-4 left-4 z-10 pointer-events-none bg-stone-950/80 backdrop-blur-md px-3.5 py-2 rounded border border-stone-800 text-xs">
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block">
              Manju Hotel &bull; Bangomunda
            </span>
            <span className="font-serif text-sm font-semibold text-stone-100 block">
              Presidential Suite 3D Model
            </span>
            {activeHotspot && (
              <span className="text-[11px] text-stone-400 mt-0.5 block">
                Focus: {activeHotspot}
              </span>
            )}
          </div>

          {/* Top-Right Interaction Tip */}
          <div className="absolute top-4 right-4 z-10 pointer-events-none hidden sm:flex items-center gap-2 bg-stone-950/70 backdrop-blur-md px-3 py-1.5 rounded border border-stone-800 text-[11px] text-stone-400">
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Drag to rotate &bull; Scroll to zoom &bull; Right click to pan</span>
          </div>

          {/* Collapsible Ergonomic Bottom Control Dock (Strict Three.js Skill Directive) */}
          <div
            className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-2xl transition-all duration-300 ${
              isControlsCollapsed ? 'translate-y-[calc(100%-36px)] opacity-90' : 'translate-y-0'
            }`}
          >
            {/* Dock Toggle Tab */}
            <div className="flex justify-center mb-1">
              <button
                onClick={() => setIsControlsCollapsed(!isControlsCollapsed)}
                className="flex items-center gap-1.5 px-3 py-1 bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-white rounded-t-md border-t border-x border-stone-700/80 text-[11px] font-medium transition-colors shadow-lg"
              >
                {isControlsCollapsed ? (
                  <>
                    <ChevronUp className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Show 3D Controls</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Collapse Dock (Zen View)</span>
                  </>
                )}
              </button>
            </div>

            {/* Dock Body */}
            <div className="bg-stone-950/90 backdrop-blur-md p-3.5 rounded-lg border border-stone-800 shadow-2xl flex flex-wrap items-center justify-between gap-4">
              {/* Lighting Mood Controls */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold hidden sm:inline">
                  Ambience:
                </span>
                <div className="flex items-center gap-1 bg-stone-900/80 p-1 rounded border border-stone-800">
                  <button
                    onClick={() => setMood('evening')}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded transition-colors ${
                      mood === 'evening' ? 'bg-[#D4AF37] text-stone-950 font-semibold' : 'text-stone-400 hover:text-white'
                    }`}
                    title="Warm Evening Lighting"
                  >
                    <Moon className="w-3 h-3" />
                    <span>Evening</span>
                  </button>
                  <button
                    onClick={() => setMood('sunset')}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded transition-colors ${
                      mood === 'sunset' ? 'bg-[#D4AF37] text-stone-950 font-semibold' : 'text-stone-400 hover:text-white'
                    }`}
                    title="Golden Sunset Glow"
                  >
                    <Sunset className="w-3 h-3" />
                    <span>Sunset</span>
                  </button>
                  <button
                    onClick={() => setMood('daylight')}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded transition-colors ${
                      mood === 'daylight' ? 'bg-[#D4AF37] text-stone-950 font-semibold' : 'text-stone-400 hover:text-white'
                    }`}
                    title="Natural Morning Daylight"
                  >
                    <Sun className="w-3 h-3" />
                    <span>Daylight</span>
                  </button>
                </div>
              </div>

              {/* Camera Presets */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold hidden sm:inline">
                  Inspect:
                </span>
                <div className="flex items-center gap-1 bg-stone-900/80 p-1 rounded border border-stone-800 overflow-x-auto">
                  <button
                    onClick={() => setCameraPreset('overview')}
                    className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap ${
                      currentView === 'overview' ? 'bg-white text-stone-950 font-semibold' : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    All Suite
                  </button>
                  <button
                    onClick={() => setCameraPreset('bed')}
                    className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap ${
                      currentView === 'bed' ? 'bg-white text-stone-950 font-semibold' : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    King Bed
                  </button>
                  <button
                    onClick={() => setCameraPreset('lounge')}
                    className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap ${
                      currentView === 'lounge' ? 'bg-white text-stone-950 font-semibold' : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    Lounge
                  </button>
                  <button
                    onClick={() => setCameraPreset('window')}
                    className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap ${
                      currentView === 'window' ? 'bg-white text-stone-950 font-semibold' : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    Balcony
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
