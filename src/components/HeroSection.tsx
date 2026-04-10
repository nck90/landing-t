"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const HEADING_LINES = ["업무의", "자동화를 통해", "가치를 만듭니다."];
const LINE_DELAYS = [0.2, 0.8, 1.4];

// Pre-computed deterministic values to avoid hydration mismatch
const LINES = [
  { left: "3%", top: "45%", height: "42%", delay: "1.2s", dur: "4.1s", w: "1px", c: "rgba(255,255,255,0.07)" },
  { left: "8.5%", top: "22%", height: "55%", delay: "0.8s", dur: "3.6s", w: "1px", c: "rgba(255,255,255,0.07)" },
  { left: "14%", top: "68%", height: "28%", delay: "2.7s", dur: "4.8s", w: "1px", c: "rgba(255,255,255,0.07)" },
  { left: "19.5%", top: "12%", height: "69%", delay: "0.5s", dur: "4.9s", w: "2px", c: "rgba(255,255,255,0.15)" },
  { left: "25%", top: "35%", height: "52%", delay: "1.9s", dur: "3.8s", w: "1px", c: "rgba(255,255,255,0.07)" },
  { left: "30.5%", top: "58%", height: "35%", delay: "3.2s", dur: "5.1s", w: "1px", c: "rgba(255,255,255,0.07)" },
  { left: "36%", top: "15%", height: "63%", delay: "0.3s", dur: "4.3s", w: "1px", c: "rgba(255,255,255,0.07)" },
  { left: "41.5%", top: "42%", height: "45%", delay: "2.1s", dur: "3.5s", w: "1px", c: "rgba(255,255,255,0.07)" },
  { left: "47%", top: "8%", height: "72%", delay: "1.5s", dur: "5.3s", w: "1px", c: "rgba(255,255,255,0.07)" },
  { left: "52.5%", top: "55%", height: "38%", delay: "0.7s", dur: "4.0s", w: "2px", c: "rgba(255,255,255,0.15)" },
  { left: "58%", top: "28%", height: "58%", delay: "3.5s", dur: "4.6s", w: "1px", c: "rgba(255,255,255,0.07)" },
  { left: "63.5%", top: "62%", height: "32%", delay: "1.8s", dur: "3.4s", w: "1px", c: "rgba(255,255,255,0.07)" },
  { left: "69%", top: "18%", height: "65%", delay: "2.4s", dur: "5.0s", w: "1px", c: "rgba(255,255,255,0.07)" },
  { left: "74.5%", top: "48%", height: "40%", delay: "0.9s", dur: "3.9s", w: "1px", c: "rgba(255,255,255,0.07)" },
  { left: "80%", top: "5%", height: "75%", delay: "3.0s", dur: "5.2s", w: "2px", c: "rgba(255,255,255,0.15)" },
  { left: "85.5%", top: "38%", height: "48%", delay: "1.1s", dur: "4.4s", w: "1px", c: "rgba(255,255,255,0.07)" },
  { left: "91%", top: "52%", height: "36%", delay: "2.6s", dur: "3.7s", w: "1px", c: "rgba(255,255,255,0.07)" },
  { left: "97%", top: "25%", height: "60%", delay: "0.4s", dur: "4.7s", w: "1px", c: "rgba(255,255,255,0.07)" },
];

// Plain CSS vertical lines — no framer-motion
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
      {LINES.map((line, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: line.left,
            top: line.top,
            width: line.w,
            height: line.height,
            backgroundColor: line.c,
            animation: `lineGrow ${line.dur} ease-in-out ${line.delay} infinite`,
            transformOrigin: "top center",
          }}
        />
      ))}
    </div>
  );
}

function BackToTop({ show }: { show: boolean }) {
  const handleClick = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <button
      onClick={handleClick}
      aria-label="Back to top"
      style={{
        position: "absolute",
        bottom: "40px",
        right: "40px",
        zIndex: 20,
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.15)",
        backgroundColor: "transparent",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: show ? 1 : 0,
        transform: show ? "scale(1)" : "scale(0.8)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        pointerEvents: show ? "auto" : "none",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 12V4M4 8l4-4 4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function CharacterReveal({ line, lineIndex }: { line: string; lineIndex: number }) {
  const lineDelay = LINE_DELAYS[lineIndex];
  const chars = line.split("");
  return (
    <div style={{ overflow: "visible" }}>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {chars.map((char, charIndex) => {
          const delay = lineDelay + charIndex * 0.03;
          return (
            <span
              key={charIndex}
              style={{
                display: "inline-block",
                whiteSpace: char === " " ? "pre" : "normal",
                fontSize: "clamp(40px, 5.5vw, 64px)",
                fontWeight: 700,
                color: "white",
                lineHeight: 1.25,
                fontFamily: "var(--font-sans)",
                letterSpacing: "-0.01em",
                textShadow: "0 2px 40px rgba(0,0,0,0.5)",
                opacity: 0,
                animation: `charReveal 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s forwards`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function RollingTrackLeft() {
  return (
    <div
      className="rolling-track"
      style={{
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "center",
        height: "100%",
        animation: "rollingLeft 20s linear infinite",
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
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showBackTop, setShowBackTop] = useState(false);

  // 1 useScroll + 2 useTransform for parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "600px",
        backgroundColor: "#161616",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes charReveal {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Subtle gradient atmosphere */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 20% 80%, rgba(255,255,255,0.02) 0%, transparent 50%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Rolling HYPHEN background */}
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
        <RollingTrackLeft />
      </div>

      {/* Vignette overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 30% 60%, transparent 30%, rgba(0,0,0,0.3) 100%)",
          zIndex: 4,
          pointerEvents: "none",
        }}
      />

      <VerticalLines />

      {/* Bottom-left content with parallax — 1 motion.div */}
      <motion.div
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
        <h1 style={{ margin: 0, padding: 0 }}>
          {HEADING_LINES.map((line, lineIndex) => (
            <CharacterReveal key={lineIndex} line={line} lineIndex={lineIndex} />
          ))}
        </h1>

        {/* Divider line between heading and scroll indicator */}
        <div
          style={{
            width: "40px",
            height: "1px",
            backgroundColor: "rgba(255,255,255,0.1)",
            marginTop: "32px",
            opacity: 0,
            animation: "fadeIn 0.6s ease 1.1s forwards",
          }}
        />

        {/* Scroll indicator — plain CSS, no framer-motion */}
        <div
          className="hero-scroll-indicator"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "16px",
            position: "relative",
            opacity: 0,
            animation: "fadeIn 0.6s ease 1.1s forwards",
          }}
        >
          <div
            style={{
              width: "22px",
              height: "36px",
              border: "1px solid rgba(255,255,255,0.4)",
              borderRadius: "11px",
              position: "relative",
              flexShrink: 0,
            }}
          >
            <div className="hero-scroll-dot" />
          </div>
          <span className="hero-scroll-text">SCROLL DOWN</span>

          {/* Horizontal separator line */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: "calc(22px + 12px + 90px)",
              right: "clamp(-120px, -8vw, -24px)",
              top: "50%",
              height: "1px",
              backgroundColor: "rgba(255,255,255,0.04)",
              pointerEvents: "none",
            }}
          />
        </div>
      </motion.div>

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

      <BackToTop show={showBackTop} />

      <style>{`
        .hero-scroll-dot {
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 3px;
          height: 3px;
          background: white;
          border-radius: 50%;
          animation: scrollDotBounce 1.5s ease-in-out infinite;
        }
        .hero-scroll-text {
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
          .hero-scroll-indicator {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
