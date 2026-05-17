import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Interior Design & Room Makeovers",
  description:
    "Download HomeDecor AI to transform rooms with photorealistic AI interior design concepts and luxury decor inspiration.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    type: "website",
  },
};

function StoreButton({
  store,
  label,
  primary = false,
}: {
  store: string;
  label: string;
  primary?: boolean;
}) {
  return (
    <a
      href="#"
      aria-label={`${label} on ${store}`}
      className={[
        "group inline-flex h-14 min-w-48 items-center justify-center gap-3 rounded-full border px-6 text-left transition duration-200",
        primary
          ? "border-brand-blue bg-brand-blue text-white shadow-[0_18px_45px_rgba(37,99,235,0.18)] hover:bg-[var(--brand-blue-dark)]"
          : "border-line bg-white text-foreground hover:border-foreground",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          "grid size-8 shrink-0 place-items-center rounded-full text-[13px] font-semibold",
          primary ? "bg-white/16 text-white" : "bg-foreground text-white",
        ].join(" ")}
      >
        {store === "App Store" ? "A" : "G"}
      </span>
      <span className="grid leading-none">
        <span className="text-[11px] font-medium uppercase tracking-[0.12em] opacity-70">
          {label}
        </span>
        <span className="mt-1 text-sm font-semibold">{store}</span>
      </span>
    </a>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-7xl items-center px-6 pb-16 pt-8 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-brand-blue">
            HomeDecor AI
          </p>
          <h1 className="text-balance text-5xl font-semibold leading-[0.96] tracking-normal text-foreground sm:text-7xl lg:text-[92px]">
            The Future of Interior Design is AI
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-8 text-muted sm:text-xl">
            Reimagine any room in seconds with intelligent style suggestions,
            photorealistic concepts, and effortless decor planning.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <StoreButton store="App Store" label="Download on the" primary />
            <StoreButton store="Google Play" label="Get it on" />
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
