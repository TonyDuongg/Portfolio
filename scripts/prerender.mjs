import { readFile, writeFile } from "node:fs/promises";
import { render } from "../.ssr/entry-server.js";

const html = await readFile(
  new URL("../dist/index.html", import.meta.url),
  "utf8",
);
if (!html.includes("<!--app-html-->"))
  throw new Error("Missing prerender placeholder");
await writeFile(
  new URL("../dist/index.html", import.meta.url),
  html.replace("<!--app-html-->", render()),
);
console.log(
  "Prerendered the portfolio: readable content is available without JavaScript.",
);
