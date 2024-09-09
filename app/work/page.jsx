import { Work } from "@/components/home/work";

const year = new Date().getFullYear();

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
