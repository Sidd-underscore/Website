"use client";

import { Vector3 } from "three";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  SpotLight,
  useDepthBuffer,
  Text3D,
  Center,
  OrbitControls,
} from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";

export default function LightshowSplash() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = Math.min(currentScroll / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      <div className="absolute top-0 right-0 left-0 z-10 h-[25vh] bg-linear-to-b from-neutral-50 to-transparent dark:from-neutral-950 dark:to-transparent" />
      <div
        style={{
          backgroundImage: "url(/images/projects/lightshows/teasder.jpg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 2, 5], fov: 90, near: 1, far: 20 }}
          style={{ width: "100vw", height: "100vh" }}
        >
          <fog attach="fog" args={["#202020", 5, 20]} />
          <ambientLight intensity={0.1} />
          <Scene scrollProgress={scrollProgress} />
        </Canvas>
      </div>
      <div className="absolute right-0 bottom-0 left-0 z-10 h-[25vh] bg-linear-to-t from-neutral-50 to-transparent dark:from-neutral-950 dark:to-transparent" />
    </div>
  );
}

function Scene({ scrollProgress }) {
  const depthBuffer = useDepthBuffer({ frames: 1 });
  const { viewport } = useThree();

  // Calculate responsive text size based on viewport
  const textSize = Math.min(viewport.width, viewport.height) * 0.15;

  const textSpring = useSpring({
    scale: [1, 1, 1],
    rotation: [scrollProgress * Math.PI * 0.5, 0, 0],
    config: { mass: 2, tension: 200, friction: 50 },
  });

  return (
    <>
      <ambientLight intensity={0.5} />

      <directionalLight position={[5, 5, 5]} intensity={0.25} castShadow />

      <MovingSpot
        depthBuffer={depthBuffer}
        color="#00bc09"
        position={[viewport.width / 2, viewport.height / 2, -1]}
      />
      <MovingSpot
        depthBuffer={depthBuffer}
        color="#ba87a8"
        position={[-viewport.width / 2, viewport.height / 2, -1]}
      />

      <Center scale={[1, 1, 1]} position={[0, viewport.height * 0.1, -2]}>
        <animated.group {...textSpring}>
          <Text3D
            font="/fonts/archivo.typeface.json"
            size={textSize}
            height={textSize * 0.2}
            bevelEnabled
            bevelSize={textSize * 0.02}
            bevelOffset={0}
            bevelSegments={5}
            letterSpacing={-0.03}
            textAlign="center"
          >
            Lightshows
            <meshStandardMaterial
              color="#FFD1DF"
              metalness={0.1}
              roughness={2}
            />
          </Text3D>
        </animated.group>
      </Center>

      <mesh receiveShadow position={[0, -1, 0]} rotation-x={-Math.PI / 2}>
        <meshPhongMaterial />
      </mesh>
    </>
  );
}

function MovingSpot({ vec = new Vector3(), ...props }) {
  const light = useRef();
  const viewport = useThree((state) => state.viewport);
  useFrame((state) => {
    light.current.target.position.lerp(
      vec.set(
        (state.pointer.x * viewport.width) / 2,
        (state.pointer.y * viewport.height) / 2,
        0,
      ),
      0.1,
    );
    light.current.target.updateMatrixWorld();
  });
  return (
    <SpotLight
      castShadow
      ref={light}
      penumbra={1}
      distance={30}
      angle={0.35}
      attenuation={8}
      anglePower={2}
      intensity={5}
      {...props}
    />
  );
}
