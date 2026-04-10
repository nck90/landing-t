"use client";

import { useRef } from "react";
import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";

const THUMBNAILS = [
  { src: "/images/nhnad-0.png", category: "RPA 자동화", title: "반복업무 자동화", year: "2024" },
  { src: "/images/nhnad-1.png", category: "AI 에이전트", title: "지능형 업무 처리", year: "2024" },
  { src: "/images/nhnad-2.png", category: "데이터 파이프라인", title: "데이터 수집·정제", year: "2023" },
  { src: "/images/nhnad-3.png", category: "워크플로우", title: "업무 프로세스 설계", year: "2024" },
  { src: "/images/nhnad-4.png", category: "API 연동", title: "시스템 통합 자동화", year: "2023" },
  { src: "/images/nhnad-5.png", category: "챗봇 구축", title: "고객응대 자동화", year: "2024" },
  { src: "/images/nhnad-6.png", category: "문서 자동화", title: "계약서·보고서 생성", year: "2023" },
  { src: "/images/lawandadvisors-2.png", category: "소싱 자동화", title: "인력·자원 소싱", year: "2024" },
];

function ThumbnailCard({
  src,
  category,
  title,
  year,
  delayClass,
}: {
  src: string;
  category: string;
  title: string;
  year: string;
  delayClass: string;
}) {
  return (
    <div className={`reveal ${delayClass}`}>
      <div
        className="thumb-card"
        style={{
          aspectRatio: "16/10",
          borderRadius: "8px",
          overflow: "hidden",
          position: "relative",
          cursor: "pointer",
        }}
      >
        <Image
          src={src}
          alt={title}
          fill
          style={{
            objectFit: "cover",
            transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
          }}
          className="thumb-img"
          sizes="(max-width: 768px) 50vw, 25vw"
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 40%, transparent 100%)",
            zIndex: 1,
          }}
        />

        {/* Full overlay content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "20px",
          }}
        >
          {/* Category — top */}
          <span
            className="thumb-category"
            style={{
              fontSize: "11px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.85)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "var(--font-sans)",
              opacity: 0,
              transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {category}
          </span>

          {/* Bottom: title + year */}
          <div
            className="thumb-bottom"
            style={{
              opacity: 0,
              transform: "translateY(8px)",
              transition:
                "opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <p
              style={{
                margin: "0 0 4px",
                fontSize: "16px",
                fontWeight: 600,
                color: "white",
                fontFamily: "var(--font-sans)",
                lineHeight: 1.3,
              }}
            >
              {title}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "12px",
                fontWeight: 300,
                color: "rgba(255,255,255,0.5)",
                fontFamily: "var(--font-sans)",
              }}
            >
              {year}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DeliveringHappiness() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const revealRef = useReveal();

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        backgroundColor: "#161616",
        padding: "120px clamp(24px, 8vw, 120px)",
        position: "relative",
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
          zIndex: 0,
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
            animation: "rollingLeft 28s linear infinite",
          }}
        >
          {(["HYPHEN", "HYPHEN", "HYPHEN", "HYPHEN"] as const).map((text, i) => (
            <span
              key={i}
              style={{
                fontSize: "clamp(200px, 25vw, 350px)",
                fontWeight: 900,
                fontFamily: "var(--font-display)",
                color: "rgba(255,255,255,0.03)",
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

      {/* Top gradient fade */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "80px",
          background: "linear-gradient(to bottom, #161616, transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <div ref={revealRef} style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Quote block */}
        <div style={{ marginBottom: "80px" }}>
          {/* Thin horizontal line above heading */}
          <div
            className="reveal contact-line-anim"
            style={{
              width: "100px",
              height: "1px",
              backgroundColor: "rgba(255,255,255,0.1)",
              marginBottom: "20px",
            }}
          />

          {/* Opening quote */}
          <span
            className="reveal reveal-delay-1"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "48px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.3)",
              lineHeight: 1,
              display: "block",
              marginBottom: "24px",
            }}
          >
            &ldquo;
          </span>

          {/* Heading — CSS animation with staggered character delays */}
          <div style={{ overflow: "hidden" }}>
            <h2
              className="reveal reveal-delay-1"
              style={{
                margin: 0,
                fontSize: "clamp(40px, 6vw, 72px)",
                fontWeight: 700,
                fontFamily: "var(--font-display)",
                color: "white",
                lineHeight: 1.1,
              }}
            >
              Delivering Happiness
            </h2>
          </div>

          {/* Closing quote */}
          <span
            className="reveal reveal-delay-2"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "56px",
              fontWeight: 300,
              color: "white",
              lineHeight: 1,
              display: "block",
              marginTop: "8px",
              transform: "rotate(3deg)",
              transformOrigin: "center",
            }}
          >
            &rdquo;
          </span>

          {/* Thin horizontal line below heading */}
          <div
            className="reveal reveal-delay-2 contact-line-anim"
            style={{
              width: "100px",
              height: "1px",
              backgroundColor: "rgba(255,255,255,0.1)",
              marginTop: "20px",
            }}
          />

          {/* Description paragraphs */}
          <div style={{ marginTop: "32px", maxWidth: "600px" }}>
            <p
              className="reveal reveal-delay-3"
              style={{
                fontSize: "15px",
                fontWeight: 300,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.8,
                margin: "0 0 16px",
                fontFamily: "var(--font-sans)",
              }}
            >
              Delivering Happiness는 Client의 반복 업무를 자동화하여 더 가치 있는 일에 집중할 수 있도록 돕는다는 의미입니다.
            </p>
            <p
              className="reveal reveal-delay-4"
              style={{
                fontSize: "15px",
                fontWeight: 300,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.8,
                margin: "0",
                fontFamily: "var(--font-sans)",
              }}
            >
              우리는 이 가치를 실현하기 위해 최신 AI와 자동화 기술을 활용합니다. 효율을 위해 협력하고 혁신을 위해 도전하며, 비즈니스를 움직이는 가치를 만들어 나갑니다.
            </p>
          </div>
        </div>

        {/* Subheading with left accent line */}
        <div
          className="reveal reveal-delay-1"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "1px",
              backgroundColor: "rgba(255,255,255,0.15)",
              flexShrink: 0,
            }}
          />
          <p
            style={{
              fontSize: "20px",
              fontWeight: 500,
              color: "white",
              margin: 0,
              fontFamily: "var(--font-sans)",
            }}
          >
            다양한 업종의 자동화 솔루션을 확인해보세요.
          </p>
        </div>

        {/* Card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
          }}
          className="thumb-grid"
        >
          {THUMBNAILS.map((t, i) => (
            <ThumbnailCard
              key={i}
              src={t.src}
              category={t.category}
              title={t.title}
              year={t.year}
              delayClass={`reveal-delay-${(i % 4) + 1}`}
            />
          ))}
        </div>

        {/* Dot indicators */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "6px",
            marginTop: "32px",
          }}
        >
          {THUMBNAILS.map((_, i) => (
            <div
              key={i}
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Section fade to light at bottom */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "80px",
          background: "linear-gradient(to bottom, transparent, #F4F4F4)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .thumb-grid:hover .thumb-card {
          opacity: 0.7;
          transform: scale(0.97);
        }
        .thumb-grid:hover .thumb-card:hover {
          opacity: 1;
          transform: scale(1.08);
          z-index: 10;
          position: relative;
        }
        .thumb-card {
          transition: opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1);
          will-change: transform;
        }
        .thumb-card .thumb-img {
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .thumb-card:hover .thumb-category {
          opacity: 1 !important;
        }
        .thumb-card:hover .thumb-bottom {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        @media (max-width: 900px) {
          .thumb-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 500px) {
          .thumb-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
