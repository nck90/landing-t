"use client";

import { useReveal } from "@/hooks/useReveal";
import Image from "next/image";

const NEWS_ITEMS = [
  {
    category: "NEWS",
    title: "HYPHEN, AI 기반 업무자동화 플랫폼 정식 출시",
    excerpt: "기업의 반복 업무를 90% 이상 자동화하는 AX 플랫폼을 선보입니다.",
    date: "Mar 18, 2026",
    readTime: "5분",
    image: "/images/nhnad-1.png",
    featured: true,
  },
  {
    category: "NEWS",
    title: "시리즈 A 투자 유치, 100억 규모",
    excerpt: "글로벌 AX 시장 확대를 위한 투자를 유치했습니다.",
    date: "Oct 16, 2025",
    readTime: "3분",
    image: "/images/nhnad-2.png",
    featured: false,
  },
  {
    category: "BLOG",
    title: "RPA vs AI 에이전트, 무엇이 다른가",
    excerpt: "전통적 RPA와 AI 에이전트의 차이를 분석합니다.",
    date: "Sep 24, 2025",
    readTime: "7분",
    image: "/images/nhnad-3.png",
    featured: false,
  },
  {
    category: "NEWS",
    title: "삼성전자 업무자동화 프로젝트 수주",
    excerpt: "대기업 업무 프로세스 혁신 프로젝트를 수주했습니다.",
    date: "Aug 15, 2025",
    readTime: "4분",
    image: "/images/nhnad-4.png",
    featured: false,
  },
  {
    category: "BLOG",
    title: "업무자동화 도입 가이드 A to Z",
    excerpt: "처음 자동화를 도입하는 기업을 위한 가이드입니다.",
    date: "Jul 20, 2025",
    readTime: "10분",
    image: "/images/nhnad-5.png",
    featured: false,
  },
  {
    category: "NEWS",
    title: "마이크로소프트 파트너 인증 획득",
    excerpt: "MS Power Platform 공식 파트너가 되었습니다.",
    date: "Jun 30, 2025",
    readTime: "2분",
    image: "/images/nhnad-6.png",
    featured: false,
  },
];

const BADGE_COLORS: Record<string, string> = {
  NEWS: "#161616",
  BLOG: "#45454A",
};

function NewsCard({
  category,
  title,
  excerpt,
  date,
  readTime,
  image,
  featured,
  delay,
}: {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
  delay: number;
}) {
  const badgeBg = BADGE_COLORS[category] ?? "#161616";
  const delayClass = delay > 0 ? `reveal-delay-${delay}` : "";
  return (
    <div
      className={`reveal ${delayClass} news-card`}
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.4s ease, box-shadow 0.4s ease, opacity 0.4s ease",
        border: "1px solid #F0F0F0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        gridColumn: featured ? "span 2" : undefined,
        gridRow: featured ? "span 2" : undefined,
      }}
    >
      <div
        style={{
          aspectRatio: featured ? "16/9" : "16/9",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#E8E8E8",
        }}
      >
        <Image
          src={image}
          alt={title}
          fill
          style={{
            objectFit: "cover",
            transition: "transform 0.4s ease, filter 0.6s ease",
            filter: "grayscale(100%)",
          }}
          className="news-img"
          sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
        />
        <div
          className="news-img-overlay"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.05) 100%)",
            transition: "opacity 0.4s ease",
            zIndex: 1,
          }}
        />
        {featured && (
          <div
            className="news-featured-shimmer"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              pointerEvents: "none",
            }}
          />
        )}
      </div>
      <div style={{ padding: "20px" }}>
        <span
          className="news-badge"
          style={{
            display: "inline-block",
            fontSize: "11px",
            fontWeight: 600,
            backgroundColor: badgeBg,
            color: "white",
            borderRadius: "4px",
            padding: "4px 10px",
            fontFamily: "var(--font-sans)",
            letterSpacing: "0.05em",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            transition: "transform 0.3s ease",
          }}
        >
          {category}
        </span>
        <p
          className="news-title"
          style={{
            fontSize: featured ? "24px" : "15px",
            fontWeight: 500,
            color: "#161616",
            marginTop: "14px",
            lineHeight: 1.5,
            fontFamily: "var(--font-sans)",
            transition: "color 0.2s ease",
            position: "relative",
            display: featured ? "block" : "inline-block",
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontSize: "13px",
            fontWeight: 300,
            color: "#888",
            marginTop: "6px",
            lineHeight: 1.5,
            fontFamily: "var(--font-sans)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: featured ? 2 : 1,
            WebkitBoxOrient: "vertical",
          } as React.CSSProperties}
        >
          {excerpt}
        </p>
        <p
          style={{
            fontSize: "12px",
            fontWeight: 300,
            color: "#999",
            marginTop: "12px",
            fontFamily: "var(--font-sans)",
            borderLeft: "2px solid #E0E0E0",
            paddingLeft: "8px",
          }}
        >
          {date}
          <span style={{ color: "#BBB", margin: "0 4px" }}>·</span>
          <span style={{ fontSize: "11px", fontWeight: 300, color: "#BBB" }}>{readTime} 읽기</span>
        </p>
      </div>
    </div>
  );
}

