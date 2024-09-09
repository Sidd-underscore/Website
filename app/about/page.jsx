import { AboutSplash } from "@/components/about/splash";

export const metadata = {
  title: "About me",
  description: "Who am I...?",
};

export default function AboutPage() {
  return (
    <div className="no-max-w">
      <AboutSplash />
    </div>
  );
}
