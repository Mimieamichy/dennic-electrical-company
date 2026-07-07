import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Instances, Instance, Line, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const NAVY = "#1D2B44";
const NAVY_DEEP = "#0d1524";
const VOLT = "#F4C430";
const STEEL = "#7a8699";

/* ============ Ground ============ */
function Ground() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color={NAVY_DEEP} roughness={0.9} metalness={0.1} />
      </mesh>
      <gridHelper args={[200, 80, VOLT, "#22314f"]} position={[0, -1.49, 0]} />
    </group>
  );
}

/* ============ Blueprint hologram (Scene 1) ============ */
function Blueprint({ progress }: { progress: number }) {
  // progress 0..1 controls assembly
  const group = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!group.current) return;
    group.current.rotation.y += dt * 0.15;
  });
  const lines = useMemo(() => {
    const arr: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = -4; i <= 4; i++) {
      arr.push([new THREE.Vector3(i, 0, -4), new THREE.Vector3(i, 0, 4)]);
      arr.push([new THREE.Vector3(-4, 0, i), new THREE.Vector3(4, 0, i)]);
    }
    // circuit nodes
    for (let i = 0; i < 12; i++) {
      const a = new THREE.Vector3(Math.cos(i) * 3, Math.sin(i * 1.3) * 0.4, Math.sin(i) * 3);
      const b = new THREE.Vector3(Math.cos(i + 0.7) * 2, Math.sin(i * 1.9) * 0.6, Math.sin(i + 0.7) * 2);
      arr.push([a, b]);
    }
    return arr;
  }, []);
  return (
    <group ref={group} position={[0, 1.6, 0]} scale={1 - (1 - progress) * 0.4}>
      {lines.map((pts, i) => {
        const show = i / lines.length < progress;
        return show ? (
          <Line key={i} points={pts} color={VOLT} lineWidth={1} transparent opacity={0.75} />
        ) : null;
      })}
      {/* nodes */}
      {Array.from({ length: 20 }).map((_, i) => {
        const a = (i / 20) * Math.PI * 2;
        const r = 2.5 + Math.sin(i) * 0.6;
        const show = i / 20 < progress;
        return show ? (
          <mesh key={i} position={[Math.cos(a) * r, Math.sin(i * 1.7) * 0.5, Math.sin(a) * r]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshBasicMaterial color={VOLT} />
          </mesh>
        ) : null;
      })}
    </group>
  );
}

/* ============ Structural steel + foundations (Scene 2) ============ */
function Structures({ progress }: { progress: number }) {
  const beams = useMemo(() => {
    const arr: { pos: [number, number, number]; h: number }[] = [];
    for (let x = -6; x <= 6; x += 3) {
      for (let z = -3; z <= 3; z += 3) {
        arr.push({ pos: [x, 0, z], h: 1.6 + Math.random() * 1.4 });
      }
    }
    return arr;
  }, []);
  return (
    <group>
      {beams.map((b, i) => {
        const p = Math.min(1, Math.max(0, progress * beams.length - i));
        const h = b.h * p;
        if (h < 0.02) return null;
        return (
          <group key={i} position={b.pos as any}>
            {/* foundation */}
            <mesh position={[0, -1.35, 0]}>
              <boxGeometry args={[0.9, 0.3, 0.9]} />
              <meshStandardMaterial color="#3a4257" roughness={0.9} />
            </mesh>
            {/* beam */}
            <mesh position={[0, -1.2 + h / 2, 0]} castShadow>
              <boxGeometry args={[0.18, h, 0.18]} />
              <meshStandardMaterial color={STEEL} metalness={0.7} roughness={0.35} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* ============ Transformers / switchgear (Scene 3) ============ */
function Transformer({ position, progress }: { position: [number, number, number]; progress: number }) {
  const y = -1.2 + progress * 0.9;
  const pulse = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (pulse.current) {
      const s = 1 + Math.sin(clock.elapsedTime * 3) * 0.15;
      pulse.current.scale.set(s, s, s);
      (pulse.current.material as THREE.MeshBasicMaterial).opacity = progress > 0.9 ? 0.6 : 0;
    }
  });
  return (
    <group position={[position[0], y, position[2]]} scale={progress}>
      {/* base */}
      <mesh castShadow>
        <boxGeometry args={[1.4, 1.4, 1.0]} />
        <meshStandardMaterial color="#4a5468" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* fins */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[-0.72, 0, -0.4 + i * 0.16]}>
          <boxGeometry args={[0.05, 1.2, 0.1]} />
          <meshStandardMaterial color="#39435a" metalness={0.7} roughness={0.4} />
        </mesh>
      ))}
      {/* insulators */}
      {[-0.4, 0, 0.4].map((x) => (
        <group key={x} position={[x, 0.9, 0]}>
          <mesh>
            <cylinderGeometry args={[0.08, 0.1, 0.5, 12]} />
            <meshStandardMaterial color="#d9d9d9" />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <sphereGeometry args={[0.09, 12, 12]} />
            <meshStandardMaterial color={VOLT} emissive={VOLT} emissiveIntensity={progress > 0.9 ? 2 : 0.1} />
          </mesh>
        </group>
      ))}
      <mesh ref={pulse} position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color={VOLT} transparent opacity={0} />
      </mesh>
    </group>
  );
}

