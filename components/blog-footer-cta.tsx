"use client";

import { Reveal } from "@/components/reveal";

const testingUrl =
  "https://play.google.com/apps/testing/com.ismail.homedecorai";

export function BlogFooterCta() {
  return (
    <Reveal>
      <section className="premium-card mt-20 overflow-hidden rounded-[24px]">
        <div className="grid md:grid-cols-2">
          <div className="border-b border-line p-7 sm:p-10 md:border-b-0 md:border-r">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-blue">
              Android design studio
            </p>
            <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-4xl">
              Do not decide from imagination alone.
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-muted">
              In HomeDecor AI, upload or capture a real photo, choose the right
              redesign tool, and preview a professional-looking concept before
              painting, buying, renovating, or moving furniture.
            </p>
            <a
              href={testingUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics="blog_footer_testing_click"
              className="btn-primary mt-8 h-11 px-5"
            >
              Join Android testing
            </a>
          </div>
          <div className="border-t border-[var(--brand-blue-line)] bg-[var(--brand-blue-soft)] p-7 sm:border-l sm:border-t-0 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-blue">
              Early access
            </p>
            <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-4xl">
              Public Google Play launch is coming.
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-muted">
              The public store listing is not live yet. The testing channel is
              the best place to try the Android app early and help shape tools
              for interiors, exteriors, gardens, walls, floors, and objects.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={testingUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics="blog_footer_testing_click"
                className="btn-primary h-11 px-5"
              >
                Join testing channel
              </a>
              <span className="btn-secondary h-11 border-[var(--brand-blue-line)] px-5 text-muted">
                Free to start
              </span>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
