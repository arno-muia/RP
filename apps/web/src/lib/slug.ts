export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function eventSlug(title: string, id: string): string {
  const base = slugify(title);
  return base ? `${base}-${id.slice(0, 8)}` : id.slice(0, 8);
}
