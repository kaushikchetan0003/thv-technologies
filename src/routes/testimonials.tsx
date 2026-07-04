import { createFileRoute } from "@tanstack/react-router";
import html from "../pages-html/6.html?raw";
export const Route = createFileRoute("/testimonials")({
  head: () => ({ meta: [{ title: "Testimonials & FAQ | THV Technologies" }] }),
  component: () => <div dangerouslySetInnerHTML={{ __html: html }} />,
});
