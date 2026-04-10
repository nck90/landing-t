"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const NAV_ITEMS = [
  { label: "회사소개", href: "#about" },
  { label: "솔루션", href: "#service" },
  { label: "인재채용", href: "#careers" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll progress bar — 1 motion element */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "rgba(255,255,255,0.15)",
          transformOrigin: "left",
          scaleX,
          zIndex: 60,
        }}
      />

      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: "clamp(24px, 6vw, 120px)",
          paddingRight: "clamp(24px, 6vw, 120px)",
          backgroundColor: scrolled ? "rgba(22,22,22,0.97)" : "rgba(22,22,22,0.85)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          transition: "background-color 0.3s ease",
        }}
      >
        {/* Logo — plain button with CSS hover */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="header-logo"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
            fontSize: "18px",
            fontWeight: 800,
            letterSpacing: "0.02em",
            color: "white",
            lineHeight: 1,
            transition: "opacity 0.2s ease",
          }}
        >
          HYPHEN
        </button>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center"
          style={{ gap: "100px" }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              className="nav-link-btn"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: 400,
                color: "rgba(255,255,255,0.7)",
                fontFamily: "var(--font-sans)",
                transition: "color 0.2s ease",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "white";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)";
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right: 광고문의 button */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNav("#contact"); }}
            className="hidden md:inline-flex items-center"
            style={{
              fontSize: "15px",
              fontWeight: 400,
              color: "white",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "4px",
              padding: "14px 32px",
              transition: "border-color 0.2s ease, background-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "rgba(255,255,255,0.6)";
              el.style.backgroundColor = "rgba(255,255,255,0.03)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "rgba(255,255,255,0.3)";
              el.style.backgroundColor = "transparent";
            }}
          >
            도입 문의
          </a>

          {/* Hamburger — mobile, CSS transitions only */}
          <button
            className="md:hidden flex flex-col justify-center items-center"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="메뉴"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              width: "32px",
              height: "32px",
              gap: "6px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span
              style={{
                display: "block",
                width: "20px",
                height: "1px",
                backgroundColor: "white",
                transition: "transform 0.3s ease",
                transform: mobileOpen ? "translateY(7px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "20px",
                height: "1px",
                backgroundColor: "white",
                transition: "opacity 0.2s ease",
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: "20px",
                height: "1px",
                backgroundColor: "white",
                transition: "transform 0.3s ease",
                transform: mobileOpen ? "translateY(-7px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu — CSS transition only */}
      <div
        className="fixed inset-0 z-40 flex flex-col justify-center md:hidden"
        style={{
          backgroundColor: "#161616",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
          paddingLeft: "clamp(24px, 8vw, 60px)",
        }}
      >
        <nav style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                textAlign: "left",
                fontSize: "clamp(28px, 8vw, 48px)",
                fontWeight: 600,
                color: "rgba(255,255,255,0.85)",
                fontFamily: "var(--font-sans)",
              }}
            >
              {item.label}
            </button>
          ))}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNav("#contact"); }}
            style={{
              fontSize: "16px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "4px",
              padding: "14px 32px",
              display: "inline-block",
              width: "fit-content",
              marginTop: "16px",
            }}
          >
            도입 문의
          </a>
        </nav>
      </div>

      <style>{`
        .header-logo:hover {
          opacity: 0.7;
        }
        .nav-link-btn::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: white;
          transition: width 0.3s ease;
        }
        .nav-link-btn:hover::after {
          width: 100%;
        }
      `}</style>
    </>
  );
}
