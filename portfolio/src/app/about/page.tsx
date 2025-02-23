'use client';

import { useState } from 'react';
import NeonButton from "../../components/NeonButton";
import styles from './page.module.css';
import Header from '../Header';


export default function About() {
  const [selectedService, setSelectedService] = useState('Branding');

  const services = {
    'Branding': { color: 'text-white' },
    'Art Direction': { color: 'text-white' },
    'Animation': { color: 'text-gray-500' },
    'Strategy': { color: 'text-gray-500' },
    'Design': { color: 'text-gray-500' }
  };

  const serviceContent = {
    'Branding': "Founded as a Praktikbyrå. In today's fast-paced and stressful world, finding time for mindfulness and meditation can be challenging. Many individuals struggle with maintaining a consistent meditation practice due to a lack of guidance, personalized approaches, and difficulty tracking progress.",
    'Art Direction': "Different content for Art Direction...",
    'Animation': "Different content for Animation...",
    'Strategy': "Different content for Strategy...",
    'Design': "Different content for Design..."
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
        <h1 className="text-2xl mb-4">LISA STUDIOS</h1>

        {/* Main Title */}
        <h2 className="text-[80px] leading-tight font-normal mb-16">
          Your Creative Directors<br />
          favorite underdog
        </h2>
        
        {/* Grey Section */}
        <div className="w-full h-[400px] bg-gray-300 mb-16 mt-16">
          {/* Placeholder for content/image */}
        </div>
        
        {/* Services Section */}
        <div className="max-w-[1400px] mx-auto flex gap-16">
          {/* Services Menu */}
          <div className="w-1/2">
            <h3 className="text-xl mb-8">SERVICES</h3>
            <div className="space-y-4">
              {Object.entries(services).map(([service, { color }]) => (
                <button
                  key={service}
                  onClick={() => setSelectedService(service)}
                  className={`text-6xl font-light block hover:text-white transition-colors whitespace-nowrap leading-none ${
                    selectedService === service ? 'text-white' : 'text-gray-500'
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          {/* Service Content */}
          <div className="w-1/2 pt-20">
            <p className="text-lg font-light">
              {serviceContent[selectedService]}
            </p>
          </div>
        </div>

        {/* Contact Information - Positioned Absolutely */}
        <div className="absolute top-0 right-0 text-right">
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
    </>
  );
} 