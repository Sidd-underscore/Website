"use client";

import { useEffect, useRef, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";
import { Loading } from "../ui/loading";
import { ThemeSwitcher } from "../ui/theme-switcher";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  CalendarIcon,
  CameraIcon,
  CaretSortIcon,
  ChevronDownIcon,
  CropIcon,
  DownloadIcon,
  InfoCircledIcon,
  MagnifyingGlassIcon,
  SewingPinFilledIcon,
} from "@radix-ui/react-icons";
import { DatePickerWithRange } from "../ui/date-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { formatRelative, fromUnixTime, formatDistance, format } from "date-fns";
import { SiddWordMark } from "../home/footer";

export default function DesignSplash() {
  return (
    <div className="relative mb-96 mt-8">
      <div className="z-20">
        <div className="relative">
          <TextBox textContent="I have been passionate about design since a young age." />
        </div>

        <div className="mt-20 text-2xl">
          <p className="space-x-0.5 leading-loose">
            <span>
              Whether it be <ColorBox>Halloween decorations</ColorBox>,{" "}
              <ColorBox>event organizing</ColorBox>, or{" "}
              <ColorBox>furniture layouts</ColorBox>, qualities such as
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
            <strong>User Interface Design</strong>.
          </p>
        </div>
      </div>
      {/* Assortment of UI things  */}
      <div className="absolute -bottom-80 -right-12 flex w-full space-x-4">
        <UIGallery />
      </div>
    </div>
  );
}

export function ColorBox({ children }) {
  return (
    <span className="mx-0.5 rounded-full bg-neutral-950 px-2.5 py-1 text-white dark:bg-white dark:text-black">
      {children}
    </span>
  );
}

export function TextBox({ textContent }) {
  const [text, setText] = useState("");

  const inputParentRef = useRef(null);
  const inputRef = useRef(null);

  const [width, setWidth] = useState(1020);
  const [height, setHeight] = useState(98);
  const [top, setTop] = useState(36);
  const [left, setLeft] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [fontSize, setFontSize] = useState(36);

  const MIN_FONT_SIZE = 10;

  const rotationSensitivity = 0.25;
  const [lastAngle, setLastAngle] = useState(null);

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

    while (isOverflowing() && currentFontSize > MIN_FONT_SIZE) {
      currentFontSize -= 1;
      input.style.fontSize = `${currentFontSize}px`;
    }

    setFontSize(currentFontSize);
  };

  useEffect(() => {
    let currentIndex = 0;
    let animationFrameId;

    const typeText = () => {
      if (currentIndex < textContent.length) {
        setText((prevText) => prevText + textContent[currentIndex - 1]);
        adjustFontSize();
        currentIndex++;

        setTimeout(() => {
          animationFrameId = requestAnimationFrame(typeText);
        }, 100);
      }
    };

    animationFrameId = requestAnimationFrame(typeText);

    return () => cancelAnimationFrame(animationFrameId);
  }, [textContent]);

  const handleDrag = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    let startTop = top;
    let startLeft = left;

    let animationFrameId = null;

    const onMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        setTop(startTop + deltaY);
        setLeft(startLeft + deltaX);
      });
    };

    const onMouseUp = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handleRotate = (e) => {
    e.preventDefault();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const getAngle = (x, y) => {
      return Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
    };

    const startX = e.clientX;
    const startY = e.clientY;
    const startAngle = getAngle(startX, startY);

    const onMouseMove = (moveEvent) => {
      const currentAngle = getAngle(moveEvent.clientX, moveEvent.clientY);

      const angleDiff =
        (currentAngle - (lastAngle !== null ? lastAngle : startAngle)) *
        rotationSensitivity;
      setRotation((prevRotation) => prevRotation + angleDiff);
      setLastAngle(currentAngle);
    };

    const onMouseUp = () => {
      setLastAngle(null);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handleResize = (e, direction) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = width;
    const startHeight = height;
    const startLeft = left;
    const startTop = top;

    let animationFrameId = null;

    const onMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newLeft = startLeft;
      let newTop = startTop;

      if (direction.includes("e")) {
        newWidth = startWidth + deltaX;
      }
      if (direction.includes("s")) {
        newHeight = startHeight + deltaY;
      }
      if (direction.includes("w")) {
        newWidth = startWidth - deltaX;
        newLeft = startLeft + deltaX;
      }
      if (direction.includes("n")) {
        newHeight = startHeight - deltaY;
        newTop = startTop + deltaY;
      }

      newWidth = newWidth < 50 ? 50 : newWidth;
      newHeight = newHeight < 50 ? 50 : newHeight;

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        setWidth(newWidth);
        setHeight(newHeight);
        setLeft(newLeft);
        setTop(newTop);

        adjustFontSize();
      });
    };

    const onMouseUp = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      ref={inputParentRef}
      className="relative mt-10"
      style={{
        width,
        height,
        top,
        left,
        transform: `rotate(${rotation}deg)`,
        fontSize: `${fontSize}px`,
      }}
    >
      <textarea
        type="text"
        ref={inputRef}
        className="h-full w-full resize-none overflow-hidden p-4 outline-none ring-0 focus:outline-none focus:ring-0"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          adjustFontSize();
        }}
        autoFocus={true}
      />

      {/* Edge resize handles */}
      <div
        className="absolute -left-1 -top-1 z-20 h-3 w-3 cursor-nw-resize border-2 border-white bg-neutral-950 dark:border-neutral-950 dark:bg-white"
        onMouseDown={(e) => handleResize(e, "nw")}
      />
      <div
        className="absolute -right-1 -top-1 z-20 h-3 w-3 cursor-ne-resize border-2 border-white bg-neutral-950 dark:border-neutral-950 dark:bg-white"
        onMouseDown={(e) => handleResize(e, "ne")}
      />
      <div
        className="absolute -bottom-1 -left-1 z-20 h-3 w-3 cursor-sw-resize border-2 border-white bg-neutral-950 dark:border-neutral-950 dark:bg-white"
        onMouseDown={(e) => handleResize(e, "sw")}
      />
      <div
        className="absolute -bottom-1 -right-1 z-20 h-3 w-3 cursor-se-resize border-2 border-white bg-neutral-950 dark:border-neutral-950 dark:bg-white"
        onMouseDown={(e) => handleResize(e, "se")}
      />

      {/* Rotate handle */}
      <div className="absolute -top-6 left-0 right-0 z-20 mx-auto h-6 w-0.5 bg-neutral-950 dark:bg-white" />
      <div
        className="absolute -top-8 left-0 right-0 z-20 mx-auto h-3 w-3 cursor-crosshair rounded-full border-2 border-white bg-neutral-950 dark:border-neutral-950 dark:bg-white"
        onMouseDown={handleRotate}
      />

      {/* Drag handles */}
      <div
        className="absolute -left-0.5 top-0 z-10 h-full w-1 cursor-move border border-white bg-neutral-950 dark:border-neutral-950 dark:bg-white"
        onMouseDown={handleDrag}
      />
      <div
        className="absolute -left-0.5 -right-0.5 top-0 z-10 h-1 w-full cursor-move border border-white bg-neutral-950 dark:border-neutral-950 dark:bg-white"
        onMouseDown={handleDrag}
      />
      <div
        className="absolute -right-0.5 top-0 z-10 h-full w-1 cursor-move border border-white bg-neutral-950 dark:border-neutral-950 dark:bg-white"
        onMouseDown={handleDrag}
      />
      <div
        className="absolute -left-0.5 -right-0.5 bottom-0 z-10 h-1 w-full cursor-move border border-white bg-neutral-950 dark:border-neutral-950 dark:bg-white"
        onMouseDown={handleDrag}
      />
    </div>
  );
}

