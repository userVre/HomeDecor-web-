import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllBlogPosts, getBlogPost, formatPostDate } from "@/lib/blog";
import { JsonLd } from "@/components/json-ld";
import { mdxComponents } from "@/components/mdx-components";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl, siteConfig } from "@/lib/site";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Article not found | HomeDecor AI",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: absoluteUrl(`/blog/${post.slug}`),
    },
    openGraph: {
      title: `${post.title} | ${siteConfig.name}`,
      description: post.excerpt,
      url: absoluteUrl(`/blog/${post.slug}`),
      type: "article",
      publishedTime: post.date,
      authors: [siteConfig.name],
      images: [
        {
          url: post.heroImage,
          width: 1600,
          height: 900,
          alt: post.heroAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ${siteConfig.name}`,
      description: post.excerpt,
      images: [post.heroImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          image: post.heroImage,
          datePublished: post.date,
          dateModified: post.date,
          author: {
            "@type": "Organization",
            name: siteConfig.name,
          },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": absoluteUrl(`/blog/${post.slug}`),
          },
        }}
      />

      <article>
        <header className="mx-auto w-full max-w-7xl px-6 pb-12 pt-14 sm:px-8 lg:px-10">
          <Link
            href="/blog"
            className="mb-10 inline-flex text-sm font-medium text-muted transition hover:text-foreground"
          >
            Back to journal
          </Link>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div>
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-brand-blue">
                {formatPostDate(post.date)} / {post.readingTime}
              </p>
              <h1 className="max-w-5xl text-balance text-4xl font-semibold leading-none tracking-normal sm:text-5xl md:text-7xl lg:text-[88px]">
                {post.title}
              </h1>
              <p className="mt-8 max-w-3xl text-lg leading-8 text-muted sm:text-xl md:text-2xl md:leading-9">
                {post.excerpt}
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="aspect-[1.75] overflow-hidden bg-[#f4f4f2]">
            <Image
              src={post.heroImage}
              alt={post.heroAlt}
              width={2200}
              height={1257}
              priority
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="size-full object-cover"
            />
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[minmax(0,760px)_320px] lg:px-10">
          <div className="min-w-0">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>

          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="border border-foreground bg-foreground p-8 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                HomeDecor AI
              </p>
              <h2 className="mt-6 text-2xl font-semibold leading-tight sm:text-3xl">
                Transform your room now with HomeDecor AI - Download Free
              </h2>
              <p className="mt-5 text-base leading-7 text-white/70">
                Generate room concepts, decor directions, and polished redesigns
                before moving a single piece of furniture.
              </p>
              <Link
                href="/"
                className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full bg-brand-blue px-5 text-sm font-semibold text-white transition hover:bg-[var(--brand-blue-dark)]"
              >
                Download Free
              </Link>
            </div>
          </aside>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
