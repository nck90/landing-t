"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";

const STATS = [
  { num: "150+", label: "프로젝트" },
  { num: "98%", label: "재계약률" },
  { num: "35+", label: "크리에이터" },
  { num: "12", label: "년" },
];

export default function AboutSection() {
  const ref = useReveal();

  return (
    <section
      id="about"
      style={{
        backgroundColor: "#000000",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "160px clamp(24px,6vw,120px)",
      }}
    >
      {/* Top — Statement area */}
      <div ref={ref}>
        <p
          className="reveal"
          style={{
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "#C8553A",
            fontWeight: 400,
          }}
        >
          About
        </p>

        <h2
          className="reveal reveal-delay-1"
          style={{
            fontSize: "clamp(28px,3.5vw,40px)",
            fontWeight: 600,
            color: "#FFFFFF",
            lineHeight: 1.35,
            marginTop: "16px",
            fontFamily: "var(--font-display)",
          }}
        >
          우리는 단순한 에이전시가 아닙니다
        </h2>

        <p
          className="reveal reveal-delay-2"
          style={{
            fontSize: "15px",
            fontWeight: 300,
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.55)",
            maxWidth: "560px",
            marginTop: "24px",
          }}
        >
          12년간 150개 이상의 프로젝트를 성공적으로 이끌어 왔습니다. 클라이언트의 비즈니스를 깊이 이해하고, 디지털 환경에서 브랜드가 성장할 수 있는 경험을 설계합니다. 우리는 트렌드를 따르지 않습니다. 브랜드만의 고유한 언어를 찾아 설계합니다.
        </p>
      </div>

      {/* Middle — Two images */}
      <div
        className="about-images"
        style={{
          marginTop: "80px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
        }}
      >
        <div
          className="reveal reveal-delay-3"
          style={{
            aspectRatio: "16/10",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Image
            src="/images/lawandadvisors-1.png"
            alt="Team meeting"
            fill
            style={{ objectFit: "cover", borderRadius: 0 }}
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>

        <div
          className="reveal reveal-delay-4"
          style={{
            aspectRatio: "16/10",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Image
            src="/images/lawandadvisors-2.png"
            alt="Businessman"
            fill
            style={{ objectFit: "cover", borderRadius: 0 }}
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Bottom — Stats */}
      <div
        className="about-stats"
        style={{
          marginTop: "80px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "40px 0",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`reveal reveal-delay-${i + 4}`}
          >
            <p
              style={{
                fontSize: "28px",
                fontWeight: 600,
                fontFamily: "var(--font-display)",
                color: "#FFFFFF",
                lineHeight: 1,
              }}
            >
              {stat.num}
            </p>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 300,
                color: "rgba(255,255,255,0.3)",
                marginTop: "8px",
                letterSpacing: "0.05em",
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .about-images {
            grid-template-columns: 1fr !important;
          }
          .about-stats {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 32px;
          }
        }
      `}</style>
    </section>
  );
}