export function UIGallery() {
  const [date, setDate] = useState(null);
  return (
    <>
      <div className="flex w-1/2 flex-col items-end justify-end space-y-4">
        <ThemeSwitcher className="" />

        <Button className="" variant="destructive">
          Delete
        </Button>

        <Select>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Chose a location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Beach</SelectLabel>
              <SelectItem value="miami">Miami, FL</SelectItem>
              <SelectItem value="santa">Santa Monica, CA</SelectItem>
              <SelectItem value="cabo">Cabo San Lucas, MX</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Forest</SelectLabel>
              <SelectItem value="yukon">Yukon, CA</SelectItem>
              <SelectItem value="denali">Denali, AL</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Cold</SelectLabel>
              <SelectItem value="oslo">Oslo, NO</SelectItem>
              <SelectItem value="svalbard">Svalbard, NO</SelectItem>
              <SelectItem value="stockholm">Stockholm, SW</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <DatePickerWithRange className="" date={date} setDate={setDate} />
        <div className="flex w-96 items-center rounded-md border border-neutral-200 bg-transparent bg-white bg-opacity-90 pl-3 pr-1 text-sm shadow-sm hover:border-neutral-300 hover:bg-neutral-100 hover:ring-neutral-950 focus:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 dark:hover:ring-neutral-300 dark:focus:bg-neutral-800">
          <MagnifyingGlassIcon />
          <Input
            className="pointer-events-auto !border-transparent shadow-none !ring-0"
            placeholder="Search photos..."
          />
        </div>
      </div>

      <div className="flex max-h-fit flex-col items-end">
        <div className="flex flex-col space-y-4">
          <div className="ml-auto w-96">
            <Tabs defaultValue="gallery">
              <TabsList className="flex w-full justify-around">
                <TabsTrigger className="w-full" value="gallery">
                  Gallery
                </TabsTrigger>
                <TabsTrigger className="w-full" value="albums">
                  Albums
                </TabsTrigger>
                <TabsTrigger className="w-full" value="favorites">
                  Favorites
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex space-x-4">
            <div className="relative">
              <Calendar
                mode="single"
                rootClassName="rounded-md border border-neutral-100 bg-white dark:border-neutral-800 dark:bg-neutral-950"
              />
            </div>

            <div>
              <div>
                <div className="rounded-md border border-neutral-200 p-4 dark:border-neutral-800">
                  <p className="mb-2 text-base font-medium">
                    Photo Information
                  </p>

                  <div className="flex items-center space-x-2 text-xs">
                    <CalendarIcon className="h-4 w-4 shrink-0" />
                    <span>
                      {formatRelative(fromUnixTime(1679481600), Date.now())} at{" "}
                      {format(fromUnixTime(1679481600), "h:mm a")} (
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

                  <div className="mb-4 mt-2 flex items-center space-x-2 text-xs">
                    <CropIcon className="h-3 w-3 shrink-0" />
                    <span>1024 x 1080</span>
                  </div>

                  <a
                    href="#"
                    className={buttonVariants({
                      variant: "outline",
                      size: "md",
                      className:
                        "mt-2 flex w-full items-center rounded-lg text-sm",
                    })}
                  >
                    <DownloadIcon className="mr-2 shrink-0" />
                    Download as{" "}
                    <Select>
                      <SelectTrigger
                        triggerButtonVariant="icon"
                        className="w-fit border-none !pl-2 !pr-0 !text-xs shadow-none"
                      >
                        <SelectValue defaultValue=".png" placeholder="PNG" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value=".png">PNG</SelectItem>
                        <SelectItem value=".jpg">JPG</SelectItem>
                      </SelectContent>
                    </Select>
                  </a>
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
    </>
  );
}
