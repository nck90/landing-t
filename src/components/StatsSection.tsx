"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useSpring, useTransform, motion } from "framer-motion";

const STATS = [
  { value: 200, suffix: "+", label: "자동화 프로젝트" },
  { value: 90, suffix: "%", label: "업무 시간 절감" },
  { value: 24, suffix: "/7", label: "무중단 운영" },
  { value: 48, suffix: "h", label: "평균 구축 기간" },
];

function StatItem({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(v).toString());

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        spring.set(value);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, value, delay, spring]);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 clamp(16px, 3vw, 48px)",
        position: "relative",
      }}
    >
      {/* Number row */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "2px",
          lineHeight: 1,
        }}
      >
        <motion.span
          style={{
            fontSize: "clamp(48px, 6vw, 72px)",
            fontWeight: 200,
            fontFamily: "var(--font-display, var(--font-sans))",
            color: "white",
            letterSpacing: "-0.02em",
          }}
        >
          {display}
        </motion.span>
        <span
          style={{
            fontSize: "clamp(48px, 6vw, 72px)",
            fontWeight: 200,
            fontFamily: "var(--font-display, var(--font-sans))",
            color: "white",
            letterSpacing: "-0.02em",
          }}
        >
          {suffix}
        </span>
      </div>

      {/* Label */}
      <div
        style={{
          fontSize: "13px",
          fontWeight: 300,
          color: "rgba(255,255,255,0.35)",
          marginTop: "12px",
          letterSpacing: "0.05em",
          fontFamily: "var(--font-sans)",
          textAlign: "center",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stats"
      style={{
        backgroundColor: "#161616",
        padding: "100px clamp(24px, 6vw, 120px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <style>{`
        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stats-divider {
            display: none !important;
          }
        }
      `}</style>

      <div
        className="stats-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        {STATS.map((stat, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}
          >
            <StatItem
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={i * 0.15}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
