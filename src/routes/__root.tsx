import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

const tailwindConfig = `tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface-container-low": "#f0f3ff",
        "on-surface": "#151c27",
        "surface-container-highest": "#dce2f3",
        "on-surface-variant": "#3e4a3e",
        "primary-fixed-dim": "#70dd88",
        "secondary": "#555f6f",
        "primary": "#006d31",
        "primary-container": "#55c271",
        "secondary-container": "#d6e0f3",
        "on-secondary-fixed": "#121c2a",
        "tertiary": "#57615b",
        "on-tertiary": "#ffffff",
        "inverse-on-surface": "#ebf1ff",
        "on-primary-fixed-variant": "#005323",
        "surface-variant": "#dce2f3",
        "surface-tint": "#006d31",
        "on-primary": "#ffffff",
        "tertiary-container": "#a5afa9",
        "surface": "#f9f9ff",
        "on-primary-fixed": "#00210a",
        "background": "#f9f9ff",
        "on-primary-container": "#004c20",
        "outline-variant": "#bdcabb",
        "surface-bright": "#f9f9ff",
        "error": "#ba1a1a",
        "primary-fixed": "#8cfaa2",
        "on-background": "#151c27",
        "surface-container-high": "#e2e8f8",
        "surface-container-lowest": "#ffffff",
        "secondary-fixed-dim": "#bdc7d9",
        "surface-container": "#e7eefe",
        "on-tertiary-fixed-variant": "#3f4944",
        "on-error-container": "#93000a",
        "on-tertiary-container": "#39433e",
        "inverse-surface": "#2a313d",
        "secondary-fixed": "#d9e3f6",
        "on-tertiary-fixed": "#151d1a",
        "on-secondary": "#ffffff",
        "on-error": "#ffffff",
        "surface-dim": "#d3daea",
        "tertiary-fixed-dim": "#bfc9c2",
        "outline": "#6e7a6d",
        "on-secondary-container": "#596373",
        "error-container": "#ffdad6",
        "tertiary-fixed": "#dbe5de",
        "on-secondary-fixed-variant": "#3d4756",
        "inverse-primary": "#70dd88",
        "brand-accent": "#55C271",
        "brand-soft": "#F5FFF8",
        "brand-dark": "#1F2937"
      },
      borderRadius: { DEFAULT: "0.25rem", lg: "0.5rem", xl: "0.75rem", full: "9999px" },
      spacing: {
        "base": "8px",
        "margin-desktop": "64px",
        "container-max": "1280px",
        "margin-mobile": "20px",
        "gutter": "24px"
      },
      fontFamily: {
        "display-lg-mobile": ["Poppins"],
        "headline-md": ["Poppins"],
        "label-sm": ["Inter"],
        "headline-lg": ["Poppins"],
        "label-md": ["Inter"],
        "display-lg": ["Poppins"],
        "body-md": ["Inter"],
        "body-lg": ["Inter"],
        "title-lg": ["Poppins"],
        "title-md": ["Poppins"],
        "display-md": ["Poppins"],
        "display-sm": ["Poppins"]
      },
      fontSize: {
        "display-lg-mobile": ["40px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-md": ["24px", { lineHeight: "1.4", fontWeight: "600" }],
        "label-sm": ["12px", { lineHeight: "1.2", fontWeight: "500" }],
        "headline-lg": ["32px", { lineHeight: "1.3", fontWeight: "600" }],
        "label-md": ["14px", { lineHeight: "1.2", letterSpacing: "0.01em", fontWeight: "600" }],
        "display-lg": ["56px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "title-lg": ["22px", { lineHeight: "1.3", fontWeight: "600" }],
        "title-md": ["18px", { lineHeight: "1.3", fontWeight: "600" }],
        "display-md": ["45px", { lineHeight: "1.15", letterSpacing: "-0.01em", fontWeight: "700" }],
        "display-sm": ["36px", { lineHeight: "1.2", fontWeight: "700" }]
      }
    }
  }
};`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">This page didn't load</h1>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Try again</button>
          <a href="/" className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "THV Technologies | Premium Digital Solutions" },
      { name: "description", content: "THV Technologies helps businesses grow through digital marketing, SEO, paid ads, websites, branding and AI automation." },
      { property: "og:title", content: "THV Technologies | Premium Digital Solutions" },
      { property: "og:description", content: "THV Technologies helps businesses grow through digital marketing, SEO, paid ads, websites, branding and AI automation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "THV Technologies | Premium Digital Solutions" },
      { name: "twitter:description", content: "THV Technologies helps businesses grow through digital marketing, SEO, paid ads, websites, branding and AI automation." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4985a6e3-23b7-46e0-b453-17023e123d1f/id-preview-e860301f--c229a832-eeb4-4cbf-8847-3c029e375e4e.lovable.app-1783166336881.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4985a6e3-23b7-46e0-b453-17023e123d1f/id-preview-e860301f--c229a832-eeb4-4cbf-8847-3c029e375e4e.lovable.app-1783166336881.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;600;700;800&display=swap" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" },
    ],
    scripts: [
      { src: "https://cdn.tailwindcss.com?plugins=forms,container-queries" },
      { children: tailwindConfig },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="light">
      <head>
        <HeadContent />
      </head>
      <body className="overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#f9f9ff" }}>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
