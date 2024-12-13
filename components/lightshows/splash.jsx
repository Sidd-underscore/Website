"use client";

import * as THREE from "three";
import { Vector3 } from "three";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { SpotLight, useDepthBuffer } from "@react-three/drei";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import {
  TextGeometry,
} from "three/examples/jsm/geometries/TextGeometry";

export default function LightshowSplash() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = Math.min(currentScroll / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0 z-10 h-[25vh] bg-gradient-to-b from-neutral-50 to-transparent dark:from-neutral-950 dark:to-transparent" />
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
          camera={{ position: [0, 2, 6], fov: 50, near: 1, far: 20 }}
          style={{ width: "100vw", height: "100vh" }}
        >
          <fog attach="fog" args={["#202020", 5, 20]} />
          <ambientLight intensity={0.1} />
          <Scene scrollProgress={scrollProgress} />
        </Canvas>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-10 h-[25vh] bg-gradient-to-t from-neutral-50 to-transparent dark:from-neutral-950 dark:to-transparent" />
    </div>
  );
}

function Scene({ scrollProgress }) {
  const depthBuffer = useDepthBuffer({ frames: 1 });
  const containerRef = useRef();
  const { viewport, size } = useThree();

  useEffect(() => {
    const loader = new FontLoader();
    loader.load(
      "/fonts/archivo.typeface.json",
      (font) => {
        // Calculate dynamic text size based on viewport width
        const maxWidth = size.width;
        const textContent = "Light shows";
        
        // Create a temporary geometry to calculate text width
        const tempGeometry = new TextGeometry(textContent, {
          font: font,
          size: 1, // Temporary size for width calculation
          height: 0.2,
          curveSegments: 12,
        });
        tempGeometry.computeBoundingBox();
        
        // Calculate the scale factor to fit within viewport
        const textWidth = tempGeometry.boundingBox.max.x - tempGeometry.boundingBox.min.x;
        const scaleFactor = Math.min(1, (maxWidth * 0.8) / textWidth);
        
        // Create final text geometry with scaled size
        const textGeometry = new TextGeometry(textContent, {
          font: font,
          size: 1.2 * scaleFactor,
          height: 0.2,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.02,
          bevelOffset: 0,
          bevelSegments: 5,
        });
    
        // Create a material for the text
        const textMaterial = new THREE.MeshBasicMaterial({
          color: 0xffc0cb,
        });
    
        // Create the text mesh and set its pivot point to its geometry's center
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.geometry.center();
        textMesh.updateMatrixWorld();
    
        // Duplicate the text geometry to create an outline effect
        const outlineTextGeometry = textGeometry.clone();
        outlineTextGeometry.translate(0, -0.1, 0);
        outlineTextGeometry.scale(1.02, 1.02, 1);
    
        // Create a material for the outline
        const outlineMaterial = new THREE.MeshBasicMaterial({
          color: 0x000000,
          transparent: true,
          opacity: 1,
          side: THREE.BackSide,
        });
    
        // Create the outline mesh and set its pivot point to its geometry's center
        const outlineMesh = new THREE.Mesh(outlineTextGeometry, outlineMaterial);
        outlineMesh.geometry.center();
        outlineMesh.updateMatrixWorld();
    
        // Add both meshes to the scene
        if (containerRef.current) {
          containerRef.current.add(textMesh);
          containerRef.current.add(outlineMesh);
    
          // Position the outline slightly behind the original text
          outlineMesh.position.z -= 0.05;
        }
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the font:", error);
      },
    );
  }, [size.width]);

  return (
    <>
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
      <group 
        ref={containerRef} 
        position={[0, 0, 0]} // Center horizontally and vertically
        rotation={[
          // Only tilt along X-axis when scrolled, starting from 0
          scrollProgress * Math.PI / 6, 
          0, // No Y-axis rotation
          0
        ]} 
      />
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