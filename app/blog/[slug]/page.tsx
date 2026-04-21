import Link from "next/link";
import { notFound } from "next/navigation";
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

async function getAllPosts(): Promise<BlogPost[]> {
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

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export default async function BlogDetail({ params }: PageProps) {
  const { slug } = await params;
  const posts = await getAllPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="page-container">
      <Link href="/blog" className="back-link mb-8">
        ← Back to Blog
      </Link>

      <article className="blog-post">
        <header className="blog-post-header">
          <h1 className="text-h1 font-display mb-4">{post.title}</h1>
          <div className="blog-post-meta">
            <span className="text-small text-tertiary">{post.date}</span>
            <span className="text-tertiary">•</span>
            <span className="text-small text-tertiary">{post.readTime}</span>
          </div>
        </header>

        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <span key={tag} className="badge">{tag}</span>
          ))}
        </div>

        <div className="blog-post-content">
          <p className="text-body-lg text-secondary leading-relaxed">
            {post.content}
          </p>
        </div>
      </article>
    </div>
  );
}