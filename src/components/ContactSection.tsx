"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";

interface FieldState {
  value: string;
  focused: boolean;
}

interface RippleState {
  id: number;
  x: number;
  y: number;
}

interface FloatingFieldProps {
  id: string;
  label: string;
  type?: string;
  name: string;
  fieldState: FieldState;
  onFocus: () => void;
  onBlur: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextarea?: boolean;
  rows?: number;
}

function FloatingField({
  id,
  label,
  type = "text",
  name,
  fieldState,
  onFocus,
  onBlur,
  onChange,
  isTextarea = false,
  rows = 4,
}: FloatingFieldProps) {
  const isLifted = fieldState.focused || fieldState.value.length > 0;

  return (
    <div style={{ position: "relative", marginBottom: "28px" }}>
      <label
        htmlFor={id}
        style={{
          position: "absolute",
          left: 0,
          top: isLifted ? "-4px" : "12px",
          fontSize: isLifted ? "11px" : "14px",
          color: isLifted ? "#161616" : "#999",
          fontFamily: "var(--font-sans)",
          fontWeight: isLifted ? 500 : 400,
          transition: "all 0.2s ease",
          pointerEvents: "none",
          zIndex: 1,
          lineHeight: 1,
        }}
      >
        {label}
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          name={name}
          value={fieldState.value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          rows={rows}
          style={{
            display: "block",
            width: "100%",
            border: "none",
            borderBottom: `1px solid ${fieldState.focused ? "#161616" : "#ddd"}`,
            borderRadius: 0,
            padding: "12px 0 8px",
            paddingTop: "20px",
            fontSize: "14px",
            fontFamily: "var(--font-sans)",
            color: "#161616",
            background: "white",
            outline: "none",
            transition: "border-bottom-color 0.3s ease",
            resize: "none",
            boxSizing: "border-box",
          }}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          value={fieldState.value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          style={{
            display: "block",
            width: "100%",
            border: "none",
            borderBottom: `1px solid ${fieldState.focused ? "#161616" : "#ddd"}`,
            borderRadius: 0,
            padding: "20px 0 8px",
            fontSize: "14px",
            fontFamily: "var(--font-sans)",
            color: "#161616",
            background: "white",
            outline: "none",
            transition: "border-bottom-color 0.3s ease",
            boxSizing: "border-box",
          }}
        />
      )}
    </div>
  );
}

const FIELD_MESSAGES: Record<string, string> = {
  company: "어떤 기업인지 알려주세요",
  name: "담당자를 알면 소통이 빨라집니다",
  phone: "빠른 연락을 위해 필요합니다",
  email: "상세 자료를 보내드립니다",
  message: "구체적일수록 정확한 답변이 가능합니다",
};

