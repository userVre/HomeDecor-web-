import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";

const testingUrl =
  "https://play.google.com/apps/testing/com.ismail.homedecorai";

const navItems = [
  { label: "Home", href: "/" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Blog", href: "/blog" },
  { label: "Compare", href: "/compare" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/88 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-5 gap-y-3 px-5 py-3 sm:px-8 sm:py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="HomeDecor AI home">
          <span className="grid size-8 place-items-center rounded-full bg-brand-blue text-sm font-semibold text-white sm:size-9">
            H
          </span>
          <span className="text-base font-semibold tracking-normal">HomeDecor AI</span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="order-3 flex w-full items-center gap-5 overflow-x-auto border-t border-line pt-3 sm:order-none sm:w-auto sm:gap-7 sm:overflow-visible sm:border-0 sm:pt-0"
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted transition hover:text-foreground hover:underline hover:underline-offset-4"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <LanguageSwitcher />
        <a
          href={testingUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-analytics="header_testing_click"
          className="btn-primary h-9 shrink-0 px-4 sm:h-10"
        >
          Join testing
        </a>
      </div>
    </header>
  );
}
