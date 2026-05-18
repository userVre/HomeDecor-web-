import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        <div>
          <p className="text-base font-semibold">HomeDecor AI</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted">
            Android AI design concepts for rooms, exteriors, gardens, walls,
            floors, objects, and layout inspiration.
          </p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-6 text-sm font-medium">
          <Link href="/" className="text-muted transition hover:text-foreground hover:underline hover:underline-offset-4">
            Home
          </Link>
          <Link href="/how-it-works" className="text-muted transition hover:text-foreground hover:underline hover:underline-offset-4">
            How it works
          </Link>
          <Link href="/blog" className="text-muted transition hover:text-foreground hover:underline hover:underline-offset-4">
            Blog
          </Link>
          <Link href="/compare" className="text-muted transition hover:text-foreground hover:underline hover:underline-offset-4">
            Compare
          </Link>
        </nav>
      </div>
    </footer>
  );
}
