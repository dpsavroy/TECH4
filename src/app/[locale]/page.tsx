import { HeroSection } from "@/components/hero/HeroSection";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { ProcesSection } from "@/components/sections/ProcesSection";
import { SystemySection } from "@/components/sections/SystemySection";
import { HelpDeskSection } from "@/components/sections/HelpDeskSection";
import { KontaktSection } from "@/components/sections/KontaktSection";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <HeroSection />
      <WhatWeDo />
      <ProcesSection />
      <SystemySection />
      <HelpDeskSection />
      <KontaktSection />
    </main>
  );
}
