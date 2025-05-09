'use client';

import { useState, useEffect, useRef, RefObject } from 'react';
import NeonButton from "../../components/NeonButton";
import styles from './page.module.css';
import Header from '../Header';
import Footer from '../Footer';

// Custom hook definition
function useInView(options = {}): [RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.1, ...options });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isVisible];
}

export default function About() {
  const [selectedService, setSelectedService] = useState('Advertising');
  const [headerRef, headerVisible] = useInView();
  const [servicesRef, servicesVisible] = useInView();
  const [teamRef, teamVisible] = useInView();
  const [clientsRef, clientsVisible] = useInView();

  const services = {
    'Advertising': { color: 'text-white' },
    'Brand Design': { color: 'text-white' },
    'Brand Strategy': { color: 'text-gray-500' },
    'Motion Design': { color: 'text-gray-500' }
  };

  const serviceContent = {
    'Advertising': `We delve deep into the brand to make sure we understand fully what can help it succeed with. We like to be bold, create things that will last and leave a mark.
    
    •    Art Direction: We craft cohesive and visually stunning creative concepts that align with your brand’s identity and campaign goals. From concept to execution. 
    
    •    Brand Campaigns: Conjuring campaigns best suited for the brand, that will hopefully raise a few eyebrows.
    
    •    Integrated Marketing: Seamless campaigns across social, digital, print etc.
    
    •    Concept Development: Exiting and bold concept ideas that rhymes well with the brand.
    
    •    Copywriting & Messaging: Compose memorable and eyecatching text for your brand.`,

    'Brand Design': `We create visuals that tell your story, make an impact, and build brand recognition.
    
    •    Logo & Identity Design: Your brand’s face.
    
    •    Brand Guidelines: Keeping everything consistent across all platforms.
    
    •    Packaging Design: Finding distinct ways to stand out on the shelf.
    
    •    Digital & Print: From social media to business cards, we design it all.
    
    •    Environmental & Spatial Branding: Making sure your brand looks great in the real world.`,

    'Brand Strategy': `We help you find your place in the market, define what makes you different, and work with this to ensure every project gets tailored to its needs. Our philosophy is that there has to be a reason behind every decision. 

    •    Brand Positioning: Find the brands unique position on the market.
    
    •    Market Research & Insights: Data-driven decisions, not just gut feelings.
    
    •    Tone of Voice & Messaging: Finding the right words to express who you are.`,

    'Motion Design': `Motion Design Movement brings design to life. We create everything from simple, striking animations to fully developed motion systems and 3D motion.

2D & 3D Animation: From simple logo animations to full-blown animated 2D and 3D videos.

• Motion Graphics: Moving visuals that make information exciting.

• Film & Video Production: High-quality video that tells your story.

• Visual Effects (VFX): The finishing touch that makes your videos pop.

• Social & Digital Content: Quick, engaging, and designed to go viral.`
  };

  return (
    <div className="bg-black">
    <Header />
    <main className="min-h-screen bg-black text-white p-8 pt-24">
      {/* Navigation Button Section */}
      <div className="mb-32 flex justify-center">
        {/* <NeonButton topText="HOME" bottomText="BACK" /> */}
      </div>

      {/* Content Section */}
      <div className={`max-w-[1400px] mx-auto relative ${styles.wrapper}`}>
        {/* Header */}
        <div
          ref={headerRef}
          className={`transition-all duration-1000 ease-out transform ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } md:w-3/4`}
        >
          <h1 className="text-2xl mb-4">LISA STUDIOS</h1>
          <h2 className="text-[80px] leading-tight font-normal mb-16">
            Your Creative Directors<br />
            favorite underdog
          </h2>
        </div>
        
        {/* Contact Information - Moved up in the DOM */}
        <div className="relative md:absolute md:top-0 md:right-0 text-left md:text-right mt-16 md:mt-0 md:w-1/4">
          <div className="mb-8">
            <h4 className="mb-2">CONTACT US</h4>
            <div className="mb-4">
              <p className="mb-1">EMAIL:</p>
              <a href="mailto:hey@lisastudios.se" className="hover:underline">
                hey@lisastudios.se
              </a>
            </div>
            <div className="mb-4">
              <p className="mb-1">PHONE:</p>
              <a href="tel:+4686586864" className="hover:underline">
                +4686586864
              </a>
            </div>
          </div>
          
          <div className="mb-8">
            <p className="mb-1">OFFICE</p>
            <p>NORR MÄLARSTRAND 12</p>
          </div>
          
          <div>
            <p className="mb-1">SOCIAL</p>
            <a href="#" className="hover:underline">Lisastudios</a>
          </div>
        </div>
        
        {/* Hero Image Section */}
        <img 
          src="/berghs/banner.png"
          alt="Lisa Studios Hero"
          className="w-full h-[400px] object-cover mb-16 mt-32"
        />
        
        {/* Services Section */}
        <div
          ref={servicesRef}
          className={`max-w-[1400px] mx-auto flex flex-col md:flex-row gap-8 md:gap-16 transition-all duration-1000 ease-out transform ${
            servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Services Menu */}
          <div className="w-full md:w-1/2">
            <h3 className="text-xl mb-8">SERVICES</h3>
            <div className="space-y-4">
              {Object.entries(services).map(([service, { color }]) => (
                <button
                  key={service}
                  onClick={() => setSelectedService(service)}
                  className={`text-4xl md:text-6xl font-light block hover:text-white transition-colors leading-none ${
                    selectedService === service ? 'text-white' : 'text-gray-500'
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          {/* Service Content */}
          <div className="w-full md:w-1/2 pt-8 md:pt-20">
            <p className="text-lg font-light whitespace-pre-line">
              {serviceContent[selectedService]}
            </p>
          </div>
        </div>

        {/* Team Members Section */}
        <div
          ref={teamRef}
          className={`mt-16 md:mt-32 transition-all duration-1000 ease-out transform ${
            teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h3 className="text-xl mb-8">ABOUT US</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div>
              <img 
                src="/love.png" 
                alt="Love Molin" 
                className="aspect-square object-cover w-full mb-4"
              />
              <p>(L)ove Molin Lundgren</p>
            </div>
            <div>
              <img 
                src="/Ivar.jpeg" 
                alt="Ivar" 
                className="aspect-square object-cover w-full mb-4"
              />
              <p>(I)var Callmander Hjelmström</p>
            </div>
            <div>
              <img 
                src="/seb.png" 
                alt="Seb" 
                className="aspect-square object-cover w-full mb-4"
              />
              <p>(S)eb Nilsson Agerlid</p>
            </div>
            <div>
              <img 
                src="/albert.png" 
                alt="Albert" 
                className="aspect-square object-cover w-full mb-4"
              />
              <p>(A)lbert Fromholtz Levin</p>
            </div>
          </div>
        </div>

        {/* Clients Section */}
        <div
          ref={clientsRef}
          className={`mt-32 transition-all duration-1000 ease-out transform ${
            clientsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex flex-col">
            <div className="max-w-[600px] mb-8">
              Founded as a &quot;Praktikbyrå&quot;. In today&apos;s fast-paced and stressful world, finding time for mindfulness and meditation can be challenging. Many individuals struggle with maintaining a consistent meditation practice due to a lack of guidance, personalized approaches, and difficulty tracking progress.
            </div>
            <h3 className="text-xl mb-8">Our Clients</h3>
            <p className="text-2xl font-light">
              Berghs SOC / Hyllie Bryggeri / Searchintent / Dubble Deli / Volanders
            </p>
          </div>
        </div>
      </div>
    </main>
    <Footer />
    </div>
  );
} 
