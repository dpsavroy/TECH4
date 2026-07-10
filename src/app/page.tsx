import { HeroSection } from "@/components/hero/HeroSection";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <HeroSection />
      {/* Other homepage sections (What We Do, Engineering Systems, etc.) will go here */}
    </main>
  );
}