/* ============ Utility poles + wires (all scenes) ============ */
function Poles({ energized }: { energized: number }) {
  const poles = useMemo(() => [-14, -10, -6, 6, 10, 14].map((x) => x), []);
  return (
    <group>
      {poles.map((x, i) => (
        <group key={i} position={[x, 0, -4]}>
          <mesh castShadow position={[0, 1.2, 0]}>
            <cylinderGeometry args={[0.08, 0.1, 3.6, 8]} />
            <meshStandardMaterial color="#2a2f3d" roughness={0.9} />
          </mesh>
          <mesh position={[0, 2.7, 0]}>
            <boxGeometry args={[1.6, 0.08, 0.08]} />
            <meshStandardMaterial color="#3a4257" />
          </mesh>
        </group>
      ))}
      {/* wires */}
      {poles.slice(0, -1).map((x, i) => {
        const x2 = poles[i + 1];
        return [0.25, 0, -0.25].map((yo, j) => (
          <Line
            key={`${i}-${j}`}
            points={[
              [x, 2.7 + yo, -4],
              [(x + x2) / 2, 2.5 + yo, -4],
              [x2, 2.7 + yo, -4],
            ]}
            color={energized > 0.5 ? VOLT : "#3a4257"}
            lineWidth={energized > 0.5 ? 1.4 : 1}
            transparent
            opacity={0.9}
          />
        ));
      })}
    </group>
  );
}

/* ============ Transmission towers ============ */
function Tower({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* legs */}
      {[-0.6, 0.6].map((x) =>
        [-0.6, 0.6].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 1.6, z]}>
            <cylinderGeometry args={[0.05, 0.08, 3.6, 6]} />
            <meshStandardMaterial color={STEEL} metalness={0.7} roughness={0.4} />
          </mesh>
        ))
      )}
      {/* crossarms */}
      {[2.4, 3.0, 3.6].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <boxGeometry args={[2.4 - i * 0.3, 0.05, 0.05]} />
          <meshStandardMaterial color={STEEL} metalness={0.7} />
        </mesh>
      ))}
      {/* top */}
      <mesh position={[0, 3.9, 0]}>
        <coneGeometry args={[0.2, 0.4, 6]} />
        <meshStandardMaterial color={STEEL} metalness={0.7} />
      </mesh>
    </group>
  );
}

/* ============ Wind turbines ============ */
function WindTurbine({ position, speed = 0.6 }: { position: [number, number, number]; speed?: number }) {
  const rotor = useRef<THREE.Group>(null);
  useFrame((_, dt) => { if (rotor.current) rotor.current.rotation.z += dt * speed; });
  return (
    <group position={position}>
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 4, 10]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>
      <group ref={rotor} position={[0, 4, 0.15]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI * 2) / 3]} position={[0, 0.7, 0]}>
            <boxGeometry args={[0.08, 1.5, 0.05]} />
            <meshStandardMaterial color="#f3f4f6" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ============ Particles / sparks ============ */
function Particles({ intensity }: { intensity: number }) {
  const count = 400;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 1] = Math.random() * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);
  const ref = useRef<THREE.Points>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i);
      y += dt * 0.25;
      if (y > 6) y = 0;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
  });
  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial size={0.03 + intensity * 0.02} color={VOLT} transparent opacity={0.25 + intensity * 0.5} depthWrite={false} />
    </Points>
  );
}

/* ============ Energy pulse along cable ============ */
function EnergyPulse({ energized }: { energized: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.elapsedTime * 2) % 20;
    ref.current.position.x = -10 + t;
    (ref.current.material as THREE.MeshBasicMaterial).opacity = energized;
  });
  return (
    <mesh ref={ref} position={[0, 2.7, -4]}>
      <sphereGeometry args={[0.1, 12, 12]} />
      <meshBasicMaterial color={VOLT} transparent opacity={0} />
    </mesh>
  );
}

