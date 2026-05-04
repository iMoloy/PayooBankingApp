// app/layout.js
import { Outfit } from "next/font/google"; // Importing the Outfit font[cite: 1, 6]
import "./globals.css"; //
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BankProvider } from "@/context/BankContext";

// Font configuration[cite: 6]
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "Payoo | Secure Banking",
  description: "Next-gen banking application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        {/* Font Awesome CDN from */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
        />
      </head>
      <body
        className={`${outfit.variable} font-sans min-h-screen flex justify-center bg-[#F4F5F7]`}
      >
        {/* Main mobile wrapper[cite: 6] */}
        <div className="w-full max-w-md bg-white shadow-2xl min-h-screen relative flex flex-col overflow-hidden">
          <BankProvider>
            {children}
            <ToastContainer position="top-center" autoClose={2000} />
          </BankProvider>
        </div>
      </body>
    </html>
  );
}
