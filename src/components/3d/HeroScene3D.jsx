import React, { useRef, useMemo, useEffect, Suspense, lazy } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── Globe ───────────────────────────────────────────────────────────────── */
function Globe() {
  const outerRef = useRef();
  const innerRef = useRef();

  useFrame((_, delta) => {
    if (outerRef.current) outerRef.current.rotation.y += delta * 0.12;
    if (innerRef.current) innerRef.current.rotation.y -= delta * 0.06;
  });

  return (
    <group>
      {/* Solid inner core */}
      <mesh>
        <sphereGeometry args={[1.95, 32, 32]} />
        <meshBasicMaterial color="#172B36" transparent opacity={0.4} />
      </mesh>
      {/* Primary wireframe */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[2.2, 5]} />
        <meshBasicMaterial wireframe color="#114C5A" transparent opacity={0.22} />
      </mesh>
      {/* Secondary accent wireframe */}
      <mesh ref={innerRef} scale={1.08}>
        <icosahedronGeometry args={[2.2, 3]} />
        <meshBasicMaterial wireframe color="#FFC801" transparent opacity={0.06} />
      </mesh>
      {/* Soft glow halo */}
      <mesh scale={1.18}>
        <sphereGeometry args={[2.2, 16, 16]} />
        <meshBasicMaterial color="#FFC801" transparent opacity={0.018} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

/* ─── Floating Particles ──────────────────────────────────────────────────── */
function Particles({ count = 2200 }) {
  const ref = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r     = 3.5 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.018;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.016}
        color="#FFC801"
        sizeAttenuation
        transparent
        opacity={0.42}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── AI Network Nodes ────────────────────────────────────────────────────── */
function NetworkNodes({ count = 22 }) {
  const groupRef  = useRef();
  const meshRef   = useRef();
  const dummy     = useMemo(() => new THREE.Object3D(), []);

  const { positions, linePositions } = useMemo(() => {
    const positions = Array.from({ length: count }, () => {
      const phi   = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r     = 2.8 + Math.random() * 2.2;
      return new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      );
    });

    const linePoints = [];
    const MAX_DIST   = 2.4;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (positions[i].distanceTo(positions[j]) < MAX_DIST) {
          linePoints.push(...positions[i].toArray(), ...positions[j].toArray());
        }
      }
    }
    return { positions, linePositions: new Float32Array(linePoints) };
  }, [count]);

  /* Set instanced mesh matrices once */
  useEffect(() => {
    if (!meshRef.current) return;
    positions.forEach((pos, i) => {
      dummy.position.copy(pos);
      dummy.scale.setScalar(0.042 + Math.random() * 0.028);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions, dummy]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.07;
  });

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    return g;
  }, [linePositions]);

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#FFC801" />
      </instancedMesh>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#FFC801" transparent opacity={0.18} />
      </lineSegments>
    </group>
  );
}

/* ─── Floating Data Cards ─────────────────────────────────────────────────── */
function FloatingCard({ position, rotation, delay = 0 }) {
  const ref = useRef();
  const [px, py, pz] = position;

  const edgeGeo = useMemo(
    () => new THREE.EdgesGeometry(new THREE.PlaneGeometry(1.6, 0.85)),
    [],
  );

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime + delay;
    ref.current.position.y = py + Math.sin(t * 0.65) * 0.14;
    ref.current.rotation.z = rotation[2] + Math.sin(t * 0.42) * 0.025;
  });

  return (
    <group ref={ref} position={position} rotation={rotation}>
      {/* Glass plane */}
      <mesh>
        <planeGeometry args={[1.6, 0.85]} />
        <meshBasicMaterial
          color="#114C5A"
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Border */}
      <lineSegments geometry={edgeGeo}>
        <lineBasicMaterial color="#FFC801" transparent opacity={0.35} />
      </lineSegments>
    </group>
  );
}

/* ─── Mouse-parallax scene root ───────────────────────────────────────────── */
function SceneRoot() {
  const groupRef = useRef();
  const mouse    = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e) => {
      mouse.current.x =  (e.clientX / window.innerWidth)  * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x, mouse.current.y * -0.12, 0.035,
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y, mouse.current.x *  0.12, 0.035,
    );
  });

  return (
    <group ref={groupRef}>
      <Globe />
      <Particles count={2200} />
      <NetworkNodes count={22} />
      <FloatingCard position={[ 3.8,  1.1, -1.5]} rotation={[0.1, -0.3,  0.08]} delay={0}   />
      <FloatingCard position={[ 4.2, -0.9, -2.2]} rotation={[0.05,-0.25,-0.06]} delay={1.4} />
      <FloatingCard position={[-4.0,  0.4, -1.8]} rotation={[0.08, 0.28, 0.07]} delay={2.2} />
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 6, 6]}   color="#FFC801" intensity={2.5} />
      <pointLight position={[-6,-4,-6]}  color="#114C5A" intensity={1.5} />
    </group>
  );
}

/* ─── Public export — wrapped in Canvas ───────────────────────────────────── */
export default function HeroScene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8.5], fov: 48, near: 0.1, far: 100 }}
      dpr={[1, 1.5]}
      gl={{
        antialias:       false,
        powerPreference: 'high-performance',
        alpha:           true,
      }}
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      <SceneRoot />
    </Canvas>
  );
}
