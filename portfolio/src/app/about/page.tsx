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
  const [selectedService, setSelectedService] = useState('Branding');
  const [headerRef, headerVisible] = useInView();
  const [servicesRef, servicesVisible] = useInView();
  const [teamRef, teamVisible] = useInView();
  const [clientsRef, clientsVisible] = useInView();

  const services = {
    'Branding': { color: 'text-white' },
    'Art Direction': { color: 'text-white' },
    'Animation': { color: 'text-gray-500' },
    'Strategy': { color: 'text-gray-500' },
    'Design': { color: 'text-gray-500' }
  };

  const serviceContent = {
    'Branding': "Founded as a Praktikbyrå. In today's fast-paced and stressful world, finding time for mindfulness and meditation can be challenging. Many individuals struggle with maintaining a consistent meditation practice due to a lack of guidance, personalized approaches, and difficulty tracking progress.",
    'Art Direction': "Founded as a Praktikbyrå. In today's fast-paced and stressful world, finding time for mindfulness and meditation can be challenging. Many individuals struggle with maintaining a consistent meditation practice due to a lack of guidance, personalized approaches, and difficulty tracking progress.",
    'Animation': "Founded as a Praktikbyrå. In today's fast-paced and stressful world, finding time for mindfulness and meditation can be challenging. Many individuals struggle with maintaining a consistent meditation practice due to a lack of guidance, personalized approaches, and difficulty tracking progress.",
    'Strategy': "Founded as a Praktikbyrå. In today's fast-paced and stressful world, finding time for mindfulness and meditation can be challenging. Many individuals struggle with maintaining a consistent meditation practice due to a lack of guidance, personalized approaches, and difficulty tracking progress.",
    'Design': "Founded as a Praktikbyrå. In today's fast-paced and stressful world, finding time for mindfulness and meditation can be challenging. Many individuals struggle with maintaining a consistent meditation practice due to a lack of guidance, personalized approaches, and difficulty tracking progress."
  };

  return (
    <>
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
          }`}
        >
          <h1 className="text-2xl mb-4">LISA STUDIOS</h1>
          <h2 className="text-[80px] leading-tight font-normal mb-16">
            Your Creative Directors<br />
            favorite underdog
          </h2>
        </div>
        
        {/* Hero Image Section */}
        <img 
          src="/berghs/banner.png"
          alt="Lisa Studios Hero"
          className="w-full h-[400px] object-cover mb-16 mt-16"
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
            <p className="text-lg font-light">
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
                src="/Ivar.jpeg" 
                alt="Love Molin" 
                className="aspect-square object-cover w-full mb-4"
              />
              <p>(L)ove Molin</p>
            </div>
            <div>
              <img 
                src="/Ivar.jpeg" 
                alt="Ivar" 
                className="aspect-square object-cover w-full mb-4"
              />
              <p>(I)var</p>
            </div>
            <div>
              <img 
                src="/Ivar.jpeg" 
                alt="Seb" 
                className="aspect-square object-cover w-full mb-4"
              />
              <p>(S)eb</p>
            </div>
            <div>
              <img 
                src="/Ivar.jpeg" 
                alt="Albert" 
                className="aspect-square object-cover w-full mb-4"
              />
              <p>(A)lbert</p>
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
            <h3 className="text-xl mb-8">Our Bitches</h3>
            <p className="text-2xl font-light">
              Berghs SOC / Hyllie Bryggeri / Searchintent / Dubble Deli / Volanders
            </p>
          </div>
        </div>

        {/* Contact Information - Positioned Absolutely */}
        <div className="relative md:absolute md:top-0 md:right-0 text-left md:text-right mt-16 md:mt-0">
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
      </div>
    </main>
    <Footer />
    </>
  );
} 
