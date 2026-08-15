import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Direction = "up" | "left" | "right" | "scale";

const baseClass: Record<Direction, string> = {
  up: "reveal",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);

  // Start as shown — content is visible immediately on load.
  // The reveal animation only plays if the element is BELOW
  // the fold when the page first renders.
  const [shown, setShown] = useState(true);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    // Check if element is already in viewport on mount
    const rect = node.getBoundingClientRect();
    const alreadyVisible =
      rect.top < window.innerHeight * 0.95 &&
      rect.bottom > 0;

    if (alreadyVisible) {
      // Already in view — show immediately, no animation needed
      setShown(true);
      setShouldAnimate(false);
      return;
    }

    // Element is below the fold — animate it in when it scrolls into view
    setShown(false);
    setShouldAnimate(true);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn(
        shouldAnimate && baseClass[direction],
        shouldAnimate && shown && "is-revealed",
        className,
      )}
      style={shouldAnimate ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}