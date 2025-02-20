"use client";

import dynamic from "next/dynamic";
import { forwardRef, useImperativeHandle, useRef } from "react";

const ReactGlobe = dynamic(() => import("react-globe.gl"), { ssr: false });

const Globe = forwardRef((props, ref) => {
  const globeRef = useRef();

  useImperativeHandle(ref, () => ({
    pointOfView: (coords, duration) => {
      if (globeRef.current) {
        globeRef.current.pointOfView(coords, duration);
      }
    },
    controls: () => {
      if (globeRef.current) {
        return globeRef.current.controls();
      }
    },
  }));

  return <ReactGlobe ref={globeRef} {...props} />;
});

export { Globe };
