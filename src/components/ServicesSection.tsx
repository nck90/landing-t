"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const SERVICES = [
  {
    num: "01",
    title: "퍼포먼스 마케팅",
    desc: "데이터 기반 광고 운영과 성과 최적화. Google Ads, Meta, Naver 검색광고 공식 파트너.",
  },
  {
    num: "02",
    title: "브랜드 디자인",
    desc: "CI/BI부터 브랜드 가이드라인까지 시각적 아이덴티티 설계.",
  },
  {
    num: "03",
    title: "웹사이트 개발",
    desc: "Next.js 기반 고성능 웹사이트 구축. 반응형, 인터랙티브.",
  },
  {
    num: "04",
    title: "UI/UX 디자인",
    desc: "사용자 리서치 기반 인터페이스 설계로 전환율 최적화.",
  },
  {
    num: "05",
    title: "콘텐츠 전략",
    desc: "SEO와 SNS 콘텐츠 기획·운영으로 유기적 성장.",
  },
];

function ServiceRow({
  service,
  delay,
  inView,
  isLast,
}: {
  service: (typeof SERVICES)[number];
  delay: number;
  inView: boolean;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      <div
        className={`service-row${isLast ? " service-row-last" : ""}`}
        onClick={() => setOpen((v) => !v)}
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          ...(isLast ? { borderBottom: "1px solid rgba(255,255,255,0.06)" } : {}),
          padding: "32px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
      >
        {/* Left side */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0", flex: 1 }}>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 400,
              fontFamily: "var(--font-display)",
              color: "rgba(255,255,255,0.3)",
              width: "40px",
              flexShrink: 0,
            }}
          >
            {service.num}
          </span>
          <div style={{ flex: 1 }}>
            <span
              style={{
                fontSize: "20px",
                fontWeight: 500,
                color: "#FFFFFF",
                display: "block",
              }}
            >
              {service.title}
            </span>
            <AnimatePresence initial={false}>
              {open && (
                <motion.p
                  key="desc"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  style={{
                    fontSize: "14px",
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.45)",
                    maxWidth: "480px",
                    marginTop: "12px",
                    lineHeight: 1.7,
                    overflow: "hidden",
                  }}
                >
                  {service.desc}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right side — arrow */}
        <span
          className="service-arrow"
          style={{
            fontSize: "16px",
            color: "rgba(255,255,255,0.2)",
            flexShrink: 0,
            marginLeft: "24px",
            display: "inline-block",
            transition: "transform 0.3s ease, color 0.3s ease",
          }}
        >
          →
        </span>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      ref={ref}
      style={{
        backgroundColor: "#000000",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "160px clamp(24px,6vw,120px)",
      }}
    >
      {/* Header */}
      <div>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0 }}
          style={{
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "#C8553A",
            fontWeight: 400,
          }}
        >
          Services
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
          style={{
            fontSize: "clamp(32px,4vw,48px)",
            fontWeight: 600,
            color: "#FFFFFF",
            marginTop: "12px",
            fontFamily: "var(--font-display)",
          }}
        >
          서비스
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}
          style={{
            fontSize: "15px",
            fontWeight: 300,
            color: "rgba(255,255,255,0.55)",
            marginTop: "16px",
            marginBottom: "64px",
          }}
        >
          비즈니스 성장을 위한 통합 디지털 솔루션
        </motion.p>
      </div>

      {/* Service list */}
      <div>
        {SERVICES.map((service, i) => (
          <ServiceRow
            key={service.num}
            service={service}
            delay={0.16 + i * 0.08}
            inView={inView}
            isLast={i === SERVICES.length - 1}
          />
        ))}
      </div>

      <style>{`
        .service-row:hover {
          background: rgba(255,255,255,0.02);
        }
        .service-row:hover .service-arrow {
          transform: translateX(4px);
          color: rgba(255,255,255,0.5);
        }
      `}</style>
    </section>
  );
}
