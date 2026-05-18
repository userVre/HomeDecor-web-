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
  title: "Android AI Home Design App for Interiors, Gardens & Exteriors",
  description:
    "HomeDecor AI is an Android app that turns real photos into AI redesign concepts for rooms, exteriors, gardens, walls, floors, and objects before you renovate.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    type: "website",
  },
};

const appScreens = [
  {
    src: "/app-screenshots/01-tools-home.webp",
    title: "Start from a real photo",
    description: "Choose the tool that matches the space or surface you want to explore.",
  },
  {
    src: "/app-screenshots/03-discover-interiors.webp",
    title: "Find a direction",
    description: "Browse refined interiors, kitchens, living rooms, and moods.",
  },
  {
    src: "/app-screenshots/05-elite-pass.webp",
    title: "Keep creating",
    description: "Claim daily Diamonds and test more visual ideas before committing.",
  },
  {
    src: "/app-screenshots/06-profile-portfolio.webp",
    title: "Build your portfolio",
    description: "Save the concepts that feel worth discussing, buying, or building.",
  },
];

const tools = [
  {
    title: "Interior Design",
    description: "Explore new room styles, furniture direction, finishes, colors, and mood from one photo.",
  },
  {
    title: "Exterior Design",
    description: "Reimagine facades, entrances, materials, colors, curb appeal, and nearby landscaping.",
  },
  {
    title: "Garden Design",
    description: "Visualize yards, patios, pools, terraces, decks, planting, lighting, and outdoor mood.",
  },
  {
    title: "Smart Wall Paint",
    description: "Brush or refine wall areas, then preview colors and finishes before painting.",
  },
  {
    title: "Floor Restyle",
    description: "Change flooring material or finish while keeping the room and furniture readable.",
  },
  {
    title: "Smart Space Planning",
    description: "Generate visual layout concepts for furniture placement and room flow.",
  },
  {
    title: "Replace Objects",
    description: "Mask an object or area, then replace it with prompted furniture, plants, decor, or details.",
  },
  {
    title: "Reference Style Transfer",
    description: "Upload a source photo and reference image to apply that design direction to your space.",
  },
];

const faqs = [
  {
    question: "What is HomeDecor AI?",
    answer:
      "HomeDecor AI is an Android mobile app that turns room, exterior, garden, wall, floor, and object photos into AI design concepts for inspiration.",
  },
  {
    question: "How does HomeDecor AI work?",
    answer:
      "You upload or capture a photo, choose a tool, space type, style, palette, material, finish, or prompt, then generate one visual redesign concept.",
  },
  {
    question: "Can I use HomeDecor AI before renovating?",
    answer:
      "Yes. It helps you visualize options before painting, decorating, changing floors, buying furniture, landscaping, or planning a renovation.",
  },
  {
    question: "Does HomeDecor AI replace an interior designer?",
    answer:
      "No. It creates visual concepts for inspiration. For measurements, construction, permits, pricing, sourcing, and final decisions, consult qualified professionals.",
  },
  {
    question: "What rooms can I redesign?",
    answer:
      "You can explore living rooms, bedrooms, kitchens, bathrooms, home offices, dining rooms, nurseries, home theaters, gaming rooms, halls, libraries, laundries, gardens, facades, floors, walls, and objects.",
  },
  {
    question: "Is HomeDecor AI free?",
    answer:
      "The app is free to start with one starting Diamond. One Diamond starts one generation, and the Elite Pass lets users claim daily Diamonds. Pro unlocks unlimited generations, watermark removal, priority processing, and premium tools.",
  },
  {
    question: "Is HomeDecor AI live on Google Play?",
    answer:
      "The public Google Play launch is not live yet. For now, Android users can join the testing channel while the public listing is prepared.",
  },
  {
    question: "Does HomeDecor AI create exact plans or cost estimates?",
    answer:
      "No. Results are visual design concepts, not exact-dimension plans, construction drawings, shopping lists, cost estimates, permit advice, or guarantees of product availability.",
  },
];

