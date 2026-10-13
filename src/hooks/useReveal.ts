import { useEffect, type RefObject } from "react";

export function useReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!ref.current || !("IntersectionObserver" in window)) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const elements = ref.current.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-pending");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06 },
    );
    // Never hide content already on screen; static/no-JS content stays visible.
    elements.forEach((element) => {
      if (element.getBoundingClientRect().top > window.innerHeight) {
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
