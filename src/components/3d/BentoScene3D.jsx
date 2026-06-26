import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Animated bar chart for "Real-time Analytics" ─────────────────────────── */
function ChartScene() {
  const refs = useRef([]);
  const HEIGHTS = [0.5, 0.85, 0.6, 1.0, 0.75];

  useFrame(({ clock }) => {
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const target = HEIGHTS[i] + Math.sin(clock.elapsedTime * 1.6 + i * 0.9) * 0.12;
      mesh.scale.y   = THREE.MathUtils.lerp(mesh.scale.y, target, 0.08);
      mesh.position.y = mesh.scale.y * 0.5 - 0.5;
    });
  });

  return (
    <group position={[0, -0.5, 0]}>
      {HEIGHTS.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (refs.current[i] = el)}
          position={[(i - 2) * 0.38, 0, 0]}
        >
          <boxGeometry args={[0.26, 1, 0.26]} />
          <meshBasicMaterial color={i === 3 ? '#FFC801' : '#114C5A'} transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Neural network for "AI Insights" ─────────────────────────────────────── */
function NeuralScene() {
  const groupRef  = useRef();
  const nodes     = useMemo(() => [
    new THREE.Vector3( 0,    0.8,  0),
    new THREE.Vector3(-0.8, -0.3,  0.3),
    new THREE.Vector3( 0.8, -0.3,  0.3),
    new THREE.Vector3( 0,   -0.3, -0.6),
    new THREE.Vector3( 0,    0,    0),
  ], []);

  const lineGeo = useMemo(() => {
    const points = [];
    nodes.forEach((a, i) => nodes.forEach((b, j) => {
      if (i < j) points.push(...a.toArray(), ...b.toArray());
    }));
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    return g;
  }, [nodes]);

  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.y = clock.elapsedTime * 0.6;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[i === 4 ? 0.14 : 0.1, 8, 8]} />
          <meshBasicMaterial color={i === 4 ? '#FFC801' : '#FF9932'} />
        </mesh>
      ))}
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#FFC801" transparent opacity={0.4} />
      </lineSegments>
    </group>
  );
}

/* ── Orbiting spheres for "Team Collaboration" ────────────────────────────── */
function TeamScene() {
  const groupRef = useRef();
  const orbits   = useRef([]);

  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.y = clock.elapsedTime * 0.4;
    orbits.current.forEach((m, i) => {
      if (!m) return;
      const t = clock.elapsedTime + (i * Math.PI * 2) / 3;
      m.position.x = Math.cos(t) * 0.75;
      m.position.z = Math.sin(t) * 0.75;
    });
  });

  return (
    <group ref={groupRef}>
      {/* Central hub */}
      <mesh>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshBasicMaterial color="#FFC801" />
      </mesh>
      {/* Orbiting moons */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} ref={(el) => (orbits.current[i] = el)}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color="#114C5A" />
        </mesh>
      ))}
    </group>
  );
}

/* ── Grid of cubes for "Custom Dashboards" ────────────────────────────────── */
function GridScene() {
  const refs = useRef([]);
  const GRID = 3;

  useFrame(({ clock }) => {
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const row = Math.floor(i / GRID);
      const col = i % GRID;
      const s = 0.85 + Math.sin(clock.elapsedTime * 1.2 + row * 0.8 + col * 0.6) * 0.15;
      mesh.scale.setScalar(s);
    });
  });

  return (
    <group>
      {Array.from({ length: GRID * GRID }, (_, i) => {
        const row = Math.floor(i / GRID) - 1;
        const col = (i % GRID) - 1;
        return (
          <mesh
            key={i}
            ref={(el) => (refs.current[i] = el)}
            position={[col * 0.52, row * 0.52, 0]}
          >
            <boxGeometry args={[0.35, 0.35, 0.35]} />
            <meshBasicMaterial
              color={(row + col) % 2 === 0 ? '#FFC801' : '#114C5A'}
              transparent
              opacity={0.85}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ── Rotating shield ring for "Enterprise Security" ────────────────────────── */
function ShieldScene() {
  const outerRef = useRef();
  const innerRef = useRef();

  useFrame((_, delta) => {
    if (outerRef.current) outerRef.current.rotation.z += delta * 1.0;
    if (innerRef.current) innerRef.current.rotation.z -= delta * 0.7;
  });

  return (
    <group>
      <mesh ref={outerRef}>
        <torusGeometry args={[0.8, 0.05, 8, 40]} />
        <meshBasicMaterial color="#FFC801" transparent opacity={0.9} />
      </mesh>
      <mesh ref={innerRef}>
        <torusGeometry args={[0.55, 0.04, 8, 40]} />
        <meshBasicMaterial color="#114C5A" transparent opacity={0.8} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.25, 12, 12]} />
        <meshBasicMaterial color="#FFC801" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

/* ── Connected network for "200+ Integrations" ────────────────────────────── */
function ConnectScene() {
  const groupRef = useRef();
  const hubs     = useMemo(() => [
    new THREE.Vector3( 0,    0,    0),
    new THREE.Vector3( 0.8,  0.4,  0.3),
    new THREE.Vector3(-0.8,  0.4, -0.3),
    new THREE.Vector3( 0,   -0.9,  0.2),
    new THREE.Vector3( 0.6, -0.4, -0.6),
    new THREE.Vector3(-0.5, -0.3,  0.7),
  ], []);

  const lineGeo = useMemo(() => {
    const pts = [];
    hubs.forEach((a, i) => hubs.forEach((b, j) => {
      if (i < j && a.distanceTo(b) < 1.4) pts.push(...a.toArray(), ...b.toArray());
    }));
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, [hubs]);

  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.y = clock.elapsedTime * 0.5;
  });

  return (
    <group ref={groupRef}>
      {hubs.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[i === 0 ? 0.14 : 0.09, 8, 8]} />
          <meshBasicMaterial color={i === 0 ? '#FFC801' : '#FF9932'} />
        </mesh>
      ))}
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#FFC801" transparent opacity={0.35} />
      </lineSegments>
    </group>
  );
}

/* ── Scene map ─────────────────────────────────────────────────────────────── */
const SCENES = {
  chart:   ChartScene,
  brain:   NeuralScene,
  team:    TeamScene,
  grid:    GridScene,
  shield:  ShieldScene,
  connect: ConnectScene,
};

/* ── Public export ─────────────────────────────────────────────────────────── */
export default function BentoScene3D({ icon }) {
  const SceneComponent = SCENES[icon] ?? ChartScene;

  return (
    <Canvas
      camera={{ position: [0, 0, 2.8], fov: 42 }}
      dpr={[1, 1]}
      gl={{ antialias: false, alpha: true, powerPreference: 'default' }}
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      <ambientLight intensity={1} />
      <pointLight position={[3, 3, 3]} intensity={1.5} />
      <SceneComponent />
    </Canvas>
  );
}