/* ============ Camera rig ============ */
function CameraRig({ progress }: { progress: number }) {
  useFrame(({ camera, mouse }) => {
    // Camera path across 6 scenes
    const p = progress; // 0..1
    // Positions per scene
    const path: [number, number, number][] = [
      [0, 2.2, 9],   // s1 blueprint
      [-8, 3, 8],    // s2 structures
      [-2, 1.6, 5],  // s3 install
      [2, 2.2, 7],   // s4 distribution
      [6, 4, 12],    // s5 network
      [0, 5, 16],    // s6 reveal
    ];
    const seg = p * (path.length - 1);
    const i = Math.floor(seg);
    const f = seg - i;
    const a = path[Math.min(i, path.length - 1)];
    const b = path[Math.min(i + 1, path.length - 1)];
    const px = a[0] + (b[0] - a[0]) * f;
    const py = a[1] + (b[1] - a[1]) * f;
    const pz = a[2] + (b[2] - a[2]) * f;
    // Subtle parallax with mouse
    camera.position.x += (px + mouse.x * 0.6 - camera.position.x) * 0.06;
    camera.position.y += (py + mouse.y * 0.3 - camera.position.y) * 0.06;
    camera.position.z += (pz - camera.position.z) * 0.06;
    camera.lookAt(0, 1.2, 0);
  });
  return null;
}

/* ============ Scene ============ */
function Scene({ progress }: { progress: number }) {
  // progress 0..1 across full hero
  const s1 = THREE.MathUtils.clamp(progress * 6, 0, 1);         // 0.00–0.17
  const s2 = THREE.MathUtils.clamp(progress * 6 - 1, 0, 1);     // 0.17–0.33
  const s3 = THREE.MathUtils.clamp(progress * 6 - 2, 0, 1);
  const s4 = THREE.MathUtils.clamp(progress * 6 - 3, 0, 1);
  const s5 = THREE.MathUtils.clamp(progress * 6 - 4, 0, 1);
  // s6 handled via camera + reveal

  return (
    <>
      <CameraRig progress={progress} />
      <color attach="background" args={[NAVY_DEEP]} />
      <fog attach="fog" args={[NAVY_DEEP, 12, 55]} />

      <ambientLight intensity={0.35} color="#6b7dad" />
      <directionalLight position={[6, 10, 6]} intensity={0.9} color="#fff2c8" castShadow />
      <pointLight position={[-6, 4, 4]} intensity={0.7} color={VOLT} distance={20} />
      <pointLight position={[8, 5, -4]} intensity={0.5} color="#4a6bff" distance={22} />

      <Ground />
      <Poles energized={s4} />
      <EnergyPulse energized={s4} />

      {/* Scene 1 */}
      {s1 > 0 && s1 < 1.001 && (
        <Float floatIntensity={0.4} rotationIntensity={0.2} speed={1.2}>
          <Blueprint progress={s1} />
        </Float>
      )}

      {/* Scene 2 */}
      {s2 > 0 && <Structures progress={s2} />}

      {/* Scene 3 - transformers */}
      {s3 > 0 && (
        <>
          <Transformer position={[-3, 0, 0]} progress={s3} />
          <Transformer position={[0, 0, 0]} progress={s3} />
          <Transformer position={[3, 0, 0]} progress={s3} />
        </>
      )}

      {/* Scene 4-5 - towers, turbines */}
      {s4 > 0.2 && (
        <>
          <Tower position={[-10, -1.5, -8]} />
          <Tower position={[10, -1.5, -8]} />
          <Tower position={[0, -1.5, -14]} />
        </>
      )}
      {s5 > 0 && (
        <>
          <WindTurbine position={[-14, -1.5, -12]} speed={0.5} />
          <WindTurbine position={[-18, -1.5, -8]} speed={0.7} />
          <WindTurbine position={[15, -1.5, -14]} speed={0.4} />
        </>
      )}

      <Particles intensity={Math.max(s2, s4)} />

      <Environment preset="night" />
    </>
  );
}

export function HeroScene({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const [p, setP] = useReactiveProgress(progressRef);
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 2.2, 9], fov: 42 }}
      className="!fixed inset-0"
    >
      <Suspense fallback={null}>
        <Scene progress={p} />
      </Suspense>
    </Canvas>
  );
}

// Bridge the imperative ref into React state via rAF
import { useEffect, useState } from "react";
function useReactiveProgress(ref: React.MutableRefObject<number>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setP((prev) => prev + (ref.current - prev) * 0.12);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ref]);
  return [p, setP] as const;
}
