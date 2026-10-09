import NotFound from "@/app/not-found";
import { Work } from "@/components/home/work";
import { Separator } from "@/components/ui/separator";

export default function WorkNotFound() {
  return (
    <>
      <NotFound prefix="Work" />
      <Separator className="mt-10 -mb-10" />
      <Work />
    </>
  );
}
