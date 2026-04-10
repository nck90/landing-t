"use client";

import { useReveal } from "@/hooks/useReveal";

const LINE_COUNT = 14;

function VerticalLines() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {Array.from({ length: LINE_COUNT }).map((_, i) => {
        const left = 3 + (i / (LINE_COUNT - 1)) * 94;
        const height = 20 + ((i * 19) % 55);
        const top = 5 + ((i * 11) % 70);
        const delay = (i * 0.4) % 5;
        const duration = 3 + (i % 4);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${left}%`,
              top: `${top}%`,
              width: "1px",
              height: `${height}%`,
              backgroundColor: "rgba(255,255,255,0.03)",
              animation: `lineGrow ${duration}s ease-in-out ${delay}s infinite`,
              transformOrigin: "top center",
            }}
          />
        );
      })}
    </div>
  );
}

export default function Footer() {
  const ref = useReveal();

  const infoLines = [
    "경기 성남시 분당구 대왕판교로 645번길 16",
    "1800-0704 (ARS) / 031-8038-3000",
    "contact@hyphen.work",
  ];

  return (
    <footer
      style={{
        position: "relative",
        backgroundColor: "#161616",
        padding: "80px clamp(24px, 8vw, 120px) 48px",
        overflow: "hidden",
      }}
    >
      <VerticalLines />

      {/* HYPHEN background typography — static, bottom-right, subtle */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-2%",
          zIndex: 0,
          pointerEvents: "none",
          userSelect: "none",
          fontSize: "clamp(80px, 15vw, 180px)",
          fontWeight: 800,
          fontFamily: "var(--font-display)",
          letterSpacing: "-0.05em",
          textTransform: "uppercase" as const,
          whiteSpace: "nowrap" as const,
          color: "rgba(255,255,255,0.03)",
        }}
      >
        HYPHEN
      </div>

      <div ref={ref} style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto" }}>
        {/* Top row: Logo + slogan on left, info on right */}
        <div
          className="footer-top"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "64px",
            flexWrap: "wrap",
            gap: "40px",
          }}
        >
          {/* Left: logo + slogan */}
          <div>
            <div
              className="reveal"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "18px",
                fontWeight: 800,
                letterSpacing: "0.02em",
                color: "white",
                marginBottom: "12px",
              }}
            >
              HYPHEN
            </div>
            <p
              className="reveal reveal-delay-1"
              style={{
                fontSize: "13px",
                fontWeight: 300,
                color: "rgba(255,255,255,0.4)",
                fontFamily: "var(--font-sans)",
              }}
            >
              We&apos;re Delivering Happiness.
            </p>
          </div>

          {/* Right: company info staggered */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "8px", textAlign: "right" }}
            className="footer-info"
          >
            {infoLines.map((line, i) => (
              <p
                key={line}
                className={`reveal reveal-delay-${i + 1}`}
                style={{
                  fontSize: "13px",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {line}
              </p>
            ))}
            <a
              className="reveal reveal-delay-4 footer-download link-underline"
              href="#"
              style={{
                fontSize: "13px",
                fontWeight: 400,
                color: "rgba(255,255,255,0.6)",
                textDecoration: "none",
                fontFamily: "var(--font-sans)",
                display: "inline-block",
                marginTop: "4px",
              }}
            >
              솔루션 소개서 다운로드 ↗
            </a>

            {/* Social text icons */}
            <div
              className="reveal reveal-delay-5"
              style={{ display: "flex", gap: "16px", justifyContent: "flex-end", marginTop: "8px" }}
            >
              {["f", "in"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="footer-social"
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.3)",
                    textDecoration: "none",
                    fontFamily: "var(--font-sans)",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.3)";
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.06)", marginBottom: "32px" }} />

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
            <a
              href="#"
              style={{
                fontSize: "12px",
                fontWeight: 300,
                color: "rgba(255,255,255,0.25)",
                textDecoration: "none",
                fontFamily: "var(--font-sans)",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.25)";
              }}
            >
              개인정보처리방침
            </a>
          </div>
          <p
            style={{
              fontSize: "12px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.25)",
              fontFamily: "var(--font-sans)",
            }}
          >
            ©2015. HYPHEN Inc. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .footer-info {
            text-align: left !important;
          }
          .footer-info .footer-download {
            text-align: left;
          }
        }
        .link-underline {
          position: relative;
        }
        .link-underline::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: currentColor;
          transition: width 0.3s ease;
        }
        .link-underline:hover::after {
          width: 100%;
        }
      `}</style>
    </footer>
  );
}
