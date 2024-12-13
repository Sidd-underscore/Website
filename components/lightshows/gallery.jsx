import { lightshows } from "@/lib/projects";

export function LightshowGallery() {
  return (
    <div className="mb-12 p-10 gap-4 xl:grid grid-flow-row grid-cols-2">
      {lightshows.map((show) => (
        <span key={JSON.stringify(show)}>{show}</span>
      ))}
    </div>
  );
}
