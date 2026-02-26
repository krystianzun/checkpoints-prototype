import { StudioCount, BodyTag } from "./types";

// Studio descriptors for different contexts
const STUDIO_DESCRIPTORS: Record<string, { action: string; vibe: string }> = {
  box: { action: "power through your legs", vibe: "explosive punches" },
  combat: { action: "strike with precision", vibe: "powerful combinations" },
  hiit: { action: "rapid fire reps", vibe: "high-intensity bursts" },
  sculpt: { action: "controlled movements", vibe: "strength-building moves" },
  dance: { action: "grooving", vibe: "dynamic flow" },
  zumba: { action: "bringing the party energy", vibe: "rhythmic movement" },
  slam: { action: "explosive power", vibe: "full-body slams" },
};

/**
 * Generates a chapter summary based on top studios and body tag
 * Backend would call this with actual studio counts from user's workout history
 */
export function generateChapterSummary(
  topStudios: StudioCount[],
  bodyTag: BodyTag,
  isFirstChapter: boolean = false
): string {
  if (topStudios.length === 0) {
    return "You've been putting in the work in FitXR — every session counts.";
  }

  const bodyTagLabel = bodyTag.replace("_", " ");
  const [primary, secondary] = topStudios;

  if (isFirstChapter) {
    // New user variant
    const studioNames = topStudios
      .slice(0, 3)
      .map((s) => s.studio.charAt(0).toUpperCase() + s.studio.slice(1))
      .join(", ");
    return `Your first chapter in FitXR focused on building a foundation — mixing ${studioNames} to find what feels right.`;
  }

  // Power user variant - mention top 2 studios
  const primaryStudio =
    primary.studio.charAt(0).toUpperCase() + primary.studio.slice(1);
  const primaryDesc = STUDIO_DESCRIPTORS[primary.studio]?.action || "working hard";

  if (!secondary) {
    return `Your last few sessions in FitXR were all about your ${bodyTagLabel} — ${primaryDesc} in ${primaryStudio}.`;
  }

  const secondaryStudio =
    secondary.studio.charAt(0).toUpperCase() + secondary.studio.slice(1);
  const secondaryDesc =
    STUDIO_DESCRIPTORS[secondary.studio]?.vibe || "challenging workouts";

  return `Your last few sessions in FitXR were all about your ${bodyTagLabel} — ${primaryDesc} in ${primaryStudio} and ${secondaryDesc} in ${secondaryStudio}.`;
}

/**
 * Example usage for backend implementation:
 * 
 * const topStudios = [
 *   { studio: "box", count: 6 },
 *   { studio: "hiit", count: 5 }
 * ];
 * const summary = generateChapterSummary(topStudios, "lower_body", false);
 * // Returns: "Your last few sessions in FitXR were all about your lower body — 
 * //           power through your legs in Box and high-intensity bursts in HIIT."
 */