export default function NewsSection() {
  const ref = useReveal();

  return (
    <section
      style={{
        backgroundColor: "#F8F8F8",
        padding: "100px clamp(24px, 8vw, 120px)",
        backgroundImage: "radial-gradient(circle, #DDD 0.5px, transparent 0.5px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div ref={ref} style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div
          className="reveal"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "48px",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              fontWeight: 600,
              color: "#161616",
              margin: 0,
              fontFamily: "var(--font-sans)",
              display: "flex",
              alignItems: "center",
            }}
          >
            HYPHEN의 다양한 소식을 확인해보세요.
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "28px",
                height: "28px",
                border: "1px solid #DDD",
                borderRadius: "50%",
                fontSize: "11px",
                fontWeight: 500,
                color: "#999",
                marginLeft: "12px",
                flexShrink: 0,
              }}
            >
              06
            </span>
          </h2>
          <a
            href="#"
            className="more-link"
            style={{
              fontSize: "14px",
              fontWeight: 400,
              color: "#666",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontFamily: "var(--font-sans)",
              borderBottom: "1px solid #DDD",
              paddingBottom: "2px",
              transition: "color 0.25s ease, border-color 0.25s ease",
              flexShrink: 0,
            }}
          >
            더보기
            <span className="more-arrow" style={{ display: "inline-block", transition: "transform 0.25s ease" }}>
              →
            </span>
          </a>
        </div>

        <div className="news-grid">
          {NEWS_ITEMS.map((item, i) => (
            <NewsCard key={i} {...item} delay={i % 3} />
          ))}
        </div>

      </div>

      <style>{`
        @keyframes featuredShimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .news-featured-shimmer {
          background: linear-gradient(135deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0) 100%);
          background-size: 200% 200%;
          animation: featuredShimmer 4s linear infinite;
          will-change: background-position;
        }
        .news-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .news-grid:hover .news-card {
          opacity: 0.6;
        }
        .news-grid:hover .news-card:hover {
          opacity: 1;
        }
        .news-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.12);
        }
        .news-card:hover .news-img {
          transform: scale(1.05);
          filter: grayscale(0%) !important;
        }
        .news-card:hover .news-img-overlay {
          opacity: 0;
        }
        .news-card:hover .news-title {
          color: #000 !important;
        }
        .news-card:hover .news-badge {
          transform: translateX(-4px);
        }
        .news-title::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #161616;
          transition: width 0.3s ease;
        }
        .news-card:hover .news-title::after {
          width: 100%;
        }
        .more-link:hover {
          color: #161616 !important;
          border-bottom-color: #161616 !important;
        }
        .more-link:hover .more-arrow {
          transform: translateX(6px);
        }
        @media (max-width: 900px) {
          .news-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .news-card[style*="span 2"] {
            grid-column: span 2;
            grid-row: span 1;
          }
        }
        @media (max-width: 560px) {
          .news-grid {
            grid-template-columns: 1fr;
          }
          .news-card[style*="span 2"] {
            grid-column: span 1;
            grid-row: span 1;
          }
        }
      `}</style>
    </section>
  );
}
