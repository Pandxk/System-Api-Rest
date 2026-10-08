import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

export type Palette = { top: string; bottom: string; cloud: string };

/* ---------- Animated cloud background (shader) ---------- */
const vert = `varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.,1.); }`;
const frag = `
uniform float uTime; uniform vec3 uTop; uniform vec3 uBottom; uniform vec3 uCloud; varying vec2 vUv;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<6;i++){v+=a*noise(p);p*=2.02;a*=.5;}return v;}
void main(){
 vec2 p=vUv*vec2(3.,1.6); float t=uTime*.03;
 float n=fbm(p+vec2(t,t*.3)+fbm(p*1.5-t)*.6);
 vec3 sky=mix(uBottom,uTop,vUv.y);
 float c=smoothstep(.45,.85,n);
 gl_FragColor=vec4(mix(sky,uCloud,c*.85),1.);
}`;

function Clouds({ palette }: { palette: Palette }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTop: { value: new THREE.Color(palette.top) },
      uBottom: { value: new THREE.Color(palette.bottom) },
      uCloud: { value: new THREE.Color(palette.cloud) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const target = useMemo(
    () => ({ top: new THREE.Color(), bottom: new THREE.Color(), cloud: new THREE.Color() }),
    [],
  );
  useFrame((_, dt) => {
    uniforms.uTime.value += dt;
    const k = Math.min(1, dt * 2);
    uniforms.uTop.value.lerp(target.top.set(palette.top), k);
    uniforms.uBottom.value.lerp(target.bottom.set(palette.bottom), k);
    uniforms.uCloud.value.lerp(target.cloud.set(palette.cloud), k);
  });
  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={mat} vertexShader={vert} fragmentShader={frag} uniforms={uniforms} depthWrite={false} />
    </mesh>
  );
}

export function CloudBackground({ palette }: { palette: Palette }) {
  return (
    <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
      <Clouds palette={palette} />
    </Canvas>
  );
}

/* ---------- Glasses model ---------- */
function GLBModel({ url, lens }: { url: string; lens: string }) {
  const { scene } = useGLTF(url);
  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((node) => {
      if (node instanceof THREE.Mesh && node.name.startsWith("lens")) {
        node.material = node.material.clone();
        node.material.color.set(lens);
      }
    });
    return clone;
  }, [scene, lens]);
  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    return 3 / Math.max(size.x, size.y, size.z || 1);
  }, [scene]);
  return (
    <Center>
      <primitive object={model} scale={scale} />
    </Center>
  );
}

function FallbackGlasses({ lens }: { lens: string }) {
  const g = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (g.current) g.current.position.y = Math.sin(s.clock.elapsedTime) * 0.05;
  });
  const metal = <meshStandardMaterial color="#c9ccd1" metalness={1} roughness={0.15} />;
  return (
    <Center>
      <group ref={g}>
        {[-0.75, 0.75].map((x) => (
          <group key={x} position={[x, 0, 0]}>
            <mesh>
              <torusGeometry args={[0.6, 0.045, 24, 96]} />
              {metal}
            </mesh>
            <mesh>
              <circleGeometry args={[0.58, 64]} />
              <meshPhysicalMaterial color={lens} transmission={0.6} roughness={0.05} metalness={0.2} transparent opacity={0.75} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[x > 0 ? 0.6 : -0.6, 0.1, -0.6]} rotation={[0, Math.PI / 2, 0]}>
              <boxGeometry args={[1.2, 0.05, 0.03]} />
              {metal}
            </mesh>
          </group>
        ))}
        <mesh position={[0, 0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.16, 0.035, 16, 48, Math.PI]} />
          {metal}
        </mesh>
      </group>
    </Center>
  );
}

class ModelBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { err: boolean }> {
  override state = { err: false };
  static getDerivedStateFromError() {
    return { err: true };
  }
  override render() {
    return this.state.err ? this.props.fallback : this.props.children;
  }
}

function FitCamera() {
  const { camera, size } = useThree();
  const aspect = size.width / size.height;
  camera.position.setLength(Math.max(4.5, 5.2 / aspect));
  camera.updateProjectionMatrix();
  return null;
}

export function GlassesViewer({ url, lens, mini = false }: { url: string; lens: string; mini?: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry?.isIntersecting ?? false));
    if (container.current) observer.observe(container.current);
    return () => { observer.disconnect(); query.removeEventListener("change", update); };
  }, []);
  const fb = <FallbackGlasses lens={lens} />;
  return (
    <div ref={container} className="h-full w-full" aria-label="Vista 3D de gafas">
    <Canvas camera={{ position: [0, 0.7, 5.2], fov: 40 }} dpr={mini ? 1 : [1, 1.5]} gl={{ alpha: true, antialias: !mini, powerPreference: "low-power" }} frameloop={visible ? "always" : "never"}>
      <FitCamera />
      <ambientLight intensity={1.8} />
      <directionalLight position={[3, 4, 5]} intensity={3} />
      <directionalLight position={[-3, 2, -2]} intensity={2} />
      <Suspense fallback={null}>
        <ModelBoundary key={url} fallback={fb}>
          <Suspense fallback={fb}>
            <GLBModel url={url} lens={lens} />
          </Suspense>
        </ModelBoundary>
      </Suspense>
      <OrbitControls makeDefault enablePan={false} enableZoom={!mini} enableRotate={!mini} minDistance={2.5} maxDistance={14} autoRotate={!reducedMotion && visible} autoRotateSpeed={mini ? 0.65 : 0.8} />
    </Canvas>
    </div>
  );
}
