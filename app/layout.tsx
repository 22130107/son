import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { LocalBusinessSchema, WebsiteSchema } from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Sơn Mặt Trời Việt NaSun – Vũng Tàu | Thi Công Sơn Nước Chuyên Nghiệp",
    template: "%s | Sơn Mặt Trời Việt NaSun – Vũng Tàu",
  },
  description:
    "Chuyên thi công sơn nước, trần thạch cao tại Vũng Tàu. Liên hệ để được tư vấn miễn phí.",
  keywords: [
    "sơn nước Vũng Tàu",
    "thi công sơn Vũng Tàu",
    "sơn Dulux Vũng Tàu",
    "sơn Jotun Vũng Tàu",
    "Mặt Trời Việt NaSun",
  ],
  authors: [{ name: "Sơn Mặt Trời Việt NaSun" }],
  creator: "Sơn Mặt Trời Việt NaSun",
  icons: {
    icon: "/uploads/logo.png",
    shortcut: "/uploads/logo.png",
    apple: "/uploads/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://example.com",
    siteName: "Sơn Mặt Trời Việt NaSun",
    title: "Sơn Mặt Trời Việt NaSun – Vũng Tàu",
    description:
      "Chuyên thi công sơn nước, trần thạch cao tại Vũng Tàu. Liên hệ để được tư vấn miễn phí.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sơn Mặt Trời Việt NaSun Vũng Tàu",
      },
    ],
  },
  alternates: {
    canonical: "https://example.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&family=Roboto:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <LocalBusinessSchema />
        <WebsiteSchema />
      </head>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
