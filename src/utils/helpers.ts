export const formatDate = (date: Date | string | null): string => {
  if (!date) return "Never";
  const value = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(value);
};

const toStartOfDay = (value: Date): Date => {
  const start = new Date(value);
  start.setHours(0, 0, 0, 0);
  return start;
};

export const calculateStreak = (dates: string[]): number => {
  if (!dates.length) return 0;
  const uniqueDates = Array.from(new Set(dates));
  const sorted = uniqueDates
    .map((date) => toStartOfDay(new Date(date)))
    .sort((a, b) => b.getTime() - a.getTime());

  let streak = 0;
  let comparisonDate = toStartOfDay(new Date());

  for (const date of sorted) {
    if (date.getTime() === comparisonDate.getTime()) {
      streak += 1;
      comparisonDate = toStartOfDay(new Date(comparisonDate.getTime() - 24 * 60 * 60 * 1000));
    } else if (date.getTime() === comparisonDate.getTime() - 24 * 60 * 60 * 1000) {
      streak += 1;
      comparisonDate = toStartOfDay(new Date(comparisonDate.getTime() - 24 * 60 * 60 * 1000));
    } else if (date.getTime() < comparisonDate.getTime() - 24 * 60 * 60 * 1000) {
      break;
    }
  }

  return streak;
};

export const getGoalLabel = (frequency: string): string => {
  switch (frequency) {
    case "daily":
      return "Every day";
    case "weekly":
      return "Every week";
    case "monthly":
      return "Every month";
    default:
      return "Custom";
  }
};
