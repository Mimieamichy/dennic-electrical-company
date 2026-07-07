import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { Services, Footer } from "@/components/Sections";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services · Dennic Electrical Construction Company" },
      { name: "description", content: "Turnkey electrical construction, HV installations, industrial systems, commercial fit-out, renewable integration and maintenance & testing." },
      { property: "og:title", content: "Services · Dennic Electrical Construction Company" },
      { property: "og:description", content: "Six integrated disciplines under one accountable delivery team." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/90632969-1feb-438e-95fe-2dbea5b9d6be/id-preview-f97b2533--2cbd2622-42db-4c77-9b34-9caa937c8ef8.lovable.app-1783379826842.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/90632969-1feb-438e-95fe-2dbea5b9d6be/id-preview-f97b2533--2cbd2622-42db-4c77-9b34-9caa937c8ef8.lovable.app-1783379826842.png" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-[color:var(--navy-deep)] text-white pt-24 sm:pt-28 md:pt-32">
      <Header variant="solid" />
     
      <Services />
      <Footer />
    </main>
  );
}
