"use client";

import photos from "@/lib/photos";
import Image from "next/image";
import { useState } from "react";
import { Link } from "../ui/link";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { FeaturedPhotos } from "./featured";

export function PhotosSplash() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [linkHovered, setLinkHovered] = useState(false);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="relative h-screen overflow-hidden 2xl:-mx-24"
      onMouseMove={linkHovered ? handleMouseMove : null}
    >
      <div className="mx-auto max-w-5xl">
        <h1 className="text-5xl font-bold">Photography</h1>

        <p className="mt-6">
          Being able to capture a moment is my favorite way of documenting life.
        </p>
        <p className="mt-2">
          Taking pictures of the moment, regardless of perfect framing or
          composition, brings out its best qualities. It preservers its
          authenticity and reality. Thus, the vast majority of the photos
          showcased here are completely unedited, save for cropping.
        </p>

        <Button
          asChild
          className="mt-8 space-x-2 group"
          variant="secondary"
        >
          <Link
            href="/photos/gallery"
            className="transition"
            onMouseEnter={() => setLinkHovered(true)}
            onMouseLeave={() => setLinkHovered(false)}
          >
            <span>Enter the gallery</span>{" "}
            <ArrowRightIcon className="group-hover:ml-4 transition-all ml-2 h-4 w-4" />
          </Link>
        </Button>

        <FeaturedPhotos />
      </div>

      {/* Scattered photos on the side */}
      {[
        "Ivy Posing (Pt. 1)",
        "Fall Salad",
        "Delicate Parsley",
        "Sunny Laziness",
        "Rearview Mirror",
        "Fast Ambulance",
        "Lions Gate Bridge",
        "Sunset Bridge",
        "Sunset Sea Lion",
        "Posing Lizard",
      ].map((key, index) => {
        const initialPosition =
          index % 2 === 0 ? { left: -40 } : { right: -40 };
        const adjustedPosition = {
          top: index * 10 + 5 + "rem",
          transform: `
            translate(${linkHovered ? mousePosition.x - (index % 2 === 0 ? 90 : window.innerWidth - 40) : 0}px, 
                      ${linkHovered ? mousePosition.y - (index * 160 + 200) : 0}px)
            rotate(${
              !linkHovered
                ? (index % 4) + 1 === 1
                  ? "6deg"
                  : (index % 4) + 1 === 2
                    ? "-12deg"
                    : (index % 4) + 1 === 3
                      ? "-6deg"
                      : "12deg"
                : (index % 4) + 1 === 1
                  ? "-6deg"
                  : (index % 4) + 1 === 2
                    ? "12deg"
                    : (index % 4) + 1 === 3
                      ? "6deg"
                      : "-12deg"
            })`,
        };
        const photoData = photos.find((photo) => photo.name === key);

        return (
          <Image
            key={key}
            className={`hidden 2xl:block absolute h-48 w-auto select-none ease-out rounded-lg transition-transform duration-200`}
            style={{ ...initialPosition, ...adjustedPosition }}
            src={photoData.staticPhoto}
            alt={photoData.name}
            title={photos.name}
            width={0}
            height={0}
            quality={50}
            priority={true}
          />
        );
      })}
    </div>
  );
}
