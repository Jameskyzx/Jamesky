import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllSlugs } from "@/lib/posts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">文章未找到</h1>
        <a href="/" className="text-[var(--accent)] hover:underline">返回首页</a>
      </div>
    );
  }

  return (
    <article>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <time className="text-[var(--text-secondary)]">{post.date}</time>
      </header>
      <div className="prose prose-invert">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}