import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIRECTORY = path.join(process.cwd(), "content", "blog");

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  thumbnail: string;
  heroImage: string;
  heroAlt: string;
  readingTime: string;
  content: string;
};

type BlogFrontmatter = {
  title?: string;
  date?: string;
  excerpt?: string;
  thumbnail?: string;
  heroImage?: string;
  heroAlt?: string;
};

function getMdxFiles() {
  if (!fs.existsSync(BLOG_DIRECTORY)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIRECTORY)
    .filter((file) => file.endsWith(".mdx"));
}

function assertFrontmatter(
  data: BlogFrontmatter,
  slug: string,
): asserts data is Required<BlogFrontmatter> {
  const requiredFields: Array<keyof BlogFrontmatter> = [
    "title",
    "date",
    "excerpt",
    "thumbnail",
    "heroImage",
    "heroAlt",
  ];

  const missingFields = requiredFields.filter((field) => !data[field]);

  if (missingFields.length > 0) {
    throw new Error(
      `Post "${slug}" is missing frontmatter: ${missingFields.join(", ")}`,
    );
  }
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIRECTORY, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);
  const frontmatter = data as BlogFrontmatter;

  assertFrontmatter(frontmatter, slug);

  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    excerpt: frontmatter.excerpt,
    thumbnail: frontmatter.thumbnail,
    heroImage: frontmatter.heroImage,
    heroAlt: frontmatter.heroAlt,
    readingTime: readingTime(content).text,
    content,
  };
}

export function getAllBlogPosts() {
  return getMdxFiles()
    .map((file) => getBlogPost(file.replace(/\.mdx$/, "")))
    .filter((post): post is BlogPost => post !== null)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}
