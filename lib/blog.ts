import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

const postsDirectory = path.join(process.cwd(), "app/blog/posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
}

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    slug: realSlug,
    meta: data,
    contentHtml,
  };
}

export async function getAllPosts() {
  const slugs = getPostSlugs();
  return Promise.all(
    slugs.map((slug) => getPostBySlug(slug.replace(/\.md$/, "")))
  );
}
