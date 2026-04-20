import type { ApplicationDeadline } from "@/contexts/AccountContext";

// New localStorage key — does NOT exist in store.ts (verified)
const SCHEDULED_KEY = "northvoy_notif_scheduled";

export function getNotificationPermission(): NotificationPermission {
  if (typeof Notification === "undefined") return "default";
  return Notification.permission;
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof Notification === "undefined") return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;
  const result = await Notification.requestPermission();
  return result === "granted";
}

/**
 * Schedules setTimeout-based notifications for each deadline.
 * Fires at T-7days and T-1day.
 * Stores scheduled deadline IDs in localStorage to avoid duplicates within a session.
 * Returns timeout handles for cleanup.
 */
export function scheduleDeadlineNotifications(
  deadlines: ApplicationDeadline[],
  labels: { title: string; sevenDays: (uni: string) => string; oneDay: (uni: string) => string }
): number[] {
  if (typeof Notification === "undefined" || Notification.permission !== "granted") {
    return [];
  }

  const handles: number[] = [];
  const now = Date.now();

  const scheduled: string[] = JSON.parse(
    localStorage.getItem(SCHEDULED_KEY) ?? "[]"
  );

  for (const deadline of deadlines) {
    if (scheduled.includes(deadline.id)) continue;

    const deadlineMs = new Date(deadline.deadline).getTime();
    const label = `${deadline.university} — ${deadline.program}`;

    // T-7 days
    const sevenDaysMs = deadlineMs - 7 * 24 * 60 * 60 * 1000;
    if (sevenDaysMs > now) {
      const handle = window.setTimeout(() => {
        new Notification(labels.title, { body: labels.sevenDays(label) });
      }, sevenDaysMs - now) as unknown as number;
      handles.push(handle);
    }

    // T-1 day
    const oneDayMs = deadlineMs - 24 * 60 * 60 * 1000;
    if (oneDayMs > now) {
      const handle = window.setTimeout(() => {
        new Notification(labels.title, { body: labels.oneDay(label) });
      }, oneDayMs - now) as unknown as number;
      handles.push(handle);
    }

    scheduled.push(deadline.id);
  }

  localStorage.setItem(SCHEDULED_KEY, JSON.stringify(scheduled));
  return handles;
}

export function cancelAllNotifications(handles: number[]): void {
  handles.forEach(h => window.clearTimeout(h));
}
