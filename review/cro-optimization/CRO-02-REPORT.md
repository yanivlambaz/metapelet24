# WP-CRO-02 — Mobile-First Floating Contact System

**Branch:** `feature/cro-lead-optimization`  
**Local preview:** http://localhost:3215  
**Production deploy:** NOT done  

---

## 1. Files modified (CRO-02 delta + CRO-01)

### New
- `components/brand/CallbackProvider.tsx`
- `components/brand/ContextualCallback.tsx`
- `lib/leads/track.ts`
- `scripts/verify-cro-leads.mjs`
- `scripts/capture-cro-optimization.mjs`
- `scripts/capture-cro-02-mobile.mjs`

### Updated
- `components/brand/actions.tsx` — 50% lead CTA sticky bar + desktop WA float
- `components/brand/CallbackProvider.tsx` — mobile sheet, keyboard inset, `isOpen`
- `components/CookieConsent.tsx` — mobile banner moved to **top** (clears form + sticky)
- `app/globals.css` — `--nc-mobile-cta-h`, callback-open overflow
- `components/brand/BrandHome.tsx` — tighter mobile hero form
- `components/brand/BrandLanding.tsx`, `BrandLocal.tsx`, `SecondFamily.tsx`, `SecondFamilyForm.tsx`
- `components/brand/lead-forms.tsx`, `ui.tsx`, `content.ts`
- `lib/leads/use-lead-forms.ts`
- `app/[city]/page.tsx`, `app/services/[service]/page.tsx`

---

## 2. Floating contact bar

Mobile (`lg:hidden`), fixed bottom, safe-area aware:

| השאירו פרטים (~50%) | התקשרו | WhatsApp |
|---|---|---|
| Opens callback modal | `tel:` correct per page | `wa.me/972533671855` |

- Hidden while callback modal is open (no overlap).
- Publishes `--nc-mobile-cta-h` for layout coordination.
- Touch targets ≥44px where practical.

---

## 3. Mobile lead form (modal)

- Heading: השאירו פרטים ונחזור אליכם  
- Copy: רכז שירות אנושי יחזור אליכם…  
- Button: **חזרו אליי**  
- Fields: name + phone only  
- `visualViewport` keyboard inset; scrollable panel; Escape / backdrop close  
- Error keeps modal open; success closes after short delay  

---

## 4. Phone routing

- Main pages: `tel:0723939494`  
- Second Family: `tel:0737579024` via `MobileCallBar` props  

---

## 5. WhatsApp

- Destination unchanged: `972533671855`  
- Prefill messages preserved; SF uses `SECOND_FAMILY_WHATSAPP`  
- No duplicate mobile WA bubble  
- Desktop: single discreet green float (bottom-left), no phone bubble  

---

## 6. Cookie banner overlap — resolution

**Problem:** bottom cookie card covered mobile hero submit + competed with sticky bar.

**Fix:** On viewports below `lg`, cookie banner is positioned at the **top** of the viewport (`top: max(0.75rem, safe-area)`). Desktop (`lg+`) keeps bottom placement. Consent Mode v2, choices, and settings dialog (`z-[120]`) unchanged. Callback modal uses `z-[110]` above cookie (`z-[80]`) and sticky (`z-50`).

---

## 7. Mobile keyboard

Modal panel uses `max-h-[min(88dvh,640px)]`, internal scroll, and `--nc-keyboard-inset` from `visualViewport` so the submit control stays reachable.

---

## 8. Desktop

- Hero callback forms retained  
- Sticky bar hidden (`lg:hidden`)  
- Discreet WhatsApp float only  

---

## 9. Analytics

`callback_modal_open`, `lead_form_view|start|submit|success|error`, `phone_click`, `whatsapp_click` — no PII.  
**GTM:** map Ads conversion to `lead_form_success` only.

---

## 10. CRM

Unchanged: `submitLead → /api/leads → GHL_LEAD_WEBHOOK`.

---

## 11. Build / tests

- `tsc --noEmit` — pass  
- eslint (brand/leads/cookie paths) — pass  
- `npm run build` — pass  
- `node scripts/verify-cro-leads.mjs` — 10 mocked checks pass  

---

## 12. Screenshots

`review/cro-optimization/cro-02/` (local only; do not treat as production assets):

- `home-cookie-top-{width}.png`
- `home-bar-{width}.png`
- `home-modal-{width}.png`
- `second-family-bar-390.png`

Widths: 320, 360, 375, 390, 412, 430, 768.

---

## 13–14. Git / push

- **Commit:** `0857270f8669fa027fd31a39549c6bdcd45ab671`
- **Branch pushed:** `feature/cro-lead-optimization` → `origin`
- Not merged to `main`; not deployed to production.

---

## 15. Remaining issues

- Full-site `npm run lint` scans `.tmp-*` Chrome profiles (noise); scoped lint used for CRO.  
- Cookie at top briefly covers license strip until dismissed — intentional tradeoff vs covering the form.  
- Conversion lift still requires post-release measurement.  

---

## 16. Production release recommendation

1. Founder QA on real iPhone Safari + Android Chrome.  
2. Confirm GTM `lead_form_success` → Ads.  
3. Merge PR → deploy `metapelet24-4iee` only after approval.  
4. Do not change webhook secrets / DNS.  
