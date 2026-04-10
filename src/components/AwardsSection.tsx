"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const AWARDS = [
  { year: "2025", name: "GDWEB 우수 디자인 어워드", org: "한국웹디자인협회", category: "WEB DESIGN" },
  { year: "2025", name: "대한민국 디지털 광고대상", org: "한국디지털광고협회", category: "DIGITAL MARKETING" },
  { year: "2024", name: "IF Design Award", org: "iF International Forum", category: "BRAND IDENTITY" },
  { year: "2024", name: "Red Dot Design Award", org: "Design Zentrum NRW", category: "COMMUNICATION" },
  { year: "2024", name: "Google Premier Partner", org: "Google", category: "PARTNERSHIP" },
  { year: "2023", name: "Meta Business Partner", org: "Meta", category: "PARTNERSHIP" },
  { year: "2023", name: "웹어워드 코리아 대상", org: "한국인터넷전문가협회", category: "INTERACTIVE" },
  { year: "2023", name: "대한민국 브랜드 파워 1위", org: "한국능률협회", category: "BRANDING" },
];

export default function AwardsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    let startX = e.pageX - el.offsetLeft;
    let scrollLeft = el.scrollLeft;
    const onMove = (ev: MouseEvent) => {
      const x = ev.pageX - el.offsetLeft;
      el.scrollLeft = scrollLeft - (x - startX);
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <section
      style={{
        backgroundColor: "#161616",
        padding: "120px clamp(24px,6vw,120px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div>
        <p
          style={{
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.4)",
            margin: 0,
            fontFamily: "var(--font-sans)",
            fontWeight: 400,
          }}
        >
          Awards &amp; Recognition
        </p>
        <h2
          style={{
            fontSize: "clamp(28px,3vw,40px)",
            fontWeight: 700,
            color: "white",
            marginTop: "8px",
            marginBottom: 0,
            fontFamily: "var(--font-sans)",
          }}
        >
          수상 &amp; 인증
        </h2>
      </div>

      {/* Scrollable cards row */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "24px",
          padding: "48px 0",
          scrollbarWidth: "none",
          cursor: "grab",
          userSelect: "none",
        }}
        className="awards-scroll"
      >
        {AWARDS.map((award, i) => (
          <motion.div
            key={i}
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              minWidth: "280px",
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "8px",
              padding: "32px",
              transition: "border-color 0.3s, background-color 0.3s",
              flexShrink: 0,
            }}
            whileHover={{
              backgroundColor: "rgba(255,255,255,0.05)",
              borderColor: "rgba(255,255,255,0.12)",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                color: "rgba(255,255,255,0.3)",
                margin: 0,
              }}
            >
              {award.year}
            </p>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "white",
                marginTop: "12px",
                marginBottom: 0,
                fontFamily: "var(--font-sans)",
                lineHeight: 1.3,
              }}
            >
              {award.name}
            </p>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 300,
                color: "rgba(255,255,255,0.4)",
                marginTop: "8px",
                marginBottom: 0,
                fontFamily: "var(--font-sans)",
              }}
            >
              {award.org}
            </p>
            <p
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.25)",
                marginTop: "16px",
                marginBottom: 0,
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
              }}
            >
              {award.category}
            </p>
          </motion.div>
        ))}
      </div>

      <style>{`
        .awards-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
