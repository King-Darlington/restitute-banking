import { useEffect, useRef, useState } from "react";

const DEFAULT_DURATION_MS = 2000;
const FADE_MS = 300;

const particleStyles = [
  { top: "14%", left: "20%", size: "4px", delay: "0s", duration: "3.2s" },
  { top: "24%", left: "76%", size: "5px", delay: "0.15s", duration: "3.6s" },
  { top: "40%", left: "12%", size: "3px", delay: "0.3s", duration: "2.8s" },
  { top: "52%", left: "86%", size: "4px", delay: "0.45s", duration: "3.4s" },
  { top: "66%", left: "24%", size: "4px", delay: "0.6s", duration: "3s" },
  { top: "78%", left: "70%", size: "5px", delay: "0.75s", duration: "3.8s" },
  { top: "18%", left: "50%", size: "3px", delay: "0.9s", duration: "2.6s" },
  { top: "60%", left: "50%", size: "4px", delay: "1.05s", duration: "3.5s" },
];

export function PageLoader({ durationMs = DEFAULT_DURATION_MS, onFinish }: { durationMs?: number; onFinish?: () => void }) {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const resolvedRef = useRef(false);

  useEffect(() => {
    let hideTimer: number | undefined;

    const resolve = () => {
      if (resolvedRef.current) return;
      resolvedRef.current = true;
      setExiting(true);
      hideTimer = window.setTimeout(() => {
        setVisible(false);
        if (onFinish) onFinish();
      }, FADE_MS);
    };

    const maxTimer = window.setTimeout(resolve, durationMs);

    // Also resolve immediately if document already interactive/complete
    if (document.readyState === "complete" || document.readyState === "interactive") {
      // Let the loader still run for the full duration then resolve
      // schedule based on remaining duration
      // do nothing here; maxTimer will handle
    } else {
      window.addEventListener("load", resolve, { once: true });
    }

    return () => {
      window.clearTimeout(maxTimer);
      if (hideTimer !== undefined) window.clearTimeout(hideTimer);
      window.removeEventListener("load", resolve);
    };
  }, [durationMs, onFinish]);

  if (!visible) {
    return null;
  }

  return (
    <div className={`page-loader${exiting ? " page-loader--exit" : ""}`} aria-hidden="true">
      <div className="page-loader__field">
        {particleStyles.map(({ top, left, size, delay, duration }, index) => (
          <span
            key={index}
            className="page-loader__mote"
            style={{
              top,
              left,
              width: size,
              height: size,
              animationDelay: delay,
              animationDuration: duration,
            }}
          />
        ))}
      </div>

      <div className="page-loader__stage">
        <div className="page-loader__spinner" aria-hidden="true">
          <span className="page-loader__comet page-loader__comet--a" />
          <span className="page-loader__comet page-loader__comet--b" />
          <span className="page-loader__core" />
        </div>

        <div className="page-loader__wordmark">
          <span className="page-loader__wordmark-fill">Restitute Banking</span>
          <span className="page-loader__wordmark-ghost" aria-hidden="true">Restitute Banking</span>
        </div>
      </div>

      <style>{`
        .page-loader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 50% 42%, color-mix(in srgb, var(--primary) 16%, transparent) 0%, color-mix(in srgb, var(--ink) 38%, transparent) 70%);
          backdrop-filter: blur(6px) saturate(1.1);
          -webkit-backdrop-filter: blur(6px) saturate(1.1);
          opacity: 1;
          transition: opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease, backdrop-filter ${FADE_MS}ms ease;
          pointer-events: none;
          overflow: hidden;
        }

        .page-loader--exit {
          opacity: 0;
          transform: scale(1.02);
          backdrop-filter: blur(0px) saturate(1);
          -webkit-backdrop-filter: blur(0px) saturate(1);
        }

        .page-loader__field {
          position: absolute;
          inset: 0;
        }

        .page-loader__mote {
          position: absolute;
          border-radius: 9999px;
          background: var(--action);
          opacity: 0;
          animation-name: page-loader-drift;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          filter: blur(0.5px);
        }

        .page-loader__stage {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.6rem;
        }

        .page-loader__spinner {
          position: relative;
          width: 96px;
          height: 96px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .page-loader__comet {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px));
          mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px));
          background: conic-gradient(from 0deg, transparent 0deg, var(--primary) 60deg, var(--action) 130deg, transparent 200deg);
          animation: page-loader-spin 1.1s linear infinite;
        }

        .page-loader__comet--b {
          inset: 16px;
          opacity: 0.55;
          animation-duration: 1.6s;
          animation-direction: reverse;
        }

        .page-loader__core {
          width: 22px;
          height: 22px;
          border-radius: 42% 58% 60% 40% / 48% 42% 58% 52%;
          background: radial-gradient(circle at 32% 28%, #fff, var(--action) 45%, var(--primary) 100%);
          box-shadow: 0 0 22px color-mix(in srgb, var(--action) 65%, transparent),
            0 0 44px color-mix(in srgb, var(--primary) 40%, transparent);
          animation: page-loader-breathe 1.1s ease-in-out infinite,
            page-loader-liquify 2.2s ease-in-out infinite;
        }

        .page-loader__wordmark {
          position: relative;
          font-family: var(--font-display);
          font-size: clamp(1.05rem, 2.2vw, 1.6rem);
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .page-loader__wordmark-ghost {
          color: color-mix(in srgb, var(--ink-foreground) 30%, transparent);
          text-shadow: 0 1px 12px rgba(0, 0, 0, 0.35);
        }

        .page-loader__wordmark-fill {
          position: absolute;
          inset: 0;
          overflow: hidden;
          white-space: nowrap;
          background: linear-gradient(90deg, var(--action), var(--primary));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 1px 10px rgba(0, 0, 0, 0.25));
          animation: page-loader-reveal 1.1s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }

        @keyframes page-loader-spin {
          to { transform: rotate(360deg); }
        }

        @keyframes page-loader-breathe {
          0%, 100% { transform: scale(0.9); }
          50% { transform: scale(1.12); }
        }

        @keyframes page-loader-liquify {
          0%, 100% { border-radius: 42% 58% 60% 40% / 48% 42% 58% 52%; }
          33% { border-radius: 58% 42% 45% 55% / 55% 60% 40% 45%; }
          66% { border-radius: 48% 52% 55% 45% / 40% 48% 52% 60%; }
        }

        @keyframes page-loader-reveal {
          0% { clip-path: inset(0 100% 0 0); }
          45% { clip-path: inset(0 0 0 0); }
          80% { clip-path: inset(0 0 0 0); }
          100% { clip-path: inset(0 0 0 100%); }
        }

        @keyframes page-loader-drift {
          0% { opacity: 0; transform: translateY(0); }
          15% { opacity: 0.85; }
          85% { opacity: 0.85; }
          100% { opacity: 0; transform: translateY(-26px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .page-loader__comet,
          .page-loader__core,
          .page-loader__wordmark-fill,
          .page-loader__mote {
            animation: none;
          }
          .page-loader__wordmark-fill {
            clip-path: inset(0 0 0 0);
          }
        }
      `}</style>
    </div>
  );
}