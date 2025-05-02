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
import ColorThief from "colorthief";

const BACKGROUND_IMAGES = [
  "/images/projects/lightshows/snapshots/rainbow.jpg",
  "/images/projects/lightshows/snapshots/audience-pov.jpg",
  "/images/projects/lightshows/snapshots/green-purple-pink.jpg",
  "/images/projects/lightshows/snapshots/lasers.jpg",
  "/images/projects/lightshows/snapshots/purple-pink.jpg",
  "/images/projects/lightshows/snapshots/teaser.jpg",
  "/images/projects/lightshows/snapshots/sides.png",
  "/images/projects/lightshows/snapshots/movement-is-going-good.png",
  "/images/projects/lightshows/snapshots/better-1.jpg",
  "/images/projects/lightshows/snapshots/better-6.jpg",
];

function rgbToHex([r, g, b]) {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

export default function LightshowSplash() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dominantColors, setDominantColors] = useState([
    "#00bc09",
    "#ba87a8",
    "#FFD1DF",
  ]);

  const extractColors = async (imageUrl) => {
    const colorThief = new ColorThief();
    const img = new Image();
    img.crossOrigin = "Anonymous";

    return new Promise((resolve) => {
      img.onload = () => {
        const palette = colorThief.getPalette(img, 3);
        resolve(palette.map(rgbToHex));
      };
      img.src = imageUrl;
    });
  };

  useEffect(() => {
    const updateColors = async () => {
      try {
        const colors = await extractColors(
          BACKGROUND_IMAGES[currentImageIndex],
        );
        setDominantColors(colors);
      } catch (error) {
        console.error("Error extracting colors:", error);
      }
    };
    updateColors();
  }, [currentImageIndex]);

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

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      <div className="absolute top-0 right-0 left-0 z-10 h-[25vh] bg-linear-to-b from-neutral-50 to-transparent dark:from-neutral-950 dark:to-transparent" />
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${BACKGROUND_IMAGES[currentImageIndex]})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            transition: "opacity 1s ease-in-out",
            opacity: isTransitioning ? 0 : 1,
          }}
        />
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 2, 5], fov: 90, near: 1, far: 20 }}
          style={{ width: "100%", height: "100%" }}
        >
          <fog attach="fog" args={["#202020", 5, 20]} />
          <ambientLight intensity={0.1} />
          <Scene scrollProgress={scrollProgress} colors={dominantColors} />
        </Canvas>
      </div>
    </div>
  );
}

function Scene({ scrollProgress, colors }) {
  const depthBuffer = useDepthBuffer({ frames: 1 });
  const { viewport } = useThree();

  const textSize = Math.min(viewport.width, viewport.height) * 0.15;

  const textSpring = useSpring({
    scale: [1, 1, 1],
    rotation: [scrollProgress * Math.PI * 0.5, 0, 0],
    config: { mass: 2, tension: 200, friction: 50 },
  });

  return (
    <>
      <ambientLight intensity={1} />
      <hemisphereLight intensity={1} color="#ffffff" groundColor={colors[2]} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow />

      <MovingSpot
        depthBuffer={depthBuffer}
        color={colors[0]}
        position={[viewport.width / 2, viewport.height / 2, -1]}
        intensity={8}
      />
      <MovingSpot
        depthBuffer={depthBuffer}
        color={colors[1]}
        position={[-viewport.width / 2, viewport.height / 2, -1]}
        intensity={8}
      />

      <Center scale={[1, 1, 1]} position={[0, viewport.height * 0.1, -2]}>
        <animated.group {...textSpring}>
          {/* Front lighting for text visibility */}
          <spotLight
            position={[0, 0, 6]}
            angle={0.6}
            penumbra={0.5}
            intensity={10}
            color="#ffffff"
          />

          {/* Main text */}
          <Text3D
            font="/fonts/archivo.typeface.json"
            size={textSize}
            height={textSize * 0.4}
            bevelEnabled
            bevelSize={textSize * 0.04}
            bevelOffset={0}
            bevelSegments={7}
            letterSpacing={0.02}
            textAlign="center"
          >
            Lightshows
            <meshBasicMaterial color={colors[2]} />
          </Text3D>

          {/* Black outline */}
          <group position={[0, 0, -0.1]}>
            <Text3D
              font="/fonts/archivo.typeface.json"
              size={textSize * 1.02}
              height={textSize * 0.4}
              bevelEnabled
              bevelSize={textSize * 0.04}
              bevelOffset={0}
              bevelSegments={7}
              letterSpacing={0.02}
              textAlign="center"
            >
              Lightshows
              <meshBasicMaterial color="#000000" />
            </Text3D>
          </group>
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
