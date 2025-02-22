// StackingCards.jsx
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styled from 'styled-components';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const projects = [
  { 
    id: 1, 
    src: '/berghs.png',
    projectName: 'Berghs',
    title: 'ENTER BERGHS',
    background: 'In todays fast-paced and forward-moving world, finding time for mindfulness and meditation can be challenging. Many individuals struggle with anxiety and stress, yet traditional meditation practices can feel inaccessible or intimidating.',
    solution: 'We developed an innovative digital platform that combines modern technology with traditional mindfulness practices, making meditation more accessible and engaging for todays users.',
    images: [
      '/berghs.png',
      '/berghs.png',
      '/berghs.png'
    ],
    details: {
      role: 'Lead Designer',
      timeline: '2023-2024',
      technologies: ['React', 'GSAP', 'Figma']
    }
  },
  { 
    id: 2, 
    src: '/berghs.png',
    projectName: 'Project Two',
    title: 'ENTER BERGHS',
    background: 'In todays fast-paced and forward-moving world, finding time for mindfulness and meditation can be challenging. Many individuals struggle with anxiety and stress, yet traditional meditation practices can feel inaccessible or intimidating.',
    solution: 'We developed an innovative digital platform that combines modern technology with traditional mindfulness practices, making meditation more accessible and engaging for todays users.',
    images: [
      '/berghs.png',
      '/berghs.png',
      '/berghs.png'
    ],
    details: {
      role: 'Lead Designer',
      timeline: '2023-2024',
      technologies: ['React', 'GSAP', 'Figma']
    }
  },
  { 
    id: 3, 
    src: '/project2.png',
    projectName: 'Project Three',
    title: 'ENTER BERGHS',
    background: 'In todays fast-paced and forward-moving world, finding time for mindfulness and meditation can be challenging. Many individuals struggle with anxiety and stress, yet traditional meditation practices can feel inaccessible or intimidating.',
    solution: 'We developed an innovative digital platform that combines modern technology with traditional mindfulness practices, making meditation more accessible and engaging for todays users.',
    images: [
      '/project2.png',
      '/project2.png',
      '/project2.png'
    ],
    details: {
      role: 'Lead Designer',
      timeline: '2023-2024',
      technologies: ['React', 'GSAP', 'Figma']
    }
  },
  { 
    id: 4, 
    src: '/project3.png',
    projectName: 'Project Four',
    title: 'ENTER BERGHS',
    background: 'In todays fast-paced and forward-moving world, finding time for mindfulness and meditation can be challenging. Many individuals struggle with anxiety and stress, yet traditional meditation practices can feel inaccessible or intimidating.',
    solution: 'We developed an innovative digital platform that combines modern technology with traditional mindfulness practices, making meditation more accessible and engaging for todays users.',
    images: [
      '/project3.png',
      '/project3.png',
      '/project3.png'
    ],
    details: {
      role: 'Lead Designer',
      timeline: '2023-2024',
      technologies: ['React', 'GSAP', 'Figma']
    }
  },
  { 
    id: 5, 
    src: '/berghs.png',
    projectName: 'Project Five',
    title: 'ENTER BERGHS',
    background: 'In todays fast-paced and forward-moving world, finding time for mindfulness and meditation can be challenging. Many individuals struggle with anxiety and stress, yet traditional meditation practices can feel inaccessible or intimidating.',
    solution: 'We developed an innovative digital platform that combines modern technology with traditional mindfulness practices, making meditation more accessible and engaging for todays users.',
    images: [
      '/berghs.png',
      '/berghs.png',
      '/berghs.png'
    ],
    details: {
      role: 'Lead Designer',
      timeline: '2023-2024',
      technologies: ['React', 'GSAP', 'Figma']
    }
  }
];

