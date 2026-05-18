import type { ComponentPropsWithoutRef } from "react";

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <aside className="my-10 border-y border-line py-7 text-xl font-medium leading-8 text-foreground sm:text-2xl sm:leading-9">
      {children}
    </aside>
  );
}

export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mb-4 mt-14 text-[28px] font-semibold leading-[1.14] tracking-normal text-foreground sm:text-[34px]"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="mb-3 mt-9 text-[22px] font-semibold leading-7 text-foreground"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="my-5 text-[17px] leading-8 text-[#2c2c2c] sm:text-[18px]" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="font-medium text-foreground decoration-foreground/35 underline-offset-4 transition hover:underline hover:decoration-foreground"
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="my-7 list-disc space-y-3 pl-6 text-[17px] leading-8 text-[#2c2c2c] sm:text-[18px]" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-10 border-l-2 border-brand-blue pl-6 text-xl font-medium leading-8 text-foreground sm:text-2xl"
      {...props}
    />
  ),
  img: (props: ComponentPropsWithoutRef<"img">) => (
    // MDX-authored editorial images should keep their original aspect ratio.
    // eslint-disable-next-line @next/next/no-img-element
    <img className="my-12 w-full rounded-sm object-cover" {...props} alt={props.alt ?? ""} />
  ),
  Callout,
};
