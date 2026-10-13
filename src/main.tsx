import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/lora/latin-500.css";
import "@fontsource/lora/latin-ext-500.css";
import "@fontsource/lora/vietnamese-500.css";
import "./styles/global.css";
import App from "./App";

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);
if (container.children.length > 0) hydrateRoot(container, app);
else createRoot(container).render(app);
