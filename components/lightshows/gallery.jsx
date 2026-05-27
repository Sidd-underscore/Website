import { lightshows } from "@/lib/lightshows";

export function LightshowGallery() {
  return (
    <div className="mb-12 flex flex-col gap-4 m-16 xl:grid xl:grid-flow-row xl:grid-cols-2">
      {lightshows.map((show, index) => (
        <span
          key={show.key ?? `lightshow-item-${index}`}
          className="block overflow-hidden border-2 border-black bg-white shadow-[6px_6px_0_#000]"
        >
          {show}
        </span>
      ))}
    </div>
  );
}
