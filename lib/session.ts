const encoder = new TextEncoder();

// HMAC of a fixed payload with SESSION_SECRET; uses Web Crypto so it also
// runs in the edge middleware.
export async function sessionToken() {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(process.env.SESSION_SECRET!),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode("lume-admin"));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export const SESSION_COOKIE = "lume_session";
