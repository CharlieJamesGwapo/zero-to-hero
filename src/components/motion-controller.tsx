"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const revealSelector = [
  ".section-heading",
  ".level-preview",
  ".project-preview-grid",
  ".home-contribute",
  ".split-feature",
  ".open-source-cards",
  ".page-intro",
  ".curriculum-level",
  ".project-row",
  ".architecture-stage",
  ".workflow-list li",
  ".os-stages li",
  ".os-workflow a",
  ".glossary-entry",
  ".detail-section",
].join(", ");

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

export function MotionController() {
  const pathname = usePathname();
  const firstRoute = useRef(true);
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const main = document.getElementById("main-content");
    const header = document.querySelector<HTMLElement>(".site-header");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = main?.querySelectorAll<HTMLElement>(revealSelector) ?? [];
    const observer =
      !reduced.matches && "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                (entry.target as HTMLElement).dataset.reveal = "entered";
                observer?.unobserve(entry.target);
              }
            },
            { rootMargin: "0px 0px -40px 0px", threshold: 0.08 },
          )
        : null;

    elements.forEach((element) => {
      if (!observer) return;
      const order = element.matches(
        ".curriculum-level, .workflow-list li, .os-stages li, .os-workflow a",
      )
        ? Array.from(element.parentElement?.children ?? []).indexOf(element) % 6
        : 0;
      element.style.setProperty("--reveal-order", String(order));
      if (element.getBoundingClientRect().top > window.innerHeight - 40) {
        element.dataset.reveal = "waiting";
        observer.observe(element);
      } else {
        element.dataset.reveal = "entered";
      }
    });

    if (!firstRoute.current && main && !reduced.matches) {
      main.dataset.routeEnter = "true";
    }
    firstRoute.current = false;
    const routeTimer = window.setTimeout(() => {
      if (main) delete main.dataset.routeEnter;
    }, 300);

    const article = main?.querySelector<HTMLElement>(".lesson-article");
    const curriculum = main?.querySelector<HTMLElement>(".curriculum-list");
    const workflowSteps = Array.from(
      main?.querySelectorAll<HTMLElement>(".workflow-list li") ?? [],
    );
    let frame = 0;
    const update = () => {
      frame = 0;
      if (header) header.dataset.scrolled = String(window.scrollY > 12);
      if (article && progress.current) {
        const start = article.getBoundingClientRect().top + window.scrollY;
        const total = Math.max(
          1,
          article.offsetHeight - window.innerHeight * 0.6,
        );
        const amount = clamp((window.scrollY - start + 60) / total);
        progress.current.style.transform = `scaleX(${amount})`;
      }
      if (curriculum) {
        const midpoint = window.innerHeight * 0.45;
        curriculum
          .querySelectorAll<HTMLElement>(".curriculum-level")
          .forEach((level) => {
            const bounds = level.getBoundingClientRect();
            const amount = clamp((midpoint - bounds.top) / bounds.height);
            level.style.setProperty("--segment-fill", `${amount * 100}%`);
          });
      }
      if (workflowSteps.length) {
        const midpoint = window.innerHeight * 0.45;
        const current = workflowSteps.reduce((nearest, step) => {
          const a = Math.abs(step.getBoundingClientRect().top - midpoint);
          const b = Math.abs(nearest.getBoundingClientRect().top - midpoint);
          return a < b ? step : nearest;
        }, workflowSteps[0]);
        workflowSteps.forEach((step) => {
          step.dataset.current = String(step === current);
        });
      }
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      observer?.disconnect();
      window.clearTimeout(routeTimer);
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      elements.forEach((element) => {
        delete element.dataset.reveal;
        element.style.removeProperty("--reveal-order");
      });
    };
  }, [pathname]);

  return (
    <div
      ref={progress}
      className="reading-progress"
      data-visible={
        pathname.startsWith("/learn/") ||
        (pathname.startsWith("/open-source/") && pathname !== "/open-source/")
      }
      aria-hidden="true"
    />
  );
}
