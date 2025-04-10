/** @format */

"use client";

import React, { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      syncTouch: false,
      gestureOrientation: "vertical",
      // if you want infinite cards uncomment the next line
      // infinite: true,
      wheelMultiplier: 0.7,
      touchMultiplier: 0.5,
      syncTouchLerp: 0.15,

      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.scrollTo(0, { immediate: true });
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });

    // loading ? lenis.stop() : lenis.start();

    gsap.ticker.lagSmoothing(0);

    // console.log(loading);

    // Optional cleanup on unmount
    // return () => lenis.destroy();
  }, []);

  return <div>{children}</div>;
};

export default SmoothScroll;
