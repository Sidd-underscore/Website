"use client";
import photos from "@/lib/photos";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Link } from "../ui/link";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { FeaturedPhotos } from "./featured";

export function PhotosSplash() {
  const buttonRef = useRef(null);
  const [linkHovered, setLinkHovered] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
  });

  useEffect(() => {
    const updateButtonPosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setButtonPosition({
          x: rect.left,
          y: rect.top + window.scrollY,
          width: rect.width,
        });
      }
    };

    updateButtonPosition();

    window.addEventListener("resize", updateButtonPosition);

    return () => {
      window.removeEventListener("resize", updateButtonPosition);
    };
  }, []);

  const photoKeys = [
    "Ivy Posing (Pt. 1)",
    "Fall Salad",
    "Delicate Parsley",
    "Sunny Laziness",
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
          >
            <span>Enter the gallery</span>{" "}
            <ArrowRightIcon className="ml-2 h-4 w-4 transition-all group-hover:ml-4" />
          </Link>
        </Button>
        <FeaturedPhotos />
      </div>
      {/* Scattered photos on the side */}
      {photoKeys.map((key, index) => {
        const initialPosition =
          index % 2 === 0 ? { left: -40 } : { right: -40 };

        const getRotation = (isHovered) => {
          const rotations = isHovered
            ? ["-6deg", "12deg", "6deg", "-12deg"]
            : ["6deg", "-12deg", "-6deg", "12deg"];
          return rotations[index % 4];
        };

        const getTranslation = (isHovered) => {
          if (!isHovered) return { x: 0, y: 0 };

          const xOffset = index % 2 === 0 ? -90 : window.innerWidth - 40;
          const yOffset = -(index * 160 + 200) + 72;

          return {
            x: buttonPosition.x + buttonPosition.width / 2 - xOffset,
            y: buttonPosition.y + yOffset,
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
            className={`absolute hidden h-48 w-auto select-none rounded-lg transition-transform duration-200 ease-out 2xl:block`}
            style={{ ...initialPosition, ...adjustedPosition }}
            src={photoData.staticPhoto}
            alt={photoData.name}
            title={photoData.name}
            width={0}
            height={0}
            quality={50}
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
