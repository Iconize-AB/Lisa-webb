'use client';

import { useRouter } from 'next/navigation';
import styles from './NeonButton.module.css';

interface NeonButtonProps {
  topText?: string;
  bottomText: string;
  onClick?: () => void;
}

const NeonButton = ({ topText, bottomText }: NeonButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (topText === "HOME") {
      router.push('/');
    } else {
      router.push('/about');
    }
  };

  return (
    <button 
      onClick={handleClick}
      className={styles.neonButton}
    >
      {topText && (
        <span className={styles.topText}>
          {topText}
        </span>
      )}
      <span className={styles.bottomText}>
        {bottomText}
      </span>
    </button>
  );
};

export default NeonButton; 