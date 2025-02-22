'use client';

import Header from "./Header";
import StackingCards from "../components/StackingCards";

export default function Home() {
  return (
    <>
      <Header/>
      <main className="min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden max-w-screen">
        <StackingCards />
      </main>
    </>
  );
} 