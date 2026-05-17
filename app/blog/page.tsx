import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllBlogPosts, formatPostDate } from "@/lib/blog";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Interior Design Blog",
  description: "Interior design ideas, AI room styling guides, and HomeDecor AI inspiration.",
  alternates: {
    canonical: absoluteUrl("/blog"),
  },
  openGraph: {
    title: `Interior Design Blog | ${siteConfig.name}`,
    description:
      "Interior design ideas, AI room styling guides, and HomeDecor AI inspiration.",
    url: absoluteUrl("/blog"),
    type: "website",
  },
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `${siteConfig.name} Journal`,
          itemListElement: posts.map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: absoluteUrl(`/blog/${post.slug}`),
            name: post.title,
          })),
        }}
      />

      <section className="mx-auto w-full max-w-7xl px-6 pb-20 pt-16 sm:px-8 lg:px-10">
        <div className="max-w-4xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-brand-blue">
            The Journal
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-none tracking-normal sm:text-5xl md:text-7xl">
            A luxury magazine for AI-led interiors.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
            Read refined room studies, design intelligence, and practical guides
            for turning blank spaces into considered homes.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-3">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className={index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <div
                  className={[
                    "overflow-hidden bg-[#f4f4f2]",
                    index === 0 ? "aspect-[1.35]" : "aspect-[1.12]",
                  ].join(" ")}
                >
                  <Image
                    src={post.thumbnail}
                    alt={post.heroAlt}
                    width={index === 0 ? 1400 : 900}
                    height={index === 0 ? 1040 : 800}
                    priority={index === 0}
                    sizes={index === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 28vw, 100vw"}
                    className="size-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="border-b border-line py-7">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                    {formatPostDate(post.date)}
                  </p>
                  <h2
                    className={[
                      "text-balance font-semibold leading-tight tracking-normal transition group-hover:text-brand-blue",
                      index === 0 ? "text-3xl sm:text-4xl md:text-5xl" : "text-2xl",
                    ].join(" ")}
                  >
                    {post.title}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-muted">{post.excerpt}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
