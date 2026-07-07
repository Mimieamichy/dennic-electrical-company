import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Contact, Footer } from "@/components/Sections";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact · Dennic Electrical Construction Company" },
      { name: "description", content: "Request a quote — tell us about your site, load profile and timeline. A senior engineer will respond within one business day." },
      { property: "og:title", content: "Contact · Dennic Electrical Construction Company" },
      { property: "og:description", content: "Have a project? Let's engineer the power behind it." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="relative min-h-screen bg-[color:var(--navy-deep)] text-white pt-24 sm:pt-28 md:pt-32">
      <Header variant="solid" />
      <Contact />
      <Footer />
    </main>
  );
}
