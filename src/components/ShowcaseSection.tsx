"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Text opacity: fade in then fade out as user scrolls through
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 1, 1, 0.6, 0]
  );

  // Subtle vertical parallax on the text block
  const textY = useTransform(scrollYProgress, [0, 1], ["30px", "-30px"]);

  // Video scale: slight zoom as user scrolls
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Background video */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          scale: videoScale,
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/videos/plan-az-1.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Heavy dark overlay with fade at top and bottom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.3) 70%, #000 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Center content */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          opacity: textOpacity,
          y: textY,
          padding: "0 clamp(24px, 5vw, 80px)",
        }}
      >
        {/* "CRAFTING" — light weight, barely visible */}
        <div
          style={{
            fontSize: "clamp(48px, 8vw, 100px)",
            fontWeight: 200,
            fontFamily: "var(--font-display)",
            color: "rgba(255,255,255,0.1)",
            letterSpacing: "0.05em",
            lineHeight: 1.1,
            textTransform: "uppercase",
          }}
        >
          CRAFTING
        </div>

        {/* "DIGITAL LEGACIES" — bold, white */}
        <div
          style={{
            fontSize: "clamp(48px, 8vw, 100px)",
            fontWeight: 700,
            fontFamily: "var(--font-display)",
            color: "white",
            letterSpacing: "0.05em",
            lineHeight: 1.1,
            textTransform: "uppercase",
          }}
        >
          DIGITAL LEGACIES
        </div>

        {/* Korean subtitle */}
        <div
          style={{
            fontSize: "18px",
            fontWeight: 300,
            color: "rgba(255,255,255,0.4)",
            marginTop: "24px",
            letterSpacing: "0.02em",
          }}
        >
          디지털 유산을 만듭니다
        </div>

        {/* Gradient line */}
        <div
          style={{
            width: "80px",
            height: "1px",
            background: "linear-gradient(90deg, #FF6918, #FF3D71)",
            marginTop: "32px",
          }}
        />
      </motion.div>
    </section>
  );
}
