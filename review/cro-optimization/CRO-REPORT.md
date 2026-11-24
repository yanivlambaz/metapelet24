# WP-CRO-01 — Conversion Rate Optimization Report

**Branch:** `feature/cro-lead-optimization`  
**Base:** `main` @ `b856c9f`  
**Local preview:** http://localhost:3215  
**Production deploy:** NOT done (awaiting Founder approval)  
**Date:** 2026-03-24

---

## 1. CRO audit findings (verified)

| # | Finding | Type |
|---|---|---|
| 1 | Homepage Hero pushed phone/WhatsApp; name+phone form only at page bottom (3-step) | Verified |
| 2 | Mobile sticky was call-primary (+ WhatsApp); no one-tap callback | Verified |
| 3 | StepLeadForm required care type + timing before contact | Verified |
| 4 | Success path auto-opened WhatsApp (interruptive) | Verified |
| 5 | Timed popup (~30s historically; delayed to 45s in infra) competed with intent | Verified |
| 6 | City/service pages: call-first Hero, multi-step close form | Verified |
| 7 | Weak/incomplete lead funnel events (submit vs success) | Verified |
| 8 | Human section felt generic; process copy framed only around calling | Verified |
| 9 | Mid-page had little conversion after persuasion | Verified |
| 10 | Cookie banner can cover mobile form submit on first paint | Verified (still present) |

Hypotheses needing analytics/A-B (not claimed as proven): popup timing harm, WhatsApp vs callback preference, form title variants, sticky bar order.

---

## 2. Top 10 conversion barriers (by expected impact)

1. **No above-the-fold callback form** on homepage (desktop + mobile)
2. **Three-step form** before phone capture
3. **Call-only mobile sticky** for visitors who cannot/prefer not to call
4. **Form buried** after long scroll
5. **Auto WhatsApp** after submit interrupting confirmation
6. **Aggressive timed popup** vs user-initiated capture
7. **Generic “call us” framing** vs “leave details, we call you”
8. **Weak mid-funnel CTAs** after services / trust / process
9. **Incomplete success tracking** (risk of Ads firing on click)
10. **Cookie overlay** obscuring first mobile conversion attempt

---

## 3. Prioritized fixes implemented

1. Compact **name + phone** `LeadCaptureCard` / `QuickLeadForm` in Heroes
2. **CallbackProvider** modal (user-initiated) + contextual mid-page CTAs
3. **Mobile sticky:** השאירו פרטים (primary) + התקשרו + WhatsApp
4. Removed timed `CallbackPopup` from home / lp / local frames
5. Disabled auto-WhatsApp on success (optional link only)
6. Human copy: “מאחורי כל פנייה עומד אדם שמקשיב” + post-submit explanation
7. Service/city-specific form headlines; SF warmer flow + `073-757-9024`
8. dataLayer events: view/start/submit/success/error, modal open, phone/WA clicks
9. Process step reframed to include leaving details
10. Mocked lead verification script (no production CRM hits)

---

## 4. Exact files changed

**New**
- `components/brand/CallbackProvider.tsx`
- `components/brand/ContextualCallback.tsx`
- `lib/leads/track.ts`
- `scripts/verify-cro-leads.mjs`
- `scripts/capture-cro-optimization.mjs`
- `review/cro-optimization/*` (screenshots + this report — do not commit temps unless asked)

**Updated**
- `components/brand/BrandHome.tsx`
- `components/brand/BrandLanding.tsx`
- `components/brand/BrandLocal.tsx`
- `components/brand/SecondFamily.tsx`
- `components/brand/SecondFamilyForm.tsx`
- `components/brand/actions.tsx`
- `components/brand/lead-forms.tsx`
- `components/brand/ui.tsx`
- `components/brand/content.ts` (PROCESS copy)
- `lib/leads/use-lead-forms.ts`
- `app/[city]/page.tsx`
- `app/services/[service]/page.tsx`

---

## 5–6. Desktop / Mobile Hero before → after

Screenshots in `review/cro-optimization/`:

