const SUBMIT_URL = import.meta.env.VITE_SUBMIT_URL;

/**
 * Sends the anonymised session payload to a Google Apps Script / Firebase
 * endpoint when VITE_SUBMIT_URL is configured. Otherwise the result stays
 * local and the participant can download the JSON manually.
 */
export async function submitSession(payload) {
  if (!SUBMIT_URL) {
    return { ok: true, local: true };
  }

  try {
    await fetch(SUBMIT_URL, {
      method: "POST",
      // text/plain avoids a CORS preflight that Apps Script cannot answer.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    return { ok: true, local: false };
  } catch {
    return { ok: false, local: false };
  }
}
