// StackingCards.jsx
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styled from "styled-components";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 0,
    src: "",
    projectName: "",
    title: "",
    background: "",
    solution: "",
  },
  {
    id: 1,
    src: "/berghs.png",
    projectName: "ENTER BERGHS",
    title: "ENTER BERGHS",
    solution:
      "We developed an innovative digital platform that combines modern technology with traditional mindfulness practices, making meditation more accessible and engaging for todays users.",
    background:
      "Life rarely follows a straight path. Alike the creative process, it's more often filled with twists and turns. Berghs has, since its start in 1941, helped students turn detours into opportunities, problems into solutions. We created a scalable and dynamic campaign, showcasing all the squiggly ways that leads to the school, in an effort to appeal to a broader audience, for years to come.",    solution:
      "We developed an innovative digital platform that combines modern technology with traditional mindfulness practices, making meditation more accessible and engaging for todays users.",
    images: [
      "berghs/Enter_berghs_staket.png",
      "berghs//Monter.png",
      "berghs/skylt_berghs.png",
      "berghs/från_till.jpg",
      "berghs/Berghs_logos.png",
      "berghs/flagga_berghs.png",
      "berghs/Berghs_popup_16_9 copy.png",
      "berghs/Programikoner.gif",
      "berghs/Berghs.gif",
    ],
    details: {
      role: "Lead Designer",
      timeline: "2023-2024",
      areas: ["Brand Strategy", "Brand Design", "Motion Design", "Advertising"],
    },
  },
  {
    id: 2,
    src: "/hyllie/Förstabild.png",
    projectName: "SKÅNSK LAGER",
    title: "SKÅNSK LAGER",
    background:
      "Hyllie Brewery is one of the largest beer producers within the region of Skåne.",
    solution:
      "Drawing inspiration from this vast and beautiful area, we created a rebranding of their bestseller: Hyllie Brewery is one of the largest beer producers within the region of Skåne.",
    images: [
      "hyllie/Förstabild.png",
      "hyllie/Flak.png",
      "hyllie/Fält.png",
      "hyllie/ölglas_färgpalett.png",
      "hyllie/burk_vetestrå.png",
    ],
    details: {
      role: "Lead Designer",
      timeline: "2024-2025",
      areas: ["Brand Design", "Brand Strategy"],
    },
  },
  {
    id: 3,
    src: "/volanders/Förstabilden.png",
    projectName: "VOLANDERS",
    title: "VOLANDERS",
    background:
      "Volanders is a newly opened eventspace in the old slaughterhouse quarter of Stockholm, how can we infuse the history of the industrial building into the new identity?",
    solution: "Historical Parties. Mixing the old with the new!",
    images: [
      "volanders/Förstabilden.png",
      "volanders/DÅ_NU.png",
      "volanders/färgpalett.png",
      "volanders/Bildspel_Logotyp.gif",
      "volanders/OOH.png",
    ],
    details: {
      role: "Lead Designer",
      timeline: "2024-2025",
      areas: ["Brand Strategy", "Brand Design", "Motion Design", "Advertising"],
    },
  },
  {
    id: 4,
    src: "dubbla_deli/Förstabild.png",
    projectName: "DUBBLA DELI",
    title: "DUBBLA DELI",
    background:
      "Dubbla, Stockholms latest & greatest sandwich restaurant, needed to get the word out about their new spot in Hötorgshallen.",
    solution:
      "With a smaller budget, we created low-cost communication, using take-away bags, loyalty cards & t-shirts as brand megaphones, in true deli fashion. We then partnered with Sweden's other favorite Dubbla: Doubble, to offer double dates a special sandwich deal",
    images: [
      "dubbla_deli/dubbla_staket.png",
      "dubbla_deli/Krökarkortet.png",
      "dubbla_deli/Påse.png",
      "dubbla_deli/Översikt.png",
      "dubbla_deli/mobil.png",
    ],
    details: {
      role: "Lead Designer",
      timeline: "2024-2025",
      areas: ["Brand Strategy", "Advertising"],
    },
  },
  {
    id: 5,
    src: "",
    projectName: "",
    title: "",
    background: "",
    solution: "",
  },
];

