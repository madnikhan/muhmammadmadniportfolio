"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Grid, PerformanceMonitor } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type ConstellationProps = {
  nodeCount: number;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  enableParallax: boolean;
};

function DataPackets({
  connections,
}: {
  connections: number[];
}) {
  const ref = useRef<THREE.Points>(null);
  const count = Math.min(24, Math.floor(connections.length / 6));

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    return arr;
  }, [count]);

  const segments = useMemo(() => {
    const segs: { a: THREE.Vector3; b: THREE.Vector3 }[] = [];
    for (let i = 0; i + 5 < connections.length && segs.length < count; i += 6) {
      segs.push({
        a: new THREE.Vector3(connections[i], connections[i + 1], connections[i + 2]),
        b: new THREE.Vector3(connections[i + 3], connections[i + 4], connections[i + 5]),
      });
    }
    return segs;
  }, [connections, count]);

  useFrame((state) => {
    if (!ref.current || segments.length === 0) return;
    const t = state.clock.getElapsedTime();
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < segments.length; i++) {
      const u = (t * 0.35 + i * 0.17) % 1;
      const p = segments[i].a.clone().lerp(segments[i].b, u);
      pos.setXYZ(i, p.x, p.y, p.z);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#33ff99" size={0.06} sizeAttenuation transparent opacity={0.9} />
    </points>
  );
}

function SystemsConstellation({ nodeCount, pointer, enableParallax }: ConstellationProps) {
  const group = useRef<THREE.Group>(null);

  const { positions, connections } = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < nodeCount; i++) {
      const r = 1.2 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.65,
        r * Math.cos(phi),
      ]);
    }

    const connections: number[] = [];
    for (let i = 0; i < positions.length; i++) {
      const distances: { j: number; d: number }[] = [];
      for (let j = i + 1; j < positions.length; j++) {
        const dx = positions[i][0] - positions[j][0];
        const dy = positions[i][1] - positions[j][1];
        const dz = positions[i][2] - positions[j][2];
        distances.push({ j, d: dx * dx + dy * dy + dz * dz });
      }
      distances.sort((a, b) => a.d - b.d);
      for (const near of distances.slice(0, 2)) {
        if (near.d < 4.5) {
          connections.push(
            positions[i][0],
            positions[i][1],
            positions[i][2],
            positions[near.j][0],
            positions[near.j][1],
            positions[near.j][2],
          );
        }
      }
    }

    return { positions, connections };
  }, [nodeCount]);

  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(connections, 3));
    return geo;
  }, [connections]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    const px = enableParallax ? pointer.current.x * 0.35 : 0;
    const py = enableParallax ? pointer.current.y * 0.2 : 0;
    group.current.rotation.y = t * 0.1 + px;
    group.current.rotation.x = 0.15 + py;
  });

  return (
    <group ref={group} position={[0, 0.4, 0]}>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#33ff99" transparent opacity={0.28} />
      </lineSegments>
      <DataPackets connections={connections} />
      {positions.map((pos, i) => (
        <Float key={i} speed={1.1} rotationIntensity={0.15} floatIntensity={0.35}>
          <mesh position={pos}>
            <octahedronGeometry args={[i % 5 === 0 ? 0.07 : 0.04, 0]} />
            <meshStandardMaterial
              color={i % 5 === 0 ? "#33ff99" : "#6b8f7a"}
              emissive="#33ff99"
              emissiveIntensity={i % 5 === 0 ? 1.1 : 0.25}
              roughness={0.3}
              metalness={0.5}
            />
          </mesh>
        </Float>
      ))}
      {[
        [-1.8, 0.5, -0.4],
        [1.5, -0.3, 0.7],
        [0.1, 1.1, -1.3],
      ].map((pos, i) => (
        <Float key={`panel-${i}`} speed={0.7} floatIntensity={0.25}>
          <mesh position={pos as [number, number, number]} rotation={[0.35, 0.5 * i, 0.15]}>
            <planeGeometry args={[0.95, 0.58]} />
            <meshBasicMaterial color="#33ff99" wireframe transparent opacity={0.2} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export function HeroScene() {
  const [nodeCount, setNodeCount] = useState(36);
  const [visible, setVisible] = useState(true);
  const [enableParallax, setEnableParallax] = useState(false);
  const pointer = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setEnableParallax(!coarse);
    if (window.innerWidth < 768) setNodeCount(22);

    if (coarse) return;
    const onMove = (e: PointerEvent) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.2, 5.5], fov: 42 }}
        frameloop={visible ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#070b09"]} />
        <fog attach="fog" args={["#070b09", 5, 12]} />
        <ambientLight intensity={0.25} />
        <pointLight position={[4, 4, 5]} intensity={1.4} color="#33ff99" />
        <pointLight position={[-3, -1, 2]} intensity={0.4} color="#6b8f7a" />
        <Grid
          position={[0, -1.6, 0]}
          args={[12, 12]}
          cellSize={0.45}
          cellThickness={0.6}
          cellColor="#1a9960"
          sectionSize={2.25}
          sectionThickness={1.1}
          sectionColor="#33ff99"
          fadeDistance={10}
          fadeStrength={1.4}
          infiniteGrid
        />
        <PerformanceMonitor
          onDecline={() => setNodeCount((n) => Math.max(14, Math.floor(n * 0.7)))}
        />
        <SystemsConstellation
          nodeCount={nodeCount}
          pointer={pointer}
          enableParallax={enableParallax}
        />
      </Canvas>
    </div>
  );
}
