"use client";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { createContext, useContext, useState } from "react";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

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
    label: (
      <Image
        alt="Sidd's logo"
        width={250}
        height={250}
        quality={100}
        className="absolute left-3 top-2.5 h-8 w-8 transition-[width_height] hover:-left-2 hover:top-0 hover:h-[72px] hover:w-[72px] hover:-rotate-12 hover:[filter:drop-shadow(1px_0_0_white)_drop-shadow(0_1px_0_white)_drop-shadow(-1px_0_0_white)_drop-shadow(0_-1px_0_white)] dark:hover:[filter:drop-shadow(1px_0_0_#09090b)_drop-shadow(0_1px_0_#09090b)_drop-shadow(-1px_0_0_#09090b)_drop-shadow(0_-1px_0_#09090b)]"
        src="/images/sidd.png"
      />
    ),
  });

  const value = {
    navbar: {
      navbarLogo,
      setNavbarLogo,
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useNavbarLogo() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useNavbarLogo must be used within a AppContext");
  }
  return context.navbar;
}

export function formatArrayIntoSentence(
  array,
  separator = ", ",
  lastSeparator = ", and ",
  capitalize = false,
) {
  if (array.length === 0) {
    return "";
  }
  
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
      ? word
      : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  if (array.length === 1) {
    return capitalize ? capitalizeWord(array[0]) : array[0];
  }

  const formattedArray = capitalize
    ? array.map((word) => capitalizeWord(word))
    : array;

  const lastIndex = formattedArray.length - 1;

  return (
    formattedArray.slice(0, lastIndex).join(separator) +
    lastSeparator +
    formattedArray[lastIndex]
  );
}
