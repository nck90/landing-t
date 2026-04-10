"use client";

import { useState, useEffect } from "react";

export default function BottomCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    const contact = document.getElementById("contact");
    if (contact) {
      contact.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        backgroundColor: "#161616",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "16px clamp(24px, 6vw, 120px)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <span
        className="bottom-cta-text"
        style={{
          fontSize: "15px",
          fontWeight: 500,
          color: "white",
          fontFamily: "var(--font-sans)",
        }}
      >
        업무 자동화, 지금 시작하세요
      </span>

      <button
        onClick={handleClick}
        className="bottom-cta-btn"
        style={{
          backgroundColor: "white",
          color: "#161616",
          fontSize: "14px",
          fontWeight: 600,
          fontFamily: "var(--font-sans)",
          padding: "10px 28px",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
          transition: "background-color 0.2s ease",
          flexShrink: 0,
        }}
      >
        무료 상담 받기
      </button>

      <style>{`
        .bottom-cta-btn:hover {
          background-color: #E8E8E8 !important;
        }
        @media (max-width: 767px) {
          .bottom-cta-text {
            display: none !important;
          }
          .bottom-cta-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
