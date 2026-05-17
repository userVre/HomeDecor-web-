import type { ComponentPropsWithoutRef } from "react";

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <aside className="my-12 border-y border-line py-8 text-xl font-medium leading-snug text-foreground sm:text-2xl md:text-3xl">
      {children}
    </aside>
  );
}

export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mb-5 mt-16 text-2xl font-semibold leading-tight tracking-normal text-foreground sm:text-3xl md:text-4xl"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="mb-4 mt-10 text-2xl font-semibold leading-tight text-foreground"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="my-6 text-lg leading-8 text-[#242424] sm:text-xl sm:leading-9" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a className="font-medium text-brand-blue underline underline-offset-4" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="my-8 list-disc space-y-3 pl-6 text-lg leading-8 text-[#242424] sm:text-xl" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-12 border-l-2 border-brand-blue pl-6 text-xl font-medium leading-snug text-foreground sm:text-2xl"
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
