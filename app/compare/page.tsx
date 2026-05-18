import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { comparisonPages } from "@/lib/comparisons";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "HomeDecor AI Comparisons",
  description:
    "Compare HomeDecor AI with interior designers, mood boards, Pinterest inspiration, and manual room planning without overstating what AI can do.",
  alternates: {
    canonical: absoluteUrl("/compare"),
  },
  openGraph: {
    title: `HomeDecor AI Comparisons | ${siteConfig.name}`,
    description:
      "Honest comparisons for homeowners and renovators exploring AI visual concepts before spending money.",
    url: absoluteUrl("/compare"),
    type: "website",
  },
};

export default function CompareIndexPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <Reveal>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-brand-blue">
            Comparisons
          </p>
          <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[0.98] sm:text-7xl">
            Know when AI helps, and when a professional still matters.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted">
            Clear comparisons for homeowners and renovators who want faster
            visual options without confusing inspiration with construction,
            permits, sourcing, pricing, or measured project planning.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {comparisonPages.map((page, index) => (
            <Reveal key={page.slug} delay={index * 0.04}>
              <Link
                href={`/compare/${page.slug}`}
                className="premium-card group block h-full rounded-[22px] p-6 transition hover:-translate-y-1 hover:border-brand-blue hover:bg-[var(--brand-blue-soft)] hover:shadow-[0_18px_45px_rgba(62,99,221,0.08)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
                  Guide {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-5 text-2xl font-semibold leading-tight decoration-foreground underline-offset-4 group-hover:underline">
                  {page.title}
                </h2>
                <p className="mt-4 text-base leading-7 text-muted">
                  {page.description}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
