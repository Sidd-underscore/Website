"use client";

import { Link } from "@/components/ui/link";
import { useState } from "react";

export function Footer() {
  const [socialsText, setSocialsText] = useState("Check out my socials!");
  return (
    <div className="no-max-w relative w-screen">
      <div className="absolute -top-24 left-0 right-0 z-10 h-48 bg-gradient-to-t from-transparent via-neutral-50 to-transparent dark:from-transparent dark:via-neutral-950 dark:to-transparent" />

      <div className="relative -hidden">
        <div className="absolute left-0 right-0 h-[10rem] bg-[radial-gradient(circle_at_50%_150%,#f5f5f5,transparent,transparent)] dark:bg-[radial-gradient(circle_at_50%_150%,#262626,transparent,transparent)]" />
      </div>
      <footer className="relative z-10 flex flex-col items-center justify-around p-4 text-center md:flex-row">
        <div className="w-full flex-col justify-center space-y-2 text-center text-xs">
          <p>{socialsText}</p>
          <div className="flex items-center justify-center pb-4 text-base">
            <Link
              onMouseEnter={() => setSocialsText("@sidd_underscore on GitHub")}
              onMouseLeave={() => setSocialsText("Check out my socials!")}
              className="px-2"
              href="https://github.com/Sidd-underscore"
            >
              <svg
                viewBox="0 0 256 250"
                width="1.25em"
                height="1.25em"
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid"
              >
                <path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z" />
              </svg>
            </Link>

            <Link
              onMouseEnter={() => setSocialsText("Email hello@sidd.studio")}
              onMouseLeave={() => setSocialsText("Check out my socials!")}
              className="px-2"
              href="mailto:hello@sidd.studio"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 49.4 512 399.42"
                width="1.25em"
                height="1.25em"
              >
                <g fill="none" fillRule="evenodd">
                  <g fillRule="nonzero">
                    <path
                      className="fill-current"
                      d="M34.91 448.818h81.454V251L0 163.727V413.91c0 19.287 15.622 34.91 34.91 34.91z"
                    />
                    <path
                      className="fill-current"
                      d="M395.636 448.818h81.455c19.287 0 34.909-15.622 34.909-34.909V163.727L395.636 251z"
                    />
                    <path
                      className="fill-current"
                      d="M395.636 99.727V251L512 163.727v-46.545c0-43.142-49.25-67.782-83.782-41.891z"
                    />
                  </g>
                  <path
                    className="fill-current"
                    d="M116.364 251V99.727L256 204.455 395.636 99.727V251L256 355.727z"
                  />
                  <path
                    className="fill-current"
                    fillRule="nonzero"
                    d="M0 117.182v46.545L116.364 251V99.727L83.782 75.291C49.25 49.4 0 74.04 0 117.18z"
                  />
                </g>
              </svg>
            </Link>

            <Link
              onMouseEnter={() => setSocialsText("Sidd-underscore on last.fm")}
              onMouseLeave={() => setSocialsText("Check out my socials!")}
              className="px-2"
              href="https://www.last.fm/user/sidd-underscore"
            >
              <svg
                className="fill-current"
                width="1.25em"
                height="1.25em"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M14.131 22.948l-1.172-3.193c0 0-1.912 2.131-4.771 2.131-2.537 0-4.333-2.203-4.333-5.729 0-4.511 2.276-6.125 4.515-6.125 3.224 0 4.245 2.089 5.125 4.772l1.161 3.667c1.161 3.561 3.365 6.421 9.713 6.421 4.548 0 7.631-1.391 7.631-5.068 0-2.968-1.697-4.511-4.844-5.244l-2.344-0.511c-1.624-0.371-2.104-1.032-2.104-2.131 0-1.249 0.985-1.984 2.604-1.984 1.767 0 2.704 0.661 2.865 2.24l3.661-0.444c-0.297-3.301-2.584-4.656-6.323-4.656-3.308 0-6.532 1.251-6.532 5.245 0 2.5 1.204 4.077 4.245 4.807l2.484 0.589c1.865 0.443 2.484 1.224 2.484 2.287 0 1.359-1.323 1.921-3.828 1.921-3.703 0-5.244-1.943-6.124-4.625l-1.204-3.667c-1.541-4.765-4.005-6.531-8.891-6.531-5.287-0.016-8.151 3.385-8.151 9.192 0 5.573 2.864 8.595 8.005 8.595 4.14 0 6.125-1.943 6.125-1.943z"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div className="mx-auto flex w-full justify-center">
          <SiddWordMark className="" />
        </div>
        <div className="w-full pb-4 text-xs md:mx-auto md:mb-0">
          <p>Made with Next.js and love by Sidd in Portland, OR.</p>
          <p>
            <Link className="inline-flex text-xs" href="/images/i.jpg">
              I
            </Link>
            <Link className="inline-flex text-xs" href="/images/v.jpg">
              v
            </Link>
            <Link className="inline-flex text-xs" href="/images/y.jpg">
              y
            </Link>{" "}
            says hi!
          </p>
        </div>
      </footer>
    </div>
  );
}

