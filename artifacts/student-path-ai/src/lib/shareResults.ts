import type { MatchResult, ProfileType } from "@/lib/store";

export interface SharePayload {
  topMajor: string;
  confidence: string;
  profileLabel: string;
}

export function buildShareText(payload: SharePayload): string {
  return `🎓 I just discovered my ideal university major on NorthVoy!\n\n` +
    `📚 Top Match: ${payload.topMajor}\n` +
    `💪 Confidence: ${payload.confidence}\n` +
    `🧠 Student Profile: ${payload.profileLabel}\n\n` +
    `Find your university path at northvoy.com`;
}

/**
 * Attempts Web Share API first, falls back to clipboard copy.
 * Returns "shared", "copied", or "failed".
 */
export async function shareResults(
  results: MatchResult[],
  profile: ProfileType
): Promise<"shared" | "copied" | "failed"> {
  if (!results.length) return "failed";

  const top = results[0];
  const payload: SharePayload = {
    topMajor: top.major,
    confidence: top.confidence,
    profileLabel: profile.label,
  };

  const text = buildShareText(payload);

  // Try Web Share API (works on mobile + some desktops)
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({
        title: "My NorthVoy Results",
        text,
        url: "https://northvoy.com",
      });
      return "shared";
    } catch {
      // User cancelled or API failed — fall through to clipboard
    }
  }

  // Clipboard fallback
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return "copied";
    } catch {
      return "failed";
    }
  }

  return "failed";
}
