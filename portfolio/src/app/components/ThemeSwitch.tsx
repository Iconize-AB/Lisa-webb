'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './ThemeSwitch.module.css';

export default function ThemeSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecked, setIsChecked] = useState(pathname === '/about');

  useEffect(() => {
    // Keep switch state in sync with the current route
    setIsChecked(pathname === '/about');
  }, [pathname]);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState = e.target.checked;
    setIsChecked(newState);
    router.push(newState ? '/about' : '/');
  };

  return (
    <label className={styles.switch}>
      <input 
        type="checkbox" 
        checked={isChecked}
        onChange={handleToggle}
      />
      <div className={styles.button}>
        <div className={styles.light}></div>
        <div className={styles.dots}></div>
        <div className={styles.characters}></div>
        <div className={styles.shine}></div>
        <div className={styles.shadow}></div>
      </div>
    </label>
  );
} 