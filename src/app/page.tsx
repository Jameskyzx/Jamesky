import Link from "next/link";
import { getSortedPosts } from "@/lib/posts";

export default function Home() {
  const posts = getSortedPosts();

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">最新文章</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border border-[var(--border)] rounded-lg p-6 hover:border-[var(--accent)] transition-colors">
            <Link href={`/posts/${post.slug}`}>
              <h2 className="text-xl font-semibold mb-2 hover:text-[var(--accent)]">
                {post.title}
              </h2>
            </Link>
            <p className="text-[var(--text-secondary)] mb-3">{post.description}</p>
            <time className="text-sm text-[var(--text-secondary)]">{post.date}</time>
          </article>
        ))}
      </div>
      {posts.length === 0 && (
        <p className="text-[var(--text-secondary)]">暂无文章，去 src/content/posts/ 目录下添加 .mdx 文件吧。</p>
      )}
    </div>
  );
}