export function SiddWordMark({ className }) {
  return (
    <div className={"relative scale-50" + (className ? " " + className : "")}>
      {/* Vertical */}

      {/* s */}
      <div className="absolute left-[9.5px] top-0 h-full w-[0.5px] bg-neutral-400 dark:bg-neutral-600" />
      <div className="absolute left-[56px] top-0 h-full w-[0.5px] bg-neutral-400 dark:bg-neutral-600" />

      {/* i */}
      <div className="absolute left-[81.5px] top-0 h-full w-[0.5px] bg-neutral-400 dark:bg-neutral-600" />
      <div className="absolute left-[99.5px] top-0 h-full w-[0.5px] bg-neutral-400 dark:bg-neutral-600" />
      <div className="absolute left-[115px] top-0 h-full w-[0.5px] bg-neutral-400 dark:bg-neutral-600" />
      <div className="absolute left-[133.5px] top-0 h-full w-[0.5px] bg-neutral-400 dark:bg-neutral-600" />

      {/* d */}
      <div className="absolute left-[145px] top-0 h-full w-[0.5px] bg-neutral-400 dark:bg-neutral-600" />
      <div className="absolute left-[161.5px] top-0 h-full w-[0.5px] bg-neutral-400 dark:bg-neutral-600" />
      <div className="absolute left-[187px] top-0 h-full w-[0.5px] bg-neutral-400 dark:bg-neutral-600" />
      <div className="absolute left-[202.5px] top-0 h-full w-[0.5px] bg-neutral-400 dark:bg-neutral-600" />

      {/* d */}
      <div className="absolute left-[215.5px] top-0 h-full w-[0.5px] bg-neutral-400 dark:bg-neutral-600" />
      <div className="absolute left-[231.5px] top-0 h-full w-[0.5px] bg-neutral-400 dark:bg-neutral-600" />
      <div className="absolute left-[257.5px] top-0 h-full w-[0.5px] bg-neutral-400 dark:bg-neutral-600" />
      <div className="absolute left-[272.5px] top-0 h-full w-[0.5px] bg-neutral-400 dark:bg-neutral-600" />

      {/* Horizontal */}
      <div className="absolute -left-2 -right-2 top-[18px] h-[0.5px] bg-neutral-400 dark:bg-neutral-600" />
      <div className="absolute -left-2 -right-2 bottom-[21px] h-[0.5px] bg-neutral-400 dark:bg-neutral-600" />

      <div className="absolute -left-2 -right-2 top-[43px] h-[0.5px] bg-neutral-400 dark:bg-neutral-600" />
      <div className="absolute -left-2 -right-2 bottom-[32.5px] h-[0.5px] bg-neutral-400 dark:bg-neutral-600" />

      <span className="relative z-10 font-mono text-9xl font-bold">sidd</span>
    </div>
  );
}
