"use client";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { createContext, useContext, useState } from "react";
import { SiddNavbarLogo } from "@/components/home/navbar";

/**
 * Merges multiple class names into a single string.
 *
 * @param {...string} inputs - Class names to merge.
 * @returns {string} The merged class name.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Waits for a condition to be met before resolving a promise.
 *
 * @param {function} conditionFunction - A function that returns true when the condition is met.
 * @returns {Promise<void>} A promise that resolves when the condition is met.
 */
export function until(conditionFunction) {
  const poll = (resolve) => {
    if (conditionFunction()) resolve();
    else setTimeout((_) => poll(resolve), 400);
  };

  return new Promise(poll);
}

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [navbarLogo, setNavbarLogo] = useState({
    link: "/",
    label: <SiddNavbarLogo />,
    shortLabel: <SiddNavbarLogo />
  });
  const [activeTab, setActiveTab] = useState(null);

  const value = {
    navbar: {
      navbarLogo,
      setNavbarLogo,
    },
    tabs: {
      activeTab,
      setActiveTab,
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * Hook for accessing the navbar logo context.
 *
 * @returns {object} The navbar logo context.
 */
export function useNavbarLogo() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useNavbarLogo must be used within a AppContext");
  }
  return context.navbar;
}

/**
 * Hook for accessing the tabs context. Used for controlling the animated background of the active tab.
 *
 * @returns {object} The tabs context.
 */
export function useTabs() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useTabs must be used within a AppContext");
  }
  return context.tabs;
}

/**
 * Formats an array of words into a sentence.
 *
 * @param {string[]} array - The array of words to format.
 * @param {string} [separator=", "] - The separator between words.
 * @param {string} [lastSeparator=", and "] - The separator for the last word.
 * @param {boolean} [capitalize=false] - Whether to capitalize the first letter of each word.
 * @returns {string} The formatted sentence.
 */
export function formatArrayIntoSentence(
  array,
  separator = ", ",
  lastSeparator = ", and ",
  capitalize = false,
) {
  if (array.length === 0) return "";

  const conjunctions = [
    "and",
    "or",
    "but",
    "nor",
    "for",
    "yet",
    "so",
    "a",
    "an",
    "the",
  ];

  const capitalizeWord = (word) => {
    return conjunctions.includes(word.toLowerCase())
      ? word.toLowerCase()
      : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  const capitalizeElement = (element) => {
    return element
      .split(" ")
      .map((word) => capitalizeWord(word))
      .join(" ");
  };

  if (array.length === 1)
    return capitalize ? capitalizeElement(array[0]) : array[0];

  const formattedArray = capitalize
    ? array.map((element) => capitalizeElement(element))
    : array;

  const lastIndex = formattedArray.length - 1;

  return (
    formattedArray.slice(0, lastIndex).join(separator) +
    lastSeparator +
    formattedArray[lastIndex]
  );
}

/**
 * Adjusts the text color of a given hex color.
 *
 * @param {string} hexColor - The hex color to adjust.
 * @returns {string} The adjusted hex color.
 */
export function adjustTextColor(hexColor) {
  const contrastThreshold = 200;

  hexColor = hexColor.replace("#", "");

  const r = parseInt(hexColor.slice(0, 2), 16);
  const g = parseInt(hexColor.slice(2, 4), 16);
  const b = parseInt(hexColor.slice(4, 6), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  const adjustBrightness = (color, amount) => {
    return Math.min(255, Math.max(0, color + amount));
  };

  const contrastAdjustment =
    luminance > 0.5 ? -contrastThreshold : contrastThreshold;

  return `#${adjustBrightness(r, contrastAdjustment)
    .toString(16)
    .padStart(
      2,
      "0",
    )}${adjustBrightness(g, contrastAdjustment).toString(16).padStart(2, "0")}${adjustBrightness(
    b,
    contrastAdjustment,
  )
    .toString(16)
    .padStart(2, "0")}`;
}

export function shimmer(w, h, theme) {
  return `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="${theme === "dark" ? "#222" : "#D3D3D3"}" offset="20%" />
      <stop stop-color="${theme === "dark" ? "#333" : "#f0f0f0"}" offset="50%" />
      <stop stop-color="${theme === "dark" ? "#222" : "#D3D3D3"}" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="${theme === "dark" ? "#222" : "#D3D3D3"}" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;
}

export function toBase64(str) {
  return typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
}
