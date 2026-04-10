"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FAQ_ITEMS = [
  {
    q: "업무 자동화 도입에 얼마나 걸리나요?",
    a: "프로젝트 규모에 따라 다르지만, 일반적으로 2~8주 내에 초기 자동화를 구축합니다. 간단한 RPA는 1주 내 가능하며, 복잡한 AI 에이전트 구축은 4~8주 소요됩니다.",
  },
  {
    q: "어떤 업무를 자동화할 수 있나요?",
    a: "데이터 입력, 이메일 처리, 문서 생성, 고객 응대, 보고서 작성, 시스템 간 데이터 동기화 등 반복적이고 규칙 기반인 업무를 자동화할 수 있습니다.",
  },
  {
    q: "기존 시스템과 연동이 가능한가요?",
    a: "네, Slack, Notion, Google Workspace, SAP, Salesforce 등 대부분의 업무 도구와 API 연동이 가능합니다. 커스텀 연동도 지원합니다.",
  },
  {
    q: "자동화 도입 비용은 어떻게 되나요?",
    a: "프로젝트 범위에 따라 상이합니다. 무료 컨설팅을 통해 현재 업무를 분석하고, 최적의 자동화 방안과 예상 비용을 안내드립니다.",
  },
  {
    q: "자동화 후 유지보수는 어떻게 하나요?",
    a: "24/7 모니터링 시스템으로 자동화 상태를 실시간 추적하며, 이슈 발생 시 즉시 대응합니다. 월간 리포트를 통해 성과를 공유합니다.",
  },
  {
    q: "소규모 기업도 도입할 수 있나요?",
    a: "네, 기업 규모와 관계없이 도입 가능합니다. 소규모 자동화부터 시작해 점진적으로 확대하는 단계적 접근을 추천드립니다.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section
      style={{
        backgroundColor: "#161616",
        padding: "120px clamp(24px, 6vw, 120px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div className="faq-layout">
          {/* Left: sticky header */}
          <div className="faq-header-col">
            <p
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.1em",
                margin: 0,
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
              }}
            >
              FAQ
            </p>
            <h2
              style={{
                margin: "8px 0 0",
                fontSize: "clamp(28px, 3vw, 40px)",
                fontWeight: 700,
                color: "white",
                fontFamily: "var(--font-display)",
                lineHeight: 1.2,
              }}
            >
              자주 묻는 질문
            </h2>
            <p
              style={{
                marginTop: "16px",
                fontSize: "14px",
                color: "rgba(255,255,255,0.4)",
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              궁금한 점이 있으시면 언제든 문의해 주세요.
            </p>
          </div>

          {/* Right: accordion */}
          <div className="faq-accordion-col">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  padding: "24px 0",
                  cursor: "pointer",
                }}
                onClick={() => toggle(i)}
              >
                {/* Question row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "white",
                      fontFamily: "var(--font-sans)",
                      lineHeight: 1.4,
                      paddingRight: "24px",
                    }}
                  >
                    {item.q}
                  </span>
                  <span
                    style={{
                      fontSize: "20px",
                      color: "rgba(255,255,255,0.4)",
                      flexShrink: 0,
                      transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                      display: "inline-block",
                      lineHeight: 1,
                      userSelect: "none",
                    }}
                  >
                    +
                  </span>
                </div>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        style={{
                          margin: 0,
                          paddingTop: "16px",
                          fontSize: "14px",
                          fontWeight: 300,
                          color: "rgba(255,255,255,0.5)",
                          lineHeight: 1.7,
                          maxWidth: "560px",
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .faq-layout {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 80px;
          align-items: start;
        }
        .faq-header-col {
          position: sticky;
          top: 80px;
        }
        @media (max-width: 768px) {
          .faq-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .faq-header-col {
            position: static;
          }
        }
      `}</style>
    </section>
  );
}