const StackingCards = () => {
  const wrapperRef = useRef(null);
  const titleRef = useRef(null);
  const spacerRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [focusedProject, setFocusedProject] = useState(projects[0].projectName);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  console.log("selectedProject", selectedProject);

  console.log("focusedProject", focusedProject);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";

    // Use requestAnimationFrame to ensure DOM is updated
    requestAnimationFrame(() => {
      const overlay = document.querySelector(".project-overlay");
      const content = document.querySelector(".overlay-content");

      if (overlay && content) {
        overlay.style.visibility = "visible";
        content.style.visibility = "visible";

        gsap.to(overlay, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.inOut",
        });

        gsap.to(content, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.2,
        });
      }
    });
  };

  const handleCloseProject = () => {
    const overlay = document.querySelector(".project-overlay");
    const content = document.querySelector(".overlay-content");

    gsap.to([overlay, content], {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        setSelectedProject(null);
        document.body.style.overflow = "unset";
        if (overlay && content) {
          overlay.style.visibility = "hidden";
          content.style.visibility = "hidden";
        }
      },
    });
  };

  // Add this function to handle the animation setup
  const setupAnimations = () => {
    const cards = gsap.utils
      .toArray(".stackingcard")
      .filter((card) => card instanceof Element);
    const lastCardIndex = cards.length - 1;

    // Adjust these values to position cards higher
    const cardSpacing = 40;
    const startPosition = window.innerWidth < 768 ? "35%" : "25%"; // Changed from 40% to 30%
    const endPosition = window.innerWidth < 768 ? "15%" : "20%"; // Changed from 20% to 10%

    // Calculate total scroll height needed
    const totalHeight = cardSpacing * lastCardIndex + window.innerHeight * 0.6;
    if (spacerRef.current) {
      spacerRef.current.style.height = `${totalHeight}px`;
    }

    // Clear existing ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Animate each card
    const cardAnimations = cards.map((card, i) => {
      const scaleAnim = gsap.to(card, {
        scale: () => 0.8 + i * 0.035,
        ease: "none",
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
        end: i === lastCardIndex ? `+=${window.innerHeight}` : "top center",
        endTrigger: i === lastCardIndex ? card : ".end-element",
        pin: true,
        pinSpacing: false,
        id: `card-${i}`,
      });

      return [scaleAnim, pinAnim];
    });

    // Pin title
    const titlePin = ScrollTrigger.create({
      trigger: titleRef.current,
      start: "top 10%",
      end: (self) => self.previous().end,
      pin: true,
      pinSpacing: false,
      id: "title",
    });

    return [...cardAnimations.flat(), titlePin];
  };

  // Modify getOrderedProjects to only return current project
  const getOrderedProjects = (selectedProject) => {
    if (!selectedProject) return [];
    const selectedIndex = projects.findIndex(
      (p) => p.id === selectedProject.id
    );
    setCurrentProjectIndex(selectedIndex);
    return [projects[selectedIndex]];
  };

  // Update handleNextProject to include loading state
  const handleNextProject = () => {
    const validProjects = projects.filter((p) => p.src);
    const currentValidIndex = validProjects.findIndex(
      (p) => p.id === selectedProject.id
    );
    const nextIndex = (currentValidIndex + 1) % validProjects.length;
    const nextProject = validProjects[nextIndex];
  
    const overlayContent = document.querySelector(".overlay-content");
    const projectOverlay = document.querySelector(".project-overlay");
  
    setIsLoading(true);
  
    // First scroll the overlay to top
    if (projectOverlay) {
      projectOverlay.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    }
  
    gsap.to(overlayContent, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setSelectedProject(nextProject);
        setCurrentProjectIndex(nextProject.id);
  
        setTimeout(() => {
          setIsLoading(false);
          gsap.to(overlayContent, {
            opacity: 1,
            duration: 0.5,
          });
        }, 800);
      },
    });
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
      animations.forEach((anim) => {
        if (anim.kill) anim.kill();
        if (anim.scrollTrigger) anim.scrollTrigger.kill();
      });
      if (spacerRef.current) {
        spacerRef.current.style.height = "0px";
      }
    };
  }, []); // Empty dependency array to run only on mount

  useEffect(() => {
    // Initial delay before showing content
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Wrapper ref={wrapperRef} $isVisible={isVisible}>
      <Container>
        <TitleContainer ref={titleRef}>
          <Timeline>
            {projects.find(p => p.projectName === focusedProject)?.details?.timeline}
          </Timeline>
          <ProjectTitle className="project-title">
            {focusedProject}
            <AreasList>
              {projects.find(p => p.projectName === focusedProject)?.details?.areas.map((area, index) => (
                <span key={index}>{area}</span>
              ))}
            </AreasList>
          </ProjectTitle>
        </TitleContainer>
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
        <ProjectOverlay
          className="project-overlay"
          $isVisible={!!selectedProject}
        >
          <CloseButton onClick={handleCloseProject}>×</CloseButton>

          {/* Add loading overlay */}
          {isLoading && (
            <LoadingOverlay>
              <LoadingSpinner />
            </LoadingOverlay>
          )}

          <OverlayContent className="overlay-content">
            <div>
              <ProjectHero>
                {selectedProject.src ? (
                  <HeroImage
                    src={selectedProject.src}
                    alt={selectedProject.projectName}
                  />
                ) : (
                  <EmptyCard />
                )}
              </ProjectHero>

              {/* Add Project Details Section */}
              <ProjectSection>
                <ProjectHeader>
                  <ProjectName>{selectedProject?.projectName}</ProjectName>
                  <AreasContainer>
                    {selectedProject?.details?.areas.map((area, index) => (
                      <span key={index}>{area}</span>
                    ))}
                  </AreasContainer>
                </ProjectHeader>

                <TimelineContainer>{selectedProject?.details?.timeline}</TimelineContainer>

                <ContentContainer>
                  <ContentSection>
                    <SectionTitle>BACKGROUND</SectionTitle>
                    <SectionText>{selectedProject?.background}</SectionText>
                  </ContentSection>

                  <ContentSection>
                    <SectionTitle>SOLUTION</SectionTitle>
                    <SectionText>{selectedProject?.solution}</SectionText>
                  </ContentSection>
                </ContentContainer>
              </ProjectSection>

              <ProjectGallery>
                {selectedProject?.images?.map((image, idx) => (
                  <GalleryImage
                    key={idx}
                    src={image}
                    alt={`Project detail ${idx + 1}`}
                  />
                ))}
              </ProjectGallery>

              {/* Add Next Project button */}
              <NextProjectContainer>
                <NextProjectButton onClick={handleNextProject}>
                  Next Project
                </NextProjectButton>
              </NextProjectContainer>
            </div>
          </OverlayContent>
        </ProjectOverlay>
      )}
    </Wrapper>
  );
};

