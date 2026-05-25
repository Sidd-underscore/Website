import { cn } from "@/lib/utils";

export const ICONS = {
  Sun: "0 0 42 42",
  StarGroup2: "42 0 42 42",
  StarGroup3: "84 0 42 42",
  StarGroup3_2: "126 0 42 42",
  Convergence: "168 0 42 42",
  Bloom: "210 0 42 42",
  StarOrbit: "252 0 42 42",
  CircleStarHollow: "294 0 42 42",
  CircleStarFill: "336 0 42 42",
  CircleCut: "378 0 42 42",
  ShootingStar: "420 0 42 42",
  StarShadow: "462 0 42 42",
  StarStroke: "0 42 84 42",
  Globe: "84 42 84 42",
  CircleOut: "168 42 84 42",
  StarGlobe: "252 42 84 42",
  ShootingStar_2: "336 42 84 42",
  StarTrail: "420 42 84 42",
};

const iconAspectRatios = {
  Sun: 1,
  StarGroup2: 1,
  StarGroup3: 1,
  StarGroup3_2: 1,
  Convergence: 1,
  Bloom: 1,
  StarOrbit: 1,
  CircleStarHollow: 1,
  CircleStarFill: 1,
  CircleCut: 1,
  ShootingStar: 1,
  StarShadow: 1,
  StarStroke: 2,
  Globe: 2,
  CircleOut: 2,
  StarGlobe: 2,
  ShootingStar_2: 2,
  StarTrail: 2,
};

export function Icon({
  name = "Sun",
  title,
  className,
  imageClassName,
  size = "default",
  ...props
}) {
  return (
    <svg
      viewBox={ICONS[name] || ICONS.Sun}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      className={cn(
        "inline-block shrink-0 overflow-hidden",
        size === "default"
          ? iconAspectRatios[name] === 1
            ? "size-6"
            : "h-6 w-12"
          : size === "lg"
            ? iconAspectRatios[name] === 1
              ? "size-8"
              : "h-8 w-16"
            : size === "sm"
              ? iconAspectRatios[name] === 1
                ? "size-4"
                : "h-4 w-8"
              : size === "xl"
                ? iconAspectRatios[name] === 1
                  ? "size-12"
                  : "h-12 w-24"
                : null,
        className,
      )}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <image
        href="/icons.svg"
        width="507"
        height="84"
        className={cn("pointer-events-none", imageClassName)}
      />
    </svg>
  );
}

export const iconNames = Object.keys(ICONS);
