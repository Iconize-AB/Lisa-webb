'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

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
        <nav>
          <ul className="flex gap-8">
            <li>
              <Link 
                href="/" 
                className={`hover:opacity-80 transition-opacity font-['Neue_Haas_Display_Black'] ${
                  pathname === '/about' ? 'text-white' : 'text-black'
                } ${pathname === '/' ? 'opacity-100' : 'opacity-50'}`}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className={`hover:opacity-80 transition-opacity font-['Neue_Haas_Display_Black'] ${
                  pathname === '/about' ? 'text-white' : 'text-black'
                } ${pathname === '/about' ? 'opacity-100' : 'opacity-50'}`}
              >
                ABOUT
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
} 