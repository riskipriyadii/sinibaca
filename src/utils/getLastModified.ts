import { execSync } from "child_process";
import { join } from "path";

/**
 * Get the last modified date of a file using git log.
 * Falls back to the provided pubDate if git returns empty.
 */
export function getLastModified(filePath: string, pubDate: Date): Date {
  try {
    // Get the absolute path to the file
    const absolutePath = join(process.cwd(), filePath);
    
    // Run git log to get the last commit date for this file
    const output = execSync(`git log -1 --format="%ai" -- "${absolutePath}"`, {
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();

    if (output) {
      const gitDate = new Date(output);
      if (!isNaN(gitDate.getTime())) {
        return gitDate;
      }
    }
  } catch (error) {
    // Git command failed (not a git repo, file not tracked, etc.)
    // Fall through to pubDate fallback
  }

  // Fallback to pubDate
  return pubDate;
}

/**
 * Format a date in Indonesian locale (D Mon YYYY)
 */
export function formatDateIndonesian(date: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}