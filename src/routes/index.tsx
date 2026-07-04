import { createFileRoute } from "@tanstack/react-router";
import html from "../pages-html/1.html?raw";

export const Route = createFileRoute("/")({
  component: () => <div dangerouslySetInnerHTML={{ __html: html }} />,
});
