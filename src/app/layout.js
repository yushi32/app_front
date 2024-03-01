import { Inter } from 'next/font/google'
import './globals.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { PrimeReactProvider } from 'primereact/api';
import { GoogleAnalytics } from "@next/third-parties/google";

import Header from "../components/Header";
import { AuthContextProvider } from "../context/AuthContext";
import SearchContextProvider from "../context/SearchContext";

const inter = Inter({ subsets: ['latin'] })

const siteName= 'Laterless';
const description = 'あなたが気に入るブックマークアプリ';

export const metadata = {
  metadataBase: new URL('https://laterless.vercel.app/'),
  title: {
    default: siteName,
  },
  description,
  openGraph: {
    title: siteName,
    description,
    siteName,
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description,
  },
  alternates: {
    canonical: '/',
  },
};

const GA_TAG_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export default function RootLayout({ children }) {
  return (
    <PrimeReactProvider value={{ unstyled: true, pt: {} }}>
      <AuthContextProvider>
        <SearchContextProvider>
          <html lang="ja">
            <body className={`${inter.className} flex flex-col min-h-screen`}>
              {GA_TAG_ID && <GoogleAnalytics gaId={GA_TAG_ID} />}
              <Header />
              {children}
            </body>
          </html>
        </SearchContextProvider>
      </AuthContextProvider>
    </PrimeReactProvider>
  )
}
