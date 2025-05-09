"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CalendarIcon,
  CameraIcon,
  CropIcon,
  DownloadIcon,
  FontBoldIcon,
  FontItalicIcon,
  MagnifyingGlassIcon,
  SewingPinFilledIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatRelative, fromUnixTime, formatDistance } from "date-fns";
import { HexColorPicker } from "react-colorful";
import { useTheme } from "next-themes";
import { adjustTextColor, useTabs } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function DesignSplash() {
  const { theme } = useTheme();
  const [colorBoxBackgroundColor, setColorBoxBackgroundColor] =
    useState("#000000");
  const [endTextStyles, setEndTextStyles] = useState(["font-bold"]);

  useEffect(() => {
    setColorBoxBackgroundColor(() =>
      theme === "dark" ? "#ffffff" : "#000000",
    );
  }, [theme]);

  return (
    <div className="relative mt-8 mb-96">
      <div className="z-20">
        <div className="relative my-24 overscroll-y-contain">
          <TextBox textContent="I have been passionate about design since a young age." />
        </div>

        <div className="text-2xl">
          <p className="space-x-0.5 leading-loose">
            <span>
              Whether it be{" "}
              <ColorBox backgroundColor={colorBoxBackgroundColor}>
                Halloween decorations
              </ColorBox>
              ,{" "}
              <ColorBox backgroundColor={colorBoxBackgroundColor}>
                event organizing
              </ColorBox>
              , or{" "}
              <ColorBox backgroundColor={colorBoxBackgroundColor}>
                furniture layouts
              </ColorBox>
              , qualities such as
            </span>{" "}
            <i>prototyping</i>
            <span> and</span> <i>iterating</i>
            <span> have been in me since childhood.</span>
          </p>
        </div>

        <div className="mt-6 text-2xl">
          <p>
            I learned to channel that energy into UI/UX design while I was
            <br /> learning to code websites...
          </p>
        </div>

        <div className="mt-10 text-4xl">
          <p>
            ...where I found my love for <br />
            <span className={endTextStyles.toString().replaceAll(",", " ")}>
              User Interface Design
            </span>
            .
          </p>
        </div>
      </div>
      {/* Assortment of UI things  */}
      <UIGallery
        colorBoxBackgroundColor={colorBoxBackgroundColor}
        setColorBoxBackgroundColor={setColorBoxBackgroundColor}
        endTextStyles={endTextStyles}
        setEndTextStyles={setEndTextStyles}
      />
    </div>
  );
}

export function ColorBox({ children, backgroundColor }) {
  const [color, setColor] = useState(adjustTextColor(backgroundColor));

  useEffect(() => {
    setColor(() => adjustTextColor(backgroundColor));
  }, [backgroundColor]);

  return (
    <span
      style={{ backgroundColor, color }}
      className="mx-0.5 rounded-full px-2.5 py-1 text-nowrap"
    >
      {children}
    </span>
  );
}

