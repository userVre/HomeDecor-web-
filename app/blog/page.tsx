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
  description:
    "Practical interior design, renovation, paint, flooring, garden, and AI visualization guides from HomeDecor AI.",
  alternates: {
    canonical: absoluteUrl("/blog"),
  },
  openGraph: {
    title: `Interior Design Blog | ${siteConfig.name}`,
    description:
      "Practical interior design, renovation, paint, flooring, garden, and AI visualization guides from HomeDecor AI.",
    url: absoluteUrl("/blog"),
    type: "website",
  },
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);
  const categories = ["Inspiration", "Design Tips", "AI Room Design", "For your home"];

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

      <section className="mx-auto w-full max-w-7xl px-5 pb-20 pt-12 sm:px-8 lg:px-10">
        <div className="border-b border-line pb-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-brand-blue">
            HomeDecor AI Blog
          </p>
          <h1 className="max-w-full text-balance text-3xl font-semibold leading-[1.02] tracking-normal min-[420px]:text-4xl sm:text-6xl md:text-7xl">
            Design answers you can use before you spend.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-muted min-[420px]:text-lg min-[420px]:leading-8 sm:text-xl">
            Practical guides for rooms, renovations, paint, floors, gardens,
            exteriors, and AI visualization. Learn the idea first, then test
            the direction in the Android app when you are ready.
          </p>
          <div className="mt-8 flex max-w-full flex-wrap gap-2 min-[420px]:gap-3">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-line px-3 py-2 text-xs font-medium text-muted min-[420px]:px-4 min-[420px]:text-sm"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {featuredPost ? (
          <article className="mt-14 border-b border-line pb-14">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
            >
              <div className="aspect-[1.22] overflow-hidden bg-surface-strong sm:aspect-[1.55] lg:aspect-[1.25]">
                <Image
                  src={featuredPost.thumbnail}
                  alt={featuredPost.heroAlt}
                  width={1500}
                  height={1120}
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="size-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="max-w-2xl min-w-0">
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
                  {featuredPost.category}
                </p>
                <h2 className="text-balance text-3xl font-semibold leading-tight tracking-normal decoration-foreground underline-offset-4 transition group-hover:underline sm:text-5xl">
                  {featuredPost.title}
                </h2>
                <p className="mt-5 text-base leading-7 text-muted min-[420px]:text-lg min-[420px]:leading-8">
                  {featuredPost.excerpt}
                </p>
                <p className="mt-7 text-sm font-medium text-muted">
                  {featuredPost.author} / {formatPostDate(featuredPost.date)} /{" "}
                  {featuredPost.readingTime}
                </p>
              </div>
            </Link>
          </article>
        ) : null}

        <div className="mt-12 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {remainingPosts.map((post) => (
            <article key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="aspect-[1.18] overflow-hidden bg-surface-strong">
                  <Image
                    src={post.thumbnail}
                    alt={post.heroAlt}
                    width={900}
                    height={760}
                    sizes="(min-width: 1024px) 28vw, (min-width: 768px) 45vw, 100vw"
                    className="size-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="border-b border-line py-6">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
                    {post.category}
                  </p>
                  <h2 className="text-balance text-2xl font-semibold leading-tight tracking-normal decoration-foreground underline-offset-4 transition group-hover:underline">
                    {post.title}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-muted">{post.excerpt}</p>
                  <p className="mt-6 text-sm font-medium text-muted">
                    {post.author} / {formatPostDate(post.date)} / {post.readingTime}
                  </p>
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
