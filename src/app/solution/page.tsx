"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const TOTAL_SLIDES = 8;

export default function SolutionPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  const goToSlide = useCallback((index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const slides = el.querySelectorAll<HTMLElement>(".slide");
    const target = slides[index];
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth" });
    setCurrentSlide(index);
  }, []);

  const next = useCallback(() => {
    const next = Math.min(currentSlide + 1, TOTAL_SLIDES - 1);
    goToSlide(next);
  }, [currentSlide, goToSlide]);

  const prev = useCallback(() => {
    const prev = Math.max(currentSlide - 1, 0);
    goToSlide(prev);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") next();
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      if (isScrolling.current) return;
      const scrollTop = el.scrollTop;
      const height = el.clientHeight;
      const idx = Math.round(scrollTop / height);
      setCurrentSlide(Math.max(0, Math.min(idx, TOTAL_SLIDES - 1)));
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const slideStyle: React.CSSProperties = {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    scrollSnapAlign: "start",
    position: "relative",
    backgroundColor: "#161616",
  };

  return (
    <>
      {/* Back link */}
      <Link
        href="/"
        style={{
          position: "fixed",
          top: "28px",
          left: "32px",
          zIndex: 100,
          fontSize: "13px",
          fontWeight: 400,
          color: "rgba(255,255,255,0.5)",
          textDecoration: "none",
          fontFamily: "var(--font-outfit), Pretendard, sans-serif",
          transition: "color 0.2s ease",
        }}
        className="back-link"
      >
        ← HYPHEN
      </Link>

      {/* Dot navigation */}
      <div
        style={{
          position: "fixed",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              padding: 0,
              backgroundColor: i === currentSlide ? "white" : "rgba(255,255,255,0.2)",
              transition: "background-color 0.3s ease, transform 0.3s ease",
              transform: i === currentSlide ? "scale(1.3)" : "scale(1)",
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Left/Right arrow buttons */}
      {currentSlide > 0 && (
        <button
          onClick={prev}
          style={{
            position: "fixed",
            left: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 100,
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.15)",
            backgroundColor: "rgba(0,0,0,0.3)",
            color: "rgba(255,255,255,0.6)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            transition: "border-color 0.2s, color 0.2s",
            backdropFilter: "blur(8px)",
          }}
          aria-label="이전 슬라이드"
        >
          ←
        </button>
      )}
      {currentSlide < TOTAL_SLIDES - 1 && (
        <button
          onClick={next}
          style={{
            position: "fixed",
            right: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 100,
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.15)",
            backgroundColor: "rgba(0,0,0,0.3)",
            color: "rgba(255,255,255,0.6)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            transition: "border-color 0.2s, color 0.2s",
            backdropFilter: "blur(8px)",
          }}
          aria-label="다음 슬라이드"
        >
          →
        </button>
      )}

      {/* Slide container */}
      <div
        ref={containerRef}
        onClick={next}
        style={{
          height: "100vh",
          overflowY: "scroll",
          cursor: currentSlide < TOTAL_SLIDES - 1 ? "pointer" : "default",
          scrollSnapType: "y mandatory",
          scrollBehavior: "smooth",
        }}
      >
        {/* Slide 1 — Cover */}
        <div className="slide" style={slideStyle}>
          {/* Top labels */}
          <div
            style={{
              position: "absolute",
              top: "32px",
              left: "80px",
              fontSize: "14px",
              fontWeight: 800,
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.5)",
              fontFamily: "var(--font-outfit), Pretendard, sans-serif",
            }}
          >
            HYPHEN
          </div>
          <div
            style={{
              position: "absolute",
              top: "32px",
              right: "80px",
              fontSize: "14px",
              fontWeight: 800,
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.5)",
              fontFamily: "var(--font-outfit), Pretendard, sans-serif",
            }}
          >
            2026
          </div>

          <div style={{ textAlign: "center", padding: "0 24px" }}>
            <h1
              style={{
                fontSize: "clamp(40px, 5vw, 64px)",
                fontWeight: 700,
                color: "white",
                lineHeight: 1.25,
                fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                marginBottom: "24px",
                whiteSpace: "pre-line",
              }}
            >
              {"이제부터 팀 전체가\nAI로 일합니다"}
            </h1>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 300,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.7,
                fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                marginBottom: "48px",
                whiteSpace: "pre-line",
              }}
            >
              {"모든 팀원이 반복되는 업무 문제를 AI로 해결하는\n조직의 AX 항해를 출발하세요"}
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              {["대기업 도입 실적", "업무 자동화 전문", "24/7 무중단 운영"].map((badge) => (
                <span
                  key={badge}
                  style={{
                    fontSize: "13px",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "999px",
                    padding: "8px 20px",
                    color: "rgba(255,255,255,0.7)",
                    fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Slide 2 — Problem (Top Down) */}
        <div className="slide" style={slideStyle}>
          <div
            style={{
              display: "flex",
              width: "100%",
              maxWidth: "1100px",
              padding: "0 clamp(24px, 5vw, 80px)",
              gap: "80px",
              alignItems: "center",
            }}
          >
            <div style={{ flex: "0 0 auto", maxWidth: "380px" }}>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: "16px",
                  fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                }}
              >
                AI 도입은 시도해봤는데 성과는 잘 모르겠다면..
              </p>
              <h2
                style={{
                  fontSize: "clamp(36px, 4.5vw, 56px)",
                  fontWeight: 700,
                  color: "white",
                  lineHeight: 1.25,
                  fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                  whiteSpace: "pre-line",
                }}
              >
                {"혹시 Top Down 방식으로\nAI를 도입하셨나요?"}
              </h2>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                {
                  title: "AI 에이전트를 외주 맡겨 만들었는데..",
                  desc: "직원 역량이 따라가지 못해 좋은 시스템인데 방치됐어요.",
                  tag: "활용도 0%",
                },
                {
                  title: "위에서 AI를 쓰라고 강조하기는 하는데..",
                  desc: "억지로 시켜서 하는 AI 전환은 직원들의 인식까지 바꿀 수 없습니다.",
                  tag: null,
                },
                {
                  title: "AI 쓰라고 구독도 했는데, 열어보지도 않아요..",
                  desc: "사용법도 모르고, AI가 무엇할 수 있는지도 모르는 직원이 태반입니다.",
                  tag: "사용률 0%",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "12px",
                    padding: "24px 32px",
                    maxWidth: "500px",
                    marginLeft: `${i * 20}px`,
                  }}
                >
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.8)",
                      marginBottom: "6px",
                      fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                    }}
                  >
                    {card.title}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 300,
                      color: "rgba(255,255,255,0.5)",
                      fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                      margin: 0,
                    }}
                  >
                    {card.desc}
                  </p>
                  {card.tag && (
                    <span
                      style={{
                        display: "inline-block",
                        marginTop: "10px",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#ff6b6b",
                        background: "rgba(255,107,107,0.1)",
                        borderRadius: "4px",
                        padding: "2px 8px",
                        fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                      }}
                    >
                      {card.tag}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide 3 — Solution (Bottom Up) */}
        <div className="slide" style={slideStyle}>
          <div
            style={{
              display: "flex",
              width: "100%",
              maxWidth: "1100px",
              padding: "0 clamp(24px, 5vw, 80px)",
              gap: "80px",
              alignItems: "center",
            }}
          >
            <div style={{ flex: "0 0 auto", maxWidth: "360px" }}>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: "16px",
                  fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                }}
              >
                실무자들의 인식부터 바꾸는
              </p>
              <h2
                style={{
                  fontSize: "clamp(32px, 4vw, 52px)",
                  fontWeight: 700,
                  color: "white",
                  lineHeight: 1.25,
                  fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                  whiteSpace: "pre-line",
                }}
              >
                {"직접 만들어서 쓰는\nBottom Up 방식이\n필요합니다"}
              </h2>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                {
                  step: "01",
                  title: "필요성 체감",
                  desc: "AI를 직접 활용해본 실무자들은 '내 업무의 이런 부분에 AI가 필요하구나'를 체감합니다.",
                },
                {
                  step: "02",
                  title: "실무에 바로 적용",
                  desc: "외부 솔루션과 다르게 내 업무 문제를 해결하는 직접적인 도구로 실무에 바로 적용할 수 있습니다.",
                },
                {
                  step: "03",
                  title: "전사 확산",
                  desc: "우수한 AI 도구는 전 직원에게 공유됩니다. 개인의 혁신이 곧 조직의 혁신을 일으킵니다.",
                },
              ].map((card, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.95)",
                      color: "#161616",
                      borderRadius: "12px",
                      padding: "24px",
                      maxWidth: "480px",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "rgba(22,22,22,0.4)",
                          fontFamily: "var(--font-outfit), sans-serif",
                          letterSpacing: "0.05em",
                        }}
                      >
                        STEP {card.step}
                      </span>
                      <p
                        style={{
                          fontSize: "15px",
                          fontWeight: 700,
                          color: "#161616",
                          margin: 0,
                          fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                        }}
                      >
                        {card.title}
                      </p>
                    </div>
                    <p
                      style={{
                        fontSize: "13px",
                        fontWeight: 400,
                        color: "#444",
                        margin: 0,
                        lineHeight: 1.6,
                        fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                      }}
                    >
                      {card.desc}
                    </p>
                  </div>
                  {i < 2 && (
                    <div
                      style={{
                        marginLeft: "24px",
                        width: "1px",
                        height: "16px",
                        background: "rgba(255,255,255,0.15)",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide 4 — Before/After */}
        <div className="slide" style={slideStyle}>
          <div style={{ width: "100%", maxWidth: "1100px", padding: "0 clamp(24px, 5vw, 80px)" }}>
            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 700,
                color: "white",
                lineHeight: 1.25,
                fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                whiteSpace: "pre-line",
                textAlign: "center",
                marginBottom: "48px",
              }}
            >
              {"AX 도입 후\n귀사는 이렇게 변화합니다"}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
              {[
                {
                  now: "경쟁사는 이미 AI로 자동화하는데, 우리만 뒤처져요",
                  after: "필요한 AI 도구를 이제 직접 만들어요",
                  afterSub: "귀사 현황 분석 후 맞춤 자동화 제공",
                },
                {
                  now: "AI 도구를 도입해봤지만, 다음 날이면 원래 방식으로 돌아와요",
                  after: "직원이 만든 AI를 업무에 바로 적용해요",
                  afterSub: "실제 사내 데이터로 구축, 바로 업무 적용",
                },
                {
                  now: "외부 AI 시스템은 너무 복잡해서 현업에서 쓰기 어려워요",
                  after: "내 업무에 딱 맞는 도구를 가져요",
                  afterSub: "업무 흐름에 완벽히 맞는 AI 도구 생성",
                },
              ].map((col, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: "12px",
                      padding: "24px",
                      flex: 1,
                    }}
                  >
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.3)",
                        letterSpacing: "0.1em",
                        marginBottom: "12px",
                        fontFamily: "var(--font-outfit), sans-serif",
                      }}
                    >
                      NOW
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 400,
                        color: "rgba(255,255,255,0.6)",
                        lineHeight: 1.6,
                        fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                        margin: 0,
                      }}
                    >
                      {col.now}
                    </p>
                  </div>
                  <div
                    style={{
                      background: "white",
                      borderRadius: "12px",
                      padding: "24px",
                      flex: 1,
                    }}
                  >
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "rgba(22,22,22,0.35)",
                        letterSpacing: "0.1em",
                        marginBottom: "12px",
                        fontFamily: "var(--font-outfit), sans-serif",
                      }}
                    >
                      AFTER
                    </p>
                    <p
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#161616",
                        lineHeight: 1.4,
                        marginBottom: "6px",
                        fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                      }}
                    >
                      {col.after}
                    </p>
                    <p
                      style={{
                        fontSize: "13px",
                        fontWeight: 400,
                        color: "#555",
                        lineHeight: 1.5,
                        fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                        margin: 0,
                      }}
                    >
                      {col.afterSub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide 5 — Process (5 Steps) */}
        <div className="slide" style={slideStyle}>
          <div style={{ width: "100%", maxWidth: "1100px", padding: "0 clamp(24px, 5vw, 80px)" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2
                style={{
                  fontSize: "clamp(32px, 4vw, 52px)",
                  fontWeight: 700,
                  color: "white",
                  lineHeight: 1.25,
                  fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                  marginBottom: "12px",
                }}
              >
                AX 5단계 로드맵
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                }}
              >
                맞춤 설계에서 성과 검증까지
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px" }}>
              {[
                { step: 1, title: "진단", sub: "AI 도입 진단 미팅", desc: "AI 활용 수준 진단, 자동화 기회 발굴", accent: false },
                { step: 2, title: "설계", sub: "조직 맞춤 설계", desc: "자동화 모듈 조합, 임직원 목표 설계", accent: true },
                { step: 3, title: "실행", sub: "구축 병행", desc: "실전 자동화 구축, 워크플로우 설정", accent: true },
                { step: 4, title: "검증", sub: "최종 발표회", desc: "자동화 성과 측정, 성과리포트 발행", accent: true },
                { step: 5, title: "확산", sub: "사후 케어", desc: "전사 자동화 인프라 구축, AX 확산 지원", accent: false },
              ].map((s) => (
                <div
                  key={s.step}
                  style={{
                    background: s.accent ? "rgba(120, 100, 200, 0.25)" : "rgba(255,255,255,0.06)",
                    border: s.accent ? "1px solid rgba(120,100,200,0.4)" : "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    padding: "24px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: s.accent ? "rgba(180,160,255,0.8)" : "rgba(255,255,255,0.3)",
                      letterSpacing: "0.1em",
                      fontFamily: "var(--font-outfit), sans-serif",
                    }}
                  >
                    STEP {s.step}
                  </span>
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "white",
                      margin: 0,
                      fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                    }}
                  >
                    {s.title}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.7)",
                      margin: 0,
                      fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                    }}
                  >
                    {s.sub}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: 300,
                      color: "rgba(255,255,255,0.45)",
                      margin: 0,
                      lineHeight: 1.5,
                      fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide 6 — Security concern */}
        <div className="slide" style={slideStyle}>
          <div style={{ width: "100%", maxWidth: "1000px", padding: "0 clamp(24px, 5vw, 80px)" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: "16px",
                  fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                }}
              >
                조직이 가장 걱정하는 고민,
              </p>
              <h2
                style={{
                  fontSize: "clamp(36px, 4.5vw, 56px)",
                  fontWeight: 700,
                  color: "white",
                  lineHeight: 1.25,
                  fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                }}
              >
                보안은 믿을 수 있을까?
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
              {[
                {
                  title: "사내 데이터가 인터넷에 노출되면?",
                  desc: "배포를 아무렇게 해버려서 인사, 재무 등 중요한 데이터들이 노출되면 큰일인데..",
                },
                {
                  title: "DB 전체가 외부에 공개되어버리면?",
                  desc: "보안 설정을 하지 않으면 전체 DB가 외부에 노출될텐데..",
                },
                {
                  title: "AI가 권한 없는 데이터까지 막 접근하는 거 아니야?",
                  desc: "직원마다 접근 가능한 데이터가 다른데, AI가 이를 무시하고 접근할 수 있을까..",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,80,80,0.06)",
                    border: "1px solid rgba(255,80,80,0.15)",
                    borderRadius: "12px",
                    padding: "28px 28px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.85)",
                      marginBottom: "12px",
                      lineHeight: 1.4,
                      fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                    }}
                  >
                    {card.title}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 300,
                      color: "rgba(255,255,255,0.45)",
                      lineHeight: 1.6,
                      fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                      margin: 0,
                    }}
                  >
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide 7 — Security Solution */}
        <div className="slide" style={slideStyle}>
          <div style={{ width: "100%", maxWidth: "1000px", padding: "0 clamp(24px, 5vw, 80px)" }}>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <h2
                style={{
                  fontSize: "clamp(36px, 4.5vw, 56px)",
                  fontWeight: 700,
                  color: "white",
                  lineHeight: 1.25,
                  fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                  whiteSpace: "pre-line",
                }}
              >
                {"보안과 편의성,\n어느 것도 걱정마세요"}
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "20px",
                maxWidth: "700px",
                margin: "0 auto",
              }}
            >
              {[
                {
                  title: "데이터 권한 관리",
                  desc: "직책별, 부서별로 접근 범위 설정",
                  icon: "🔐",
                },
                {
                  title: "안전한 배포 환경",
                  desc: "인증된 사용자만 접근가능한 배포",
                  icon: "🛡",
                },
                {
                  title: "SSO 로그인",
                  desc: "1회 로그인으로 모든 앱 이동",
                  icon: "🔑",
                },
                {
                  title: "올인원 MCP",
                  desc: "도메인 자동 연결, 원클릭 배포",
                  icon: "⚡",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    padding: "32px 28px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                  }}
                >
                  <span style={{ fontSize: "24px", flexShrink: 0 }}>{card.icon}</span>
                  <div>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "white",
                        marginBottom: "6px",
                        fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                      }}
                    >
                      {card.title}
                    </p>
                    <p
                      style={{
                        fontSize: "13px",
                        fontWeight: 300,
                        color: "rgba(255,255,255,0.5)",
                        margin: 0,
                        fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                      }}
                    >
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide 8 — CTA */}
        <div className="slide" style={slideStyle}>
          <div style={{ textAlign: "center", padding: "0 24px" }}>
            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 700,
                color: "white",
                lineHeight: 1.3,
                fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                whiteSpace: "pre-line",
                marginBottom: "48px",
              }}
            >
              {"같은 시간으로 더 높은 성과를,\nAX 항해를 출발하세요"}
            </h2>
            <button
              onClick={() => { window.location.href = "/#contact"; }}
              style={{
                background: "white",
                color: "#161616",
                padding: "16px 40px",
                borderRadius: "4px",
                fontSize: "16px",
                fontWeight: 600,
                fontFamily: "Pretendard, var(--font-outfit), sans-serif",
                border: "none",
                cursor: "pointer",
                marginBottom: "40px",
                transition: "opacity 0.2s ease, transform 0.2s ease",
              }}
              className="cta-btn"
            >
              지금 바로 상담하기
            </button>
            <p
              style={{
                fontSize: "14px",
                fontWeight: 300,
                color: "rgba(255,255,255,0.35)",
                fontFamily: "Pretendard, var(--font-outfit), sans-serif",
              }}
            >
              Email: contact@hyphen.it.com
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .back-link:hover {
          color: white !important;
        }
        .cta-btn:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
}
