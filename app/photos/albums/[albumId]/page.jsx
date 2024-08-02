import { PhotosMain } from "@/components/photos/main";
import {projects} from '@/lib/projects';

export async function generateMetadata({ params }, parent) {
    const { albumId } = params;
  
    return {
      title: albumId.charAt(0).toUpperCase() + albumId.slice(1) + " / Albums / Photography",
    };
  }

export default function AlbumPage({params}) {

    const { albumId } = params;

  return (
    <>
      <h1 className="text-5xl font-bold">Album: {albumId.charAt(0).toUpperCase() + albumId.slice(1)}</h1>

      <PhotosMain />
    </>
  );
}
