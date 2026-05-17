import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fredoka } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kania Ardhani Putri | IT Desktop Support & UI/UX Designer Portfolio",
  description: "Interactive playground portfolio of Kania Ardhani Putri - IT Desktop Support Executive and UI/UX Designer. Explore deployed IT assets, test system workflows, and view sleek Figma UI/UX prototypes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${fredoka.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#F4F9FC] text-[#2C3E50]">
        {children}
      </body>
    </html>
  );
}
