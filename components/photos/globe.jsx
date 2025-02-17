import dynamic from "next/dynamic";
import { useEffect, useState, useRef, useCallback } from "react";
import photos, { LOCATION_COORDS } from "@/lib/photos";
import { useTheme } from "next-themes";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

function processLocations() {
  const locations = new Map();

  photos.forEach((photo) => {
    const isGalapagos = photo.location.includes("Galapagos Islands");
    const locationKey = isGalapagos
      ? "Galapagos Islands, Ecuador"
      : photo.location;

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
}) {
  const { theme } = useTheme();
  const [locations] = useState(processLocations);
  const [hoverLabel, setHoverLabel] = useState(null);
  const [arcs, setArcs] = useState([]);
  const globeRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const initializedRef = useRef(false);

  const globeImage =
    theme === "dark"
      ? "//unpkg.com/three-globe/example/img/earth-night.jpg"
      : "//unpkg.com/three-globe/example/img/earth-day.jpg";

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      const container = containerRef.current;
      const parentWidth = container.parentElement.clientWidth;
      const parentHeight = container.parentElement.clientHeight;
      
      setDimensions({
        width: parentWidth,
        height: height || parentHeight || parentWidth * 0.6 // 0.6 aspect ratio if no height
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [height]);

  useEffect(() => {
    if (!globeRef.current || initializedRef.current) return;

    // Initial setup - only runs once
    globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 });
    const controls = globeRef.current.controls();
    controls.enableZoom = true;
    controls.minDistance = 200;
    controls.maxDistance = 380;

    if (!onLocationClick) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
    }

    initializedRef.current = true;
  }, []);

  const handleLocationClick = useCallback((d) => {
    if (onLocationClick) {
      onLocationClick(d.fullLocation);
    }
  }, [onLocationClick]);

  // Update arcs only when theme changes
  useEffect(() => {
    if (showArcs) {
      setArcs(generateArcs(locations, theme));
    }
  }, [theme, locations, showArcs]);

  return (
    <div 
      ref={containerRef}
      className="flex items-center justify-center w-full"
      style={{ height: height || '100%' }}
    >
      <div
        className="relative overflow-hidden rounded-md w-full h-full"
      >
        <Globe
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
          onLabelClick={onLocationClick ? handleLocationClick : undefined}
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
