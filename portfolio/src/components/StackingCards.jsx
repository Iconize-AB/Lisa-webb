// StackingCards.jsx
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styled from 'styled-components';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const StackingCards = () => {
  const wrapperRef = useRef(null);
  const titleRef = useRef(null);

  const images = [
    { 
      id: 1, 
      src: 'https://images.pexels.com/photos/30390066/pexels-photo-30390066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      projectName: 'Project One'
    },
    { 
      id: 2, 
      src: 'https://images.pexels.com/photos/30390066/pexels-photo-30390066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      projectName: 'Project Two'
    },
    { 
      id: 3, 
      src: 'https://images.pexels.com/photos/30390066/pexels-photo-30390066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      projectName: 'Project Three'
    },
    { 
      id: 4, 
      src: 'https://images.pexels.com/photos/30390066/pexels-photo-30390066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      projectName: 'Project Four'
    },
    { 
      id: 5, 
      src: 'https://images.pexels.com/photos/30390066/pexels-photo-30390066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      projectName: 'Project Five'
    }
  ];

  // Add state for focused project
  const [focusedProject, setFocusedProject] = useState('');

  useEffect(() => {
    // Get all cards
    const cards = gsap.utils.toArray('.stackingcard');

    // Animate each card
    cards.forEach((card, i) => {
      // Scale animation
      gsap.to(card, {
        scale: () => 0.8 + i * 0.035,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: `top-=${40 * i} 40%`,
          end: 'top 20%',
          scrub: true,
          onEnter: () => setFocusedProject(images[i].projectName),
          onEnterBack: () => setFocusedProject(images[i].projectName),
        },
      });

      // Pin animation
      ScrollTrigger.create({
        trigger: card,
        start: `top-=${40 * i} 40%`,
        end: 'top center',
        endTrigger: '.end-element',
        pin: true,
        pinSpacing: false,
        id: `card-${i}`,
      });
    });

    // Pin title
    ScrollTrigger.create({
      trigger: titleRef.current,
      start: 'top 10%',
      end: (self) => self.previous().end,
      pin: true,
      pinSpacing: false,
      id: 'title',
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      <Container>
        <ProjectTitle>{focusedProject}</ProjectTitle>
        <Cards>
          {images.map((image) => (
            <Card key={image.id} className="stackingcard">
              <CardImage src={image.src} alt={image.projectName} />
            </Card>
          ))}
        </Cards>
        <EndElement className="end-element" />
      </Container>
    </Wrapper>
  );
};

// Styled Components
const Wrapper = styled.div`
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 4rem;
`;

const ProjectTitle = styled.h2`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 2rem;
  min-height: 2.5rem;
  z-index: 100;
  background: rgba(255, 255, 255, 0.9);
  padding: 10px 20px;
  border-radius: 8px;
  width: auto;
`;

const Cards = styled.div`
  position: relative;
`;

const Card = styled.div`
  background: white;
  border-radius: 15px;
  padding: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform-origin: center top;
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const EndElement = styled.div`
  height: 100vh;
`;

export default StackingCards;