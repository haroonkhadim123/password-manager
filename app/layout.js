
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Password-Manager | PassOP",
  description: "A secure and user-friendly password manager to keep your credentials safe.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-green-500 min-h-screen`}
      >
        <Navbar/>
        {children}
        <Toaster position="top-right" reverseOrder={false} />
        <Footer/>
      
      </body>
      
      
    </html>
  );
}