export default function ContactSection() {
  const [agreed, setAgreed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [ripples, setRipples] = useState<RippleState[]>([]);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [fields, setFields] = useState<Record<string, FieldState>>({
    company: { value: "", focused: false },
    name: { value: "", focused: false },
    phone: { value: "", focused: false },
    email: { value: "", focused: false },
    message: { value: "", focused: false },
  });

  const sectionRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const revealRef = useReveal();

  const setFieldValue = (name: string, value: string) => {
    setFields((prev) => ({ ...prev, [name]: { ...prev[name], value } }));
  };
  const setFieldFocused = (name: string, focused: boolean) => {
    setFields((prev) => ({ ...prev, [name]: { ...prev[name], focused } }));
    setFocusedField(focused ? name : null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFieldValue(e.target.name, e.target.value);
  };

  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitState === "loading") return;
    setSubmitState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: fields.company.value,
          name: fields.name.value,
          phone: fields.phone.value,
          email: fields.email.value,
          message: fields.message.value,
        }),
      });
      if (res.ok) {
        setSubmitState("success");
        setFields({
          company: { value: "", focused: false },
          name: { value: "", focused: false },
          phone: { value: "", focused: false },
          email: { value: "", focused: false },
          message: { value: "", focused: false },
        });
        setTimeout(() => setSubmitState("idle"), 3000);
      } else {
        setSubmitState("error");
        setTimeout(() => setSubmitState("idle"), 3000);
      }
    } catch {
      setSubmitState("error");
      setTimeout(() => setSubmitState("idle"), 3000);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 700);
  };

  const headingWords = ["HYPHEN과", "함께", "업무를", "혁신하세요."];

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{ display: "flex", minHeight: "700px", flexDirection: "row" }}
      className="contact-section"
    >
      {/* Top divider line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "1px",
          backgroundColor: "rgba(255,255,255,0.06)",
          zIndex: 2,
        }}
      />

      {/* Left — dark */}
      <div
        ref={revealRef}
        className="contact-left"
        style={{
          flex: 1,
          position: "relative",
          backgroundColor: "#45454A",
          padding: "80px clamp(24px, 6vw, 80px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Background image — static, no parallax */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <div style={{ width: "100%", height: "110%", marginTop: "-5%" }}>
            <Image
              src="/images/tech-globe.jpg"
              alt="Contact background"
              fill
              style={{ objectFit: "cover", opacity: 0.4 }}
              sizes="50vw"
            />
          </div>
        </div>

        {/* Color tint overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background: "linear-gradient(135deg, rgba(22,22,22,0.65) 0%, rgba(50,50,60,0.5) 100%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 2 }}>
          <p
            className="reveal"
            style={{
              fontSize: "14px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.6)",
              marginBottom: "16px",
              fontFamily: "var(--font-sans)",
            }}
          >
            Contact us
          </p>

          {/* Heading reveal */}
          <h2
            style={{
              fontSize: "clamp(28px, 3vw, 40px)",
              fontWeight: 600,
              color: "white",
              lineHeight: 1.35,
              fontFamily: "var(--font-sans)",
              marginBottom: "20px",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.3em",
            }}
          >
            {headingWords.map((word, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  animation: `contactWordReveal 0.6s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.08}s both`,
                }}
              >
                {word}
              </span>
            ))}
          </h2>

          {/* Animated line below heading — CSS transition */}
          <div
            className="reveal reveal-delay-1"
            style={{
              width: "60px",
              height: "1px",
              backgroundColor: "rgba(255,255,255,0.15)",
              marginBottom: "20px",
            }}
          />

          <div className="reveal reveal-delay-2" style={{ marginBottom: "48px" }}>
            <p
              style={{
                fontSize: "14px",
                fontWeight: 300,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
                fontFamily: "var(--font-sans)",
                margin: 0,
              }}
            >
              자동화 도입에 대해 문의해 주시면 전문 컨설턴트가 연락드립니다.
            </p>
            {/* AnimatePresence for field message crossfade — 1 motion element kept */}
            <AnimatePresence mode="wait">
              <motion.p
                key={focusedField ?? "default"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: focusedField ? 0.3 : 0.2, ease: "easeOut" }}
                style={{
                  fontSize: "14px",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "var(--font-sans)",
                  marginTop: "12px",
                  marginBottom: 0,
                  minHeight: "20px",
                }}
              >
                {focusedField ? FIELD_MESSAGES[focusedField] : ""}
              </motion.p>
            </AnimatePresence>
          </div>

          <a
            className="reveal reveal-delay-3 link-underline"
            href="/solution"
            style={{
              fontSize: "14px",
              fontWeight: 400,
              color: "white",
              textDecoration: "none",
              fontFamily: "var(--font-sans)",
              display: "inline-block",
            }}
          >
            솔루션 소개서 다운로드 ↗
          </a>

          {/* Testimonial quote */}
          <div className="reveal reveal-delay-4" style={{ marginTop: "48px" }}>
            <span
              style={{
                fontSize: "24px",
                fontWeight: 300,
                color: "rgba(255,255,255,0.15)",
                lineHeight: 1,
                display: "block",
                marginBottom: "8px",
                fontFamily: "var(--font-display)",
              }}
            >
              &ldquo;
            </span>
            <p
              style={{
                fontSize: "14px",
                fontStyle: "italic",
                fontWeight: 300,
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.6,
                fontFamily: "var(--font-sans)",
                margin: 0,
              }}
            >
              HYPHEN 덕분에 반복 업무에서 해방되었습니다.
            </p>
            <p
              style={{
                fontSize: "12px",
                fontWeight: 300,
                color: "rgba(255,255,255,0.3)",
                fontFamily: "var(--font-sans)",
                margin: "8px 0 0",
              }}
            >
              — 김서준, 스타트업 CTO
            </p>
          </div>
        </div>
      </div>

      {/* Right — light form area */}
      <div
        className="contact-right"
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          padding: "80px clamp(24px, 6vw, 80px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minWidth: 0,
        }}
      >
        <div style={{ marginBottom: "40px" }}>
          <p style={{
            fontSize: "12px",
            fontWeight: 400,
            color: "#999",
            fontFamily: "var(--font-display)",
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
            marginBottom: "12px",
          }}>
            Free Consultation
          </p>
          <h3 style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#161616",
            fontFamily: "var(--font-sans)",
            marginBottom: "12px",
          }}>
            무료 상담 신청
          </h3>
          <p style={{
            fontSize: "14px",
            fontWeight: 300,
            color: "#888",
            fontFamily: "var(--font-sans)",
            lineHeight: 1.6,
          }}>
            자동화 도입에 대해 문의해 주시면 전문 컨설턴트가 48시간 이내 연락드립니다.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <FloatingField
            id="company"
            label="회사명"
            name="company"
            fieldState={fields.company}
            onFocus={() => setFieldFocused("company", true)}
            onBlur={() => setFieldFocused("company", false)}
            onChange={handleChange}
          />

          <FloatingField
            id="name"
            label="이름"
            name="name"
            fieldState={fields.name}
            onFocus={() => setFieldFocused("name", true)}
            onBlur={() => setFieldFocused("name", false)}
            onChange={handleChange}
          />

          <FloatingField
            id="phone"
            label="연락처"
            type="tel"
            name="phone"
            fieldState={fields.phone}
            onFocus={() => setFieldFocused("phone", true)}
            onBlur={() => setFieldFocused("phone", false)}
            onChange={handleChange}
          />

          <FloatingField
            id="email"
            label="이메일"
            type="email"
            name="email"
            fieldState={fields.email}
            onFocus={() => setFieldFocused("email", true)}
            onBlur={() => setFieldFocused("email", false)}
            onChange={handleChange}
          />

          <FloatingField
            id="message"
            label="어떤 업무를 자동화하고 싶으신가요?"
            name="message"
            fieldState={fields.message}
            onFocus={() => setFieldFocused("message", true)}
            onBlur={() => setFieldFocused("message", false)}
            onChange={handleChange}
            isTextarea
            rows={4}
          />

          {/* Checkbox */}
          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              cursor: "pointer",
              marginBottom: "20px",
            }}
          >
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              style={{
                width: "16px",
                height: "16px",
                marginTop: "2px",
                flexShrink: 0,
                accentColor: "#161616",
              }}
            />
            <span
              style={{
                fontSize: "13px",
                fontWeight: 400,
                color: "#555",
                fontFamily: "var(--font-sans)",
                lineHeight: 1.5,
              }}
            >
              개인정보 수집 및 이용을 위해 약관 동의
            </span>
          </label>

          {/* Submit with ripple — 1 motion element for ripple effect */}
          <button
            ref={buttonRef}
            type="submit"
            className="contact-submit"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseDown={handleMouseDown}
            style={{
              backgroundColor: "#161616",
              color: "white",
              width: "100%",
              padding: "16px",
              fontSize: "15px",
              fontWeight: 500,
              fontFamily: "var(--font-sans)",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              marginTop: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <AnimatePresence>
              {ripples.map((ripple) => (
                <motion.span
                  key={ripple.id}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 4, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    left: ripple.x,
                    top: ripple.y,
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none",
                  }}
                />
              ))}
            </AnimatePresence>
            {submitState === "loading" ? "전송 중..." : submitState === "success" ? "✓ 전송 완료" : submitState === "error" ? "오류 발생" : "문의하기"}
            {submitState === "idle" && <span
              className="submit-arrow"
              style={{
                display: "inline-block",
                opacity: hovered ? 1 : 0,
                transform: hovered ? "translateX(0)" : "translateX(-4px)",
                transition: "opacity 0.2s ease, transform 0.2s ease",
              }}
            >
              →
            </span>}
          </button>

          {/* Post-submit note */}
          <p
            style={{
              fontSize: "12px",
              color: "#999",
              marginTop: "12px",
              fontFamily: "var(--font-sans)",
              textAlign: "center",
            }}
          >
            문의 후 2~3 영업일 내 담당자가 연락 드립니다.
          </p>

          {/* Alternative contact */}
          <div>
            <div
              style={{
                height: "1px",
                backgroundColor: "#E8E8E8",
                margin: "32px 0",
              }}
            />
            <p
              style={{
                fontSize: "13px",
                fontWeight: 300,
                color: "#999",
                textAlign: "center",
                fontFamily: "var(--font-sans)",
                marginBottom: "12px",
              }}
            >
              또는 직접 연락하세요
            </p>
            <p style={{ textAlign: "center", marginBottom: "8px" }}>
              <a
                href="mailto:contact@hyphen.it.com"
                className="link-underline"
                style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "#161616",
                  textDecoration: "none",
                  fontFamily: "var(--font-sans)",
                }}
              >
                contact@hyphen.it.com
              </a>
            </p>
            <p style={{ textAlign: "center" }}>
              <a
                href="tel:01091455226"
                className="link-underline"
                style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "#161616",
                  textDecoration: "none",
                  fontFamily: "var(--font-sans)",
                }}
              >
                010-9145-5226
              </a>
            </p>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes contactWordReveal {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .contact-section {
          position: relative;
          flex-direction: row;
        }
        .contact-submit {
          transition: background-color 0.3s ease, transform 0.3s ease;
        }
        .contact-submit:hover {
          background-color: #333 !important;
          transform: translateY(-2px);
        }
        @media (max-width: 768px) {
          .contact-section {
            flex-direction: column !important;
          }
          .contact-left,
          .contact-right {
            min-height: 400px;
          }
          .contact-right input,
          .contact-right textarea {
            min-height: 48px;
          }
          .contact-submit {
            min-height: 52px;
          }
        }
      `}</style>
    </section>
  );
}
