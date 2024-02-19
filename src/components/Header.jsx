'use client';

import Image from "next/image";
import Link from "next/link";

import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";
import ExtensionButton from "./ExtensionButton";
import LineLinkButton from "./LineLinkButton";
import SearchForm from "./SearchForm";

import { useAuthContext } from "../context/AuthContext";

export default function Header() {
  const { currentUser, logout } = useAuthContext();

  return (
    <header className="sticky top-0 w-full bg-white border-b-2">
      <div className="flex justify-between items-center h-16 max-w-6xl mx-auto">
        <nav className="p-3 my-2">
          <Link href="/home" className="flex items-center">
            <Image src="/logo.svg" alt="Logo" width={150} height={45} />
          </Link>
        </nav>
        {currentUser && <SearchForm />}
          {currentUser ? (
            <div className="flex items-center justify-center space-x-4">
              <LineLinkButton textSize={'text-xs'} />
              <ExtensionButton textSize={'text-xs'} />
              <SignOutButton logout={logout} />
            </div>
          ) : (
            <SignInButton text={"ログイン"} />
          )}
      </div>
    </header>   
  )
}