"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const METRICS = [
  { target: 200, suffix: "+", label: "완료된 프로젝트" },
  { target: 98, suffix: "%", label: "클라이언트 재계약률" },
  { target: 50, suffix: "+", label: "전문 크리에이터" },
  { target: 12, suffix: "년", label: "업계 경력" },
];

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function Counter({
  target,
  suffix,
  label,
  delay,
}: {
  target: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    const DURATION = 2000;
    const timer = setTimeout(() => {
      const startTime = performance.now();
      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / DURATION, 1);
        const eased = easeOutCubic(progress);
        setCount(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);

    return () => clearTimeout(timer);
  }, [inView, target, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: delay / 1000, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        paddingTop: "32px",
      }}
    >
      <p
        style={{
          fontSize: "clamp(48px, 6vw, 72px)",
          fontWeight: 200,
          fontFamily: "var(--font-display)",
          color: "white",
          margin: 0,
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        {count}
        <span style={{ fontSize: "clamp(48px, 6vw, 72px)", fontWeight: 200 }}>
          {suffix}
        </span>
      </p>
      <p
        style={{
          fontSize: "14px",
          fontWeight: 300,
          color: "rgba(255,255,255,0.4)",
          marginTop: "12px",
          marginBottom: 0,
          fontFamily: "var(--font-sans)",
        }}
      >
        {label}
      </p>
    </motion.div>
  );
}

export default function NumbersSection() {
  return (
    <section
      style={{
        backgroundColor: "#0D0D0D",
        padding: "100px clamp(24px,6vw,120px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "48px",
        }}
        className="numbers-grid"
      >
        {METRICS.map((metric, i) => (
          <Counter
            key={i}
            target={metric.target}
            suffix={metric.suffix}
            label={metric.label}
            delay={i * 100}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .numbers-grid {
            grid-template-columns: repeat(1, 1fr) !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .numbers-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
