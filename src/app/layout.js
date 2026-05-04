// src/app/layout.js
import { Outfit } from "next/font/google"; // Use Outfit font[cite: 1]
import "./globals.css"; // Global styles[cite: 3]
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BankProvider } from "@/context/BankContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "Payoo | Secure Banking",
  icons: { icon: "/logo.png" }, // Your logo as favicon
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${outfit.variable} font-sans min-h-screen flex justify-center bg-[#F4F5F7]`}
      >
        <div className="w-full max-w-md bg-white shadow-2xl min-h-screen relative flex flex-col">
          <BankProvider>
            {/* THIS LINE IS CRUCIAL: it renders your page content */}
            {children}
            <ToastContainer position="top-center" autoClose={2000} />
          </BankProvider>
        </div>
      </body>
    </html>
  );
}
