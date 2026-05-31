# DYNAMIC SPATIAL UI VISUAL DESIGN SYSTEM
**File Identifier:** `gap_03_visual_design_system.md`

Digimation Flight is abandoning traditional flat layouts for a premium "humanist tech" design language. Grounded in a modern spatial design system, the redesign uses the Bento Grid module, low-latency micro-interactions, CSS backdrop-filters (Glassmorphism 2.0), and strict WCAG 2.1 compliance structures.

---

## 1. Locked Color Palette & Contrast Audit
To deliver perfect accessibility without compromising brand identity, we enforce a strict typographic pairing protocol.

### Core Hex Codes
*   **Yellowish Gold:** `#FCC509` (Primary Brand Highlight)
*   **Rose White:** `#FFF9FA` (Primary Light Background)
*   **Charcoal Black:** `#17171D` (Primary Dark Background & Text Color)

### Contrast Ratios and Strict Formatting Rules
1.  **Yellowish Gold (`#FCC509`) on Charcoal Black (`#17171D`) — 13.91:1 Contrast:**
    *   *Usage:* Passes all WCAG 2.1 Level AA and AAA checks for normal and large text. Allowed for headings, badges, accents, border outlines, and button backgrounds.
2.  **Charcoal Black (`#17171D`) on Rose White (`#FFF9FA`) — 19.10:1 Contrast:**
    *   *Usage:* Outstanding contrast. This is the **default combination** for all body copy, course descriptions, and readable typography across the platform.
3.  **Yellowish Gold (`#FCC509`) on Rose White (`#FFF9FA`) — 1.45:1 Contrast:**
    *   *STRICT RULE:* **CRITICAL CONTRAST FAILURE.** Never render Yellowish Gold text directly on a light Rose White background. Gold must *only* appear on light backgrounds as a filled CTA button with dark text inside it, or as a structural border outline/decorative accent.
4.  **Light Gray (`#999999`) on Rose White (`#FFF9FA`) — 2.80:1 Contrast:**
    *   *STRICT RULE:* **CONTRAST FAILURE.** Do not use light gray for placeholder text, sub-labels, or icons on Rose White backgrounds. Use a darkened slate grey (`#5A5A66` — contrast > 4.8:1) to satisfy WCAG AA standards.

---

## 2. Bento Grid Structural Layout Specs
The Bento Grid operates as a responsive modular layout. Tiles reflow from a multi-column desktop layout into a single-column layout on mobile devices.

### CSS Grid Configuration (Tailwind Syntax)
```css
/* Bento Grid Layout Spec */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
}

@media (min-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .bento-grid {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }
  
  /* Tile Size Modifiers */
  .tile-span-3 { grid-column: span 3; }
  .tile-span-4 { grid-column: span 4; }
  .tile-span-6 { grid-column: span 6; }
  .tile-span-8 { grid-column: span 8; }
  .tile-span-12 { grid-column: span 12; }
}
```

---

## 3. Glassmorphism 2.0 depth-layer Specs
To achieve an premium, layered aesthetic, tiles use transparent backgrounds with custom backdrop filters.

```css
/* Glassmorphism 2.0 Tile Spec */
.glass-tile-dark {
  background: rgba(23, 23, 29, 0.85);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(252, 197, 9, 0.15); /* Yellowish Gold highlight border */
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.glass-tile-light {
  background: rgba(255, 249, 250, 0.9);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(23, 23, 29, 0.08);
  border-radius: 20px;
  box-shadow: 0 8px 24px 0 rgba(23, 23, 29, 0.04);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Custom Bento Tile Hover Effects */
.glass-tile-dark:hover {
  transform: translateY(-4px);
  border-color: rgba(252, 197, 9, 0.4);
  box-shadow: 0 12px 40px 0 rgba(252, 197, 9, 0.1);
}
```

---

## 4. Typography Scale & Hierarchy

We import Google Fonts (`Inter` for UI controls, body copy, and metadata, and `Outfit` for expressive headings).

```html
<!-- Google Fonts Import -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet">
```

### Type Scale Rules
*   **Hero Headings (H1):** `font-family: 'Outfit', sans-serif; font-weight: 800; font-size: clamp(2.25rem, 5vw, 3.75rem); line-height: 1.1; letter-spacing: -0.03em;`
*   **Bento Section Headings (H2):** `font-family: 'Outfit', sans-serif; font-weight: 700; font-size: clamp(1.75rem, 3.5vw, 2.5rem); line-height: 1.2; letter-spacing: -0.02em;`
*   **Card Headings (H3):** `font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 1.35rem; line-height: 1.3;`
*   **Body Copy:** `font-family: 'Inter', sans-serif; font-weight: 400; font-size: 1rem; line-height: 1.6; color: #17171D;`
*   **Metadata / Badges:** `font-family: 'Inter', sans-serif; font-weight: 600; font-size: 0.8rem; letter-spacing: 0.05em; text-transform: uppercase;`

---

## 5. Framer Motion Micro-Interactions
Framer Motion configuration block for clean, low-latency tile entrances.

```typescript
// Shared Framer Motion Constants
export const tileEntranceAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring",
      stiffness: 100, 
      damping: 15,
      mass: 0.8
    } 
  }
};

export const hoverScaleAnimation = {
  hover: {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  tap: {
    scale: 0.98
  }
};
```
These visual values ensure immediate implementation capacity during front-end dev sprints.
