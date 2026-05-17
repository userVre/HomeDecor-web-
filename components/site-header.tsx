import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/#tools" },
  { label: "Blog", href: "/blog" },
];

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-y-5 px-6 py-6 sm:px-8 lg:px-10">
      <Link href="/" className="flex items-center gap-3" aria-label="HomeDecor AI home">
        <span className="grid size-9 place-items-center rounded-full bg-brand-blue text-sm font-semibold text-white">
          H
        </span>
        <span className="text-base font-semibold tracking-normal">HomeDecor AI</span>
      </Link>

      <nav
        aria-label="Primary navigation"
        className="order-3 flex w-full items-center gap-6 border-t border-line pt-5 sm:order-none sm:w-auto sm:gap-8 sm:border-0 sm:pt-0"
      >
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-sm font-medium text-muted transition hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
