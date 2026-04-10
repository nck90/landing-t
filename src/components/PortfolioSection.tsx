"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Project {
  image: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
}

const PROJECTS: Project[] = [
  {
    image: "/images/nhnad-0.png",
    category: "Brand Identity",
    title: "NHN AD 브랜드 리뉴얼",
    description: "디지털 광고 기업의 새로운 비전에 맞는 브랜드 아이덴티티를 재정립했습니다.",
    tags: ["Branding", "Strategy"],
    year: "2024",
  },
  {
    image: "/images/plan-az-2.png",
    category: "Interactive Web",
    title: "Plan A—Z 웹사이트",
    description: "몰입형 인터랙티브 웹 경험. WebGL과 스크롤 기반 애니메이션으로 브랜드 스토리를 전달합니다.",
    tags: ["Development", "Motion"],
    year: "2024",
  },
  {
    image: "/images/lawandadvisors-3.png",
    category: "Corporate",
    title: "법무법인 로앤에이",
    description: "신뢰와 전문성을 전달하는 법무법인 웹사이트를 구축했습니다.",
    tags: ["UI/UX", "Development"],
    year: "2023",
  },
  {
    image: "/images/365mc-3.png",
    category: "Campaign",
    title: "365mc 디지털 캠페인",
    description: "의료 브랜드의 디지털 전환을 이끈 통합 마케팅 캠페인.",
    tags: ["Marketing", "Analytics"],
    year: "2024",
  },
];

const EASE = [0.25, 0.1, 0.25, 1] as const;

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 1;

  const imageEl = (
    <div
      style={{
        position: "relative",
        aspectRatio: "16 / 10",
        overflow: "hidden",
        borderRadius: 0,
      }}
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(max-width: 767px) 100vw, 50vw"
        style={{
          objectFit: "cover",
          transform: hovered ? "scale(1.03)" : "scale(1)",
          transition: "transform 0.7s ease",
        }}
      />
    </div>
  );

  const textEl = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <p
        style={{
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "#C8553A",
          fontFamily: "var(--font-display)",
          fontWeight: 400,
        }}
      >
        {project.category}
      </p>
      <h3
        style={{
          fontSize: "clamp(24px, 3vw, 36px)",
          fontWeight: 600,
          color: "white",
          marginTop: "12px",
          lineHeight: 1.25,
        }}
      >
        {project.title}
      </h3>
      <p
        style={{
          fontSize: "14px",
          fontWeight: 300,
          color: "rgba(255,255,255,0.45)",
          marginTop: "16px",
          lineHeight: 1.7,
          maxWidth: "400px",
        }}
      >
        {project.description}
      </p>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "24px" }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.3)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "999px",
              padding: "6px 14px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      <span
        style={{
          fontSize: "12px",
          color: "rgba(255,255,255,0.2)",
          marginTop: "16px",
        }}
      >
        {project.year}
      </span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "48px 0",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Desktop */}
      <div className="portfolio-row-desktop">
        {isEven ? (
          <>
            <div style={{ order: 1 }}>{textEl}</div>
            <div style={{ order: 2 }}>{imageEl}</div>
          </>
        ) : (
          <>
            <div style={{ order: 1 }}>{imageEl}</div>
            <div style={{ order: 2 }}>{textEl}</div>
          </>
        )}
      </div>
      {/* Mobile */}
      <div className="portfolio-row-mobile">
        <div>{imageEl}</div>
        <div>{textEl}</div>
      </div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      style={{
        backgroundColor: "#000",
        padding: "160px clamp(24px,6vw,120px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <p
        style={{
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "#C8553A",
        }}
      >
        Selected Work
      </p>
      <h2
        style={{
          fontSize: "clamp(32px,4vw,48px)",
          fontWeight: 600,
          color: "white",
          marginTop: "12px",
          marginBottom: "80px",
        }}
      >
        프로젝트
      </h2>

      <div>
        {PROJECTS.map((project, i) => (
          <ProjectRow key={project.title} project={project} index={i} />
        ))}
      </div>

      <style>{`
        .portfolio-row-desktop {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
        }
        .portfolio-row-mobile {
          display: none;
          flex-direction: column;
          gap: 24px;
        }
        @media (max-width: 767px) {
          .portfolio-row-desktop {
            display: none;
          }
          .portfolio-row-mobile {
            display: flex;
          }
        }
      `}</style>
    </section>
  );
}
