import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${outfit.className} min-h-screen flex justify-center bg-gray-100`}
      >
        <div className="w-full max-w-md bg-white shadow-2xl min-h-screen relative">
          {children}
        </div>
      </body>
    </html>
  );
}
