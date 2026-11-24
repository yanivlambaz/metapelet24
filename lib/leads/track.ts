"use client";

type LeadTrackProps = {
  formType?: string;
  formId?: string;
  source?: string;
};

/** Push conversion events to GTM dataLayer. No PII. */
export function trackLeadEvent(event: string, props: LeadTrackProps = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    form_type: props.formType,
    form_id: props.formId,
    lead_source: props.source,
  });
}
