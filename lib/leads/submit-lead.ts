"use client";

export type LeadSubmission = {
  name: string;
  phone: string;
  city?: string;
  email?: string;
  message?: string;
  formType: string;
  page?: string;
};

export type SubmitLeadResult = {
  ok: true;
};

export async function submitLead(lead: LeadSubmission): Promise<SubmitLeadResult> {
  const payload: LeadSubmission = {
    ...lead,
    page:
      lead.page ||
      (typeof window !== "undefined" ? window.location.href : ""),
  };

  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => null)) as {
    ok?: boolean;
    error?: string;
  } | null;

  if (!response.ok || !data?.ok) {
    throw new Error(data?.error || "שליחת הפרטים נכשלה. נסו שוב בעוד רגע.");
  }

  return { ok: true };
}
