import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast"
import TawkToChat from "@/components/TawkToChat";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});



export const metadata = {
  title: "Evercrest Lending",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} font-playfair antialiased`}
      >
        <Toaster position="top-center" />
        
        {children}
        <TawkToChat />
        <Footer />
      </body>
    </html>
  );
}
