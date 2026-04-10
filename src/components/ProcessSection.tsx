"use client";

import { useState } from "react";

const STEPS = [
  {
    num: "01",
    title: "리서치",
    desc: "비즈니스 환경과 사용자를 분석하고, 프로젝트의 핵심 방향을 설정합니다",
  },
  {
    num: "02",
    title: "전략",
    desc: "데이터에 기반한 전략을 수립하고, 측정 가능한 목표를 정의합니다",
  },
  {
    num: "03",
    title: "제작",
    desc: "디자인과 개발을 병행하며, 빠른 프로토타이핑으로 검증합니다",
  },
  {
    num: "04",
    title: "성장",
    desc: "런칭 이후 지속적인 분석과 개선으로 성과를 극대화합니다",
  },
] as const;

function ProcessStep({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="process-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "0 40px",
        paddingLeft: index === 0 ? 0 : undefined,
        paddingRight: index === STEPS.length - 1 ? 0 : undefined,
        borderLeft:
          index === 0 ? "none" : "1px solid rgba(255,255,255,0.06)",
        transition: "all 0.4s ease",
        cursor: "default",
      }}
    >
      {/* Decorative vertical gradient line */}
      <div
        style={{
          width: "2px",
          height: "24px",
          background: "linear-gradient(to bottom, transparent, #FF6918)",
          marginBottom: "16px",
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Number */}
      <span
        style={{
          fontSize: "48px",
          fontWeight: 200,
          fontFamily: "var(--font-display)",
          lineHeight: 1,
          display: "block",
          transition: "all 0.4s ease",
          ...(hovered
            ? {
                background: "linear-gradient(135deg, #FF6918, #FF3D71)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }
            : {
                color: "rgba(255,255,255,0.08)",
              }),
        }}
      >
        {step.num}
      </span>

      {/* Title */}
      <h3
        style={{
          fontSize: "18px",
          fontWeight: 500,
          color: "white",
          marginTop: "16px",
          transition: "text-shadow 0.4s ease",
          textShadow: hovered
            ? "0 0 20px rgba(255,105,24,0.35)"
            : "none",
        }}
      >
        {step.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "13px",
          fontWeight: 300,
          color: "rgba(255,255,255,0.35)",
          marginTop: "12px",
          lineHeight: 1.6,
        }}
      >
        {step.desc}
      </p>
    </div>
  );
}

export default function ProcessSection() {
  return (
    <section
      id="process"
      style={{
        backgroundColor: "#000",
        padding: "100px clamp(24px,5vw,80px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gradient border top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,105,24,0.3) 40%, rgba(255,61,113,0.3) 70%, transparent 100%)",
        }}
      />

      {/* Subtle radial glow bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "600px",
          height: "400px",
          background:
            "radial-gradient(ellipse at 100% 100%, rgba(255,105,24,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div style={{ marginBottom: "64px", position: "relative", zIndex: 1 }}>
        <p
          style={{
            fontSize: "12px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
            fontFamily: "var(--font-display)",
          }}
        >
          How we work
        </p>
        <h2
          style={{
            fontSize: "clamp(28px,3vw,40px)",
            fontWeight: 600,
            color: "white",
            marginTop: "8px",
          }}
        >
          작업 방식
        </h2>
      </div>

      {/* Steps grid */}
      <div className="process-grid" style={{ position: "relative", zIndex: 1 }}>
        {STEPS.map((step, i) => (
          <ProcessStep key={step.num} step={step} index={i} />
        ))}
      </div>

      <style>{`
        .process-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        .process-item {
          padding: 0 40px;
        }
        .process-item:first-child {
          padding-left: 0;
          border-left: none !important;
        }
        .process-item:last-child {
          padding-right: 0;
        }

        @media (max-width: 1024px) and (min-width: 641px) {
          .process-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .process-item:nth-child(2) {
            border-left: 1px solid rgba(255,255,255,0.06) !important;
          }
          .process-item:nth-child(3) {
            border-left: none !important;
            padding-left: 0;
            border-top: 1px solid rgba(255,255,255,0.06);
            padding-top: 40px;
          }
          .process-item:nth-child(4) {
            border-left: 1px solid rgba(255,255,255,0.06) !important;
            border-top: 1px solid rgba(255,255,255,0.06);
            padding-top: 40px;
          }
        }

        @media (max-width: 640px) {
          .process-grid {
            grid-template-columns: 1fr;
          }
          .process-item {
            padding: 32px 0 !important;
            border-left: none !important;
            border-top: 1px solid rgba(255,255,255,0.06);
          }
          .process-item:first-child {
            border-top: none;
            padding-top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
