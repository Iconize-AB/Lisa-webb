'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed w-full top-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="max-w-[1400px] mx-auto px-8 py-6 flex justify-between items-center">
        <Link href="/" className="text-white hover:opacity-80 transition-opacity">
          LISA STUDIOS
        </Link>
        
        <nav>
          <ul className="flex gap-8">
            <li>
              <Link 
                href="/" 
                className={`text-white hover:opacity-80 transition-opacity ${
                  pathname === '/' ? 'opacity-100' : 'opacity-50'
                }`}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className={`text-white hover:opacity-80 transition-opacity ${
                  pathname === '/about' ? 'opacity-100' : 'opacity-50'
                }`}
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