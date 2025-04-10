/** @format */

"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { data } from "../../../data";
import SmoothScroll from "../../hooks/SmoothScroll";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef(null);
  const stickyCards = useRef(null);
  const titleRef = useRef(null);
  const yearRef = useRef(null);
  const categoriesRef = useRef(null);
  const currentIndex = useRef(0);
  useGSAP(
    () => {
      const cardsPerView = 10;
      const lovedNumberforCards = 20;
      const getCardProps = (index) => ({
        scale: 0.5 + (index / (lovedNumberforCards - 1)) * 0.5,
        yPercent: (index / (lovedNumberforCards - 1)) * 100,
      });
      const cards = document.querySelectorAll(".card");
      const images = document.querySelectorAll(".card .img");
      const totalCards = cards.length;
      console.log(totalCards);
      gsap.set(cards[0], {
        yPercent: 0,
        opacity: 1,
        scale: 0.5,
      });
      gsap.set(images, {
        scale: 1,
        opacity: 1,
      });

      for (let i = 1; i < totalCards; i++) {
        const { scale, yPercent } = getCardProps(i);

        gsap.set(cards[i], {
          yPercent: yPercent,
          scale: scale,
          opacity: 1,
        });

        if (i > cardsPerView - 1) {
          gsap.set(cards[i], { yPercent: 120 });
        }
      }
      const trigger = document.querySelector(".cards-container");
      const step = 1 / (totalCards - cardsPerView);
      console.log(step);
      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-cards",
          start: "top top",
          end: `+=${window.innerHeight * (totalCards - 1) * 0.5}`,
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            const newIndex = Math.floor(self.progress / step);
            if (newIndex !== currentIndex.current && data[newIndex]) {
              currentIndex.current = newIndex;
              console.log(newIndex + cardsPerView - 1);
              fadeUpdateText(newIndex + cardsPerView - 1);
            }
          },
        },
      });
      const gg = 100 / totalCards;
      const gg2 = 0.5 / totalCards;
      for (let i = 0; i < totalCards - cardsPerView; i++) {
        const currentCard = cards[i];
        const nextCard = cards[i + 1];
        const currentImage = images[i];
        const position = i;
        scrollTimeline.to(
          currentCard,
          {
            opacity: 0,
            scale: 0.5,
            duration: 1,
            ease: "none",
          },
          position
        );

        // Animate next cards up into view
        for (let j = i + 1; j <= i + cardsPerView; j++) {
          const shiftedIndex = j - (i + 1);
          const card = cards[j];
          if (!card) continue;

          const { scale, yPercent } = getCardProps(shiftedIndex);
          scrollTimeline.to(
            card,
            {
              yPercent,
              scale,
              opacity: 1,
              duration: 1,
              ease: "none",
            },
            position
          );
        }

        // Hide the remaining cards
        for (let k = i + cardsPerView + 1; k < totalCards; k++) {
          const card = cards[k];
          if (!card) continue;

          scrollTimeline.set(
            card,
            {
              yPercent: 200,
              opacity: 0,
            },
            position
          );
        }
      }
    },
    { scope: container }
  );

  const fadeUpdateText = (index) => {
    const tl = gsap.timeline();

    tl.to([titleRef.current, yearRef.current, categoriesRef.current], {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        if (!data[index]) return;

        if (titleRef.current) titleRef.current.textContent = data[index].title;
        if (yearRef.current) yearRef.current.textContent = data[index].year;

        if (categoriesRef.current) {
          categoriesRef.current.innerHTML = "";
          data[index].categories.forEach((category) => {
            const span = document.createElement("span");
            span.className = "text-xs font-light leading-none uppercase";
            span.textContent = category;
            categoriesRef.current.appendChild(span);
          });
        }
      },
    });

    tl.to([titleRef.current, yearRef.current, categoriesRef.current], {
      opacity: 1,
      duration: 0.2,
    });
  };

  return (
    <SmoothScroll>
      <div ref={container} className="container">
        <div
          ref={stickyCards}
          className="sticky-cards relative w-screen h-screen bg-[#0101010] overflow-hidden flex-col flex items-center justify-center"
        >
          <div className="text-container fixed top-0 pt-[10vh] flex flex-col items-center justify-center">
            <span
              ref={yearRef}
              className="text-xs font-light leading-none uppercase self-end block opacity-100 transition-opacity duration-300"
            >
              {data[9].year}
            </span>
            <h1
              ref={titleRef}
              className="text-8xl font-bold leading-none uppercase block opacity-100 transition-opacity duration-300"
            >
              {data[9].title}
            </h1>
            <div
              ref={categoriesRef}
              className="flex items-center justify-between w-full gap-2 flex-wrap opacity-100 transition-opacity duration-300"
            >
              {data[9].categories.map((category, index) => (
                <span
                  key={index}
                  className="text-xs font-light leading-none uppercase"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div className="cards-container relative w-[100vw] pt-[10vh] h-[100vh] rounded-3xl">
            {data.map((data, index) => (
              <div
                key={index}
                className="card absolute w-full h-full rounded-3xl overflow-hidden"
              >
                <Image
                  className="img w-full h-full relative object-cover object-center"
                  src={data.cardImg}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SmoothScroll>
  );
}
