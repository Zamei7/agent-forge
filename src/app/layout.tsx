import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AgentForge — Decentralized AI Agent Marketplace',
  description: 'Create, share, and monetize AI agents powered by Xiaomi MiMo V2.5',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
