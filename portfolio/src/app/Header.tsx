'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import ThemeSwitch from './components/ThemeSwitch';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full top-0 z-50 backdrop-blur-sm transition-all duration-300 ${
      pathname === '/about' ? 'bg-black' : 'bg-white'
    }`}>
      <div className="max-w-[1400px] mx-auto px-8 py-6 flex justify-center items-center">
        <ThemeSwitch />
      </div>
    </header>
  );
} 