export function TextBox({ textContent }) {
  const [text, setText] = useState("");

  const inputParentRef = useRef(null);
  const inputRef = useRef(null);

  const [width, setWidth] = useState();
  const [height, setHeight] = useState(98);
  const [top, setTop] = useState(-150);
  const [left, setLeft] = useState(0);
  const [fontSize, setFontSize] = useState(36);
  const [isDragging, setIsDragging] = useState(false);

  const minFontSize = 10;

  useEffect(() => {
    if (inputParentRef.current) {
      const { width, height } = inputRef.current.getBoundingClientRect();
      setWidth(width);
      setHeight(height);
    }
  }, []);

  const adjustFontSize = () => {
    const input = inputRef.current;

    if (!input) return;

    let currentFontSize = fontSize;
    input.style.fontSize = `${currentFontSize}px`;

    const isOverflowing = () => {
      return (
        input.scrollWidth > input.clientWidth ||
        input.scrollHeight > input.clientHeight
      );
    };

    while (!isOverflowing() && currentFontSize < 500) {
      currentFontSize += 1;
      input.style.fontSize = `${currentFontSize}px`;
    }

    while (isOverflowing() && currentFontSize > minFontSize) {
      currentFontSize -= 1;
      input.style.fontSize = `${currentFontSize}px`;
    }

    setFontSize(currentFontSize);
  };

  useEffect(() => {
    if (textContent) {
      let currentIndex = 0;
      let lastTypedText = "";
      let lastTime = 0;
      const typingDelay = 50;

      const typeText = (time) => {
        if (time - lastTime >= typingDelay) {
          const currentTypedText = textContent.substring(0, currentIndex + 1);

          if (lastTypedText !== currentTypedText) {
            setText(currentTypedText);
            adjustFontSize();
            lastTypedText = currentTypedText;
            currentIndex++;
            adjustFontSize();
          }

          lastTime = time;
        }

        if (currentIndex < textContent.length) {
          requestAnimationFrame(typeText);
        }
      };

      const animationFrameId = requestAnimationFrame(typeText);

      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [textContent]);

  function toggleScrolling(enable) {
    document.body.style.overflow = enable ? "hidden" : "auto";
    document.body.style.height = enable ? "100%" : "auto";
  }

  const handleDrag = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const isTouch = e.type === "touchstart";
    const startX = isTouch ? e.touches[0].clientX : e.clientX;
    const startY = isTouch ? e.touches[0].clientY : e.clientY;
    let startTop = top;
    let startLeft = left;

    const onMove = (moveEvent) => {
      toggleScrolling(true);

      const moveX = isTouch ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const moveY = isTouch ? moveEvent.touches[0].clientY : moveEvent.clientY;
      const deltaX = moveX - startX;
      const deltaY = moveY - startY;
      setTop(startTop + deltaY);
      setLeft(startLeft + deltaX);
    };

    const stopMove = () => {
      setIsDragging(false);
      toggleScrolling(false);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", stopMove);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", stopMove);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", stopMove);
    document.addEventListener("touchmove", onMove);
    document.addEventListener("touchend", stopMove);
  };

  const handleResize = (e, direction) => {
    e.preventDefault();
    const isTouch = e.type === "touchstart";
    const startX = isTouch ? e.touches[0].clientX : e.clientX;
    const startY = isTouch ? e.touches[0].clientY : e.clientY;
    const startWidth = width;
    const startHeight = height;
    const startLeft = left;
    const startTop = top;

    const onMove = (moveEvent) => {
      toggleScrolling(true);

      const moveX = isTouch ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const moveY = isTouch ? moveEvent.touches[0].clientY : moveEvent.clientY;
      let newWidth = startWidth;
      let newHeight = startHeight;
      let newLeft = startLeft;
      let newTop = startTop;

      if (direction.includes("e")) {
        newWidth = startWidth + (moveX - startX);
      }
      if (direction.includes("s")) {
        newHeight = startHeight + (moveY - startY);
      }
      if (direction.includes("w")) {
        newWidth = startWidth - (moveX - startX);
        newLeft = startLeft + (moveX - startX);
      }
      if (direction.includes("n")) {
        newHeight = startHeight - (moveY - startY);
        newTop = startTop + (moveY - startY);
      }

      newWidth = newWidth < 50 ? 50 : newWidth;
      newHeight = newHeight < 50 ? 50 : newHeight;

      setWidth(newWidth);
      setHeight(newHeight);
      setLeft(newLeft);
      setTop(newTop);

      adjustFontSize();
    };

    const stopMove = () => {
      toggleScrolling(false);

      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", stopMove);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", stopMove);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", stopMove);
    document.addEventListener("touchmove", onMove);
    document.addEventListener("touchend", stopMove);
  };

  return (
    <div
      ref={inputParentRef}
      className="absolute z-20 mt-10"
      style={{
        width: width || "100%",
        height,
        top,
        left,
        fontSize: `${fontSize}px`,
      }}
    >
      <textarea
        type="text"
        ref={inputRef}
        className="h-full w-full resize-none overflow-hidden bg-transparent p-4 ring-0 outline-hidden focus:ring-0 focus:outline-hidden"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          adjustFontSize();
        }}
        autoFocus={true}
      />

      {/* Edge resize handles */}
      <div
        className="absolute -top-2 -left-2 z-20 h-5 w-5 cursor-nw-resize rounded-full border-2 border-white bg-neutral-950 transition-[width_height] hover:h-6 hover:w-6 md:-top-1 md:-left-1 md:h-3 md:w-3 md:rounded-none md:hover:-top-2 md:hover:-left-2 hover:md:rounded-md dark:border-neutral-950 dark:bg-white"
        onMouseDown={(e) => handleResize(e, "nw")}
        onTouchStart={(e) => handleResize(e, "nw")}
      />
      <div
        className="absolute -top-2 -right-2 z-20 h-5 w-5 cursor-ne-resize rounded-full border-2 border-white bg-neutral-950 transition-[width_height] hover:h-6 hover:w-6 md:-top-1 md:-right-1 md:h-3 md:w-3 md:rounded-none md:hover:-top-2 md:hover:-right-2 hover:md:rounded-md dark:border-neutral-950 dark:bg-white"
        onMouseDown={(e) => handleResize(e, "ne")}
        onTouchStart={(e) => handleResize(e, "ne")}
      />
      <div
        className="absolute -bottom-2 -left-2 z-20 h-5 w-5 cursor-sw-resize rounded-full border-2 border-white bg-neutral-950 transition-[width_height] hover:h-6 hover:w-6 md:-bottom-1 md:-left-1 md:h-3 md:w-3 md:rounded-none md:hover:-bottom-2 md:hover:-left-2 hover:md:rounded-md dark:border-neutral-950 dark:bg-white"
        onMouseDown={(e) => handleResize(e, "sw")}
        onTouchStart={(e) => handleResize(e, "sw")}
      />
      <div
        className="absolute -right-2 -bottom-2 z-20 h-5 w-5 cursor-se-resize rounded-full border-2 border-white bg-neutral-950 transition-[width_height] hover:h-6 hover:w-6 md:-right-1 md:-bottom-1 md:h-3 md:w-3 md:rounded-none md:hover:-right-2 md:hover:-bottom-2 hover:md:rounded-md dark:border-neutral-950 dark:bg-white"
        onMouseDown={(e) => handleResize(e, "se")}
        onTouchStart={(e) => handleResize(e, "se")}
      />

      {/* Updated Drag handles */}
      <div
        className={`absolute top-0 -left-0.5 h-full cursor-move bg-neutral-950 transition-[width] dark:bg-white ${
          isDragging ? "w-1.5" : "w-0.75"
        }`}
        onMouseDown={handleDrag}
        onTouchStart={handleDrag}
      />
      <div
        className={`absolute top-0 -right-0.5 -left-0.5 w-full cursor-move bg-neutral-950 transition-[height] dark:bg-white ${
          isDragging ? "h-1.5" : "h-0.75"
        }`}
        onMouseDown={handleDrag}
        onTouchStart={handleDrag}
      />
      <div
        className={`absolute top-0 -right-0.5 h-full cursor-move bg-neutral-950 transition-[width] dark:bg-white ${
          isDragging ? "w-1.5" : "w-0.75"
        }`}
        onMouseDown={handleDrag}
        onTouchStart={handleDrag}
      />
      <div
        className={`absolute -right-0.5 bottom-0 -left-0.5 w-full cursor-move bg-neutral-950 transition-[height] dark:bg-white ${
          isDragging ? "h-1.5" : "h-0.75"
        }`}
        onMouseDown={handleDrag}
        onTouchStart={handleDrag}
      />
    </div>
  );
}

