'use client';

import { useState, useEffect } from 'react';
import Header from "./Header";
import StackingCards from "../components/StackingCards";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add a delay before showing the cards
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200); // Adjust this delay as needed (1000ms = 1 second)

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header/>
      <main className="min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden max-w-screen">
        {!isLoading && <StackingCards />}
      </main>
    </>
  );
} 