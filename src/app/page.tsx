import { HeroSection } from "@/components/hero/HeroSection";
import { WhatWeDo } from "@/components/sections/WhatWeDo";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <HeroSection />
      <WhatWeDo />
    </main>
  );
}
