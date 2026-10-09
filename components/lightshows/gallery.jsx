import { lightshows } from "@/lib/lightshows";
import { cn } from "@/lib/utils";

export function LightshowGallery() {
  return (
    <div className="mb-12 flex flex-col m-8 2xl:m-16 xl:grid xl:grid-flow-row xl:grid-cols-2">
      {lightshows.map((show, index) => (
        <span
          key={show.key ?? `lightshow-item-${index}`}
          className={cn(
            "block overflow-hidden border-2 border-black bg-white shadow-[6px_6px_0_#000]",
            show.key === "lightshows_shorts" && "bg-black xl:col-span-2",
          )}
        >
          {show}
        </span>
      ))}
    </div>
  );
}
