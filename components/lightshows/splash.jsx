"use client";

import * as THREE from "three";
import { Vector3 } from "three";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { SpotLight, useDepthBuffer } from "@react-three/drei";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

export default function LightshowSplash() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [-2, 2, 6], fov: 50, near: 1, far: 20 }}
      style={{ width: "100vw", height: "100vh" }}
    >
      <fog attach="fog" args={["#202020", 5, 20]} />
      <ambientLight intensity={0.1} />
      <Scene />
    </Canvas>
  );
}

function Scene() {
  const depthBuffer = useDepthBuffer({ frames: 1 });
  const textMeshRef = useRef();
  const containerRef = useRef();
  const { viewport } = useThree();

  useEffect(() => {
    const loader = new FontLoader();
    loader.load(
      "/fonts/archivo.typeface.json",
      (font) => {
        const textGeometry = new TextGeometry("Light shows", {
          font: font,
          size: 1.2,
          height: 0.2,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.02,
          bevelOffset: 0,
          bevelSegments: 5,
        });

        textGeometry.center();
        textGeometry.computeBoundingBox();
        const boundingBox = textGeometry.boundingBox;
        const textWidth = boundingBox.max.x - boundingBox.min.x;
        const textHeight = boundingBox.max.y - boundingBox.min.y;

        const scale = Math.min(5 / textWidth, 5 / textHeight);
        const textMaterial = new THREE.MeshPhongMaterial({ color: 0xffc0cb });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.scale.set(scale, scale, scale);
        textMeshRef.current = textMesh;

        // Add the text mesh to the scene
        if (containerRef.current) {
          containerRef.current.add(textMesh);
        }
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the font:", error);
      },
    );
  }, []);

  return (
    <>
      <MovingSpot
        depthBuffer={depthBuffer}
        color="#0c8cbf"
        position={[viewport.width / 2, viewport.height / 2, -1]}
      />
      <MovingSpot
        depthBuffer={depthBuffer}
        color="#b00c3f"
        position={[-viewport.width / 2, viewport.height / 2, -1]}
      />
      <group ref={containerRef} />
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
