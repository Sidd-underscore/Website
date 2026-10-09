import { Work } from "@/components/home/work";

export const metadata = {
  title: "Work",
  description: `A list of my work experiences.`,
};

export default function WorkPage() {
  return (
    <>
      <Work className="m-0" />
    </>
  );
}
