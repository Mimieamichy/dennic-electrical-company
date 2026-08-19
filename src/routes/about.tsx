import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { About, Safety, WhyUs, Footer } from "@/components/Sections";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · Dennic Electrical Construction Company" },
      { name: "description", content: "Dennic Electrical Construction Company — engineer-led delivery, self-perform crews and a zero-harm safety culture built over two decades." },
      { property: "og:title", content: "About Dennic Electrical Construction Company" },
      { property: "og:description", content: "Engineer-led delivery, self-perform crews and a zero-harm safety culture built over two decades." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/90632969-1feb-438e-95fe-2dbea5b9d6be/id-preview-f97b2533--2cbd2622-42db-4c77-9b34-9caa937c8ef8.lovable.app-1783379826842.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/90632969-1feb-438e-95fe-2dbea5b9d6be/id-preview-f97b2533--2cbd2622-42db-4c77-9b34-9caa937c8ef8.lovable.app-1783379826842.png" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="relative min-h-screen bg-white text-navy pt-24 sm:pt-28 md:pt-32">
      <Header variant="solid" />
     
      <About />
      <WhyUs />
      <Safety />
      <Footer />
    </main>
  );
}