const StackingCards = () => {
  const wrapperRef = useRef(null);
  const titleRef = useRef(null);
  const spacerRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  // Initialize focusedProject with the last project's name
  const [focusedProject, setFocusedProject] = useState(projects[projects.length - 1].projectName);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    // Disable scroll when project is open
    document.body.style.overflow = 'hidden';
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    // Re-enable scroll when project is closed
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    const cards = gsap.utils.toArray('.stackingcard');
    const lastCardIndex = cards.length - 1;

    // Calculate total scroll height needed
    const totalHeight = (cards.length * 40) + window.innerHeight;
    if (spacerRef.current) {
      spacerRef.current.style.height = `${totalHeight}px`;
    }

    // Scroll to position where last card is in focus
    window.scrollTo({
      top: lastCardIndex * 40,
      behavior: 'instant'
    });

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
          onEnter: () => setFocusedProject(projects[i].projectName),
          onEnterBack: () => setFocusedProject(projects[i].projectName),
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
        <ProjectTitle ref={titleRef}>{focusedProject}</ProjectTitle>
        <Cards>
          {projects.map((project) => (
            <Card 
              key={project.id} 
              className="stackingcard"
              onClick={() => handleProjectClick(project)}
            >
              <CardImage src={project.src} alt={project.projectName} />
            </Card>
          ))}
        </Cards>
        <EndElement className="end-element" />
      </Container>
      <Spacer ref={spacerRef} />
      
      {/* Project Overlay */}
      {selectedProject && (
        <ProjectOverlay>
          <CloseButton onClick={handleCloseProject}>×</CloseButton>
          <OverlayContent>
            <ProjectHero>
              <HeroImage src={selectedProject.images[0]} alt={selectedProject.projectName} />
              <HeroTitle>{selectedProject.title}</HeroTitle>
            </ProjectHero>

            <ProjectSection>
              <SectionTitle>BACKGROUND</SectionTitle>
              <SectionText>{selectedProject.background}</SectionText>
            </ProjectSection>

            <ProjectSection>
              <SectionTitle>SOLUTION</SectionTitle>
              <SectionText>{selectedProject.solution}</SectionText>
            </ProjectSection>

            <ProjectDetails>
              <DetailItem>
                <DetailLabel>Role</DetailLabel>
                <DetailText>{selectedProject.details.role}</DetailText>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Timeline</DetailLabel>
                <DetailText>{selectedProject.details.timeline}</DetailText>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Technologies</DetailLabel>
                <DetailText>{selectedProject.details.technologies.join(', ')}</DetailText>
              </DetailItem>
            </ProjectDetails>

            <ProjectGallery>
              {selectedProject.images.slice(1).map((image, index) => (
                <GalleryImage key={index} src={image} alt={`Project detail ${index + 1}`} />
              ))}
            </ProjectGallery>
          </OverlayContent>
        </ProjectOverlay>
      )}
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
  text-align: center;
  font-size: 2rem;
  min-height: 2.5rem;
  color: white;
  font-family: 'Neue Haas Display Black';
`;

const Cards = styled.div`
  position: relative;
`;

const Card = styled.div`
  border-radius: 15px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform-origin: center top;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  overflow: hidden;

  &:hover {
    transform: scale(1.02);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const EndElement = styled.div`
  height: 100vh;
`;

const Spacer = styled.div`
  width: 100%;
  height: 100vh; // Initial height, will be updated by JavaScript
`;

const ProjectOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 1000;
  overflow-y: auto;
  animation: fadeIn 0.3s ease-in-out;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1001;
`;

const OverlayContent = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`;

const ProjectHero = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeroTitle = styled.h1`
  position: absolute;
  bottom: 5rem;
  left: 5rem;
  font-size: 4rem;
  color: black;
  font-weight: bold;
  font-family: 'Neue Haas Display Black', sans-serif;
`;

const ProjectSection = styled.div`
  padding: 5rem;
  max-width: 800px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  font-family: 'Neue Haas Display Black', sans-serif;
`;

const SectionText = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #333;
`;

const ProjectDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 5rem;
  background: #f5f5f5;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DetailLabel = styled.span`
  font-size: 0.9rem;
  text-transform: uppercase;
  color: #666;
`;

const DetailText = styled.span`
  font-size: 1.1rem;
  color: #333;
`;

const ProjectGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  padding: 5rem;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
`;

export default StackingCards;