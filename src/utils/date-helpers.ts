/**
 * Get the latest date from a blog post (either updatedDate or pubDate)
 * @param post - Blog post object with data.updatedDate and data.pubDate
 * @returns The most recent date
 */
export function getLatestDate(post: { data: { updatedDate?: Date; pubDate: Date } }): Date {
  return post.data.updatedDate || post.data.pubDate;
}

/**
 * Sort blog posts by latest date (updatedDate or pubDate) in descending order
 * @param posts - Array of blog posts
 * @returns Sorted array with newest posts first
 */
export function sortByLatestDate<T extends { data: { updatedDate?: Date; pubDate: Date } }>(posts: T[]): T[] {
  return posts.sort((a, b) => {
    const dateA = getLatestDate(a);
    const dateB = getLatestDate(b);
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });
}