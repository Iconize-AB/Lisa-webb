/** @format */

"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { data } from "../../../data";
import SmoothScroll from "../../hooks/SmoothScroll";
import Lenis from '@studio-freight/lenis'

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const container = useRef(null);
  const stickyCards = useRef(null);
  const titleRef = useRef(null);
  const yearRef = useRef(null);
  const categoriesRef = useRef(null);
  const currentIndex = useRef(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const lenisRef = useRef(null);

  useGSAP(
    () => {
      const cardsPerView = 4;
      const lovedNumberforCards = 16;
      const isMobile = window.innerWidth < 768;
      const getCardProps = {
        scale: (index: number) => {
          const baseScale = 0.5 + (index / (lovedNumberforCards - 1)) * 0.5;
          if (isMobile) {
            return baseScale + 0.3; // Just return a single scale value
          }
          return baseScale;
        },
        yPercent: (index: number) => (index / (lovedNumberforCards - 1)) * 100,
      };

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
        const scale = getCardProps.scale(i);
        const yPercent = getCardProps.yPercent(i);

        gsap.set(cards[i], {
          yPercent,
          scale,
          opacity: 1,
          ...(isMobile && {
            scaleX: scale + 0.3,
            scaleY: scale
          })
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
          end: `+=${window.innerHeight * (totalCards - 1) * 0.2}`,
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

          const { scale, yPercent } = getCardProps;
          scrollTimeline.to(
            card,
            {
              yPercent: yPercent(shiftedIndex),
              scale: scale(shiftedIndex),
              ...(isMobile && {
                scaleX: scale(shiftedIndex) + 0.3,
                scaleY: scale(shiftedIndex)
              }),
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

    // Separate animations for title vs year/categories
    tl.to(titleRef.current, {
      opacity: 1,
      duration: 0.2,
    })
    .to([yearRef.current, categoriesRef.current], {
      opacity: 1,
      duration: 0.2,
      delay: 1 // 1 second delay for year and categories
    });
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    if (window.lenis) {
      window.lenis.destroy();
    }
  };

  const handleCloseProject = () => {
    if (window.lenis) {
      window.lenis.start();
    }
    setSelectedProject(null);
  };

  const handleNextProject = () => {
    const currentIndex = data.findIndex(p => p === selectedProject);
    const nextIndex = (currentIndex + 1) % data.length;
    const nextProject = data[nextIndex];

    // First scroll the overlay to top
    const projectOverlay = document.querySelector('.fixed.inset-0');
    if (projectOverlay) {
      projectOverlay.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    }

    // Then update the selected project
    setSelectedProject(nextProject);
  };

  console.log("selectedProject", selectedProject);

  return (
    <SmoothScroll>
      <div ref={container} className="w-screen relative">
        <div
          ref={stickyCards}
          className="sticky-cards relative w-screen h-screen bg-[#0101010] flex-col flex items-center justify-center"
        >
          <span
            ref={yearRef}
            className="text-xs font-light leading-none uppercase fixed top-0 right-0 pt-[14vh] pr-4 md:pr-8 block opacity-100 transition-opacity duration-300"
          >
            {data[3]?.year}
          </span>
          <div className="text-container text-black fixed top-0 pt-[14vh] flex flex-col items-center justify-center w-full px-4 md:px-8">
            <div className="relative flex flex-col items-start max-w-[90vw] md:max-w-[80vw]">
              <h1
                ref={titleRef}
                className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold leading-tight uppercase block opacity-100 transition-opacity duration-300 w-full"
              >
                {data[3]?.title}
              </h1>
              <div
                ref={categoriesRef}
                className="flex flex-wrap gap-2 md:gap-4 mt-4 opacity-100 transition-opacity duration-300"
              >
                {data[3]?.categories.map((category, index) => (
                  <span
                    key={index}
                    className="text-[10px] md:text-xs font-light leading-none uppercase tracking-wider"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="cards-container relative w-[100vw] pt-[16vh] sm:pt-[10vh] h-[100vh] rounded-3xl">
            {data.map((data, index) => (
              <div
                key={index}
                className="card absolute w-full h-full rounded-3xl"
                onClick={() => handleProjectClick(data)}
              >
                <Image
                  className="img w-full h-full relative rounded-3xl object-cover object-center"
                  src={data.cardImg}
                  alt={data.title}
                  width={1000}
                  height={1000}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Add Project Overlay */}
        {selectedProject && (
          <div 
            className="fixed inset-0 z-[1000] bg-white"
            style={{
              height: '100vh',
              overflowY: 'scroll',
              overflowX: 'hidden',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              WebkitOverflowScrolling: 'touch',
              msOverflowStyle: '-ms-autohiding-scrollbar',
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onWheel={(e) => {
              e.stopPropagation();
            }}
            onTouchMove={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="absolute w-full">
              <button 
                onClick={handleCloseProject}
                className="fixed top-5 right-5 text-3xl z-[1001] cursor-pointer text-white hover:opacity-70"
              >
                ×
              </button>
              
              {/* Hero Image */}
              <div className="w-full h-screen">
                <Image
                  src={selectedProject.cardImg}
                  alt={selectedProject.title}
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              {/* Project Info */}
              <div className="w-full">
                <div className="grid grid-cols-2 gap-8 p-16">
                  <div>
                    <h1 className="text-4xl font-bold mb-4">{selectedProject.title}</h1>
                    <div className="flex flex-col gap-2">
                    {selectedProject.categories?.map((category, idx) => (
                        <span key={idx} className="text-sm uppercase">{category}</span>
                      ))}
                    </div>
                    <div className="mt-4">{selectedProject.year}</div>
                  </div>
                  <div>
                    <div className="mb-16">
                      <div className="text-sm uppercase mb-4">BACKGROUND</div>
                      <div className="text-2xl">{selectedProject.background}</div>
                    </div>
                    <div>
                      <div className="text-sm uppercase mb-4">SOLUTION</div>
                      <div className="text-2xl">{selectedProject.solution}</div>
                    </div>
                  </div>
                </div>

                {/* Project Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-16">
                  {selectedProject.images?.map((image, idx) => (
                    <Image
                      key={idx}
                      src={image}
                      alt={`Project detail ${idx + 1}`}
                      className={`w-full object-cover ${idx === 0 ? 'col-span-2' : ''}`}
                      width={1000}
                      height={1000}
                    />
                  ))}
                </div>
              </div>

              {/* Add Next Project Button Container */}
              <div className="px-20 py-16 text-right w-full">
                <button 
                  onClick={handleNextProject}
                  className="relative px-12 py-6 text-xl bg-transparent text-black border-none cursor-pointer font-['Neue_Haas_Display'] transition-all duration-300 hover:tracking-wider group"
                >
                  Next Project
                  <span className="relative top-0.5 ml-3 text-2xl inline-block transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-px bg-black origin-right scale-x-0 transition-transform duration-600 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:origin-left group-hover:scale-x-100">
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SmoothScroll>
  );
}
