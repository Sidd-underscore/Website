"use client";

import photos, { LOCATION_COORDS } from "@/lib/photos";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Link } from "../ui/link";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { FeaturedPhotos } from "./featured";
import { PhotoGlobe } from "./photo-globe";

export function PhotosSplash() {
  const buttonRef = useRef(null);
  const [linkHovered, setLinkHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const photoKeys = [
    "Ivy Posing",
    "Baby Swallow-Tailed Gull",
    "Delicate Parsley",
    "Sunlit Facade",
    "Rearview Mirror",
    "Sunset Bridge",
    "Lions Gate Bridge",
    "Prickly Pear Tree",
    "Sunset Sea Lion",
    "Posing Lizard",
  ];

  return (
    <div className="relative h-full min-h-screen overflow-hidden 2xl:-mx-24">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-5xl font-bold">Photography</h1>

        <p className="mt-6">
          Being able to capture a moment in time is my favorite way of
          documenting life.
        </p>
        <p className="mt-4">
          Taking pictures of the moment, regardless of perfect framing or
          composition, brings out its best qualities. It preservers its
          authenticity and reality. Thus, the vast majority of the photos
          showcased here are completely unedited, save for cropping.
        </p>

        <p className="mt-4 font-medium">
          All these photos are free for you to do whatever you would like with,
          just be a good human. Downloads are free and no attribution is
          required.
        </p>
        <Button
          ref={buttonRef}
          asChild
          className="group mt-8 space-x-2"
          variant="secondary"
        >
          <Link
            href="/photos/gallery"
            className="transition"
            onMouseEnter={() => setLinkHovered(true)}
            onMouseLeave={() => setLinkHovered(false)}
            onMouseMove={(e) => {
              setMousePosition({ x: e.clientX, y: e.clientY + window.scrollY });
            }}
          >
            <span>Enter the gallery</span>{" "}
            <ArrowRightIcon className="ml-2 h-4 w-4 transition-all group-hover:ml-4" />
          </Link>
        </Button>
        <FeaturedPhotos />

        <h2 className="mt-4 text-4xl font-bold">
          {photos.length} photos taken in {Object.keys(LOCATION_COORDS).length}{" "}
          places around the world!
        </h2>
        <PhotoGlobe enableZoom={false} />
      </div>
      {/* Scattered photos on the side */}
      {photoKeys.map((key, index) => {
        const initialPosition =
          index % 2 === 0 ? { left: -40 } : { right: -40 };

            function getRotation(isHovered) {
            if (!isHovered) {
              const rotations = ["3deg", "-6deg", "-3deg", "6deg"];  // halved the rotation angles
              return rotations[index % 4];
            }
            
            const {x: imageX, y: imageY} = getTranslation(isHovered);
            
            const deltaX = mousePosition.x - imageX;
            const deltaY = mousePosition.y - imageY;
            const angleRad = Math.atan2(deltaY, deltaX);
            const angleDeg = (angleRad * 180) / Math.PI;
            
            // Divide the angle by 4 to make the rotation more subtle
            return `${index % 2 == 0 ? "" : "-"}${angleDeg / 4}deg`;
            };

        function getTranslation(isHovered) {
          if (!isHovered) return { x: 0, y: 0 };

          const xOffset = index % 2 === 0 ? 0 : 1000;
          const movementFactor = 0.1;

          const targetX = mousePosition.x - xOffset;
          const targetY = mousePosition.y - index * 80;

          return {
            x: targetX * movementFactor,
            y: targetY * movementFactor,
          };
        };

        const translation = getTranslation(linkHovered);
        const adjustedPosition = {
          top: index * 10 + 5 + "rem",
          transform: linkHovered
            ? `translate(${translation.x}px, ${translation.y}px) rotate(${getRotation(true)})`
            : `rotate(${getRotation(false)})`,
        };

        const photoData = photos.find((photo) => photo.name === key);
        return (
          <Image
            key={key}
            className={`absolute hidden w-auto rounded-lg transition-transform duration-200 ease-out select-none 2xl:block`}
            style={{ ...initialPosition, ...adjustedPosition }}
            src={photoData.staticPhoto}
            alt={photoData.name}
            title={photoData.name}
            placeholder="blur"
            width={0}
            height={124}
            quality={25}
            priority={true}
            onMouseEnter={() => {
              linkHovered ? setLinkHovered(true) : null;
            }}
          />
        );
      })}
    </div>
  );
}
