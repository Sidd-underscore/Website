import { lightshows } from "@/lib/projects";

export function LightshowGallery() {
  return (
    <div className="mb-12 flex flex-col gap-4 p-4 xl:grid xl:grid-flow-row xl:grid-cols-2">
      {lightshows.map((show) => (
        <span
          key={JSON.stringify(show)}
          className="block overflow-hidden border-2 border-black bg-white p-2 shadow-[6px_6px_0_#000]"
        >
          {show}
        </span>
      ))}
    </div>
  );
}
