import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl, siteConfig } from "@/lib/site";

const testingUrl =
  "https://play.google.com/apps/testing/com.ismail.homedecorai";

export const metadata: Metadata = {
  title: "How HomeDecor AI Works",
  description:
    "Learn how the HomeDecor AI Android app helps users visualize interiors, exteriors, gardens, walls, floors, objects, references, and room layouts from photos.",
  alternates: {
    canonical: absoluteUrl("/how-it-works"),
  },
  openGraph: {
    title: `How HomeDecor AI Works | ${siteConfig.name}`,
    description:
      "A clear guide to the HomeDecor AI Android tools for creating visual redesign concepts from photos.",
    url: absoluteUrl("/how-it-works"),
    type: "website",
  },
};

const tools = [
  {
    title: "Interior Design",
    description:
      "Upload or capture a room photo, choose a room type and style, then explore a new furniture, decor, finish, color, and mood direction.",
    image: "/app-screenshots/01-tools-home.webp",
  },
  {
    title: "Exterior Design",
    description:
      "Preview facade styling, materials, colors, curb appeal, entrance details, and nearby landscaping for houses, villas, apartments, offices, retail, and residential buildings.",
    image: "/app-screenshots/02-tools-services.webp",
  },
  {
    title: "Garden Design",
    description:
      "Turn backyard, front yard, patio, pool, terrace, or deck photos into landscape, planting, hardscape, lighting, and outdoor furniture concepts.",
    image: "/app-screenshots/04-discover-landscapes.webp",
  },
  {
    title: "Smart Wall Paint",
    description:
      "Brush or refine wall and surface areas, then preview new colors, palettes, and finishes before buying paint.",
    image: "/app-screenshots/01-tools-home.webp",
  },
  {
    title: "Floor Restyle",
    description:
      "Preview flooring materials and finishes like oak, marble, concrete, tile, or carpet while preserving the room's readable structure.",
    image: "/app-screenshots/03-discover-interiors.webp",
  },
  {
    title: "Replace Objects",
    description:
      "Mask a clear object or area with brush and eraser controls, then replace it with prompted furniture, plants, decor, or another visual idea.",
    image: "/app-screenshots/02-tools-services.webp",
  },
  {
    title: "Reference Style Transfer",
    description:
      "Upload your space plus a reference image, then apply that inspiration direction to your own room photo.",
    image: "/app-screenshots/03-discover-interiors.webp",
  },
  {
    title: "Smart Space Planning",
    description:
      "Generate visual furniture placement and room-flow concepts. It is for layout inspiration, not exact measured planning.",
    image: "/app-screenshots/06-profile-portfolio.webp",
  },
];

const steps = [
  "Capture or upload a clear photo of a room, exterior, garden, wall, floor, object, or reference workflow.",
  "Choose the tool, space type, style, color palette, material, finish, mask, reference image, or custom prompt.",
  "Generate one visual concept, compare before and after, save it, download it, share it, or regenerate another direction.",
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to redesign a space with HomeDecor AI",
          description:
            "Upload or capture a photo, choose an AI design tool, and generate visual home design concepts in the HomeDecor AI Android app.",
          step: steps.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            text: step,
          })),
        }}
      />

      <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 pb-16 pt-10 sm:px-8 lg:grid-cols-[0.92fr_0.78fr] lg:px-10">
        <Reveal>
          <div>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-brand-blue">
              How it works
            </p>
            <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[0.96] tracking-normal sm:text-7xl">
              From real photo to redesign concept in a few clear steps.
            </h1>
            <p className="mt-7 max-w-2xl text-[18px] leading-8 text-muted">
              HomeDecor AI helps Android users test visual directions for
              interiors, exteriors, gardens, walls, floors, objects, references,
              and layouts before making real-world renovation or buying
              decisions.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={testingUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics="how_testing_click"
                className="btn-primary h-12 px-6"
              >
                Join Android testing
              </a>
              <Link
                href="/blog"
                className="btn-secondary h-12 px-6"
              >
                Read free guides
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mx-auto grid max-w-[480px] grid-cols-2 gap-4">
            <Image
              src="/app-screenshots/01-tools-home.webp"
              alt="HomeDecor AI tools screen"
              width={540}
              height={1080}
              priority
              className="premium-card rounded-[30px] p-2"
            />
            <Image
              src="/app-screenshots/02-tools-services.webp"
              alt="HomeDecor AI services screen"
              width={540}
              height={1080}
              priority
              className="premium-card mt-12 rounded-[30px] p-2"
            />
          </div>
        </Reveal>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid w-full max-w-7xl gap-4 px-6 py-16 sm:px-8 md:grid-cols-3 lg:px-10">
          {steps.map((step, index) => (
            <Reveal key={step} delay={index * 0.05}>
              <div className="premium-card h-full rounded-[22px] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-blue">
                  Step {index + 1}
                </p>
                <p className="mt-5 text-xl font-semibold leading-8">{step}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
        <Reveal>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-brand-blue">
            Tool guide
          </p>
          <h2 className="max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
            Focused tools for the decisions that change how a space feels.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {tools.map((tool, index) => (
            <Reveal key={tool.title} delay={index * 0.035}>
              <article className="premium-card grid h-full gap-5 rounded-[22px] p-5 transition hover:-translate-y-1 hover:border-brand-blue hover:bg-[var(--brand-blue-soft)] sm:grid-cols-[150px_1fr]">
                <div className="max-h-[230px] overflow-hidden rounded-[18px] border border-line bg-surface">
                  <Image
                    src={tool.image}
                    alt={`${tool.title} in HomeDecor AI`}
                    width={540}
                    height={1080}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div className="self-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold leading-tight">
                    {tool.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-muted">
                    {tool.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-[var(--brand-blue-soft)]">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-16 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-blue">
              Honest planning
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
              Visualize first. Build only after checking the details.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
              Generated results are visual design concepts for inspiration.
              Check measurements, construction needs, permits, pricing, product
              availability, and professional requirements before final
              decisions.
            </p>
          </div>
          <a
            href={testingUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics="how_bottom_testing_click"
            className="btn-primary h-12 px-6"
          >
            Join Android testing
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
