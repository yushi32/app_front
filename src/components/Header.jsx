'use client';

import Image from "next/image";
import Link from "next/link";

import { useEffect } from "react";

import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";
import ExtensionButton from "./ExtensionButton";
import LineLinkButton from "./LineLinkButton";

import { useAuthContext } from "../context/AuthContext";

export default function Header() {
  const { currentUser, logout } = useAuthContext();

  useEffect(() => {}, [currentUser]);

  return (
    <header className="sticky top-0 w-full bg-white border-b-2">
      <div className="flex justify-between items-center h-16 max-w-6xl mx-auto">
        <nav className="bg-emerald-400 p-3 my-2">
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="Logo" width={24} height={24} />
            <h2 className="text-lg">Laterless</h2>
          </Link>
        </nav>
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