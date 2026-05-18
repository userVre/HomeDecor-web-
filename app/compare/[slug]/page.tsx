import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { comparisonPages, getComparisonPage } from "@/lib/comparisons";
import { absoluteUrl, siteConfig } from "@/lib/site";

type ComparePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const testingUrl =
  "https://play.google.com/apps/testing/com.ismail.homedecorai";

export function generateStaticParams() {
  return comparisonPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: ComparePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getComparisonPage(slug);

  if (!page) {
    return {
      title: "Comparison not found | HomeDecor AI",
    };
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: absoluteUrl(`/compare/${page.slug}`),
    },
    openGraph: {
      title: `${page.title} | ${siteConfig.name}`,
      description: page.description,
      url: absoluteUrl(`/compare/${page.slug}`),
      type: "article",
    },
  };
}

export default async function CompareDetailPage({ params }: ComparePageProps) {
  const { slug } = await params;
  const page = getComparisonPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: page.title,
          description: page.description,
          mainEntityOfPage: absoluteUrl(`/compare/${page.slug}`),
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
          },
        }}
      />

      <article>
        <header className="mx-auto w-full max-w-[920px] px-6 pb-10 pt-12 sm:px-8">
          <Link
            href="/compare"
            className="mb-10 inline-flex text-sm font-medium text-muted underline-offset-4 transition hover:text-foreground hover:underline"
          >
            Back to comparisons
          </Link>
          <Reveal>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-brand-blue">
              Honest comparison
            </p>
            <h1 className="max-w-[840px] text-balance text-[36px] font-semibold leading-[1.04] tracking-normal sm:text-[58px] md:text-[68px]">
              {page.title}
            </h1>
            <p className="mt-7 max-w-[720px] text-[18px] leading-8 text-muted sm:text-[20px] sm:leading-9">
              {page.intro}
            </p>
          </Reveal>
        </header>

        <div className="mx-auto w-full max-w-[920px] px-6 pb-20 sm:px-8">
          <Reveal>
            <section className="rounded-[24px] border border-line bg-surface p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-blue">
                Best for
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {page.bestFor.map((item) => (
                  <div
                    key={item}
                    className="rounded-full border border-line bg-white px-4 py-3 text-sm font-medium text-muted"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal className="premium-card mt-10 overflow-hidden rounded-[24px]">
            <div className="grid border-b border-[var(--brand-blue-line)] bg-[var(--brand-blue-soft)] px-5 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-blue sm:grid-cols-[0.7fr_1fr_1fr]">
              <span>Factor</span>
              <span>HomeDecor AI</span>
              <span>Alternative</span>
            </div>
            {page.rows.map((row) => (
              <div
                key={row.label}
                className="grid gap-3 border-t border-line px-5 py-5 sm:grid-cols-[0.7fr_1fr_1fr]"
              >
                <p className="font-semibold">{row.label}</p>
                <p className="leading-7 text-muted">{row.homedecor}</p>
                <p className="leading-7 text-muted">{row.alternative}</p>
              </div>
            ))}
          </Reveal>

          <Reveal>
            <section className="premium-card-soft mt-10 rounded-[24px] p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-blue">
                Takeaway
              </p>
              <p className="mt-5 text-2xl font-semibold leading-9">
                {page.takeaway}
              </p>
              <a
                href={testingUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics="comparison_testing_click"
                className="btn-primary mt-8 h-11 px-5"
              >
                Join Android testing
              </a>
            </section>
          </Reveal>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