const proofPoints = [
  "Choose paint with more confidence",
  "Compare layouts before moving furniture",
  "Explore a garden before landscaping",
  "Create clearer references for contractors",
  "Improve listing visuals before a sale",
  "Test styles before buying decor",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }}
      />

      <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 pb-16 pt-10 sm:px-8 lg:min-h-[calc(100vh-88px)] lg:grid-cols-[0.92fr_0.78fr] lg:px-10">
        <div>
          <Reveal>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-brand-blue">
              HomeDecor AI for Android
            </p>
            <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[0.98] tracking-normal text-foreground sm:text-6xl lg:text-[76px]">
              Upload a photo. Visualize the redesign before you renovate.
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-[18px] leading-8 text-muted">
              HomeDecor AI is an Android app for exploring professional-looking
              interior, exterior, garden, wall, floor, object, and layout
              concepts from your own photos before you spend real money.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={testingUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics="testing_click"
                className="btn-primary h-12 px-6"
              >
                Join Android testing
              </a>
              <Link
                href="/how-it-works"
                className="btn-secondary h-12 px-6"
              >
                See how it works
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-12 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
              {["Upload photo", "Choose tool", "Generate concept"].map(
                (step, index) => (
                  <div
                    key={step}
                    className="rounded-full border border-line bg-white px-4 py-3 text-sm font-medium text-muted shadow-[0_8px_24px_rgba(28,32,36,0.035)]"
                  >
                    {String(index + 1).padStart(2, "0")} / {step}
                  </div>
                ),
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="relative mx-auto grid max-w-[520px] grid-cols-2 gap-4">
            {appScreens.slice(0, 2).map((screen, index) => (
              <div
                key={screen.src}
                className={`premium-card rounded-[32px] p-2 ${
                  index === 1 ? "mt-12" : ""
                }`}
              >
                <Image
                  src={screen.src}
                  alt={screen.title}
                  width={540}
                  height={1080}
                  priority={index === 0}
                  className="h-auto w-full rounded-[26px]"
                />
              </div>
            ))}
            <div className="absolute -bottom-7 left-1/2 w-[78%] -translate-x-1/2 rounded-full border border-line bg-white/95 px-5 py-4 text-sm font-medium shadow-[0_18px_50px_rgba(28,32,36,0.09)] backdrop-blur">
              One photo can become a clearer design conversation.
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <Reveal>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-brand-blue">
              Product proof
            </p>
            <h2 className="text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
              A real Android workflow for real visual decisions.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted">
              The website explains the idea. The Android app is where users
              upload or capture photos, generate one concept at a time,
              compare before and after, save results, share them, download
              them, and regenerate when they want another direction.
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {appScreens.map((screen, index) => (
              <Reveal key={screen.src} delay={index * 0.04}>
                <figure className="group">
                  <div className="premium-card overflow-hidden rounded-[24px] p-2">
                    <Image
                      src={screen.src}
                      alt={screen.title}
                      width={540}
                      height={1080}
                      className="h-auto w-full rounded-[22px] transition duration-500 group-hover:scale-[1.025]"
                    />
                  </div>
                  <figcaption className="mt-4">
                    <p className="font-semibold decoration-foreground underline-offset-4 group-hover:underline">
                      {screen.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {screen.description}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
        <Reveal>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-brand-blue">
            AI design tools
          </p>
          <h2 className="max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
            See the change before the expensive part begins.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool, index) => (
            <Reveal key={tool.title} delay={index * 0.035}>
              <div className="premium-card h-full rounded-[20px] p-5 transition hover:-translate-y-1 hover:border-brand-blue hover:bg-[var(--brand-blue-soft)] hover:shadow-[0_18px_45px_rgba(62,99,221,0.08)]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-5 text-xl font-semibold leading-tight">
                  {tool.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {tool.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.12}>
          <div className="mt-10">
            <Link
              href="/how-it-works"
              className="btn-secondary h-11 px-5"
            >
              Read the tool guide
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-20 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
          <Reveal>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-brand-blue">
              When it helps
            </p>
            <h2 className="text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
              Make the first decision visually, not blindly.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted">
              Use HomeDecor AI to narrow your taste, compare visual directions,
              and explain what you want. For measurements, construction,
              permits, pricing, sourcing, and availability, still verify the
              real project with professionals.
            </p>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {proofPoints.map((point, index) => (
              <Reveal key={point} delay={index * 0.04}>
                <div className="premium-card rounded-[18px] px-5 py-4 text-sm font-semibold text-foreground">
                  {point}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:px-10">
        <Reveal>
          <div className="premium-card h-full rounded-[24px] p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-blue">
              Free design answers
            </p>
            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">
              Learn the idea. Preview it in the app.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              The blog gives quick, useful answers about layouts, colors,
              small rooms, gardens, exteriors, flooring, and AI design prompts.
              Then the app lets you test the idea on your own photo.
            </p>
            <Link
              href="/blog"
              className="btn-secondary mt-8 h-11 px-5"
            >
              Explore blog guides
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="premium-card-soft h-full rounded-[24px] p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-blue">
              Pro access
            </p>
            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">
              Upgrade when you are ready to create more.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted">
              Pro is designed for people who want more room to explore:
              unlimited generations, watermark removal, priority processing,
              and premium tools inside the Android app.
            </p>
            <a
              href={testingUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics="pro_testing_click"
              className="btn-primary mt-8 h-11 px-5"
            >
              Join Android testing
            </a>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:px-10">
          <Reveal>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-brand-blue">
              FAQ
            </p>
            <h2 className="text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
              Questions people ask before trying AI home design.
            </h2>
          </Reveal>
          <div className="grid gap-3">
            {faqs.map((faq, index) => (
              <Reveal key={faq.question} delay={index * 0.035}>
                <details className="group rounded-[20px] border border-line bg-white p-5 open:shadow-[0_18px_55px_rgba(0,0,0,0.05)]">
                  <summary className="cursor-pointer list-none text-lg font-semibold decoration-foreground underline-offset-4 group-hover:underline">
                    {faq.question}
                  </summary>
                  <p className="mt-4 text-base leading-7 text-muted">
                    {faq.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