| | Before (prod) | After (local) |
|---|---|---|
| Home desktop | `before-home-desktop-1440.png` | `after-home-desktop-1440.png` |
| Home mobile | `before-home-mobile-390.png` | `after-home-mobile-390.png` |

**Desktop after:** copy + call on the right; name/phone form on the left above the fold.  
**Mobile after:** headline → form within first screen; sticky “השאירו פרטים / התקשרו / WA”.

---

## 7. Lead form simplification

- Required: **שם מלא**, **מספר טלפון** (`type="tel"`, autocomplete)
- No mandatory service / city / medical / urgency
- Fields retained on error; success only after `/api/leads` ok
- `StepLeadForm` retained in codebase but unused on primary surfaces

---

## 8. Mobile sticky CTA

Primary opens callback modal (2 fields). Secondary call. WhatsApp icon. One fixed bar (`lg:hidden`). Footer already has `pb-28` clearance.

---

## 9. Additional conversion points

Home: after services, after process, after license/trust, final 2-field form.  
LP: process + availability contextual bands.  
City/service: hero form + story contextual CTA + final form.

---

## 10. Human presence

Copy improved; **no invented names/testimonials/stats**.  
**Founder ask:** provide approved coordinator/team workplace photos to replace generic stock if desired.

---

## 11. Service-page conversion

Per-slug form titles (hospital / night / post-surgery / dementia / elderly) + `careType` attribution into CRM message.

---

## 12. Second Family

- Hero + final: name/phone only; CTA “השאירו פרטים על משפחה שנייה”
- Phone **073-757-9024** and WA destination preserved
- Video / Play overlay / homepage promo placement unchanged
- Mobile sticky uses SF CRM intro via modal

---

## 13. CRM integration verification

Unchanged path: form → `submitLead()` → `POST /api/leads` → `GHL_LEAD_WEBHOOK`.  
Payload still includes name, phone, message, formType, page URL, optional city/careType in message.  
`scripts/verify-cro-leads.mjs`: **10 mocked checks passed** (no live GHL).

---

## 14. GTM / attribution

Container **GTM-KNNXBD26** preserved.  
App pushes (no PII): `lead_form_view|start|submit|success|error`, `callback_modal_open`, `phone_click`, `whatsapp_click`.  
**GTM dependency:** map `lead_form_success` to Ads conversion (not submit/click). UTM/GCLID capture remains whatever existing webhook/API already forwards — not newly claimed end-to-end here.

---

## 15. Testing results

- TypeScript: pass  
- `npm run build`: pass (33 routes)  
- `node scripts/verify-cro-leads.mjs`: pass  
- Visual: Playwright captures for home/city/service/lp/SF (desktop 1440 + mobile 390)  
- Manual a11y snapshot on local home: hero form + contextual CTAs present

---

## 16. Build results

Next.js 16.2.6 production build compiled successfully.

---

## 17. Screenshots

All under `review/cro-optimization/` (`before-*` from production, `after-*` from localhost:3215).

---

## 18. Local preview URL

**http://localhost:3215**  
(`npm run build` then `npm start -- -p 3215`)

---

## 19. Unresolved risks

- Cookie consent still covers mobile form submit on first visit
- Duplicate hero forms (mobile + desktop DOM) — intentional; only one visible per breakpoint
- Timed popup removed from main surfaces; `CallbackPopup` code remains unused
- Conversion lift not measurable until post-release analytics
- Authentic staff photos still needed for stronger human proof

---

## 20. Proposed A/B plan after release

1. Hero form CTA copy: “חזרו אליי עם פרטים על מטפל/ת” vs “השאירו פרטים ונחזור אליכם”
2. Sticky primary: details-first (current) vs call-first
3. Contextual band density: 3 mid-page vs 1
4. SF city field optional re-intro vs name/phone only
5. Success: confirmation-only vs confirmation + WA soft prompt

Primary KPI: **qualified leads / session** (`lead_form_success`). Secondary: phone_click, whatsapp_click, form_start→success rate.
