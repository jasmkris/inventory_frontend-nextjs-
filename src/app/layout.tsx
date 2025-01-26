import { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotificationListener from '@/components/NotificationListener';

export const metadata: Metadata = {
  title: "Inventory Dashboard",
  description: "Inventory Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <NotificationListener />
        </Providers>
      </body>
    </html>
  );
}
