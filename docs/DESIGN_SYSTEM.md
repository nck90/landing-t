# LEGEND Design System v5

Base reference: Law & Advisors (lawandadvisors.com)
Secondary: Plan A-Z typography, Studio 505 scroll feel

## Colors (STRICT — no other colors)
- Background: #000000
- Surface: #0A0A0A (cards, elevated surfaces)
- Surface-alt: #111111 (subtle contrast)
- Text-primary: #FFFFFF
- Text-secondary: rgba(255,255,255,0.55)
- Text-muted: rgba(255,255,255,0.3)
- Text-ghost: rgba(255,255,255,0.08)
- Accent: #C8553A (warm muted red-orange — NOT bright #FF6918)
- Accent-subtle: rgba(200,85,58,0.15)
- Border: rgba(255,255,255,0.06)
- Border-hover: rgba(255,255,255,0.12)

## Typography
- Display font: var(--font-display) = Outfit
- Body font: var(--font-sans) = Pretendard
- Heading sizes: 72/56/40/28/22/18px
- Body: 15px, lineHeight 1.8
- Small: 13px
- Micro: 11px
- Label: 11-12px, uppercase, letterSpacing 0.15em, fontWeight 400
- Heading weight: 600 (NOT 800/900 — that looks AI)
- Body weight: 300
- Label weight: 400

## Spacing (8px grid)
- Section padding vertical: 160px (desktop) / 100px (mobile)
- Section padding horizontal: clamp(24px, 6vw, 120px)
- Between major elements: 48px
- Between related elements: 24px
- Between tight elements: 12px

## Animation (CONSISTENT everywhere)
- Duration: 0.7s (default), 1.0s (large reveals)
- Easing: [0.25, 0.1, 0.25, 1] (smooth, not bouncy)
- Delay stagger: 0.08s between items
- Scroll trigger: once, margin "-100px"
- Entry patterns (ONLY these three):
  1. fadeUp: { opacity: 0, y: 30 } → { opacity: 1, y: 0 }
  2. fadeIn: { opacity: 0 } → { opacity: 1 }
  3. clipReveal: { clipPath: "inset(0 100% 0 0)" } → { clipPath: "inset(0 0% 0 0)" }

## Components rules
- NO gradient text anywhere
- NO gradient borders
- NO floating particles
- Accent color used ONLY for: small labels, thin lines, hover indicators
- Border radius: 0px (images, cards) or 999px (pills only)
- Images: NO border radius, NO perspective tilt
- Dividers: 1px solid rgba(255,255,255,0.06)
- Hover transitions: 0.3s ease

## Section pattern
Each section follows:
1. Label (optional): 11px uppercase, accent color, letterSpacing 0.15em
2. Heading: 40-56px, weight 600, white
3. Content
4. Bottom divider line
