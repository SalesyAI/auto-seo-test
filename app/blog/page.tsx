import Link from "next/link";
import { blogContent } from "@/src/lib/content";
import { getAllPublishedArticles } from "@/src/lib/integrations/google-sheets";
import type { BlogPost, PublishedArticle } from "@/src/types";

function mapPublishedToBlogPost(published: PublishedArticle): BlogPost {
  return {
    id: published.slug,
    slug: published.slug,
    title: published.title,
    excerpt: published.excerpt,
    content: published.content,
    date: published.publishedAt,
    readTime: published.readTime,
    tags: [published.tag],
    featured: true,
  };
}

async function getBlogPosts(): Promise<BlogPost[]> {
  if (!process.env.GOOGLE_SHEET_ID) {
    return blogContent.items;
  }

  try {
    const published = await getAllPublishedArticles();
    if (published.length === 0) {
      return blogContent.items;
    }
    return published.map(mapPublishedToBlogPost);
  } catch {
    return blogContent.items;
  }
}

export const revalidate = 60;

export default async function Blog() {
  const posts = await getBlogPosts();

  return (
    <div className="page-container">
      <header className="page-header mb-12">
        <h1 className="text-h1 font-display mb-4">{blogContent.title}</h1>
        <p className="text-body-lg text-secondary">{blogContent.subtitle}</p>
      </header>

      <div className="blog-list">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="blog-card"
          >
            <div className="blog-card-header">
              <h2 className="text-h3">{post.title}</h2>
              <span className="text-small text-tertiary">{post.readTime}</span>
            </div>
            <p className="text-body text-secondary mt-3 mb-4">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="badge">{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}