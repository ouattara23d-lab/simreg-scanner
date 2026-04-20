# Design Brief

## Purpose & Context
MTN Côte d'Ivoire document scanner + SimReg portal integration. Identity document capture (CNI, passeport, permis, carte de séjour) with OCR extraction. Professional, task-focused interface serving government registration workflows in French.

## Tone & Aesthetic
Professional minimalism. Bold primary (deep charcoal) with MTN yellow accents used sparingly on critical actions. No decoration — clarity and scannability drive every choice. Modern, geometric forms. Confidence through restraint.

## Color Palette

| Token | OKLCH | Purpose |
|-------|-------|---------|
| Primary | 0.25 0.02 260 | Deep charcoal, primary UI text & backgrounds |
| Accent | 0.84 0.23 80 | MTN yellow, buttons, badges, active states |
| Secondary | 0.92 0.01 260 | Light grey, secondary backgrounds |
| Success | 0.60 0.15 120 | Verification, validation states |
| Destructive | 0.55 0.18 25 | Errors, warnings |
| Border | 0.90 0.01 260 | Subtle lines, input borders |
| Foreground | 0.25 0.02 260 | Primary text |
| Background | 0.98 0.01 260 | Main surface (light mode) |

**Dark Mode:** Inverted with deep charcoal background (0.13 0.01 260), light text (0.93 0.01 260). Accent remains 0.84 0.23 80 for consistency.

## Typography
- **Display**: Bricolage Grotesque (geometric, modern, professional)
- **Body**: General Sans (excellent readability, neutral)
- **Mono**: JetBrains Mono (data display, form values)
- **Scale**: 12px base, 14px body, 16px headers, 20px section titles

## Shape Language
- Cards & containers: 12px radius (friendly, modern)
- Buttons: 6px radius (geometric, intentional)
- Data tables: 0 radius (utilitarian, scannable)
- Inputs: 6px radius

## Structural Zones

| Zone | Treatment | Purpose |
|------|-----------|---------|
| Header | bg-primary, text-primary-foreground, border-b border-border | MTN branding, document type selector, status indicator |
| Left Panel (Extraction) | bg-secondary, card-based layout, rounded-lg | Camera capture, form fields, extracted data display, edit controls |
| Right Panel (SimReg) | bg-background, iframe container | Embedded SimReg portal, minimal chrome |
| Footer | bg-muted/20, border-t, text-muted-foreground | Help text, status messages |
| Card Components | bg-card, border-border, shadow-sm, rounded-lg | Individual data fields, extraction results |

## Component Patterns
- **Buttons**: Accent bg on primary CTA, secondary border on secondary actions. 8px px, 6px py.
- **Inputs**: border-input, focus:ring-2 focus:ring-accent. Always labeled above.
- **Form Sections**: Card-based, each data point (nom, prénom, date) in separate row with label + value + edit.
- **Badges**: Success (green), warning (yellow), error (red) for data validation states.
- **Status Indicators**: MTN yellow dot for "ready to submit", grey for "incomplete", green for "validated".

## Responsive Design
- Mobile-first: Single column stack on `sm` (camera panel, then SimReg below).
- Tablet+: Two-column layout, left panel 40%, right panel 60%, fixed divider.
- Large screens: Full-width panels with sticky header.

## Motion & Interaction
- Smooth transitions: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) on interactive elements.
- Focus states: ring-2 ring-accent (yellow outline).
- Hover: shadow-md on cards, slight scale on buttons.
- No bounce, no spin. Functional, business-appropriate motion only.

## Signature Detail
MTN yellow accent used as a "verification spark" — appears on validated fields and the final "prêt à transférer" button. Creates a visual reward loop without overwhelming the interface.

## Constraints
- No gradients (clean, professional).
- No decorative illustrations (focus on function).
- No heavy shadows (clarity first).
- French interface throughout (labels, placeholders, validation messages).
- Accessibility: AA+ contrast in all states, clear focus indicators, semantic HTML.

## Dark Mode Override
Charcoal background inverts to near-black (0.13), all text inverts to near-white (0.93). Accent yellow remains vibrant for consistency and brand presence.
