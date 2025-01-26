import { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotificationListener from '@/components/NotificationListener';

if (typeof window !== 'undefined') {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    // Suppress specific Axios errors
    if (
      args[0]?.includes('AxiosError') || 
      args[0]?.includes('Request failed') ||
      args[0]?.includes('WebSocket connection')
    ) {
      return;
    }
    originalConsoleError.apply(console, args);
  };
}

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
