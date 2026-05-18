import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllBlogPosts, getBlogPost, formatPostDate } from "@/lib/blog";
import { BlogFooterCta } from "@/components/blog-footer-cta";
import { JsonLd } from "@/components/json-ld";
import { mdxComponents } from "@/components/mdx-components";
import { Reveal } from "@/components/reveal";
import { ScrollProgress } from "@/components/scroll-progress";
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
      authors: [post.author],
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

  const relatedPosts = getAllBlogPosts()
    .filter(
      (candidate) =>
        candidate.slug !== post.slug && candidate.category === post.category,
    )
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
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
            name: post.author,
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
        <header className="mx-auto w-full max-w-[920px] px-6 pb-10 pt-12 sm:px-8">
          <Link
            href="/blog"
            className="mb-10 inline-flex text-sm font-medium text-muted underline-offset-4 transition hover:text-foreground hover:underline"
          >
            Back to journal
          </Link>
          <Reveal>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-brand-blue">
              {post.category} / {formatPostDate(post.date)} / {post.readingTime}
            </p>
            <h1 className="max-w-[840px] text-balance text-[31px] font-semibold leading-[1.06] tracking-normal min-[420px]:text-[40px] sm:text-[56px] md:text-[64px]">
              {post.title}
            </h1>
            <p className="mt-7 max-w-[720px] text-[18px] leading-8 text-muted sm:text-[20px] sm:leading-9">
              {post.excerpt}
            </p>
            <p className="mt-6 text-sm font-medium text-muted">By {post.author}</p>
          </Reveal>
        </header>

        <Reveal className="mx-auto w-full max-w-[1120px] px-6 sm:px-8">
          <div className="aspect-[1.55] overflow-hidden rounded-[18px] bg-surface-strong sm:aspect-[1.8]">
            <Image
              src={post.heroImage}
              alt={post.heroAlt}
              width={2200}
              height={1257}
              priority
              sizes="(min-width: 1200px) 1120px, 100vw"
              className="size-full object-cover"
            />
          </div>
        </Reveal>

        <div className="mx-auto w-full max-w-[760px] px-6 py-16 sm:px-8">
          <Reveal className="article-prose min-w-0">
            <MDXRemote source={post.content} components={mdxComponents} />
          </Reveal>
          <BlogFooterCta />
        </div>

        {relatedPosts.length > 0 ? (
          <section className="mx-auto w-full max-w-[1120px] px-6 pb-20 sm:px-8">
            <div className="border-t border-line pt-12">
              <p className="mb-7 text-xs font-semibold uppercase tracking-[0.22em] text-brand-blue">
                Keep reading
              </p>
              <div className="grid gap-8 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group block"
                  >
                    <div className="aspect-[1.18] overflow-hidden rounded-[16px] bg-surface-strong">
                      <Image
                        src={relatedPost.thumbnail}
                        alt={relatedPost.heroAlt}
                        width={760}
                        height={640}
                        sizes="(min-width: 768px) 30vw, 100vw"
                        className="size-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
                      {relatedPost.category}
                    </p>
                    <h2 className="mt-3 text-balance text-xl font-semibold leading-tight decoration-foreground underline-offset-4 transition group-hover:underline">
                      {relatedPost.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      {relatedPost.readingTime}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </article>
      <SiteFooter />
    </main>
  );
}
