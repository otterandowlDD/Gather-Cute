# Gather Cute — CSS Training & Design System

Reference notes for future CSS improvements. These are training/design-system ideas and are **not automatically applied to production**.

## 1. Brand tokens

```css
:root {
  --color-ink: #302829;
  --color-muted: #766b6d;
  --color-cream: #fffaf5;
  --color-surface: #fffdf9;
  --color-blush: #f8e5e6;
  --color-brand: #b96370;
  --color-brand-dark: #8d4652;
  --color-brand-soft: #f3d9dc;
  --color-accent: #c59b62;

  --border: rgba(48, 40, 41, 0.10);
  --shadow-sm: 0 6px 20px rgba(62, 44, 47, 0.06);
  --shadow-md: 0 18px 45px rgba(62, 44, 47, 0.10);

  --radius-sm: 12px;
  --radius-md: 20px;
  --radius-lg: 32px;
  --container: 1180px;
}
```

Brand direction: cozy but classy. Pink is an accent, not the whole canvas. Use cream + charcoal as the main base, with muted gold/tan for a premium detail.

## 2. Fluid typography with clamp()

```css
.hero h1 {
  font-family: "Playfair Display", serif;
  font-size: clamp(2.6rem, 6vw, 5.6rem);
  line-height: 0.98;
  letter-spacing: -0.035em;
  max-width: 12ch;
}

.hero-text {
  font-size: clamp(1rem, 1.4vw, 1.2rem);
  line-height: 1.75;
  max-width: 600px;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3.8rem);
}
```

## 3. Responsive hero grid

```css
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
  gap: clamp(2rem, 6vw, 6rem);
  align-items: center;
  min-height: min(850px, calc(100svh - 80px));
  padding-block: clamp(4rem, 10vw, 9rem);
}

@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .hero-copy { max-width: 720px; }
  .hero-card { max-width: 680px; }
}

@media (max-width: 600px) {
  .hero {
    padding-block: 3rem;
    gap: 2.5rem;
  }

  .hero-actions {
    display: grid;
    grid-template-columns: 1fr;
  }

  .btn { width: 100%; }
}
```

## 4. Fluid container

```css
.container {
  width: min(
    var(--container),
    calc(100% - clamp(2rem, 7vw, 7rem))
  );
  margin-inline: auto;
}
```

## 5. Premium hero card treatment

```css
.hero-card {
  position: relative;
  overflow: hidden;
  padding: clamp(1.3rem, 3vw, 2.2rem);
  background: linear-gradient(
    145deg,
    rgba(255,255,255,0.94),
    rgba(255,248,243,0.88)
  );
  border: 1px solid rgba(185, 99, 112, 0.14);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(14px);
}

.hero-card::before {
  content: "";
  position: absolute;
  width: 220px;
  height: 220px;
  right: -100px;
  top: -100px;
  background: var(--color-brand-soft);
  border-radius: 50%;
  filter: blur(30px);
  opacity: 0.55;
  pointer-events: none;
}
```

## 6. Event-card hierarchy

```css
.mini-event {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  padding: 1.1rem;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  transition: transform 180ms ease, background 180ms ease, border-color 180ms ease;
}

.mini-event strong {
  font-size: 1rem;
  color: var(--color-ink);
}

.mini-event p {
  margin-top: 0.25rem;
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--color-muted);
}

@media (hover: hover) {
  .mini-event:hover {
    transform: translateY(-3px);
    background: white;
    border-color: var(--border);
  }
}
```

## 7. CTA hierarchy

```css
.btn {
  min-height: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding-inline: 1.5rem;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
  transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
}

.btn.primary {
  color: white;
  background: var(--color-brand);
  box-shadow: 0 8px 24px rgba(185, 99, 112, 0.22);
}

.btn.primary:hover {
  background: var(--color-brand-dark);
  transform: translateY(-2px);
}

.btn.ghost {
  color: var(--color-ink);
  background: transparent;
  border: 1px solid var(--border);
}
```

## 8. Sticky translucent navigation

```css
.nav-wrap {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 250, 245, 0.82);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(48, 40, 41, 0.06);
}

.nav {
  min-height: 74px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media (max-width: 720px) {
  .nav { min-height: 64px; }
  .nav-links > a:not(.nav-cta) { display: none; }
  .nav-cta { padding: 0.7rem 1rem; }
}
```

## 9. Responsive spacing

```css
section {
  padding-block: clamp(4rem, 9vw, 8rem);
}

.card {
  padding: clamp(1.25rem, 3vw, 2rem);
}
```

## 10. Brand signature

```css
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-brand-dark);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.eyebrow::before {
  content: "✦";
  color: var(--color-accent);
  font-size: 0.8rem;
}
```

Use the sparkle motif sparingly: eyebrow, selected/highlight state, special event, or footer mark.

## 11. Accessibility states

```css
a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 3px solid rgba(185, 99, 112, 0.35);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

## Recommended breakpoint system

Use content-driven breakpoints rather than trying to target every device model.

```css
/* Base = mobile */

@media (min-width: 600px) {
  /* large mobile / small tablet */
}

@media (min-width: 768px) {
  /* tablet */
}

@media (min-width: 900px) {
  /* desktop layout */
}

@media (min-width: 1200px) {
  /* large desktop */
}
```

## Color directions

### A — Cozy Romantic (recommended)

```css
--color-cream: #fffaf5;
--color-brand: #b96370;
--color-brand-dark: #8d4652;
--color-accent: #c59b62;
--color-ink: #302829;
```

### B — Modern / Cool

```css
--color-cream: #faf9f6;
--color-brand: #9b6674;
--color-brand-dark: #70434e;
--color-accent: #a69b83;
--color-ink: #292728;
```

### C — Playful

```css
--color-cream: #fff8f3;
--color-brand: #d26f83;
--color-brand-dark: #a24e60;
--color-accent: #d0a260;
--color-ink: #342729;
```

## Learning order

1. CSS Variables
2. `clamp()`
3. CSS Grid
4. Media queries
5. Pseudo-elements
6. Hover/focus/reduced-motion interaction states

## Production rule

`styles.css` is the live production stylesheet. This document is the learning/design-system reference. Test changes before moving them into production.
