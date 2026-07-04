import { createFileRoute } from "@tanstack/react-router";
import html from "../pages-html/3.html?raw";
export const Route = createFileRoute("/services")({
  head: () => ({ meta: [{ title: "Our Services | THV Technologies" }] }),
  component: () => <div dangerouslySetInnerHTML={{ __html: html }} />,
});
