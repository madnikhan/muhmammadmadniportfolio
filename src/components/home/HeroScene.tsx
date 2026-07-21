"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerformanceMonitor } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type SystemsConstellationProps = {
  nodeCount: number;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
};

function SystemsConstellation({ nodeCount, pointer }: SystemsConstellationProps) {
  const group = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.LineSegments>(null);

  const { positions, connections } = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < nodeCount; i++) {
      const r = 1.2 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.7,
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
    group.current.rotation.y = t * 0.08 + pointer.current.x * 0.35;
    group.current.rotation.x = pointer.current.y * 0.2;
  });

  return (
    <group ref={group}>
      <lineSegments ref={lineRef} geometry={lineGeo}>
        <lineBasicMaterial color="#0d9488" transparent opacity={0.35} />
      </lineSegments>
      {positions.map((pos, i) => (
        <Float key={i} speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
          <mesh position={pos}>
            <icosahedronGeometry args={[i % 5 === 0 ? 0.08 : 0.045, 0]} />
            <meshStandardMaterial
              color={i % 5 === 0 ? "#14b8a6" : "#94a3b8"}
              emissive={i % 5 === 0 ? "#0d9488" : "#1e293b"}
              emissiveIntensity={i % 5 === 0 ? 0.85 : 0.2}
              roughness={0.35}
              metalness={0.4}
            />
          </mesh>
        </Float>
      ))}
      {/* Abstract wireframe panels */}
      {[
        [-1.8, 0.6, -0.5],
        [1.6, -0.4, 0.8],
        [0.2, 1.2, -1.4],
      ].map((pos, i) => (
        <Float key={`panel-${i}`} speed={0.8} floatIntensity={0.3}>
          <mesh position={pos as [number, number, number]} rotation={[0.4, 0.6 * i, 0.2]}>
            <planeGeometry args={[0.9, 0.55]} />
            <meshBasicMaterial color="#14b8a6" wireframe transparent opacity={0.22} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export function HeroScene() {
  const [nodeCount, setNodeCount] = useState(42);
  const [visible, setVisible] = useState(true);
  const pointer = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      pointer.current = { x, y };
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) setNodeCount(28);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        frameloop={visible ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#0b1220"]} />
        <fog attach="fog" args={["#0b1220", 4.5, 11]} />
        <ambientLight intensity={0.35} />
        <pointLight position={[4, 3, 5]} intensity={1.2} color="#14b8a6" />
        <pointLight position={[-4, -2, 2]} intensity={0.5} color="#64748b" />
        <PerformanceMonitor
          onDecline={() => setNodeCount((n) => Math.max(18, Math.floor(n * 0.7)))}
        />
        <SystemsConstellation nodeCount={nodeCount} pointer={pointer} />
      </Canvas>
    </div>
  );
}
