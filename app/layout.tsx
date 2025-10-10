import type { Metadata } from "next";
import "./globals.css";
import { montserrat_global as montserrat } from "@/constants";
import Footer from "@/components/footer";
import HeaderSelector from "@/components/headers/HeaderSelector";

export const metadata: Metadata = {
  title: "Fu-Stamps",
  description: "Stamp your cards online!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} antialiased`}
      >
        <header className='fixed top-0 left-0 w-[100vw] shadow z-50'>
          <HeaderSelector />
        </header>
        <div className='pt-20 bg-lightyellow'>
        {children}
        </div>

        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
