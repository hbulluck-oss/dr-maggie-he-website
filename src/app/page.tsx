import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { About } from "@/components/sections/About";
import { Publications } from "@/components/sections/Publications";
import { Articles } from "@/components/sections/Articles";
import { Conditions } from "@/components/sections/Conditions";
import { Services } from "@/components/sections/Services";
import { Locations } from "@/components/sections/Locations";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { StructuredData } from "@/components/seo/StructuredData";

export default function HomePage() {
  return (
    <>
      <StructuredData type="physician" />
      <Hero />
      <TrustStrip />
      <About />
      <Publications />
      <Articles />
      <Conditions />
      <Services />
      <Locations />
      <Contact />
      <FAQ />
    </>
  );
}
