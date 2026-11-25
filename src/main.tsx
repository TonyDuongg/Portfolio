import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource-variable/bricolage-grotesque/wdth.css";
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
