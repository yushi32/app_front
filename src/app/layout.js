import { Inter } from 'next/font/google'
import './globals.css'

import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthContextProvider } from "../context/AuthContext";
import SearchContextProvider from "../context/SearchContext";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Laterless',
  description: 'あなたが気に入るブックマークアプリ',
}

export default function RootLayout({ children }) {
  return (
    <AuthContextProvider>
      <SearchContextProvider>
        <html lang="ja">
          <body className={`${inter.className} flex flex-col min-h-screen`}>
            <Header />
            {children}
            <Footer />
          </body>
        </html>
      </SearchContextProvider>
    </AuthContextProvider>
  )
}
