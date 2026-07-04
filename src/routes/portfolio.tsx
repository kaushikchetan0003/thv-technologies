import { createFileRoute } from "@tanstack/react-router";
import html from "../pages-html/5.html?raw";
export const Route = createFileRoute("/portfolio")({
  head: () => ({ meta: [{ title: "Portfolio & Case Studies | THV Technologies" }] }),
  component: () => <div dangerouslySetInnerHTML={{ __html: html }} />,
});