export function UIGallery({
  colorBoxBackgroundColor,
  setColorBoxBackgroundColor,
  endTextStyles,
  setEndTextStyles,
}) {
  const [date, setDate] = useState(null);
  const { setActiveTab } = useTabs();

  useEffect(() => {
    setActiveTab("account");
  }, [setActiveTab]);

  return (
    <div className="absolute -right-16 -bottom-90 flex scale-75 -rotate-12 space-x-4 sm:-right-12 sm:-bottom-80 sm:w-full sm:scale-100 sm:rotate-0">
      <div className="absolute -z-10 h-full w-full bg-neutral-50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] [background-size:1rem_1rem] dark:bg-neutral-950 dark:bg-[linear-gradient(to_right,#1b1b1b_1px,transparent_1px),linear-gradient(to_bottom,#1b1b1b_1px,transparent_1px)]" />

      <div className="flex w-1/2 max-w-[100vw] shrink-0 flex-col items-end justify-end space-y-4">
        <div className="z-10 flex space-x-4">
          <ToggleGroup
            onValueChange={setEndTextStyles}
            value={endTextStyles}
            type="multiple"
            className="gap-4"
          >
            <ToggleGroupItem className="h-8 w-8" value="font-bold">
              <FontBoldIcon />
              <span className="sr-only">Bold</span>
            </ToggleGroupItem>
            <ToggleGroupItem className="h-8 w-8" value="italic">
              <FontItalicIcon />
              <span className="sr-only">Italic</span>
            </ToggleGroupItem>
            <ToggleGroupItem className="h-8 w-8" value="underline">
              <UnderlineIcon />
              <span className="sr-only">Underline</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <Select>
          <SelectTrigger className="h-8 w-56">
            <SelectValue placeholder="Chose a location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Beach</SelectLabel>
              <SelectItem value="miami">Miami, FL</SelectItem>
              <SelectItem value="santa">Santa Monica, CA</SelectItem>
              <SelectItem value="cabo">Cabo San Lucas, MX</SelectItem>
            </SelectGroup>
            <SelectSeparator />

            <SelectGroup>
              <SelectLabel>Forest</SelectLabel>
              <SelectItem value="yukon">Yukon, CA</SelectItem>
              <SelectItem value="denali">Denali, AL</SelectItem>
            </SelectGroup>
            <SelectSeparator />

            <SelectGroup>
              <SelectLabel>Cold</SelectLabel>
              <SelectItem value="oslo">Oslo, NO</SelectItem>
              <SelectItem value="svalbard">Svalbard, NO</SelectItem>
              <SelectItem value="stockholm">Stockholm, SW</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="z-10 flex items-center space-x-4">
          <DatePickerWithRange
            className="h-8 w-48"
            date={date}
            setDate={setDate}
          />
          <Button className="h-8 w-20" variant="destructive">
            Delete
          </Button>
        </div>

        <div className="bg-opacity-90 z-10 flex h-[2.6rem] w-full items-center rounded-md border border-neutral-200 bg-white pr-1 pl-3 text-sm shadow-xs hover:border-neutral-300 hover:bg-neutral-100 hover:ring-neutral-950 focus:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 dark:hover:ring-neutral-300 dark:focus:bg-neutral-800">
          <MagnifyingGlassIcon />
          <Input
            className="pointer-events-auto w-full border-transparent! shadow-none ring-0!"
            placeholder="Search photos..."
          />
        </div>
      </div>

      <div className="z-10 flex shrink-0 flex-col items-end overflow-x-hidden">
        <div className="flex flex-col space-y-4">
          <div className="ml-auto h-8">
            <Tabs defaultValue="account">
              <TabsList className="flex h-8 w-72">
                <TabsTrigger className="w-24" value="account">
                  My Account
                </TabsTrigger>
                <TabsTrigger className="w-24" value="security">
                  Security
                </TabsTrigger>
                <TabsTrigger className="w-24" value="advanced">
                  Advanced
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex space-x-4">
            <div>
              <div className="flex w-60 justify-center rounded-md border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-950">
                <div>
                  <p className="mb-2 text-base font-medium">Pick a Color</p>

                  <HexColorPicker
                    color={colorBoxBackgroundColor}
                    onChange={setColorBoxBackgroundColor}
                  />
                </div>
              </div>
            </div>

            <div>
              <div>
                <div className="flex h-52 w-60 flex-col justify-between rounded-md border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-950">
                  <p className="mb-2 text-base font-medium">
                    Photo Information
                  </p>

                  <div>
                    <div className="flex items-center space-x-2 text-xs">
                      <CalendarIcon className="size-4 shrink-0" />
                      <span>
                        {formatRelative(fromUnixTime(1679481600), Date.now())} (
                        {formatDistance(fromUnixTime(1679481600), Date.now(), {
                          addSuffix: true,
                        })}
                        )
                      </span>
                    </div>

                    <div className="mt-2 flex items-center space-x-2 text-xs">
                      <SewingPinFilledIcon className="h-3 w-3 shrink-0" />
                      <span>Portland, OR</span>
                    </div>

                    <div className="mt-2 flex items-center space-x-2 text-xs">
                      <CameraIcon className="h-3 w-3 shrink-0" />
                      <span>Canon PowerShot SX70 HS</span>
                    </div>

                    <div className="mt-2 mb-4 flex items-center space-x-2 text-xs">
                      <CropIcon className="h-3 w-3 shrink-0" />
                      <span>1024 x 1080</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="mt-2 flex w-full items-center rounded-lg text-sm"
                  >
                    <DownloadIcon className="mr-2 shrink-0" />
                    Download as PNG
                  </Button>
                </div>
              </div>

              <div>
                <div className="mt-4 flex items-end justify-between space-x-4">
                  <Button className="w-full" size="lg">
                    Submit
                  </Button>
                  <Button className="w-full" size="lg" variant="secondary">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
