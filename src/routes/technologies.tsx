import { createFileRoute } from "@tanstack/react-router";
import html from "../pages-html/4.html?raw";
export const Route = createFileRoute("/technologies")({
  head: () => ({ meta: [{ title: "Technologies & Process | THV Technologies" }] }),
  component: () => <div dangerouslySetInnerHTML={{ __html: html }} />,
});