// Styled Components
const Wrapper = styled.div`
  overflow: hidden;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 3rem;
`;

const TitleContainer = styled.div`
  position: relative;
  text-align: center;
`;

const Timeline = styled.div`
  position: absolute;
  top: 0.8rem;
  text-decoration: none;
  right: -2rem;
  width: 80%;
  font-family: "Neue Haas Display Black";
  font-size: 1rem;
  color: #888;
  
  @media (max-width: 768px) {
    right: 0;
    top: 3rem;
  }
`;

const ProjectTitle = styled.h2`
  text-align: center;
  position: relative;
  font-size: 3.5rem;
  min-height: 2.5rem;
  color: white;
  margin-top: 2rem;
  font-family: "Neue Haas Display Black";
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    top: 80px !important;
    margin-top: 1rem;
  }
`;

const AreasList = styled.span`
  font-size: 1rem;
  color: #888;
  display: flex;
  margin-bottom: 60px;
  gap: 20px;
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
  display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
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
  position: relative;
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
  font-family: "Neue Haas Display Black", sans-serif;
`;

const ProjectSection = styled.div`
  padding: 4rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 2rem;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const TimelineContainer = styled.div`
  grid-row: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-row: 2;
    font-size: 0.9rem;
  }
`;

const ProjectHeader = styled.div`
  grid-column: 1;
  grid-row: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-column: 1;
    grid-row: 1;
  }
`;

const ProjectName = styled.h1`
  font-size: 4rem;
  margin: 0;
  font-family: "Neue Haas Display", sans-serif;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const AreasContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  text-transform: uppercase;
`;

const ContentContainer = styled.div`
  grid-column: 2;
  grid-row: 2;
  align-self: end;

  @media (max-width: 768px) {
    grid-column: 1;
    grid-row: 3;
  }
`;

const ContentSection = styled.div`
  margin-bottom: 4rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.div`
  font-size: 1rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const SectionText = styled.div`
  font-size: 2rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
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
    height: 100%;
    object-fit: cover;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);

    img:first-child {
      grid-column: 1 / -1;
    }

    // Remove this rule that was causing the last odd image to span full width
    /* img:last-child:nth-child(odd) {
      grid-column: 1 / -1;
    } */
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

// Add styled component for the next project button
const NextProjectContainer = styled.div`
  padding: 4rem 5rem;
  text-align: right;
  width: 100%;
`;

const NextProjectButton = styled.button`
  position: relative;
  padding: 1.5rem 3rem;
  font-size: 1.2rem;
  background-color: transparent;
  color: black;
  border: none;
  cursor: pointer;
  font-family: "Neue Haas Display", sans-serif;
  transition: all 0.3s ease;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: black;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  }

  &:hover::before {
    transform-origin: left;
    transform: scaleX(1);
  }

  &:hover {
    letter-spacing: 2px;
  }

  &::after {
    content: "→";
    position: relative;
    top: 2px;
    margin-left: 12px;
    font-size: 1.4rem;
    transition: transform 0.3s ease;
    display: inline-block;
  }

  &:hover::after {
    transform: translateX(8px);
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
`;

// Add new styled components
const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1002;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid black;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// Add these styled components
const ProjectDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-family: "Neue Haas Display", sans-serif;
`;

const DetailGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DetailValue = styled.span`
  font-size: 2rem;
  color: #000;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

export default StackingCards;
