import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Title",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "https://images.pexels.com/photos/30390066/pexels-photo-30390066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    color: "#FF69B4"
  },
  {
    id: 2,
    title: "Title",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "https://images.pexels.com/photos/30390066/pexels-photo-30390066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    color: "#98FB98"
  },
  {
    id: 3,
    title: "Title",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "https://images.pexels.com/photos/30390066/pexels-photo-30390066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    color: "#87CEEB"
  },
  {
    id: 4,
    title: "Title",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "https://images.pexels.com/photos/30390066/pexels-photo-30390066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    color: "#FFD700"
  },
  {
    id: 5,
    title: "Title",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "https://images.pexels.com/photos/30390066/pexels-photo-30390066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    color: "#FF6B6B"
  }
];

export default function ScrollingProjects() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray(".stackingcard");

    cards.forEach((card, i) => {
        gsap.to(card, {
            scale: () => 0.8 + i * 0.035,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top-=" + 40 * i + " 40%",
              end: "top 20%",
              scrub: true
            }
          });
    
          ScrollTrigger.create({
            trigger: card,
            start: "top-=" + 40 * i + " 40%",
            end: "top center",
            endTrigger: ".end-element",
            pin: true,
            pinSpacing: false,
            markers: false, // Changed from true to false
            id: "card-" + i
          });
        });
    
        if (titleRef.current) {
          ScrollTrigger.create({
            trigger: titleRef.current,
            start: "top " + titleRef.current.offsetTop,
            end: (self) => self.previous().end,
            pin: true,
            pinSpacing: false,
            markers: false, // Changed from {indent: 300} to false
            id: "title"
          });
        }

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>Title</h1>
      <div className="stackingcards">
        {projects.map((project, index) => (
          <div key={index} className="stackingcard">
            <div className="card-content">
              <div className="image-container">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="text-content">
                <h3 className="title">{project.title}</h3>
                <div className="text">{project.text}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="end-element"></div>
    </div>
  );
} 