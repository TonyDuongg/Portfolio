import { useRef } from "react";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Redactor } from "./components/Redactor";
import { Stack } from "./components/Stack";
import { Work } from "./components/Work";
import { useReveal } from "./hooks/useReveal";

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);
  return (
    <div ref={root}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Work />
        <Redactor />
        <Stack />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
