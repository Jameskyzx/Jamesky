import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Blog",
  description: "A modern blog built with Next.js and MDX",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <header className="border-b border-[var(--border)] py-6">
          <div className="max-w-3xl mx-auto px-6">
            <a href="/" className="text-2xl font-bold hover:underline">
              My Blog
            </a>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-6 py-12">
          {children}
        </main>
        <footer className="border-t border-[var(--border)] py-8 mt-12">
          <div className="max-w-3xl mx-auto px-6 text-center text-[var(--text-secondary)]">
            © 2024 My Blog. Built with Next.js
          </div>
        </footer>
      </body>
    </html>
  );
}