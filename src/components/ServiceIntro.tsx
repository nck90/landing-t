"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";

const KEYWORDS = ["효율적인", "스마트한", "자동화된", "혁신적인"];
const LINE_COUNT = 18;

function VerticalLines() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 3,
      }}
    >
      {Array.from({ length: LINE_COUNT }).map((_, i) => {
        const left = 3 + (i / (LINE_COUNT - 1)) * 94;
        const height = 25 + ((i * 17) % 50);
        const top = 5 + ((i * 13) % 65);
        const delay = (i * 0.31) % 4;
        const duration = 3 + (i % 3);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${left}%`,
              top: `${top}%`,
              width: "1px",
              height: `${height}%`,
              backgroundColor: "rgba(255,255,255,0.08)",
              animation: `lineGrow ${duration}s ease-in-out ${delay}s infinite`,
              transformOrigin: "top center",
            }}
          />
        );
      })}
    </div>
  );
}

export default function ServiceIntro() {
  const [kwIndex, setKwIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useReveal();

  // Keep 1 useScroll + 2 useTransform for parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setKwIndex((prev) => (prev + 1) % KEYWORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="service"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "600px",
        backgroundColor: "#161616",
        overflow: "hidden",
      }}
    >
      {/* Rolling HYPHEN background — pure CSS */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <div
          className="rolling-track"
          style={{
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
            height: "100%",
            animation: "rollingRight 20s linear infinite",
          }}
        >
          {(["HYPHEN", "HYPHEN", "HYPHEN", "HYPHEN"] as const).map((text, i) => (
            <span
              key={i}
              style={{
                fontSize: "clamp(300px, 35vw, 500px)",
                fontWeight: 900,
                fontFamily: "var(--font-display)",
                color: "rgba(255,255,255,0.04)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                paddingRight: "100px",
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      <VerticalLines />

      {/* Section fade to black at bottom */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(to bottom, transparent, #161616)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />

      {/* Main content with parallax — 1 motion.div wrapper */}
      <motion.div
        ref={revealRef}
        style={{
          position: "absolute",
          bottom: "120px",
          left: 0,
          right: 0,
          paddingLeft: "clamp(24px, 8vw, 120px)",
          paddingRight: "clamp(24px, 8vw, 120px)",
          zIndex: 5,
          y: textY,
          opacity: textOpacity,
        }}
      >
        {/* Keyword tag + logo row */}
        <div
          className="reveal service-keyword-row"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
            flexWrap: "wrap",
          }}
        >
          {/* Keyword box with AnimatePresence for cycling — 1 motion.span */}
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "4px",
              backgroundColor: "rgba(255,255,255,0.08)",
              padding: "8px 20px",
              minWidth: "120px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              position: "relative",
              height: "40px",
              boxShadow: "0 0 20px rgba(255,255,255,0.05)",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={kwIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
                }}
                style={{
                  position: "absolute",
                  fontSize: "15px",
                  fontWeight: 400,
                  color: "white",
                  fontFamily: "var(--font-sans)",
                  whiteSpace: "nowrap",
                }}
              >
                {KEYWORDS[kwIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "28px",
              fontWeight: 800,
              letterSpacing: "0.05em",
              color: "rgba(255,255,255,0.5)",
              userSelect: "none",
            }}
          >
            HYPHEN
          </span>
        </div>

        {/* Heading */}
        <div className="reveal reveal-delay-1">
          <h2
            className="service-heading"
            style={{
              margin: 0,
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 700,
              color: "white",
              lineHeight: 1.25,
              fontFamily: "var(--font-sans)",
              letterSpacing: "-0.01em",
            }}
          >
            업무자동화 솔루션을 제공합니다.
          </h2>
        </div>

        {/* Scroll indicator — plain CSS animation */}
        <div
          className="reveal reveal-delay-2 service-scroll-indicator"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "48px",
          }}
        >
          <div
            style={{
              width: "22px",
              height: "34px",
              border: "1px solid rgba(255,255,255,0.5)",
              borderRadius: "11px",
              position: "relative",
              flexShrink: 0,
            }}
          >
            <div className="scroll-dot" />
          </div>
          <span className="scroll-text">SCROLL DOWN</span>
        </div>
      </motion.div>

      <style>{`
        .scroll-dot {
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 3px;
          height: 6px;
          background: white;
          border-radius: 2px;
          animation: scrollDotBounce 1.5s ease-in-out infinite;
        }
        .scroll-text {
          font-size: 13px;
          font-weight: 300;
          letter-spacing: 0.1em;
          color: white;
          font-family: var(--font-sans);
          animation: scrollTextPulse 2s ease-in-out infinite;
        }
        @keyframes scrollDotBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        @keyframes scrollTextPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        @media (max-width: 767px) {
          .service-scroll-indicator {
            display: none !important;
          }
          .service-heading {
            word-break: keep-all;
            overflow-wrap: break-word;
          }
          .service-keyword-row {
            flex-wrap: wrap;
            gap: 8px;
          }
        }
      `}</style>
    </section>
  );
}
