// StackingCards.jsx
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styled from 'styled-components';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const projects = [
  { 
    id: 0, 
    src: '',
    projectName: '',
    title: '',
    background: '',
    solution: '',
  },
  { 
    id: 1, 
    src: '/berghs.png',
    projectName: 'Berghs',
    title: 'ENTER BERGHS',
    background: 'Life rarely follows a straight path. Alike the creative process, it’s more often filled with twists and turns. Berghs has, since its start in 1941, helped students turn detours into opportunities, problems into solutions. We created a scalable and dynamic campaign, showcasing all the squiggly ways that leads to the school, in an effort to appeal to a broader audience, for years to come.',
    solution: 'We developed an innovative digital platform that combines modern technology with traditional mindfulness practices, making meditation more accessible and engaging for todays users.',
    images: [
      '/Här ska videon vara',
      '/Enter_berghs_staket.png',
      '/Programikoner.mp4',
      '/skylt_berghs.png', '/Monter.png'
      '/från_till.jpg',
      '/Berghs_logos.png',
      '/Header_video_kringelikrok_16_9 copy.mp4',
      '/Berghs_popup_16_9 copy.png'
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
      '/berghs/Berghs_popup_16_9 copy.png',
      '/berghs/flagga_berghs.png',
      '/berghs/Monter.png',
      '/berghs/skylt_berghs.png',
      '/berghs/VATTENFLASKA_BERGHS copy.png'
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
  const [focusedProject, setFocusedProject] = useState(projects[0].projectName);

  console.log("selectedProject", selectedProject);

  console.log("focusedProject", focusedProject);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
    
    // Use requestAnimationFrame to ensure DOM is updated
    requestAnimationFrame(() => {
      const overlay = document.querySelector('.project-overlay');
      const content = document.querySelector('.overlay-content');
      
      if (overlay && content) {
        overlay.style.visibility = 'visible';
        content.style.visibility = 'visible';
        
        gsap.to(overlay, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.inOut'
        });

        gsap.to(content, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.2
        });
      }
    });
  };

  const handleCloseProject = () => {
    const overlay = document.querySelector('.project-overlay');
    const content = document.querySelector('.overlay-content');

    gsap.to([overlay, content], {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        setSelectedProject(null);
        document.body.style.overflow = 'unset';
        if (overlay && content) {
          overlay.style.visibility = 'hidden';
          content.style.visibility = 'hidden';
        }
      }
    });
  };

  // Add this function to handle the animation setup
  const setupAnimations = () => {
    const cards = gsap.utils.toArray('.stackingcard').filter(card => card instanceof Element);
    const lastCardIndex = cards.length - 1;

    // Adjust these values to position cards higher
    const cardSpacing = 40;
    const startPosition = window.innerWidth < 768 ? '35%' : '20%';  // Changed from 40% to 30%
    const endPosition = window.innerWidth < 768 ? '15%' : '10%';    // Changed from 20% to 10%

    // Calculate total scroll height needed
    const totalHeight = cardSpacing * lastCardIndex + window.innerHeight * 0.6;
    if (spacerRef.current) {
      spacerRef.current.style.height = `${totalHeight}px`;
    }

    // Clear existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Animate each card
    const cardAnimations = cards.map((card, i) => {
      const scaleAnim = gsap.to(card, {
        scale: () => 0.8 + (i * 0.035),
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: `top-=${cardSpacing * i} ${startPosition}`,
          end: `top-=${cardSpacing * i} ${endPosition}`,
          scrub: true,
          onEnter: () => setFocusedProject(projects[i].projectName),
          onEnterBack: () => setFocusedProject(projects[i].projectName),
        },
      });

      const pinAnim = ScrollTrigger.create({
        trigger: card,
        start: `top-=${cardSpacing * i} ${startPosition}`,
        end: i === lastCardIndex ? `+=${window.innerHeight}` : 'top center',
        endTrigger: i === lastCardIndex ? card : '.end-element',
        pin: true,
        pinSpacing: false,
        id: `card-${i}`,
      });

      return [scaleAnim, pinAnim];
    });

    // Pin title
    const titlePin = ScrollTrigger.create({
      trigger: titleRef.current,
      start: 'top 10%',
      end: (self) => self.previous().end,
      pin: true,
      pinSpacing: false,
      id: 'title',
    });

    return [...cardAnimations.flat(), titlePin];
  };

  // Add this function to reorder projects based on selected project
  const getOrderedProjects = (selectedProject) => {
    if (!selectedProject) return projects;
    
    const selectedIndex = projects.findIndex(p => p.id === selectedProject.id);
    return [
      ...projects.slice(selectedIndex),
      ...projects.slice(0, selectedIndex)
    ];
  };

  useEffect(() => {
    // Scroll to top when component mounts or updates
    window.scrollTo(0, 0);

    let animations = [];

    // Use a small timeout to ensure DOM is ready
    const timer = setTimeout(() => {
      animations = setupAnimations();
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      animations.forEach(anim => {
        if (anim.kill) anim.kill();
        if (anim.scrollTrigger) anim.scrollTrigger.kill();
      });
      if (spacerRef.current) {
        spacerRef.current.style.height = '0px';
      }
    };
  }, []); // Empty dependency array to run only on mount

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
              {project.src ? (
                <CardImage src={project.src} alt={project.projectName} />
              ) : (
                <EmptyCard />
              )}
            </Card>
          ))}
        </Cards>
        <EndElement className="end-element" />
      </Container>
      <Spacer ref={spacerRef} />
      
      {/* Project Overlay */}
      {selectedProject && (
        <ProjectOverlay className="project-overlay" isVisible={!!selectedProject}>
          <CloseButton onClick={handleCloseProject}>×</CloseButton>
          <OverlayContent className="overlay-content">
            {getOrderedProjects(selectedProject).map((project, index) => (
              <div key={project.id}>
                <ProjectHero>
        {project.src ? (
          <HeroImage 
            src={project.src} 
            alt={project.projectName} 
          />
        ) : (
          <EmptyCard />
        )}
      </ProjectHero>

      <ProjectSection>
        <HeroTitle>{project?.title || ''}</HeroTitle>
        <SectionTitle>BACKGROUND</SectionTitle>
        <SectionText>{project?.background || ''}</SectionText>
      </ProjectSection>

      <ProjectSection>
        <SectionTitle>SOLUTION</SectionTitle>
        <SectionText>{project?.solution || ''}</SectionText>
      </ProjectSection>

      <ProjectGallery>
        {project?.images?.slice(1)?.map((image, idx) => (
          <GalleryImage key={idx} src={image} alt={`Project detail ${idx + 1}`} />
        ))}
      </ProjectGallery>
                
                {/* Add spacing between projects */}
                {index < projects.length - 1 && <ProjectDivider />}
                </div>
            ))}
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
  @media (max-width: 768px) {
    top: 120px !important; // Override any inline styles
  }
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
  aspect-ratio: 16/9;

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

const EmptyCard = styled.div`
  width: 100%;
  height: 0%;
  background-color: black;
`;

const EndElement = styled.div`
  height: 0;
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
  background: rgba(255, 255, 255, 1);
  z-index: 1000;
  overflow-y: auto;
  opacity: 0;
  visibility: hidden;
  display: ${props => props.isVisible ? 'block' : 'none'};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1001;
`;

const OverlayContent = styled.div`
  width: 100%;
  opacity: 0;
  visibility: hidden;
  transform: translateY(100px) scale(0.95);
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
  position: relative;
  bottom: 5rem;
  font-size: 4rem;
  color: black;
  font-weight: bold;
  font-family: 'Neue Haas Display Black', sans-serif;
`;

const ProjectSection = styled.div`
  padding: 5rem;
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
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 2rem;

  img:first-child {
    grid-column: 1 / -1;
    aspect-ratio: 16/9;
  }

  img:not(:first-child) {
    width: 100%;
    aspect-ratio: 1/1;
  }

  img:last-child {
    grid-column: 1 / -1;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    
    img:first-child {
      grid-column: 1 / -1;
    }
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
`;

// Add new styled component for project divider
const ProjectDivider = styled.div`
  height: 100px;
`;

export default StackingCards;
