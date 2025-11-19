//  "createdAt": "2025-11-19T15:12:35.223Z",

export function getFormattedDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Returns relative time (e.g., "2 hours ago") from the given date string
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  // Find the largest interval that fits into the difference
  for (const interval in intervals) {
    const intervalSeconds = intervals[interval];
    // Check if the difference is at least one unit of this interval
    if (diffInSeconds >= intervalSeconds) {
      const count = Math.floor(diffInSeconds / intervalSeconds);
      return `${count} ${interval}${count !== 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}
