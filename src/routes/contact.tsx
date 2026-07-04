import { createFileRoute } from "@tanstack/react-router";
import html from "../pages-html/7.html?raw";
export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact Us | THV Technologies" }] }),
  component: () => <div dangerouslySetInnerHTML={{ __html: html }} />,
});
