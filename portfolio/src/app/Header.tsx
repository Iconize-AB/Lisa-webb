'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed w-full bg-black top-0 z-50  backdrop-blur-sm">
      <div className="max-w-[1400px] mx-auto px-8 py-6 flex justify-between items-center">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src="/LISA_logotype.png"
            alt="LISA STUDIOS"
            width={100}
            height={30}
            priority
          />
        </Link>
        
        <nav>
          <ul className="flex gap-8">
            <li>
              <Link 
                href="/" 
                className={`text-white hover:opacity-80 transition-opacity font-['Neue_Haas_Display_Black'] ${
                  pathname === '/' ? 'opacity-100' : 'opacity-50'
                }`}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className={`text-white hover:opacity-80 transition-opacity font-['Neue_Haas_Display_Black'] ${
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