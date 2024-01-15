"use client";

import { Link } from "@/components/ui/link";
import { useState } from "react";

export function Footer() {
  const [hearts, setHearts] = useState([]);
  const [canSpawn, setCanSpawn] = useState(true);

  const handleHeartHover = (e) => {
    if (canSpawn) {
      const newHeart = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };

      setHearts((prevHearts) => [...prevHearts, newHeart]);
      setCanSpawn(false);

      setTimeout(() => {
        setHearts((prevHearts) =>
          prevHearts.filter((heart) => heart.id !== newHeart.id),
        );
      }, 10000);

      setTimeout(() => setCanSpawn(true), 50);
    }
  };

  return (
    <>
      <footer className="p-4 text-center">
        <sub>
          Made with Next.js and <span onMouseMove={handleHeartHover}>love</span>{" "}
          by Sidd in Portland, OR.
          <p>
            <Link
              className="inline-flex text-xs dark:text-zinc-50"
              href="/images/i.jpg"
            >
              I
            </Link>
            <Link
              className="inline-flex text-xs dark:text-zinc-50"
              href="/images/v.jpg"
            >
              v
            </Link>
            <Link
              className="inline-flex text-xs dark:text-zinc-50"
              href="/images/y.jpg"
            >
              y
            </Link>{" "}
            says hi!
          </p>
        </sub>
      </footer>

      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="love heart-animation"
          style={{
            left: heart.x,
            top: heart.y + Math.floor(Math.random() * (501 - 451) + 450),
          }}
        >
          ❤️
        </span>
      ))}
    </>
  );
}
