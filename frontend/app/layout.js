import { Geist, Titillium_Web } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const titilliumWeb = Titillium_Web({
  variable: "--font-titillium-web",
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"],
});

export const metadata = {
  title: "Naman's Shopping Website",
  description: "A Project made by Naman Chaturvedi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${titilliumWeb.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}