import "server-only";

import fs from "node:fs";
import path from "node:path";

import { ProductImage } from "@/components/ui/product-image";

const SNAPSHOT_DIRECTORY = path.join(
  process.cwd(),
  "public",
  "images",
  "projects",
  "lightshows",
  "snapshots",
);

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const YOUTUBE_INSERT_IMAGE_INDICES = [12, 19, 22, 23, 24];

const youtubeShows = [
  {
    id: "qkknl4tB6MM",
    title: "ISOKNOCK - Blind (Rave Mix) | Lightshow",
  },
  {
    id: "6nVq0lOSp0Y",
    title: "Martin Garrix, Arijit Singh - Angels For Each Other | Lightshow",
  },
  {
    id: "1ndWtmUYq5o",
    title: "DJ Isaac - Rise (Lightshow)",
  },
  {
    id: "HWh7Jb_952c",
    title: "Chase & Status, Bou - Baddadan (Henry Fong Remix) | Lightshow",
  },
  {
    id: "E8QyNwXD09g",
    title: "KSHMR - The Spook (Returns) | Lightshow",
  },
];

function slugifySnapshotName(fileName) {
  const withoutExt = fileName.replace(/\.[^.]+$/, "");

  return withoutExt
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function getSnapshotFileNames() {
  return fs
    .readdirSync(SNAPSHOT_DIRECTORY)
    .filter((fileName) => {
      const ext = path.extname(fileName).toLowerCase();
      return IMAGE_EXTENSIONS.has(ext)
    })
}

function createYoutubeEmbed({ id, title }) {
  return (
    <iframe
      key={title}
      className="aspect-video h-full w-full rounded-lg border-2 border-neutral-200"
      src={`https://www.youtube.com/embed/${id}`}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  );
}

function createSnapshotImage(fileName) {
  const encodedFileName = encodeURIComponent(fileName);
  const slug = slugifySnapshotName(fileName);

  return (
    <ProductImage
      key={`lightshows_snapshot_${slug || encodedFileName}`}
      alt={`lightshows_snapshot_${slug || "image"}`}
      src={`/images/projects/lightshows/snapshots/${encodedFileName}`}
      staticImage={true}
      className="aspect-video h-full w-full"
    />
  );
}

function buildLightshowMedia() {
  const snapshotMedia = getSnapshotFileNames().map(createSnapshotImage);
  const result = [];

  let youtubeIndex = 0;

  for (let imageIndex = 0; imageIndex < snapshotMedia.length; imageIndex++) {
    while (YOUTUBE_INSERT_IMAGE_INDICES[youtubeIndex] === imageIndex) {
      result.push(createYoutubeEmbed(youtubeShows[youtubeIndex]));
      youtubeIndex += 1;
    }

    result.push(snapshotMedia[imageIndex]);
  }

  while (youtubeIndex < youtubeShows.length) {
    result.push(createYoutubeEmbed(youtubeShows[youtubeIndex]));
    youtubeIndex += 1;
  }

  return result;
}

export const lightshows = buildLightshowMedia();
