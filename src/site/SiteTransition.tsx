import { type ReactNode, useEffect, useRef, useState } from "react";
import { PageLoader } from "./PageLoader";

export function SiteTransition({ routeKey, children }: { routeKey?: string; children?: ReactNode }) {
  const [activeChildren, setActiveChildren] = useState<ReactNode>(children);
  const [exitingChildren, setExitingChildren] = useState<ReactNode | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const nextChildrenRef = useRef<ReactNode | null>(null);
  const previousKey = useRef(routeKey);

  useEffect(() => {
    if (routeKey == null || routeKey === previousKey.current) return;
    // Begin transition: keep current page as exiting, show loader
    nextChildrenRef.current = children;
    setExitingChildren(activeChildren);
    setIsTransitioning(true);
    previousKey.current = routeKey;
  }, [children, routeKey, activeChildren]);

  const handleLoaderFinish = () => {
    // swap to next page after loader finishes
    setActiveChildren(nextChildrenRef.current);
    setExitingChildren(null);
    setIsTransitioning(false);
    nextChildrenRef.current = null;
  };

  return (
    <div className="relative isolate min-h-screen">
      <style>{`
        @keyframes rb-pulse { 0% { transform: scale(1); opacity: .9 } 50% { transform: scale(1.06); opacity: .6 } 100% { transform: scale(1); opacity: .9 } }
        @keyframes rb-float { 0% { transform: translateY(0) } 50% { transform: translateY(-12px) } 100% { transform: translateY(0) } }
        @keyframes rb-page-enter { 0% { opacity: 0; transform: translateY(18px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes rb-page-exit { 0% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-18px); } }
        .rb-shine { position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background-image: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0) 100%); transform: rotate(25deg); opacity: 0; transition: opacity .45s; }
        .rb-shine-visible { opacity: 1; animation: rb-float 3.5s ease-in-out infinite; }
        .rb-page-enter { animation: rb-page-enter 300ms ease both; }
        .rb-page-exit { animation: rb-page-exit 300ms ease both; }
      `}</style>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -right-24 -top-24 h-80 w-80 rounded-full blur-3xl"
          style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.22), rgba(168,85,247,0.18))", opacity: 0.16, animation: "rb-pulse 6s ease-in-out infinite" }}
        />

        <div
          className="absolute left-8 top-1/4 w-56 h-56 rounded-full blur-2xl"
          style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(79,70,229,0.12))", animation: "rb-float 8s ease-in-out infinite" }}
        />

        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.04))", mixBlendMode: "overlay" }} />

        <div className="rb-shine rb-shine-visible" />
      </div>

      {exitingChildren ? (
        <div className="pointer-events-none absolute inset-0 z-20 rb-page-exit">
          {exitingChildren}
        </div>
      ) : null}

      <div className={`${exitingChildren ? "z-10 rb-page-enter" : ""}`}>
        {activeChildren}
      </div>

      {isTransitioning ? (
        <div className="pointer-events-auto absolute inset-0 z-40 flex items-center justify-center">
          <PageLoader durationMs={1200} onFinish={handleLoaderFinish} />
        </div>
      ) : null}
    </div>
  );
}

export default SiteTransition;
