import { Link } from "@/components/ui/link";

export const metadata = {
  title: "Photography",
};

export default function PhotosPage() {
  const sections = ["Gallery", "Albums"];
  return (
    <>
      <h1 className="text-5xl font-bold">Photography</h1>

      <p className="mt-6">
        Being able to capture a moment, a scene, or a subject is my favorite way
        of documenting life.
      </p>

      <p className="mt-2">
        I don&apos;t have a lot of time to spend on photography, but I do enjoy
        just taking pictures of the moment, regardless of perfect framing or
        composition. Sometimes, this technique works out well, sometimes it
        doesn&apos;t. The ones that do are showcased below.
      </p>

      <div className="mt-10 flex items-center justify-center gap-4">
        {sections.map((section, index) => (
          <Link
            href={`/photos/${section.toLowerCase()}`}
            key={index}
            className="h-48 w-1/2 rounded-lg border-2 border-neutral-700 bg-neutral-900 p-4 text-center"
          >
            View the {section}
          </Link>
        ))}
      </div>
    </>
  );
}
