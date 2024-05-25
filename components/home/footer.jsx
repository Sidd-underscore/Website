"use client";

import { Link } from "@/components/ui/link";
import { useState } from "react";

export function Footer() {
  const [heart, setHeart] = useState(null);
  const [canSpawn, setCanSpawn] = useState(true);

  const handleHeartHover = (e) => {
    if (canSpawn) {
      const newHeart = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY + window.scrollY - 25,
      };

      setHeart(newHeart);
      setCanSpawn(false);

      setTimeout(() => {
        setHeart(null);
        setCanSpawn(true);
      }, 1000);
    }
  };

  return (
    <>
      <footer className="p-4 text-center">
        <sub>
          Made with Next.js and{" "}
          <span className="cursor-text" onClick={handleHeartHover}>
            love
          </span>{" "}
          by Sidd in Portland, OR.
          <p>
            <Link
              className="inline-flex text-xs dark:text-neutral-50"
              href="/images/i.jpg"
            >
              I
            </Link>
            <Link
              className="inline-flex text-xs dark:text-neutral-50"
              href="/images/v.jpg"
            >
              v
            </Link>
            <Link
              className="inline-flex text-xs dark:text-neutral-50"
              href="/images/y.jpg"
            >
              y
            </Link>{" "}
            says hi!
          </p>
        </sub>
      </footer>

      {heart &&
        (() => {
          var random = Math.floor(Math.random() * 27);
          return (
            <span
              key={heart.id}
              className={`love ${
                random % 2 === 0 ? "heart-animation-right" : "heart-animation-left"
              }`}
              style={{
                left: heart.x,
                top: heart.y,
              }}
            >
              {random % 4 === 0 ? "💖" : "❤️"}
            </span>
          );
        })()}
    </>
  );
}
