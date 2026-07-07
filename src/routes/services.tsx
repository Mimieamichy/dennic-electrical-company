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
