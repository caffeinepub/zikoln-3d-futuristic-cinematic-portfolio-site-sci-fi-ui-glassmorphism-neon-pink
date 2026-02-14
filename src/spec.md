# Specification

## Summary
**Goal:** Restore site-wide click/tap interactivity on the published portfolio site by removing any global pointer-event blockers and fixing stacking/overlay issues.

**Planned changes:**
- Investigate and fix global overlays, stacking-context/z-index, and `pointer-events` CSS rules that prevent clicks from reaching buttons, links, cards, and inputs.
- Ensure all decorative full-screen/absolute/fixed visual layers render normally but do not capture pointer events, while keeping interactive content above them.
- Add a minimal development-only click/debug aid to quickly verify click handling works, and ensure it is disabled/absent in production builds.

**User-visible outcome:** Users can click HERO CTA buttons, open/close portfolio project modals, focus/type in contact inputs, and use WhatsApp/social links normally, with no decorative layer blocking interactions.
