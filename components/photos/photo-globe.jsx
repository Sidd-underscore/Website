"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import photos, { LOCATION_COORDS } from "@/lib/photos";
import { useTheme } from "next-themes";
import { Globe } from "@/components/ui/globe";

function processLocations() {
  const locations = new Map();

  photos.forEach((photo) => {
    const locationKey = photo.location;

    if (!locations.has(locationKey)) {
      const coords = LOCATION_COORDS[locationKey];
      if (coords) {
        const [city] = locationKey.split(",");
        locations.set(locationKey, {
          city: city.trim(),
          coords,
          count: 1,
          fullLocation: locationKey,
        });
      }
    } else {
      const location = locations.get(locationKey);
      location.count++;
    }
  });

  return Array.from(locations.values());
}

function generateArcs(locations, theme) {
  const color =
    theme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)";
  return locations.flatMap((startLoc, i) =>
    locations
      .slice(i + 1)
      .filter(() => Math.random() < 0.3)
      .map((endLoc) => ({
        startLat: startLoc.coords.lat,
        startLng: startLoc.coords.lng,
        endLat: endLoc.coords.lat,
        endLng: endLoc.coords.lng,
        color,
        altitude: 0.3,
        dashAnimateTime: Math.random() * 4000 + 1000,
      })),
  );
}

export function PhotoGlobe({
  onLocationClick,
  width,
  height,
  showArcs = true,
  enableZoom = true,
}) {
  const { theme } = useTheme();

  const [locations] = useState(processLocations);
  const [hoverLabel, setHoverLabel] = useState(null);
  const [arcs, setArcs] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const containerRef = useRef(null);
  const globeRef = useRef(null);

  const globeImage =
    theme === "dark"
      ? "//unpkg.com/three-globe/example/img/earth-night.jpg"
      : "//unpkg.com/three-globe/example/img/earth-day.jpg";

  function updateControls() {
    const controls = globeRef.current.controls();
    if (controls) {
      controls.enableZoom = enableZoom;
      controls.update();
    }

    globeRef.current.pointOfView({ lat: 30, lng: -105, altitude: 2.5 }, 0);
  }

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      const container = containerRef.current;
      const parentWidth = container.parentElement.offsetWidth;

      setDimensions({
        width: width || parentWidth,
        height: height || width || parentWidth,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (showArcs) {
      setArcs(generateArcs(locations, theme));
    }
  }, [theme, locations, showArcs]);

  return (
    <div
      ref={containerRef}
      className="flex w-full items-center justify-center"
      style={{ height: height || "100%" }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-md">
        <Globe
          onGlobeReady={updateControls}
          ref={globeRef}
          width={width || dimensions.width}
          height={height || dimensions.height}
          globeImageUrl={globeImage}
          backgroundColor="rgba(0,0,0,0)"
          labelsData={locations}
          labelLat={(d) => d.coords.lat}
          labelLng={(d) => d.coords.lng}
          labelText={(d) => `${d.city} (${d.count})`}
          labelSize={(d) => Math.min(0.8, 0.4 + Math.sqrt(d.count) * 0.02)}
          labelColor={(d) => (d === hoverLabel ? "#fbbf24" : "#ffffff")}
          labelDotRadius={(d) => (d === hoverLabel ? 0.4 : 0.25)}
          labelAltitude={(d) => (d === hoverLabel ? 0.02 : 0.01)}
          labelLabel={(d) => `${d.fullLocation} (${d.count} photos)`}
          labelIncludeDot={true}
          onLabelClick={(d) => {
            if (onLocationClick) {
              onLocationClick(d.fullLocation);
            }
          }}
          onLabelHover={setHoverLabel}
          arcsData={arcs}
          arcColor="color"
          arcAltitude="altitude"
          arcDashLength={0.5}
          arcDashGap={0.2}
          arcStroke={0.25}
          arcDashAnimateTime={(d) => d.dashAnimateTime}
          arcDashInitialGap={0.5}
        />
        {onLocationClick && (
          <div className="pointer-events-none absolute right-2 bottom-2 text-xs text-neutral-400">
            Click locations to filter
          </div>
        )}
      </div>
    </div>
  );
}
