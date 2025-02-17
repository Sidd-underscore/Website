import { lightshows } from "@/lib/projects";

export function LightshowGallery() {
  return (
    <div className="mb-12 space-x-4 p-10 xl:grid xl:grid-flow-row xl:grid-cols-2 xl:gap-4 xl:space-x-0">
      {lightshows.map((show) => (
        <span key={JSON.stringify(show)}>{show}</span>
      ))}
    </div>
  );
}
