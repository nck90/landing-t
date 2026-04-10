"use client";

import { useReveal } from "@/hooks/useReveal";

const MEDIA_PARTNERS = [
  "Microsoft",
  "Google Cloud",
  "AWS",
  "Slack",
  "Notion",
  "Zapier",
];

const GROUP_COMPANIES = [
  "AX Platform",
  "AI Agent",
  "Data Pipeline",
  "Workflow",
  "Integration",
];

function MarqueeRow({
  items,
  direction = "left",
  duration = 30,
  small = false,
}: {
  items: string[];
  direction?: "left" | "right";
  duration?: number;
  small?: boolean;
}) {
  const doubled = [...items, ...items, ...items];
  const animClass = direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <div
      className="marquee-wrapper"
      style={{
        overflow: "hidden",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <div
        className={`marquee-track ${animClass}`}
        style={{
          display: "flex",
          alignItems: "center",
          width: "max-content",
          animationDuration: `${duration}s`,
        }}
      >
        {doubled.map((name, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
            <span
              style={{
                fontSize: small ? "13px" : "15px",
                fontWeight: 600,
                color: small ? "#BBB" : "#999",
                fontFamily: "var(--font-sans)",
                whiteSpace: "nowrap",
                letterSpacing: "0.01em",
              }}
            >
              {name}
            </span>
            <span
              style={{
                color: "#DDD",
                fontSize: small ? "13px" : "15px",
                fontWeight: 400,
                margin: "0 32px",
                userSelect: "none",
              }}
            >
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function PartnersSection() {
  const ref = useReveal();

  return (
    <section
      style={{
        backgroundColor: "#FAFAFA",
        borderTop: "1px solid #E8E8E8",
        borderBottom: "1px solid #E8E8E8",
        padding: "100px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        ref={ref}
        style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 clamp(24px, 8vw, 120px)" }}
      >
        {/* Media Partners heading */}
        <h2
          className="reveal"
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#161616",
            marginBottom: "32px",
            fontFamily: "var(--font-sans)",
          }}
        >
          다양한 기업/파트너와 함께 자동화를 실현합니다.
        </h2>
      </div>

      {/* Partner logos — static row */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto 32px",
          padding: "0 clamp(24px, 8vw, 120px)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "40px",
        }}
      >
        {MEDIA_PARTNERS.map((name, i) => (
          <span
            key={i}
            className="partner-logo-item"
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#BEBEBE",
              fontFamily: "var(--font-display)",
              letterSpacing: "0.02em",
              transition: "color 0.3s ease, transform 0.3s ease",
              cursor: "default",
            }}
          >
            {name}
          </span>
        ))}
      </div>

      {/* Partners marquee — full width */}
      <div style={{ marginBottom: "40px" }}>
        <MarqueeRow items={MEDIA_PARTNERS} direction="left" duration={40} />
      </div>

      <div
        style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 clamp(24px, 8vw, 120px)" }}
      >
        {/* Divider */}
        <div style={{ borderBottom: "1px solid #E8E8E8", marginBottom: "64px" }} />

        {/* Group Companies heading */}
        <h2
          className="reveal reveal-delay-2"
          style={{
            fontSize: "18px",
            fontWeight: 500,
            color: "#161616",
            marginBottom: "32px",
            fontFamily: "var(--font-sans)",
          }}
        >
          HYPHEN은 다양한 분야의 자동화 솔루션을 제공합니다.
        </h2>
      </div>

      {/* Group companies marquee — full width, scrolls right */}
      <div className="reveal reveal-delay-3">
        <MarqueeRow items={GROUP_COMPANIES} direction="right" duration={45} small={true} />
      </div>

      {/* Section fade to dark at bottom */}
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

      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
        .marquee-track {
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .marquee-left {
          animation-name: marquee-left;
        }
        .marquee-right {
          animation-name: marquee-right;
        }
        .partner-logo-item:hover {
          color: #161616 !important;
          transform: scale(1.08);
        }
        .marquee-wrapper:hover .marquee-track {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
