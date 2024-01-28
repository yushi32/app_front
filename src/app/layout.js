import { Inter } from 'next/font/google'
import './globals.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { PrimeReactProvider } from 'primereact/api';

import Header from "../components/Header";
import { AuthContextProvider } from "../context/AuthContext";
import SearchContextProvider from "../context/SearchContext";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Laterless',
  description: 'あなたが気に入るブックマークアプリ',
}

export default function RootLayout({ children }) {
  return (
    <PrimeReactProvider>
      <AuthContextProvider>
        <SearchContextProvider>
          <html lang="ja">
            <body className={`${inter.className} flex flex-col min-h-screen`}>
              <Header />
              {children}
            </body>
          </html>
        </SearchContextProvider>
      </AuthContextProvider>
    </PrimeReactProvider>
  )
}
