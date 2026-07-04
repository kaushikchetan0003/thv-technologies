import { createFileRoute } from "@tanstack/react-router";
import html from "../pages-html/2.html?raw";
export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About Us | THV Technologies" }] }),
  component: () => <div dangerouslySetInnerHTML={{ __html: html }} />,
});
