"use client";

import * as React from "react";

import credits from "@/lib/hadestown-credits.json";

import { Button } from "@/components/ui/button";

const TARGET_UTC_MS = Date.parse("2025-12-20T19:00:00.000Z"); // 11:00 AM PST
const MOVIE_DOWNLOAD_SRC = "/hadestown.mp4";
const YOUTUBE_VIDEO_ID = "OhoKKaMsJtA";

const YOUTUBE_URL = YOUTUBE_VIDEO_ID
  ? `https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`
  : "";
const YOUTUBE_EMBED_URL = YOUTUBE_VIDEO_ID
  ? `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`
  : "";

function clampToZero(number) {
  return number < 0 ? 0 : number;
}

function formatRemaining(remainingMs) {
  const totalSeconds = Math.floor(clampToZero(remainingMs) / 1000);

  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  const pad2 = (n) => String(n).padStart(2, "0");

  return {
    days,
    hours: pad2(hours),
    minutes: pad2(minutes),
    seconds: pad2(seconds),
  };
}

export function HadestownCountdown() {
  const [nowMs, setNowMs] = React.useState(null);

  React.useEffect(() => {
    setNowMs(Date.now());
    const interval = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const remainingMs = nowMs == null ? null : TARGET_UTC_MS - nowMs;
  const isLive = remainingMs != null && remainingMs <= 0;
  const formatted = remainingMs == null ? null : formatRemaining(remainingMs);

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-sm text-neutral-600 dark:text-neutral-300">
        Sing it again!
      </p>

      <h1 className="mt-2 text-5xl sm:text-7xl font-black tracking-tight">
        HADES<span className="font-medium">TOWN</span>
      </h1>

      <div className="mt-6 font-mono text-4xl tracking-tight tabular-nums md:text-5xl">
        {remainingMs == null ? (
          <span>--d --h --m --s</span>
        ) : isLive ? (
          <span>Live now</span>
        ) : (
          <span>
            {formatted.days}d {formatted.hours}h {formatted.minutes}m{" "}
            {formatted.seconds}s
          </span>
        )}
      </div>

      <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
        Saturday, Dec 20, 2025 • 11:00 AM PST
      </p>
    </section>
  );
}

function splitRoleLine(line) {
  const raw = String(line ?? "").trim();
  if (!raw) return null;

  const divider = " — ";
  const idx = raw.indexOf(divider);
  if (idx === -1) return { role: null, value: raw };

  const role = raw.slice(0, idx).trim();
  const value = raw.slice(idx + divider.length).trim();
  if (!role || !value) return { role: null, value: raw };
  return { role, value };
}

function CreditsBlock({ creditsJson }) {
  const sections = Array.isArray(creditsJson?.sections) ? creditsJson.sections : [];

  return (
    <div className="text-sm leading-7 text-neutral-700 dark:text-neutral-300">
      {sections.map((section, sectionIndex) => {
        const title = section?.title ? String(section.title) : "";
        const lines = Array.isArray(section?.lines) ? section.lines : [];

        return (
          <div key={`${title}-${sectionIndex}`} className={sectionIndex === 0 ? "" : "mt-10"}>
            {title ? (
              <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-900 dark:text-neutral-100">
                {title}
              </h2>
            ) : null}

            <ul className={title ? "mt-3" : ""}>
              {lines.map((line, lineIndex) => {
                const parsed = splitRoleLine(line);
                if (parsed == null) {
                  return <li key={lineIndex} className="h-4" />;
                }

                return (
                  <li key={lineIndex}>
                    {parsed.role ? (
                      <>
                        <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                          {parsed.role}
                        </span>
                        <span>{` — ${parsed.value}`}</span>
                      </>
                    ) : (
                      <span>{parsed.value}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function formatTimeString(utcMs) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/Los_Angeles",
      timeZoneName: "short",
    }).format(new Date(utcMs));
  } catch {
    return "Saturday, Dec 20, 2025 • 11:00 AM PST";
  }
}

export function HadestownExperience() {
  const isProduction = process.env.NODE_ENV === "production";

  // In dev: show cinema view immediately. In prod: auto-switch at release time.
  const [viewMode, setViewMode] = React.useState(
    isProduction ? "auto" : "cinema",
  );
  const [nowMs, setNowMs] = React.useState(null);
  const [showStickyActions, setShowStickyActions] = React.useState(false);
  const [isFooterVisible, setIsFooterVisible] = React.useState(false);
  const [shareState, setShareState] = React.useState("idle");

  React.useEffect(() => {
    setNowMs(Date.now());
    const interval = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const onScroll = () => setShowStickyActions(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const footerEl = document.querySelector("footer");
    if (!footerEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.01 },
    );

    observer.observe(footerEl);
    return () => observer.disconnect();
  }, []);

  const isReleased = nowMs != null && nowMs >= TARGET_UTC_MS;
  const effectiveView =
    viewMode === "auto" ? (isReleased ? "cinema" : "countdown") : viewMode;

  const remainingMs = nowMs == null ? null : TARGET_UTC_MS - nowMs;
  const isLive = remainingMs != null && remainingMs <= 0;
  const formatted = remainingMs == null ? null : formatRemaining(remainingMs);

  const shouldShowStickyActions = showStickyActions && !isFooterVisible;

  async function onShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Hadestown",
          text: "Hadestown — watch page",
          url,
        });
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setShareState("copied");
        setTimeout(() => setShareState("idle"), 1500);
      }
    } catch {
      // Keep minimal: no extra UI.
    }
  }

  return (
    <div>
      {!isProduction && (
        <div className="flex justify-end">
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              setViewMode((v) => (v === "cinema" ? "countdown" : "cinema"))
            }
          >
            Debug: {effectiveView === "cinema" ? "Cinema" : "Countdown"}
          </Button>
        </div>
      )}

      {effectiveView === "countdown" ? (
        <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Sing it again!
          </p>

          <h1 className="mt-2 text-5xl font-black tracking-tight sm:text-7xl">
            HADES<span className="font-medium">TOWN</span>
          </h1>

          <div className="mt-6 font-mono text-4xl tabular-nums tracking-tight md:text-5xl">
            {remainingMs == null ? (
              <span>--d --h --m --s</span>
            ) : isLive ? (
              <span>Live now</span>
            ) : (
              <span>
                {formatted.days}d {formatted.hours}h {formatted.minutes}m{" "}
                {formatted.seconds}s
              </span>
            )}
          </div>

          <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
            {formatTimeString(TARGET_UTC_MS)}
          </p>
        </section>
      ) : (
        <>
          <div className="no-max-w -m-6 mb-0! md:-m-12 2xl:-m-24">
            <section className="flex min-h-[70vh] flex-col items-center justify-center bg-neutral-950 px-2 py-16 text-center text-white md:px-4">
              <p className="text-xs uppercase tracking-widest text-neutral-300">
                Now playing
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">
                HADES<span className="font-medium">TOWN</span>
              </h1>

              <div className="mt-10 w-full">
                <div className="aspect-video w-full bg-black">
                    <iframe
                      className="h-full w-full"
                      src={YOUTUBE_EMBED_URL}
                      title="Hadestown"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  
                </div>
              </div>
            </section>
          </div>

          <section className="relative z-20 mx-auto mt-14 max-w-2xl pb-32">
            <CreditsBlock creditsJson={credits} />
          </section>

          <div
            className={
              "fixed bottom-4 left-1/2 z-50 w-[min(560px,calc(100vw-2rem))] -translate-x-1/2 transition-opacity " +
              (shouldShowStickyActions
                ? "opacity-100"
                : "pointer-events-none opacity-0")
            }
          >
            <div className="flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white/90 p-2 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
              <Button asChild variant="outline">
                <a href={MOVIE_DOWNLOAD_SRC} download>
                  Download
                </a>
              </Button>
              {YOUTUBE_URL ? (
                <Button asChild variant="outline">
                  <a href={YOUTUBE_URL} target="_blank" rel="noreferrer">
                    View on YouTube
                  </a>
                </Button>
              ) : (
                <Button variant="outline" disabled>
                  View on YouTube
                </Button>
              )}
              <Button variant="outline" onClick={onShare}>
                {shareState === "copied" ? "Copied" : "Share"}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
