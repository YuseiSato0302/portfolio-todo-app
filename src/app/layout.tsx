// app/layout.tsx

import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Todo List App',
  description: 'A portfolio project using Next.js App Router and Tailwind CSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        {children}
      </body>
    </html>
  );
}
