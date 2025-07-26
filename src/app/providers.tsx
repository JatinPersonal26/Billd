// src/app/providers.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/custom/ThemeProvider";
import { Toaster } from "sonner";
import { useRouter } from "next/router";
import { AuthRedirect } from "@/components/custom/redirect-if-unauthenticated";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthRedirect>{children}</AuthRedirect>
          <Toaster richColors />
        </ThemeProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
