import { useEffect, type RefObject } from "react";

/*
 * One-shot entrance for the parts of each section: heading, then text, then
 * picture, 80ms apart. Content that is already on screen, or any content when
 * the script never runs, stays visible.
 */
export function useReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!ref.current || !("IntersectionObserver" in window)) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const elements = Array.from(
      ref.current.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-pending");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    const order = new Map<Element, number>();
    elements.forEach((element) => {
      const section = element.closest("section, footer") ?? document.body;
      const index = order.get(section) ?? 0;
      order.set(section, index + 1);
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.style.setProperty("--reveal-delay", `${(index % 4) * 80}ms`);
        element.classList.add("reveal-pending");
        observer.observe(element);
      }
    });
    const showAll = () =>
      elements.forEach((element) => element.classList.remove("reveal-pending"));
    media.addEventListener("change", showAll);
    return () => {
      observer.disconnect();
      showAll();
      media.removeEventListener("change", showAll);
    };
  }, [ref]);
}
