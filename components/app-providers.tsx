"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useMemo, type ReactNode } from "react";

const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
const isLocalAppUrl = appUrl.includes("localhost") || appUrl.includes("127.0.0.1");

function ConvexClerkProvider({ children }: { children: ReactNode }) {
  const convex = useMemo(() => new ConvexReactClient(convexUrl!), []);

  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}

export function AppProviders({ children }: { children: ReactNode }) {
  if (!clerkPublishableKey || !convexUrl || isLocalAppUrl) {
    return <>{children}</>;
  }

  return (
    <ClerkProvider publishableKey={clerkPublishableKey} afterSignOutUrl="/">
      <ConvexClerkProvider>{children}</ConvexClerkProvider>
    </ClerkProvider>
  );
}
