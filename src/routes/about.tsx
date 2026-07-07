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
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[color:var(--navy-deep)] text-white pt-24 sm:pt-28 md:pt-32">
      <Header variant="solid" />
     
      <About />
      <WhyUs />
      <Safety />
      <Footer />
    </main>
  );
}
