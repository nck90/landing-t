"use client";

import { useState, useEffect } from "react";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "service-intro", label: "서비스" },
  { id: "process", label: "프로세스" },
  { id: "solutions", label: "솔루션" },
  { id: "news", label: "뉴스" },
  { id: "contact", label: "문의" },
];

export default function DotNavigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);

  useEffect(() => {
    const ratios: Record<string, number> = {};

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios[entry.target.id] = entry.intersectionRatio;
        });

        let maxRatio = 0;
        let maxId = activeSection;
        for (const [id, ratio] of Object.entries(ratios)) {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            maxId = id;
          }
        }

        if (maxRatio > 0) {
          setActiveSection(maxId);
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeSection]);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Section navigation"
      style={{
        position: "fixed",
        right: "32px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
      className="dot-nav"
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive = activeSection === id;
        const isHovered = hoveredDot === id;

        return (
          <div
            key={id}
            style={{ position: "relative", display: "flex", alignItems: "center" }}
          >
            {/* Label — appears to left on hover */}
            <span
              style={{
                position: "absolute",
                right: "calc(100% + 8px)",
                fontSize: "11px",
                letterSpacing: "0.08em",
                color: "white",
                backgroundColor: "rgba(22,22,22,0.9)",
                padding: "4px 12px",
                borderRadius: "4px",
                whiteSpace: "nowrap",
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.2s ease",
                pointerEvents: "none",
                fontFamily: "var(--font-sans)",
              }}
            >
              {label}
            </span>

            {/* Dot */}
            <button
              onClick={() => handleClick(id)}
              onMouseEnter={() => setHoveredDot(id)}
              onMouseLeave={() => setHoveredDot(null)}
              aria-label={`Go to ${label}`}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                padding: 0,
                backgroundColor: isActive
                  ? "white"
                  : isHovered
                  ? "rgba(255,255,255,0.4)"
                  : "rgba(255,255,255,0.15)",
                transform: isActive ? "scale(1.2)" : "scale(1)",
                transition: "all 0.3s ease",
              }}
            />
          </div>
        );
      })}

      <style>{`
        @media (max-width: 1023px) {
          .dot-nav {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}
