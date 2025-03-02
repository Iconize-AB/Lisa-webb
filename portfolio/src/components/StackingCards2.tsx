'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './StackingCards2.module.css';

gsap.registerPlugin(ScrollTrigger);

const StackingCards2 = () => {
  useEffect(() => {
    const cards = gsap.utils.toArray('.stackingcard').filter((card): card is HTMLElement => card instanceof HTMLElement);

    cards.forEach((card, index) => {
      gsap.set(card, {
        y: '100vh', // Start all cards at the bottom of the viewport
      });

      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          markers: true,
          invalidateOnRefresh: true
        },
        y: 0, // Move cards to their original position
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: card,
        start: "bottom bottom",
        pin: true,
        pinSpacing: false,
        markers: true,
        id: 'pin',
        end: 'max',
        invalidateOnRefresh: true,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>BERGHS</h1>
      <div className={styles.container}>
        <div className={styles.cards}>
          <div className={styles.card}>
            <img src="/Ivar.jpg" alt="" />
          </div>
          <div className={styles.card}>
            <img src="/Ivar.jpg" alt="" />
          </div>
          <div className={styles.card}>
            <img src="/Ivar.jpg" alt="" />
          </div>
          <div className={styles.card}>
            <img src="/path-to-your-image-4.jpg" alt="" />
          </div>
          <div className={styles.card}>
            <img src="/path-to-your-image-5.jpg" alt="" />
          </div>
        </div>
      </div>
      <div className={styles.container2}></div>
    </div>
  );
};

export default StackingCards2;
