import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { Projects, Testimonials, Footer } from "@/components/Sections";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects · Dennic Electrical Construction Company" },
      { name: "description", content: "Selected turnkey deliveries — substations, data campuses, industrial electrification and renewable balance-of-plant." },
      { property: "og:title", content: "Projects · Dennic Electrical Construction Company" },
      { property: "og:description", content: "A snapshot of recent turnkey deliveries across utility, industrial and renewables sectors." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <main className="relative min-h-screen bg-[color:var(--navy-deep)] text-white pt-24 sm:pt-28 md:pt-32">
      <Header variant="solid" />
      <Projects />
      <Testimonials />
      <Footer />
    </main>
  );
}
